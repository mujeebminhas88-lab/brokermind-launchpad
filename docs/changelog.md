# Changelog

All notable changes to BrokerMindAI will be documented here.

---

## 2026

### July

#### 19 July

- Removed all remaining build-time dependencies on the previous hosted
  platform (vite config wrapper, dev-sandbox plugins, error-reporting hook)
- Rewrote `vite.config.ts` as a plain TanStack Start + Vite config targeting
  the Vercel nitro preset
- Standardized Supabase env vars on `VITE_SUPABASE_URL` /
  `VITE_SUPABASE_ANON_KEY` (client) and `SUPABASE_URL` / `SUPABASE_ANON_KEY` /
  `SUPABASE_SERVICE_ROLE_KEY` (server)
- Regenerated the lockfile from the public npm registry

#### 14 July

- Migrated away from the previous hosted-platform-managed architecture
- Introduced manual development workflow
- Created engineering documentation
- Established project roadmap
- Created beta application schema
- Connected Launchpad to Supabase
