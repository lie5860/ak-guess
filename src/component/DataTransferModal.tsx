import React, { useState, useContext } from 'react';
import { AppCtx } from '../locales/AppCtx';
import { generateTransferCode, queryTransferCode, applyTransferPayload, TransferPayload } from '../utils/TransferService';
import { loadRecordData } from './History';
import { RANDOM_MODE, DAILY_MODE, PARADOX_MODE } from '../const';

const showSnackbar = (message: string) => {
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
  const [isConfirming, setIsConfirming] = useState(false);
  
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
      showSnackbar(i18n.get('transferCodeError') || '引继码无效或已过期！');
    } finally {
      setLoadingQuery(false);
    }
  };

  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(generatedCode).then(() => {
        showSnackbar(i18n.get('copySuccess'));
      });
    }
  };



  /** 从 recordData 里按实际 key 取出三种模式的统计数字 */
  const getModeStats = (data: any) => {
    if (!data) return { play: [0, 0, 0], win: [0, 0, 0], ops: [0, 0, 0] };
    const modes = [RANDOM_MODE, DAILY_MODE, PARADOX_MODE];
    const play = modes.map(m => data[m]?.playTimes ?? 0);
    const win  = modes.map(m => data[m]?.winTimes ?? 0);
    const ops  = modes.map(m => Object.keys(data[m]?.roles ?? {}).length);
    return { play, win, ops };
  };

  const fmt = (arr: number[]) => arr.join(' / ');

  const renderCompareTable = () => {
    const local = getModeStats(localRecordData);
    const cloud = getModeStats(cloudPayload?.recordData);

    const rows = [
      { label: i18n.get('playTimes'), l: fmt(local.play), r: fmt(cloud.play) },
      { label: i18n.get('winTimes'), l: fmt(local.win), r: fmt(cloud.win) },
      { label: i18n.get('operatorWinCount'), l: fmt(local.ops), r: fmt(cloud.ops) },
    ];

    const cellStyle: React.CSSProperties = {
      fontFamily: 'monospace', fontWeight: 'bold', textAlign: 'center',
    };

    return (
      <div style={{ marginBottom: 8 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
          <thead>
            <tr style={{ opacity: 0.6, fontSize: 12 }}>
              <th style={{ textAlign: 'left', padding: '4px 0', fontWeight: 'normal' }}></th>
              <th style={{ padding: '4px 0', fontWeight: 'normal' }}>📱 {i18n.get('currentLocalData') || '本地'}</th>
              <th style={{ padding: '4px 0', fontWeight: 'normal' }}>☁️ {i18n.get('cloudBackupData') || '云端'}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} style={{ borderTop: '1px solid rgba(127,127,127,0.15)' }}>
                <td style={{ padding: '5px 0', opacity: 0.8 }}>{r.label}</td>
                <td style={{ ...cellStyle, padding: '5px 0' }}>{r.l}</td>
                <td style={{ ...cellStyle, padding: '5px 0' }}>{r.r}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p style={{ opacity: 0.5, fontSize: 11, textAlign: 'center', margin: '4px 0 0 0' }}>
          {i18n.get('modeOrder') || '数据顺序：随机 / 每日 / 悖论'}
        </p>
      </div>
    );
  };

  return (
    <div style={{ padding: '0 4px 8px 4px' }}>
      {/* Tabs */}
      <div style={{ display: 'flex', borderBottom: '1px solid rgba(127,127,127,0.3)', marginBottom: 16 }}>
        <button
          className={`mdui-btn mdui-ripple`}
          style={{
            flex: 1,
            borderBottom: activeTab === 'generate' ? '2px solid currentColor' : '2px solid transparent',
            borderRadius: 0,
            fontWeight: activeTab === 'generate' ? 'bold' : 'normal',
          }}
          onClick={() => { setActiveTab('generate'); setCloudPayload(null); setImportCode(''); setIsConfirming(false); }}
        >
          {i18n.get('tabBackup') || '备份进度'}
        </button>
        <button
          className={`mdui-btn mdui-ripple`}
          style={{
            flex: 1,
            borderBottom: activeTab === 'import' ? '2px solid currentColor' : '2px solid transparent',
            borderRadius: 0,
            fontWeight: activeTab === 'import' ? 'bold' : 'normal',
          }}
          onClick={() => { setActiveTab('import'); setGeneratedCode(''); setIsConfirming(false); }}
        >
          {i18n.get('tabRestore') || '还原进度'}
        </button>
      </div>

      {/* Tab Content */}
      <div style={{ minHeight: 180 }}>

        {/* === 备份 Tab === */}
        {activeTab === 'generate' && (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            {!generatedCode ? (
              <>
                <p style={{ opacity: 0.7, margin: '0 0 24px 0' }}>
                  {i18n.get('transferCodeValidWarning')}
                </p>
                <button
                  className="mdui-btn mdui-btn-raised mdui-ripple mdui-color-theme"
                  onClick={handleGenerate}
                  disabled={loadingCode}
                >
                  {loadingCode
                    ? (i18n.get('transferCodeGenerated') || '生成中...')
                    : (i18n.get('generateCode'))
                  }
                </button>
              </>
            ) : (
              <>
                <p style={{ opacity: 0.7, margin: '0 0 12px 0' }}>
                  {i18n.get('transferCodeValidWarning')}
                </p>
                <div style={{
                  fontSize: 20, fontFamily: 'monospace', fontWeight: 'bold',
                  letterSpacing: 2, padding: '12px 16px',
                  background: 'rgba(127,127,127,0.15)', borderRadius: 4,
                  display: 'inline-block', margin: '0 0 16px 0',
                  wordBreak: 'break-all'
                }}>
                  {generatedCode}
                </div>
                <br />
                <button
                  className="mdui-btn mdui-btn-raised mdui-ripple mdui-color-theme-accent"
                  onClick={handleCopy}
                >
                  {i18n.get('copyTransferCode') || '一键复制'}
                </button>
              </>
            )}
          </div>
        )}

        {/* === 还原 Tab — 输入码 === */}
        {activeTab === 'import' && !cloudPayload && (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div className="mdui-textfield mdui-textfield-floating-label"
                 style={{ maxWidth: 300, margin: '0 auto 20px auto' }}>
              <label className="mdui-textfield-label">{i18n.get('transferCodePlaceholder')}</label>
              <input
                className="mdui-textfield-input"
                style={{ textAlign: 'center', fontSize: 16, letterSpacing: 1 }}
                value={importCode}
                onChange={e => setImportCode(e.target.value)}
              />
            </div>
            <button
              className="mdui-btn mdui-btn-raised mdui-ripple mdui-color-theme"
              onClick={handleQuery}
              disabled={!importCode || loadingQuery}
            >
              {loadingQuery
                ? (i18n.get('queryingTransferCode') || '查询中...')
                : (i18n.get('fetchCloudDataTip'))
              }
            </button>
          </div>
        )}

        {/* === 还原 Tab — 数据对比 === */}
        {activeTab === 'import' && cloudPayload && !isConfirming && (
          <div style={{ textAlign: 'center' }}>
            {renderCompareTable()}
            <button
              className="mdui-btn mdui-btn-raised mdui-ripple mdui-color-red"
              onClick={() => setIsConfirming(true)}
            >
              {i18n.get('confirmOverwrite') || '确认覆盖本地数据'}
            </button>
          </div>
        )}

        {/* === 还原 Tab — 二次确认 === */}
        {activeTab === 'import' && cloudPayload && isConfirming && (
           <div style={{ textAlign: 'center', padding: '10px 0' }}>
             <p style={{ color: '#f44336', fontWeight: 'bold', marginBottom: 20 }}>
               {i18n.get('overwriteWarning') || '注意：本地数据将被彻底覆盖，确实要恢复吗？此操作不可撤销！'}
             </p>
             <div style={{ display: 'flex', justifyContent: 'center', gap: 16 }}>
               <button
                 className="mdui-btn mdui-ripple"
                 onClick={() => setIsConfirming(false)}
                 style={{ minWidth: 80 }}
               >
                 {i18n.get('no') || '取消'}
               </button>
               <button
                 className="mdui-btn mdui-btn-raised mdui-ripple mdui-color-red"
                 onClick={() => {
                   applyTransferPayload(cloudPayload);
                   showSnackbar(i18n.get('overwriteSuccess'));
                   setTimeout(() => { window.location.reload(); }, 800);
                 }}
                 style={{ minWidth: 80 }}
               >
                 {i18n.get('yes') || '确定恢复'}
               </button>
             </div>
           </div>
        )}
      </div>
    </div>
  );
};

export default DataTransferModal;
