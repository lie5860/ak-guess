import autocomplete from './utils/autocomplete'
import {React} from './global'
import {chartsData, TYPES, VAL_DICT} from "./const";
import moment from 'moment-timezone'
import copyCurrentDay from "./utils/copyCurrentDay";
import './index.less'

const defaultTimes = 6;
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
  let text = `干员猜猜乐 ` + (defaultTimes - times) + `/` + defaultTimes;
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
const ShareIcon = () => {
  return <div className={'share-icon'}>
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg"
         viewBox="0 0 300 300">
      <circle cx="242" cy="49" r="35"></circle>
      <circle cx="242" cy="251" r="35"></circle>
      <circle cx="58" cy="150" r="35"></circle>
      <line x1="242" y1="49" x2="59" y2="150" stroke-width="20"></line>
      <line x1="242" y1="251" x2="59" y2="150" stroke-width="20"></line>
    </svg>
  </div>
}
export default function Home() {
  const [times, setTimes] = React.useState(defaultTimes);
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
  const isOver = data.length > 5 || isWin
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
      setData([...data, res])
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
          <div className={`ak-tab-item ${mode === 'day' ? 'active' : ''}`} onClick={() => setMode('day')}>每日模式</div>}
          <div className={`ak-tab-item`} onClick={() => changeModalInfo({message: "小刻也能学会的游戏规则！", width: '80%'})}>
            小刻也懂！
          </div>
        </div>
        <div><span className={`title`}>干员猜猜乐</span></div>
        <div>明日方舟 wordle-like by 昨日沉船</div>
        <div>你有{times}/6次机会猜测这只神秘干员，试试看！
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
          setData([])
          setTimes(defaultTimes);
          setRandomAnswerKey(Math.floor(Math.random() * chartsData.length))
        }}>▶️ 新的游戏</a>
        }
        {msg && <span className={`global-tooltiptext`}>{msg}</span>}
        {modal && <span className={`global-tooltiptext`} style={{width: modal?.width}}>
            <div className={`clean-float`} style={{paddingBottom:20}}>
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
          </div>
          <div>{modal?.message}</div>

        </span>}
      </div>
    </div>
  )
}
