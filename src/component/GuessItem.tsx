import {MAIN_KEY, TYPES} from "../const";
import {React} from "../global";

const GuessItem = ({data, setMsg}) => {
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
              <div className="tooltip" onClick={() => {
                setMsg(<>
                  <div><span className={'title'}>干员名称:</span>{v.guess?.[MAIN_KEY]}</div>
                  <div><span className={'title'}>稀有度:</span>{1 + rarity}</div>
                  <div><span className={'title'}>阵营:</span>{team?.join(' ')}</div>
                  <div><span className={'title'}>职业:</span>{className?.join('-')}</div>
                  <div><span className={'title'}>种族:</span>{race}</div>
                  <div><span className={'title'}>画师:</span>{painter}</div>
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
