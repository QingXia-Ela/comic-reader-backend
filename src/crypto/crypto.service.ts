import * as fs from 'fs-extra';
import { Injectable, Logger } from '@nestjs/common';
import { xorCrypto } from './core/export';
import settingsCustom from 'settings.custom';
import { suffix } from 'src/db/db';

@Injectable()
export class CryptoService {
  async encrypto(path: string, outputPath: string) {
    const vanillaData = await fs.readFile(path);
    if (settingsCustom.crypto.active) {
      await fs.writeFile(
        outputPath,
        xorCrypto(vanillaData, settingsCustom.crypto.key.toString()),
      );
    }
  }

  async encryptoList(dir: string, outputDir: string) {
    await fs.ensureDir(outputDir);
    if (settingsCustom.crypto.comic_sync_crypto) await fs.emptyDir(outputDir);
    const label = `\t\t${Logger.getTimestamp()}\tEncrypto ${dir}`;
    console.time(label);
    await Promise.all(
      (await fs.readdir(dir))
        .filter((p) => suffix.some((s) => p.endsWith(s)))
        .map(async (v) => {
          await this.encrypto(`${dir}/${v}`, `${outputDir}/${v}.buf`);
        }),
    );
    console.timeEnd(label);
  }
}
