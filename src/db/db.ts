import sqlite3 from 'sqlite3';
export const sql = new (sqlite3.verbose().Database)('db/book.db');

process.on('exit', () => {
  sql.close();
});
