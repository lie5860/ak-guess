import {DAILY_MODE, PARADOX_MODE, RANDOM_MODE, reportKeyDict, TYPES, RESULT, STORAGE, TZ_ASIA_SHANGHAI, DATE_FMT, DATE_TIME_FMT, API_BASE, API_REPORT_URL, API_ERROR_REPORT_URL, REPORT_RESULT} from "./const";
import {moment} from "./global";
import {localStorageGet, localStorageSet} from "./locales/I18nWrap";

// 假的UUID
function uuid() {
  function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }

  return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}

const axios = window.axios;
const guess = (inputItem: Character, answer: Character) => {
  const res: GuessItem = {} as GuessItem
  TYPES.forEach(({key, type}) => {
    if (key === 'guess') {
      return res[key] = inputItem
    }
    let emoji;
    switch (type) {
      case 'string':
        emoji = inputItem?.[key] === answer?.[key] ? RESULT.CORRECT : RESULT.WRONG;
        break;
      case 'number':
        const diff = Number(inputItem?.[key]) - Number(answer?.[key]);
        emoji = diff === 0 ? RESULT.CORRECT : (diff > 0 ? RESULT.DOWN : RESULT.UP)
        break;
      case 'array':
        const x = inputItem?.[key] || [];
        const y = answer?.[key] || [];
        const eqState = (xx: string[], yy: string[]) => {
          const x = [...new Set(xx)];
          const y = [...new Set(yy)];
          const l = new Set([...x, ...y]).size;
          if (x.length === y.length && x.length === l) return RESULT.CORRECT;
          if (x.length + y.length === l) return RESULT.WRONG;
          return RESULT.WRONG_POS;
        };
        emoji = eqState(x, y)
        break;
    }
    res[key] = emoji
  })
  return res
}
const host = `${API_BASE}/`
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
  const oldData = localStorageGet(lang, STORAGE.DAILY_DATA);
  const today = moment().tz(TZ_ASIA_SHANGHAI).format(DATE_FMT);
  if (oldData) {
    try {
      const data = JSON.parse(oldData);
      if (data?.res?.server_date === today) {
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
      localStorageSet(lang, STORAGE.DAILY_DATA, JSON.stringify({
        res
      }));
      return response.data;
    })
    .catch(function () {
      alert('服务已崩溃 请联系管理员')
    })
  return cacheLoad(`${today}|${STORAGE.DAILY_DATA}`, getDataFn)
};

export interface Answers {
  index: number;
  name?: string;
}

export interface Extend {
  answers: Answers[];
}

export interface ReportData {
  mode: string;
  server: string;
  answer: number;
  op_time: string;
  result: number;
  try_times: number;
  user: string;
  extend: Extend;
}

const reportData = (data: ReportData) => {
  axios.post(API_REPORT_URL,data).catch(() => {
  })
  // try {
  //   window._hmt.push(['_trackEvent', category, action, opt_label, opt_value]);
  // } catch (e) {
  // }
}
interface ErrData{
  message:string;
  stack:string;
  localstorage:string;
}
export const reportError = (errData: ErrData) => {
  axios.post(API_ERROR_REPORT_URL,errData).catch(() => {
  })
}
interface OptLabel {
  answer: number;
  inputArray?: Answers[];
}

const INIT = REPORT_RESULT.INIT;
const WIN = REPORT_RESULT.WIN;
const LOSE = REPORT_RESULT.LOSE;
const GIVE_UP = REPORT_RESULT.GIVE_UP;
const resultDict: { [key: string]: number } = {
  [INIT]: 0,
  [WIN]: 1,
  [LOSE]: 2,
  [GIVE_UP]: 3
}
const commonReport = (server: string, optLabel: OptLabel, mode: string, type: string) => {
  const {answer} = optLabel
  let user = '';
  if (localStorage.getItem(STORAGE.UUID)) {
    user = localStorage.getItem(STORAGE.UUID) || ''
  } else {
    user = uuid();
    localStorage.setItem(STORAGE.UUID, user);
  }
  reportData({
    server,
    mode: reportKeyDict[mode],
    answer,
    op_time: moment().tz(TZ_ASIA_SHANGHAI).format(DATE_TIME_FMT),
    result: resultDict[type],
    try_times: optLabel?.inputArray?.length ?? 0,
    user,
    extend: {
      answers: (optLabel?.inputArray || []).map(({index}) => {
        return {
          index
        }
      })
    }
  })
}
const dailyGameInit = (server: string, optLabel: OptLabel) => {
  commonReport(server, optLabel, DAILY_MODE, INIT);
  // reportData(`daily|${server}`, 'init', JSON.stringify(optLabel))
}
const dailyGameWin = (server: string, optLabel: OptLabel) => {
  commonReport(server, optLabel, DAILY_MODE, WIN);
  // reportData(`daily|${server}`, 'win', JSON.stringify(optLabel), times)
}
const dailyGameLose = (server: string, optLabel: OptLabel) => {
  commonReport(server, optLabel, DAILY_MODE, LOSE);
  // reportData(`daily|${server}`, 'lose', JSON.stringify(optLabel))
}

const randomGameInit = (server: string, optLabel: OptLabel) => {
  commonReport(server, optLabel, RANDOM_MODE, INIT);
  // reportData(`random|${server}`, 'init', JSON.stringify(optLabel))
}
const randomGameWin = (server: string, optLabel: OptLabel) => {
  commonReport(server, optLabel, RANDOM_MODE, WIN);
  // reportData(`random|${server}`, 'win', JSON.stringify(optLabel), times)
}
const randomGameLose = (server: string, optLabel: OptLabel) => {
  commonReport(server, optLabel, RANDOM_MODE, LOSE);
  // reportData(`random|${server}`, 'lose', JSON.stringify(optLabel))
}
const randomGameGiveUp = (server: string, optLabel: OptLabel) => {
  commonReport(server, optLabel, RANDOM_MODE, GIVE_UP);
  // reportData(`random|${server}`, 'giveUp', JSON.stringify(optLabel))
}
const paradoxGameWin = (server: string, optLabel: OptLabel) => {
  commonReport(server, optLabel, PARADOX_MODE, WIN);
}
const paradoxGameGiveUp = (server: string, optLabel: OptLabel) => {
  commonReport(server, optLabel, PARADOX_MODE, GIVE_UP);
}
const paradoxGameInit = (server: string, optLabel: OptLabel) => {
  commonReport(server, optLabel, PARADOX_MODE, INIT);
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
  dailyGameLose,
  paradoxGameWin,
  paradoxGameGiveUp,
  paradoxGameInit
}
