import {defaultTryTimes, TYPES, VAL_DICT} from "../const";

const shareTextCreator = (data, mode, times, today, showName) => {
  let text = `干员猜猜乐 `;
  if (mode === 'day') {
    text += today + ' ';
  }
  text += (defaultTryTimes - times) + `/` + defaultTryTimes;
  data.forEach(v => {
    text += '\n'
    TYPES.map(({key, type}) => {
      if (key === 'guess') {
        showName && (text += v.guess.name)
      } else {
        text += VAL_DICT[v[key]]
      }
    })
  })
  text += '\nhttp://akg.saki.cc';
  return text
}
export default shareTextCreator
