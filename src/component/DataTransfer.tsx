import React, { useContext } from 'react';
import { AppCtx } from '../locales/AppCtx';
import DataTransferModal from './DataTransferModal';
import { consumePendingTransferPayload } from '../utils/TransferService';

const DataTransfer = () => {
  const { i18n } = useContext(AppCtx) as {
    i18n: { get: (key: string) => string; language: string };
  };

  const openModal = (message: JSX.Element) => {
    const mduiModal = (
      window as unknown as {
        mduiModal?: {
          open: (params: { message: JSX.Element; useCloseIcon: boolean; title: string }) => void;
        };
      }
    ).mduiModal;
    if (mduiModal) {
      mduiModal.open({
        message,
        useCloseIcon: true,
        title: i18n.get('dataTransfer'),
      });
    }
  };

  React.useEffect(() => {
    const timer = window.setTimeout(() => {
      const pendingPayload = consumePendingTransferPayload(i18n.language);
      if (pendingPayload) {
        openModal(<DataTransferModal initialPayload={pendingPayload} />);
      }
    }, 0);

    return () => window.clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i18n.language]);

  const handleOpen = () => {
    openModal(<DataTransferModal />);
  };

  return (
    <div className="tooltip" onClick={handleOpen}>
      {i18n.get('dataTransfer')}
    </div>
  );
};

export default DataTransfer;
