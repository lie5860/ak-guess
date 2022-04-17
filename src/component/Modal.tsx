import {React, ReactDom} from "../global";
import {AppCtx} from "../locales/AppCtx";

const Modal = () => {
  const {i18n} = React.useContext(AppCtx)
  const [inst, setInst] = React.useState(null);
  const [modal, setModal] = React.useState(null)
  const onClose = () => setModal(null);
  React.useEffect(() => {
    window.mduiModal = {
      open: (modal: any) => {
        setModal(modal)
      },
      close: () => {
        inst?.close()
      }
    }
  }, [inst])
  React.useEffect(() => {
    if (modal) {
      const inst = new window.mdui.Dialog('#modal233')
      setInst(inst)
      inst.open()
      document.querySelector('#modal233')?.addEventListener('closed.mdui.dialog', onClose)
    }
  }, [!!modal])
  return modal && ReactDom.createPortal(<div className="mdui-dialog" id="modal233">
    {modal.useCloseIcon &&
    <div className={'close-icon'} onClick={() => inst?.close()}><i className="mdui-icon material-icons">&#xe5cd;</i>
    </div>}
    {(modal.useCloseIcon || modal?.title) && <div className="mdui-dialog-title">{modal?.title}</div>}
    <div className="mdui-dialog-content">{modal?.message}</div>
    {!modal.useCloseIcon && <div className="mdui-dialog-actions">
        <button className="mdui-btn mdui-ripple" onClick={() => inst?.close()}>{i18n.get('cancel')}</button>
    </div>}
  </div>, document.body);
}
export default Modal;
