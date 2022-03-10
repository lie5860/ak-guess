import {defaultTryTimes, TYPES, VAL_DICT} from "../const";

const shareTextCreator = (data, mode, today, showName, title) => {
  let text = `${title} `;
  if (mode === 'day') {
    text += today + ' ';
  }
  text += data.length + `/` + defaultTryTimes;
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
