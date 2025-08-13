import {moment, React} from "./global";

import {COLUMNS, DAILY_MODE, DEFAULT_TRY_TIMES, MAIN_KEY, PARADOX_MODE, RANDOM_MODE, TYPES, STORAGE, PARADOX_FIELDS, TZ_ASIA_SHANGHAI, DATE_FMT} from "./const";
import {loadRecordData, saveRecordData} from "./component/History";
import {localStorageGet, localStorageSet} from "./locales/I18nWrap";
import {
  dailyGameLose,
  dailyGameWin, getDailyData,
  guess as guessFn, paradoxGameGiveUp, paradoxGameInit, paradoxGameWin,
  randomGameGiveUp,
  randomGameInit,
  randomGameLose,
  randomGameWin, reportError
} from "./server";
import { useGameMachine } from "./machines/useGameMachine";

export interface HomeStore {
  mode: string;
  chartsData: Character[];
  chartNameToIndexDict: { [key: string]: number };
  i18n: any;
  today: string;
}

const useRandomStore = ({chartsData}: { chartsData: Character[] }) => {
  const [randomAnswerKey, setRandomAnswerKey] = React.useState(Math.floor(Math.random() * chartsData.length))
  const [isGiveUp, setGiveUp] = React.useState(false);
  const [randomData, setRandomData] = React.useState([])
  return {
    randomAnswerKey, setRandomAnswerKey,
    isGiveUp, setGiveUp,
    randomData, setRandomData
  }
}
const useDailyStore = () => {
  const [remoteAnswerKey, setRemoteAnswerKey] = React.useState(-1)
  const [dayData, setDayData] = React.useState([])
  const [today, setToday] = React.useState(moment().tz(TZ_ASIA_SHANGHAI).format(DATE_FMT))
  return {
    remoteAnswerKey, setRemoteAnswerKey,
    today, setToday,
    dayData, setDayData
  }
}
const useParadoxStore = () => {
  const [restList, setRestList] = React.useState([])
  const [isGiveUp, setGiveUp] = React.useState(false);
  const [data, setData] = React.useState([])
  return {
    restList, setRestList,
    isGiveUp, setGiveUp,
    data, setData
  }
}
// Legacy game hook - kept for backward compatibility
export const useGameLegacy: (store: HomeStore) => Game = (store: HomeStore) => {
  const {chartsData, mode} = store
  const randomStore = useRandomStore({chartsData})
  const dailyStore = useDailyStore()
  const paradoxStore = useParadoxStore()
  const gameDict: { [key: string]: (store: any) => Game } = {
    [RANDOM_MODE]: randomGame,
    [DAILY_MODE]: dailyGame,
    [PARADOX_MODE]: paradoxGame
  }
  return gameDict[mode]({store, randomStore, dailyStore, paradoxStore})
}

