# Database Documentation

## Database Provider

Supabase PostgreSQL

---

## Naming Convention

- snake_case
- singular enums
- plural table names

Examples

beta_applications

future tables

users

organizations

documents

mortgages

lenders

---

## Current Enums

user_role

application_status

monthly_file_volume

---

## Current Tables

beta_applications

Purpose

Stores beta applications submitted through the launchpad.

---

## Rules

- UUID primary keys
- created_at on every table
- updated_at where required
- RLS enabled
- Case-insensitive email addresses (citext)
- Never modify production schema without a migration

---

## Future Tables

users

organizations

brokerages

documents

mortgages

lenders

audit_logs

ai_requests
