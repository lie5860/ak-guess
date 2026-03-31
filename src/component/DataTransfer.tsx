import React, { useContext } from 'react';
import { AppCtx } from '../locales/AppCtx';
import DataTransferModal from './DataTransferModal';

const DataTransfer = () => {
  const { i18n } = useContext(AppCtx) as { i18n: { get: (key: string) => string } };

  const handleOpen = () => {
    const mduiModal = (
      window as unknown as {
        mduiModal?: {
          open: (params: { message: JSX.Element; useCloseIcon: boolean; title: string }) => void;
        };
      }
    ).mduiModal;
    if (mduiModal) {
      mduiModal.open({
        message: <DataTransferModal />,
        useCloseIcon: true,
        title: i18n.get('dataTransfer'),
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
