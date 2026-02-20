
import { supabase } from '../src/lib/supabase';

async function reset() {
  console.log('Attempting to reset leaderboard via API...');
  
  // Try to delete all records
  // We use a condition that is always true for valid records (day > 0)
  const { error, count } = await supabase
    .from('amalan_records')
    .delete()
    .gt('day', 0);
    
  if (error) {
    console.error('Failed to reset via API (likely due to RLS policies):', error.message);
    console.log('Please run the SQL command in reset_leaderboard.sql in your Supabase Dashboard.');
    process.exit(1);
  }
  
  console.log(`Success! Deleted ${count} records.`);
}

reset();
