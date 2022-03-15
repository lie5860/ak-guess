import autocomplete from './utils/autocomplete'
import {moment, React} from './global'
import {chartsData, DAILY_MODE, defaultTryTimes, GAME_NAME, MAIN_KEY, questionnaireUrl, RANDOM_MODE} from "./const";
import copyCurrentDay from "./utils/copyCurrentDay";
import ShareIcon from './component/ShareIcon'
import Modal from "./component/Modal";
import shareTextCreator from "./utils/share";
import Help from './component/Help';
import GuessItem from "./component/GuessItem";
import {loadRecordData, saveRecordData, History} from "./component/History";
import {getDailyData, guess} from "./server";
import {getGame} from "./store";
import './index.less'
import './normalize.css'

export default function Home() {
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
    mode,
    setRandomData, setRandomAnswerKey, randomAnswerKey, randomData, isGiveUp,
    setDayData, remoteAnswerKey, dayData, today
  }
  const game = getGame(store)
  React.useEffect(() => {
    getDailyData().then(({last_date, daily}) => {
      setUpdateDate(last_date)
      setRemoteAnswerKey(daily)
    })
    if (!localStorage.getItem('firstOpen')) {
      localStorage.setItem('firstOpen', 'yes');
      changeModalInfo({
        "message": <Help updateDate={updateDate} firstOpen/>, "width": '80%'
      })
    }
    autocomplete(inputRef.current, chartNames, chartsData);

    const giveUp = localStorage.getItem("giveUp")
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
    let result = confirm("确定要放弃答题去吃蜜饼吗？\n当前的连胜纪录会被重置哦！");
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
    const error = game?.preSubmitCheck?.()
    if (error) {
      return;
    }
    const inputName = inputRef.current.value;
    if (chartNames.indexOf(inputName) === -1) {
      showModal('输入错误，请输入正确的干员名称。')
    } else if (data.map(v => v.guess?.[MAIN_KEY]).indexOf(inputName) !== -1) {
      showModal('已经输入过啦 换一个吧！');
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
        <div className={'ak-tab'}>
          <div className={`ak-tab-item ${mode === RANDOM_MODE ? 'active' : ''}`}
               onClick={() => setMode(RANDOM_MODE)}>
            随心所欲！
          </div>
          {remoteAnswerKey !== -1 &&
          <div className={`ak-tab-item ${mode === DAILY_MODE ? 'active' : ''}`}
               onClick={() => setMode(DAILY_MODE)}>
              每日挑战！
          </div>}

        </div>
        <div><span className={`title`}>{GAME_NAME}</span></div>
        <div>明日方舟 wordle-like by 昨日沉船</div>
        <div class="titlePanel">你有{defaultTryTimes - data.length}/{defaultTryTimes}次机会猜测这只神秘干员，试试看！<br/>
          <div className="tooltip" onClick={() => {
            changeModalInfo({
              "message": <Help updateDate={updateDate}/>, "width": '80%'
            })
          }}>🍪小刻学堂
          </div>
          <div className="tooltip" onClick={() => {
            changeModalInfo({"message": <History setMsg={setMsg}/>, "width": '80%'})
          }}>🔎测试报告
          </div>
          <div className="tooltip" onClick={() => {
            window.open(questionnaireUrl)
          }}>💬反馈
          </div>
        </div>
        {mode === DAILY_MODE && <div>更新时间为 北京时间0点 GMT+8</div>}
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
        {!!isOver && <div className={'answer'}>{`${isWin ? '成功' : '失败'}了！这只神秘的干员是${answer?.[MAIN_KEY]}！`}</div>}

        {mode !== DAILY_MODE && !!isOver && <a className={'togglec'} onClick={() => {
          setGiveUp(false);
          setData([], false)
          setRandomAnswerKey(Math.floor(Math.random() * chartsData.length))
        }}>▶️ 再来一局！</a>
        }
        {mode !== DAILY_MODE && !isOver && data?.length > 0 && <a className={'togglec'} onClick={() => {
          giveUp()
        }}>🆘 小刻饿啦！</a>
        }
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
        {modal && <Modal modal={modal} showCloseIcon onClose={() => changeModalInfo(null)}/>}
        {msg && <Modal onClose={() => {
          setMsg('')
        }} msg={msg}/>}
      </div>
    </div>
  )
}
