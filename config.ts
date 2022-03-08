// const host = 'https://74082082-1683720436570405.test.functioncompute.com/akapi/'
const axios = require('axios');
const host = 'http://akapi.saki.cc/'
const getDailyData = () => axios
  .get(`${host}`, {responseType: "json"})
  .then(function (response) {
    console.log(response.data, 'response')
    return response.data;
  })
  .catch(function (error) {
    alert('服务已崩溃 请联系管理员')
  });
const saveNum = (num) => axios
  .get(`${host}save.php?num=${num}`, {responseType: "json"})
  .then(function (response) {
    console.log(response.data, 'response')
    return response.data;
  })
  .catch(function (error) {
    alert('服务已崩溃 请联系管理员')
  });
const afterDealData = ({chartsData}) => {
  getDailyData().then(({num}) => {
    if (num !== chartsData.length) {
      saveNum(chartsData.length).then(() => {
      })
    }
  })
}
module.exports = {afterDealData}
