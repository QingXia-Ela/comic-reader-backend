// don't know why default import create error
import md5Func = require('md5');

export function xorCrypto(a: Uint8Array, b: string) {
  const md5 = md5Func(b);
  const result = new Uint8Array(a.length);
  for (let i = 0; i < a.length; i++) {
    result[i] = a[i] ^ b.charCodeAt(i % md5.length);
  }
  return result;
}
