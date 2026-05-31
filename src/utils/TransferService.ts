import { loadRecordData, RecordData, saveRecordData } from '../component/History';

export interface TransferPayload {
  lang: string;
  timestamp: number;
  recordData: RecordData;
}

export interface TransferResponse<T> {
  code: number;
  data: T;
  message?: string;
}

const axios = window.axios;
const TRANSFER_API_HOST = 'https://akapi.saki.cc/api/transfer';
const PENDING_TRANSFER_PAYLOAD_KEY = '__pendingTransferPayload';

const buildPayload = (lang: string): TransferPayload => ({
  lang,
  timestamp: Date.now(),
  recordData: loadRecordData(lang),
});

export const generateTransferCode = async (
  lang: string,
): Promise<TransferResponse<{ transferCode: string }>> => {
  const payload = buildPayload(lang);
  const response = await axios.post(`${TRANSFER_API_HOST}/generate.php`, payload, {
    responseType: 'json',
  });

  if (!response?.data || response.data.code !== 0) {
    throw new Error(response?.data?.message || 'Failed to generate transfer code');
  }

  return response.data as TransferResponse<{ transferCode: string }>;
};

export const queryTransferCode = async (
  code: string,
): Promise<TransferResponse<{ payload: TransferPayload }>> => {
  const response = await axios.get(`${TRANSFER_API_HOST}/query.php`, {
    params: { code },
    responseType: 'json',
  });

  if (!response?.data || response.data.code !== 0) {
    throw new Error(response?.data?.message || 'Transfer code invalid or expired');
  }

  return response.data as TransferResponse<{ payload: TransferPayload }>;
};

export const applyTransferPayload = (payload: TransferPayload) => {
  if (payload.recordData) {
    saveRecordData(payload.lang, payload.recordData);
  }
};

export const isTransferPayloadLanguageMismatch = (payload: TransferPayload, lang: string) => {
  return Boolean(payload.lang && payload.lang !== lang);
};

export const storePendingTransferPayload = (payload: TransferPayload) => {
  sessionStorage.setItem(PENDING_TRANSFER_PAYLOAD_KEY, JSON.stringify(payload));
};

export const consumePendingTransferPayload = (lang: string): TransferPayload | null => {
  const rawPayload = sessionStorage.getItem(PENDING_TRANSFER_PAYLOAD_KEY);
  if (!rawPayload) return null;

  try {
    const payload = JSON.parse(rawPayload) as TransferPayload;
    if (payload.lang !== lang) return null;

    sessionStorage.removeItem(PENDING_TRANSFER_PAYLOAD_KEY);
    return payload;
  } catch (e) {
    sessionStorage.removeItem(PENDING_TRANSFER_PAYLOAD_KEY);
    return null;
  }
};
