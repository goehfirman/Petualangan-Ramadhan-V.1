import React, { useState } from 'react';

export default function Puasa() {
  const [activeTab, setActiveTab] = useState('definisi');

  const tabs = [
    { id: 'definisi', label: '📚 Pengertian' },
    { id: 'hukum', label: '⚖️ Hukum & Rukun' },
    { id: 'syarat', label: '📋 Syarat & Sunnah' },
    { id: 'sahur', label: '🥣 Sahur' },
    { id: 'niat', label: '🤲 Niat & Doa' },
    { id: 'buka', label: '🍽️ Berbuka Puasa' },
    { id: 'boleh', label: '🔓 Rukhsah' },
    { id: 'keutamaan', label: '🌟 Keutamaan' },
  ];

  return (
    <section className="space-y-6 animate-slide-in">
      <div className="flex gap-2 overflow-x-auto scroll-hidden pb-3">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-2xl text-sm font-black whitespace-nowrap transition btn-pop cursor-pointer border-2 ${
              activeTab === tab.id
                ? 'bg-orange-500 text-white border-orange-600 shadow-[0_4px_0_#D84315]'
                : 'bg-white text-blue-600 border-blue-100 hover:bg-blue-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'definisi' && (
        <div className="card-gradient p-8 border-4 border-white shadow-lg animate-slide-in">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-14 h-14 rounded-3xl bg-blue-400 flex items-center justify-center text-3xl shadow-sm animate-bounce-subtle">📚</div>
            <h2 className="text-3xl font-black text-blue-600">Apa itu Puasa?</h2>
          </div>
          <div className="space-y-6 text-blue-800 font-bold">
            <p className="text-lg leading-relaxed"><strong className="text-orange-500 text-xl">Puasa</strong> itu artinya kita belajar menahan diri. Kita tidak makan dan tidak minum dari pagi hari (Subuh) sampai sore hari (Maghrib) karena sayang sama Allah SWT.</p>
            <div className="bg-blue-50 rounded-3xl p-6 border-4 border-blue-100 shadow-inner">
              <p className="font-amiri text-3xl text-center text-blue-700 mb-4 leading-relaxed">يَا أَيُّهَا الَّذِينَ آمَنُوا كُتِبَ عَلَيْكُمُ الصِّيَامُ</p>
              <p className="text-sm text-blue-500 text-center font-bold">"Wahai orang-orang yang beriman, diwajibkan atas kamu berpuasa..." (QS. Al-Baqarah: 183)</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              <div className="bg-emerald-50 rounded-3xl p-5 border-4 border-emerald-100 shadow-sm btn-pop">
                <h4 className="font-black text-emerald-600 mb-3 text-lg">🎯 Kenapa Puasa?</h4>
                <ul className="text-sm space-y-2 text-emerald-700">
                  <li>🌟 Jadi anak yang hebat</li>
                  <li>🌟 Belajar sabar</li>
                  <li>🌟 Sayang sama teman</li>
                  <li>🌟 Allah jadi sayang</li>
                </ul>
              </div>
              <div className="bg-orange-50 rounded-3xl p-5 border-4 border-orange-100 shadow-sm btn-pop">
                <h4 className="font-black text-orange-600 mb-3 text-lg">⏰ Kapan Puasa?</h4>
                <ul className="text-sm space-y-2 text-orange-700">
                  <li>☀️ Mulai: Waktu Subuh</li>
                  <li>🌙 Selesai: Waktu Maghrib</li>
                  <li>📅 Berapa lama: 30 Hari</li>
                  <li>✨ Bulannya: Ramadhan</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'hukum' && (
        <div className="card-gradient p-8 border-4 border-white shadow-lg animate-slide-in">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-14 h-14 rounded-3xl bg-purple-400 flex items-center justify-center text-3xl shadow-sm animate-bounce-subtle">⚖️</div>
            <h2 className="text-3xl font-black text-blue-600">Aturan Puasa</h2>
          </div>
          <div className="space-y-6">
            <div className="bg-purple-50 rounded-3xl p-6 border-4 border-purple-100 shadow-sm btn-pop">
              <h3 className="font-black text-purple-600 text-xl mb-3">⚖️ Harus Puasa!</h3>
              <p className="text-purple-800 font-bold">Puasa Ramadhan itu <strong className="text-orange-500">WAJIB</strong> buat kita semua yang sudah besar. Ini adalah Rukun Islam yang ke-4 lho!</p>
            </div>
            <div className="bg-yellow-50 rounded-3xl p-6 border-4 border-yellow-100 shadow-sm btn-pop">
              <h3 className="font-black text-yellow-700 text-xl mb-4">📜 2 Hal Penting</h3>
              <div className="grid gap-4">
                <div className="flex items-start gap-4 bg-white rounded-2xl p-4 border-2 border-yellow-100">
                  <span className="w-10 h-10 rounded-2xl bg-yellow-400 flex items-center justify-center font-black text-white text-xl flex-shrink-0 shadow-sm">1</span>
                  <div>
                    <h4 className="font-black text-yellow-700 text-lg">Niat</h4>
                    <p className="text-sm font-bold text-yellow-600">Berjanji di dalam hati mau puasa besok hari karena Allah.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 bg-white rounded-2xl p-4 border-2 border-yellow-100">
                  <span className="w-10 h-10 rounded-2xl bg-yellow-400 flex items-center justify-center font-black text-white text-xl flex-shrink-0 shadow-sm">2</span>
                  <div>
                    <h4 className="font-black text-yellow-700 text-lg">Menahan Diri</h4>
                    <p className="text-sm font-bold text-yellow-600">Tidak makan dan tidak minum dari pagi sampai sore hari.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'syarat' && (
        <div className="card-gradient p-8 border-4 border-white shadow-lg animate-slide-in">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-14 h-14 rounded-3xl bg-cyan-400 flex items-center justify-center text-3xl shadow-sm animate-bounce-subtle">📋</div>
            <h2 className="text-3xl font-black text-blue-600">Syarat & Sunnah</h2>
          </div>
          <div className="grid gap-6">
            <div className="bg-cyan-50 rounded-3xl p-6 border-4 border-cyan-100 shadow-sm btn-pop">
              <h3 className="font-black text-cyan-600 text-xl mb-4">📋 Siapa yang Puasa?</h3>
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="bg-white rounded-2xl p-4 flex items-center gap-3 border-2 border-cyan-100 font-bold text-cyan-700"><span className="text-2xl">☪️</span> Islam</div>
                <div className="bg-white rounded-2xl p-4 flex items-center gap-3 border-2 border-cyan-100 font-bold text-cyan-700"><span className="text-2xl">👦</span> Sudah Besar</div>
                <div className="bg-white rounded-2xl p-4 flex items-center gap-3 border-2 border-cyan-100 font-bold text-cyan-700"><span className="text-2xl">🧠</span> Pintar/Sehat</div>
                <div className="bg-white rounded-2xl p-4 flex items-center gap-3 border-2 border-cyan-100 font-bold text-cyan-700"><span className="text-2xl">💪</span> Kuat Puasa</div>
              </div>
            </div>
            <div className="bg-pink-50 rounded-3xl p-6 border-4 border-pink-100 shadow-sm btn-pop">
              <h3 className="font-black text-pink-600 text-xl mb-4">💝 Biar Makin Hebat!</h3>
              <div className="grid gap-3">
                <div className="bg-white rounded-2xl p-4 border-2 border-pink-100 font-bold text-pink-700 flex items-center gap-3"><span className="text-2xl">🥣</span> Makan Sahur</div>
                <div className="bg-white rounded-2xl p-4 border-2 border-pink-100 font-bold text-pink-700 flex items-center gap-3"><span className="text-2xl">🍽️</span> Cepat Berbuka</div>
                <div className="bg-white rounded-2xl p-4 border-2 border-pink-100 font-bold text-pink-700 flex items-center gap-3"><span className="text-2xl">🤲</span> Berdoa Terus</div>
                <div className="bg-white rounded-2xl p-4 border-2 border-pink-100 font-bold text-pink-700 flex items-center gap-3"><span className="text-2xl">📖</span> Baca Al-Quran</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'sahur' && (
        <div className="card-gradient p-8 border-4 border-white shadow-lg animate-slide-in">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-14 h-14 rounded-3xl bg-indigo-400 flex items-center justify-center text-3xl shadow-sm animate-bounce-subtle">🥣</div>
            <h2 className="text-3xl font-black text-blue-600">Keutamaan Sahur</h2>
          </div>
          <div className="space-y-6">
            <div className="bg-indigo-50 rounded-3xl p-6 border-4 border-indigo-100 shadow-sm btn-pop">
              <p className="text-indigo-800 font-bold mb-4">Sahur bukan sekadar rutinitas mengisi perut sebelum berpuasa, melainkan sebuah ibadah sunnah yang sangat dianjurkan (Sunnah Muakkadah) oleh Rasulullah SAW. Meskipun seseorang merasa kuat puasa tanpa sahur, meninggalkannya berarti melewatkan banyak keutamaan besar.</p>
              <h3 className="font-black text-indigo-600 text-xl mb-4">🌟 5 Keutamaan Makan Sahur:</h3>
              <div className="grid gap-4">
                <div className="bg-white rounded-2xl p-4 border-2 border-indigo-100">
                  <h4 className="font-black text-indigo-700 flex items-center gap-2"><span className="text-2xl">✨</span> 1. Terdapat Keberkahan (Barakah)</h4>
                  <p className="text-sm font-bold text-indigo-600 mt-2">Makanan sahur adalah makanan yang penuh berkah. Keberkahan ini bisa bermakna kebaikan di dunia maupun di akhirat.</p>
                  <p className="text-xs text-indigo-400 mt-2 italic">"Makan sahurlah kalian, karena sesungguhnya dalam sahur itu terdapat berkah." (HR. Bukhari & Muslim)</p>
                </div>
                <div className="bg-white rounded-2xl p-4 border-2 border-indigo-100">
                  <h4 className="font-black text-indigo-700 flex items-center gap-2"><span className="text-2xl">👥</span> 2. Pembeda dengan Puasa Ahli Kitab</h4>
                  <p className="text-sm font-bold text-indigo-600 mt-2">Salah satu ciri khas puasa umat Islam dibandingkan dengan puasanya umat terdahulu adalah anjuran untuk makan sahur.</p>
                  <p className="text-xs text-indigo-400 mt-2 italic">"Pembeda antara puasa kita dengan puasanya Ahli Kitab adalah makan sahur." (HR. Muslim)</p>
                </div>
                <div className="bg-white rounded-2xl p-4 border-2 border-indigo-100">
                  <h4 className="font-black text-indigo-700 flex items-center gap-2"><span className="text-2xl">👼</span> 3. Mendapat Shalawat dari Allah dan Malaikat</h4>
                  <p className="text-sm font-bold text-indigo-600 mt-2">Allah akan memberikan rahmat-Nya, dan para malaikat akan memohonkan ampunan bagi orang-orang yang bangun untuk makan sahur.</p>
                  <p className="text-xs text-indigo-400 mt-2 italic">"Sesungguhnya Allah dan para malaikat-Nya bershalawat kepada orang-orang yang makan sahur." (HR. Ahmad)</p>
                </div>
                <div className="bg-white rounded-2xl p-4 border-2 border-indigo-100">
                  <h4 className="font-black text-indigo-700 flex items-center gap-2"><span className="text-2xl">🤲</span> 4. Waktu Mustajab untuk Berdoa</h4>
                  <p className="text-sm font-bold text-indigo-600 mt-2">Waktu sahur bertepatan dengan sepertiga malam terakhir. Ini adalah waktu terbaik untuk memanjatkan doa.</p>
                  <p className="text-xs text-indigo-400 mt-2 italic">"Dan selalu memohonkan ampunan di waktu sahur menjelang fajar." (QS. Adz-Dzariyat: 18)</p>
                </div>
                <div className="bg-white rounded-2xl p-4 border-2 border-indigo-100">
                  <h4 className="font-black text-indigo-700 flex items-center gap-2"><span className="text-2xl">💪</span> 5. Memberikan Kekuatan Fisik</h4>
                  <p className="text-sm font-bold text-indigo-600 mt-2">Secara medis dan logika, sahur memberikan asupan energi yang sangat dibutuhkan tubuh untuk beraktivitas di siang hari.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'niat' && (
        <div className="card-gradient p-8 border-4 border-white shadow-lg animate-slide-in">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-14 h-14 rounded-3xl bg-green-400 flex items-center justify-center text-3xl shadow-sm animate-bounce-subtle">🤲</div>
            <h2 className="text-3xl font-black text-blue-600">Niat Puasa</h2>
          </div>
          <div className="space-y-6">
            <div className="bg-green-50 rounded-3xl p-8 border-4 border-green-100 shadow-sm btn-pop">
              <h3 className="font-black text-green-600 text-xl mb-6 text-center">🌙 Yuk Baca Niatnya!</h3>
              <div className="bg-white rounded-3xl p-6 text-center border-4 border-green-100 shadow-inner">
                <p className="font-amiri text-4xl text-green-700 mb-6 leading-relaxed">نَوَيْتُ صَوْمَ غَدٍ عَنْ أَدَاءِ فَرْضِ شَهْرِ رَمَضَانَ</p>
                <p className="text-orange-500 font-black mb-3 text-lg italic">Nawaitu shauma ghadin 'an adaa'i fardhi syahri ramadhaana</p>
                <p className="text-blue-600 font-bold">"Aku niat berpuasa esok hari di bulan Ramadhan karena Allah Ta'ala"</p>
              </div>
              <p className="text-sm font-black text-green-500 mt-6 text-center animate-bounce-subtle">⏰ Dibaca malam hari sebelum tidur ya!</p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'buka' && (
        <div className="card-gradient p-8 border-4 border-white shadow-lg animate-slide-in">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-14 h-14 rounded-3xl bg-orange-400 flex items-center justify-center text-3xl shadow-sm animate-bounce-subtle">🍽️</div>
            <h2 className="text-3xl font-black text-blue-600">Waktunya Berbuka!</h2>
          </div>
          <div className="space-y-6">
            <div className="bg-orange-50 rounded-3xl p-6 border-4 border-orange-100 shadow-sm btn-pop">
              <h3 className="font-black text-orange-600 text-xl mb-4">📝 Cara Berbuka yang Baik</h3>
              <div className="grid gap-3">
                <div className="flex items-center gap-4 bg-white rounded-2xl p-4 border-2 border-orange-100 font-bold text-orange-700">
                  <span className="text-3xl">🏃</span> Cepat-cepat berbuka
                </div>
                <div className="flex items-center gap-4 bg-white rounded-2xl p-4 border-2 border-orange-100 font-bold text-orange-700">
                  <span className="text-3xl">🌴</span> Makan kurma dulu
                </div>
                <div className="flex items-center gap-4 bg-white rounded-2xl p-4 border-2 border-orange-100 font-bold text-orange-700">
                  <span className="text-3xl">🤲</span> Jangan lupa berdoa
                </div>
                <div className="flex items-center gap-4 bg-white rounded-2xl p-4 border-2 border-orange-100 font-bold text-orange-700">
                  <span className="text-3xl">🥤</span> Minum air secukupnya
                </div>
              </div>
            </div>
            <div className="bg-yellow-50 rounded-3xl p-8 border-4 border-yellow-100 shadow-sm btn-pop">
              <h3 className="font-black text-yellow-700 text-xl mb-6 text-center">🤲 Doa Berbuka Puasa</h3>
              <div className="bg-white rounded-3xl p-6 text-center border-4 border-yellow-100 shadow-inner">
                <p className="font-amiri text-3xl text-yellow-700 mb-4 leading-relaxed">ذَهَبَ الظَّمَأُ وَابْتَلَّتِ الْعُرُوقُ</p>
                <p className="text-orange-500 font-black mb-3 text-lg italic">Dzahabazh zhama'u wabtallatil 'uruuqu</p>
                <p className="text-blue-600 font-bold">"Telah hilang rasa haus, dan urat-urat telah basah, insya Allah"</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'boleh' && (
        <div className="card-gradient p-8 border-4 border-white shadow-lg animate-slide-in">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-14 h-14 rounded-3xl bg-rose-400 flex items-center justify-center text-3xl shadow-sm animate-bounce-subtle">🔓</div>
            <h2 className="text-3xl font-black text-blue-600">Boleh Tidak Puasa?</h2>
          </div>
          <div className="space-y-6">
            <div className="bg-rose-50 rounded-3xl p-6 border-4 border-rose-100 shadow-sm btn-pop">
              <h3 className="font-black text-rose-600 text-xl mb-4">👥 Siapa Saja Ya?</h3>
              <div className="grid gap-4">
                <div className="bg-white rounded-2xl p-4 border-2 border-rose-100 flex items-center gap-4">
                  <span className="text-4xl">🤒</span>
                  <div>
                    <h4 className="font-black text-rose-700">Lagi Sakit</h4>
                    <p className="text-xs font-bold text-rose-400">Boleh tidak puasa dulu biar cepat sembuh.</p>
                  </div>
                </div>
                <div className="bg-white rounded-2xl p-4 border-2 border-rose-100 flex items-center gap-4">
                  <span className="text-4xl">✈️</span>
                  <div>
                    <h4 className="font-black text-rose-700">Lagi Jalan Jauh</h4>
                    <p className="text-xs font-bold text-rose-400">Kalau capek sekali di jalan boleh tidak puasa.</p>
                  </div>
                </div>
                <div className="bg-white rounded-2xl p-4 border-2 border-rose-100 flex items-center gap-4">
                  <span className="text-4xl">👴</span>
                  <div>
                    <h4 className="font-black text-rose-700">Kakek & Nenek</h4>
                    <p className="text-xs font-bold text-rose-400">Yang sudah tua sekali dan tidak kuat lagi.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'keutamaan' && (
        <div className="card-gradient p-8 border-4 border-white shadow-lg animate-slide-in">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-14 h-14 rounded-3xl bg-yellow-400 flex items-center justify-center text-3xl shadow-sm animate-bounce-subtle">🌟</div>
            <h2 className="text-3xl font-black text-blue-600">Hebatnya Puasa!</h2>
          </div>
          <div className="grid gap-6">
            <div className="bg-yellow-50 rounded-3xl p-6 border-4 border-yellow-100 shadow-sm btn-pop">
              <div className="grid gap-4">
                <div className="bg-white rounded-2xl p-5 border-2 border-yellow-100 shadow-sm flex items-center gap-4">
                  <span className="text-5xl animate-bounce-subtle">🚪</span>
                  <div>
                    <h4 className="font-black text-yellow-700 text-lg">Pintu Surga Ar-Rayyan</h4>
                    <p className="text-sm font-bold text-yellow-600">Pintu khusus buat anak-anak yang rajin puasa!</p>
                  </div>
                </div>
                <div className="bg-white rounded-2xl p-5 border-2 border-yellow-100 shadow-sm flex items-center gap-4">
                  <span className="text-5xl animate-float">🛡️</span>
                  <div>
                    <h4 className="font-black text-yellow-700 text-lg">Jadi Tameng Kuat</h4>
                    <p className="text-sm font-bold text-yellow-600">Puasa menjaga kita dari hal-hal yang buruk.</p>
                  </div>
                </div>
                <div className="bg-white rounded-2xl p-5 border-2 border-yellow-100 shadow-sm flex items-center gap-4">
                  <span className="text-5xl animate-wiggle">🎁</span>
                  <div>
                    <h4 className="font-black text-yellow-700 text-lg">Hadiah Banyak Sekali</h4>
                    <p className="text-sm font-bold text-yellow-600">Allah kasih pahala yang banyaaaak buat kita.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-3xl p-6 border-4 border-yellow-200 shadow-md">
        <p className="text-center text-yellow-600 font-black italic text-base">💫 "Ayo semangat puasanya ya teman-teman, Allah sayang kita semua!" 💫</p>
      </div>
    </section>
  );
}
