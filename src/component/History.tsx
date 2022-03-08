import {React} from "../global";
import ShareIcon from './ShareIcon'
import copyCurrentDay from "../utils/copyCurrentDay";

const loadRecordData = () => {
  let record = localStorage.getItem("record");
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

const saveRecordData = (record) => {
  localStorage.setItem("record", JSON.stringify(record));
}

const History = ({setMsg}) => {
  const record = loadRecordData();
  const getShareHistoryText = (mode) => {
    const title = mode === 'day' ? '每日挑战！':'随心所欲！';
    const playTimes = (mode === 'day' ? record?.dailyPlayTimes : record?.playTimes);
    const winTimes = (mode === 'day' ? record?.dailyWinTimes : record?.winTimes);
    const winPercent = (mode === 'day' ? record?.dailyPlayTimes && Math.ceil(record?.dailyWinTimes / record?.dailyPlayTimes * 100) : record?.playTimes && Math.ceil(record?.winTimes / record?.playTimes * 100));
    const straightWins = (mode === 'day' ? record?.dailyStraightWins : record?.straightWins);
    const maxStraightWins = (mode === 'day' ? record?.dailyMaxStraightWins : record?.maxStraightWins);
    const avgTryTimes = (mode === 'day' ? record?.dailyWinTimes && Math.ceil(record?.dailyWinTryTimes / record?.dailyWinTimes) : record?.winTimes && Math.ceil(record?.winTryTimes / record?.winTimes));
    let text = `干员猜猜乐 ` + title + `\n`;
    text += `游戏次数：`+ playTimes +`\n`
    text += `胜利次数：`+ winTimes +`\n`
    text += `胜率：`+ winPercent +`%\n`
    text += `当前连胜次数：`+straightWins+`\n`
    text += `最大连胜次数：`+maxStraightWins+`\n`
    text += `平均猜测次数：`+avgTryTimes+`（胜利时）\n`
    return text;
  }
  return <><p><ShareIcon onClick={() => { copyCurrentDay(getShareHistoryText('random'),setMsg) }}/><span className='title'>随心所欲！</span></p>
<p>游戏次数：{record?.playTimes}<br/>
      胜利次数：{record?.winTimes}<br/>
      胜率：{record?.playTimes && Math.ceil(record?.winTimes / record?.playTimes * 100)}%<br/>
      当前连胜次数：{record?.straightWins}<br/>
      最大连胜次数：{record?.maxStraightWins}<br/>
      平均猜测次数：{record?.winTimes && Math.ceil(record?.winTryTimes / record?.winTimes)}（胜利时）
    </p>
    <hr/>
    <p><ShareIcon onClick={() => { copyCurrentDay(getShareHistoryText('day'),setMsg) }}/><span className='title'>每日挑战！</span></p>
<p>游戏次数：{record?.dailyPlayTimes}<br/>
      胜利次数：{record?.dailyWinTimes}<br/>
      胜率：{record?.dailyPlayTimes && Math.ceil(record?.dailyWinTimes / record?.dailyPlayTimes * 100)}%<br/>
      当前连胜次数：{record?.dailyStraightWins}<br/>
      最大连胜次数：{record?.dailyMaxStraightWins}<br/>
      平均猜测次数：{record?.dailyWinTimes && Math.ceil(record?.dailyWinTryTimes / record?.dailyWinTimes)}（胜利时）
    </p>
  </>;
}
export {
  loadRecordData, saveRecordData, History
}
