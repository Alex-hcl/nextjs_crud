// import mysql from 'mysql2/promise';
// import fs from 'fs';
// import path from 'path';

// // 获取 CA 证书
// const caPath = path.resolve(__dirname, './ca.pem');
// const ca = fs.readFileSync(caPath);

// // 配置数据库连接池
// const connection = mysql.createPool({
//   host: 'mysql-23dbe190-project-d0c2.g.aivencloud.com',
//   port: 11697,
//   user: 'avnadmin',
//   password: 'AVNS_LMvj0ydSz80eSpQLAZo',
//   database: 'mydatabase',
//   ssl: {
//     ca: ca,
//     rejectUnauthorized: true,
//   },
// });

// export default connection;

import fs from 'fs';
import path from 'path';
import mysql from 'mysql2/promise';
import { fileURLToPath } from 'url';

// 获取当前模块的目录
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const caPath = path.resolve(__dirname, './ca.pem');

// 配置数据库连接
const connection = mysql.createPool({
  host: 'mysql-23dbe190-project-d0c2.g.aivencloud.com',
  port: 11697,
  user: 'avnadmin',
  password: 'AVNS_LMvj0ydSz80eSpQLAZo',
  database: 'mydatabase',
  ssl: {
    ca: fs.readFileSync(caPath),
    rejectUnauthorized: true,
  },
});

export default connection;