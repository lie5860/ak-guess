import React, { useContext } from 'react';
import { AppCtx } from '../locales/AppCtx';
import DataTransferModal from './DataTransferModal';

const DataTransfer = () => {
  const { i18n } = useContext(AppCtx) as any;

  const handleOpen = () => {
    const mduiModal = (window as any).mduiModal;
    if (mduiModal) {
      mduiModal.open({
        message: <DataTransferModal />,
        useCloseIcon: true,
        title: i18n.get('dataTransfer')
      });
    }
  };

  return (
    <div className="tooltip" onClick={handleOpen}>
      {i18n.get('dataTransfer')}
    </div>
  );
};

export default DataTransfer;
