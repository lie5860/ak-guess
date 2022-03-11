import autocomplete from './utils/autocomplete'
import {moment, React} from './global'
import {chartsData, defaultTryTimes, GAME_NAME, MAIN_KEY, questionnaireUrl} from "./const";
import copyCurrentDay from "./utils/copyCurrentDay";
import './index.less'
import ShareIcon from './component/ShareIcon'
import Modal from "./component/Modal";
import shareTextCreator from "./utils/share";
import Help from './component/Help';
import GuessItem from "./component/GuessItem";
import {loadRecordData, saveRecordData, History} from "./component/History";
import {getDailyData, guess} from "./server";
import {AppCtx} from './locales/AppCtx';

export default function Home() {
  const {i18n} = React.useContext(AppCtx);
  const inputRef = React.useRef();
  const [mode, setMode] = React.useState("random")
  const [msg, setMsg] = React.useState("")
  const [modal, changeModalInfo] = React.useState()
  const [randomAnswerKey, setRandomAnswerKey] = React.useState(Math.floor(Math.random() * chartsData.length))
  const [remoteAnswerKey, setRemoteAnswerKey] = React.useState(-1)
  const [randomData, setRandomData] = React.useState([])
  const [dayData, setDayData] = React.useState([])
  const [updateDate, setUpdateDate] = React.useState('')
  const chartNames = React.useMemo(() => chartsData.map(v => v?.[MAIN_KEY]), [])
  const today = React.useMemo(() => moment().tz("Asia/Shanghai").format('YYYY-MM-DD'), [])
  React.useEffect(() => {
    getDailyData().then(({last_date, daily}) => {
      setUpdateDate(last_date)
      setRemoteAnswerKey(daily)
    })

    autocomplete(inputRef.current, chartNames, chartsData);
    const randomData = localStorage.getItem('randomData')
    if (randomData) {
      setRandomData(JSON.parse(randomData))
      setRandomAnswerKey(Number(localStorage.getItem('randomAnswerKey')))
    }
    const dayData = localStorage.getItem(today + 'dayData')
    if (dayData) {
      setDayData(JSON.parse(dayData))
    }
    const giveUp = localStorage.getItem("giveUp")
    if (giveUp) {
      setGiveUp(giveUp === 'true');
    }
  }, [])
  const [isGiveUp, setGiveUp] = React.useState(false);
  const answer = mode === 'random' ? chartsData[randomAnswerKey] : chartsData[remoteAnswerKey]
  const data = mode === 'random' ? randomData : dayData
  const setData = mode === 'random' ? (v, isGiveUp) => {
    localStorage.setItem('randomData', JSON.stringify(v))
    localStorage.setItem('randomAnswerKey', `${randomAnswerKey}`)
    localStorage.setItem('giveUp', isGiveUp)
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
  const isWin = data?.[data?.length - 1]?.guess?.[MAIN_KEY] === answer?.[MAIN_KEY]
  const isOver = data.length >= defaultTryTimes || isWin || (mode ==='random' && isGiveUp)

  const giveUp = () => {
    let result = confirm(i18n.get("giveUpConfirm"));
    if (result == true) {
      let record = loadRecordData();
      record.straightWins = 0;
      record.playTimes += 1;
      record.totalTryTimes += data.length;
      saveRecordData(record);
      setGiveUp(true);
      localStorage.setItem('giveUp', true)
    }
  }

  const onSubmit = (e) => {
    e.stopPropagation();
    if (mode === 'day' && today !== moment().tz("Asia/Shanghai").format('YYYY-MM-DD')) {
      alert(i18n.get('reloadTip'))
      window.location.reload()
      return;
    }
    const inputName = inputRef.current.value;
    if (chartNames.indexOf(inputName) === -1) {
      showModal(i18n.get('errNameTip'))
    } else if (data.map(v => v.guess?.[MAIN_KEY]).indexOf(inputName) !== -1) {
      showModal(i18n.get('duplicationTip'));
    } else {
      const inputItem = chartsData.filter(v => v?.[MAIN_KEY] === inputName)[0];
      const res = guess(inputItem, answer)
      const newData = [...data, res]
      setData(newData)
      inputRef.current.value = '';
      const isWin = newData?.[newData?.length - 1]?.guess?.[MAIN_KEY] === answer?.[MAIN_KEY]
      const isOver = newData.length >= defaultTryTimes || isWin
      if (isOver) {
        let record = loadRecordData();
        if (mode === 'day') {
          if (isWin) {
            record.dailyWinTimes += 1;
            record.dailyWinTryTimes += newData.length;
            record.dailyStraightWins += 1;
            if (record.dailyStraightWins > record.dailyMaxStraightWins) {
              record.dailyMaxStraightWins = record.dailyStraightWins;
            }
          } else {
            record.dailyStraightWins = 0;
          }
          record.dailyPlayTimes += 1;
          record.dailyTotalTryTimes += newData.length;
        } else {
          if (isWin) {
            record.winTryTimes += newData.length;
            record.winTimes += 1;
            record.straightWins += 1;
            if (record.straightWins > record.maxStraightWins) {
              record.maxStraightWins = record.straightWins;
            }
          } else {
            record.straightWins = 0;
          }
          record.playTimes += 1;
          record.totalTryTimes += newData.length;
        }
        saveRecordData(record);
      }
    }
  }
  return (
    <div className={'container'}>
      <div className={'main-container clean-float'}>
        <div className={'ak-tab'}>
          <div className={`ak-tab-item ${mode === 'random' ? 'active' : ''}`} onClick={() => setMode('random')}>
            {i18n.get('randomMode')}
          </div>
          {remoteAnswerKey !== -1 &&
          <div className={`ak-tab-item ${mode === 'day' ? 'active' : ''}`} onClick={() => setMode('day')}>
            {i18n.get('dailyMode')}
          </div>}
        </div>
        <div><span className={`title`}>{i18n.get('title')}</span></div>
        <div>{i18n.get('titleDesc')}</div>
        <div className="titlePanel">
          {i18n.get('timesTip', {times: `${defaultTryTimes - data.length}/${defaultTryTimes}`})}
          <br/>
          <div className="tooltip" onClick={() => {
            changeModalInfo({
              "message": <Help updateDate={updateDate}/>, "width": '80%'
            })
          }}>🍪{i18n.get('help')}
          </div>
          <div className="tooltip" onClick={() => {
            changeModalInfo({"message": <History setMsg={setMsg}/>, "width": '80%'})
          }}>🔎{i18n.get('report')}
          </div>
          <div className="tooltip" onClick={() => {
            window.open(questionnaireUrl)
          }}>💬{i18n.get('feedback')}
          </div>
        </div>
        {mode === 'day' && <div>{i18n.get('dailyTimeTip')}</div>}
        {!!data?.length && <GuessItem data={data} setMsg={setMsg} />}
        <form className={'input-form'} autoComplete="off" action='javascript:void(0)' onSubmit={onSubmit}
              style={{display: isOver ? 'none' : ''}}>
          <div className="autocomplete">
            <input ref={inputRef} id="guess" placeholder={i18n.get('inputTip')} onKeyDown={(e) => {
              if (e.keyCode == 13) {
                onSubmit(e)
              }
            }}/>
          </div>
          <input className="guess_input" type="submit" value={i18n.get('submit')}/>
        </form>
        {!!isOver &&
        <div
            className={'answer'}>{`${i18n.get(isWin ? 'successTip' : 'failTip')}${i18n.get('answerTip', {answer: answer.name})}`}
        </div>}
        {mode !== 'day' && !!isOver && <a className={'togglec'} onClick={() => {
          setGiveUp(false);
          setData([], false)
          setRandomAnswerKey(Math.floor(Math.random() * chartsData.length))
        }}>▶️ {i18n.get('newGameTip')}</a>
        }
        {mode !== 'day' && !isOver && data?.length > 0 && <a className={'togglec'} onClick={() => {
          giveUp()
        }}>🆘 {i18n.get('giveUpTip')}</a>
        }
        {!!data?.length && <div className={'share-body'}>
            <a className={'togglec'} onClick={() => {
              copyCurrentDay(shareTextCreator(data, mode, today, false, i18n.get('title')), showModal, i18n.get('copySuccess'))
            }}>
                <ShareIcon/>{i18n.get('shareTip1')}
            </a>

            <a className={'togglec'} onClick={() => {
              copyCurrentDay(shareTextCreator(data, mode, today, true, i18n.get('title')), showModal, i18n.get('copySuccess'))
            }} style={{marginLeft: 20}}>
                <ShareIcon/>{i18n.get('shareTip2')}
            </a>
        </div>
        }
        {modal && <Modal modal={modal} showCloseIcon onClose={() => changeModalInfo(null)}/>}
        {msg && <Modal onClose={() => {
          setMsg('')
        }} msg={msg}/>}
      </div>
    </div>
  )
}
