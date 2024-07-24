import { NextResponse } from 'next/server';
import connection from '@/utils/db';



// 更新用户
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const { name, email } = await request.json();
  await connection.query('UPDATE users SET name = ?, email = ? WHERE id = ?', [name, email, id]);
  return NextResponse.json({ id, name, email });
}

// 删除用户
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  await connection.query('DELETE FROM users WHERE id = ?', [id]);
  return NextResponse.json({ message: 'User deleted' });
}
