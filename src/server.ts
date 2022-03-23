import {TYPES} from "./const";
import {moment} from "./global";
import {localStorageGet, localStorageSet} from "./locales/I18nWrap";

const axios = window.axios;
const guess = (inputItem: Character, answer: Character) => {
  const res: { guess?: Character, [key: string]: any } = {}
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
        const eqState = (xx: string[], yy: string[]) => {
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
const host = '//akapi.saki.cc/'
const cacheDict: any = {}
// 队列改造 防止并发时多次触发
const cacheLoad = async (cacheKey: string, getDataFn: () => any) => {
  let data: any[] | Promise<any[]>;
  const cache = cacheDict[cacheKey]
  if (cache) {
    const temp = cacheDict[cacheKey];
    if (temp instanceof Promise) {
      data = await temp;
    } else {
      data = temp;
    }
  } else {
    const temp = getDataFn();
    cacheDict[cacheKey] = temp;
    data = await temp;
    cacheDict[cacheKey] = data;
  }
  return data;
}
const getDailyData = (lang: string) => {
  const oldData = localStorageGet(lang, 'dailyData');
  const today = moment().tz("Asia/Shanghai").format('YYYY-MM-DD');
  if (oldData) {
    try {
      const data = JSON.parse(oldData);
      if (data.date === today) {
        return Promise.resolve(data.res)
      }
    } catch (e) {
    }
  }
  const getDataFn = () => axios
    .get(`${host}?server=${lang}`, {responseType: "json"})
    .then(function (response: any) {
      const res = response.data;
      dailyGameInit(lang, {answer: response.data.daily})
      localStorageSet(lang, 'dailyData', JSON.stringify({
        res,
        date: today
      }));
      return response.data;
    })
    .catch(function () {
      alert('服务已崩溃 请联系管理员')
    })
  return cacheLoad(`${today}|dailyData`, getDataFn)
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
  reportData(`daily|${server}`, 'init', JSON.stringify(optLabel))
}
const dailyGameWin = (server: string, optLabel: OptLabel, times: number) => {
  reportData(`daily|${server}`, 'win', JSON.stringify(optLabel), times)
}
const dailyGameLose = (server: string, optLabel: OptLabel) => {
  reportData(`daily|${server}`, 'lose', JSON.stringify(optLabel))
}

const randomGameInit = (server: string, optLabel: OptLabel) => {
  reportData(`random|${server}`, 'init', JSON.stringify(optLabel))
}
const randomGameWin = (server: string, optLabel: OptLabel, times: number) => {
  reportData(`random|${server}`, 'win', JSON.stringify(optLabel), times)
}
const randomGameLose = (server: string, optLabel: OptLabel) => {
  reportData(`random|${server}`, 'lose', JSON.stringify(optLabel))
}
const randomGameGiveUp = (server: string, optLabel: OptLabel) => {
  reportData(`random|${server}`, 'giveUp', JSON.stringify(optLabel))
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
