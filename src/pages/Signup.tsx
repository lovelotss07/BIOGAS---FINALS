

import React, { useState } from 'react';
import { useAuth } from '../auth/useAuth';
import { useNavigate } from 'react-router-dom';
import { Fuel, User, Lock, Mail, Calendar } from 'lucide-react';

const Signup: React.FC = () => {
  const [name, setName] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [gender, setGender] = useState('');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [profilePic, setProfilePic] = useState('');
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setProfilePic(ev.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !birthdate || !gender || !contact || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    // Save all info in localStorage, including profilePic
    const success = await signup(email, password, { name, birthdate, gender, phone: contact, profilePic });
    if (success) {
      navigate('/login');
    } else {
      setError('User already exists');
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
      {/* Reminder to use true personal info */}
      <div className="w-full max-w-md mb-4 bg-yellow-100 border border-yellow-300 text-yellow-800 rounded-lg px-4 py-3 text-sm">
        Please use your true personal information. Once you confirm your signup, your details will be automatically saved to your account and cannot be edited later.
      </div>
      <form onSubmit={handleSubmit} className="bg-white/90 p-8 rounded-2xl shadow-xl w-full max-w-md flex flex-col gap-4">
        <h2 className="text-2xl font-bold mb-2 text-center text-green-700">Sign Up</h2>
        {error && <div className="text-red-500 mb-2 text-center">{error}</div>}

        {/* Profile Photo Upload */}
        <div className="flex flex-col items-center mb-2">
          <div className="relative flex items-center justify-center w-24 h-24 rounded-full bg-gray-200 border-4 border-white shadow-lg overflow-hidden mb-2">
            {profilePic ? (
              <img src={profilePic} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <User className="w-12 h-12 text-gray-400" />
            )}
          </div>
          <label className="text-xs text-gray-600 mb-1">Upload Profile Photo</label>
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            className="block text-xs"
          />
        </div>
        {/* Name Field */}
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 text-green-400" size={20} />
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full pl-10 p-2 mb-2 border rounded focus:ring-2 focus:ring-green-300"
            required
          />
        </div>
        {/* Birthdate Field (single) */}
        <div className="relative flex flex-col mb-2">
          <label className="text-sm font-medium text-gray-700 mb-1 pl-2">Birthdate <span className="text-xs text-gray-500">(MM/DD/YYYY)</span></label>
          <div>
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-green-400" size={20} />
            <input
              type="date"
              placeholder="MM/DD/YYYY"
              value={birthdate}
              onChange={e => setBirthdate(e.target.value)}
              className="w-full pl-10 p-2 border rounded focus:ring-2 focus:ring-green-300"
              required
            />
          </div>
        </div>
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 text-green-400" size={20} />
          <select
            value={gender}
            onChange={e => setGender(e.target.value)}
            className="w-full pl-10 p-2 mb-2 border rounded focus:ring-2 focus:ring-green-300"
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 text-green-400" size={20} />
          <input
            type="text"
            placeholder="Contact Number"
            value={contact}
            onChange={e => setContact(e.target.value)}
            className="w-full pl-10 p-2 mb-2 border rounded focus:ring-2 focus:ring-green-300"
            required
          />
        </div>
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
        <div className="relative mb-2">
          <Lock className="absolute left-3 top-3 text-green-400" size={20} />
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full pl-10 p-2 mb-2 border rounded focus:ring-2 focus:ring-green-300"
            required
          />
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            className="w-full pl-10 p-2 border rounded focus:ring-2 focus:ring-green-300"
            required
          />
          <button
            type="button"
            className="absolute right-2 top-3 text-xs text-green-600 font-bold"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>
        <button type="submit" className="w-full bg-green-500 text-white py-2 rounded-lg font-semibold hover:bg-green-600 transition">Sign Up</button>
        <div className="mt-2 text-center">
          <span>Already have an account? </span>
          <a href="/login" className="text-green-600 hover:underline font-bold">Login</a>
        </div>
      </form>
    </div>
  );
};

export default Signup;
