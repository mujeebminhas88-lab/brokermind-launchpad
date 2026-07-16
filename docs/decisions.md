# Architecture Decisions

## ADR-001

Date: 2026-07-14

Decision

Separate the Launchpad from the main BrokerMindAI application.

Reason

- Independent deployments
- Reduced complexity
- Different release cycles
- Marketing site remains lightweight

Status

Accepted

---

## ADR-001a

Date: 2026-07-16

Decision

Lock the Creative Direction Specification (`docs/creative-direction.md`) as the single
source of truth for the marketing site: a bounded cinematic "opening sequence" (one
mortgage file, camera-driven, evidence-persists, cross-reference tags instead of node
graphs) handing off to a conventional, accessible Part B for pricing/trust/FAQ/footer.
Supersedes the earlier dashboard-first / dark-console redesign at `/`.

Reason

- The dashboard-first direction was rejected as generic ("looks like every other AI SaaS
  site")
- Full rationale, banned patterns, and the opening-sequence spec live in
  `docs/creative-direction.md`
- A disposable prototype validating the opening sequence lives at the `/opening` route,
  isolated from the existing site

Status

Accepted — prototype built, pending human review of the felt experience

---

## ADR-002

Decision

Use Supabase as the backend.

Reason

- PostgreSQL
- Authentication
- Edge Functions
- Realtime
- Excellent TypeScript support

Status

Accepted

---

## ADR-003

Decision

Use Claude as the primary AI model.

Reason

- Strong reasoning
- Large context window
- Better document analysis
- Cost-effective for long-form processing

Status

Accepted
