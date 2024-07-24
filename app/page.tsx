'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Home() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    axios.get('/api/users').then(response => setUsers(response.data));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await axios.post('/api/users', { name, email });
    setUsers([...users, response.data]);
    setName('');
    setEmail('');
  };

  const handleDelete = async (id: number) => {
    await axios.delete(`/api/users/${id}`);
    setUsers(users.filter((user: any) => user.id !== id));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">用户列表</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 mr-2"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 mr-2"
        />
        <button type="submit" className="bg-blue-500 text-white p-2">添加用户</button>
      </form>
      <ul>
        {users.map((user: any) => (
          <li key={user.id} className="border p-2 mb-2 flex justify-between">
            <div>
              {user.name} ({user.email})
            </div>
            <button onClick={() => handleDelete(user.id)} className="bg-red-500 text-white p-2">删除</button>
          </li>
        ))}
      </ul>
    </div>
  );
}