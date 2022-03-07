import {React} from "../global";

const CloseIcon = ({onClick}) => {
  return <div style={{right: 10, top: 10, width: 20, height: 20, position: "absolute"}} onClick={onClick}>
    <svg viewBox="0 0 100 100" version="1.1"
         xmlns="http://www.w3.org/2000/svg">
      <polygon
        points="15,10 50,46 85,10 90,15 50,54 10,15" fill="rgba(255,255,255,1)"></polygon>
      <polygon
        points="50,46 50,46 50,46 50,54 50,54 50,54" fill="rgba(255,255,255,1)"></polygon>
      <polygon
        points="10,85 50,46 90,85 85,90 50,54 15,90" fill="rgba(255,255,255,1)"></polygon>
    </svg>
  </div>
}
export default CloseIcon
