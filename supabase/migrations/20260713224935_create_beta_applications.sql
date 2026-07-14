-- ============================================================
-- BrokerMindAI
-- Migration: 001_create_beta_applications
-- Description: Initial beta applications schema
-- ============================================================

-- Required extension
create extension if not exists citext;

-- ============================================================
-- ENUMS
-- ============================================================

create type application_status as enum (
  'pending',
  'reviewing',
  'approved',
  'invited',
  'onboarded',
  'rejected'
);

create type industry_role as enum (
  'mortgage_broker',
  'mortgage_agent',
  'principal_broker',
  'brokerage_owner',
  'underwriter',
  'fulfillment_specialist',
  'operations_manager',
  'private_lender',
  'alternative_lender',
  'mic_representative',
  'business_development_manager',
  'other'
);

create type province_code as enum (
  'ON',
  'BC',
  'AB',
  'SK',
  'MB',
  'QC',
  'NS',
  'NB',
  'PE',
  'NL',
  'NT',
  'YT',
  'NU'
);

create type monthly_files_range as enum (
  '1_5',
  '6_15',
  '16_30',
  '31_50',
  '50_plus'
);

-- ============================================================
-- TABLE
-- ============================================================

create table public.beta_applications (

    id uuid primary key default gen_random_uuid(),

    first_name text not null,

    last_name text not null,

    email citext not null unique,

    phone text,

    organization_name text not null,

    industry_role industry_role not null,

    province province_code not null,

    expected_monthly_files monthly_files_range,

    primary_challenge text,

    accepted_terms boolean
        not null
        check (accepted_terms = true),

    consented_at timestamptz
        not null
        default now(),

    application_status application_status
        not null
        default 'pending',

    source text
        not null
        default 'website',

    utm_source text,
    utm_medium text,
    utm_campaign text,

    notes text,

    created_at timestamptz
        not null
        default now(),

    updated_at timestamptz
        not null
        default now()
);
