import {questionnaireUrl} from "../const";
import {React} from "../global";
import CloseIcon from "./CloseIcon";

const FeedBack = ({}) => {
  const [visible, setVisible] = React.useState(true)
  return visible ? <div className={'trigger-tab'}>
    <div className={'trigger-label'} onClick={() => {
      window.open(questionnaireUrl)
    }}>反馈
    </div>
    <CloseIcon onClick={() => {
      console.log(244)
      setVisible(false)
    }}/>
  </div> : null
}
export default FeedBack
