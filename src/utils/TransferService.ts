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

const axios = (window as unknown as { axios: any }).axios;
const TRANSFER_API_HOST = 'https://akapi.saki.cc/api/transfer';

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
