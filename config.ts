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
const saveNum = (num, server) => axios
  .get(`${host}save.php?num=${num}&server=${server}`, {responseType: "json"})
  .then(function (response) {
    console.log(response.data, 'response')
    return response.data;
  })
  .catch(function (error) {
    alert('服务已崩溃 请联系管理员')
  });
const getGameDataByLangAndName = (language, jsonName) => {
  return axios.get(`https://raw.githubusercontent.com/Kengxxiao/ArknightsGameData/master/${language}/gamedata/excel/${jsonName}.json`).catch((err) => {
    console.log(`${language}语言 ${jsonName}文件 获取失败 重试`)
    // console.log(JSON.stringify(err))
    return getGameDataByLangAndName(language, jsonName)
  })
}
const afterDealData = ({chartsData, server}) => {
  getDailyData(server).then(({num}) => {
    if (num !== chartsData.length) {
      saveNum(chartsData.length, server).then(() => {
      })
    }
  })
}
module.exports = {afterDealData, getGameDataByLangAndName}
