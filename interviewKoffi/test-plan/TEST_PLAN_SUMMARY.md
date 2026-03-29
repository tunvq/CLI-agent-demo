# AI Interview – QA Test Plan Summary

**Application:** AI Interview (Mock Interview Platform)  
**URL:** https://interview.koffi.vn/  
**Testing Date:** 2026-03-29  
**Status:** ✅ Exploratory Complete – Manual Execution Pending  
**Prepared By:** QA Engineer

---

## What Is This Application?

AI Interview is an **AI-powered Mock Interview platform** that:
- Allows users to create reusable **Interview Templates** (job title, company, round type, questions)
- Conducts **AI-driven mock interview sessions** based on templates
- Tracks **session history and performance reports** (scores, AI feedback)
- Lets users **request additional interview quotas** from administrators

Authentication is via **SSO (Keycloak)** — there is no traditional email/password login on the main app.

---

## Deliverables in This Package

### 1. 📋 Main Test Plan
**File:** `InterviewKoffi_Test_Plan.md`  
- 29 comprehensive test cases across 8 test suites
- Entry/exit criteria, risk assessment, execution phases
- Covers: Auth, Navigation, Templates, Sessions, Usage Requests, Profile, Edge Cases, Regression

### 2. 📊 Test Execution Report
**File:** `InterviewKoffi_Test_Execution_Report.md`  
- Results from exploratory browser automation session
- 14 tests confirmed PASS, 4 partial, 10 pending manual execution
- 3 observations documented (routing issue, dropdown interaction, modal focus)

### 3. 🤖 Playwright Automation Suite
**File:** `InterviewKoffi_Playwright_Automation.spec.ts`  
- TypeScript Playwright tests for all major test cases
- Includes login helper, smoke test, navigation tests, CRUD tests
- Ready to run with `npx playwright test`

### 4. 🎯 Verified Selectors Map
**File:** `InterviewKoffi_SELECTORS.md`  
- CSS/role selectors for all known UI elements
- Organized by page section with VERIFIED / CAUTION / FAILED indicators

---

## Test Statistics

| Metric | Value |
|--------|-------|
| Total Test Cases | 29 |
| Critical Priority | 6 |
| High Priority | 11 |
| Medium Priority | 8 |
| Low Priority | 4 |
| Test Suites | 8 |
| Confirmed Pass (Exploration) | 14 |
| Pending Manual Execution | 10 |
| Defects / Observations | 3 |

---

## Priority Test Cases (Run First)

| # | Test Case | Priority | Notes |
|---|-----------|----------|-------|
| TC-001 | SSO Login – Valid Credentials | 🔴 Critical | Required for all other tests |
| TC-029 | Smoke Test – Critical Path | 🔴 Critical | Login + all 3 sections |
| TC-011 | Create New Interview Template | 🔴 Critical | Core feature |
| TC-013 | Start Interview Session from Template | 🔴 Critical | Core feature |
| TC-019 | Create New Usage Request | 🔴 Critical | Key user action |
| TC-006..008 | Sidebar Navigation (×3) | 🟠 High | Foundation for all tests |

---

## Quick Start for Running Tests

### Prerequisites
```bash
cd d:\Project\CLI-agent-demo\interviewKoffi\test-plan

# Install dependencies (if not already done)
npm init playwright@latest
```

### Run All Tests
```bash
npx playwright test InterviewKoffi_Playwright_Automation.spec.ts
```

### Run Smoke Test Only
```bash
npx playwright test InterviewKoffi_Playwright_Automation.spec.ts --grep "TC-029"
```

### Run with HTML Report
```bash
npx playwright test InterviewKoffi_Playwright_Automation.spec.ts --reporter=html
npx playwright show-report
```

### Run in Debug Mode
```bash
npx playwright test InterviewKoffi_Playwright_Automation.spec.ts --debug
```

---

## Key Observations from Exploration

| Finding | Severity | Recommendation |
|---------|---------|----------------|
| New Template routing may have regression | Medium | Verify `/interview-templates/new` route manually |
| Profile dropdown needs verification | Low | Manual click in real browser |
| Missing `data-testid` attributes | Low | Request devs add testids for stability |
| No visible session quota counter | Informational | Consider surfacing quota on UI |

---

## Application Feature Map

```
interview.koffi.vn/
│
├── / (Landing Page)
│   └── Sign in with SSO → Keycloak (auth/realms/zamo)
│
├── /interview-templates (Dashboard/Default)
│   ├── Table: Job Title | Round Type | Company
│   ├── New Template → (create wizard)
│   └── Row click → Template Detail
│       └── Actions: Start Session, Edit?, Delete?
│
├── /interview-sessions
│   ├── Table: Job Title | Company | Round Type | Date | Duration | Score | Status
│   └── Row click → Session Report (score, feedback, Q&A)
│
└── /usage-requests
    ├── Table: Requested Sessions | Requested Time (min) | Reason
    ├── New Request → (modal form)
    └── Pagination: 1-2/2
```

---

## Sign-Off

| Role | Name | Date |
|------|------|------|
| QA Tester | | 2026-03-29 |
| QA Lead | | |
| Product Owner | | |
