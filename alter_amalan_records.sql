-- Add puasa and sahur columns to amalan_records table
ALTER TABLE amalan_records 
ADD COLUMN IF NOT EXISTS puasa BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS sahur BOOLEAN DEFAULT FALSE;
