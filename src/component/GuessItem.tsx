import {MAIN_KEY, TYPES} from "../const";
import {React} from "../global";
import {AppCtx} from "../locales/AppCtx";

const GuessItem = ({data}: { data: any[] }) => {
  const setMsg = window.mdui.alert;
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
              <div className="tooltip" onClick={() => {
                setMsg(<>
                  <div><span className={'title'}>{i18n.get('chartsName')}:</span>{name}</div>
                  <div><span className={'title'}>{i18n.get('rarity')}:</span>{1 + rarity}</div>
                  <div><span className={'title'}>{i18n.get('camp')}:</span>{team?.join(' ')}</div>
                  <div><span className={'title'}>{i18n.get('className')}:</span>{className?.join('-')}</div>
                  <div><span className={'title'}>{i18n.get('race')}:</span>{race}</div>
                  <div><span className={'title'}>{i18n.get('painter')}:</span>{painter}</div>
                </>)
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
