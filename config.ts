import {getDailyData, saveNum} from "./src/server";

const afterDealData = ({chartsData}) => {
  getDailyData().then(({num}) => {
    if (num !== chartsData.length) {
      saveNum(chartsData.length).then(() => {
      })
    }
  })
}
export {afterDealData}
