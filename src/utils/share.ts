import {DAILY_MODE, DEFAULT_TRY_TIMES, MAIN_KEY, TYPES, VAL_DICT} from "../const";

const shareTextCreator = (data: any[], mode: string, today: string, showName: boolean, title: string, host: string) => {
  let text = `${title} `;
  if (mode === DAILY_MODE) {
    text += today + ' ';
  }
  text += data.length + `/` + DEFAULT_TRY_TIMES;
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
