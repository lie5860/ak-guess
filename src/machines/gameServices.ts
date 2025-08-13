import { GameContext, GameEvent } from './gameMachine';
import { localStorageGet, localStorageSet } from '../locales/I18nWrap';
import { loadRecordData, saveRecordData } from '../component/History';
import {
  dailyGameWin,
  dailyGameLose,
  getDailyData,
  guess as guessFn,
  paradoxGameGiveUp,
  paradoxGameInit,
  paradoxGameWin,
  randomGameGiveUp,
  randomGameInit,
  randomGameLose,
  randomGameWin,
  reportError,
} from '../server';
import { COLUMNS, DEFAULT_TRY_TIMES, MAIN_KEY, RANDOM_MODE, DAILY_MODE, PARADOX_MODE, STORAGE, PARADOX_FIELDS, TZ_ASIA_SHANGHAI, DATE_FMT } from '../const';
import { moment } from '../global';

export const gameServices = {
  // Random mode services
  loadRandomGame: async (context: GameContext) => {
    const { lang, chartsData } = context;
    const randomData = localStorageGet(lang, STORAGE.RANDOM_DATA);
    const oldKey = localStorageGet(lang, STORAGE.RANDOM_ANSWER_KEY);
    const hasData = !!randomData;
    const hasValidKey = oldKey != null && oldKey !== 'undefined' && !isNaN(Number(oldKey));

    if (hasData && hasValidKey) {
      const giveUp = localStorageGet(lang, STORAGE.GIVE_UP);
      let oldData = JSON.parse(randomData);
      const answerKey = !isNaN(Number(oldKey)) ? Number(oldKey) : 0;
      const answer = chartsData[answerKey];

      try {
        oldData = oldData.map((inputItem: any) => {
          return guessFn(inputItem.guess, answer);
        });
      } catch (e) {
        console.error('Error processing old data:', e);
      }

      return {
        data: oldData,
        answerKey,
        isGiveUp: giveUp === 'true',
      };
    } else {
      // Create new game
      const answerKey = Math.floor(Math.random() * chartsData.length);
      if (isNaN(answerKey)) {
        reportError({
          message: '发现错误',
          stack: 'rerandom' + Math.floor(Math.random() * chartsData.length),
          localstorage: `${chartsData.length} chartsData.length;${Math.floor}Math.floor;${Math.random}Math.random()`,
        });
        throw new Error('Failed to generate random answer key');
      }
      
      localStorageSet(lang, STORAGE.RANDOM_ANSWER_KEY, `${answerKey}`);
      // 清空随机数据存档（移除键而非写入空数组）
      try { localStorage.removeItem(`${STORAGE.RANDOM_DATA}${(lang === 'zh_CN' || !lang) ? '' : `|${lang}`}`) } catch {}
      localStorageSet(lang, STORAGE.GIVE_UP, 'false');
      
      randomGameInit(lang, { answer: answerKey });
      
      return {
        data: [],
        answerKey,
        isGiveUp: false,
      };
    }
  },

  processRandomGuess: async (context: GameContext, event: any) => {
    const { data, answer, lang, chartNameToIndexDict, randomAnswerKey } = context;
    const guess = event.guess;

    const res = guessFn(guess, answer);
    const newData = [...data, res];

    localStorageSet(lang, STORAGE.RANDOM_DATA, JSON.stringify(newData));

    const isWin = newData[newData.length - 1]?.guess?.[MAIN_KEY] === answer?.[MAIN_KEY];
    const isGameOver = newData.length >= DEFAULT_TRY_TIMES || isWin;

    if (isGameOver) {
      // Handle game over logic
      let record: any = loadRecordData(lang);
      
      if (isWin) {
        randomGameWin(lang, {
          answer: randomAnswerKey,
          inputArray: newData.map(({ guess }) => ({
            index: chartNameToIndexDict?.[guess?.[MAIN_KEY]],
            name: guess?.[MAIN_KEY],
          })),
        });
        
        record[RANDOM_MODE].winTryTimes += newData.length;
        record[RANDOM_MODE].winTimes += 1;
        record[RANDOM_MODE].straightWins += 1;
        
        if (record[RANDOM_MODE].straightWins > record[RANDOM_MODE].maxStraightWins) {
          record[RANDOM_MODE].maxStraightWins = record[RANDOM_MODE].straightWins;
        }
        
        if (!record[RANDOM_MODE].minWinTimes || record[RANDOM_MODE].minWinTimes > newData.length) {
          record[RANDOM_MODE].minWinTimes = newData.length;
        }

        // Save to character collection
        const name = answer.name;
        if (!record[RANDOM_MODE].roles[name]) {
          record[RANDOM_MODE].roles[name] = { cost: newData.length, winTime: 1 };
        } else {
          const oldCost = record[RANDOM_MODE].roles[name]?.cost || 0;
          record[RANDOM_MODE].roles[name] = {
            cost: oldCost > newData.length ? newData.length : oldCost,
            winTime: (record[RANDOM_MODE].roles[name]?.winTime || 0) + 1,
          };
        }
      } else {
        randomGameLose(lang, {
          answer: randomAnswerKey,
          inputArray: newData.map(({ guess }) => ({
            index: chartNameToIndexDict?.[guess?.[MAIN_KEY]],
            name: guess?.[MAIN_KEY],
          })),
        });
        record[RANDOM_MODE].straightWins = 0;
      }
      
      record[RANDOM_MODE].playTimes += 1;
      record[RANDOM_MODE].totalTryTimes += newData.length;
      saveRecordData(lang, record);
    }

    return {
      newData,
      isGameOver,
      isWin,
    };
  },

  // Daily mode services
  loadDailyGame: async (context: GameContext) => {
    const { lang } = context;
    const { daily, server_date }: { daily: number; server_date: string } = await getDailyData(lang);
    
    const dayData = localStorageGet(lang, server_date + STORAGE.DAY_DATA_SUFFIX);
    const data = dayData ? JSON.parse(dayData) : [];
    
    return {
      daily,
      server_date,
      data,
    };
  },

  processDailyGuess: async (context: GameContext, event: any) => {
    const { data, answer, lang, chartNameToIndexDict, remoteAnswerKey, today } = context;
    const guess = event.guess;

    // Check if date is current
    if (today !== moment().tz(TZ_ASIA_SHANGHAI).format(DATE_FMT)) {
      throw new Error('Date mismatch - please reload');
    }

    const res = guessFn(guess, answer);
    const newData = [...data, res];

    localStorageSet(lang, today + STORAGE.DAY_DATA_SUFFIX, JSON.stringify(newData));

    const isWin = newData[newData.length - 1]?.guess?.[MAIN_KEY] === answer?.[MAIN_KEY];
    const isGameOver = newData.length >= DEFAULT_TRY_TIMES || isWin;

    if (isGameOver) {
      let record: any = loadRecordData(lang);
      
      if (isWin) {
        dailyGameWin(lang, {
          answer: remoteAnswerKey,
          inputArray: newData.map(({ guess }) => ({
            index: chartNameToIndexDict?.[guess?.[MAIN_KEY]],
            name: guess?.[MAIN_KEY],
          })),
        });
        
        record[DAILY_MODE].winTimes += 1;
        record[DAILY_MODE].winTryTimes += newData.length;
        record[DAILY_MODE].straightWins += 1;
        
        if (record[DAILY_MODE].straightWins > record[DAILY_MODE].maxStraightWins) {
          record[DAILY_MODE].maxStraightWins = record[DAILY_MODE].straightWins;
        }
        
        if (!record[DAILY_MODE].minWinTimes || record[DAILY_MODE].minWinTimes > newData.length) {
          record[DAILY_MODE].minWinTimes = newData.length;
        }

        // Save to character collection
        const name = answer.name;
        if (!record[DAILY_MODE].roles[name]) {
          record[DAILY_MODE].roles[name] = { cost: newData.length, winTime: 1 };
        } else {
          const oldCost = record[DAILY_MODE].roles[name]?.cost || 0;
          record[DAILY_MODE].roles[name] = {
            cost: oldCost > newData.length ? newData.length : oldCost,
            winTime: (record[DAILY_MODE].roles[name]?.winTime || 0) + 1,
          };
        }
      } else {
        dailyGameLose(lang, {
          answer: remoteAnswerKey,
          inputArray: newData.map(({ guess }) => ({
            index: chartNameToIndexDict?.[guess?.[MAIN_KEY]],
            name: guess?.[MAIN_KEY],
          })),
        });
        record[DAILY_MODE].straightWins = 0;
      }
      
      record[DAILY_MODE].playTimes += 1;
      record[DAILY_MODE].totalTryTimes += newData.length;
      saveRecordData(lang, record);
    }

    return {
      newData,
      isGameOver,
      isWin,
    };
  },

  // Paradox mode services
  loadParadoxGame: async (context: GameContext) => {
    const { lang, chartsData } = context;
    
    const getDataByKey = (key: string) => {
      const paradoxData = JSON.parse(localStorageGet(lang, STORAGE.PARADOX_DATA) || '{}');
      return paradoxData[key];
    };

    const giveUp = getDataByKey(PARADOX_FIELDS.GIVE_UP);
    const paradoxData = getDataByKey(PARADOX_FIELDS.DATA);
    
    if (paradoxData) {
      const paradoxRestList = getDataByKey('restList');
      return {
        data: paradoxData,
        restList: paradoxRestList,
        isGiveUp: giveUp === 'true',
      };
    } else {
      // Create new game
      paradoxGameInit(lang, { answer: 0 });
      const initData = chartsData.map((v: any, i: number) => i);
      
      const saveData = (key: string, value: any) => {
        const paradoxData = JSON.parse(localStorageGet(lang, STORAGE.PARADOX_DATA) || '{}');
        paradoxData[key] = value;
        localStorageSet(lang, STORAGE.PARADOX_DATA, JSON.stringify(paradoxData));
      };
      saveData(PARADOX_FIELDS.GIVE_UP, 'false');
      saveData(PARADOX_FIELDS.DATA, []);
      saveData(PARADOX_FIELDS.REST_LIST, initData);
      
      return {
        data: [],
        restList: initData,
        isGiveUp: false,
      };
    }
  },

  processParadoxGuess: async (context: GameContext, event: any) => {
    const { data, restList, chartsData, lang, chartNameToIndexDict } = context;
    const guess = event.guess;
    const workingRestList = (Array.isArray(restList) && restList.length > 0)
      ? restList
      : chartsData.map((_: any, i: number) => i);

    const saveData = (key: string, value: any) => {
      const paradoxData = JSON.parse(localStorageGet(lang, STORAGE.PARADOX_DATA) || '{}');
      paradoxData[key] = value;
      localStorageSet(lang, STORAGE.PARADOX_DATA, JSON.stringify(paradoxData));
    };

    const length = workingRestList.length;
    const oldRestList = workingRestList;
    const timesDict = {} as any;
    let maxData = { time: 0, res: {} as any, restList: [] as number[] };
    const allCorrectKey = COLUMNS.map(() => 'correct').join('|');

    for (let i = 0; i < length; i++) {
      const res = guessFn(guess, chartsData[oldRestList[i]]);
      const key = COLUMNS.map(v => res[v?.key]).join('|');
      
      if (timesDict[key]) {
        const { time, restList } = timesDict[key];
        timesDict[key] = { time: time + 1, res, restList: [...restList, oldRestList[i]] };
      } else {
        timesDict[key] = { time: 1, res, restList: [oldRestList[i]] };
      }
    }

    const timesArr = Object.keys(timesDict);
    timesArr.forEach(k => {
      const { time } = timesDict[k];
      const needSkip = timesArr.length > 1 && time === 1 && k === allCorrectKey;
      
      if (maxData.time < time && !needSkip) {
        maxData = timesDict[k];
      }
    });

    if (!maxData.res.guess) {
      maxData.res.guess = guess;
    }
    maxData.res.guess.restList = maxData.restList;
    const newData = [...data, maxData.res];
    const newRestList = maxData.restList;

    saveData(PARADOX_FIELDS.DATA, newData);
    saveData(PARADOX_FIELDS.REST_LIST, newRestList.length > 0 ? newRestList : workingRestList);

    // Check win condition
    const isWin = (newRestList.length === 1 && 
      newData[newData.length - 1]?.guess?.[MAIN_KEY] === chartsData[newRestList[0]]?.[MAIN_KEY]) ||
      COLUMNS.map(v => newData[newData.length - 1]?.[v?.key]).join('|') === allCorrectKey;

    const isGameOver = isWin;

    if (isGameOver) {
      const times = newData.length;
      const answer = chartsData[newRestList[0]];
      const name = answer?.[MAIN_KEY];

      paradoxGameWin(lang, {
        answer: chartNameToIndexDict[name],
        inputArray: newData.map(({ guess }) => ({
          index: chartNameToIndexDict?.[guess?.[MAIN_KEY]],
          name: guess?.[MAIN_KEY],
        })),
      });

      let record = loadRecordData(lang);
      record[PARADOX_MODE].playTimes += 1;
      record[PARADOX_MODE].winTimes += 1;
      record[PARADOX_MODE].winTryTimes += newData.length;
      record[PARADOX_MODE].straightWins += 1;
      
      if (record[PARADOX_MODE].straightWins > record[PARADOX_MODE].maxStraightWins) {
        record[PARADOX_MODE].maxStraightWins = record[PARADOX_MODE].straightWins;
      }
      
      if (!record[PARADOX_MODE].minWinTimes || record[PARADOX_MODE].minWinTimes > newData.length) {
        record[PARADOX_MODE].minWinTimes = newData.length;
      }
      
      if (!record[PARADOX_MODE].roles[name] || record[PARADOX_MODE].roles[name] > times) {
        record[PARADOX_MODE].roles[name] = times;
      }
      
      saveRecordData(lang, record);
    }

    return {
      newData,
      restList: newRestList,
      isGameOver,
      isWin,
    };
  },
};