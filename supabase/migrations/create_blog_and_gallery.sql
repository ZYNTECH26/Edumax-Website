-- Edumax Global College — blog & gallery tables
-- Run this once in the Supabase SQL editor (or via the direct Postgres connection):
-- https://supabase.com/dashboard/project/fifpiiyksrumbkqilcqw/sql/new

CREATE TABLE IF NOT EXISTS public.blog_posts (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  title       TEXT NOT NULL,
  excerpt     TEXT NOT NULL DEFAULT '',
  content     TEXT NOT NULL DEFAULT '',
  category    TEXT NOT NULL DEFAULT 'General',
  author      TEXT NOT NULL DEFAULT 'Edumax Admin',
  image_url   TEXT,
  published   BOOLEAN NOT NULL DEFAULT false
);

ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Public site: only published posts are visible
CREATE POLICY "public_read_published_posts" ON public.blog_posts
  FOR SELECT TO anon, authenticated
  USING (published = true);

-- All writes (including reading drafts) go through the Edge Function's
-- service-role client, gated on a verified dashboard admin — see index.tsx.
CREATE POLICY "service_role_all_posts" ON public.blog_posts
  FOR ALL TO service_role
  USING (true) WITH CHECK (true);

CREATE TABLE IF NOT EXISTS public.gallery_items (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  url         TEXT NOT NULL,
  alt         TEXT NOT NULL DEFAULT '',
  caption     TEXT NOT NULL DEFAULT ''
);

ALTER TABLE public.gallery_items ENABLE ROW LEVEL SECURITY;

-- Public site: gallery is fully public to view
CREATE POLICY "public_read_gallery" ON public.gallery_items
  FOR SELECT TO anon, authenticated
  USING (true);

CREATE POLICY "service_role_all_gallery" ON public.gallery_items
  FOR ALL TO service_role
  USING (true) WITH CHECK (true);

DO $$ BEGIN RAISE NOTICE '✅ blog_posts and gallery_items created'; END $$;
