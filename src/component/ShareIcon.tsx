import {React} from "../global";

const ShareIcon = () => {
  return <div className={'share-icon'}>
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg"
         viewBox="0 0 300 300">
      <circle cx="242" cy="49" r="35"></circle>
      <circle cx="242" cy="251" r="35"></circle>
      <circle cx="58" cy="150" r="35"></circle>
      <line x1="242" y1="49" x2="59" y2="150" stroke-width="20"></line>
      <line x1="242" y1="251" x2="59" y2="150" stroke-width="20"></line>
    </svg>
  </div>
}
export default ShareIcon
