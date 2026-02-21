import React, { useState } from 'react';
import { saveInquiry } from '../utils/ramadhan';

interface InquiryProps {
  currentUser: string;
}

export default function Inquiry({ currentUser }: InquiryProps) {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !message.trim()) return;

    setStatus('submitting');

    try {
      await saveInquiry(currentUser, subject, message);
      setStatus('success');
      setSubject('');
      setMessage('');
      setTimeout(() => setStatus('idle'), 3000);
    } catch (error) {
      console.error('Error submitting inquiry:', error);
      setStatus('error');
    }
  };

  return (
    <section className="space-y-6 animate-slide-in">
      <div className="card-gradient rounded-3xl p-6 border border-white/20">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-2xl">
            📬
          </div>
          <div>
            <h2 className="text-2xl font-bold text-yellow-400">Kotak Pertanyaan</h2>
            <p className="text-white/60 text-sm">Kirim pertanyaan atau masukanmu di sini</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-white/80 mb-2 font-medium">Subjek / Judul</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Contoh: Pertanyaan tentang Puasa"
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/30 text-white focus:outline-none focus:border-yellow-400 transition"
              required
            />
          </div>

          <div>
            <label className="block text-white/80 mb-2 font-medium">Pesan / Pertanyaan</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tulis pertanyaanmu di sini..."
              rows={5}
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/30 text-white focus:outline-none focus:border-yellow-400 transition resize-none"
              required
            />
          </div>

          <button
            type="submit"
            disabled={status === 'submitting'}
            className={`w-full py-4 font-bold rounded-xl transition transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer ${
              status === 'submitting'
                ? 'bg-gray-500 cursor-not-allowed'
                : 'golden-gradient text-gray-900 hover:opacity-90'
            }`}
          >
            {status === 'submitting' ? 'Mengirim...' : 'Kirim Pesan'}
          </button>

          {status === 'success' && (
            <div className="bg-emerald-500/20 text-emerald-300 p-4 rounded-xl text-center border border-emerald-500/30 animate-pulse">
              ✅ Pesan berhasil dikirim!
            </div>
          )}

          {status === 'error' && (
            <div className="bg-red-500/20 text-red-300 p-4 rounded-xl text-center border border-red-500/30">
              ❌ Gagal mengirim pesan. Silakan coba lagi.
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
