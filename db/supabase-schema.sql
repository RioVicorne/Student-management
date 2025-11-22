-- Supabase Database Schema for Student Management Dashboard
-- Run this SQL in your Supabase SQL Editor

-- Create the students table with all required fields
CREATE TABLE IF NOT EXISTS students (
  id TEXT PRIMARY KEY,
  student_id TEXT NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  date_of_birth DATE,
  gender TEXT CHECK (gender IN ('Male', 'Female')),
  faculty TEXT,
  class TEXT,
  status TEXT CHECK (status IN ('Active', 'Graduated', 'Suspended')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_students_student_id ON students (student_id);
CREATE INDEX IF NOT EXISTS idx_students_name ON students (lower(full_name));
CREATE INDEX IF NOT EXISTS idx_students_email ON students (lower(email));
CREATE INDEX IF NOT EXISTS idx_students_status ON students (status);
CREATE INDEX IF NOT EXISTS idx_students_class ON students (class);
CREATE INDEX IF NOT EXISTS idx_students_created_at ON students (created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE students ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (adjust based on your authentication needs)
-- For now, allowing public access - you should restrict this in production!

-- Allow anyone to read students
CREATE POLICY "Allow public read access"
  ON students FOR SELECT
  USING (true);

-- Allow anyone to insert students
CREATE POLICY "Allow public insert access"
  ON students FOR INSERT
  WITH CHECK (true);

-- Allow anyone to update students
CREATE POLICY "Allow public update access"
  ON students FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- Allow anyone to delete students
CREATE POLICY "Allow public delete access"
  ON students FOR DELETE
  USING (true);

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to update updated_at on row changes
CREATE TRIGGER trg_update_students_updated_at
  BEFORE UPDATE ON students
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- Notes:
-- ============================================
-- 1. This schema matches your TypeScript Student interface in StudentManagementTable.tsx
-- 2. RLS policies are set to allow public access for development
-- 3. For production, you should:
--    - Add authentication (Supabase Auth)
--    - Restrict policies based on authenticated users
--    - Consider adding user_id column for ownership
-- 4. To restrict access, modify policies like:
--    CREATE POLICY "Only authenticated users can insert"
--      ON students FOR INSERT
--      WITH CHECK (auth.role() = 'authenticated');
-- ============================================

