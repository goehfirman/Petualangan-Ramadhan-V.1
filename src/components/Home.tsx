import React from 'react';

interface HomeProps {
  day: number;
  exp: number;
  quranPages: number;
  rank: number | string;
  quote: string;
  onNavigate: (section: string) => void;
}

export default function Home({ day, exp, quranPages, rank, quote, onNavigate }: HomeProps) {
  return (
    <section className="space-y-6 animate-slide-in">
      <div className="card-gradient p-8 border-4 border-white text-center shadow-lg">
        <h2 className="text-4xl font-black text-blue-600 mb-4 drop-shadow-sm animate-bounce-subtle">
          ✨ HALO TEMAN-TEMAN! ✨
        </h2>
        <p className="text-orange-500 font-bold text-lg">Ayo semangat beribadah di bulan Ramadhan! 🌙</p>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
          <div className="bg-blue-100 rounded-3xl p-5 border-4 border-blue-200 shadow-sm btn-pop">
            <div className="text-4xl mb-2">🌙</div>
            <div className="text-3xl font-black text-blue-600">{day}</div>
            <div className="text-xs font-bold text-blue-400 uppercase tracking-wider">Hari ke</div>
          </div>
          <div className="bg-yellow-100 rounded-3xl p-5 border-4 border-yellow-200 shadow-sm btn-pop">
            <div className="text-4xl mb-2">⭐</div>
            <div className="text-3xl font-black text-yellow-700">{exp}</div>
            <div className="text-xs font-bold text-yellow-600 uppercase tracking-wider">Total EXP</div>
          </div>
          <div className="bg-pink-100 rounded-3xl p-5 border-4 border-pink-200 shadow-sm btn-pop">
            <div className="text-4xl mb-2">📖</div>
            <div className="text-3xl font-black text-pink-600">{quranPages}</div>
            <div className="text-xs font-bold text-pink-400 uppercase tracking-wider">Halaman</div>
          </div>
          <div className="bg-emerald-100 rounded-3xl p-5 border-4 border-emerald-200 shadow-sm btn-pop">
            <div className="text-4xl mb-2">🏆</div>
            <div className="text-3xl font-black text-emerald-600">{rank}</div>
            <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Peringkat</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <button 
          onClick={() => onNavigate('amalan')}
          className="card-gradient p-6 border-4 border-white text-center hover:bg-blue-50 transition group cursor-pointer btn-pop shadow-md"
        >
          <div className="text-5xl mb-3 group-hover:animate-wiggle">✅</div>
          <h3 className="font-black text-blue-600 text-xl">Catat Amalan</h3>
          <p className="text-sm font-bold text-blue-400">Isi amalan hari ini</p>
        </button>
        <button 
          onClick={() => onNavigate('leaderboard')}
          className="card-gradient p-6 border-4 border-white text-center hover:bg-yellow-50 transition group cursor-pointer btn-pop shadow-md"
        >
          <div className="text-5xl mb-3 group-hover:animate-wiggle">🏆</div>
          <h3 className="font-black text-yellow-600 text-xl">Leaderboard</h3>
          <p className="text-sm font-bold text-yellow-500">Lihat peringkatmu</p>
        </button>
      </div>

      <div className="bg-white rounded-3xl p-8 border-4 border-orange-200 shadow-lg relative overflow-hidden">
        <div className="absolute -top-4 -right-4 text-6xl opacity-10 rotate-12">✨</div>
        <div className="flex items-start gap-4 relative z-10">
          <div className="text-5xl animate-float">💫</div>
          <div>
            <h3 className="font-black text-orange-500 text-xl mb-2">Pesan Hari Ini</h3>
            <p className="text-blue-600 font-bold text-lg italic">"{quote}"</p>
          </div>
        </div>
      </div>
    </section>
  );
}
