-- ============================================================
-- BrokerMindAI
-- Migration: create contact_messages
-- Description: backs the footer "Contact" form (name, email, message).
--   Reviewed manually, same as the waitlist — no auto-reply flow.
-- ============================================================

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email citext not null,
  message text not null,
  status text not null default 'new',
  created_at timestamptz not null default now()
);

alter table public.contact_messages
  drop constraint if exists contact_messages_status_check;
alter table public.contact_messages
  add constraint contact_messages_status_check
  check (status in ('new', 'read', 'replied'));

comment on table public.contact_messages is 'Submissions from the site-wide "Contact" form.';
