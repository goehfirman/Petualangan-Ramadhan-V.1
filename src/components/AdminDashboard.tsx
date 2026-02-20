import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { getAllRecords } from '../utils/ramadhan';
import { students } from '../data/students';
import { AmalanRecord } from '../types';

interface AdminDashboardProps {
  onLogout: () => void;
}

interface StudentSummary {
  name: string;
  totalExp: number;
  totalQuranPages: number;
  daysFilled: number;
}

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [summaries, setSummaries] = useState<StudentSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [allRecords, setAllRecords] = useState<AmalanRecord[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const records = await getAllRecords();
        setAllRecords(records);

        const summaryMap = new Map<string, StudentSummary>();

        // Initialize all students with 0
        students.forEach(student => {
          summaryMap.set(student, {
            name: student,
            totalExp: 0,
            totalQuranPages: 0,
            daysFilled: 0
          });
        });

        // Aggregate data
        records.forEach(record => {
          const summary = summaryMap.get(record.student_name);
          if (summary) {
            summary.totalExp += (record.total_exp || 0);
            summary.totalQuranPages += (record.quran_pages || 0);
            summary.daysFilled += 1;
          }
        });

        setSummaries(Array.from(summaryMap.values()).sort((a, b) => b.totalExp - a.totalExp));
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const downloadIndividualReport = (studentName: string) => {
    const doc = new jsPDF();
    const studentRecords = allRecords.filter(r => r.student_name === studentName).sort((a, b) => a.day - b.day);
    const summary = summaries.find(s => s.name === studentName);

    // Header
    doc.setFontSize(18);
    doc.text('Laporan Amalan Ramadhan', 14, 22);
    doc.setFontSize(12);
    doc.text(`Nama Siswa: ${studentName}`, 14, 32);
    doc.text(`Total EXP: ${summary?.totalExp || 0}`, 14, 38);
    doc.text(`Total Halaman Quran: ${summary?.totalQuranPages || 0}`, 14, 44);
    doc.text(`Hari Terisi: ${summary?.daysFilled || 0} / 30`, 14, 50);

    // Table
    const tableData = studentRecords.map(record => [
      `Hari ke-${record.day}`,
      record.sholat_subuh ? (record.sholat_subuh === 'jamaah' ? 'Jamaah' : 'Munfarid') : '-',
      record.sholat_dzuhur ? (record.sholat_dzuhur === 'jamaah' ? 'Jamaah' : 'Munfarid') : '-',
      record.sholat_ashar ? (record.sholat_ashar === 'jamaah' ? 'Jamaah' : 'Munfarid') : '-',
      record.sholat_maghrib ? (record.sholat_maghrib === 'jamaah' ? 'Jamaah' : 'Munfarid') : '-',
      record.sholat_isya ? (record.sholat_isya === 'jamaah' ? 'Jamaah' : 'Munfarid') : '-',
      record.sholat_tarawih ? (record.sholat_tarawih === 'jamaah' ? 'Jamaah' : 'Munfarid') : '-',
      record.quran_pages || 0,
      record.total_exp || 0
    ]);

    autoTable(doc, {
      startY: 60,
      head: [['Hari', 'Subuh', 'Dzuhur', 'Ashar', 'Maghrib', 'Isya', 'Tarawih', 'Quran (Hal)', 'EXP']],
      body: tableData,
    });

    doc.save(`Laporan_${studentName.replace(/\s+/g, '_')}.pdf`);
  };

  const downloadClassReport = () => {
    const doc = new jsPDF();
    
    // Header
    doc.setFontSize(18);
    doc.text('Laporan Kelas - Petualangan Ramadhan', 14, 22);
    doc.setFontSize(12);
    doc.text(`Total Siswa: ${students.length}`, 14, 32);
    doc.text(`Tanggal Cetak: ${new Date().toLocaleDateString('id-ID')}`, 14, 38);

    // Table
    const tableData = summaries.map((s, index) => [
      index + 1,
      s.name,
      s.daysFilled,
      s.totalQuranPages,
      s.totalExp
    ]);

    autoTable(doc, {
      startY: 50,
      head: [['No', 'Nama Siswa', 'Hari Terisi', 'Total Halaman Quran', 'Total EXP']],
      body: tableData,
    });

    doc.save('Laporan_Kelas_Ramadhan.pdf');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-400"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 font-poppins">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-yellow-400">Admin Dashboard</h1>
            <p className="text-gray-400">Overview Amalan Siswa</p>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={downloadClassReport}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition"
            >
              📄 Download Laporan Kelas
            </button>
            <button 
              onClick={onLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition"
            >
              🚪 Keluar
            </button>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl overflow-hidden shadow-xl border border-gray-700">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-700 text-gray-300 uppercase text-sm">
                <tr>
                  <th className="px-6 py-4">Peringkat</th>
                  <th className="px-6 py-4">Nama Siswa</th>
                  <th className="px-6 py-4 text-center">Hari Terisi</th>
                  <th className="px-6 py-4 text-center">Halaman Quran</th>
                  <th className="px-6 py-4 text-center">Total EXP</th>
                  <th className="px-6 py-4 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {summaries.map((student, index) => (
                  <tr key={student.name} className="hover:bg-gray-700/50 transition">
                    <td className="px-6 py-4 font-medium text-gray-400">#{index + 1}</td>
                    <td className="px-6 py-4 font-medium text-white">{student.name}</td>
                    <td className="px-6 py-4 text-center text-blue-300">{student.daysFilled} / 30</td>
                    <td className="px-6 py-4 text-center text-amber-300">{student.totalQuranPages}</td>
                    <td className="px-6 py-4 text-center font-bold text-yellow-400">{student.totalExp}</td>
                    <td className="px-6 py-4 text-center">
                      <button 
                        onClick={() => downloadIndividualReport(student.name)}
                        className="text-sm bg-blue-600/20 hover:bg-blue-600/40 text-blue-300 px-3 py-1 rounded border border-blue-500/30 transition"
                      >
                        ⬇️ PDF
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
