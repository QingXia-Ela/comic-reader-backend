import { Logger } from '@nestjs/common';
import { randomInt } from 'crypto';
import * as fs from 'fs-extra';
import settingsCustom from 'settings.custom';
import { CryptoService } from 'src/crypto/crypto.service';
import { CreateComicDto } from 'src/list/dto/create-comic.dto';
import sleep from 'src/utils/sleep';

const dbPath = 'book';

const CryptoServiceObj = new CryptoService();

export const dbMap = new Map<number, CreateComicDto>();
export const suffix = [
  '.jpg',
  '.png',
  '.jpeg',
  '.gif',
  '.webp',
  '.avif',
  '.bmp',
];

async function getComicList() {
  return (await fs.readdir(dbPath)).map((p) => `${dbPath}/${p}`);
}

function getUniqueId(): Promise<number> {
  return new Promise((res) => {
    let id = randomInt(1, 999999);
    while (dbMap.has(id)) {
      id = randomInt(1, 999999);
    }
    res(id);
  });
}

async function encryptImg(pathList: string[]) {
  if (!settingsCustom.crypto.active) return;

  await Promise.all(
    pathList.map(async (p) => {
      await CryptoServiceObj.encryptoList(p, `${p}/encrypted`);
    }),
  );
}

async function handleNewData(p: string) {
  let path: string | string[] = p.split('/');
  path.pop();
  path = path.join('/');
  const imgList = await getImgList(path);
  const dirName = p.split('/')[1];
  const id = await getUniqueId();
  const obj = new CreateComicDto({ id, title: dirName, imgList });
  await fs.writeJson(p, obj, { spaces: 2 });
  dbMap.set(id, obj);
}

async function updateMetaDataJson(
  p: string,
  source: CreateComicDto,
  obj: Partial<CreateComicDto>,
) {
  await fs.writeJson(p, { ...source, ...obj }, { spaces: 2 });
}

async function getImgList(path: string) {
  return (await fs.readdir(path)).filter((p) =>
    suffix.some((s) => p.endsWith(s)),
  );
}

async function initMetaData(pathList: string[]) {
  const newData = [];
  // first insert exist json
  for (let path of pathList) {
    const imgList = await getImgList(path);
    path += '/metadata.json';
    try {
      await fs.stat(path);
      const finalData = (await fs.readJson(path)) as CreateComicDto;
      if (finalData.imgList.length !== imgList.length) {
        finalData.imgList = imgList;
        await updateMetaDataJson(path, finalData, { imgList });
      }
      dbMap.set(finalData.id, finalData);
    } catch (e) {
      newData.push(path);
    }
  }

  let delay = 100;
  // insert new
  for (const path of newData) {
    await sleep(delay);
    delay += 100;
    await handleNewData(path);
  }

  await encryptImg(pathList);
}

async function updateMetaData(pathList: string[]) {
  const cloneMap = new Map(Array.from(dbMap));

  let delay = 100;
  for (const path of pathList) {
    const jsonPath = path + '/metadata.json';
    try {
      await fs.stat(jsonPath);
      const finalData = (await fs.readJson(jsonPath)) as CreateComicDto;

      const dirName = jsonPath.split('/')[1];
      await updateMetaDataJson(jsonPath, finalData, {
        title: dirName,
        imgList: await getImgList(path),
      });

      dbMap.set(finalData.id, finalData);
      // delete exist data
      cloneMap.delete(finalData.id);
    } catch (e) {
      // is new comic
      if (fs.existsSync(path)) {
        await sleep(delay);
        delay += 100;
        await handleNewData(jsonPath);
      }
    }
  }

  // check cloneMap data, if something exist means actual comic removed
  cloneMap.forEach((value) => {
    dbMap.delete(value.id);
  });

  await encryptImg(pathList);
}

export function getList() {
  return Array.from(dbMap.values()).sort((a, b) => {
    return +new Date(b.date) - +new Date(a.date);
  });
}

/**
 * init database
 * @param refreshTime refresh database time (default 5 minutes)
 * @returns return a function to clean and stop
 */
export default async function init(refreshTime = 5) {
  await initMetaData(await getComicList());
  let dbLen = dbMap.size;
  Logger.log(`Database Init! Now has ${dbMap.size} comic.`, 'DB Service');
  const timer = setInterval(
    async () => {
      Logger.log('Database Refreshing...', 'DB Service');
      updateMetaData(await getComicList()).then(() => {
        if (dbMap.size !== dbLen) {
          dbLen = dbMap.size;
          Logger.log(`Database Update! Now has ${dbMap.size} comic.`);
        }
      });
    },
    refreshTime * 60 * 1000,
  );

  return () => {
    clearInterval(timer);
  };
}
