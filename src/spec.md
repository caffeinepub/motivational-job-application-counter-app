# Specification

## Summary
**Goal:** Provide a calm, motivating app to track job applications with a simple counter and per-application log that persists per signed-in Internet Identity user.

**Planned changes:**
- Build a home screen showing the total applications count and a single primary button to increment by 1 with instant UI update.
- Add lightweight application logging (timestamp required; optional company, role, notes) and show a newest-first recent entries list with delete support.
- Persist entries (and derived total) in a single Motoko backend actor keyed by the signed-in principal; expose methods to fetch, add, and delete entries.
- Add motivation UI: encouraging message that changes by count ranges and a “next milestone” indicator.
- Apply a coherent calm visual theme with consistent layout across views, avoiding a blue/purple-dominant palette.
- Add a generated hero illustration as a static frontend asset and display it responsively on the home screen.

**User-visible outcome:** Users can sign in, see their total job applications, log a new application with optional details, view and delete recent entries, and get encouraging messages and milestone progress that persist across sessions.
