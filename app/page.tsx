"use client"; // 在文件的开头添加这行代码

import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface User {
  id: number;
  name: string;
  email: string;
}

export default function Page() {
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get('/api/users');
      setUsers(response.data);
    };
    fetchUsers();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await axios.post('/api/users', { name, email });
    setUsers([...users, response.data]);
    setName('');
    setEmail('');
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className="border p-2 mb-2"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="border p-2 mb-2"
        />
        <button type="submit" className="bg-blue-500 text-white p-2">
          Add User
        </button>
      </form>
      <ul>
        {users.map((user) => (
          <li key={user.id} className="border p-2 mb-2">
            {user.name} ({user.email})
          </li>
        ))}
      </ul>
    </div>
  );
}
