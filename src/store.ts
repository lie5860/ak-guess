import {moment, React} from "./global";

import {chartsData, DAILY_MODE, RANDOM_MODE} from "./const";
import {loadRecordData, saveRecordData} from "./component/History";

export const getGame = (store: any) => {
  const {mode} = store
  const gameDict = {
    [RANDOM_MODE]: randomGame,
    [DAILY_MODE]: dailyGame
  }
  return gameDict[mode](store)
}
const randomGame = (store: any) => {
  const {setRandomData, setRandomAnswerKey, randomAnswerKey, randomData, isGiveUp} = store
  return {
    init: () => {
      const randomData = localStorage.getItem('randomData')
      if (randomData) {
        setRandomData(JSON.parse(randomData))
        setRandomAnswerKey(Number(localStorage.getItem('randomAnswerKey')))
      }
    },
    answer: chartsData[randomAnswerKey],
    data: randomData,
    setData: (v: any[]) => {
      localStorage.setItem('randomData', JSON.stringify(v))
      localStorage.setItem('randomAnswerKey', `${randomAnswerKey}`)
      localStorage.setItem('giveUp', isGiveUp)
      setRandomData(v)
    },
    gameOver: (newData: any[], isWin: boolean) => {
      let record: any = loadRecordData();
      if (isWin) {
        record.winTryTimes += newData.length;
        record.winTimes += 1;
        record.straightWins += 1;
        if (record.straightWins > record.maxStraightWins) {
          record.maxStraightWins = record.straightWins;
        }
      } else {
        record.straightWins = 0;
      }
      record.playTimes += 1;
      record.totalTryTimes += newData.length;
      saveRecordData(record);
    }
  }
}
const dailyGame = (store: any) => {
  const {setDayData, remoteAnswerKey, dayData, today} = store
  return {
    init: () => {
      const dayData = localStorage.getItem(today + 'dayData')
      if (dayData) {
        setDayData(JSON.parse(dayData))
      }
    },
    answer: chartsData[remoteAnswerKey],
    data: dayData,
    setData: (v: any[]) => {
      localStorage.setItem(today + 'dayData', JSON.stringify(v))
      setDayData(v)
    },
    preSubmitCheck: () => {
      if (today !== moment().tz("Asia/Shanghai").format('YYYY-MM-DD')) {
        alert('数据已更新，即将刷新页面')
        window.location.reload()
        return true;
      }
    },
    gameOver: (newData: any[], isWin: boolean) => {
      let record: any = loadRecordData();
      if (isWin) {
        record.dailyWinTimes += 1;
        record.dailyWinTryTimes += newData.length;
        record.dailyStraightWins += 1;
        if (record.dailyStraightWins > record.dailyMaxStraightWins) {
          record.dailyMaxStraightWins = record.dailyStraightWins;
        }
      } else {
        record.dailyStraightWins = 0;
      }
      record.dailyPlayTimes += 1;
      record.dailyTotalTryTimes += newData.length;
      saveRecordData(record);
    }
  }
}
