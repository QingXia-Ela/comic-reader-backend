import { Logger } from '@nestjs/common';
import { randomInt } from 'crypto';
import * as fs from 'fs-extra';
import { CreateBasicComicDto } from 'src/list/dto/create-basic-comic.dto';
import sleep from 'src/utils/sleep';

const dbPath = 'book';
// import {} from '@nestjs/common'

// import sqlite3 from 'sqlite3';
// export const sql = new (sqlite3.verbose().Database)('db/book.db');

// sql.serialize(() => { });

// process.on('exit', () => {
//   sql.close();
// });
export const dbMap = new Map<number, CreateBasicComicDto>();

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

async function handleNewData(p: string) {
  const dirName = p.split('/')[1];
  const id = await getUniqueId();
  const obj = new CreateBasicComicDto(id, dirName);
  await fs.writeJson(p, obj, { spaces: 2 });
  dbMap.set(id, obj);
}

async function initMetaData(pathList: string[]) {
  const newData = [];
  // first insert exist json
  for (let path of pathList) {
    path += '/metadata.json';
    try {
      await fs.stat(path);
      const finalData = await fs.readJson(path);
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
}

async function updateMetaData(pathList: string[]) {
  const cloneMap = new Map(Array.from(dbMap));

  let delay = 100;
  for (const path of pathList) {
    const jsonPath = path + '/metadata.json';
    try {
      await fs.stat(jsonPath);
      const finalData = await fs.readJson(jsonPath);
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
  Logger.log(`Database Init! Now has ${dbMap.size} comic.`);
  const timer = setInterval(
    async () => {
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
