import { NextResponse } from 'next/server';
import connection from '../../utils/db';
import { ResultSetHeader } from 'mysql2';


// export async function GET() {
//   return NextResponse.json({ message: 'API is working' });
// }

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
