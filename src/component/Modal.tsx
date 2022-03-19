import {React} from "../global";

const Modal = ({modal, onClose}) => {
  const [inst, setInst] = React.useState(null);
  React.useEffect(() => {
    const inst = new window.mdui.Dialog('#modal233')
    setInst(inst)
    inst.open()
    document.querySelector('#modal233')?.addEventListener('closed.mdui.dialog', onClose)
  }, [])
  return <div className="mdui-dialog" id="modal233">
    {modal.useCloseIcon && <div className={'close-icon'} onClick={()=>inst?.close()}><i className="mdui-icon material-icons">&#xe5cd;</i></div>}
    {(modal.useCloseIcon || modal?.title) && <div className="mdui-dialog-title">{modal?.title}</div>}
    <div className="mdui-dialog-content">{modal?.message}</div>
    {!modal.useCloseIcon && <div className="mdui-dialog-actions">
        <button className="mdui-btn mdui-ripple" onClick={()=>inst?.close()}>cancel</button>
    </div>}
  </div>;
}
export default Modal;
