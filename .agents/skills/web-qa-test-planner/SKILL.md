---
name: web-qa-test-planner
description: Complete workflow for exploring web applications with Playwright CLI and generating comprehensive QA test plans. Combines browser automation exploration with professional test documentation.
trigger: explicit
---

# Web QA Test Planner Skill

A complete end-to-end skill for exploring web applications and generating professional QA test plans with automation code.

## Overview

This skill automates the entire QA workflow:
1. **Explore Application** - Use Playwright CLI to interact with and document the web app
2. **Verify Selectors** - ⭐ NEW: Test and validate all CSS selectors BEFORE generating tests
3. **Document Findings** - Create comprehensive test plan from exploration
4. **Generate Automation** - Provide ready-to-use Playwright test code (using verified selectors)
5. **Package Deliverables** - Create professional QA documentation package

---

## Quick Start

```
"Create a test plan for [URL] - explore the app and generate test cases"
```

**Parameters:**
- **url**: The application URL to test (required)
- **app-name**: Name of the application (optional)
- **features**: Specific features to focus on (optional)

---

## Complete Workflow

### Phase 1: Browser Exploration (20-30 minutes)

```bash
# Step 1: Open browser and navigate to application
playwright-cli open [URL]
playwright-cli snapshot --filename=[app-name]-initial.yml

# Step 2: Interact with key features
# For each major feature:
#   - Perform the action
#   - Observe UI changes
#   - Take snapshots after state changes
#   - Test edge cases
#   - Document behaviors

playwright-cli snapshot --filename=[app-name]-feature-state.yml

# Step 3: Explore different states
# - Add/create items
# - Edit items
# - Delete items
# - Filter/search
# - Bulk operations
# - Apply different filters/views

# Step 4: Test interaction patterns
# - Double-click to edit
# - Keyboard shortcuts
# - Button interactions
# - Form submissions
# - Filter navigation

# Step 5: Verify persistence
# - Reload the page
# - Verify state is saved
# - Document localStorage usage

playwright-cli close
```

### Phase 1.5: Selector Verification & Validation ⭐ **NEW**

**CRITICAL STEP - Do NOT skip!** This phase ensures all selectors work before generating tests.

#### Step 1: Open Browser for Inspection

```bash
# Open browser with DevTools ready
playwright-cli open [URL]
```

#### Step 2: For Each Key Element, Document the Selector

**Method A: Using Browser DevTools**
```
1. Right-click the element on the page
2. Select "Inspect" or "Inspect Element"
3. Find the selector in DevTools:
   - Look for: id="username"  → Use #username
   - Look for: class="form-control login-field" → Use .login-field or .form-control
   - Look for: data-testid="login-btn" → Use [data-testid="login-btn"]
   - Last resort: type/placeholder → button[type="submit"]
4. Copy the selector
5. Test it in DevTools console: document.querySelector('#username')
6. Result: Should return the element (not null)
```

**Method B: Using Playwright Evaluate**
```javascript
// In your exploration script, test each selector:
await page.evaluate(() => {
  const element = document.querySelector('#username');
  console.log('Element found:', element !== null);
  console.log('Is visible:', element?.offsetHeight > 0);
  return element !== null;
});
```

#### Step 3: Create Selector Map

**File:** `[APP_NAME]_SELECTORS.md`

```markdown
# Selectors for [Application Name]

| Element | Selector | Type | Status |
|---------|----------|------|--------|
| Username Input | #username | ID | ✅ VERIFIED |
| Password Input | #password | ID | ✅ VERIFIED |
| Login Button | button[type="submit"] | CSS | ✅ VERIFIED |
| Error Message | .flash.error | Class | ✅ VERIFIED |
| Logout Link | a:has-text("Logout") | Text | ✅ VERIFIED |

**Verification Status:**
- ✅ VERIFIED: Selector tested and works
- ⚠️ CAUTION: Works but could be fragile
- ❌ FAILED: Does not work, needs fix
```

#### Step 4: Test Selector Pass/Fail Scenarios

For each selector, verify both pass AND fail cases:

```javascript
// Test 1: Selector finds element when it SHOULD exist
await page.goto(LOGIN_PAGE);
await expect(page.locator('#username')).toBeAttached(); // ✅ SHOULD PASS

// Test 2: Selector does NOT find element when it SHOULDN'T exist
await page.goto(SECURE_PAGE); // After logout, no login form
await expect(page.locator('#username')).not.toBeAttached(); // ✅ SHOULD PASS
```

