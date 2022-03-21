import {MAIN_KEY, TYPES} from "../const";
import {React} from "../global";
import {AppCtx} from "../locales/AppCtx";

const GuessItem = ({data, changeModalInfo}: { data: any[], changeModalInfo: (modal: any) => void }) => {
  const {i18n} = React.useContext(AppCtx)
  return <div className={'guesses'}>
    <div className="row">
      {TYPES.map(({label, i18nKey}) => <div className='column' key={label}>
        <span className={'title'}>{i18n.get(i18nKey)}</span></div>)}
    </div>
    {data.map((v: any, index: number) => {
      return <div className="row" key={index}>
        {TYPES.map(({key, type}) => {
          if (key === 'guess') {
            const {name, rarity, team, className, race, painter} = v.guess
            return <div className='column' key={key}>
              <div className="tooltip mdui-text-color-theme-accent" onClick={() => {
                changeModalInfo({
                  title: i18n.get('info'),
                  message: <div>
                    <div><strong>{i18n.get('chartsName')}:</strong>{name}</div>
                    <div><strong>{i18n.get('rarity')}:</strong>{1 + rarity}</div>
                    <div><strong>{i18n.get('camp')}:</strong>{team?.join(' ')}</div>
                    <div><strong>{i18n.get('className')}:</strong>{className?.join('-')}</div>
                    <div><strong>{i18n.get('race')}:</strong>{race}</div>
                    <div><strong>{i18n.get('painter')}:</strong>{painter}</div>
                  </div>,
                  useCloseIcon: true
                })
              }}>
                {v.guess?.[MAIN_KEY]}
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
export default GuessItem;
