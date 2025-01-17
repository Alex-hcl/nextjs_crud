import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';
import { ResultSetHeader } from 'mysql2';

// CA 证书内容
const ca = `
-----BEGIN CERTIFICATE-----
MIIEQTCCAqmgAwIBAgIUEwCb35pmhpBRTKDHW7tUm2muUXEwDQYJKoZIhvcNAQEM
BQAwOjE4MDYGA1UEAwwvYjMxZTgzODQtY2E1My00MjZjLWIwOTctMjkxYTQ0Yzk5
N2RhIFByb2plY3QgQ0EwHhcNMjQwNzAxMDIzMzM2WhcNMzQwNjI5MDIzMzM2WjA6
MTgwNgYDVQQDDC9iMzFlODM4NC1jYTUzLTQyNmMtYjA5Ny0yOTFhNDRjOTk3ZGEg
UHJvamVjdCBDQTCCAaIwDQYJKoZIhvcNAQEBBQADggGPADCCAYoCggGBAKXt68gk
T9WE/VvRkzM2m+7Lcz2IpKhMujRR+R85wkkm+ROrYVrakHEzF1jk/MjchLe074a7
trjA4e0NlWO574TFgxWF0Jk2FxAK9Ji2oUjcrv4N6+CxA6sPmCYi+J8rDEy3WlWe
8Ih9RJ34xc6L4x8fkEP53bFczAo6UVI20ymduN31BAdfuFBdhrLsqtRc0cWber8C
BVw43hdZREwGtk5EbbCSWMTrASmU3Vjpo6TDTZ/QVejzYaPpNzFxX8Hr+Uug2anN
05aD02MhZJfZBUI7GvQDszsdC0VqkMtWESyuc7Raak8SLOn5jrVznUe+VvOmwads
qzk4WzU0ktPR4UA3xaFrRV4b3bYc7j+iCp0B3dyXsejgjEWkdrBX/SlDIoXN9dff
5SuljOHbaOGUmX4I2fOl/0MW4K7mKbOwubWxelGdzvintpRxl0cNQFRb2O+Lvmrx
MjnKMzyq4W8ONVUXxTjIA7ABcc+Rvv5mgoX4FQB9J3qsX4Jgz3aJE/x0LwIDAQAB
oz8wPTAdBgNVHQ4EFgQUZ+7Zew06nhiUJQa4F2LqdAfMNoswDwYDVR0TBAgwBgEB
/wIBADALBgNVHQ8EBAMCAQYwDQYJKoZIhvcNAQEMBQADggGBAH3uwvxmvwjaAo6Z
gbww6eERIVGxV+u9oiVTTrc7SCFahlfjSL/rr0s58dilS1cty3LduwShdnLHb8dK
6EHnLodSzgWGYYzb+Ofh+RC09/UFHzZQBf2vENKOtQGh0se/S8+qg+n04psbFMTv
9CFU3yfkXF2BJ+7Iy2WsOefUE7c0ySZ0te2eehJCW4p8lfAaJT1mb1TeFKAsKZpL
a8m7g2CQ34+nDPDLUcMIhrUbjdDFDeE+KJWTxJ3NISd+kBOxuca7YSvbcm1sTdeZ
FPawDuonE+2O2HZ/Wg9chDdxH5vSDBdF7/K6hsLR6/a4NRI1R0xe1yuprIxc9XYO
ZW9DiN65ow6fQyF11mhOc2194E5uFEa04nIlwY1JXqJYN98hAzIraACtbW/wV70z
MuQ1l3V6/ll5J3O5+jMyr7wDdd6X6VkFmfkyc9dm3Q9DsO/TccSWYwQi4kziKEfh
wBladkKOAMByLTo95PPggO6wyeDAgDt0A4AqJ137tUsEwxNgeQ==
-----END CERTIFICATE-----
`;

// 配置数据库连接
const connection = mysql.createPool({
  host: 'mysql-23dbe190-project-d0c2.g.aivencloud.com',
  port: 11697,
  user: 'avnadmin',
  password: 'AVNS_LMvj0ydSz80eSpQLAZo',
  database: 'mydatabase',
  ssl: {
    ca: ca,
    rejectUnauthorized: true,
  },
});

// 获取所有用户
export async function GET() {
  try {
    const [rows] = await connection.query('SELECT * FROM users');
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ error: 'Error fetching users' }, { status: 500 });
  }
}

// 添加用户
export async function POST(request: Request) {
  try {
    const { name, email } = await request.json();
    const [result] = await connection.query<ResultSetHeader>('INSERT INTO users (name, email) VALUES (?, ?)', [name, email]);
    return NextResponse.json({ id: result.insertId, name, email });
  } catch (error) {
    console.error('Error adding user:', error);
    return NextResponse.json({ error: 'Error adding user' }, { status: 500 });
  }
}