#### Step 5: Exit Criteria - MUST Complete Before Proceeding

```
✅ MUST VERIFY:
  ☐ All login fields found and clickable
  ☐ All buttons found and clickable
  ☐ All error messages found
  ☐ All navigation links found
  ☐ All form inputs detected
  
❌ DO NOT PROCEED if:
  ☐ Any selector returns null/not-found
  ☐ Elements are hidden (offsetHeight = 0)
  ☐ Element text is different than expected
  ☐ Selector is too generic (matches unintended elements)
  
If ANY fail: Go back to Step 2, re-inspect, and fix selectors
```

#### Step 6: Close Browser

```bash
playwright-cli close
```

---

**⚠️ IMPORTANT:** 
- This phase PREVENTS generating tests with broken selectors
- Time spent here SAVES 10x time fixing failing tests later
- Never skip this step no matter how obvious the selectors seem

---

### Phase 2: Test Plan Generation (30-45 minutes)

#### 2.1 Create Main Test Plan Document

**File:** `[APP_NAME]_Test_Plan.md`

```markdown
# [Application Name] Test Plan

## Test Plan Overview
- Application: [Name]
- URL: [URL]
- Framework: React/Vue/Angular (as applicable)
- Testing Tool: Playwright CLI
- Date: [Today's date]

## 1. Executive Summary
- Scope: [What's being tested]
- Timeline: [How long testing takes]
- Browser Coverage: [Which browsers]

## 2. Test Objectives
- Verify all CRUD operations
- Validate business logic
- Test edge cases
- Verify data persistence
- Test filtering/navigation

## 3. Scope and Out-of-Scope

### In Scope
- [Feature 1]
- [Feature 2]
- [Feature 3]

### Out of Scope
- Backend API testing
- Load testing
- [Non-relevant item]

## 4. Entry/Exit Criteria

### Entry Criteria
- Application is accessible
- Console has no critical errors
- Initial page load completes

### Exit Criteria
- All test cases executed
- No blockers preventing testing
- Critical and high tests passed

## 5. Test Environment
- Browser: Chrome/Firefox/Safari/Edge
- OS: Windows/macOS/Linux
- Screen Resolution: 1920x1080 (minimum 1280x720)

## 6. Risk Assessment

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|-----------|
| [Risk 1] | Low/Med/High | Low/Med/High | [How to handle] |

## 7. Test Scenarios & Cases

### Test Suite 1: [Feature Area 1]

#### TC-001: [Test Case Title]
**Priority:** Critical | High | Medium | Low
**Type:** Functional | UI | Integration | Regression

**Objective:** [What we're testing and why]

**Preconditions:**
- [Condition 1]
- [Condition 2]

**Test Steps:**
1. [Action]
   **Expected:** [What should happen]

2. [Action]
   **Expected:** [What should happen]

**Post-conditions:**
- [Final system state]

### Test Suite 2: [Feature Area 2]
[Continue for each major feature]

## 8. Test Execution Plan

### Phase 1: Smoke Testing (30 minutes)
- Critical path tests
- Essential functionality

### Phase 2: Functional Testing (90 minutes)
- Complete feature testing
- All test suites

### Phase 3: Advanced Testing (30 minutes)
- Data persistence
- Edge cases
- Performance

### Phase 4: Regression Testing (30 minutes)
- Verify nothing broke
- Compare against baseline

## 9. Defect Reporting

### Defect Template
**Defect ID:** DEF-XXX
**Title:** [Brief description]
**Severity:** Critical | High | Medium | Low
**Environment:** [Browser, OS, URL]
**Reproduction Steps:**
1. Step 1
2. Step 2
3. Step 3
**Expected Result:** [What should happen]
**Actual Result:** [What actually happened]

## 10. Sign-Off

| Role | Name | Date | Signature |
|------|------|------|-----------|
| QA Lead | | | |
| Developer | | | |
| Product Owner | | | |
```

#### 2.2 Create Test Execution Report

**File:** `[APP_NAME]_Test_Execution_Report.md`

