import {defaultTryTimes, TYPES, VAL_DICT} from "../const";

const shareTextCreator = (data, times, showName) => {
  let text = `干员猜猜乐 ` + (defaultTryTimes - times) + `/` + defaultTryTimes;
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
