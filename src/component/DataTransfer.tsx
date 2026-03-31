import React, { useState, useContext } from 'react';
import { AppCtx } from '../locales/AppCtx';
import DataTransferModal from './DataTransferModal';

const DataTransfer = () => {
  const [show, setShow] = useState(false);
  const { i18n } = useContext(AppCtx) as any;

  return (
    <>
      <div className="tooltip" onClick={() => setShow(true)}>
        {i18n.get('dataTransfer')}
      </div>
      {show && <DataTransferModal onClose={() => setShow(false)} />}
    </>
  );
};

export default DataTransfer;
