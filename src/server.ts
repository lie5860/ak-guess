const axios = window.axios;
const getDailyData = () => axios
  .get('https://74082082-1683720436570405.test.functioncompute.com/akapi/', {responseType: "json"})
  .then(function (response) {
    console.log(response.data, 'response')
    return response.data;
  })
  .catch(function (error) {
    alert('服务已崩溃 请联系管理员')
  });
const saveNum = (num) => axios
  .get(`https://74082082-1683720436570405.test.functioncompute.com/akapi/save.php?num=${num}`, {responseType: "json"})
  .then(function (response) {
    console.log(response.data, 'response')
    return response.data;
  })
  .catch(function (error) {
    alert('服务已崩溃 请联系管理员')
  });
export {
  getDailyData,
  saveNum
}
