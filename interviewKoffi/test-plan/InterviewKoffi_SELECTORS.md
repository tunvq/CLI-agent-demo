# Selectors for AI Interview - interview.koffi.vn

**Application:** AI Interview (Mock Interview Platform)
**URL:** https://interview.koffi.vn/
**Verified Date:** 2026-03-29
**Authentication:** SSO via Keycloak (realm: zamo)

---

## Authentication - SSO Login (Keycloak)

| Element | Selector | Type | Status |
|---------|----------|------|--------|
| Landing Page Sign In Button | `button:has-text("Sign in with SSO")` | Text | ✅ VERIFIED |
| SSO Login Page - Username Input | `#username` | ID | ✅ VERIFIED |
| SSO Login Page - Password Input | `#password` | ID | ✅ VERIFIED |
| SSO Login Page - Submit Button | `#kc-login` | ID | ✅ VERIFIED |
| Keycloak Page Title | `h1:has-text("Sign in to")` | Text | ✅ VERIFIED |

---

## Sidebar Navigation

| Element | Selector | Type | Status |
|---------|----------|------|--------|
| App Logo / Brand | `img[alt="AI Interview"]` | Alt | ⚠️ CAUTION |
| Interview Templates Nav Link | `a[href="/interview-templates"]` | Href | ✅ VERIFIED |
| Interview Sessions Nav Link | `a[href="/interview-sessions"]` | Href | ✅ VERIFIED |
| Usage Requests Nav Link | `a[href="/usage-requests"]` | Href | ✅ VERIFIED |
| User Profile Menu Button | `button:has-text("tu nguyen")` | Text | ⚠️ CAUTION |
| Logout Option (in profile menu) | `button:has-text("Log out")` | Text | ⚠️ CAUTION |

---

## Interview Templates Page (`/interview-templates`)

| Element | Selector | Type | Status |
|---------|----------|------|--------|
| Page Title | `h1:has-text("Mock Interview Templates")` | Text | ✅ VERIFIED |
| New Template CTA Card | `.bg-teal-700` | Class | ⚠️ CAUTION |
| New Template Button | `button:has-text("New Template")` | Text | ✅ VERIFIED |
| Templates Data Table | `table` | Tag | ✅ VERIFIED |
| Table - Job Title Column Header | `th:has-text("Job Title")` | Text | ✅ VERIFIED |
| Table - Round Type Column Header | `th:has-text("Round Type")` | Text | ✅ VERIFIED |
| Table - Company Column Header | `th:has-text("Company")` | Text | ✅ VERIFIED |
| Table Row (first) | `tbody tr:first-child` | CSS | ✅ VERIFIED |

---

## New Template Form / Wizard

| Element | Selector | Type | Status |
|---------|----------|------|--------|
| Template Wizard Modal/Page | `[role="dialog"]` | Role | ⚠️ CAUTION |
| Job Title Input | `input[name="jobTitle"]` | Name | ⚠️ CAUTION |
| Company Input | `input[name="company"]` | Name | ⚠️ CAUTION |
| Round Type Dropdown | `select[name="roundType"]` | Name | ⚠️ CAUTION |
| Save / Submit Button | `button[type="submit"]` | CSS | ⚠️ CAUTION |
| Cancel Button | `button:has-text("Cancel")` | Text | ⚠️ CAUTION |

---

## Interview Sessions Page (`/interview-sessions`)

| Element | Selector | Type | Status |
|---------|----------|------|--------|
| Page Title | `h1:has-text("Interview Sessions")` | Text | ✅ VERIFIED |
| Section Banner | `.bg-teal-700` | Class | ⚠️ CAUTION |
| Sessions Data Table | `table` | Tag | ✅ VERIFIED |
| Table - Job Title Column | `th:has-text("Job Title")` | Text | ✅ VERIFIED |
| Table - Company Column | `th:has-text("Company")` | Text | ✅ VERIFIED |
| Table - Round Type Column | `th:has-text("Round T")` | Text | ✅ VERIFIED |
| Status Badge - COMPLETED | `.badge:has-text("COMPLETED")` | Text | ⚠️ CAUTION |
| Status Badge - FAILED | `.badge:has-text("FAILED")` | Text | ⚠️ CAUTION |
| Session Row | `tbody tr` | CSS | ✅ VERIFIED |

---

## Usage Requests Page (`/usage-requests`)

| Element | Selector | Type | Status |
|---------|----------|------|--------|
| Page Title | `h1:has-text("My Usage Requests")` | Text | ✅ VERIFIED |
| New Request Button | `button:has-text("New Request")` | Text | ✅ VERIFIED |
| Requests Data Table | `table` | Tag | ✅ VERIFIED |
| Table - Requested Sessions Column | `th:has-text("Requested Sessions")` | Text | ✅ VERIFIED |
| Table - Requested Time Column | `th:has-text("Requested Time")` | Text | ✅ VERIFIED |
| Table - Reason Column | `th:has-text("Reason")` | Text | ✅ VERIFIED |
| Pagination - Current Page | `.pagination button.active` | CSS | ⚠️ CAUTION |

---

## New Usage Request Modal Form

| Element | Selector | Type | Status |
|---------|----------|------|--------|
| Modal Dialog | `[role="dialog"]` | Role | ⚠️ CAUTION |
| Requested Sessions Input | `input[name="requestedSessions"]` | Name | ⚠️ CAUTION |
| Requested Time Input | `input[name="requestedTime"]` | Name | ⚠️ CAUTION |
| Reason Textarea | `textarea[name="reason"]` | Name | ⚠️ CAUTION |
| Submit Button | `button[type="submit"]` | CSS | ⚠️ CAUTION |
| Cancel / Close Button | `button:has-text("Cancel")` | Text | ⚠️ CAUTION |

---

## Verification Status Legend

| Status | Meaning |
|--------|---------|
| ✅ VERIFIED | Selector tested and confirmed working during exploration |
| ⚠️ CAUTION | Inferred from DOM structure - needs manual verification before test execution |
| ❌ FAILED | Does not work - needs fix |

---

## Notes

- The application uses **Keycloak SSO** for authentication (separate from main app domain)
- The frontend is a **SPA (Single Page Application)** – likely React/Next.js with Tailwind CSS and Radix UI
- Navigation sidebar is always visible after login
- Data tables support horizontal scrolling on smaller viewports
- CAUTION selectors were inferred from page structure and common patterns – verify with DevTools before running automation
