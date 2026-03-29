# AI Interview (interview.koffi.vn) — Comprehensive QA Test Plan

## Test Plan Overview

| Item | Details |
|------|---------|
| **Application** | AI Interview – Mock Interview Platform |
| **URL** | https://interview.koffi.vn/ |
| **Test Credentials** | Email: tu.nguyen@zamo.io / Password: admin |
| **Authentication** | Keycloak SSO (realm: zamo) |
| **Tech Stack** | React/Next.js SPA, Tailwind CSS, Radix UI, Keycloak |
| **Testing Tool** | Playwright |
| **Prepared By** | QA Engineer |
| **Date** | 2026-03-29 |
| **Version** | 1.0 |

---

## 1. Executive Summary

The **AI Interview** platform (https://interview.koffi.vn/) is an AI-powered Mock Interview application designed to help users prepare for job interviews. The platform supports creating reusable interview templates, conducting AI-driven mock interview sessions, and tracking session history. Users can also request additional interview quotas from administrators.

This test plan covers end-to-end functional testing of all major features discovered during exploratory testing, including:
- SSO-based Authentication (Keycloak)
- Interview Template Management
- Interview Session History & Reports
- Usage Request Management
- Navigation & UI consistency

**Browser Coverage:** Chrome (primary), Firefox, Edge  
**Estimated Effort:** 55–70 manual test hours

---

## 2. Test Objectives

- Verify that SSO authentication flows correctly with valid and invalid credentials
- Confirm Interview Template CRUD operations function as expected
- Validate that Interview Sessions are correctly tracked, displayed, and reportable
- Ensure Usage Request creation and listing works correctly
- Verify sidebar navigation reliably routes users to the correct pages
- Confirm UI responsiveness, accessibility, and error handling
- Validate pagination works correctly on all listing pages
- Ensure the application handles edge cases gracefully

---

## 3. Scope

### In Scope
- Login / Logout flow via Keycloak SSO
- Interview Templates (list, create, view detail, start session)
- Interview Sessions (list, view report, status tracking)
- Usage Requests (list, create new request)
- Sidebar navigation between all sections
- User profile menu (name display, logout)
- UI layout: page titles, info banners, data tables, pagination
- Basic error handling: empty forms, invalid navigation, unauthorized access

### Out of Scope
- Backend API performance / load testing
- Keycloak admin console management
- AI model evaluation / response quality
- Email notification testing
- Admin panel (if separate from user-facing app)
- Browser developer tools / network-level security testing
- Mobile or tablet-specific responsive design testing

---

## 4. Entry / Exit Criteria

### Entry Criteria
- Application is deployed and accessible at https://interview.koffi.vn/
- Test credentials (tu.nguyen@zamo.io / admin) are valid and authenticated
- Browser (Chrome) is available and has no critical console errors on load
- All 3 sidebar sections are navigable (Interview Templates, Interview Sessions, Usage Requests)

### Exit Criteria
- All Critical and High priority test cases have been executed
- Pass rate ≥ 90% on Critical test cases
- No P1 (blocker) defects remain open
- Test execution report has been completed and signed off

---

## 5. Test Environment

| Item | Details |
|------|---------|
| Browser (Primary) | Google Chrome (latest stable) |
| Browser (Secondary) | Mozilla Firefox, Microsoft Edge |
| Operating System | Windows 11 / macOS |
| Screen Resolution | 1920×1080 (minimum 1280×720) |
| Network | Standard broadband (no VPN restrictions) |
| Test Tool | Playwright CLI / Playwright Test |
| Auth Provider | Keycloak (remote – do not configure locally) |

---

## 6. Risk Assessment

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Keycloak SSO outage | Low | Critical | Have backup credentials; test login first each session |
| SPA routing issues (blank pages on direct URL) | Medium | High | Always access via sidebar navigation, not direct URL |
| Limited AI session quota for test user | Medium | High | Use usage request feature; request quota before testing |
| UI element coordinate drift (button positions shift) | Low | Medium | Use CSS/role selectors, not pixel coordinates |
| Test data pollution (created templates used by others) | Medium | Medium | Name test templates with "[TEST]" prefix; clean up after |

---

## 7. Test Scenarios & Cases

---

### Test Suite 1: Authentication & SSO Login

#### TC-001: Successful Login via SSO
**Priority:** Critical  
**Type:** Functional  
**Objective:** Verify users can successfully login to the application using valid SSO credentials

**Preconditions:**
- Application is accessible at https://interview.koffi.vn/
- Valid credentials available: tu.nguyen@zamo.io / admin

**Test Steps:**
1. Navigate to https://interview.koffi.vn/
   **Expected:** Landing page shows "AI Interview" brand logo, subtitle "Practice smarter. Land your next job." and "Sign in with SSO" button
2. Click "Sign in with SSO" button
   **Expected:** User is redirected to Keycloak login page (URL contains `auth/realms/zamo`)
3. Enter username: `tu.nguyen@zamo.io`
   **Expected:** Username field accepts the email input
4. Enter password: `admin`
   **Expected:** Password field accepts input (masked)
5. Click the "Sign In" (kc-login) button
   **Expected:** User is redirected back to the main app and lands on the Interview Templates page

**Post-conditions:**
- User is logged in; sidebar shows all 3 navigation items
- User name "tu nguyen" is visible in the bottom-left profile area

---

#### TC-002: Login with Invalid Credentials
**Priority:** High  
**Type:** Negative Functional  
**Objective:** Verify appropriate error message is displayed for invalid login attempts

**Preconditions:**
- Application is accessible

**Test Steps:**
1. Navigate to https://interview.koffi.vn/ and click "Sign in with SSO"
   **Expected:** Keycloak login page loads
2. Enter username: `invalid@test.com` and password: `wrongpassword`
   **Expected:** Fields accept input
3. Click "Sign In"
   **Expected:** Error message appears: "Invalid username or password." Username and password fields are cleared/highlighted

**Post-conditions:**
- User remains on the Keycloak login page
- No session is created

---

#### TC-003: Login with Empty Fields
**Priority:** Medium  
**Type:** Negative Functional  
**Objective:** Verify form validation prevents submission with empty credentials

**Preconditions:**
- User is on Keycloak login page

**Test Steps:**
1. Leave both username and password fields empty
   **Expected:** Fields show placeholder text
2. Click the "Sign In" button
   **Expected:** Form validation triggers; error message or field highlighting indicates required fields

**Post-conditions:**
- User remains on the login page
- No redirect occurs

---

#### TC-004: Logout Functionality
**Priority:** High  
**Type:** Functional  
**Objective:** Verify users can successfully log out of the application

**Preconditions:**
- User is logged in and on any page

**Test Steps:**
1. Click the user profile menu in the bottom-left of the sidebar (shows "TN tu nguyen" with chevron)
   **Expected:** A dropdown menu opens with at least a "Log out" option
2. Click "Log out"
   **Expected:** User is redirected to the landing page or login page; session is terminated
3. Attempt to navigate directly to https://interview.koffi.vn/interview-templates
   **Expected:** User is redirected to the login/SSO page (session expired)

**Post-conditions:**
- User is fully logged out; no active session

---

#### TC-005: Access Protected Pages Without Login
**Priority:** High  
**Type:** Security  
**Objective:** Verify that protected pages redirect unauthenticated users to login

**Preconditions:**
- User is NOT logged in (fresh browser session)

**Test Steps:**
1. Navigate directly to https://interview.koffi.vn/interview-templates
   **Expected:** User is redirected to the SSO login page
2. Navigate directly to https://interview.koffi.vn/interview-sessions
   **Expected:** User is redirected to the SSO login page
3. Navigate directly to https://interview.koffi.vn/usage-requests
   **Expected:** User is redirected to the SSO login page

**Post-conditions:**
- All protected routes redirect to login as expected

---

### Test Suite 2: Navigation & Sidebar

#### TC-006: Sidebar Navigation – Interview Templates
**Priority:** High  
**Type:** Functional  
**Objective:** Verify clicking "Interview Templates" in sidebar loads the correct page

**Preconditions:**
- User is logged in; currently on Interview Sessions or Usage Requests page

**Test Steps:**
1. Click "Interview Templates" in the left sidebar
   **Expected:** Page URL changes to `/interview-templates`
2. Page title reads "Mock Interview Templates"
   **Expected:** H1 heading displays "Mock Interview Templates"
3. A teal info banner is visible with "Create a new interview template" and "New Template →" button
   **Expected:** The teal banner is present and visible
4. A data table with columns [Job Title, Round Type, Company] is visible
   **Expected:** Table renders with column headers

**Post-conditions:**
- Currently on the Interview Templates page; sidebar item is highlighted/active

---

#### TC-007: Sidebar Navigation – Interview Sessions
**Priority:** High  
**Type:** Functional  
**Objective:** Verify clicking "Interview Sessions" loads the correct page

**Preconditions:**
- User is logged in; on any other page

**Test Steps:**
1. Click "Interview Sessions" in the sidebar
   **Expected:** URL changes to `/interview-sessions`
2. Page title reads "Interview Sessions"
   **Expected:** H1 heading displays "Interview Sessions"
3. An info banner shows "Your Interview History" with description
   **Expected:** Banner is visible with correct text
4. Data table with columns [Job Title, Company, Round Type, Date, Duration, Score, Status] is visible
   **Expected:** Table renders with all expected columns

**Post-conditions:**
- On Interview Sessions page; target nav item is active in sidebar

---

#### TC-008: Sidebar Navigation – Usage Requests
**Priority:** High  
**Type:** Functional  
**Objective:** Verify clicking "Usage Requests" loads the correct page

**Preconditions:**
- User is logged in; on any other page

**Test Steps:**
1. Click "Usage Requests" in the sidebar
   **Expected:** URL changes to `/usage-requests`
2. Page title reads "My Usage Requests"
   **Expected:** H1 heading displays "My Usage Requests"
3. Teal banner shows "Request Increased Usage" with "New Request →" button
   **Expected:** Banner is visible
4. Data table with [Requested Sessions, Requested Time (min), Reason] columns is visible
   **Expected:** Table renders correctly

**Post-conditions:**
- On Usage Requests page; nav item is active

---

#### TC-009: Active State Highlight in Sidebar
**Priority:** Medium  
**Type:** UI  
**Objective:** Verify the sidebar highlights the currently active navigation item

**Preconditions:**
- User is logged in

**Test Steps:**
1. Click "Interview Templates" – verify the link is visually highlighted (active state)
   **Expected:** "Interview Templates" item has primary color background / active indicator
2. Click "Interview Sessions" – verify "Interview Templates" is no longer highlighted and "Interview Sessions" is
   **Expected:** Only "Interview Sessions" is highlighted
3. Click "Usage Requests"
   **Expected:** Only "Usage Requests" is highlighted

**Post-conditions:**
- Active state correctly reflects current page

---

### Test Suite 3: Interview Templates

#### TC-010: View Interview Templates List
**Priority:** High  
**Type:** Functional  
**Objective:** Verify the templates list displays correctly with all data

**Preconditions:**
- User is logged in and on Interview Templates page

**Test Steps:**
1. Observe the data table on the Interview Templates page
   **Expected:** Table has 3 visible columns: Job Title, Round Type, Company
2. Verify template rows are displayed (the user account has multiple templates)
   **Expected:** At least 1 row is visible in the table
3. Scroll horizontally if the table is cut off
   **Expected:** All columns become visible on scroll
4. Verify template data examples: "Senior/Junior Full-stack Test Engineer", "QA Engineer", "QC Engineer [Eng]"
   **Expected:** Rows contain relevant job titles

**Post-conditions:**
- Templates list is visible and data-rich

---

#### TC-011: Create New Interview Template
**Priority:** Critical  
**Type:** Functional  
**Objective:** Verify users can create a new interview template

**Preconditions:**
- User is logged in and on Interview Templates page

**Test Steps:**
1. Click "New Template →" button in the teal banner card
   **Expected:** A multi-step form/wizard opens (modal or new page)
2. Fill in "Job Title" with a test value (e.g., "[TEST] Software Engineer")
   **Expected:** Field accepts text input
3. Fill in "Company" with a test value (e.g., "[TEST] Company")
   **Expected:** Field accepts text input
4. Select "Round Type" (e.g., TECHNICAL) from dropdown
   **Expected:** Dropdown opens and allows selection
5. Add at least one interview question/round as required by the wizard
   **Expected:** Question can be added successfully
6. Click "Save" or equivalent submit button
   **Expected:** Template is created; user is redirected to template list or template detail page
7. Verify the newly created template appears in the list
   **Expected:** "[TEST] Software Engineer" appears in the templates table

**Post-conditions:**
- New template exists in the system; should be cleaned up after testing

---

#### TC-012: View Template Detail
**Priority:** High  
**Type:** Functional  
**Objective:** Verify clicking a template row shows its full details

**Preconditions:**
- User is on Interview Templates page with at least one template

**Test Steps:**
1. Click on any template row in the table
   **Expected:** User navigates to a detail/view page for that template
2. Verify template details are displayed (Job Title, Company, Round Type, questions)
   **Expected:** All configured details of the template are shown
3. Verify available actions on the detail page (e.g., "Start Session", "Edit", "Delete")
   **Expected:** Action buttons relevant to the template are present

**Post-conditions:**
- Template detail view is accessible and complete

---

#### TC-013: Start Interview Session from Template
**Priority:** Critical  
**Type:** Functional  
**Objective:** Verify users can start a mock interview session from a template

**Preconditions:**
- User is viewing a template detail page
- User has remaining session quota

**Test Steps:**
1. On the template detail page, click "Start Session" (or equivalent button)
   **Expected:** Session initialization begins; the AI interview interface loads
2. Verify the session starts correctly with the right job title and company context
   **Expected:** Session screen shows the correct interview parameters

**Post-conditions:**
- A new interview session record will be created in Interview Sessions list

---

### Test Suite 4: Interview Sessions

#### TC-014: View Interview Sessions List
**Priority:** High  
**Type:** Functional  
**Objective:** Verify the sessions list displays all historical sessions with correct columns

**Preconditions:**
- User is logged in and on Interview Sessions page
- User has at least one past session

**Test Steps:**
1. Navigate to Interview Sessions page
   **Expected:** Page loads with "Interview Sessions" title
2. Verify the data table shows columns: Job Title, Company, Round Type, and Status
   **Expected:** All expected columns are present in the table header
3. Verify session rows display correct data (company names like KMS Technology, Watatech, Rexy Technology)
   **Expected:** Rows contain meaningful job/company data
4. Identify sessions with different statuses (COMPLETED, FAILED)
   **Expected:** Status column shows distinct values

**Post-conditions:**
- Sessions list verified as functional

---

#### TC-015: Session Status Display
**Priority:** Medium  
**Type:** UI  
**Objective:** Verify different session statuses are visually distinguishable

**Preconditions:**
- User is on Interview Sessions page with sessions in COMPLETED and FAILED states

**Test Steps:**
1. Look for a COMPLETED session row
   **Expected:** Status badge shows "COMPLETED" (ideally in green or positive color)
2. Look for a FAILED session row
   **Expected:** Status badge shows "FAILED" (ideally in red or warning color)
3. Compare visual styling of both statuses
   **Expected:** The two statuses are visually distinct and easy to differentiate

**Post-conditions:**
- Status indicators verified

---

#### TC-016: View Interview Session Report
**Priority:** High  
**Type:** Functional  
**Objective:** Verify clicking a session row shows a detailed session report

**Preconditions:**
- User is on Interview Sessions page with at least one COMPLETED session

**Test Steps:**
1. Click on a COMPLETED session row
   **Expected:** User navigates to a session report/detail page
2. Verify the report shows session details: Job Title, Company, Round Type
   **Expected:** Session context is displayed
3. Verify the report shows performance-related data (score, duration, AI feedback)
   **Expected:** The report includes at minimum a score and relevant interview feedback
4. Verify individual questions and answers (if shown) are presented clearly
   **Expected:** Q&A pairs are readable and organized

**Post-conditions:**
- Session report verified as accessible and informative

---

#### TC-017: Session List Pagination
**Priority:** Medium  
**Type:** Functional  
**Objective:** Verify pagination works correctly when there are many sessions

**Preconditions:**
- User has more sessions than fit on one page

**Test Steps:**
1. Navigate to Interview Sessions page
   **Expected:** Table shows first page of results
2. If pagination is present, click the "next page" button or page 2
   **Expected:** Table refreshes to show the next set of sessions
3. Click "previous page" or page 1
   **Expected:** Returns to the first page of results

**Post-conditions:**
- Pagination works correctly

---

### Test Suite 5: Usage Requests

#### TC-018: View Usage Requests List
**Priority:** High  
**Type:** Functional  
**Objective:** Verify the usage requests list displays correctly

**Preconditions:**
- User is logged in and on Usage Requests page

**Test Steps:**
1. Navigate to Usage Requests page
   **Expected:** Page loads with title "My Usage Requests"
2. Verify teal banner with "Request Increased Usage" text is visible
   **Expected:** Banner with "New Request →" button is present
3. Verify data table with columns [Requested Sessions, Requested Time (min), Reason] is present
   **Expected:** Table renders with correct column headers
4. Verify existing requests show correct data (Sessions: 2, Time: 30, Reason text)
   **Expected:** At least 2 rows are visible with the data matching expected values
5. Verify pagination shows "1-2/2" with current page indicator
   **Expected:** Pagination correctly shows record count and page

**Post-conditions:**
- Usage requests list verified

---

#### TC-019: Create New Usage Request – Valid Data
**Priority:** Critical  
**Type:** Functional  
**Objective:** Verify users can submit a new usage request successfully

**Preconditions:**
- User is logged in and on Usage Requests page

**Test Steps:**
1. Click "New Request →" button
   **Expected:** A modal dialog or form page opens
2. Enter a value for "Requested Sessions" (e.g., 5)
   **Expected:** Number input accepts the value
3. Enter a value for "Requested Time (min)" (e.g., 60)
   **Expected:** Number input accepts the value
4. Enter a reason text (e.g., "I need more sessions for interview preparation")
   **Expected:** Text area accepts the input
5. Click "Submit" or equivalent button
   **Expected:** Request is submitted; modal closes; success notification appears; new request appears in the list

**Post-conditions:**
- New usage request is created and visible in the list

---

#### TC-020: Create Usage Request – Empty Fields Validation
**Priority:** Medium  
**Type:** Negative Functional  
**Objective:** Verify form validation prevents submission with empty required fields

**Preconditions:**
- Usage request form/modal is open

**Test Steps:**
1. Leave all fields empty
   **Expected:** Fields show placeholder or are empty
2. Click "Submit"
   **Expected:** Error messages appear for required fields; form is not submitted

**Post-conditions:**
- Form remains open with validation errors

---

#### TC-021: Usage Request – Invalid Input Validation
**Priority:** Medium  
**Type:** Negative Functional  
**Objective:** Verify input validation rejects invalid values (e.g., negative numbers)

**Preconditions:**
- Usage request form is open

**Test Steps:**
1. Enter `-1` in the "Requested Sessions" field
   **Expected:** Field shows validation error or reverts to minimum value
2. Enter `0` in the "Requested Time" field
   **Expected:** Error or minimum value enforcement
3. Enter a very long string (>1000 chars) in the "Reason" field
   **Expected:** Field enforces a character limit or shows error

**Post-conditions:**
- Invalid inputs are rejected or handled gracefully

---

#### TC-022: Cancel Usage Request Creation
**Priority:** Low  
**Type:** Functional  
**Objective:** Verify users can cancel the usage request form without submitting

**Preconditions:**
- Usage request form/modal is open with some data entered

**Test Steps:**
1. Fill in the Requested Sessions field with "10"
2. Click "Cancel" or close the modal (X button)
   **Expected:** Modal closes without creating a new request
3. Verify the request count has NOT changed in the list
   **Expected:** No new row was added; previous count remains

**Post-conditions:**
- No usage request was created

---

### Test Suite 6: User Profile & Account

#### TC-023: User Profile Menu Display
**Priority:** Medium  
**Type:** UI  
**Objective:** Verify the user profile section in the sidebar displays correct user information

**Preconditions:**
- User is logged in

**Test Steps:**
1. Look at the bottom-left of the sidebar
   **Expected:** User avatar initials ("TN") and username ("tu nguyen") are displayed
2. Click the profile menu button (shows chevron icon)
   **Expected:** A dropdown menu opens with account options
3. Verify the dropdown contains at minimum a "Log out" option
   **Expected:** "Log out" option is visible in the menu

**Post-conditions:**
- Profile menu is functional

---

#### TC-024: App Logo & Brand Visibility
**Priority:** Low  
**Type:** UI  
**Objective:** Verify the application branding is consistently displayed

**Preconditions:**
- User is logged in

**Test Steps:**
1. Look at the top-left of the sidebar
   **Expected:** "AI Interview" logo/icon is displayed
2. Verify the subtitle "MOCK INTERVIEW" is visible below the brand name
   **Expected:** Brand elements are consistent across pages

**Post-conditions:**
- Brand elements verified

---

### Test Suite 7: UI & Error States

#### TC-025: Empty State – New User with No Templates
**Priority:** Medium  
**Type:** UI  
**Objective:** Verify the appropriate empty state is shown when a user has no templates

**Preconditions:**
- A fresh user account with no templates exists

**Test Steps:**
1. Log in with a fresh account and navigate to Interview Templates
   **Expected:** The teal "Create a new interview template" banner is shown
2. Verify either: empty table with a message, OR empty table with no rows
   **Expected:** The UX clearly guides the user to create their first template

**Post-conditions:**
- Empty state is handled gracefully

---

#### TC-026: Empty State – No Interview Sessions
**Priority:** Medium  
**Type:** UI  
**Objective:** Verify appropriate empty state when a user has no sessions

**Preconditions:**
- A fresh user account with no sessions

**Test Steps:**
1. Log in with fresh account and navigate to Interview Sessions
   **Expected:** "Your Interview History" banner is shown
2. Verify the table shows an empty state message or is empty with a helpful placeholder
   **Expected:** User is not confused by an empty table with no context

**Post-conditions:**
- Empty state handled gracefully

---

#### TC-027: Page Not Found / 404 Handling
**Priority:** Low  
**Type:** Negative Functional  
**Objective:** Verify navigation to a non-existent route is handled gracefully

**Preconditions:**
- User is logged in

**Test Steps:**
1. Navigate to https://interview.koffi.vn/non-existent-page
   **Expected:** A 404 page or redirect to home occurs; app does not crash
2. Navigate back using browser back or sidebar links
   **Expected:** Navigation returns to a valid page successfully

**Post-conditions:**
- Invalid routes are handled without crashing the SPA

---

#### TC-028: Browser Refresh – Session Persistence
**Priority:** Medium  
**Type:** Functional  
**Objective:** Verify the user remains logged in after a browser page refresh

**Preconditions:**
- User is logged in and on Interview Templates page

**Test Steps:**
1. Reload the browser page (F5 or Ctrl+R)
   **Expected:** Page reloads and user remains logged in; content is displayed
2. Navigate to Interview Sessions and refresh
   **Expected:** User remains on Interview Sessions after refresh
3. Navigate to Usage Requests and refresh
   **Expected:** User remains on Usage Requests after refresh

**Post-conditions:**
- Session is persistent across page refreshes

---

### Test Suite 8: Automation Regression Tests

#### TC-029: Smoke Test – Critical Path
**Priority:** Critical  
**Type:** Regression  
**Objective:** Run a quick smoke test covering the critical happy path from login to all 3 sections

**Preconditions:**
- Browser is open; application is deployed

**Test Steps:**
1. Navigate to https://interview.koffi.vn/ → Sign in with SSO → Login  
   **Expected:** Successfully logged in
2. Verify Interview Templates page loads
   **Expected:** Table with templates is visible
3. Click Interview Sessions → verify page loads
   **Expected:** Sessions list is visible
4. Click Usage Requests → verify page loads
   **Expected:** Usage requests list is visible
5. Logout
   **Expected:** User is logged out successfully

**Post-conditions:**
- All major routes confirmed accessible in < 5 minutes

---

## 8. Test Execution Plan

### Phase 1: Smoke Testing (30 minutes)
Run TC-001, TC-006, TC-007, TC-008, TC-029 to verify the app is accessible and navigation works. These are prerequisites for all other tests.

### Phase 2: Authentication Testing (30 minutes)
Run TC-001 through TC-005 to fully cover auth flows including negative cases.

### Phase 3: Feature Functional Testing (90 minutes)
Run TC-010 through TC-024 covering template management, sessions, usage requests, and profile.

### Phase 4: Edge Cases & UI Testing (30 minutes)
Run TC-025 through TC-028 for empty states, 404 handling, and session persistence.

### Phase 5: Regression Automation (ongoing)
Execute TC-029 as part of CI/CD pipeline or after any deployment.

---

## 9. Defect Reporting Template

### Defect Report Format

**Defect ID:** DEF-XXX  
**Title:** [Brief description of the bug]  
**Severity:** Critical | High | Medium | Low  
**Priority:** P1 | P2 | P3 | P4  
**Environment:** Browser (version), OS, URL, Date  
**Reproduction Steps:**
1. Step 1
2. Step 2
3. Step 3

**Expected Result:** [What should happen]  
**Actual Result:** [What actually happened]  
**Screenshots:** [Attach relevant screenshots]  
**Reproducible:** Always | Intermittent | Not reproducible

---

## 10. Test Summary Metrics

| Metric | Target |
|--------|--------|
| Total Test Cases | 29 |
| Critical Priority | 6 |
| High Priority | 11 |
| Medium Priority | 8 |
| Low Priority | 4 |
| Target Pass Rate | ≥ 90% overall, 100% Critical |
| Estimated Execution Time | 55-70 hours (manual) |

---

## 11. Sign-Off

| Role | Name | Date | Signature |
|------|------|------|-----------|
| QA Lead | | | |
| Developer | | | |
| Product Owner | | | |
