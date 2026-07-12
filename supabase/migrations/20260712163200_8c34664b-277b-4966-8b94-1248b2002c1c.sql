ALTER TABLE public.payments ADD CONSTRAINT payments_stripe_object_id_unique UNIQUE (stripe_object_id);
CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS pg_net;