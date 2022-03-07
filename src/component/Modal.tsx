import {React} from "../global";
import CloseIcon from "./CloseIcon";

const Modal = ({modal, msg, onClose, showCloseIcon}) => {
  return <div className={'global-mask'} onClick={onClose}>
    <div className={`global-tooltiptext`} style={{width: modal?.width}} onClick={(e) => {
      e.stopPropagation();
    }}>
      {showCloseIcon && <CloseIcon onClick={onClose}/>}
      {msg || modal?.message}
    </div>
  </div>;
}
export default Modal;
