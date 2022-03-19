import {React} from "../global";
import useImage from "./react-image/useImage";

interface User {
  name: string;
  homeUrl: string;
  avatar: string;
  tip?: string;
}

interface IProps {
  icon: string;
  title: string;
  userList: User[];
}


const ContributorItem = (props: { user: User }) => {
  const {name, homeUrl, avatar, tip} = props.user;
  // todo 增加useSuspense / 默认头像
  const {src} = useImage({
    srcList: [avatar],
  })
  return <span className="mdui-list-item mdui-ripple user-item" onClick={() => {
    homeUrl &&(location.href = homeUrl)
  }}>
    <div className="mdui-list-item-avatar"><img src={src}/></div>
      <div className="mdui-list-item-content">
        {name}
        {tip && <div className="user-tip">{tip}</div>}
      </div>
      </span>
}
const ContributorList = (props: IProps) => {
  const {icon, title, userList} = props
  return <ul className="mdui-list user-list" key={icon}>
    <li className="mdui-subheader-inset title-item" key={'icon'}>
      <i className="mdui-icon material-icons title-icon">{icon}</i>
      {title}
    </li>
    {userList.map((user: User, index) => <ContributorItem user={user} key={index}/>)}
    {[1, 2, 3, 4, 2, 2, 3, 4].map((a, i) => <li key={i} className="mdui-list-placeholder  user-item"/>)}
  </ul>
}
export default ContributorList;
