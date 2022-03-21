import {moment} from "./global";

import {DAILY_MODE, RANDOM_MODE} from "./const";
import {loadRecordData, saveRecordData} from "./component/History";
import {localStorageGet, localStorageSet} from "./locales/I18nWrap";
import {guess} from "./server";

export const getGame = (store: any) => {
  const {mode} = store
  const gameDict: { [key: string]: (store: any) => any } = {
    [RANDOM_MODE]: randomGame,
    [DAILY_MODE]: dailyGame
  }
  return gameDict[mode](store)
}
// game 需要暴露存储数据的key
const randomGame = (store: any) => {
  const {setRandomData, setRandomAnswerKey, randomAnswerKey, randomData, chartsData, lang} = store
  return {
    init: () => {
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
    answer: chartsData[randomAnswerKey],
    data: randomData,
    setData: (v: any[], isGiveUp: boolean) => {
      localStorageSet(lang, 'r-randomData', JSON.stringify(v))
      localStorageSet(lang, 'r-randomAnswerKey', `${randomAnswerKey}`)
      localStorageSet(lang, 'giveUp', `${isGiveUp}`)
      setRandomData(v)
    },
    gameOver: (newData: any[], isWin: boolean) => {
      let record: any = loadRecordData(lang);
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
      saveRecordData(lang, record);
    }
  }
}
const dailyGame = (store: any) => {
  const {setDayData, remoteAnswerKey, dayData, today, chartsData, lang} = store
  return {
    init: () => {
      const dayData = localStorageGet(lang, today + 'dayData')
      if (dayData) {
        setDayData(JSON.parse(dayData))
      }
    },
    answer: chartsData[remoteAnswerKey],
    data: dayData,
    setData: (v: any[]) => {
      localStorageSet(lang, today + 'dayData', JSON.stringify(v))
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
      let record: any = loadRecordData(lang);
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
      saveRecordData(lang, record);
    }
  }
}