// New XState-based game hook
export const useGame: (store: HomeStore) => Game = (store: HomeStore) => {
  return useGameMachine(store);
}
// game 需要暴露存储数据的key
const randomGame = ({store, randomStore}: any) => {
  const mode = RANDOM_MODE;
  const {
    randomAnswerKey, setRandomAnswerKey,
    isGiveUp, setGiveUp,
    randomData, setRandomData
  } = randomStore
  const {chartsData, i18n, chartNameToIndexDict} = store;
  const lang = i18n.language;
  const answer = chartsData[randomAnswerKey ?? Math.floor(Math.random() * chartsData.length)];
  const data: GuessItem[] = randomData;
  const judgeWin = (data: GuessItem[]) => data?.[data?.length - 1]?.guess?.[MAIN_KEY] === answer?.[MAIN_KEY];
  const judgeOver = (data: GuessItem[]) => data.length >= DEFAULT_TRY_TIMES || judgeWin(data) || isGiveUp as boolean;
  const isWin = judgeWin(data);
  const isOver = judgeOver(data);
  const newGame = () => {
    setGiveUp(false);
    localStorageSet(lang, STORAGE.GIVE_UP, `false`)
    localStorageSet(lang, STORAGE.RANDOM_DATA, JSON.stringify([]))
    setRandomData([])
    let answer = Math.floor(Math.random() * chartsData.length);
    if (isNaN(answer)) {
      reportError({
        message: '发现错误',
        stack: 'rerandom' + Math.floor(Math.random() * chartsData.length),
        localstorage: chartsData.length + ' chartsData.length;' + Math.floor + 'Math.floor;' + Math.random + 'Math.random()'
      })
      answer = Math.floor(Math.random() * 100) || 1
    }
    localStorageSet(lang, STORAGE.RANDOM_ANSWER_KEY, `${answer}`)
    setRandomAnswerKey(answer)
    randomGameInit(lang, {answer})
  }
  return {
    init: () => {
      const randomData = localStorageGet(lang, STORAGE.RANDOM_DATA)
      const oldKey = localStorageGet(lang, STORAGE.RANDOM_ANSWER_KEY)
      if (randomData && oldKey !== 'undefined') {
        const giveUp = localStorageGet(lang, STORAGE.GIVE_UP)
        if (giveUp) {
          setGiveUp(giveUp === 'true');
        }
        let oldData = JSON.parse(randomData)
        const answerKey = !isNaN(Number(oldKey)) ? Number(oldKey) : 0;
        const answer = chartsData[answerKey]
        try {
          oldData = oldData.map((inputItem: any) => {
            return guessFn(inputItem.guess, answer)
          })
        } catch (e) {
        }
        setRandomData(oldData)
        setRandomAnswerKey(answerKey)
      } else {
        newGame()
      }
    },
    answer,
    data: randomData,
    judgeWin,
    judgeOver,
    isWin,
    isOver,
    insertItem: (newItem: Character) => {
      const res = guessFn(newItem, answer);
      const newData = [...randomData, res];
      localStorageSet(lang, STORAGE.RANDOM_DATA, JSON.stringify(newData));
      setRandomData(newData);
      return newData;
    },
    gameOver: (newData: any[]) => {
      let record: any = loadRecordData(lang);
      const isWin = judgeWin(newData)
      if (isWin) {
        randomGameWin(lang, {
          answer: randomAnswerKey, inputArray: newData.map(({guess}) => {
            return {
              index: chartNameToIndexDict?.[guess?.[MAIN_KEY]],
              name: guess?.[MAIN_KEY]
            }
          })
        })
        record[mode].winTryTimes += newData.length;
        record[mode].winTimes += 1;
        record[mode].straightWins += 1;
        if (record[mode].straightWins > record[mode].maxStraightWins) {
          record[mode].maxStraightWins = record[mode].straightWins;
        }
        if (!record[mode].minWinTimes || record[mode].minWinTimes > newData.length) {
          record[mode].minWinTimes = newData.length;
        }

        // 保存进图鉴的数据
        const name = answer.name
        if (!record[mode].roles[name]) {
          record[mode].roles[name] = {cost: newData.length, winTime: 1}
        } else {
          const oldCost = record[mode].roles[name]?.cost || 0
          record[mode].roles[name] = {
            cost: oldCost > newData.length ? newData.length : oldCost,
            winTime: (record[mode].roles[name]?.winTime || 0) + 1
          }
        }
      } else {
        randomGameLose(lang, {
          answer: randomAnswerKey, inputArray: newData.map(({guess}) => {
            return {
              index: chartNameToIndexDict?.[guess?.[MAIN_KEY]],
              name: guess?.[MAIN_KEY]
            }
          })
        })
        record[mode].straightWins = 0;
      }
      record[mode].playTimes += 1;
      record[mode].totalTryTimes += newData.length;
      saveRecordData(lang, record);
    },
    canGiveUp: !isOver && data?.length > 0,
    giveUp: () => {
      randomGameGiveUp(lang, {
        answer: randomAnswerKey, inputArray: data.map(({guess}) => {
          return {
            index: chartNameToIndexDict?.[guess?.[MAIN_KEY]],
            name: guess?.[MAIN_KEY]
          };
        })
      });
      let record = loadRecordData(lang);
      record[mode].straightWins = 0;
      record[mode].playTimes += 1;
      record[mode].totalTryTimes += randomData.length;
      saveRecordData(lang, record);
      setGiveUp(true);
      localStorageSet(lang, STORAGE.GIVE_UP, 'true')
    },
    newGame,
    canNewGame: isOver,
    gameTip: (config: DefaultConfig) => <div style={{marginTop: 8, ...config.gameTipStyle}}>{i18n.get('timesTip', {times: `${DEFAULT_TRY_TIMES - data.length}/${DEFAULT_TRY_TIMES}`})}</div>
  }
}
const dailyGame = ({store, dailyStore}: any) => {
  const mode = DAILY_MODE;
  const {
    remoteAnswerKey, setRemoteAnswerKey,
    today, setToday,
    dayData, setDayData
  } = dailyStore
  const {chartsData, i18n, chartNameToIndexDict} = store;

  const lang = i18n.language;
  const answer = chartsData[remoteAnswerKey];
  const data = dayData;
  const judgeWin = (data: GuessItem[]) => data?.[data?.length - 1]?.guess?.[MAIN_KEY] === answer?.[MAIN_KEY];
  const judgeOver = (data: GuessItem[]) => data.length >= DEFAULT_TRY_TIMES || judgeWin(data);
  const isWin = judgeWin(data);
  const isOver = judgeOver(data);
  return {
    init: async () => {
      const {daily, server_date}: { daily: number, server_date: string } = await getDailyData(lang);
      setToday(server_date)
      setRemoteAnswerKey(daily)
      const dayData = localStorageGet(lang, server_date + STORAGE.DAY_DATA_SUFFIX)
      if (dayData) {
        setDayData(JSON.parse(dayData))
      }
    },
    answer,
    data,
    isWin,
    judgeWin,
    isOver,
    judgeOver,
    insertItem: (newItem: Character) => {
      const res = guessFn(newItem, answer);
      const newData = [...dayData, res];
      localStorageSet(lang, today + STORAGE.DAY_DATA_SUFFIX, JSON.stringify(newData));
      setDayData(newData);
      return newData;
    },
    preSubmitCheck: () => {
      if (today !== moment().tz(TZ_ASIA_SHANGHAI).format(DATE_FMT)) {
        alert(i18n.get('reloadTip'))
        window.location.reload()
        return true;
      }
    },
    gameOver: (newData: any[]) => {
      let record: any = loadRecordData(lang);
      const isWin = judgeWin(newData)
      if (isWin) {
        dailyGameWin(lang, {
          answer: remoteAnswerKey, inputArray: newData.map(({guess}) => {
            return {
              index: chartNameToIndexDict?.[guess?.[MAIN_KEY]],
              name: guess?.[MAIN_KEY]
            }
          })
        })
        record[mode].winTimes += 1;
        record[mode].winTryTimes += newData.length;
        record[mode].straightWins += 1;
        if (record[mode].straightWins > record[mode].maxStraightWins) {
          record[mode].maxStraightWins = record[mode].straightWins;
        }
        if (!record[mode].minWinTimes || record[mode].minWinTimes > newData.length) {
          record[mode].minWinTimes = newData.length;
        }
        // 保存进图鉴的数据
        const name = answer.name
        if (!record[mode].roles[name]) {
          record[mode].roles[name] = {cost: newData.length, winTime: 1}
        } else {
          const oldCost = record[mode].roles[name]?.cost || 0
          record[mode].roles[name] = {
            cost: oldCost > newData.length ? newData.length : oldCost,
            winTime: (record[mode].roles[name]?.winTime || 0) + 1
          }
        }
      } else {
        dailyGameLose(lang, {
          answer: remoteAnswerKey, inputArray: newData.map(({guess}) => {
            return {
              index: chartNameToIndexDict?.[guess?.[MAIN_KEY]],
              name: guess?.[MAIN_KEY]
            }
          })
        })
        record[mode].straightWins = 0;
      }
      record[mode].playTimes += 1;
      record[mode].totalTryTimes += newData.length;
      saveRecordData(lang, record);
    },
    gameTip: () => <>
      <div>{i18n.get('timesTip', {times: `${DEFAULT_TRY_TIMES - data.length}/${DEFAULT_TRY_TIMES}`})}</div>
      <div>{i18n.get('dailyTimeTip')}</div>
    </>
  }
}
const paradoxGame: (store: any) => Game = ({store, paradoxStore}: any) => {
  const mode = PARADOX_MODE;
  const {chartsData, i18n, chartNameToIndexDict} = store as HomeStore;
  const {
    restList, setRestList,
    isGiveUp, setGiveUp,
    data, setData,
  } = paradoxStore
  const lang = i18n.language;
  const saveData = (key: string, value: any) => {
    const paradoxData = JSON.parse(localStorageGet(lang, STORAGE.PARADOX_DATA) || '{}')
    paradoxData[key] = value
    localStorageSet(lang, STORAGE.PARADOX_DATA, JSON.stringify(paradoxData))
  }
  const getDataByKey = (key: string) => {
    const paradoxData = JSON.parse(localStorageGet(lang, STORAGE.PARADOX_DATA) || '{}')
    return paradoxData[key]
  }
  const newGame = () => {
    paradoxGameInit(lang, {answer: 0})
    setGiveUp(false);
    saveData(PARADOX_FIELDS.GIVE_UP, 'false')
    setData([]);
    saveData(PARADOX_FIELDS.DATA, []);
    const initData = chartsData.map((v: any, i: number) => i);
    setRestList(initData);
    saveData(PARADOX_FIELDS.REST_LIST, initData);
  }
  const allCorrectKey = COLUMNS.map(() => 'correct').join('|')
  const judgeWin = (data: GuessItem[]) => {
    const over = (data?.[data?.length - 1]?.guess?.restList?.length === 1)
      && data?.[data?.length - 1]?.guess?.[MAIN_KEY] === chartsData?.[data?.[data?.length - 1]?.guess?.restList[0]]?.[MAIN_KEY];
    const key = COLUMNS.map(v => data?.[data?.length - 1]?.[v?.key]).join('|')
    return over || key === allCorrectKey;
  }
  const judgeOver = (data: GuessItem[]) => judgeWin(data) || isGiveUp as boolean;
  const isOver = judgeOver(data)
  const answer = chartsData[restList[0]];
  return {
    init: () => {
      const giveUp = getDataByKey(PARADOX_FIELDS.GIVE_UP)
      if (giveUp) {
        setGiveUp(giveUp === 'true');
      }
       const paradoxData = getDataByKey(PARADOX_FIELDS.DATA)
      if (paradoxData) {
        setData(paradoxData)
         const paradoxRestList = getDataByKey(PARADOX_FIELDS.REST_LIST)
        setRestList(paradoxRestList)
      } else {
        newGame()
      }
    },
    answer,
    data,
    insertItem: (newItem: Character) => {
      const length = restList.length;
      const oldRestList = restList;
      const timesDict = {} as any;
      let maxData = {time: 0, res: {} as GuessItem, restList: [] as number[]}
      for (let i = 0; i < length; i++) {
        const res = guessFn(newItem, chartsData[restList[i]])
        // Object.values兼容性OK？
        const key = COLUMNS.map(v => res[v?.key]).join('|')
        if (timesDict[key]) {
          const {time, restList} = timesDict[key];
          timesDict[key] = {time: time + 1, res, restList: [...restList, oldRestList[i]]}
        } else {
          timesDict[key] = {time: 1, res, restList: [oldRestList[i]]}
        }
      }
      const timesArr = Object.keys(timesDict)
      timesArr.forEach(k => {
        const {time} = timesDict[k];
        const needSkip = timesArr.length > 1 && time === 1 && k === allCorrectKey
        // 相同的情况如何处理 todo????
        if (maxData.time < time && !needSkip) {
          maxData = timesDict[k]
        }
      })
      maxData.res.guess.restList = maxData.restList
      const newData = [...data, maxData.res]
      setData(newData)
      saveData('data', newData);
      setRestList(maxData.restList)
      saveData('restList', maxData.restList)
      return newData
    },
    judgeWin,
    isWin: judgeWin(data),
    canGiveUp: !isOver && data?.length > 0,
    giveUp: () => {
      const name = answer?.[MAIN_KEY];
      paradoxGameGiveUp(lang, {
        answer: chartNameToIndexDict[name], inputArray: data.map(({guess}: GuessItem) => {
          return {
            index: chartNameToIndexDict?.[guess?.[MAIN_KEY]],
            name: guess?.[MAIN_KEY]
          };
        })
      });
      setGiveUp(true);
       saveData(PARADOX_FIELDS.GIVE_UP, 'true')
      let record = loadRecordData(lang);
      record[mode].playTimes += 1;
      record[mode].straightWins = 0;
      saveRecordData(lang, record);
    },
    judgeOver: data => judgeWin(data),
    isOver,
    gameOver: (newData) => {
      const times = newData.length;
      const name = answer?.[MAIN_KEY];
      // 埋点
      paradoxGameWin(lang, {
        answer: chartNameToIndexDict[name], inputArray: newData.map(({guess}) => {
          return {
            index: chartNameToIndexDict?.[guess?.[MAIN_KEY]],
            name: guess?.[MAIN_KEY]
          }
        })
      })
      let record = loadRecordData(lang);
      record[mode].playTimes += 1;
      record[mode].winTimes += 1;
      record[mode].winTryTimes += newData.length;
      record[mode].straightWins += 1;
      if (record[mode].straightWins > record[mode].maxStraightWins) {
        record[mode].maxStraightWins = record[mode].straightWins;
      }
      if (!record[mode].minWinTimes || record[mode].minWinTimes > newData.length) {
        record[mode].minWinTimes = newData.length;
      }
      if (!record[mode].roles[name] || record[mode].roles[name] > times) {
        record[mode].roles[name] = times
      }
      saveRecordData(lang, record);
    },
    newGame,
    canNewGame: isOver,
    gameTip: () => <>
      <div>{i18n.get('paradoxModeTip')}</div>
    </>
  }
}
