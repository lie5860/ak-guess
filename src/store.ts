import {moment, React} from "./global";

import {DAILY_MODE, DEFAULT_TRY_TIMES, MAIN_KEY, PARADOX_MODE, RANDOM_MODE} from "./const";
import {loadRecordData, saveRecordData} from "./component/History";
import {localStorageGet, localStorageSet} from "./locales/I18nWrap";
import {
  dailyGameLose,
  dailyGameWin, getDailyData,
  guess as guessFn,
  randomGameGiveUp,
  randomGameInit,
  randomGameLose,
  randomGameWin
} from "./server";

interface HomeStore {
  mode: string;
  chartsData: GuessItem[];
  lang: string;
  today: string;
}

interface Game {
  // 最终结果
  answer: Character;
  // 过程数据
  data: GuessItem[];
  // 提交前的检查
  preSubmitCheck?: () => boolean | undefined;
  // 插入过程数据
  insertItem: (newItem: Character) => GuessItem[];
  // 初始化
  init: () => void;
  // 是否胜利
  isWin: boolean;
  // 判断是否胜利
  judgeWin: (data: GuessItem[]) => boolean;
  // 判断是否游戏结束
  judgeOver: (data: GuessItem[]) => boolean;
  // 是否游戏结束
  isOver: boolean;
  // 是否能新建游戏
  canNewGame?: boolean;
  // 新建游戏
  newGame?: () => void;
  // 是否能放弃游戏
  canGiveUp?: boolean;
  // 放弃游戏
  giveUp?: () => void;
  // 游戏结束
  gameOver: (newData: GuessItem[]) => void;
}

