-- Edumax Global College — applications table
-- Run this once in the Supabase SQL editor:
-- https://supabase.com/dashboard/project/fifpiiyksrumbkqilcqw/sql/new

CREATE TABLE IF NOT EXISTS public.applications (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at       TIMESTAMPTZ NOT NULL DEFAULT now(),

  -- Student details
  first_name       TEXT NOT NULL,
  last_name        TEXT NOT NULL,
  dob              DATE NOT NULL,
  gender           TEXT NOT NULL,
  nationality      TEXT,
  id_number        TEXT,

  -- Academic details
  form_level       TEXT NOT NULL,
  stream           TEXT,
  prev_school      TEXT NOT NULL,
  prev_grade       TEXT,
  start_term       TEXT NOT NULL,
  additional_needs TEXT,

  -- Parent / Guardian details
  guardian_name    TEXT NOT NULL,
  relationship     TEXT NOT NULL,
  guardian_phone   TEXT NOT NULL,
  guardian_alt     TEXT,
  guardian_email   TEXT,
  address          TEXT NOT NULL,

  -- Admin status
  status           TEXT NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'reviewed', 'accepted', 'rejected'))
);

-- Enable Row Level Security
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;

-- Allow anonymous users to INSERT (public application form)
CREATE POLICY "allow_public_insert" ON public.applications
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

-- Only service role can SELECT all applications
CREATE POLICY "allow_service_role_select" ON public.applications
  FOR SELECT TO service_role
  USING (true);

-- Only service role can UPDATE status
CREATE POLICY "allow_service_role_update" ON public.applications
  FOR UPDATE TO service_role
  USING (true)
  WITH CHECK (true);
