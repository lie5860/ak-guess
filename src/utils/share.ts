import {DAILY_MODE, DEFAULT_TRY_TIMES, MAIN_KEY, NOT_NAME_VAL_DICT, PARADOX_MODE, TYPES, VAL_DICT} from "../const";
import {hostDict} from "../locales";

interface ShareParams {
  mode: string;
  today: string;
  showName: boolean;
  i18n: any;
  game: Game;
}

const shareTextCreator = ({
                            game,
                            mode,
                            today,
                            showName,
                            i18n
                          }: ShareParams
) => {
  let text = `${i18n.get('title')} `;
  if (mode === DAILY_MODE) {
    text += today + ' ';
  }
  if (mode !== PARADOX_MODE) {
    text += game.data.length + `/` + DEFAULT_TRY_TIMES;
  } else {
    text += `${i18n.get('paradoxModeShareText')} `
    if (game.isWin) {
      text += `${i18n.get('paradoxShareTimesTip', {times: game.data.length})}`
    } else {
      text += `${i18n.get('paradoxGamingShareTip')} `
    }
  }
  game.data.forEach(v => {
    text += '\n'
    TYPES.map(({key}) => {
      if (key === 'guess') {
        showName && (text += v.guess?.[MAIN_KEY])
      } else {
        text += (showName ? VAL_DICT : NOT_NAME_VAL_DICT)[v[key]]
      }
    })
  })
  text += '\n' + hostDict[i18n.language];
  return text
}
export default shareTextCreator
