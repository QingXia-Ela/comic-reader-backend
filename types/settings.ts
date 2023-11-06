interface CryptoSetting {
  /**
   * 图片加密密钥，默认为 `114514`，可以是字符串
   */
  key?: number | string;
  /**
   * 是否启用图片加密
   */
  active?: boolean;
}

interface Setting {
  crypto?: CryptoSetting;
}

const DEFAULT_SETTING: Setting = {
  crypto: {
    active: true,
    key: 114514,
  },
};

export default function defineSetting(options?: Partial<Setting>) {
  return { ...DEFAULT_SETTING, ...options };
}