```markdown
# [Application Name] - Test Execution Report

**Application:** [Name]
**URL:** [URL]
**Test Date:** [Date]
**Tester:** QA Engineer
**Tool:** Playwright CLI

## Executive Summary

| Metric | Value |
|--------|-------|
| Total Test Cases | XX |
| Executed | XX |
| Passed | XX ✅ |
| Failed | 0 ❌ |
| Pass Rate | 100% |

## Test Results by Suite

### ✅ Test Suite 1: [Feature] (X/X Passed)

| TC # | Test Case | Steps | Result | Notes |
|------|-----------|-------|--------|-------|
| TC-001 | [Test] | X | ✅ PASS | [Notes] |

## Detailed Observations

### Critical Findings: ✅ PASS
- [Finding 1]
- [Finding 2]

### Issues Found: 0 Critical, 0 High

### Browser Compatibility
- ✅ Chrome: Fully functional
- ⚠️ Others: [Status]

## Test Coverage Analysis

| Feature | Test Cases | Coverage |
|---------|-----------|----------|
| [Feature 1] | X | ✅ 100% |
| [Feature 2] | X | ✅ 100% |

## Quality Metrics

| Metric | Value |
|--------|-------|
| Defect Count | 0 |
| Pass Rate | 100% |
| Coverage | 100% |
| Execution Time | [Time] |

## Recommendations

For Future Testing:
1. Automate smoke tests
2. Expand browser coverage
3. Add performance testing
4. Consider load testing

For Developers:
1. Code quality is excellent
2. Consider adding unit tests

For Product:
1. Application meets requirements
2. User experience is smooth
```

#### 2.3 Create Playwright Automation Guide

**File:** `[APP_NAME]_Playwright_Automation.md`

```markdown
# [Application Name] - Playwright Test Automation Guide

**Framework:** Playwright (Spec)
**Language:** TypeScript/JavaScript
**Date:** [Date]

## Test Case Automation Templates

### Smoke Tests

#### TC-001: [Test Case]

\`\`\`javascript
test('TC-001: [Test case title]', async ({ page }) => {
  // Navigate
  await page.goto('[URL]');
  
  // Verify initial state
  const element = page.locator('[selector]');
  await expect(element).toBeVisible();
  
  // Perform action
  await page.fill('[selector]', '[input]');
  await page.keyboard.press('Enter');
  
  // Verify result
  await expect(page.getByText('[expected]')).toBeVisible();
});
\`\`\`

### Core Feature Tests

#### TC-XXX: [Feature]

\`\`\`javascript
test('TC-XXX: [Test case]', async ({ page }) => {
  // Setup
  await page.goto('[URL]');
  
  // Test steps
  // [Implementation]
  
  // Verify
  await expect(element).toBeVisible();
});
\`\`\`

## Test Organization

### File Structure

\`\`\`
tests/
├── smoke/
│   └── [app]-smoke.spec.ts
├── functional/
│   ├── feature-1.spec.ts
│   ├── feature-2.spec.ts
│   └── feature-3.spec.ts
├── persistence/
│   └── data-persistence.spec.ts
└── ui/
    └── ui-elements.spec.ts
\`\`\`

## Running Tests

### All Tests
\`\`\`bash
npx playwright test
\`\`\`

### Smoke Tests
\`\`\`bash
npx playwright test tests/smoke/
\`\`\`

### With UI Mode
\`\`\`bash
npx playwright test --ui
\`\`\`

### Debug Mode
\`\`\`bash
npx playwright test --debug
\`\`\`

## Performance Benchmarks

| Test Type | Duration |
|-----------|----------|
| Smoke Tests | 2-3 min |
| Full Suite | 10-15 min |

## CI/CD Integration

### GitHub Actions

\`\`\`yaml
name: Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npx playwright test
      - uses: actions/upload-artifact@v3
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
\`\`\`
```

#### 2.4 Create Summary Document

**File:** `TEST_PLAN_SUMMARY.md`

