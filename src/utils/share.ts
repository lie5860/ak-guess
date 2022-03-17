import {DAILY_MODE, defaultTryTimes, GAME_NAME, MAIN_KEY, TYPES, VAL_DICT} from "../const";
import {AppCtx} from '../locales/AppCtx';

const shareTextCreator = (data, mode, today, showName, title, host) => {
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
