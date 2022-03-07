import autocomplete from './utils/autocomplete'
import {React} from './global'
import {chartsData, TYPES, defaultTryTimes} from "./const";
import moment from 'moment-timezone'
import copyCurrentDay from "./utils/copyCurrentDay";
import './index.less'
import ShareIcon from './component/ShareIcon'
import Modal from "./component/Modal";
import shareTextCreator from "./utils/share";
import Help from './component/Help';
import History from "./component/History";
import GuessItem from "./component/GuessItem";

export default function Home() {
  const [times, setTimes] = React.useState(defaultTryTimes);
  const inputRef = React.useRef();
  const [mode, setMode] = React.useState("random")
  const [msg, setMsg] = React.useState("")
  const [modal, changeModalInfo] = React.useState()
  const [randomAnswerKey, setRandomAnswerKey] = React.useState(Math.floor(Math.random() * chartsData.length))
  const [remoteAnswerKey, setRemoteAnswerKey] = React.useState(-1)
  const [randomData, setRandomData] = React.useState([])
  const [dayData, setDayData] = React.useState([])
  const chartNames = React.useMemo(() => chartsData.map(v => v.name), [])
  const today = React.useMemo(() => moment().tz("Asia/Shanghai").format('YYYY-MM-DD'), [])
  React.useEffect(() => {
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
    const timesData = localStorage.getItem('tryTimes');
    if (timesData) {
      setTimes(timesData)
    }
  }, [])
  const answer = mode === 'random' ? chartsData[randomAnswerKey] : chartsData[remoteAnswerKey]
  const data = mode === 'random' ? randomData : dayData
  const setData = mode === 'random' ? (v, t) => {
    localStorage.setItem('randomData', JSON.stringify(v))
    localStorage.setItem('randomAnswerKey', `${randomAnswerKey}`)
    localStorage.setItem('tryTimes', t);
    setRandomData(v)
  } : (v, t) => {
    localStorage.setItem(today + 'dayData', JSON.stringify(v))
    localStorage.setItem('tryTimes', t);
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
      setTimes(times - 1);
      const inputItem = chartsData.filter(v => v.name === inputName)[0];
      const res = {}
      TYPES.forEach(({key, type}) => {
        if (key === 'guess') {
          return res[key] = inputItem
        }
        let emoji;
        switch (type) {
          case 'string':
            emoji = inputItem?.[key] === answer?.[key] ? 'correct' : 'wrong';
            break;
          case 'number':
            const diff = Number(inputItem?.[key]) - Number(answer?.[key]);
            emoji = diff === 0 ? 'correct' : (diff > 0 ? 'down' : 'up')
            break;
          case 'array':
            const x = inputItem?.[key] || [];
            const y = answer?.[key] || [];
            const eqState = (x, y) => {
              const l = new Set([...x, ...y]).size;
              if (x.length === y.length && x.length === l) return 'correct';
              if (x.length + y.length === l) return 'wrong';
              return 'wrongpos';
            };
            emoji = eqState(x, y)
            break;
        }
        res[key] = emoji
      })
      setData([...data, res], times - 1)
      inputRef.current.value = ''
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
            changeModalInfo({"message": <Help/>, "width": '80%'})
          }}>小刻学堂！
          </div>
          {/*{false && <div className={`ak-tab-item`} onClick={() => {*/}
          {/*  changeModalInfo({"message": <History/>, "width": '80%'})*/}
          {/*}>光辉之路！</div>*/}
          {/*}*/}
        </div>
        <div><span className={`title`}>干员猜猜乐</span></div>
        <div>明日方舟 wordle-like by 昨日沉船</div>
        <div>你有{times}/{defaultTryTimes}次机会猜测这只神秘干员，试试看！
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
              copyCurrentDay(shareTextCreator(data, times, false), showModal)
            }}>
                <ShareIcon/>分享
            </a>

            <a className={'togglec'} onClick={() => {
              copyCurrentDay(shareTextCreator(data, times, true), showModal)
            }} style={{marginLeft: 20}}>
                <ShareIcon/>分享(带名称)
            </a>
        </div>
        }
        {mode !== 'day' && <a className={'togglec'} onClick={() => {
          setData([], defaultTryTimes)
          setTimes(defaultTryTimes)
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
