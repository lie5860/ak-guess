import { loadRecordData, saveRecordData } from "../component/History";

export interface TransferPayload {
  lang: string;
  timestamp: number;
  recordData: any;
}

export interface TransferResponse<T> {
  code: number;
  data: T;
  message?: string;
}

// 模拟的云端存储库
const mockCloudStorage = new Map<string, string>(); // code -> stringified payload

const generateRandomCode = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  for (let i = 0; i < 16; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `${code.slice(0, 4)}-${code.slice(4, 8)}-${code.slice(8, 12)}-${code.slice(12, 16)}`;
};

/**
 * 组装并生成引继码 (Mock API)
 * 
 * TODO [Backend]:
 * 1. 需要实现真实接口 POST /api/transfer/generate，请求体带上 payload 数据
 * 2. 服务端接收 payload 后，生成一条唯一 code (如 16 位字符)，存入数据库 (可用 Redis 并设置 24~48 小时过期时间)
 * 3. 返回给前端该 code，后续用户在其他设备输入该 code 获取数据
 */
export const generateTransferCode = async (lang: string): Promise<TransferResponse<{ transferCode: string }>> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const recordData = loadRecordData(lang);
      const payload: TransferPayload = {
        lang,
        timestamp: Date.now(),
        recordData,
      };
      
      const code = generateRandomCode();
      mockCloudStorage.set(code, JSON.stringify(payload));
      
      resolve({
        code: 0,
        data: { transferCode: code },
      });
    }, 800); // 模拟网络延迟
  });
};

/**
 * 查询引继码引用的远端备份数据 (Mock API)
 * 
 * TODO [Backend]:
 * 1. 需要实现真实接口 GET /api/transfer/query?code=xxxx
 * 2. 服务端根据 code 查找数据库中存续的 payload 存档记录
 * 3. 如查到数据，返回 payload 让前端覆盖本地存储
 * 4. 可根据安全策略选择要不要销毁该 code 或是保证有效时间
 */
export const queryTransferCode = async (code: string): Promise<TransferResponse<{ payload: TransferPayload }>> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const dataStr = mockCloudStorage.get(code);
      if (dataStr) {
        resolve({
          code: 0,
          data: { payload: JSON.parse(dataStr) },
        });
      } else {
        reject(new Error("Transfer code invalid or expired"));
      }
    }, 800);
  });
};

/**
 * 将远端数据覆盖到本地
 */
export const applyTransferPayload = (payload: TransferPayload) => {
  // 只接收同语言的存档数据，或者视情况可以直接覆盖对应语言的记录
  if (payload.recordData) {
    saveRecordData(payload.lang, payload.recordData);
  }
};
