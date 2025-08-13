const axios = require('axios');
const host = 'http://akapi.saki.cc/'
const getDailyData = (server) => axios
  .get(`${host}?server=${server}`, {responseType: "json"})
  .then(function (response) {
    
    return response.data;
  })
  .catch(function (error) {
    alert('服务已崩溃 请联系管理员')
  });
const saveNum = (num, server, pass) => axios
  .get(`${host}save.php?num=${num}&server=${server}&pass=${pass}`, {responseType: "json"})
  .then(function (response) {
    
    return response.data;
  })
  .catch(function (error) {
    alert('服务已崩溃 请联系管理员')
  });
const getGameDataByLangAndName = (language, jsonName) => {
  const targetProject = language !== 'zh_CN' ? 'ArknightsGameData_YoStar' : 'ArknightsGameData';
  return axios.get(`https://raw.githubusercontent.com/Kengxxiao/${targetProject}/master/${language}/gamedata/excel/${jsonName}.json`).catch((err) => {
    
    // console.log(JSON.stringify(err))
    return getGameDataByLangAndName(language, jsonName)
  })
}
const afterDealData = ({chartsData, server, pass}) => {
  getDailyData(server).then(({num}) => {
    if (num !== chartsData.length) {
      saveNum(chartsData.length, server, pass).then(() => {
      })
    }
  })
}
module.exports = {afterDealData, getGameDataByLangAndName}
