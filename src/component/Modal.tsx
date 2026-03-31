import React from 'react';
import ReactDom from 'react-dom';
import { AppCtx } from '../locales/AppCtx';

const Modal = () => {
  const { i18n } = React.useContext(AppCtx);
  const [inst, setInst] = React.useState<{ open: () => void; close: () => void } | null>(null);
  const [modal, setModal] = React.useState<{
    useCloseIcon?: boolean;
    title?: string;
    message?: React.ReactNode;
  } | null>(null);
  const onClose = () => setModal(null);
  React.useEffect(() => {
    window.mduiModal = {
      open: (modal: { useCloseIcon?: boolean; title?: string; message?: React.ReactNode }) => {
        setModal(modal);
      },
      close: () => {
        inst?.close();
      },
    };
  }, [inst]);
  React.useEffect(() => {
    if (modal) {
      const inst = new window.mdui.Dialog('#modal233', {
        history: false,
        cssClass: `lang-${i18n.language}`,
      });
      setInst(inst);
      inst.open();
      document.querySelector('#modal233')?.addEventListener('closed.mdui.dialog', onClose);
    }
  }, [i18n.language, modal]);
  return (
    modal &&
    ReactDom.createPortal(
      <div className={`mdui-dialog lang-${i18n.language}`} id="modal233">
        {modal.useCloseIcon && (
          <div className={'close-icon'} onClick={() => inst?.close()}>
            <i className="mdui-icon material-icons">&#xe5cd;</i>
          </div>
        )}
        {(modal.useCloseIcon || modal?.title) && (
          <div className="mdui-dialog-title">{modal?.title}</div>
        )}
        <div className="mdui-dialog-content">{modal?.message}</div>
        {!modal.useCloseIcon && (
          <div className="mdui-dialog-actions">
            <button className="mdui-btn mdui-ripple" onClick={() => inst?.close()}>
              {i18n.get('cancel')}
            </button>
          </div>
        )}
      </div>,
      document.body,
    )
  );
};
export default Modal;
