import {React} from "../global";

const ShareIcon = ({onClick}: { onClick?: () => void }) => {
  return <div className={'share-icon'} onClick={onClick}>
    <i className="mdui-icon material-icons">&#xe80d;</i>
  </div>
}
export default ShareIcon
