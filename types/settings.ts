import { defaultsDeep } from 'lodash';

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

export interface ServerSettings {
  /**
   * 端口，建议使用高位端口，我也不知道为什么
   *
   * 默认为 `55033`
   **/
  port?: number;
}

interface Setting {
  crypto?: CryptoSetting;
  auth?: AuthSettings;
  server?: ServerSettings;
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
  server: {
    port: 55033,
  },
};

export default function defineSetting(options: Partial<Setting> = {}) {
  return defaultsDeep(options, DEFAULT_SETTING);
}
