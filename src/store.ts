import {moment, React} from "./global";

import {DAILY_MODE, DEFAULT_TRY_TIMES, MAIN_KEY, RANDOM_MODE} from "./const";
import {loadRecordData, saveRecordData} from "./component/History";
import {localStorageGet, localStorageSet} from "./locales/I18nWrap";
import {
  dailyGameLose,
  dailyGameWin, getDailyData,
  guess,
  randomGameGiveUp,
  randomGameInit,
  randomGameLose,
  randomGameWin
} from "./server";

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
export const useGame = (store: any) => {
  const randomStore = useRandomStore()
  const dailyStore = useDailyStore()
  const {mode} = store
  const gameDict: { [key: string]: (store: any) => any } = {
    [RANDOM_MODE]: randomGame,
    [DAILY_MODE]: dailyGame
  }
  return gameDict[mode]({store, randomStore, dailyStore})
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
  const isWin = data?.[data?.length - 1]?.guess?.[MAIN_KEY] === answer?.[MAIN_KEY];
  const isOver = data.length >= DEFAULT_TRY_TIMES || isWin || isGiveUp;
  const setData = (newData: any[], isGiveUp: boolean) => {
    localStorageSet(lang, 'r-randomData', JSON.stringify(newData))
    localStorageSet(lang, 'r-randomAnswerKey', `${randomAnswerKey}`)
    localStorageSet(lang, 'giveUp', `${isGiveUp}`)
    setRandomData(newData)
  }
  return {
    init: () => {
      const giveUp = localStorageGet(lang, "giveUp")
      if (giveUp) {
        setGiveUp(giveUp === 'true');
      }
      const randomData = localStorageGet(lang, 'r-randomData')
      if (randomData) {
        let oldData = JSON.parse(randomData)
        const answerKey = Number(localStorageGet(lang, 'r-randomAnswerKey'))
        const answer = chartsData[answerKey]
        try {
          oldData = oldData.map((inputItem: any) => {
            return guess(inputItem.guess, answer)
          })
        } catch (e) {
        }
        setRandomData(oldData)
        setRandomAnswerKey(answerKey)
      }
    },
    answer,
    data: randomData,
    isWin,
    isOver,
    setData: (newData: any[], isGiveUp: boolean) => {
      localStorageSet(lang, 'r-randomData', JSON.stringify(newData))
      localStorageSet(lang, 'r-randomAnswerKey', `${randomAnswerKey}`)
      localStorageSet(lang, 'giveUp', `${isGiveUp}`)
      setRandomData(newData)
    },
    gameOver: (newData: any[], isWin: boolean) => {
      let record: any = loadRecordData(lang);
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
    newGame: () => {
      setGiveUp(false);
      setData([], false)
      const answer = Math.floor(Math.random() * chartsData.length);
      setRandomAnswerKey(answer)
      randomGameInit(lang, {answer})
    },
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
  const isWin = data?.[data?.length - 1]?.guess?.[MAIN_KEY] === answer?.[MAIN_KEY];
  const isOver = data.length >= DEFAULT_TRY_TIMES || isWin;
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
    isOver,
    setData: (newData: any[]) => {
      localStorageSet(lang, today + 'dayData', JSON.stringify(newData))
      setDayData(newData)
    },
    preSubmitCheck: () => {
      if (today !== moment().tz("Asia/Shanghai").format('YYYY-MM-DD')) {
        alert('数据已更新，即将刷新页面')
        window.location.reload()
        return true;
      }
    },
    gameOver: (newData: any[], isWin: boolean) => {
      let record: any = loadRecordData(lang);
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
