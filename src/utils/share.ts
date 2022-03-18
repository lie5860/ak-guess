import {DAILY_MODE, defaultTryTimes, MAIN_KEY, TYPES, VAL_DICT} from "../const";

const shareTextCreator = (data: any[], mode: string, today: string, showName: string, title: string, host: string) => {
  let text = `${title} `;
  if (mode === DAILY_MODE) {
    text += today + ' ';
  }
  text += data.length + `/` + defaultTryTimes;
  data.forEach(v => {
    text += '\n'
    TYPES.map(({key, type}) => {
      if (key === 'guess') {
        showName && (text += v.guess?.[MAIN_KEY])
      } else {
        text += VAL_DICT[v[key]]
      }
    })
  })
  text += '\n' + host;
  return text
}
export default shareTextCreator
