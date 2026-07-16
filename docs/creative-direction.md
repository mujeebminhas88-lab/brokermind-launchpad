# BrokerMindAI — Creative Direction Specification v1

Status: **Locked.** Agreed 2026-07-16. Single source of truth for the marketing site.
Future design decisions get measured against this document, not reinvented. Deviations
are proposed as amendments here, not as fresh ideas in the moment.

## 1. Core philosophy

**BrokerMindAI should not feel like AI software. It should feel like evidence becoming certainty.**

We are not visualizing AI. We are visualizing the work of underwriting — the same rigor a
meticulous professional already brings, made instant, made visible. Every visual decision
answers one question: *does this look like proof, or does it look like a demo?*

## 2. Explicitly banned

Glowing brains. Chat bubbles. Robots. Sparkles. Purple/cyan AI gradients. Floating glass
cards. Dashboards as the opening move. Feature-card-first layouts. Icon-plus-paragraph
explainers. Glowing node/network graphs. "AI-powered." "Intelligence" as a repeated noun.
Any animation that loops or resets without narrative reason. Ambient pulsing "liveness"
indicators used as decoration.

If an idea could appear unchanged on any other AI company's site, it doesn't belong here.

## 3. Site architecture

Two parts, cleanly separated:

**Part A — the opening sequence.** A bounded, cinematic, single-take experience: one
mortgage file, followed from intake to funded. Camera-driven, not section-stacked. This is
where the philosophy is most literal.

**Part B — the conventional site.** Pricing, trust, FAQ, footer. Fully standard:
jump-navigable, deep-linkable, back-button-safe, comparison-friendly, no captive narrative.
The visual language (ledger type, ink color, reference-tag styling) carries through, but
nothing here is bound by "must be watched once, nothing resets."

The opening sequence hands off to the conventional site at a defined, natural end point —
the pull-back reveal. It does not recur, loop, or gate scrolling past it.

## 4. The opening sequence

**Structure** — roughly six beats, no more:
1. **Intake** — the file appears. Still. A held beat before anything moves.
2. **Read** — marks begin appearing on the document: a check, a note, an underline. No
   spinner, no "processing" language — marks appear with the certainty of a conclusion
   already reached.
3. **Checked** — a real flag appears. Something doesn't reconcile. This beat is
   load-bearing: a flawless demo is less convincing than one visible catch.
4. **Reconciled** — the flag resolves via a cross-reference tag connecting to the document
   that confirms it (see §5).
5. **Cleared / stamped** — the file completes. One settle, one stamp. No bounce.
6. **Pull-back** — the camera moves back and the entire marked, cross-referenced document
   comes into frame for the first time. This is the only wide shot in the sequence.

**Camera discipline:** tight framing throughout beats 1–5. Never wide until beat 6. One
thing in focus at a time.

**Evidence discipline:** nothing made in an earlier beat disappears. It's out of frame, not
erased. The pull-back is only powerful because everything before it was actually preserved,
not replayed.

**Non-linear entry:** a small, always-visible control lets any visitor skip straight to the
completed record (Part B) without watching the sequence. Required for repeat visitors and
anyone who arrives mid-scroll or via a direct link — the sequence must never be the only
way in.

**Session boundary:** a fresh page load is a fresh file. "Nothing resets" applies within
one continuous read, not across visits.

## 5. The cross-reference system

The mechanism that replaces node graphs entirely. A verified detail gets a small mono
reference tag (e.g. `→2`), the same notation real reconciliation work already uses. When
attention lands on a tag, exactly one thin line draws once from that mark to the specific
thing it depends on, and that related document comes forward while the rest recede. Never
more than one connection drawn at a time. The tag system, not a diagram, is the entire
"connected system" story — it just needs to be seen from far enough back (the pull-back) to
read as a whole.

## 6. Motion language

One signature: **the settle.** Anything that appears drops slightly and stops — no bounce,
no glow-in, no spring overshoot. This applies everywhere, not just the opening sequence.

No ambient looping animation anywhere on the site. If something must repeat (a timestamp, a
status), it ticks in discrete steps, like a clock — it never pulses like a heartbeat.

Confidence, not excitement. Motion should read as *done*, never as *look at me*.

