// const host = 'https://74082082-1683720436570405.test.functioncompute.com/akapi/'
const axios = require('axios');
const host = 'http://akapi.saki.cc/'
const getDailyData = (server) => axios
  .get(`${host}?server=${server}`, {responseType: "json"})
  .then(function (response) {
    console.log(response.data, 'response')
    return response.data;
  })
  .catch(function (error) {
    alert('服务已崩溃 请联系管理员')
  });
const saveNum = (num,server) => axios
  .get(`${host}save.php?num=${num}&server=${server}`, {responseType: "json"})
  .then(function (response) {
    console.log(response.data, 'response')
    return response.data;
  })
  .catch(function (error) {
    alert('服务已崩溃 请联系管理员')
  });
const afterDealData = ({chartsData, server}) => {
  getDailyData(server).then(({num}) => {
    if (num !== chartsData.length) {
      saveNum(chartsData.length, server).then(() => {
      })
    }
  })
}
module.exports = {afterDealData}