const useRandomStore = () => {
  const [randomAnswerKey, setRandomAnswerKey] = React.useState()
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
  return {
    remoteAnswerKey, setRemoteAnswerKey,
    dayData, setDayData
  }
}
const useParadoxStore = () => {
  const [restList, setRestList] = React.useState([])
  const [data, setData] = React.useState([])
  return {
    restList, setRestList,
    data, setData
  }
}
export const useGame: (store: HomeStore) => Game = (store: HomeStore) => {
  const randomStore = useRandomStore()
  const dailyStore = useDailyStore()
  const paradoxStore = useParadoxStore()
  const {mode} = store
  const gameDict: { [key: string]: (store: any) => Game } = {
    [RANDOM_MODE]: randomGame,
    [DAILY_MODE]: dailyGame,
    [PARADOX_MODE]: paradoxGame
  }
  return gameDict[mode]({store, randomStore, dailyStore, paradoxStore})
}
// game 需要暴露存储数据的key
const randomGame = ({store, randomStore}: any) => {
  const {
    randomAnswerKey, setRandomAnswerKey,
    isGiveUp, setGiveUp,
    randomData, setRandomData
  } = randomStore
  const {chartsData, lang} = store;
  const answer = chartsData[randomAnswerKey ?? Math.floor(Math.random() * chartsData.length)];
  const data = randomData;
  const judgeWin = (data: GuessItem[]) => data?.[data?.length - 1]?.guess?.[MAIN_KEY] === answer?.[MAIN_KEY];
  const judgeOver = (data: GuessItem[]) => data.length >= DEFAULT_TRY_TIMES || judgeWin(data) || isGiveUp;
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
      if (randomData) {
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
            return guess?.[MAIN_KEY]
          })
        }, newData.length)
        record.winTryTimes += newData.length;
        record.winTimes += 1;
        record.straightWins += 1;
        if (record.straightWins > record.maxStraightWins) {
          record.maxStraightWins = record.straightWins;
        }
      } else {
        randomGameLose(lang, {
          answer: randomAnswerKey, inputArray: newData.map(({guess}) => {
            return guess?.[MAIN_KEY]
          })
        })
        record.straightWins = 0;
      }
      record.playTimes += 1;
      record.totalTryTimes += newData.length;
      saveRecordData(lang, record);
    },
    canGiveUp: !isOver && data?.length > 0,
    giveUp: () => {
      randomGameGiveUp(lang, {answer: randomAnswerKey})
      let record = loadRecordData(lang);
      record.straightWins = 0;
      record.playTimes += 1;
      record.totalTryTimes += randomData.length;
      saveRecordData(lang, record);
      setGiveUp(true);
      localStorageSet(lang, 'giveUp', 'true')
    },
    newGame,
    canNewGame: !!isOver
  }
}
const dailyGame = ({store, dailyStore}: any) => {
  const {
    remoteAnswerKey, setRemoteAnswerKey,
    dayData, setDayData
  } = dailyStore
  const {today, chartsData, lang} = store
  const answer = chartsData[remoteAnswerKey];
  const data = dayData;
  const judgeWin = (data: GuessItem[]) => data?.[data?.length - 1]?.guess?.[MAIN_KEY] === answer?.[MAIN_KEY];
  const judgeOver = (data: GuessItem[]) => data.length >= DEFAULT_TRY_TIMES || judgeWin(data);
  const isWin = judgeWin(data);
  const isOver = judgeOver(data);
  return {
    init: async () => {
      const {daily}: { daily: number } = await getDailyData(lang);
      setRemoteAnswerKey(daily)
      const dayData = localStorageGet(lang, today + 'dayData')
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
        alert('数据已更新，即将刷新页面')
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
            return guess?.[MAIN_KEY]
          })
        }, newData.length)
        record.dailyWinTimes += 1;
        record.dailyWinTryTimes += newData.length;
        record.dailyStraightWins += 1;
        if (record.dailyStraightWins > record.dailyMaxStraightWins) {
          record.dailyMaxStraightWins = record.dailyStraightWins;
        }
      } else {
        dailyGameLose(lang, {
          answer: remoteAnswerKey, inputArray: newData.map(({guess}) => {
            return guess?.[MAIN_KEY]
          })
        })
        record.dailyStraightWins = 0;
      }
      record.dailyPlayTimes += 1;
      record.dailyTotalTryTimes += newData.length;
      saveRecordData(lang, record);
    }
  }
}
const paradoxGame: (store: any) => Game = ({store, paradoxStore}: any) => {
  const {chartsData, lang} = store;
  const {
    restList, setRestList,
    data, setData
  } = paradoxStore
  const judgeWin = (data: GuessItem[]) => data?.[data?.length - 1]?.guess?.restList?.length === 1;
  return {
    init: () => {
      if (false) {
      } else {
        setRestList(chartsData.map((v, i) => i));
      }
    },
    answer: chartsData[restList[0]],
    data,
    insertItem: (newItem) => {
      console.log(restList, 'restList')
      const length = restList.length;
      const oldRestList = restList;
      const timesDict = {} as any;
      for (let i = 0; i < length; i++) {
        const res = guessFn(newItem, chartsData[restList[i]])
        const {guess, ...rest} = res;
        // Object.values兼容性OK？
        const key = Object.keys(rest).map(k => rest[k]).join('|')
        if (timesDict[key]) {
          const {time, restList} = timesDict[key];
          timesDict[key] = {time: time + 1, res, restList: [...restList, oldRestList[i]]}
        } else {
          timesDict[key] = {time: 1, res, restList: [oldRestList[i]]}
        }
      }
      let maxData = {time: 0, res: {} as GuessItem, restList: []}
      Object.keys(timesDict).forEach(k => {
        // 相同的情况如何处理 todo????
        if (maxData.time < timesDict[k].time) {
          maxData = timesDict[k]
        }
      })
      console.log(maxData.restList, 'maxData.restList')
      maxData.res.guess.restList = maxData.restList
      const newData = [...data, maxData.res]
      setData(newData)
      setRestList(maxData.restList)
      return newData
    },
    judgeWin,
    isWin: judgeWin(data),
    judgeOver: data => judgeWin(data),
    isOver: judgeWin(data),
    gameOver: (newData) => {
      console.log(newData)
    }
  }
}
