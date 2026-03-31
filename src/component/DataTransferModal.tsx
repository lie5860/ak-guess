import React, { useState, useContext } from 'react';
import { AppCtx } from '../locales/AppCtx';
import { generateTransferCode, queryTransferCode, applyTransferPayload, TransferPayload } from '../utils/TransferService';
import { loadRecordData } from './History';

const showModal = (message: string) => {
  const mdui = (window as any).mdui;
  if (mdui) {
    mdui.snackbar({ message });
  } else {
    alert(message);
  }
};

const DataTransferModal = () => {
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
              const mduiModal = (window as any).mduiModal;
              if (mduiModal) mduiModal.close();
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
      <div style={{ flex: 1, padding: '15px', background: 'rgba(0,0,0,0.03)', borderRadius: '4px', border: '1px solid rgba(0,0,0,0.08)' }}>
        <h4 style={{ margin: '0 0 15px 0', textAlign: 'center', borderBottom: '1px solid rgba(0,0,0,0.05)', paddingBottom: '8px' }}>{title}</h4>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span style={{ color: '#666' }}>{i18n.get('playTimes')}</span>
          <strong>{play}</strong>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span style={{ color: '#666' }}>{i18n.get('winTimes')}</span>
          <strong>{win}</strong>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: '#666' }}>{i18n.get('operatorWinCount')}</span>
          <strong>{opCount}</strong>
        </div>
      </div>
    );
  };

  return (
    <div style={{ padding: '0 8px 12px 8px' }}>
      <div className="mdui-tab mdui-tab-full-width" style={{ marginBottom: 20 }}>
        <a href="#tab-generate" className={`mdui-ripple ${activeTab === 'generate' ? 'mdui-tab-active' : ''}`}
           onClick={(e) => { e.preventDefault(); setActiveTab('generate'); setCloudPayload(null); setImportCode(''); }}>
          {i18n.get('generateCode')}
        </a>
        <a href="#tab-import" className={`mdui-ripple ${activeTab === 'import' ? 'mdui-tab-active' : ''}`}
           onClick={(e) => { e.preventDefault(); setActiveTab('import'); setGeneratedCode(''); }}>
          {i18n.get('importCode')}
        </a>
      </div>

      <div style={{ minHeight: '180px' }}>
        {activeTab === 'generate' && (
          <div style={{ textAlign: 'center' }}>
            <p style={{ color: '#666', marginBottom: 20 }}>{i18n.get('transferCodeValidWarning')}</p>
            
            {generatedCode && (
              <div style={{ marginBottom: 20 }}>
                 <div style={{ 
                   fontSize: 22, fontFamily: 'monospace', fontWeight: 'bold', 
                   letterSpacing: 2, padding: '10px 20px', background: 'rgba(0,0,0,0.05)', 
                   borderRadius: 4, display: 'inline-block', marginBottom: 15
                 }}>
                   {generatedCode}
                 </div>
                 <br />
                 <button className="mdui-btn mdui-btn-raised mdui-ripple mdui-color-theme-accent" onClick={handleCopy}>
                   {i18n.get('copyTransferCode') || '一键复制'}
                 </button>
              </div>
            )}

            <button className="mdui-btn mdui-btn-raised mdui-ripple mdui-color-theme" onClick={handleGenerate} disabled={loadingCode}>
              {i18n.get('generateCode')}
            </button>
          </div>
        )}

        {activeTab === 'import' && !cloudPayload && (
          <div style={{ textAlign: 'center' }}>
            <div className="mdui-textfield mdui-textfield-floating-label" style={{ maxWidth: 300, margin: '0 auto 20px auto' }}>
              <label className="mdui-textfield-label">{i18n.get('transferCodePlaceholder')}</label>
              <input 
                className="mdui-textfield-input" 
                style={{ textAlign: 'center', fontSize: 18, letterSpacing: 1 }}
                value={importCode}
                onChange={e => setImportCode(e.target.value)}
              />
            </div>
            <button className="mdui-btn mdui-btn-raised mdui-ripple mdui-color-theme" onClick={handleQuery} disabled={!importCode || loadingQuery}>
              {loadingQuery ? (i18n.get('queryingTransferCode') || '查询中...') : i18n.get('fetchCloudDataTip')}
            </button>
          </div>
        )}

        {activeTab === 'import' && cloudPayload && (
          <div style={{ textAlign: 'center' }}>
            <div style={{ display: 'flex', gap: '20px', marginBottom: '20px', textAlign: 'left' }}>
               {renderDataPreview(i18n.get('currentLocalData') || '当前数据', localRecordData)}
               {renderDataPreview(i18n.get('cloudBackupData') || '云端数据', cloudPayload.recordData)}
            </div>
            <button className="mdui-btn mdui-btn-raised mdui-ripple mdui-color-red" onClick={handleOverwrite}>
              {i18n.get('confirmOverwrite') || '确认覆盖'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DataTransferModal;
