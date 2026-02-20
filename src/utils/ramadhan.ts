import { AmalanRecord, StudentRank } from '../types';
import { students } from '../data/students';
import { supabase } from '../lib/supabase';

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
  try {
    const { data, error } = await supabase
      .from('amalan_records')
      .select('*');
      
    if (error) {
      console.error("Error fetching records:", error);
      return [];
    }
    return data || [];
  } catch (e) {
    console.error("Failed to load data", e);
    return [];
  }
};

export const getUserRecords = async (studentName: string): Promise<AmalanRecord[]> => {
  try {
    const { data, error } = await supabase
      .from('amalan_records')
      .select('*')
      .eq('student_name', studentName);
      
    if (error) {
      console.error("Error fetching user records:", error);
      return [];
    }
    return data || [];
  } catch (e) {
    console.error("Failed to load user data", e);
    return [];
  }
};

export const saveRecord = async (record: AmalanRecord) => {
  try {
    const { error } = await supabase
      .from('amalan_records')
      .upsert(record, { onConflict: 'student_name, day' });
      
    if (error) {
      console.error("Error saving record:", error);
      throw error;
    }
  } catch (e) {
    console.error("Failed to save data", e);
    throw e;
  }
};

export const getRecord = async (studentName: string, day: number): Promise<AmalanRecord | undefined> => {
  try {
    const { data, error } = await supabase
      .from('amalan_records')
      .select('*')
      .eq('student_name', studentName)
      .eq('day', day)
      .single();
      
    if (error && error.code !== 'PGRST116') { // PGRST116 is "Row not found"
      console.error("Error fetching record:", error);
    }
    
    return data || undefined;
  } catch (e) {
    console.error("Failed to get record", e);
    return undefined;
  }
};

export const getTotalExp = async (studentName: string): Promise<number> => {
  try {
    const { data, error } = await supabase
      .from('amalan_records')
      .select('total_exp')
      .eq('student_name', studentName);
      
    if (error) {
      console.error("Error calculating total exp:", error);
      return 0;
    }
    
    return data?.reduce((sum, r) => sum + (r.total_exp || 0), 0) || 0;
  } catch (e) {
    console.error("Failed to get total exp", e);
    return 0;
  }
};

export const getLeaderboard = async (): Promise<StudentRank[]> => {
  try {
    const { data: records, error } = await supabase
      .from('amalan_records')
      .select('student_name, total_exp');

    if (error) {
      console.error("Error fetching leaderboard data:", error);
      return [];
    }

    const expMap = new Map<string, number>();
    
    // Initialize with 0
    students.forEach(s => expMap.set(s, 0));
    
    // Add actual exp
    records?.forEach(r => {
      const current = expMap.get(r.student_name) || 0;
      expMap.set(r.student_name, current + (r.total_exp || 0));
    });

    return Array.from(expMap.entries())
      .map(([name, exp]) => ({ name, exp }))
      .sort((a, b) => b.exp - a.exp);
  } catch (e) {
    console.error("Failed to get leaderboard", e);
    return [];
  }
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
