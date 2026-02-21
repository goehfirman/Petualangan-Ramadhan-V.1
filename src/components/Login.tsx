import React, { useState } from 'react';
import { students } from '../data/students';

interface LoginProps {
  onLogin: (name: string) => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [selectedName, setSelectedName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [adminUsername, setAdminUsername] = useState('');

  const handleLogin = () => {
    if (isAdminMode) {
      if (adminUsername === 'admin' && password === '11223344') {
        onLogin('admin');
      } else {
        setError('Username atau Password Admin salah!');
      }
      return;
    }

    if (!selectedName) {
      setError('Pilih nama terlebih dahulu!');
      return;
    }
    
    onLogin(selectedName);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="card-gradient p-8 max-w-md w-full border-4 border-white animate-slide-in">
        <div className="text-center mb-6">
          <div className="text-7xl mb-4 drop-shadow-lg animate-bounce-subtle">
            🕌
          </div>
          <h1 className="text-4xl font-black mt-4 text-orange-500 drop-shadow-sm">
            {isAdminMode ? 'Admin Panel' : 'Petualangan Ramadhan'}
          </h1>
        </div>
        
        <div className="space-y-6">
          {isAdminMode ? (
            <div>
              <label className="block text-blue-600 mb-2 font-bold text-lg">👤 Username Admin</label>
              <input 
                type="text" 
                value={adminUsername}
                onChange={(e) => setAdminUsername(e.target.value)}
                placeholder="Masukkan username admin" 
                className="w-full px-4 py-3 rounded-2xl bg-blue-50 border-2 border-blue-200 text-blue-800 placeholder-blue-300 focus:outline-none focus:border-orange-400 transition"
              />
            </div>
          ) : (
            <div>
              <label className="block text-blue-600 mb-2 font-bold text-lg">👤 Nama Siswa</label>
              <select 
                value={selectedName}
                onChange={(e) => setSelectedName(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-blue-50 border-2 border-blue-200 text-blue-800 focus:outline-none focus:border-orange-400 transition font-bold"
              >
                <option value="" className="text-gray-800">-- Pilih Nama --</option>
                {students.map((name) => (
                  <option key={name} value={name} className="text-gray-800">{name}</option>
                ))}
              </select>
            </div>
          )}
          
          {isAdminMode && (
            <div>
              <label className="block text-blue-600 mb-2 font-bold text-lg">🔐 Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan password admin" 
                className="w-full px-4 py-3 rounded-2xl bg-blue-50 border-2 border-blue-200 text-blue-800 placeholder-blue-300 focus:outline-none focus:border-orange-400 transition"
              />
            </div>
          )}

          <button 
            onClick={handleLogin}
            className="w-full py-4 btn-primary btn-pop text-white font-black text-xl rounded-2xl mt-6 cursor-pointer"
          >
            {isAdminMode ? '🔓 Masuk Admin' : '✨ MULAI PETUALANGAN ✨'}
          </button>
          
          {error && <p className="text-red-500 font-bold text-center mt-2">{error}</p>}

          <div className="text-center mt-6">
            <button 
              onClick={() => {
                setIsAdminMode(!isAdminMode);
                setError('');
                setPassword('');
                setAdminUsername('');
                setSelectedName('');
              }}
              className="text-sm font-bold text-blue-400 hover:text-blue-600 underline cursor-pointer"
            >
              {isAdminMode ? 'Kembali ke Login Siswa' : 'Masuk sebagai Admin'}
            </button>
          </div>
        </div>
        
        {!isAdminMode && (
          <p className="text-center text-blue-400 font-medium text-sm mt-8 italic">
            "Ayo semangat puasanya ya adik-adik! ✨"
          </p>
        )}
      </div>
    </div>
  );
}
