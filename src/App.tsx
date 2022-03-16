import autocomplete from './utils/autocomplete'
import {moment, React} from './global'
import {DAILY_MODE, defaultTryTimes, MAIN_KEY, questionnaireUrl, RANDOM_MODE} from "./const";
import copyCurrentDay from "./utils/copyCurrentDay";
import ShareIcon from './component/ShareIcon'
import Modal from "./component/Modal";
import shareTextCreator from "./utils/share";
import Help from './component/Help';
import GuessItem from "./component/GuessItem";
import {loadRecordData, saveRecordData, History} from "./component/History";
import {getDailyData, guess} from "./server";
import {AppCtx} from './locales/AppCtx';
import {getGame} from "./store";
import './index.less'
import './normalize.css'
import {localStorageGet, localStorageSet} from "./locales/I18nWrap";

export default function Home() {
  const {i18n, chartsData} = React.useContext(AppCtx);
  const inputRef = React.useRef();
  const [mode, setMode] = React.useState(RANDOM_MODE)
  const [msg, setMsg] = React.useState("")
  const [modal, changeModalInfo] = React.useState()
  const [randomAnswerKey, setRandomAnswerKey] = React.useState(Math.floor(Math.random() * chartsData.length))
  const [remoteAnswerKey, setRemoteAnswerKey] = React.useState(-1)
  const [randomData, setRandomData] = React.useState([])
  const [dayData, setDayData] = React.useState([])
  const [updateDate, setUpdateDate] = React.useState('')
  const chartNames = React.useMemo(() => chartsData.map(v => v?.[MAIN_KEY]), [])
  const today = React.useMemo(() => moment().tz("Asia/Shanghai").format('YYYY-MM-DD'), [])
  const [isGiveUp, setGiveUp] = React.useState(false);
  const store = {
    mode, chartsData, lang: i18n.language,
    setRandomData, setRandomAnswerKey, randomAnswerKey, randomData, isGiveUp,
    setDayData, remoteAnswerKey, dayData, today
  }
  const game = getGame(store)
  React.useEffect(() => {
    getDailyData(i18n.language).then(({last_date, daily}) => {
      setUpdateDate(last_date)
      setRemoteAnswerKey(daily)
    })
    if (!localStorageGet(i18n.language, 'firstOpen')) {
      localStorageSet(i18n.language, 'firstOpen', 'yes');
      changeModalInfo({
        "message": <Help updateDate={updateDate} firstOpen/>, "width": '80%'
      })
    }
    autocomplete(inputRef.current, chartNames, chartsData);

    const giveUp = localStorageGet(i18n.language, "giveUp")
    if (giveUp) {
      setGiveUp(giveUp === 'true');
    }
  }, [])
  React.useEffect(() => {
    game.init()
  }, [mode])
  // 根据模式获取答案、 历史提交记录、提交记录
  const answer = game.answer;
  const data = game.data;
  const setData = game.setData;
  const showModal = (msg) => {
    setMsg(msg)
    setTimeout(() => {
      setMsg('')
    }, 1500)
  }
  const isWin = data?.[data?.length - 1]?.guess?.[MAIN_KEY] === answer?.[MAIN_KEY]
  const isOver = data.length >= defaultTryTimes || isWin || (mode === RANDOM_MODE && isGiveUp)

  const giveUp = () => {
    let result = confirm(i18n.get("giveUpConfirm"));
    if (result == true) {
      let record = loadRecordData();
      record.straightWins = 0;
      record.playTimes += 1;
      record.totalTryTimes += data.length;
      saveRecordData(record);
      setGiveUp(true);
      localStorageSet(i18n.language, 'giveUp', 'true')
    }
  }

  const onSubmit = (e) => {
    e.stopPropagation();
    const error = game?.preSubmitCheck?.()
    if (error) {
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
        game.gameOver(newData, isWin)
      }
    }
  }
  return (
    <div className={'container'}>
      <div className={'main-container clean-float'}>
        <div className={'dns-icon'} onClick={() => {
          // localStorage.setItem('__lang', 'zh_CN')
          // location.reload();
        }}>{i18n.language}</div>
        <div className={'ak-tab'}>
          <div className={`ak-tab-item ${mode === RANDOM_MODE ? 'active' : ''}`}
               onClick={() => setMode(RANDOM_MODE)}>
            {i18n.get('randomMode')}
          </div>
          {remoteAnswerKey !== -1 &&
          <div className={`ak-tab-item ${mode === DAILY_MODE ? 'active' : ''}`}
               onClick={() => setMode(DAILY_MODE)}>
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
        {mode === DAILY_MODE && <div>{i18n.get('dailyTimeTip')}</div>}
        {!!data?.length && <GuessItem data={data} setMsg={setMsg}/>}
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
        {mode !== DAILY_MODE && !!isOver && <a className={'togglec'} onClick={() => {
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
