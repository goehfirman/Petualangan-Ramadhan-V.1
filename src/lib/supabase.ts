
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lcaraiuuptnpfkiqhxmq.supabase.co';
const supabaseKey = 'sb_publishable_0rbBv0zW_uHHyJLgwrn4yQ_u-Dn-XAt';

export const supabase = createClient(supabaseUrl, supabaseKey);
