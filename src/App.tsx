import autocomplete from './utils/autocomplete'
import {moment, React} from './global'
import {CONTRIBUTORS, DAILY_MODE, defaultTryTimes, MAIN_KEY, RANDOM_MODE} from "./const";
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
import {hostDict, labelDict} from "./locales";
import ContributorList from "./component/ContributorList";

export default function Home() {
  const {i18n, chartsData, aliasData} = React.useContext(AppCtx);
  const inputRef = React.useRef();
  const [mode, setMode] = React.useState(RANDOM_MODE)
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
  const openHelp = (firstOpen = false) => {
    changeModalInfo({
      "message": <Help updateDate={updateDate} firstOpen={firstOpen}/>,
      "title": i18n.get('helpTitle'),
      useCloseIcon: true
    })
  }
  React.useEffect(() => {
    getDailyData(i18n.language).then(({last_date, daily}) => {
      setUpdateDate(last_date)
      setRemoteAnswerKey(daily)
    })
    if (!localStorageGet(i18n.language, 'firstOpen')) {
      localStorageSet(i18n.language, 'firstOpen', 'yes');
      openHelp(true)
    }
    autocomplete(inputRef.current, chartNames, chartsData, aliasData);
    const giveUp = localStorageGet(i18n.language, "giveUp")
    if (giveUp) {
      setGiveUp(giveUp === 'true');
    }
  }, [])
  React.useEffect(() => {
    game.init()
  }, [mode])
  const {answer, data, setData} = game;
  const showModal = (message: string) => {
    window.mdui.snackbar({
      message
    });
  }
  const isWin = data?.[data?.length - 1]?.guess?.[MAIN_KEY] === answer?.[MAIN_KEY]
  const isOver = data.length >= defaultTryTimes || isWin || (mode === RANDOM_MODE && isGiveUp)

  const giveUp = () => {
    window.mdui.dialog({
      content: i18n.get("giveUpConfirm"),
      buttons: [
        {
          text: i18n.get('no')
        },
        {
          text: i18n.get('yes'),
          onClick: function () {
            let record = loadRecordData(i18n.language);
            record.straightWins = 0;
            record.playTimes += 1;
            record.totalTryTimes += data.length;
            saveRecordData(i18n.language, record);
            setGiveUp(true);
            localStorageSet(i18n.language, 'giveUp', 'true')
          }
        }
      ]
    });
  }

  const onSubmit = (e) => {
    e.stopPropagation();
    const error = game?.preSubmitCheck?.()
    if (error) {
      return;
    }
    const inputName = inputRef.current.value?.toUpperCase();
    // 转大写感觉会存在一定的风险。 例如 Ceoceo和CeoCeo会认为是一个干员，但按照标准两个大写的词不会连着用才对
    if (chartNames.map(v => v?.toUpperCase()).indexOf(inputName) === -1) {
      showModal(i18n.get('errNameTip'))
    } else if (data.map(v => v.guess?.[MAIN_KEY]?.toUpperCase()).indexOf(inputName) !== -1) {
      showModal(i18n.get('duplicationTip'));
    } else {
      const inputItem = chartsData.filter(v => v?.[MAIN_KEY]?.toUpperCase() === inputName)[0];
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
        <button id="server-menu-btn" mdui-menu="{ target: '#server-menu', covered: false }"
                className="appbar-btn mdui-btn mdui-btn-icon mdui-ripple mdui-ripple-white">
          <i className="mdui-icon material-icons">dns</i>
          <span className="mini-chip mdui-color-blue-a400 mdui-text-uppercase pointer font-mono"
                id="server-chip">
            <span className="mini-chip-content">{labelDict[i18n.language]}</span>
          </span>
        </button>

        <ul id="server-menu" className="mdui-menu">
          <li className="mdui-menu-item mdui-ripple">
            {Object.keys(labelDict).filter(v => hostDict[v]).map((key) => {
              return <a key={key} className="mdui-ripple pointer" onClick={() => {
                location.href = hostDict[key]
              }}>
                <i style={{visibility: key === i18n.language ? '' : 'hidden'}}
                   className="mdui-menu-item-icon mdui-icon material-icons">done</i>
                {labelDict[key]}
              </a>
            })}
          </li>
        </ul>
        <div className="mdui-tab mdui-tab-scrollable ak-tab" mdui-tab>
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
        <div style={{paddingTop: 10}}><span className={`title`}>{i18n.get('title')}</span></div>
        <div>{i18n.get('titleDesc')}
          <div className="tooltip" onClick={() => {
            changeModalInfo({
              title: i18n.get('contributors'),
              message: CONTRIBUTORS.map((data, index) => <ContributorList key={index} {...data}/>),
              useCloseIcon: true
            })
          }}>小刻猜猜团
          </div>
        </div>
        <div className="titlePanel">
          {i18n.get('timesTip', {times: `${defaultTryTimes - data.length}/${defaultTryTimes}`})}
          <br/>
          <div className="tooltip" onClick={()=>openHelp()}>🍪{i18n.get('help')}
          </div>
          <div className="tooltip" onClick={() => {
            changeModalInfo({"message": <History/>, useCloseIcon: true, title: i18n.get('report')})
          }}>🔎{i18n.get('report')}
          </div>
          <div className="tooltip" onClick={() => {
            window.open(i18n.get('questionnaireUrl'))
          }}>💬{i18n.get('feedback')}
          </div>
        </div>
        {mode === DAILY_MODE && <div>{i18n.get('dailyTimeTip')}</div>}
        {!!data?.length && <GuessItem data={data} changeModalInfo={changeModalInfo}/>}
        <form className={'input-form'} autoComplete="off" action='javascript:void(0)' onSubmit={onSubmit}
              style={{display: isOver ? 'none' : ''}}>
          <div className="autocomplete">
            <input ref={inputRef} id="guess" placeholder={i18n.get('inputTip')} onKeyDown={(e) => {
              if (e.keyCode == 13) {
                onSubmit(e)
              }
            }}/>
          </div>
          <button className="mdui-btn mdui-btn-raised mdui-ripple guess_input">{i18n.get('submit')}</button>
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
        {mode !== DAILY_MODE && !isOver && data?.length > 0 && <a className={'togglec'} onClick={() => {
          giveUp()
        }}>🆘 {i18n.get('giveUpTip')}</a>
        }
        {!!data?.length && <div className={'share-body'}>
            <a className={'togglec'} onClick={() => {
              copyCurrentDay(shareTextCreator(data, mode, today, false, i18n.get('title'), hostDict[i18n.language]), i18n.get('copySuccess'))
            }}>
                <ShareIcon/>{i18n.get('shareTip1')}
            </a>
            <a className={'togglec'} onClick={() => {
              copyCurrentDay(shareTextCreator(data, mode, today, true, i18n.get('title'), hostDict[i18n.language]), i18n.get('copySuccess'))
            }} style={{marginLeft: 20}}>
                <ShareIcon/>{i18n.get('shareTip2')}
            </a>
        </div>
        }
        {modal && <Modal modal={modal} onClose={() => {
          changeModalInfo(null)
        }}/>}
      </div>
    </div>
  )
}
