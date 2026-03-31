import React, { useState, useContext, useEffect } from 'react';
import { AppCtx } from '../locales/AppCtx';
import './DataTransfer.less';
import { generateTransferCode, queryTransferCode, applyTransferPayload, TransferPayload } from '../utils/TransferService';
import { loadRecordData } from './History';

interface IProps {
  onClose: () => void;
}

const showModal = (message: string) => {
  const mdui = (window as any).mdui;
  if (mdui) {
    mdui.snackbar({ message });
  } else {
    alert(message);
  }
};

const DataTransferModal = ({ onClose }: IProps) => {
  const { i18n } = useContext(AppCtx) as any;
  const [activeTab, setActiveTab] = useState<'generate' | 'import'>('generate');
  
  // Generate State
  const [loadingCode, setLoadingCode] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');

  // Import State
  const [importCode, setImportCode] = useState('');
  const [loadingQuery, setLoadingQuery] = useState(false);
  const [cloudPayload, setCloudPayload] = useState<TransferPayload | null>(null);

  const localRecordData = loadRecordData(i18n.language);

  const handleGenerate = async () => {
    setLoadingCode(true);
    setGeneratedCode(i18n.get('transferCodeGenerated') || '...');
    try {
      const res = await generateTransferCode(i18n.language);
      if (res.code === 0) {
        setGeneratedCode(res.data.transferCode);
      }
    } finally {
      setLoadingCode(false);
    }
  };

  const handleQuery = async () => {
    if (!importCode) return;
    setLoadingQuery(true);
    try {
      const res = await queryTransferCode(importCode);
      if (res.code === 0) {
        setCloudPayload(res.data.payload);
      }
    } catch(e) {
      showModal(i18n.get('transferCodeError') || 'Invalid Code');
    } finally {
      setLoadingQuery(false);
    }
  };

  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(generatedCode).then(() => {
        showModal(i18n.get('copySuccess'));
      });
    }
  };

  const handleOverwrite = () => {
    if (!cloudPayload) return;
    const mdui = (window as any).mdui;
    if (mdui && mdui.dialog) {
      mdui.dialog({
        history: false,
        content: i18n.get('overwriteWarning'),
        buttons: [
          { text: i18n.get('no') },
          {
            text: i18n.get('yes'),
            onClick: function () {
              applyTransferPayload(cloudPayload);
              showModal(i18n.get('overwriteSuccess'));
              setTimeout(() => {
                window.location.reload();
              }, 1000);
            }
          }
        ]
      });
    } else {
      if (window.confirm(i18n.get('overwriteWarning'))) {
        applyTransferPayload(cloudPayload);
        showModal(i18n.get('overwriteSuccess'));
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    }
  };

  const getSummary = (data: any) => {
    let play = 0;
    let win = 0;
    let opCount = 0;
    if (!data) return { play, win, opCount };
    for (const mode of ["random", "daily", "paradox"]) {
      if (data[mode]) {
        play += (data[mode].playTimes || 0);
        win += (data[mode].winTimes || 0);
        opCount += Object.keys(data[mode].roles || {}).length;
      }
    }
    return { play, win, opCount };
  };

  const renderDataPreview = (title: string, data: any) => {
    const { play, win, opCount } = getSummary(data);
    
    return (
      <div className="cy-split-col">
        <h4>{title}</h4>
        <div className="cy-data-row">
          <span className="cy-data-label">{i18n.get('playTimes')}</span>
          <span className="cy-data-val">{play}</span>
        </div>
        <div className="cy-data-row">
          <span className="cy-data-label">{i18n.get('winTimes')}</span>
          <span className="cy-data-val">{win}</span>
        </div>
        <div className="cy-data-row">
          <span className="cy-data-label">{i18n.get('operatorWinCount')}</span>
          <span className="cy-data-val">{opCount}</span>
        </div>
      </div>
    );
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 9999, backgroundColor: 'rgba(0,0,0,0.6)'
    }}>
      <div className="cy-modal" style={{ width: 500, maxWidth: '95%' }}>
        <div className="cy-tabs">
          <div 
            className={`cy-tab ${activeTab === 'generate' ? 'active' : ''}`}
            onClick={() => { setActiveTab('generate'); setCloudPayload(null); setImportCode(''); }}
          >
            {i18n.get('generateCode')}
          </div>
          <div 
            className={`cy-tab ${activeTab === 'import' ? 'active' : ''}`}
            onClick={() => { setActiveTab('import'); setGeneratedCode(''); }}
          >
            {i18n.get('importCode')}
          </div>
        </div>

        <div className="cy-panel">
          {activeTab === 'generate' && (
            <div className="text-center" style={{ width: '100%' }}>
              <p>{i18n.get('transferCodeValidWarning')}</p>
              
              {generatedCode && (
                <div style={{  display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                   <div className="cy-code-display">{generatedCode}</div>
                   <button className="cy-button" onClick={handleCopy} style={{ marginBottom: 20 }}>
                     {i18n.get('copyTransferCode') || '一键复制'}
                   </button>
                </div>
              )}

              <button className="cy-button" onClick={handleGenerate} disabled={loadingCode}>
                {i18n.get('generateCode')}
              </button>
            </div>
          )}

          {activeTab === 'import' && !cloudPayload && (
            <div className="text-center" style={{ width: '100%' }}>
              <input 
                className="cy-input" 
                placeholder={i18n.get('transferCodePlaceholder')} 
                value={importCode}
                onChange={e => setImportCode(e.target.value)}
              />
              <br/>
              <button className="cy-button" onClick={handleQuery} disabled={!importCode || loadingQuery}>
                {loadingQuery ? (i18n.get('queryingTransferCode') || '查询中...') : i18n.get('fetchCloudDataTip')}
              </button>
            </div>
          )}

          {activeTab === 'import' && cloudPayload && (
            <div className="text-center" style={{ width: '100%' }}>
              <div className="cy-split-view">
                 {renderDataPreview(i18n.get('currentLocalData') || '当前数据', localRecordData)}
                 {renderDataPreview(i18n.get('cloudBackupData') || '云端数据', cloudPayload.recordData)}
              </div>
              <button className="cy-button cy-danger-button" onClick={handleOverwrite}>
                {i18n.get('confirmOverwrite') || '确认覆盖'}
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
