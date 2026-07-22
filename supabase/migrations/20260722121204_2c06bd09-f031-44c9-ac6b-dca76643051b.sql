-- Knowledge base fields for tala_responses: a friendly admin-facing label,
-- an optional grouping topic (matches the CSV template's `topic` column),
-- and an enabled flag so entries can be turned off without deleting them.
ALTER TABLE public.tala_responses ADD COLUMN IF NOT EXISTS topic TEXT;
ALTER TABLE public.tala_responses ADD COLUMN IF NOT EXISTS label TEXT;
ALTER TABLE public.tala_responses ADD COLUMN IF NOT EXISTS enabled BOOLEAN NOT NULL DEFAULT true;
