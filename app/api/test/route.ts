// app/api/test/route.ts
// app/api/test/route.ts
import { NextResponse } from 'next/server';
import connection from '../../../utils/db'; // 确保路径正确

export async function GET() {
  try {
    const [rows] = await connection.query('SELECT * FROM users');
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}