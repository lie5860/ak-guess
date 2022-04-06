import {DAILY_MODE, DEFAULT_TRY_TIMES, MAIN_KEY, NOT_NAME_VAL_DICT, PARADOX_MODE, TYPES, VAL_DICT} from "../const";

const shareTextCreator = (data: any[], mode: string, today: string, showName: boolean, title: string, host: string) => {
  let text = `${title} `;
  if (mode === DAILY_MODE) {
    text += today + ' ';
  }
  if (mode !== PARADOX_MODE) {
    text += data.length + `/` + DEFAULT_TRY_TIMES;
  }
  data.forEach(v => {
    text += '\n'
    TYPES.map(({key, type}) => {
      if (key === 'guess') {
        showName && (text += v.guess?.[MAIN_KEY])
      } else {
        text += (showName ? VAL_DICT : NOT_NAME_VAL_DICT)[v[key]]
      }
    })
  })
  text += '\n' + host;
  return text
}
export default shareTextCreator
