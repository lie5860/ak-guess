import {React} from "../global";
import ShareIcon from './ShareIcon'
import copyCurrentDay from "../utils/copyCurrentDay";
import {DAILY_MODE} from "../const";
import {AppCtx} from '../locales/AppCtx';
import {localStorageGet, localStorageSet} from "../locales/I18nWrap";

const loadRecordData = (lang: string) => {
  let record: any = localStorageGet(lang, "record");
  if (record) {
    record = JSON.parse(record);
  } else {
    record = {
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
      dailyMaxStraightWins: 0
    }
  }
  return record;
}

const saveRecordData = (lang: string, record: any) => {
  localStorageSet(lang, "record", JSON.stringify(record));
}

const History = () => {
  const {i18n} = React.useContext(AppCtx);
  const record = loadRecordData(i18n.language);
  const getShareHistoryText = (mode: string) => {
    const title = mode === DAILY_MODE ? i18n.get('dailyMode') : i18n.get('randomMode');
    const playTimes = (mode === DAILY_MODE ? record?.dailyPlayTimes : record?.playTimes);
    const winTimes = (mode === DAILY_MODE ? record?.dailyWinTimes : record?.winTimes);
    const winPercent = (mode === DAILY_MODE ? record?.dailyPlayTimes && Math.ceil(record?.dailyWinTimes / record?.dailyPlayTimes * 100) : record?.playTimes && Math.ceil(record?.winTimes / record?.playTimes * 100));
    const straightWins = (mode === DAILY_MODE ? record?.dailyStraightWins : record?.straightWins);
    const maxStraightWins = (mode === DAILY_MODE ? record?.dailyMaxStraightWins : record?.maxStraightWins);
    const avgTryTimes = (mode === DAILY_MODE ? record?.dailyWinTimes && Math.ceil(record?.dailyWinTryTimes / record?.dailyWinTimes) : record?.winTimes && Math.ceil(record?.winTryTimes / record?.winTimes));
    let text = i18n.get('title') + ` ` + title + `\n`;
    text += i18n.get('playTimes') + playTimes + `\n`
    text += i18n.get('winTimes') + winTimes + `\n`
    text += i18n.get('winRate') + winPercent + `%\n`
    text += i18n.get('straightWins') + straightWins + `\n`
    text += i18n.get('maxStraightWins') + maxStraightWins + `\n`
    text += i18n.get('avgWinTimes') + avgTryTimes + i18n.get('avgWinTimesDesc') + `\n`
    text += i18n.get('host')
    return text;
  }
  return <>
    <p className={'flex-center'}>
      <ShareIcon onClick={() => {
        copyCurrentDay(getShareHistoryText('random'), i18n.get('copySuccess'))
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
      {i18n.get('avgWinTimes')}{record?.winTimes && Math.ceil(record?.winTryTimes / record?.winTimes)}{i18n.get('avgWinTimesDesc')}
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
      {i18n.get('avgWinTimes')}{record?.dailyWinTimes && Math.ceil(record?.dailyWinTryTimes / record?.dailyWinTimes)}{i18n.get('avgWinTimesDesc')}
    </p>
  </>;
}
export {
  loadRecordData, saveRecordData, History
}
