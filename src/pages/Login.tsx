
import React, { useState } from 'react';
import { useAuth } from '../auth/useAuth';
import { useNavigate } from 'react-router-dom';
import { Fuel, Mail, Lock } from 'lucide-react';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) {
      navigate('/');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-100 to-blue-100">
      <div className="flex flex-col items-center mb-6">
        {/* Biogas Logo with Fuel icon */}
        <div className="mb-2">
          <Fuel size={64} className="text-green-600 drop-shadow" />
        </div>
        <span className="text-3xl font-extrabold text-green-700 drop-shadow">BIOGAS</span>
      </div>
  <form onSubmit={handleSubmit} className="bg-white/90 p-8 rounded-2xl shadow-xl w-full max-w-md flex flex-col gap-4">
        <h2 className="text-2xl font-bold mb-2 text-center text-green-700">Login</h2>
        {error && <div className="text-red-500 mb-2 text-center">{error}</div>}
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-green-400" size={20} />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full pl-10 p-2 mb-2 border rounded focus:ring-2 focus:ring-green-300"
            required
          />
        </div>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-green-400" size={20} />
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full pl-10 p-2 mb-4 border rounded focus:ring-2 focus:ring-green-300"
            required
          />
          <button
            type="button"
            className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-green-600 font-bold"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>
        <button type="submit" className="w-full bg-green-500 text-white py-2 rounded-lg font-semibold hover:bg-green-600 transition">Login</button>
        <div className="mt-2 text-center">
          <span>Don't have an account? </span>
          <a href="/signup" className="text-green-600 hover:underline font-bold">Sign Up</a>
        </div>
      </form>
    </div>
  );
};

export default Login;