```markdown
# [Application Name] - QA Test Plan Summary

**Application:** [Name]
**URL:** [URL]
**Testing Date:** [Date]
**Status:** ✅ Complete - All Tests Passed

## Deliverables

### 1. Main Test Plan Document
📄 [APP_NAME]_Test_Plan.md
- Executive summary with scope and objectives
- [X] comprehensive test cases organized into [Y] suites
- Entry/exit criteria
- Risk assessment
- Test execution plan (4 phases)

### 2. Test Execution Report
📊 [APP_NAME]_Test_Execution_Report.md
- Complete test results: X/X passed (100%)
- Test coverage analysis
- Quality metrics
- Recommendations

### 3. Playwright Automation Guide
🤖 [APP_NAME]_Playwright_Automation.md
- Complete Playwright test code for all tests
- CI/CD integration examples
- Performance benchmarks
- Maintenance guidelines

### 4. UI Snapshots
📸 [X snapshots in YAML format]
- Initial state
- Feature states
- Filter views
- Edit mode
- Final states

## Test Statistics

| Metric | Value |
|--------|-------|
| Total Test Cases | X |
| Test Suites | X |
| Pass Rate | 100% |
| Defects | 0 |
| Coverage | 100% |

## Quality Summary

✅ **100% Pass Rate** - All tests passed successfully
✅ **Zero Defects** - No issues found
✅ **Complete Coverage** - Every feature tested
✅ **Automation Ready** - Full Playwright code
✅ **Professional Documentation** - Industry best practices

## Next Steps

1. Review test cases in [APP_NAME]_Test_Plan.md
2. Execute tests manually or via Playwright automation
3. Use [APP_NAME]_Test_Execution_Report.md to track results
4. Integrate automation into CI/CD pipeline
```

#### 2.5 Create Deliverables Index

**File:** `QA_DELIVERABLES_INDEX.md`

```markdown
# [Application Name] - QA Deliverables Index

**Generated:** [Date]
**Status:** ✅ COMPLETE

## 📦 Complete Package Contents

### Primary Documents (4 files)

1. **TEST_PLAN_SUMMARY.md** - Executive summary & quick reference
2. **[APP_NAME]_Test_Plan.md** - Comprehensive test plan with all test cases
3. **[APP_NAME]_Test_Execution_Report.md** - Results, metrics, and recommendations
4. **[APP_NAME]_Playwright_Automation.md** - Ready-to-use test automation code

### Supporting Artifacts
- UI snapshots (YAML files documenting application states)
- Test data specifications
- Browser compatibility matrix

## 📊 Coverage Summary

| Feature | Test Cases | Status |
|---------|-----------|--------|
| [Feature 1] | X | ✅ 100% |
| [Feature 2] | X | ✅ 100% |
| [Feature 3] | X | ✅ 100% |

## 🚀 Getting Started

1. **For Manual Testing** → Read [APP_NAME]_Test_Plan.md
2. **For Automation** → Read [APP_NAME]_Playwright_Automation.md
3. **For Results** → Read [APP_NAME]_Test_Execution_Report.md
4. **For Overview** → Read TEST_PLAN_SUMMARY.md

## ✅ Quality Assurance Results

- ✅ All tests passed (100% pass rate)
- ✅ Zero defects found
- ✅ 100% feature coverage
- ✅ Professional documentation
- ✅ Automation code ready for CI/CD
```

### Phase 3: Output Generation (5-10 minutes)

Follow the exact structure above to create:
- ✅ 1 Main Test Plan (comprehensive, all test cases)
- ✅ 1 Execution Report (results, metrics)
- ✅ 1 Automation Guide (Playwright code)
- ✅ 1 Summary Document (executive overview)
- ✅ 1 Deliverables Index (navigation hub)
- ✅ 8+ UI Snapshots (YAML files)

---

## Step-by-Step Usage

### When User Says:
> "Create a test plan for [URL]"

### You Execute:

**STEP 1: Explore with Playwright CLI (20-30 min)**
```bash
# 1a. Open and navigate
playwright-cli open [URL]
playwright-cli snapshot --filename=[app-name]-initial.yml

# 1b. Test each major feature
# Add/Create → Edit → Delete → Filter/View
# For each: perform action, observe result, take snapshot

# 1c. Verify persistence
playwright-cli reload
playwright-cli snapshot --filename=[app-name]-after-reload.yml

# 1d. Close
playwright-cli close
```

**STEP 2: Create Test Plan Document (10 min)**
- Copy template above
- Fill in application-specific details
- Document all test cases discovered during exploration
- Structure into logical suites

**STEP 3: Create Execution Report (10 min)**
- Document all test results
- Record pass/fail status
- Collect metrics
- List any issues found

**STEP 4: Create Automation Guide (10 min)**
- Write Playwright code for each test case
- Organize by test suite
- Include setup/teardown
- Add CI/CD examples

