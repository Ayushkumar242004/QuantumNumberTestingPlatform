import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://ijbpavatphiwloeasmsx.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlqYnBhdmF0cGhpd2xvZWFzbXN4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg2ODU2MTcsImV4cCI6MjA2NDI2MTYxN30.2KYlVcuVN3z1Qz5a9DyxYcpYJKFav02gpixWJooSrA0';


export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);