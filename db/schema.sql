bun add @supabase/supabase-js-- SQL schema for Student-management
-- This file includes example CREATE TABLE statements for PostgreSQL and SQLite.
-- Pick the section that matches your target database and run it there.

-- ==========================
-- PostgreSQL schema (recommended for production)
-- ==========================

-- Create extension for UUID if you'd like UUID primary keys
-- CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS students (
  id TEXT PRIMARY KEY,
  student_id TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT,
  address TEXT,
  date_of_birth DATE,
  major TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Optional index to speed up common lookups
CREATE INDEX IF NOT EXISTS idx_students_student_id ON students (student_id);
CREATE INDEX IF NOT EXISTS idx_students_name ON students (lower(name));

-- Trigger to keep updated_at current (Postgres)
-- You can create a trigger function to update "updated_at" on row changes.
-- Example:
-- CREATE OR REPLACE FUNCTION update_updated_at_column()
-- RETURNS TRIGGER AS $$
-- BEGIN
--   NEW.updated_at = now();
--   RETURN NEW;
-- END;
-- $$ language 'plpgsql';
--
-- CREATE TRIGGER trg_update_students_updated_at
-- BEFORE UPDATE ON students
-- FOR EACH ROW
-- EXECUTE PROCEDURE update_updated_at_column();


-- ==========================
-- SQLite schema (single-file / local dev)
-- ==========================
-- Note: SQLite doesn't have a native DATE type; use TEXT (ISO 8601) or INTEGER (unix epoch)

-- CREATE TABLE students (
--   id TEXT PRIMARY KEY,
--   student_id TEXT NOT NULL UNIQUE,
--   name TEXT NOT NULL,
--   email TEXT NOT NULL UNIQUE,
--   phone TEXT,
--   address TEXT,
--   date_of_birth TEXT,
--   major TEXT,
--   created_at TEXT DEFAULT (datetime('now')),
--   updated_at TEXT DEFAULT (datetime('now'))
-- );

-- CREATE INDEX idx_students_student_id ON students (student_id);
-- CREATE INDEX idx_students_name ON students (name);


-- ==========================
-- MySQL example (if needed)
-- ==========================
-- CREATE TABLE `students` (
--   `id` varchar(255) NOT NULL,
--   `student_id` varchar(255) NOT NULL UNIQUE,
--   `name` varchar(255) NOT NULL,
--   `email` varchar(255) NOT NULL UNIQUE,
--   `phone` varchar(50) DEFAULT NULL,
--   `address` text DEFAULT NULL,
--   `date_of_birth` date DEFAULT NULL,
--   `major` varchar(255) DEFAULT NULL,
--   `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
--   `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
--   PRIMARY KEY (`id`)
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ==========================
-- Notes
-- - The application currently stores `id` as a string (Date.now().toString()). The schema uses TEXT/varchar to accept that.
-- - For production, consider switching to UUIDs or database-generated IDs and update the client logic accordingly.
-- - To migrate data from localStorage to a DB, export JSON (the app already supports export) and import into the DB.
-- ==========================
