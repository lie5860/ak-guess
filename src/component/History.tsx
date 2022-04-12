import {React} from "../global";
import ShareIcon from './ShareIcon'
import copyCurrentDay from "../utils/copyCurrentDay";
import {DAILY_MODE, modeI18nKeyDict, PARADOX_MODE, RANDOM_MODE} from "../const";
import {AppCtx} from '../locales/AppCtx';
import {localStorageGet, localStorageSet} from "../locales/I18nWrap";
import {hostDict} from "../locales";

export const DEFAULT_RECODE = {
  playTimes: 0,
  winTimes: 0,
  totalTryTimes: 0,
  winTryTimes: 0,
  straightWins: 0,
  maxStraightWins: 0,
  dailyPlayTimes: 0,
  dailyWinTimes: 0,
  dailyWinTryTimes: 0,
  dailyTotalTryTimes: 0,
  dailyStraightWins: 0,
  dailyMaxStraightWins: 0,
  paradoxPlayTimes: 0,
  paradoxWinTimes: 0,
  paradoxWinTryTimes: 0,
  paradoxTotalTryTimes: 0,
  paradoxStraightWins: 0,
  paradoxMaxStraightWins: 0
}
const loadRecordData = (lang: string) => {
  let record: any = localStorageGet(lang, "record");
  if (record) {
    record = JSON.parse(record);
  } else {
    record = DEFAULT_RECODE
  }
  return record;
}

