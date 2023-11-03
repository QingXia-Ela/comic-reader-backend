import { randomInt } from 'crypto';
import * as fs from 'fs-extra';
import { CreateBasicComicDto } from 'src/list/dto/create-basic-comic.dto';

const dbPath = 'book';
// import {} from '@nestjs/common'

// import sqlite3 from 'sqlite3';
// export const sql = new (sqlite3.verbose().Database)('db/book.db');

// sql.serialize(() => { });

// process.on('exit', () => {
//   sql.close();
// });
export const dbMap = new Map();

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
  await fs.writeJson(p, obj);
  dbMap.set(id, obj);
}

async function initMetaData(pathList: string[]) {
  const newData = [];
  for (let path of pathList) {
    path += '/metadata.json';
    try {
      await fs.stat(path);
      const finalData = await fs.readJson(path);
      dbMap.set(finalData.id, finalData);
    } catch (e) {
      // await handleNewData(path);
      newData.push(path);
    }
  }

  for (const path of newData) {
    await handleNewData(path);
  }
}

async function updateMetaData(pathList: string) {
  const cloneMap = new Map(Array.from(dbMap));
  for (const path of pathList) {
    // const finalData = await fs.readJson(path);
    // dbMap.set(finalData.id, finalData);
  }
}

export default async function init() {
  const comicList = fs.readdirSync(dbPath);
  await initMetaData(comicList);
  // console.log(comicList);
  // await Promise.all(comicList.map((p) => initMetaData(`${dbPath}/${p}`)));
}
