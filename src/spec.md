# Specification

## Summary
**Goal:** Let signed-in users configure and receive in-app reminders, and add a lightweight “keep the fire on” motivational animation on the Home screen with a brief celebratory state after logging an application.

**Planned changes:**
- Add a Reminder Settings UI (reachable from the main authenticated experience) to enable/disable reminders and set a simple schedule (daily + time of day), with English-only user-facing text and mobile-friendly layout.
- Persist reminder settings per signed-in user in the Motoko backend, with read/update methods and access control matching existing per-user data patterns.
- Implement reminder delivery while the app is open: schedule prompts based on saved time-of-day; optionally use the browser Notification API when permission is granted; otherwise fall back to an in-app banner/dialog without errors.
- Add a warm-theme, smooth, lightweight flame/flicker “keep the fire on” animation on the Home screen that does not block core actions and remains performant on mobile.
- Trigger a short celebratory animation state after a successful application log (wired to the existing ApplicationEntryForm onSuccess hook), including repeated submissions without stuck animation state.

**User-visible outcome:** Signed-in users can turn reminders on/off, pick a daily reminder time, and receive reminder prompts in-app (or as browser notifications when allowed) while the app is open; the Home screen shows an animated flame indicator and briefly celebrates each successfully logged application.