**STEP 5: Create Summary & Index (5 min)**
- Write executive summary
- Create deliverables index
- List all files and artifacts

---

## Template Variables Reference

Replace these in templates:

| Variable | Example |
|----------|---------|
| `[URL]` | https://todomvc.com/examples/react/dist/ |
| `[APP_NAME]` | TodoMVC |
| `[Feature 1]` | Todo Creation |
| `[Test Case]` | Add Single Todo |
| `[selector]` | input[data-testid="text-input"] |
| `[input]` | Learn Playwright CLI |
| `[expected]` | 1 item left! |

---

## Key Sections in Each Document

### Test Plan Must Include:
- [ ] Executive summary
- [ ] Scope (in/out)
- [ ] Entry/exit criteria
- [ ] Risk assessment
- [ ] All test cases (3-5 steps each)
- [ ] Test data
- [ ] Execution schedule

### Execution Report Must Include:
- [ ] Summary metrics
- [ ] Pass/fail count
- [ ] Coverage analysis
- [ ] Issues found
- [ ] Recommendations

### Automation Code Must Include:
- [ ] All test functions
- [ ] Setup/teardown
- [ ] Clear assertions
- [ ] Good naming
- [ ] Comments where needed

---

## Common Features to Test

Most web apps have these elements:

✅ **CRUD Operations**
- Create/Add items
- Read/View items
- Update/Edit items
- Delete items

✅ **Navigation & Filtering**
- Filter by status (Active, Completed, All)
- Sort options
- Search functionality
- URL routing

✅ **Bulk Operations**
- Select all
- Deselect all
- Clear/Remove all
- Multi-select actions

✅ **Data Persistence**
- localStorage
- Page reload behavior
- Session management
- Undo/Redo (if applicable)

✅ **UI Elements**
- Form inputs
- Buttons
- Counters/Badges
- Empty states
- Error messages

---

## Execution Checklist

- [ ] Explored application thoroughly
- [ ] Tested all major features
- [ ] Captured 8+ UI snapshots
- [ ] Documented findings
- [ ] Created test plan (23+ test cases)
- [ ] Created execution report
- [ ] Wrote Playwright automation code
- [ ] Created summary document
- [ ] Created deliverables index
- [ ] Organized all files

---

## Quality Standards

**Each Test Case Must Have:**
- ✅ Clear objective
- ✅ 3-5 specific steps
- ✅ Expected results for each step
- ✅ Preconditions
- ✅ Priority level
- ✅ Pass status

**Overall Package Must Have:**
- ✅ 100+ test cases across all suites
- ✅ Professional documentation
- ✅ Ready-to-execute Playwright code
- ✅ Supporting artifacts
- ✅ Clear sign-off

---

## Time Estimates

| Phase | Duration |
|-------|----------|
| Exploration | 20-30 min |
| Test Plan | 10 min |
| Execution Report | 10 min |
| Automation Code | 10 min |
| Summary/Index | 5 min |
| **Total** | **55-65 min** |

---

## Reference Examples

### Playwright Click Example
```javascript
await page.getByRole('button', { name: 'Delete' }).click();
```

### Playwright Fill Example
```javascript
await page.getByTestId('text-input').fill('Learn Playwright CLI');
```

### Playwright Assertion Example
```javascript
await expect(page.getByText('1 item left')).toBeVisible();
```

### Test Case Example
```javascript
test('TC-001: Add single todo', async ({ page }) => {
  await page.goto('https://todomvc.com/examples/react/dist/');
  const input = page.getByTestId('text-input');
  await input.fill('Learn Playwright CLI');
  await page.keyboard.press('Enter');
  await expect(page.getByText('Learn Playwright CLI')).toBeVisible();
  await expect(page.getByText('1 item left')).toBeVisible();
});
```

---

## Anti-Patterns to Avoid

❌ Test cases without expected results  
❌ Vague or generic test names  
❌ Missing preconditions  
❌ No test data provided  
❌ Duplicate test cases  
❌ Poor automation code organization  
❌ Missing error scenarios  
❌ No regression tests  

---

**Skill Version:** 1.0  
**Created:** March 29, 2026  
**Status:** ✅ Ready for Use  
**Next Steps:** Trigger with application URL to generate complete test plan package
