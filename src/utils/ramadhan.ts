import { AmalanRecord, StudentRank } from '../types';
import { students } from '../data/students';

const STORAGE_KEY = 'ramadhan_records';
const INQUIRY_STORAGE_KEY = 'ramadhan_inquiries';

const getLocalRecords = (): AmalanRecord[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

const setLocalRecords = (records: AmalanRecord[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
};

const getLocalInquiries = (): any[] => {
  const data = localStorage.getItem(INQUIRY_STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

const setLocalInquiries = (inquiries: any[]) => {
  localStorage.setItem(INQUIRY_STORAGE_KEY, JSON.stringify(inquiries));
};

export const calculateExp = (record: Partial<AmalanRecord>): number => {
  let exp = 0;
  
  const sholatPoints = (type: 'jamaah' | 'munfarid' | null) => {
    if (type === 'jamaah') return 15;
    if (type === 'munfarid') return 10;
    return 0;
  };

  exp += sholatPoints(record.sholat_subuh || null);
  exp += sholatPoints(record.sholat_dzuhur || null);
  exp += sholatPoints(record.sholat_ashar || null);
  exp += sholatPoints(record.sholat_maghrib || null);
  exp += sholatPoints(record.sholat_isya || null);
  exp += sholatPoints(record.sholat_tarawih || null);

  if (record.sahur) exp += 10;
  if (record.puasa) exp += 15;
  if (record.sholat_dhuha) exp += 10;
  if (record.infaq) exp += 15;
  if (record.dzikir) exp += 15;
  if (record.itikaf) exp += 15;
  
  // Tausiyah +20 EXP if intisari is filled
  if (record.tausiyah_intisari && record.tausiyah_intisari.trim().length > 0) {
    exp += 20;
  }

  exp += (record.quran_pages || 0) * 10;

  return exp;
};

export const getRamadhanDay = (): number => {
  // 19 Feb 2026 is 1 Ramadhan 1447 H
  const ramadhanStart = new Date(2026, 1, 19); 
  const now = new Date();
  
  // Reset hours to compare just dates (local time)
  const start = new Date(ramadhanStart);
  start.setHours(0, 0, 0, 0);
  
  const current = new Date(now);
  current.setHours(0, 0, 0, 0);
  
  const diffTime = current.getTime() - start.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  // If before start, return 1 (default to day 1)
  if (diffDays < 0) return 1;
  
  return diffDays + 1;
};

export const getAllRecords = async (): Promise<AmalanRecord[]> => {
  return getLocalRecords();
};

export const getUserRecords = async (studentName: string): Promise<AmalanRecord[]> => {
  const records = getLocalRecords();
  return records.filter(r => r.student_name === studentName);
};

export const saveRecord = async (record: AmalanRecord) => {
  const records = getLocalRecords();
  const index = records.findIndex(r => r.student_name === record.student_name && r.day === record.day);
  
  if (index >= 0) {
    records[index] = { ...record, updated_at: new Date().toISOString() };
  } else {
    records.push({ ...record, updated_at: new Date().toISOString() });
  }
  
  setLocalRecords(records);
};

export const getRecord = async (studentName: string, day: number): Promise<AmalanRecord | undefined> => {
  const records = getLocalRecords();
  return records.find(r => r.student_name === studentName && r.day === day);
};

export const getTotalExp = async (studentName: string): Promise<number> => {
  const records = getLocalRecords();
  return records
    .filter(r => r.student_name === studentName)
    .reduce((sum, r) => sum + (r.total_exp || 0), 0);
};

export const getLeaderboard = async (): Promise<StudentRank[]> => {
  const records = getLocalRecords();
  const expMap = new Map<string, number>();
  
  // Initialize with 0
  students.forEach(s => expMap.set(s, 0));
  
  // Add actual exp
  records.forEach(r => {
    const current = expMap.get(r.student_name) || 0;
    expMap.set(r.student_name, current + (r.total_exp || 0));
  });

  return Array.from(expMap.entries())
    .map(([name, exp]) => ({ name, exp }))
    .sort((a, b) => b.exp - a.exp);
};

export const getDateFromRamadhanDay = (day: number): Date => {
  const ramadhanStart = new Date(2026, 1, 19);
  const targetDate = new Date(ramadhanStart);
  targetDate.setDate(ramadhanStart.getDate() + (day - 1));
  return targetDate;
};

export const convertToHijri = (date: Date): string => {
  const anchorDate = new Date(2026, 1, 19); // 19 Feb 2026 = 1 Ramadhan
  anchorDate.setHours(0, 0, 0, 0);
  
  const targetDate = new Date(date);
  targetDate.setHours(0, 0, 0, 0);
  
  const diffTime = targetDate.getTime() - anchorDate.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  // Calculate Ramadhan day
  const ramadhanDay = diffDays + 1;
  
  // If within reasonable Ramadhan range (e.g. 1-30), return specific format
  if (ramadhanDay >= 1 && ramadhanDay <= 30) {
    return `${ramadhanDay} Ramadhan 1447 H`;
  }
  
  // Fallback for other dates (approximate)
  const J = Math.floor((11 * date.getFullYear() + 3) / 30);
  const K = Math.floor((date.getMonth() + 1) * 3.6 - 0.5) + Math.floor(date.getDate() / 10.875);
  let H = (date.getFullYear() - 1970) * 365 + Math.floor((date.getFullYear() - 1969) / 4) - Math.floor((date.getFullYear() - 1901) / 100) + Math.floor((date.getFullYear() - 1601) / 400) + date.getDate() + K - J - 1948440;
  
  let N = H + 1;
  let Q = Math.floor(N / 10631);
  N = N % 10631;
  let R = Math.floor(N / 30);
  let S = N % 30;
  
  const hijriYear = Q * 30 + R + 1;
  const hijriMonth = Math.floor((S * 11 + 3) / 325) + 1;
  const hijriDay = S - Math.floor((hijriMonth * 325 - 3) / 11) + 1;
  
  const monthsHijri = ['Muh', 'Saf', 'R.Aw', 'R.Akh', 'Jum.Aw', 'Jum.Akh', 'Raj', 'Sha', 'Ram', 'Syaw', 'Dhu.Q', 'Dhu.H'];
  const monthName = monthsHijri[hijriMonth - 1] || '';
  
  return `${hijriDay} ${monthName} ${hijriYear} H`;
};

export const saveInquiry = async (studentName: string, subject: string, message: string) => {
  const inquiries = getLocalInquiries();
  inquiries.push({
    student_name: studentName,
    subject,
    message,
    created_at: new Date().toISOString()
  });
  setLocalInquiries(inquiries);
};

export const getAllInquiries = async (): Promise<any[]> => {
  return getLocalInquiries();
};
