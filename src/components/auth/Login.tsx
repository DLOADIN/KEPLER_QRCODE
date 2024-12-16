import React, { useState } from 'react';
import { Mail, Lock } from 'lucide-react';
import { validateCredentials } from '../../utils/auth';
import Logo from '../ui/Logo';
import Button from '../ui/Button';

interface LoginProps {
  onLogin: (email: string, password: string) => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateCredentials(email, password)) {
      onLogin(email, password);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-96">
        <div className="flex justify-center mb-8">
          <Logo />
        </div>
        <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">Admin Login</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="email"
              placeholder="Email"
              className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-green-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="password"
              placeholder="Password"
              className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-green-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" fullWidth>
            Login
          </Button>
        </form>
      </div>
    </div>
  );
}