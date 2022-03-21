import {TYPES} from "./const";
import {moment} from "./global";
import {localStorageGet, localStorageSet} from "./locales/I18nWrap";

const axios = window.axios;
const guess = (inputItem, answer) => {
  const res = {}
  TYPES.forEach(({key, type}) => {
    if (key === 'guess') {
      return res[key] = inputItem
    }
    let emoji;
    switch (type) {
      case 'string':
        emoji = inputItem?.[key] === answer?.[key] ? 'correct' : 'wrong';
        break;
      case 'number':
        const diff = Number(inputItem?.[key]) - Number(answer?.[key]);
        emoji = diff === 0 ? 'correct' : (diff > 0 ? 'down' : 'up')
        break;
      case 'array':
        const x = inputItem?.[key] || [];
        const y = answer?.[key] || [];
        const eqState = (xx, yy) => {
          const x = [...new Set(xx)];
          const y = [...new Set(yy)];
          const l = new Set([...x, ...y]).size;
          if (x.length === y.length && x.length === l) return 'correct';
          if (x.length + y.length === l) return 'wrong';
          return 'wrongpos';
        };
        emoji = eqState(x, y)
        break;
    }
    res[key] = emoji
  })
  return res
}
// const host = 'https://74082082-1683720436570405.test.functioncompute.com/akapi/'
const host = '//akapi.saki.cc/'
const getDailyData = (lang: string) => {
  const oldData = localStorageGet(lang, 'dailyData');
  if (oldData) {
    try {
      const data = JSON.parse(oldData);
      if (data.date === moment().tz("Asia/Shanghai").format('YYYY-MM-DD')) {
        return Promise.resolve(data.res)
      }
    } catch (e) {

    }
  }
  return axios
    .get(`${host}?server=${lang}`, {responseType: "json"})
    .then(function (response) {
      const res = response.data;
      localStorageSet(lang, 'dailyData', JSON.stringify({
        res,
        date: moment().tz("Asia/Shanghai").format('YYYY-MM-DD')
      }));
      return response.data;
    })
    .catch(function (error) {
      alert('服务已崩溃 请联系管理员')
    })
};
const reportData = (category: string, action: string, opt_label?: string, opt_value?: number) => {
  try {
    window._hmt.push(['_trackEvent', category, action, opt_label, opt_value]);
  } catch (e) {
  }
}

interface OptLabel {
  answer: number;
  inputArray?: string[];
}

const dailyGameInit = (server: string, optLabel: OptLabel) => {
  reportData(`daily_game|${server}`, 'init', JSON.stringify(optLabel))
}
const dailyGameWin = (server: string, optLabel: OptLabel, times: number) => {
  reportData(`daily_game|${server}`, 'win', JSON.stringify(optLabel), times)
}
const dailyGameLose = (server: string, optLabel: OptLabel) => {
  reportData(`daily_game|${server}`, 'lose', JSON.stringify(optLabel))
}

const randomGameInit = (server: string, optLabel: OptLabel) => {
  reportData(`random_game|${server}`, 'init', JSON.stringify(optLabel))
}
const randomGameWin = (server: string, optLabel: OptLabel, times: number) => {
  reportData(`random_game|${server}`, 'win', JSON.stringify(optLabel), times)
}
const randomGameLose = (server: string, optLabel: OptLabel) => {
  reportData(`random_game|${server}`, 'lose', JSON.stringify(optLabel))
}
const randomGameGiveUp = (server: string, optLabel: OptLabel) => {
  reportData(`random_game|${server}`, 'giveUp', JSON.stringify(optLabel))
}
export {
  getDailyData,
  guess,
  dailyGameInit,
  randomGameInit,
  randomGameWin,
  randomGameGiveUp,
  randomGameLose,
  dailyGameWin,
  dailyGameLose
}
