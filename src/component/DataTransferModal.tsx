import React, { useState, useContext } from 'react';
import { AppCtx } from '../locales/AppCtx';
import './DataTransfer.less';

interface IProps {
  onClose: () => void;
}

const DataTransferModal = ({ onClose }: IProps) => {
  const { i18n } = useContext(AppCtx) as any;
  const [activeTab, setActiveTab] = useState<'generate' | 'import'>('generate');

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 9999, backgroundColor: 'rgba(0,0,0,0.6)'
    }}>
      <div className="cy-modal" style={{ width: 400, maxWidth: '90%' }}>
        <div className="cy-tabs">
          <div 
            className={`cy-tab ${activeTab === 'generate' ? 'active' : ''}`}
            onClick={() => setActiveTab('generate')}
          >
            {i18n.get('generateCode')}
          </div>
          <div 
            className={`cy-tab ${activeTab === 'import' ? 'active' : ''}`}
            onClick={() => setActiveTab('import')}
          >
            {i18n.get('importCode')}
          </div>
        </div>

        <div className="cy-panel">
          {activeTab === 'generate' && (
            <div className="text-center" style={{ width: '100%' }}>
              <p>{i18n.get('transferCodeValidWarning')}</p>
              <button className="cy-button" style={{ marginTop: 20 }}>
                {i18n.get('generateCode')}
              </button>
            </div>
          )}

          {activeTab === 'import' && (
            <div className="text-center" style={{ width: '100%' }}>
              <input 
                className="cy-input" 
                placeholder={i18n.get('transferCodePlaceholder')} 
              />
              <br/>
              <button className="cy-button">
                {i18n.get('fetchCloudDataTip')}
              </button>
            </div>
          )}
        </div>

        <div style={{ marginTop: 20, textAlign: 'right' }}>
          <button className="mdui-btn mdui-ripple mdui-text-color-white" onClick={onClose} style={{ opacity: 0.8 }}>
            {i18n.get('cancel')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataTransferModal;
