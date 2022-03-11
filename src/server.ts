import {TYPES} from "./const";
import { moment } from "./global";

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
        const eqState = (x, y) => {
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
const host = 'https://74082082-1683720436570405.test.functioncompute.com/akapi/'
// const host = 'http://akapi.saki.cc/'
const getDailyData = () => {
  const oldData = localStorage.getItem('dailyData');
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
    .get(`${host}`, {responseType: "json"})
    .then(function (response) {
      const res = response.data;
      localStorage.setItem('dailyData', JSON.stringify({
        res,
        date: moment().tz("Asia/Shanghai").format('YYYY-MM-DD')
      }));
      return response.data;
    })
    .catch(function (error) {
      alert('服务已崩溃 请联系管理员')
    })
};
export {
  getDailyData,
  guess
}
