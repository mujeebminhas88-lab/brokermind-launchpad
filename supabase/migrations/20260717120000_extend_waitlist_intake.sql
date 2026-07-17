-- ============================================================
-- BrokerMindAI
-- Migration: extend waitlist for full landing-page intake
-- Description: adds the CRM-style fields the new premium landing page's
--   waitlist form collects (name, company, volume bucket, country, current
--   LOS/CRM, notes) plus a source tag and a constrained lifecycle status.
-- ============================================================

alter table public.waitlist
  add column if not exists name text,
  add column if not exists company text,
  add column if not exists monthly_volume text,
  add column if not exists country text,
  add column if not exists current_los_crm text,
  add column if not exists notes text,
  add column if not exists source text not null default 'landing-page';

-- Existing rows predate these required-on-the-form fields, so they stay
-- nullable at the database level; the landing page form enforces them.

alter table public.waitlist
  alter column status set default 'new';

alter table public.waitlist
  drop constraint if exists waitlist_status_check;
alter table public.waitlist
  add constraint waitlist_status_check
  check (status in ('new', 'contacted', 'demo-booked', 'converted'));

alter table public.waitlist
  drop constraint if exists waitlist_monthly_volume_check;
alter table public.waitlist
  add constraint waitlist_monthly_volume_check
  check (monthly_volume is null or monthly_volume in ('1-15', '16-60', '61-200', '200+'));

comment on column public.waitlist.source is 'Signup origin, e.g. landing-page.';
comment on column public.waitlist.status is 'CRM lifecycle: new, contacted, demo-booked, converted.';
comment on column public.waitlist.monthly_volume is 'Bucketed file volume: 1-15, 16-60, 61-200, 200+.';
