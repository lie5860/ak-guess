import autocomplete from './utils/autocomplete'
import copyCurrentDay from "./utils/copyCurrentDay";
import {moment, React} from './global'
import {CONTRIBUTORS, DAILY_MODE, DEFAULT_TRY_TIMES, MAIN_KEY, RANDOM_MODE} from "./const";
import ShareIcon from './component/ShareIcon'
import Modal from "./component/Modal";
import shareTextCreator from "./utils/share";
import Help from './component/Help';
import GuessItem from "./component/GuessItem";
import {History} from "./component/History";
import {getDailyData, guess} from "./server";
import {AppCtx} from './locales/AppCtx';
import {useGame} from "./store";
import './index.less'
import './normalize.css'
import {localStorageGet, localStorageSet} from "./locales/I18nWrap";
import {hostDict, labelDict} from "./locales";
import ContributorList from "./component/ContributorList";

const showModal = (message: string) => {
  window.mdui.snackbar({
    message
  });
}
export default function Home() {
  const {i18n, chartsData, aliasData} = React.useContext(AppCtx);
  const inputRef = React.useRef();
  const unbindRef = React.useRef();
  const [mode, setMode] = React.useState(RANDOM_MODE)
  const [modal, changeModalInfo] = React.useState()
  const [showDailyMode, setShowDailyMode] = React.useState(false)
  const [initialized, setInit] = React.useState(false)
  const [updateDate, setUpdateDate] = React.useState('')
  const chartNames = React.useMemo(() => chartsData.map((v: Character) => v?.[MAIN_KEY]), [])
  const today = React.useMemo(() => moment().tz("Asia/Shanghai").format('YYYY-MM-DD'), [])
  const store = {mode, chartsData, lang: i18n.language, today}
  const game = useGame(store)
  const {answer, data, setData, preSubmitCheck, giveUp, isWin, isOver, newGame, canNewGame, canGiveUp, gameOver} = game;
  const openHelp = (firstOpen = false) => {
    changeModalInfo({
      "message": <Help updateDate={updateDate} firstOpen={firstOpen}/>,
      "title": i18n.get('helpTitle'),
      useCloseIcon: true
    })
  }
  React.useEffect(() => {
    getDailyData(i18n.language).then(({last_date, daily}: { last_date: string, daily: number }) => {
      setUpdateDate(last_date)
      setShowDailyMode(daily >= 0)
    })
    if (!localStorageGet(i18n.language, 'firstOpen')) {
      localStorageSet(i18n.language, 'firstOpen', 'yes');
      openHelp(true)
    }
  }, [])
  const gameInit = async () => {
    await game.init()
    setInit(true)
  }
  React.useEffect(gameInit, [mode])
  // 绑定联想输入
  React.useEffect(() => {
    if (initialized) {
      unbindRef.current = autocomplete(inputRef.current, chartNames, chartsData, aliasData);
    } else {
      unbindRef.current?.();
    }
  }, [initialized])
  const confirmGiveUp = () => {
    window.mdui.dialog({
      content: i18n.get("giveUpConfirm"),
      buttons: [
        {
          text: i18n.get('no')
        },
        {
          text: i18n.get('yes'),
          onClick: function () {
            giveUp?.()
          }
        }
      ]
    });
  }

  const onSubmit = (e: any) => {
    e.stopPropagation();
    if (preSubmitCheck?.()) {
      return;
    }
    const inputName = inputRef.current.value?.toUpperCase();
    // 转大写感觉会存在一定的风险。 例如 Ceoceo和CeoCeo会认为是一个干员，但按照标准两个大写的词不会连着用才对
    if (chartNames.map((v: string) => v?.toUpperCase()).indexOf(inputName) === -1) {
      showModal(i18n.get('errNameTip'))
    } else if (data.map((v: GuessItem) => v.guess?.[MAIN_KEY]?.toUpperCase()).indexOf(inputName) !== -1) {
      showModal(i18n.get('duplicationTip'));
    } else {
      const inputItem = chartsData.filter((v: Character) => v?.[MAIN_KEY]?.toUpperCase() === inputName)[0];
      const res = guess(inputItem, answer)
      const newData = [...data, res]
      setData(newData)
      inputRef.current.value = '';
      const isWin = newData?.[newData?.length - 1]?.guess?.[MAIN_KEY] === answer?.[MAIN_KEY]
      const isOver = newData.length >= DEFAULT_TRY_TIMES || isWin
      if (isOver) {
        gameOver(newData, isWin)
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
                <i style={{visibility: key === i18n.language ? undefined : 'hidden'}}
                   className="mdui-menu-item-icon mdui-icon material-icons">done</i>
                {labelDict[key]}
              </a>
            })}
          </li>
        </ul>
        <div className="mdui-tab mdui-tab-scrollable ak-tab" mdui-tab>
          <div className={`ak-tab-item ${mode === RANDOM_MODE ? 'active' : ''}`}
               onClick={() => {
                 if (mode !== RANDOM_MODE) {
                   setInit(false)
                   setMode(RANDOM_MODE)
                 }
               }}>
            {i18n.get('randomMode')}
          </div>
          {showDailyMode &&
          <div className={`ak-tab-item ${mode === DAILY_MODE ? 'active' : ''}`}
               onClick={() => {
                 if (mode !== DAILY_MODE) {
                   setInit(false)
                   setMode(DAILY_MODE)
                 }
               }}>
            {i18n.get('dailyMode')}
          </div>}
        </div>
        {initialized && <>
            <div style={{paddingTop: 10}}><span className={`title`}>{i18n.get('title')}</span></div>
            <div>{i18n.get('titleDesc')}
                <div className="tooltip" onClick={() => {
                  changeModalInfo({
                    title: i18n.get('contributors'),
                    message: CONTRIBUTORS.map((data, index) => <ContributorList key={`${index}`} {...data}/>),
                    useCloseIcon: true
                  })
                }}>小刻猜猜团
                </div>
            </div>
            <div className="titlePanel">
              {i18n.get('timesTip', {times: `${DEFAULT_TRY_TIMES - data.length}/${DEFAULT_TRY_TIMES}`})}
                <br/>
                <div className="tooltip" onClick={() => openHelp()}>🍪{i18n.get('help')}
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
          {canNewGame && <a className={'togglec'} onClick={() => {
            newGame?.()
          }}>▶️ {i18n.get('newGameTip')}</a>
          }
          {canGiveUp && <a className={'togglec'} onClick={() => {
            confirmGiveUp()
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
        </>}
        {modal && <Modal modal={modal} onClose={() => {
          changeModalInfo(null)
        }}/>}
      </div>
    </div>
  )
}
