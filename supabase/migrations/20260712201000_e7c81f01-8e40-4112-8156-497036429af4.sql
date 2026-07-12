
ALTER TABLE public.leads
  ADD COLUMN IF NOT EXISTS session_id text,
  ADD COLUMN IF NOT EXISTS traffic_source text,
  ADD COLUMN IF NOT EXISTS utm_medium text,
  ADD COLUMN IF NOT EXISTS utm_campaign text,
  ADD COLUMN IF NOT EXISTS utm_content text,
  ADD COLUMN IF NOT EXISTS utm_term text,
  ADD COLUMN IF NOT EXISTS gclid text,
  ADD COLUMN IF NOT EXISTS referrer text,
  ADD COLUMN IF NOT EXISTS landing_page text,
  ADD COLUMN IF NOT EXISTS landed_at timestamptz,
  ADD COLUMN IF NOT EXISTS email_submitted_at timestamptz,
  ADD COLUMN IF NOT EXISTS quiz_completed_at timestamptz,
  ADD COLUMN IF NOT EXISTS paywall_reached_at timestamptz;

CREATE UNIQUE INDEX IF NOT EXISTS leads_session_id_uniq
  ON public.leads (session_id) WHERE session_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS leads_traffic_source_idx ON public.leads (traffic_source);
CREATE INDEX IF NOT EXISTS leads_gclid_idx ON public.leads (gclid);
