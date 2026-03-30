import React from 'react';
import {CONTRIBUTORS, MAIN_KEY} from "../const";
import ContributorList from "./ContributorList";
import {reinitRecord, History} from "./History";
import GuessItem, {ChartInfoLink} from "./GuessItem";
import copyCurrentDay from "../utils/copyCurrentDay";
import shareTextCreator from "../utils/share";
import ShareIcon from "./ShareIcon";
import {HomeStore, useGame} from "../store";
import {AppCtx} from "../locales/AppCtx";
import {useAutocomplete} from "./Autocomplete";
import Guide from "./Guide";
import {getConfig} from "../locales";

const showModal = (message: string) => {
  window.mdui.snackbar({
    message
  });
}

interface IProps {
  openHelp: () => void;
  store: HomeStore;
}


const Game = (props: IProps) => {
  const {i18n, aliasData, chartsData: ctxChartsData} = React.useContext(AppCtx) as any;
  const {openHelp, store} = props
  const {today, mode, chartsData} = store
  const game = useGame(store);
  const chartNames = React.useMemo(() => chartsData.map((v: Character) => v?.[MAIN_KEY]), [])
  const [initialized, setInit] = React.useState(false)

  // React 化的 autocomplete
  const autocomplete = useAutocomplete({
    chartsData,
    aliasData,
    placeholder: i18n.get('inputTip'),
    id: 'guess',
    onSubmit: () => {},
  });

  React.useEffect(() => {
    reinitRecord(i18n.language);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i18n.language])
  const confirmGiveUp = () => {
    window.mdui.dialog({
      history: false,
      content: i18n.get("giveUpConfirm"),
      buttons: [
        {
          text: i18n.get('no')
        },
        {
          text: i18n.get('yes'),
          onClick: function () {
            game.giveUp?.()
          }
        }
      ]
    });
  }
  const gameInit = async () => {
    setInit(false)
    await game.init()
    setInit(true)
  }
  // 外部使用mode作为key 其实mode的变化感知不到了
  React.useEffect(gameInit, [mode])
  const onSubmit = (e: any) => {
    e.stopPropagation();
    e.preventDefault();
    if (game.preSubmitCheck?.()) {
      return;
    }
    const inputName = autocomplete.inputValue?.toUpperCase();
    // 转大写感觉会存在一定的风险。 例如 Ceoceo和CeoCeo会认为是一个干员，但按照标准两个大写的词不会连着用才对
    if (chartNames.map((v: string) => v?.toUpperCase()).indexOf(inputName) === -1) {
      showModal(i18n.get('errNameTip'))
    } else if (game.data.map((v: GuessItem) => v.guess?.[MAIN_KEY]?.toUpperCase()).indexOf(inputName) !== -1) {
      showModal(i18n.get('duplicationTip'));
    } else {
      const inputItem = chartsData.filter((v: Character) => v?.[MAIN_KEY]?.toUpperCase() === inputName)[0];
      const newData = game.insertItem(inputItem);
      autocomplete.clearValue();
      if (game.judgeOver(newData)) {
        game.gameOver(newData)
      }
    }
  }
  if (!initialized) return null;
  const config = getConfig(i18n.language);
  return <>
    <div style={{paddingTop: 10, ...config.mainTitleStyle}}><span className={`title`}>{i18n.get('title')}</span></div>
    {config.showTitleDesc && <div>{i18n.get('titleDesc')}
      <div className="tooltip" onClick={() => {
        window?.mduiModal?.open({
          title: i18n.get('contributors'),
          message: CONTRIBUTORS.map((data, index) => <ContributorList key={`${index}`} {...data}/>),
          useCloseIcon: true
        })
      }}>小刻猜猜团
      </div>
    </div>}
    <div className="titlePanel">
      {game.gameTip(config)}
      {config.customTip && <pre style={{marginTop: 8}}>{config.customTip}</pre>}
      {config.showHelp && <div className="tooltip" onClick={() => openHelp()}>🍪{i18n.get('help')}</div>}
      {config.showReport && <div className="tooltip" onClick={() => {
        window?.mduiModal?.open({"message": <History mode={mode}/>, useCloseIcon: true, title: i18n.get('report')})
      }}>🔎{i18n.get('report')}
      </div>}
      {config.showFeedback && <div className="tooltip" onClick={() => {
        window.open(i18n.get('questionnaireUrl'))
      }}>💬{i18n.get('feedback')}
      </div>}
      {config.showOperators && <div className="tooltip" onClick={() => {
        window?.mduiModal?.open({"message": <Guide/>, useCloseIcon: true, title: i18n.get('operators')});
      }}>📔{i18n.get('operators')}
      </div>}
    </div>
    {!!game.data?.length && <GuessItem data={game.data}/>}
    <form className={'input-form'} autoComplete="off" action='javascript:void(0)' onSubmit={onSubmit}
          style={{display: game.isOver ? 'none' : ''}}>
      {autocomplete.renderInput()}
      <button className="mdui-btn mdui-btn-raised mdui-ripple guess_input">{i18n.get('submit')}</button>
    </form>

    {game.isOver &&
    <div className={'answer'}>
      {`${i18n.get(game.isWin ? 'successTip' : 'failTip')}${i18n.get('answerTip1')}`}<ChartInfoLink
        chart={game.answer}/>{i18n.get('answerTip2')}
    </div>}
    {game.canNewGame && <a className={'togglec'} onClick={() => {
      game.newGame?.()
    }}>🔄 {i18n.get('newGameTip')}</a>
    }
    {game.canGiveUp && <a className={'togglec'} onClick={() => {
      confirmGiveUp()
    }}>🆘 {i18n.get('giveUpTip')}</a>
    }
    {!!game.data?.length && <div className={'share-body'}>
        <a className={'togglec'} onClick={() => {
          copyCurrentDay(shareTextCreator({
            game,
            mode,
            today,
            showName: false,
            i18n
          }), i18n.get('copySuccess'))
        }}>
            <ShareIcon/>{i18n.get('shareTip1')}
        </a>
        <a className={'togglec'} onClick={() => {
          copyCurrentDay(shareTextCreator({
            mode,
            today,
            showName: true,
            game,
            i18n
          }), i18n.get('copySuccess'))
        }} style={{marginLeft: 20}}>
            <ShareIcon/>{i18n.get('shareTip2')}
        </a>
    </div>
    }
  </>
}
export default Game;