const saveRecordData = (lang: string, record: any) => {
  localStorageSet(lang, "record", JSON.stringify({...DEFAULT_RECODE, ...record}));
}
const getDataFn = (record: any, mode: string) => {
  switch (mode) {
    case DAILY_MODE:
      return {
        playTimes: record?.dailyPlayTimes,
        winTimes: record?.dailyWinTimes,
        winPercent: record?.dailyPlayTimes && Math.ceil(record?.dailyWinTimes / record?.dailyPlayTimes * 100),
        straightWins: record?.dailyStraightWins,
        maxStraightWins: record?.dailyMaxStraightWins,
        avgTryTimes: record?.dailyWinTimes && Math.ceil(record?.dailyWinTryTimes / record?.dailyWinTimes)
      }
    case RANDOM_MODE:
      return {
        playTimes: record?.playTimes,
        winTimes: record?.winTimes,
        winPercent: record?.playTimes && Math.ceil(record?.winTimes / record?.playTimes * 100),
        straightWins: record?.straightWins,
        maxStraightWins: record?.maxStraightWins,
        avgTryTimes: record?.winTimes && Math.ceil(record?.winTryTimes / record?.winTimes)
      }

    case PARADOX_MODE:
      return {
        playTimes: record?.paradoxPlayTimes,
        winTimes: record?.paradoxWinTimes,
        winPercent: record?.paradoxPlayTimes && Math.ceil(record?.paradoxWinTimes / record?.paradoxPlayTimes * 100),
        straightWins: record?.paradoxStraightWins,
        maxStraightWins: record?.paradoxMaxStraightWins,
        avgTryTimes: record?.paradoxWinTimes && Math.ceil(record?.paradoxWinTryTimes / record?.paradoxWinTimes)
      }
  }
  return {}
}
const History = () => {
  const {i18n} = React.useContext(AppCtx);
  const record = loadRecordData(i18n.language);
  const getShareHistoryText = (mode: string) => {
    console.log(mode, 'mode')
    const title = i18n.get(modeI18nKeyDict[mode]);
    const {playTimes, winTimes, winPercent, straightWins, maxStraightWins, avgTryTimes} = getDataFn(record, mode)
    let text = i18n.get('title') + ` ` + title + `\n`;
    text += i18n.get('playTimes') + playTimes + `\n`
    text += i18n.get('winTimes') + winTimes + `\n`
    text += i18n.get('winRate') + winPercent + `%\n`
    text += i18n.get('straightWins') + straightWins + `\n`
    text += i18n.get('maxStraightWins') + maxStraightWins + `\n`
    text += i18n.get('avgWinTimes') + avgTryTimes + i18n.get('avgWinTimesDesc') + `\n`
    text += hostDict[i18n.language]
    return text;
  }
  return <>
    <p className={'flex-center'}>
      <ShareIcon onClick={() => {
        copyCurrentDay(getShareHistoryText(RANDOM_MODE), i18n.get('copySuccess'))
      }}/>
      <span className='title'>
        {i18n.get('randomMode')}
      </span>
    </p>
    <p>
      {i18n.get('playTimes')}{record?.playTimes}<br/>
      {i18n.get('winTimes')}{record?.winTimes}<br/>
      {i18n.get('winRate')}{record?.playTimes && Math.ceil(record?.winTimes / record?.playTimes * 100)}%<br/>
      {i18n.get('straightWins')}{record?.straightWins}<br/>
      {i18n.get('maxStraightWins')}{record?.maxStraightWins}<br/>
      {i18n.get('avgWinTimes')}{record?.winTimes && Math.ceil(record?.winTryTimes / record?.winTimes)}{i18n.get('avgWinTimesDesc')}<br/>
      {i18n.get('minWinTimes')}{record?.minWinTimes}<br/>
      {i18n.get('operatorWinCount')}{record?.opWinCount}
    </p>
    <hr/>
    <p className={'flex-center'}>
      <ShareIcon onClick={() => {
        copyCurrentDay(getShareHistoryText(DAILY_MODE), i18n.get('copySuccess'))
      }}/>
      <span className='title'>
        {i18n.get('dailyMode')}
      </span>
    </p>
    <p>
      {i18n.get('playTimes')}{record?.dailyPlayTimes}<br/>
      {i18n.get('winTimes')}{record?.dailyWinTimes}<br/>
      {i18n.get('winRate')}{record?.dailyPlayTimes && Math.ceil(record?.dailyWinTimes / record?.dailyPlayTimes * 100)}%<br/>
      {i18n.get('straightWins')}{record?.dailyStraightWins}<br/>
      {i18n.get('maxStraightWins')}{record?.dailyMaxStraightWins}<br/>
      {i18n.get('avgWinTimes')}{record?.dailyWinTimes && Math.ceil(record?.dailyWinTryTimes / record?.dailyWinTimes)}{i18n.get('avgWinTimesDesc')}<br/>
      {i18n.get('minWinTimes')}{record?.dailyMinWinTimes}<br/>
      {i18n.get('operatorWinCount')}{record?.dailyOpWinCount}
    </p>
    <hr/>
    <p className={'flex-center'}>
      <ShareIcon onClick={() => {
        copyCurrentDay(getShareHistoryText(PARADOX_MODE), i18n.get('copySuccess'))
      }}/>
      <span className='title'>
        {i18n.get('paradoxMode')}
      </span>
    </p>
    <p>
      {i18n.get('playTimes')}{record?.paradoxPlayTimes}<br/>
      {i18n.get('winTimes')}{record?.paradoxWinTimes}<br/>
      {i18n.get('winRate')}{record?.paradoxPlayTimes && Math.ceil(record?.paradoxWinTimes / record?.paradoxPlayTimes * 100)}%<br/>
      {i18n.get('straightWins')}{record?.paradoxStraightWins}<br/>
      {i18n.get('maxStraightWins')}{record?.paradoxMaxStraightWins}<br/>
      {i18n.get('avgWinTimes')}{record?.paradoxWinTimes && Math.ceil(record?.paradoxWinTryTimes / record?.paradoxWinTimes)}{i18n.get('avgWinTimesDesc')}<br/>
      {i18n.get('minWinTimes')}{record?.paradoxMinWinTimes}<br/>
      {i18n.get('operatorWinCount')}{record?.paradoxOpWinCount}
    </p>
  </>;
}
export {
  loadRecordData, saveRecordData, History
}
