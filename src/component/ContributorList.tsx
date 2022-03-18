import {React} from "../global";

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
  key: string;
}

const ContributorList = (props: IProps) => {
  const {icon, title, userList, key} = props
  return <ul className="mdui-list user-list" key={key}>
    <li className="mdui-subheader-inset title-item">
      <i className="mdui-icon material-icons title-icon">{icon}</i>
      {title}
    </li>
    {userList.map((user: User, index) => {
      const {name, homeUrl, avatar, tip} = user;
      return <span key={index} className="mdui-list-item mdui-ripple user-item" onClick={() => {
        window.open(homeUrl)
      }}>
        <div className="mdui-list-item-avatar">{avatar && <img src={avatar}/>}</div>
        <div className="mdui-list-item-content">
          {name}
          {tip && <div className="user-tip">{tip}</div>}
        </div>
      </span>
    })}
    {[1, 2, 3, 4, 2, 2, 3, 4].map((a, i) => <li key={i} className="mdui-list-placeholder  user-item"/>)}
  </ul>
}
export default ContributorList;
