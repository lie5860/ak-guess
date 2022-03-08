import {React} from "../global";

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
      dailyPlayTimes: 0,
      dailyWinTimes: 0,
      dailyWinTryTimes: 0,
      dailyTotalTryTimes: 0
    }
  }
  return record;
}

const saveRecordData = (record) => {
  localStorage.setItem("record", JSON.stringify(record));
}

const History = () => {
  const record = loadRecordData();
  return <><p><span className='title'>　随心所欲！</span></p>
    <p>游戏次数：{record?.playTimes}<br/>
      胜利次数：{record?.winTimes}<br/>
      胜率：{Math.ceil(record?.winTimes/record?.playTimes*100)}%<br/>
      平均猜测次数：{Math.ceil(record?.winTryTimes/record?.winTimes)}（胜利时）
    </p>
    <hr/>
    <p><span className='title'>　每日挑战！</span></p>
    <p>游戏次数：{record?.dailyPlayTimes}<br/>
      胜利次数：{record?.dailyWinTimes}<br/>
      胜率：{Math.ceil(record?.dailyWinTimes/record?.dailyPlayTimes*100)}%<br/>
      平均猜测次数：{Math.ceil(record?.dailyWinTryTimes/record?.dailyWinTimes)}（胜利时）
    </p>
  </>;
}
export {
  loadRecordData,saveRecordData,History
}
