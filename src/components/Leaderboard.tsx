import React, { useEffect, useState } from 'react';
import { StudentRank } from '../types';
import { getLeaderboard } from '../utils/ramadhan';

interface LeaderboardProps {
  currentUser: string;
}

export default function Leaderboard({ currentUser }: LeaderboardProps) {
  const [rankings, setRankings] = useState<StudentRank[]>([]);

  useEffect(() => {
    getLeaderboard().then(setRankings);
  }, []);

  const myRankIndex = rankings.findIndex(r => r.name === currentUser);
  const myRank = rankings[myRankIndex];

  return (
    <section className="space-y-6 animate-slide-in">
      <div className="card-gradient p-8 border-4 border-white shadow-lg">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-14 h-14 rounded-3xl bg-yellow-400 flex items-center justify-center text-3xl shadow-sm animate-bounce-subtle">🏆</div>
          <div>
            <h2 className="text-3xl font-black text-blue-600">Papan Juara</h2>
            <p className="text-orange-500 font-bold text-sm">Siapa yang paling rajin ya? ✨</p>
          </div>
        </div>

        <div className="flex items-end justify-center gap-3 mb-10">
          {/* 2nd Place */}
          <div className="text-center">
            <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-3 rounded-3xl bg-gray-100 flex items-center justify-center text-4xl border-4 border-gray-200 shadow-sm btn-pop">
              🥈
            </div>
            <div className="bg-gray-50 rounded-t-3xl p-4 h-24 flex flex-col justify-end border-x-4 border-t-4 border-gray-100">
              <p className="font-black text-sm text-gray-700 truncate w-20 sm:w-24 mx-auto">{rankings[1]?.name.split(' ')[0] || '-'}</p>
              <p className="text-xs font-bold text-gray-400">{rankings[1]?.exp || 0} EXP</p>
            </div>
          </div>

          {/* 1st Place */}
          <div className="text-center">
            <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-3 rounded-3xl bg-yellow-100 flex items-center justify-center text-6xl border-4 border-yellow-200 shadow-md animate-bounce-subtle btn-pop">
              🥇
            </div>
            <div className="bg-yellow-50 rounded-t-3xl p-4 h-32 flex flex-col justify-end border-x-4 border-t-4 border-yellow-100">
              <p className="font-black text-base text-yellow-700 truncate w-24 sm:w-32 mx-auto">{rankings[0]?.name.split(' ')[0] || '-'}</p>
              <p className="text-sm font-black text-yellow-500">{rankings[0]?.exp || 0} EXP</p>
            </div>
          </div>

          {/* 3rd Place */}
          <div className="text-center">
            <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-3 rounded-3xl bg-orange-100 flex items-center justify-center text-4xl border-4 border-orange-200 shadow-sm btn-pop">
              🥉
            </div>
            <div className="bg-orange-50 rounded-t-3xl p-4 h-20 flex flex-col justify-end border-x-4 border-t-4 border-orange-100">
              <p className="font-black text-sm text-orange-700 truncate w-20 sm:w-24 mx-auto">{rankings[2]?.name.split(' ')[0] || '-'}</p>
              <p className="text-xs font-bold text-orange-400">{rankings[2]?.exp || 0} EXP</p>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 rounded-3xl overflow-hidden border-4 border-blue-100">
          <div className="grid grid-cols-12 gap-2 p-4 bg-blue-100 text-sm font-black text-blue-600 uppercase tracking-wider">
            <div className="col-span-2 text-center">#</div>
            <div className="col-span-7">Nama Teman</div>
            <div className="col-span-3 text-right">Bintang</div>
          </div>
          <div className="divide-y-2 divide-blue-100 max-h-80 overflow-y-auto scroll-hidden">
            {rankings.map((student, index) => {
              const isCurrentUser = student.name === currentUser;
              const medal = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : '';
              
              return (
                <div key={student.name} className={`grid grid-cols-12 gap-2 p-4 hover:bg-blue-100 transition ${isCurrentUser ? 'bg-yellow-100' : 'bg-white'}`}>
                  <div className={`col-span-2 text-center font-black text-lg ${index < 3 ? 'text-yellow-600' : 'text-blue-300'}`}>
                    {medal || (index + 1)}
                  </div>
                  <div className={`col-span-7 truncate font-bold ${isCurrentUser ? 'text-orange-600 font-black' : 'text-blue-800'}`}>
                    {student.name}
                  </div>
                  <div className="col-span-3 text-right font-black text-yellow-600">
                    {student.exp} ⭐
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-6 bg-emerald-100 rounded-3xl p-6 border-4 border-emerald-200 shadow-inner">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500 flex items-center justify-center font-black text-white text-2xl shadow-sm">
                {myRankIndex >= 0 ? myRankIndex + 1 : '-'}
              </div>
              <div>
                <p className="font-black text-emerald-700 text-lg">{currentUser}</p>
                <p className="text-xs font-bold text-emerald-500 uppercase tracking-wider">Peringkatmu</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl font-black text-yellow-600">{myRank?.exp || 0} ⭐</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 border-4 border-yellow-200 shadow-md">
        <p className="text-center text-yellow-600 font-bold italic text-base">🏆 "Ayo kita berlomba-lomba dalam kebaikan ya teman-teman!" 🏆</p>
      </div>
    </section>
  );
}