## 7. Typography & visual language

Type carries the interface. No icon-plus-paragraph cards, anywhere on the site. Numbers,
checkmarks, brackets, reference tags — set in a ledger-precise mono — are the dominant
visual texture, closer to a bank statement or a flight board than a UI kit.

The accent color (emerald) is not "AI glow." It is **ink** — the color of a verification
mark or a stamp.

## 8. Part B: the conventional site

Standard, accessible, comparison-friendly. Pricing is a ledger — aligned mono figures, not
gradient cards. Trust is the literal audit trail of the file just witnessed, not a badge
row. FAQ is plain and typographic. Footer is standard. Nothing here needs to be clever; it
needs to be usable. The one rule inherited from Part A: no icon-first explainers, no
looping ambient motion, ink not glow.

## 9. Accessibility — a first-class path, not a fallback

Reduced-motion and screen-reader visitors do not get a degraded version of the camera
sequence. They get the *same content* — the file, its marks, its reconciliations, the
completed record — presented from first render as a static, linear, fully legible document.
This path is designed alongside the cinematic one, not bolted on after.

## 10. Language & voice

Describe the action, not the mechanism. *"Every figure is checked against the file. Every
gap is marked."* Not "AI-powered analysis." No institution that actually trusts its own
rigor needs to call it exciting.

## 11. The test for every future decision

- Does this look like proof, or does it look like a demo?
- Would a real underwriter recognize this gesture?
- Is this evidence, or is it decoration?
- Could this same idea appear unchanged on any other AI company's site? *(If yes, cut it.)*
- Is this the opening sequence's job, or is it trying to make Part B cinematic when it
  should just be usable?

---

## Appendix: Opening Sequence Prototype — implementation notes

A disposable, isolated prototype validating this experience lives at the `/opening` route
(`src/routes/opening.tsx`, `src/components/opening/`) — explicitly not production code, not
responsive, not accessible yet (see §9 — that's a deliberate later pass, not an oversight).
It does not touch the existing site at `/`.

- **Document structure**: one large fixed-coordinate "stage" (`src/components/opening/openingConfig.ts`
  defines `STAGE_W/H`, `DOCS`, `MARKS`, `CONNECTOR`, `STAMP`, `CAMERA_SHOTS`) — real HTML/CSS
  paper documents, not images, so marks can anchor to exact coordinates and text stays sharp
  at any zoom.
- **Camera**: a CSS transform (`translate` + `scale`) on the stage, driven by Framer Motion's
  `useScroll` + `useTransform` across a `600vh` scroll track with a `position: sticky`
  viewport. Six authored shots with explicit hold/move keyframes (see the timing table below).
- **Cross-reference**: one SVG line, `pathLength`-animated, drawn once between the flagged
  down-payment row (loan application) and the matching gift-deposit row (bank statement) —
  the only connector in the sequence, per §5.
- **Library**: started with Framer Motion (already a project dependency). Not locked — GSAP +
  ScrollTrigger is the fallback if the six-shot sequencing outgrows it (see plan file history
  for the full reasoning).
- **Known open item**: coordinates (document row positions, mark anchors, camera shot
  centers) are hand-estimated from a first pass and will need visual tuning — this was
  flagged as a risk before building, not discovered after.
- **Verification status**: camera transform math confirmed correct via direct DOM/computed-style
  inspection (translate/scale values match the formula exactly at multiple scroll depths).
  The felt pacing/experience has not yet been confirmed end-to-end by a human — screenshot
  tooling was unreliable during the build session. Needs a live human pass before further
  iteration.

### Experience timing (relative allocation of the 600vh track)

| Beat | Share | Notes |
|---|---|---|
| Opening stillness | ~10% | Hold on the untouched document before anything moves |
| Read | ~30% | Marks appear one at a time, uneven spacing, brief hold between each |
| The flag | ~10% | Held longer than any other single mark — the one moment of tension |
| Reconciliation | ~15% | Connector line drawn at a traceable rate, not instant |
| Stamp | ~10% | Fastest, hardest beat — no wind-up, then a full stop before pull-back |
| Pull-back | ~20% | Slowest, most spacious movement — the reward |
| Closing stillness | ~5% | Holds, no auto-continuation |
