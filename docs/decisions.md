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
