import autocomplete from './utils/autocomplete'
import {React} from './global'
import {chartsData, TYPES, VAL_DICT, defaultTryTimes, updateData} from "./const";
import moment from 'moment-timezone'
import copyCurrentDay from "./utils/copyCurrentDay";
import './index.less'
import ShareIcon from './component/ShareIcon'
import CloseIcon from "./component/CloseIcon";

const renderGuessTable = (data, answer) => {
  return <div className={'guesses'}>
    <div className="row">
      {TYPES.map(({label}) => <div className='column' key={label}><span className={'title'}>{label}</span></div>)}
    </div>
    {data.map((v, index) => {
      return <div className="row" key={index}>
        {TYPES.map(({key, type}) => {
          if (key === 'guess') {
            const {name, rarity, team, className, race, painter} = v.guess
            return <div className='column' key={key}>
              <div className="tooltip">
                {name}
                <span className="tooltiptext">
                                    <div><span className={'title'}>干员名称:</span>{name}</div>
                                    <div><span className={'title'}>稀有度:</span>{1 + rarity}</div>
                                    <div><span className={'title'}>阵营:</span>{team?.join(' ')}</div>
                                    <div><span className={'title'}>职业:</span>{className?.join('-')}</div>
                                    <div><span className={'title'}>种族:</span>{race}</div>
                                    <div><span className={'title'}>画师:</span>{painter}</div>
                                </span>
              </div>
            </div>
          }
          return <div className='column' key={key}>
            <div className={`emoji ${v[key]}`}/>
          </div>
        })}
      </div>
    })}
  </div>
}
const markText = (data, times, showName) => {
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
  const setData = mode === 'random' ? (v,t) => {
    localStorage.setItem('randomData', JSON.stringify(v))
    localStorage.setItem('randomAnswerKey', `${randomAnswerKey}`)
    localStorage.setItem('tryTimes', t);
    setRandomData(v)
  } : (v,t) => {
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
  const Help = () => {
    const content = <><p><span className='title'>小刻也能学会的游戏规则！</span></p>
    <hr/>
    <p>最多可以尝试{defaultTryTimes}次，找出稀有度/阵营/职业/种族/画师都一模一样的干员！
    <ul className="tipList">
    <li><div className="emoji correct"/>猜测的干员该属性和神秘干员完全一样！太棒了！</li>
    <li><div className="emoji wrong"/>猜测的干员该属性和神秘干员完全不一样！难搞哦！</li>
    <li><div className="emoji down"/>猜测的干员稀有度比神秘干员高！试着往低星猜吧！</li>
    <li><div className="emoji up"/>猜测的干员稀有度比神秘干员低！试着往高星猜吧！</li>
    <li><div className="emoji wrongpos"/>猜测的干员该属性和神秘干员部分一样！再加把劲！</li>
    </ul>
    <span>干员所属的阵营拆成了多级维度！<br/>职业也区分了主职业和分支职业！</span>
    <hr/>
    游戏数据来自PRTS！<br/>最近更新时间是{updateData}！<br/>目前有{chartsData.length}名干员！
    </p></>
    changeModalInfo({"message": content, "width": '80%'})
  }
  const Record = () => {
    const content = <><p><span className='title'>　玩个过瘾！</span></p>
    <p>游戏次数：0<br/>
    胜利次数：0<br/>
    胜率：0.00%<br/>
    平均猜测次数：0（胜利时）
    </p><hr/><p><span className='title'>　每日挑战！</span></p>
    <p>游戏次数：0<br/>
    胜利次数：0<br/>
    胜率：0.00%<br/>
    平均猜测次数：0（胜利时）
    </p></>
    changeModalInfo({"message": content, "width": '80%'})
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
      setData([...data, res], times-1)
      inputRef.current.value = ''
    }
  }
  return (
    <div className={'container'}>
      <div className={'main-container clean-float'}>
        <div className={'ak-tab'}>
          <div className={`ak-tab-item ${mode === 'random' ? 'active' : ''}`} onClick={() => setMode('random')}>玩个过瘾！
          </div>
          {remoteAnswerKey !== -1 &&
          <div className={`ak-tab-item ${mode === 'day' ? 'active' : ''}`} onClick={() => setMode('day')}>每日挑战！</div>}
          <div className={`ak-tab-item`} onClick={() => Help()}>小刻学堂！</div>
          {false&&<div className={`ak-tab-item`} onClick={() => Record()}>光辉之路！</div>}
        </div>
        <div><span className={`title`}>干员猜猜乐</span></div>
        <div>明日方舟 wordle-like by 昨日沉船</div>
        <div>你有{times}/{defaultTryTimes}次机会猜测这只神秘干员，试试看！
          <div className="tooltip">
            分享 Emoji 映射表
            <span className="tooltiptext">
                        🟩: 完全正确
                        <br/>
                        🟥: 不正确
                        <br/>
                        🟨: 部分正确
                        <br/>
                        🔼: 猜测值过小
                        <br/>
                        🔽: 猜测值过大
                    </span>
          </div>
        </div>
        {mode === 'day' && <div>更新时间为 北京时间0点 GMT+8</div>}
        {!!data?.length && renderGuessTable(data, answer)}
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
        {!!isOver && <div className={'answer'}>{`${isWin ? '成功' : '失败'}了！这只神秘的干员是${answer.name}。`}</div>}

        {!!data?.length && <div className={'share-body'}>
            <a className={'togglec'} onClick={() => {
              copyCurrentDay(markText(data, times, false), showModal)
            }}>
                <ShareIcon/>分享
            </a>

            <a className={'togglec'} onClick={() => {
              copyCurrentDay(markText(data, times, true), showModal)
            }} style={{marginLeft: 20}}>
                <ShareIcon/>分享(带名称)
            </a>
        </div>
        }

        {mode !== 'day' && <a className={'togglec'} onClick={() => {
          setData([], defaultTryTimes)
          setTimes(defaultTryTimes)
          setRandomAnswerKey(Math.floor(Math.random() * chartsData.length))
        }}>▶️ 新的游戏</a>
        }
        {msg && <span className={`global-tooltiptext`}>{msg}</span>}
        {modal && <span className={`global-tooltiptext`} style={{width: modal?.width}}>

                <div style={{height: 20, width: 20, float: "right"}} onClick={() => changeModalInfo(null)}>
                <svg viewBox="0 0 100 100" version="1.1"
                     xmlns="http://www.w3.org/2000/svg"><polygon
                    points="15,10 50,46 85,10 90,15 50,54 10,15" fill="rgba(255,255,255,1)"></polygon>
                    <polygon
                        points="50,46 50,46 50,46 50,54 50,54 50,54" fill="rgba(255,255,255,1)"></polygon>
                    <polygon
                        points="10,85 50,46 90,85 85,90 50,54 15,90" fill="rgba(255,255,255,1)"></polygon>
                </svg>
          </div>
          <div style={{marginTop:-20}}>{modal?.message}</div>
        </span>}
      </div>
    </div>
  )
}
