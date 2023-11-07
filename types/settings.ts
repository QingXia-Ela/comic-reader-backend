export interface CryptoSetting {
  /**
   * 图片加密密钥，默认为 `114514`
   *
   * 建议更改为较长的值以保证安全性
   */
  key?: number | string;
  /**
   * 是否启用图片加密
   */
  active?: boolean;
}

export interface AuthSettings {
  /**
   * 是否启用鉴权
   */
  active?: boolean;
  /**
   * 鉴权请求头名
   */
  header_key?: string;
  /**
   * 鉴权请求头值
   */
  header_value?: string;
}

interface Setting {
  crypto?: CryptoSetting;
  auth?: AuthSettings;
}

const DEFAULT_SETTING: Setting = {
  crypto: {
    active: true,
    key: 114514,
  },
  auth: {
    active: true,
    header_key: 'auth_key',
    header_value: '114514',
  },
};

export default function defineSetting(options: Partial<Setting> = {}) {
  return { ...DEFAULT_SETTING, ...options };
}
