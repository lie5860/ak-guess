import React from "react";

import ShareIcon from './ShareIcon'
import copyCurrentDay from "../utils/copyCurrentDay";
import {modeI18nKeyDict, DAILY_MODE, PARADOX_MODE, RANDOM_MODE} from "../const";
import {AppCtx} from '../locales/AppCtx';
import {localStorageGet, localStorageSet} from "../locales/I18nWrap";
import {hostDict} from "../locales";

export const DEFAULT_RECODE = {
  [RANDOM_MODE]: {
    playTimes: 0,
    winTimes: 0,
    totalTryTimes: 0,
    winTryTimes: 0,
    straightWins: 0,
    maxStraightWins: 0,
    minWinTimes: 0,
    roles:{}
  },
  [DAILY_MODE]: {
    playTimes: 0,
    winTimes: 0,
    totalTryTimes: 0,
    winTryTimes: 0,
    straightWins: 0,
    maxStraightWins: 0,
    minWinTimes: 0,
    roles:{}
  },
  [PARADOX_MODE]: {
    playTimes: 0,
    winTimes: 0,
    totalTryTimes: 0,
    winTryTimes: 0,
    straightWins: 0,
    maxStraightWins: 0,
    minWinTimes: 0,
    roles:{}
  }
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

const resetRecordData = (lang: string, mode: string, successTip: string) => {
  var record = loadRecordData(lang);
  record[mode] = DEFAULT_RECODE[mode];
  saveRecordData(lang, record);
  if (successTip) {
    window.mdui.snackbar(successTip);
  }
}

const saveRecordData = (lang: string, record: any) => {
  localStorageSet(lang, "record", JSON.stringify({...DEFAULT_RECODE, ...record}));
}

const reinitRecord = (lang: string) => {
  var record = loadRecordData(lang);
  if (record?.version != 1) {
    // 迁移数据
    if (record) {
      const newRecord = {
        [RANDOM_MODE]:{
          playTimes: record.playTimes ?? 0,
          winTimes : record.winTimes ?? 0,
          totalTryTimes: record.totalTryTimes ?? 0,
          winTryTimes: record.winTryTimes ?? 0,
          straightWins: record.straightWins ?? 0,
          maxStraightWins: record.maxStraightWins ?? 0,
          roles:{}
        },
        [DAILY_MODE]: {
          playTimes: record.dailyPlayTimes ?? 0,
          winTimes : record.dailyWinTimes ?? 0,
          totalTryTimes: record.dailyTotalTryTimes ?? 0,
          winTryTimes: record.dailyWinTryTimes ?? 0,
          straightWins: record.dailyStraightWins ?? 0,
          maxStraightWins: record.dailyMaxStraightWins,
          roles:{}
        },
        [PARADOX_MODE]: {
          playTimes: record.paradoxPlayTimes ?? 0,
          winTimes : record.paradoxWinTimes ?? 0,
          totalTryTimes: record.paradoxTotalTryTimes ?? 0,
          winTryTimes: record.paradoxWinTryTimes ?? 0,
          straightWins: record.paradoxStraightWins ?? 0,
          maxStraightWins: record.paradoxMaxStraightWins ?? 0,
          roles:{}
        }
      };
      record = newRecord;
    }
    record.version = 1;
    saveRecordData(lang, record);
  }
}
const getDataFn = (record: any, mode: string) => {
      return {
        playTimes: record[mode]?.playTimes,
        winTimes: record[mode]?.winTimes,
        winPercent: record[mode]?.playTimes && Math.ceil(record[mode]?.winTimes / record[mode]?.playTimes * 100),
        straightWins: record[mode]?.straightWins,
        maxStraightWins: record[mode]?.maxStraightWins,
        avgTryTimes: record[mode]?.winTimes && Math.ceil(record[mode]?.winTryTimes / record[mode]?.winTimes),
        minWinTimes: record[mode]?.minWinTimes?record[mode]?.minWinTimes:"N/A",
        operatorWinCount: Object.keys(record[mode]?.roles).length
      }
  return {}
}
const History = ({mode}: {mode: string}) => {
  const {i18n} = React.useContext(AppCtx);
  const record = loadRecordData(i18n.language);
  const getShareHistoryText = (mode: string) => {
    const title = i18n.get(modeI18nKeyDict[mode]);
    const {playTimes, winTimes, winPercent, straightWins, maxStraightWins, avgTryTimes, minWinTimes, operatorWinCount} = getDataFn(record, mode)
    let text = i18n.get('title') + ` ` + title + `\n`;
    text += i18n.get('playTimes') + playTimes + `\n`
    text += i18n.get('winTimes') + winTimes + `\n`
    text += i18n.get('winRate') + winPercent + `%\n`
    text += i18n.get('straightWins') + straightWins + `\n`
    text += i18n.get('maxStraightWins') + maxStraightWins + `\n`
    text += i18n.get('avgWinTimes') + avgTryTimes + i18n.get('avgWinTimesDesc') + `\n`
    text += i18n.get('minWinTimes') + minWinTimes + `\n`
    text += i18n.get('operatorWinCount') + operatorWinCount + `\n`
    text += hostDict[i18n.language]
    return text;
  }
  return <>
    <p className={'flex-center'}>
      <span className='title'>
        {i18n.get(modeI18nKeyDict[mode])}
      </span>
    </p>
    <hr/>
    <p>
      {i18n.get('playTimes')}{record[mode]?.playTimes}<br/>
      {i18n.get('winTimes')}{record[mode]?.winTimes}<br/>
      {i18n.get('winRate')}{record[mode]?.playTimes && Math.ceil(record[mode]?.winTimes / record[mode]?.playTimes * 100)}%<br/>
      {i18n.get('straightWins')}{record[mode]?.straightWins}<br/>
      {i18n.get('maxStraightWins')}{record[mode]?.maxStraightWins}<br/>
      {i18n.get('avgWinTimes')}{record[mode]?.winTimes && Math.ceil(record[mode]?.winTryTimes / record[mode]?.winTimes)}{i18n.get('avgWinTimesDesc')}<br/>
      {i18n.get('minWinTimes')}{record[mode]?.minWinTimes?record[mode]?.minWinTimes:"N/A"}<br/>
      {i18n.get('operatorWinCount')}{Object.keys(record[mode]?.roles).length}
    </p>
        <a className={'togglec'} onClick={() => {
          copyCurrentDay(getShareHistoryText(mode), i18n.get('copySuccess'))
        }}>
            <ShareIcon/>{i18n.get('shareTip1')}
        </a><a className={'togglec'} onClick={() => {
          window?.mduiModal?.close();
          setTimeout(()=>{
            window?.mdui.confirm( i18n.get("resetConfirm"),() => {
              resetRecordData(i18n.language, mode, i18n.get('resetSuccess'));
            },() => {
            }, {
              'confirmText': i18n.get('yes'),
              'cancelText': i18n.get('no')
            });
          }, 100)
    }}><i class="mdui-icon material-icons">&#xe92b;</i> {i18n.get('resetTip')}</a>
  </>;
}
export {
  loadRecordData, saveRecordData, reinitRecord, History
}
