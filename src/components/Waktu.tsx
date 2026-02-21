import React, { useEffect, useState } from 'react';
import { getJakartaPrayerTimes, PrayerTimeSchedule } from '../utils/prayerTimes';

interface WaktuProps {
  currentDate: string;
}

export default function Waktu({ currentDate }: WaktuProps) {
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimeSchedule>({
    imsak: '--:--',
    subuh: '--:--',
    dzuhur: '--:--',
    ashar: '--:--',
    maghrib: '--:--',
    isya: '--:--'
  });

  const [heading, setHeading] = useState<number | null>(null);
  const [compassError, setCompassError] = useState<string | null>(null);
  const [isCompassActive, setIsCompassActive] = useState(false);

  // Qibla direction from Jakarta is approximately 295 degrees
  const QIBLA_DIRECTION = 295;

  useEffect(() => {
    const times = getJakartaPrayerTimes(new Date());
    setPrayerTimes(times);
  }, []);

  const startCompass = async () => {
    if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
      try {
        const permissionState = await (DeviceOrientationEvent as any).requestPermission();
        if (permissionState === 'granted') {
          (window as any).addEventListener('deviceorientationabsolute', handleOrientation, true);
          setIsCompassActive(true);
          setCompassError(null);
        } else {
          setCompassError('Izin akses kompas ditolak.');
        }
      } catch (error) {
        console.error(error);
        setCompassError('Gagal meminta izin kompas.');
      }
    } else if ('ondeviceorientationabsolute' in window) {
      (window as any).addEventListener('deviceorientationabsolute', handleOrientation, true);
      setIsCompassActive(true);
      setCompassError(null);
    } else if ('ondeviceorientation' in window) {
      (window as any).addEventListener('deviceorientation', handleOrientation, true);
      setIsCompassActive(true);
      setCompassError(null);
    } else {
      setCompassError('Yah, HP kamu belum mendukung fitur kompas 😢');
    }
  };

  const stopCompass = () => {
    (window as any).removeEventListener('deviceorientationabsolute', handleOrientation, true);
    window.removeEventListener('deviceorientation', handleOrientation, true);
    setIsCompassActive(false);
    setHeading(null);
  };

  const handleOrientation = (event: DeviceOrientationEvent) => {
    let compassHeading = null;
    
    // Use webkitCompassHeading if available (iOS)
    if ((event as any).webkitCompassHeading) {
      compassHeading = (event as any).webkitCompassHeading;
    } 
    // Otherwise calculate from alpha (Android)
    else if (event.alpha !== null) {
      // Convert alpha to compass heading
      // Note: This might not be true north depending on the device and browser
      compassHeading = 360 - event.alpha;
    }

    if (compassHeading !== null) {
      setHeading(compassHeading);
    }
  };

  // Calculate the rotation for the compass needle
  // The needle should point to Qibla relative to the device's current heading
  const needleRotation = heading !== null ? QIBLA_DIRECTION - heading : QIBLA_DIRECTION;
  
  // Calculate how close we are to facing Qibla (0-180 degrees difference)
  const diff = heading !== null ? Math.abs((heading - QIBLA_DIRECTION + 360) % 360) : null;
  const isFacingQibla = diff !== null && (diff < 15 || diff > 345);

  return (
    <section className="space-y-6 animate-slide-in">
      <div className="card-gradient p-8 border-4 border-white shadow-lg">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-14 h-14 rounded-3xl bg-indigo-400 flex items-center justify-center text-3xl shadow-sm animate-bounce-subtle">🕌</div>
          <div>
            <h2 className="text-3xl font-black text-blue-600">Waktu Sholat</h2>
            <p className="text-orange-500 font-bold text-sm">{currentDate} (WIB - Jakarta)</p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="bg-indigo-50 rounded-3xl p-4 text-center border-4 border-indigo-100 shadow-sm btn-pop">
            <p className="text-indigo-600 font-black text-sm mb-1">Imsak</p>
            <p className="text-3xl font-black text-indigo-700">{prayerTimes.imsak}</p>
          </div>
          <div className="bg-amber-50 rounded-3xl p-4 text-center border-4 border-amber-100 shadow-sm btn-pop">
            <p className="text-amber-600 font-black text-sm mb-1">🌅 Subuh</p>
            <p className="text-3xl font-black text-amber-700">{prayerTimes.subuh}</p>
          </div>
          <div className="bg-yellow-50 rounded-3xl p-4 text-center border-4 border-yellow-100 shadow-sm btn-pop">
            <p className="text-yellow-600 font-black text-sm mb-1">☀️ Terbit</p>
            <p className="text-3xl font-black text-yellow-700">{prayerTimes.terbit}</p>
          </div>
          <div className="bg-orange-50 rounded-3xl p-4 text-center border-4 border-orange-100 shadow-sm btn-pop">
            <p className="text-orange-600 font-black text-sm mb-1">🌤️ Dhuha</p>
            <p className="text-3xl font-black text-orange-700">{prayerTimes.dhuha}</p>
          </div>
          <div className="bg-red-50 rounded-3xl p-4 text-center border-4 border-red-100 shadow-sm btn-pop">
            <p className="text-red-600 font-black text-sm mb-1">☀️ Dzuhur</p>
            <p className="text-3xl font-black text-red-700">{prayerTimes.dzuhur}</p>
          </div>
          <div className="bg-yellow-100 rounded-3xl p-4 text-center border-4 border-yellow-200 shadow-sm btn-pop">
            <p className="text-yellow-700 font-black text-sm mb-1">🌤️ Ashar</p>
            <p className="text-3xl font-black text-yellow-800">{prayerTimes.ashar}</p>
          </div>
          <div className="bg-rose-50 rounded-3xl p-4 text-center border-4 border-rose-100 shadow-sm btn-pop">
            <p className="text-rose-600 font-black text-sm mb-1">🌅 Maghrib</p>
            <p className="text-3xl font-black text-rose-700">{prayerTimes.maghrib}</p>
          </div>
          <div className="bg-purple-50 rounded-3xl p-4 text-center border-4 border-purple-100 shadow-sm btn-pop">
            <p className="text-purple-600 font-black text-sm mb-1">🌙 Isya</p>
            <p className="text-3xl font-black text-purple-700">{prayerTimes.isya}</p>
          </div>
        </div>

        <div className={`rounded-3xl p-6 mb-8 border-4 shadow-sm transition-colors duration-500 ${isFacingQibla ? 'bg-emerald-100 border-emerald-300' : 'bg-emerald-50 border-emerald-100'}`}>
          <h3 className="font-black text-emerald-600 mb-6 text-center flex items-center justify-center gap-2 text-2xl">🧭 Kompas Kiblat</h3>
          
          <div className="relative w-56 h-56 mx-auto mb-6">
            {/* Compass Background */}
            <div className={`absolute inset-0 rounded-full border-8 shadow-inner transition-colors duration-500 ${isFacingQibla ? 'bg-emerald-50 border-emerald-400' : 'bg-white border-emerald-200'}`}>
              <div className="absolute inset-2 rounded-full border-4 border-emerald-50 border-dashed">
                <span className="absolute top-2 left-1/2 -translate-x-1/2 text-sm font-black text-red-500">U</span>
                <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-sm font-black text-emerald-300">S</span>
                <span className="absolute left-2 top-1/2 -translate-y-1/2 text-sm font-black text-emerald-300">B</span>
                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-sm font-black text-emerald-300">T</span>
              </div>
            </div>
            
            {/* Compass Needle Container (Rotates based on device heading) */}
            <div 
              className="absolute inset-0 transition-transform duration-200 ease-out"
              style={{ transform: `rotate(${heading !== null ? -heading : 0}deg)` }}
            >
              {/* North Indicator */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-2 h-6 bg-red-500 rounded-full"></div>
            </div>

            {/* Qibla Needle Container (Points to Qibla relative to North) */}
            <div 
              className="absolute inset-0 transition-transform duration-200 ease-out"
              style={{ transform: `rotate(${needleRotation}deg)` }}
            >
              <div className="absolute inset-0 flex items-center justify-center flex-col pb-24">
                <div className={`text-4xl transition-transform duration-500 ${isFacingQibla ? 'scale-125 animate-bounce-subtle' : ''}`}>🕋</div>
                <div className={`w-1 h-16 rounded-full mt-2 ${isFacingQibla ? 'bg-emerald-500' : 'bg-emerald-300'}`}></div>
              </div>
            </div>
            
            {/* Center Dot */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-6 h-6 rounded-full bg-emerald-500 border-4 border-white shadow-md z-10"></div>
            </div>
          </div>

          <div className="text-center space-y-4">
            {compassError ? (
              <p className="text-red-500 font-bold bg-red-50 p-3 rounded-xl border-2 border-red-100">{compassError}</p>
            ) : (
              <>
                {isCompassActive ? (
                  <>
                    <p className={`font-black text-xl ${isFacingQibla ? 'text-emerald-600 animate-bounce-subtle' : 'text-emerald-500'}`}>
                      {isFacingQibla ? '✨ Yey! Sudah menghadap Kiblat! ✨' : 'Putar HP-mu cari gambar Ka\'bah ya!'}
                    </p>
                    <button 
                      onClick={stopCompass}
                      className="px-6 py-2 bg-rose-100 text-rose-600 font-black rounded-2xl border-2 border-rose-200 hover:bg-rose-200 transition btn-pop"
                    >
                      Matikan Kompas
                    </button>
                  </>
                ) : (
                  <button 
                    onClick={startCompass}
                    className="px-8 py-3 bg-emerald-500 text-white font-black rounded-2xl border-4 border-emerald-600 hover:bg-emerald-400 transition shadow-[0_4px_0_#059669] btn-pop text-lg"
                  >
                    🧭 Nyalakan Kompas
                  </button>
                )}
              </>
            )}
            <p className="text-emerald-600/60 font-bold text-xs mt-2">*Arah Kiblat dari Jakarta sekitar 295°</p>
          </div>
        </div>

        <div className="bg-amber-50 rounded-3xl p-6 mb-6 border-4 border-amber-100 shadow-sm btn-pop">
          <h3 className="font-black text-amber-600 mb-4 flex items-center gap-2 text-xl">🤲 Doa Berbuka Puasa</h3>
          <div className="bg-white rounded-2xl p-6 text-center border-2 border-amber-100 shadow-inner">
            <p className="font-amiri text-3xl text-amber-700 mb-4 leading-relaxed">ذَهَبَ الظَّمَأُ، وَابْتَلَّتِ الْعُرُوقُ، وَثَبَتَ الْأَجْرُ إِنْ شَاءَ اللَّهُ</p>
            <p className="text-orange-500 font-black mb-3 text-lg italic">"Dzahabaz zhama'u wabtallatil 'uruuqu wa tsabatal ajru insyaa Allah."</p>
            <p className="text-blue-600 font-bold">"Telah hilang rasa haus, dan urat-urat telah basah, serta pahala telah tetap, insya Allah."</p>
          </div>
        </div>

        <div className="bg-purple-50 rounded-3xl p-6 border-4 border-purple-100 shadow-sm btn-pop">
          <h3 className="font-black text-purple-600 mb-4 flex items-center gap-2 text-xl">📚 Doa Penutup Majelis Ilmu</h3>
          <div className="bg-white rounded-2xl p-6 text-center border-2 border-purple-100 shadow-inner">
            <p className="font-amiri text-3xl text-purple-700 mb-4 leading-relaxed">سُبْحَانَكَ اللّٰهُمَّ وَبِحَمْدِكَ أَشْهَدُ أَنْ لَا إِلٰهَ إِلَّا أَنْتَ أَسْتَغْفِرُكَ وَأَتُوْبُ إِلَيْكَ</p>
            <p className="text-purple-500 font-black mb-3 text-lg italic">Subḥânakallâhumma wa biḥamdika asyhadu an-lâilâha illâ anta astaghfiruka wa atûbu ilaik</p>
            <p className="text-blue-600 font-bold">"Mahasuci Engkau, ya Allah. Segala sanjungan untuk-Mu. Aku bersaksi bahwa tiada tuhan melainkan Engkau. Aku memohon ampun dan bertaubat kepada-Mu"</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 border-4 border-indigo-200 shadow-md">
        <p className="text-center text-indigo-600 font-black italic text-base">🕌 "Ayo sholat tepat waktu ya teman-teman!" 🕌</p>
      </div>
    </section>
  );
}
