import autocomplete from './utils/autocomplete'
import {React} from './global'
import {chartsData, defaultTryTimes} from "./const";
import moment from 'moment-timezone'
import copyCurrentDay from "./utils/copyCurrentDay";
import './index.less'
import ShareIcon from './component/ShareIcon'
import Modal from "./component/Modal";
import shareTextCreator from "./utils/share";
import Help from './component/Help';
import GuessItem from "./component/GuessItem";
import {loadRecordData, saveRecordData, History} from "./component/History";
import {getDailyData, guess, saveNum} from "./server";

export default function Home() {
  const inputRef = React.useRef();
  const [mode, setMode] = React.useState("random")
  const [msg, setMsg] = React.useState("")
  const [modal, changeModalInfo] = React.useState()
  const [randomAnswerKey, setRandomAnswerKey] = React.useState(Math.floor(Math.random() * chartsData.length))
  const [remoteAnswerKey, setRemoteAnswerKey] = React.useState(-1)
  const [randomData, setRandomData] = React.useState([])
  const [dayData, setDayData] = React.useState([])
  const [updateDate, setUpdateDate] = React.useState('')
  const chartNames = React.useMemo(() => chartsData.map(v => v.name), [])
  const today = React.useMemo(() => moment().tz("Asia/Shanghai").format('YYYY-MM-DD'), [])
  React.useEffect(() => {
    getDailyData().then(({last_date, daily}) => {
      setUpdateDate(last_date)
      setRemoteAnswerKey(daily)
    })

    autocomplete(inputRef.current, chartNames);
    const randomData = localStorage.getItem('randomData')
    if (randomData) {
      setRandomData(JSON.parse(randomData))
      setRandomAnswerKey(Number(localStorage.getItem('randomAnswerKey')))
    }
    const dayData = localStorage.getItem(today + 'dayData')
    if (dayData) {
      setDayData(JSON.parse(dayData))
    }
  }, [])
  const answer = mode === 'random' ? chartsData[randomAnswerKey] : chartsData[remoteAnswerKey]
  const data = mode === 'random' ? randomData : dayData
  const setData = mode === 'random' ? (v) => {
    localStorage.setItem('randomData', JSON.stringify(v))
    localStorage.setItem('randomAnswerKey', `${randomAnswerKey}`)
    setRandomData(v)
  } : (v) => {
    localStorage.setItem(today + 'dayData', JSON.stringify(v))
    setDayData(v)
  }
  const showModal = (msg) => {
    setMsg(msg)
    setTimeout(() => {
      setMsg('')
    }, 1500)
  }
  const isWin = data?.[data?.length - 1]?.guess?.name === answer.name
  const isOver = data.length >= defaultTryTimes || isWin


  const onSubmit = (e) => {
    e.stopPropagation();
    if (mode === 'day' && today !== moment().tz("Asia/Shanghai").format('YYYY-MM-DD')) {
      alert('数据已更新，即将刷新页面')
      window.location.reload()
      return;
    }
    const inputName = inputRef.current.value;
    if (chartNames.indexOf(inputName) === -1) {
      showModal('输入错误，请输入正确的干员名称。')
    } else if (data.map(v => v.guess.name).indexOf(inputName) !== -1) {
      showModal('已经输入过啦 换一个吧！');
    } else {
      const inputItem = chartsData.filter(v => v.name === inputName)[0];
      const res = guess(inputItem, answer)
      const newData = [...data, res]
      setData(newData)
      inputRef.current.value = '';

      const isWin = newData?.[newData?.length - 1]?.guess?.name === answer.name
      const isOver = newData.length >= defaultTryTimes || isWin
      if (isOver) {
        let record = loadRecordData();
        if (mode === 'day') {
          if (isWin) {
            record.dailyWinTimes += 1;
            record.dailyWinTryTimes += data.length;
          }
          record.dailyPlayTimes += 1;
          record.dailyTotalTryTimes += data.length;
        } else {
          if (isWin) {
            record.winTryTimes += data.length;
            record.winTimes += 1;
          }
          record.playTimes += 1;
          record.totalTryTimes += data.length;
        }
        saveRecordData(record);
      }
    }
  }
  return (
    <div className={'container'}>
      <div className={'main-container clean-float'}>
        <div className={'ak-tab'}>
          <div className={`ak-tab-item ${mode === 'random' ? 'active' : ''}`} onClick={() => setMode('random')}>随心所欲！
          </div>
          {remoteAnswerKey !== -1 &&
          <div className={`ak-tab-item ${mode === 'day' ? 'active' : ''}`} onClick={() => setMode('day')}>每日挑战！</div>}
          <div className={`ak-tab-item`} onClick={() => {
            changeModalInfo({
              "message": <Help updateDate={updateDate}/>, "width": '80%'
            })
          }}>小刻学堂！
          </div>
          <div className={`ak-tab-item`} onClick={() => {
            changeModalInfo({"message": <History/>, "width": '80%'})
          }}>光辉之路！
          </div>
        </div>
        <div><span className={`title`}>干员猜猜乐</span></div>
        <div>明日方舟 wordle-like by 昨日沉船</div>
        <div>你有{defaultTryTimes - data.length}/{defaultTryTimes}次机会猜测这只神秘干员，试试看！
          <div className="tooltip" onClick={() => {
            setMsg(<>
              🟩: 完全正确
              <br/>
              🟥: 不正确
              <br/>
              🟨: 部分正确
              <br/>
              🔼: 猜测值过小
              <br/>
              🔽: 猜测值过大
            </>)
          }}>
            分享 Emoji 映射表
          </div>
        </div>
        {mode === 'day' && <div>更新时间为 北京时间0点 GMT+8</div>}
        {!!data?.length && <GuessItem data={data} setMsg={setMsg}/>}
        <form className={'input-form'} autoComplete="off" action='javascript:void(0)' onSubmit={onSubmit}
              style={{display: isOver ? 'none' : ''}}>
          <div className="autocomplete">
            <input ref={inputRef} id="guess" placeholder={"请输入干员名称"} onKeyDown={(e) => {
              if (e.keyCode == 13) {
                onSubmit(e)
              }
            }}/>
          </div>
          <input className="guess_input" type="submit" value="提交"/>
        </form>
        {!!isOver && <div className={'answer'}>{`${isWin ? '成功' : '失败'}了！这只神秘的干员是${answer.name}！`}</div>}

        {!!data?.length && <div className={'share-body'}>
            <a className={'togglec'} onClick={() => {
              copyCurrentDay(shareTextCreator(data, mode, today, false), showModal)
            }}>
                <ShareIcon/>分享
            </a>

            <a className={'togglec'} onClick={() => {
              copyCurrentDay(shareTextCreator(data, mode, today, true), showModal)
            }} style={{marginLeft: 20}}>
                <ShareIcon/>分享(带名称)
            </a>
        </div>
        }
        {mode !== 'day' && <a className={'togglec'} onClick={() => {
          setData([])
          setRandomAnswerKey(Math.floor(Math.random() * chartsData.length))
        }}>▶️ 玩个过瘾！</a>
        }
        {msg && <Modal onClose={() => {
          setMsg('')
        }} msg={msg}/>}
        {modal && <Modal modal={modal} showCloseIcon onClose={() => changeModalInfo(null)}/>}
      </div>
    </div>
  )
}
