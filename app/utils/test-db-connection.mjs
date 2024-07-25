import fs from 'fs';
import path from 'path';
import mysql from 'mysql2/promise';
import { fileURLToPath } from 'url';

// 获取当前模块的目录
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const caPath = path.resolve(__dirname, './ca.pem');

(async () => {
  try {
    // 配置数据库连接
    const connection = await mysql.createPool({
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

    // 执行查询
    const [rows] = await connection.query('SELECT * FROM users');
    console.log('Query results:', rows);

    // 关闭连接
    await connection.end();
  } catch (error) {
    console.error('Error connecting to the database:', error.message);
  }
})();