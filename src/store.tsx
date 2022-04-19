import {moment, React} from "./global";

import {COLUMNS, DAILY_MODE, DEFAULT_TRY_TIMES, MAIN_KEY, PARADOX_MODE, RANDOM_MODE, TYPES} from "./const";
import {loadRecordData, saveRecordData} from "./component/History";
import {localStorageGet, localStorageSet} from "./locales/I18nWrap";
import {
  dailyGameLose,
  dailyGameWin, getDailyData,
  guess as guessFn, paradoxGameGiveUp, paradoxGameInit, paradoxGameWin,
  randomGameGiveUp,
  randomGameInit,
  randomGameLose,
  randomGameWin
} from "./server";

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
  const [today, setToday] = React.useState(moment().tz("Asia/Shanghai").format('YYYY-MM-DD'))
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
export const useGame: (store: HomeStore) => Game = (store: HomeStore) => {
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
    localStorageSet(lang, 'giveUp', `false`)
    localStorageSet(lang, 'r-randomData', JSON.stringify([]))
    setRandomData([])
    const answer = Math.floor(Math.random() * chartsData.length);
    localStorageSet(lang, 'r-randomAnswerKey', `${answer}`)
    setRandomAnswerKey(answer)
    randomGameInit(lang, {answer})
  }
  return {
    init: () => {
      const randomData = localStorageGet(lang, 'r-randomData')
      const oldKey = localStorageGet(lang, 'r-randomAnswerKey')
      if (randomData && oldKey !=='undefined') {
        const giveUp = localStorageGet(lang, "giveUp")
        if (giveUp) {
          setGiveUp(giveUp === 'true');
        }
        let oldData = JSON.parse(randomData)
        const answerKey = Number(localStorageGet(lang, 'r-randomAnswerKey'))
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
      localStorageSet(lang, 'r-randomData', JSON.stringify(newData));
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
      localStorageSet(lang, 'giveUp', 'true')
    },
    newGame,
    canNewGame: isOver,
    gameTip: () => <div>{i18n.get('timesTip', {times: `${DEFAULT_TRY_TIMES - data.length}/${DEFAULT_TRY_TIMES}`})}</div>
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
      const dayData = localStorageGet(lang, server_date + 'dayData')
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
      localStorageSet(lang, today + 'dayData', JSON.stringify(newData));
      setDayData(newData);
      return newData;
    },
    preSubmitCheck: () => {
      if (today !== moment().tz("Asia/Shanghai").format('YYYY-MM-DD')) {
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
    const paradoxData = JSON.parse(localStorageGet(lang, 'paradoxData') || '{}')
    paradoxData[key] = value
    localStorageSet(lang, 'paradoxData', JSON.stringify(paradoxData))
  }
  const getDataByKey = (key: string) => {
    const paradoxData = JSON.parse(localStorageGet(lang, 'paradoxData') || '{}')
    return paradoxData[key]
  }
  const newGame = () => {
    paradoxGameInit(lang, {answer: 0})
    setGiveUp(false);
    saveData('giveUp', 'false')
    setData([]);
    saveData('data', []);
    const initData = chartsData.map((v: any, i: number) => i);
    setRestList(initData);
    saveData('restList', initData);
  }
  const judgeWin = (data: GuessItem[]) => (data?.[data?.length - 1]?.guess?.restList?.length === 1)
    && data?.[data?.length - 1]?.guess?.[MAIN_KEY] === chartsData?.[data?.[data?.length - 1]?.guess?.restList[0]]?.[MAIN_KEY];
  const judgeOver = (data: GuessItem[]) => judgeWin(data) || isGiveUp as boolean;
  const isOver = judgeOver(data)
  const answer = chartsData[restList[0]];
  return {
    init: () => {
      const giveUp = getDataByKey("giveUp")
      if (giveUp) {
        setGiveUp(giveUp === 'true');
      }
      const paradoxData = getDataByKey('data')
      if (paradoxData) {
        setData(paradoxData)
        const paradoxRestList = getDataByKey('restList')
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
        const allCorrectKey = COLUMNS.map(() => 'correct').join('|')
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
      saveData('giveUp', 'true')
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
