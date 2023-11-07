import fs from 'fs';
import { randomUUID } from 'crypto';
import { Logger } from '@nestjs/common';

const DEFAULT_SETTINGS_STR = `import defineSetting from 'types/settings';

export default defineSetting({
  crypto: {
    active: true,
    key: '${randomUUID()}',
  },
  auth: {
    active: true,
    header_key: 'auth_key',
    header_value: '114514',
  },
  server: {
    port: 55033,
  },
});
`;

try {
  fs.statSync('./settings.custom.ts');
} catch (e) {
  fs.writeFileSync('./settings.custom.ts', DEFAULT_SETTINGS_STR);
  Logger.log('Write default settings to /settings.custom.ts', 'Running Script');
}
