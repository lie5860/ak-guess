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

  const handleOverwrite = () => {
    if (!cloudPayload) return;
    // 先关闭当前 mduiModal，再弹 mdui.confirm 做二次确认
    const mduiModal = (window as any).mduiModal;
    if (mduiModal) mduiModal.close();
    setTimeout(() => {
      const mdui = (window as any).mdui;
      if (mdui && mdui.confirm) {
        mdui.confirm(
          i18n.get('overwriteWarning'),
          () => {
            applyTransferPayload(cloudPayload);
            showSnackbar(i18n.get('overwriteSuccess'));
            setTimeout(() => { window.location.reload(); }, 800);
          },
          () => {},
          {
            confirmText: i18n.get('yes'),
            cancelText: i18n.get('no')
          }
        );
      } else {
        if (window.confirm(i18n.get('overwriteWarning'))) {
          applyTransferPayload(cloudPayload);
          showSnackbar(i18n.get('overwriteSuccess'));
          setTimeout(() => { window.location.reload(); }, 800);
        }
      }
    }, 150);
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

    return (
      <div style={{ overflowX: 'auto', marginBottom: 16 }}>
        <table className="mdui-table" style={{ width: '100%', minWidth: 320 }}>
          <thead>
            <tr>
              <th></th>
              <th style={{ textAlign: 'center' }}>{i18n.get('currentLocalData') || '当前数据'}</th>
              <th style={{ textAlign: 'center' }}>{i18n.get('cloudBackupData') || '引继码数据'}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ opacity: 0.8 }}>{i18n.get('playTimes')}</td>
              <td style={{ textAlign: 'center', fontFamily: 'monospace' }}>{fmt(local.play)}</td>
              <td style={{ textAlign: 'center', fontFamily: 'monospace' }}>{fmt(cloud.play)}</td>
            </tr>
            <tr>
              <td style={{ opacity: 0.8 }}>{i18n.get('winTimes')}</td>
              <td style={{ textAlign: 'center', fontFamily: 'monospace' }}>{fmt(local.win)}</td>
              <td style={{ textAlign: 'center', fontFamily: 'monospace' }}>{fmt(cloud.win)}</td>
            </tr>
            <tr>
              <td style={{ opacity: 0.8 }}>{i18n.get('operatorWinCount')}</td>
              <td style={{ textAlign: 'center', fontFamily: 'monospace' }}>{fmt(local.ops)}</td>
              <td style={{ textAlign: 'center', fontFamily: 'monospace' }}>{fmt(cloud.ops)}</td>
            </tr>
          </tbody>
        </table>
        <p style={{ opacity: 0.5, fontSize: 12, textAlign: 'center', margin: '8px 0 0 0' }}>
          {i18n.get('modeOrder') || '顺序：随机 / 每日 / 悖论'}
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
          onClick={() => { setActiveTab('generate'); setCloudPayload(null); setImportCode(''); }}
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
          onClick={() => { setActiveTab('import'); setGeneratedCode(''); }}
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
        {activeTab === 'import' && cloudPayload && (
          <div style={{ textAlign: 'center' }}>
            {renderCompareTable()}
            <button
              className="mdui-btn mdui-btn-raised mdui-ripple mdui-color-red"
              onClick={handleOverwrite}
            >
              {i18n.get('confirmOverwrite') || '确认覆盖本地数据'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DataTransferModal;
