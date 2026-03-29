# CLI-agent-demo - QA Automation & Testing

Comprehensive QA testing automation using Playwright CLI and GitHub Actions for TodoMVC React and Heroku login applications.

[![QA Tests](https://github.com/tunvq/CLI-agent-demo/actions/workflows/qa-pipeline.yml/badge.svg)](https://github.com/tunvq/CLI-agent-demo/actions/workflows/qa-pipeline.yml)
[![TodoMVC Tests](https://github.com/tunvq/CLI-agent-demo/actions/workflows/todomvc-qa-tests.yml/badge.svg)](https://github.com/tunvq/CLI-agent-demo/actions/workflows/todomvc-qa-tests.yml)
[![Heroku Tests](https://github.com/tunvq/CLI-agent-demo/actions/workflows/heroku-qa-tests.yml/badge.svg)](https://github.com/tunvq/CLI-agent-demo/actions/workflows/heroku-qa-tests.yml)

---

## 📋 Project Overview

This repository contains complete QA packages for two web applications:

### 1. **TodoMVC React Application** 📝
- **URL:** https://todomvc.com/examples/react/dist/
- **Test Cases:** 23
- **Pass Rate:** 100% ✅
- **Coverage:** 100% (9/9 features)
- **Documentation:** [See TodoMVC folder](#todomvc-qa-package)

### 2. **Heroku Login Application** 🔐
- **URL:** https://the-internet.herokuapp.com/login
- **Test Cases:** 12
- **Pass Rate:** 100% ✅
- **Coverage:** 100% (5/5 test suites)
- **Documentation:** [See herokuapp folder](herokuapp/QA_DELIVERABLES_INDEX.md)

---

## 📁 Repository Structure

```
CLI-agent-demo/
├── .github/
│   └── workflows/
│       ├── qa-pipeline.yml .................. Main CI/CD pipeline
│       ├── todomvc-qa-tests.yml ............ TodoMVC automated tests
│       └── heroku-qa-tests.yml ............. Heroku automated tests
│
├── TodoMVC_Test_Plan.md ..................... 23 TodoMVC test cases
├── TodoMVC_Test_Execution_Report.md ........ Full results & analysis
├── TodoMVC_Playwright_Automation.js ........ TodoMVC automation code
├── TEST_PLAN_SUMMARY.md ..................... Executive summary
├── QA_DELIVERABLES_INDEX.md ................ Navigation guide
│
├── herokuapp/ ............................ Heroku QA Package
│   ├── Heroku_Test_Plan.md ................. 12 Heroku test cases
│   ├── Heroku_Test_Execution_Report.md .... Full results & analysis
│   ├── Heroku_Playwright_Automation.js .... Heroku automation code
│   ├── TEST_PLAN_SUMMARY.md ............... Executive summary
│   ├── QA_DELIVERABLES_INDEX.md .......... Navigation guide
│   │
│   ├── login-initial.yml .................. Snapshot: Empty login form
│   ├── login-success.yml .................. Snapshot: Successful login
│   ├── login-invalid.yml .................. Snapshot: Invalid credentials
│   ├── login-empty.yml .................... Snapshot: Empty submission
│   ├── login-username-only.yml ............ Snapshot: Username only
│   ├── login-password-only.yml ............ Snapshot: Password only
│   ├── login-secure-page.yml .............. Snapshot: Secure area
│   ├── login-after-logout.yml ............. Snapshot: After logout
│   ├── login-unauthorized-access.yml ...... Snapshot: Access denied
│   └── login-sql-injection.yml ............ Snapshot: Security test
│
├── .playwright-cli/ ....................... Browser automation cache (CLI)
├── README.md ............................... This file
└── package.json ............................ Dependencies
```

---

## 🚀 Quick Start

### Local Testing

#### Prerequisites
```bash
# Install Node.js 18+
node --version

# Install dependencies
npm install @playwright/test
```

#### Run TodoMVC Tests
```bash
npx playwright test TodoMVC_Playwright_Automation.js --ui
```

#### Run Heroku Tests
```bash
cd herokuapp
npx playwright test Heroku_Playwright_Automation.js --ui
```

#### View Test Results
```bash
npx playwright show-report
```

---

## 🤖 GitHub Actions Automation

### Available Workflows

#### 1. **Main QA Pipeline** (`qa-pipeline.yml`)
Orchestrates all tests and provides comprehensive reporting.

**Triggers:**
- Push to `main`, `develop`, or `release/**` branches
- Pull requests to `main` or `develop`
- Manual trigger via workflow dispatch
- Daily schedule (9 AM UTC)

**Actions:**
- ✅ Runs TodoMVC tests (23 tests)
- ✅ Runs Heroku tests (12 tests)
- ✅ Generates test reports
- ✅ Comments on PRs with results
- ✅ Blocks merge if tests fail

#### 2. **TodoMVC Tests** (`todomvc-qa-tests.yml`)
Dedicated workflow for TodoMVC application.

**Triggers:**
- Push affecting TodoMVC files
- Pull requests affecting TodoMVC
- Daily schedule (10 AM UTC)

**Tests Covered:**
- Todo creation and editing
- Completion and deletion
- Filtering (All, Active, Completed)
- Data persistence
- UI/UX validation

#### 3. **Heroku Tests** (`heroku-qa-tests.yml`)
Dedicated workflow for Heroku login application.

**Triggers:**
- Push affecting herokuapp files
- Pull requests affecting herokuapp
- Daily schedule (9 AM UTC)

**Tests Covered:**
- Valid/invalid authentication
- Input validation
- Session management
- Access control
- Security (SQL injection, XSS)

---

## 📊 Test Coverage

### TodoMVC Tests (23 total)
| Suite | Tests | Coverage |
|-------|-------|----------|
| Todo Creation | 3 | ✅ 100% |
| Todo Editing | 3 | ✅ 100% |
| Todo Completion | 2 | ✅ 100% |
| Todo Deletion | 2 | ✅ 100% |
| Filtering | 6 | ✅ 100% |
| State Management | 2 | ✅ 100% |
| Data Persistence | 2 | ✅ 100% |
| UI/UX Elements | 1 | ✅ 100% |
| Accessibility | 2 | ✅ 100% |

### Heroku Tests (12 total)
| Suite | Tests | Coverage |
|-------|-------|----------|
| Authentication - Valid | 1 | ✅ 100% |
| Authentication - Invalid | 2 | ✅ 100% |
| Input Validation | 3 | ✅ 100% |
| Session Management | 3 | ✅ 100% |
| Security | 3 | ✅ 100% |

**Overall:** ✅ 35/35 tests passed (100% pass rate)

---

## 📝 Test Plan Documentation

### TodoMVC Documentation
- **Test Plan:** [TodoMVC_Test_Plan.md](TodoMVC_Test_Plan.md)
- **Execution Report:** [TodoMVC_Test_Execution_Report.md](TodoMVC_Test_Execution_Report.md)
- **Automation Code:** [TodoMVC_Playwright_Automation.js](TodoMVC_Playwright_Automation.js)
- **Summary:** [TEST_PLAN_SUMMARY.md](TEST_PLAN_SUMMARY.md)
- **Navigation:** [QA_DELIVERABLES_INDEX.md](QA_DELIVERABLES_INDEX.md)

### Heroku Documentation
- **Test Plan:** [herokuapp/Heroku_Test_Plan.md](herokuapp/Heroku_Test_Plan.md)
- **Execution Report:** [herokuapp/Heroku_Test_Execution_Report.md](herokuapp/Heroku_Test_Execution_Report.md)
- **Automation Code:** [herokuapp/Heroku_Playwright_Automation.js](herokuapp/Heroku_Playwright_Automation.js)
- **Summary:** [herokuapp/TEST_PLAN_SUMMARY.md](herokuapp/TEST_PLAN_SUMMARY.md)
- **Navigation:** [herokuapp/QA_DELIVERABLES_INDEX.md](herokuapp/QA_DELIVERABLES_INDEX.md)

---

## 🧪 Test Execution Examples

### Run All Tests Locally
```bash
npm install @playwright/test
npx playwright test --reporter=html
npx playwright show-report
```

### Run Specific Test Suite
```bash
npx playwright test TodoMVC_Playwright_Automation.js -g "Test Suite 1"
```

### Run in Debug Mode
```bash
npx playwright test --debug
```

### Run with UI Mode
```bash
npx playwright test --ui
```

### Generate Different Report Formats
```bash
# HTML report
npx playwright test --reporter=html

# JSON report (for CI/CD parsing)
npx playwright test --reporter=json

# JUnit report (for Jenkins/CI systems)
npx playwright test --reporter=junit

# List of tests (dry run)
npx playwright test --list
```

---

## ✅ Quality Metrics

### Test Results Summary
| Metric | Value |
|--------|-------|
| **Total Tests** | 35 |
| **Passed** | 35 (100%) |
| **Failed** | 0 (0%) |
| **Skipped** | 0 (0%) |
| **Critical Issues** | 0 |
| **High Priority Issues** | 0 |
| **Medium Priority Issues** | 0 |
| **Low Priority Issues** | 0 |

### Feature Coverage
| Application | Features | Coverage |
|-------------|----------|----------|
| TodoMVC | 9/9 | ✅ 100% |
| Heroku Login | 5/5 | ✅ 100% |

### Security Testing
- ✅ SQL Injection Prevention
- ✅ XSS Attack Prevention
- ✅ Input Validation
- ✅ Access Control
- ✅ Session Security

---

## 📚 Workflow Examples

### Example 1: Push Code
When you push to main:
```bash
git add .
git commit -m "feat: Update authentication logic"
git push origin main
```

**GitHub Actions will:**
1. ✅ Run TodoMVC tests (23 tests)
2. ✅ Run Heroku tests (12 tests)
3. ✅ Generate test reports
4. ✅ Update workflow status badges
5. ✅ Archive artifacts for 30 days

### Example 2: Create Pull Request
When you create a PR:
```bash
git checkout -b feature/new-feature
git add .
git commit -m "feat: Add new feature"
git push origin feature/new-feature
# Create PR on GitHub
```

**GitHub Actions will:**
1. ✅ Run all QA tests automatically
2. ✅ Comment on PR with results
3. ✅ Block merge if tests fail
4. ✅ Provide detailed test reports

### Example 3: Manual Trigger
Trigger workflow manually:
- Go to **Actions** tab
- Select **CI/CD - Full QA Pipeline**
- Click **Run workflow**
- Tests execute on demand

---

## 🔔 Notifications

### PR Comments
When tests complete, the workflow comments on your PR:
```
## 🧪 QA Pipeline Results

### Test Status: ✅ ALL PASSED

| Application | Tests | Status |
|---|---|---|
| TodoMVC | 23/23 | ✅ PASS |
| Heroku Login | 12/12 | ✅ PASS |

✅ Ready for merge
```

### Artifacts
Test results are archived for 30 days:
- HTML test reports
- JSON test results
- JUnit XML format
- Screenshots and error logs

---

## 🔐 Security

### Tests Included
- ✅ SQL Injection Prevention (verified)
- ✅ XSS Prevention (verified)
- ✅ Input Validation (verified)
- ✅ Access Control (verified)
- ✅ Session Security (verified)

### Credentials
- No sensitive credentials in code
- Test credentials in documentation only
- GitHub Secrets not required for these tests

---

## 📊 CI/CD Pipeline Flow

```
┌─────────────────────────────────────┐
│  Code Push / PR / Manual Trigger    │
└──────────────┬──────────────────────┘
               │
               ▼
┌──────────────────────────────────────┐
│  GitHub Actions Workflow Triggered   │
└──────────────┬───────────────────────┘
               │
        ┌──────┴──────┐
        ▼             ▼
    ┌────────┐   ┌────────────┐
    │TodoMVC │   │ Heroku QA  │
    │ Tests  │   │   Tests    │
    │(23)    │   │   (12)     │
    └────────┘   └────────────┘
        │             │
        └──────┬──────┘
               ▼
        ┌─────────────┐
        │ All Passed? │
        └──────┬──────┘
               │
        ┌──────┴──────┐
        ▼             ▼
      ✅ YES         ❌ NO
        │             │
        ▼             ▼
   ✅ PASS      ❌ BLOCKED
   (Merge OK)   (Fix & Retry)
```

---

## 🛠️ Troubleshooting

### Tests Failing Locally?
```bash
# Clear cache
rm -rf .playwright-cli
rm -rf node_modules

# Reinstall
npm install
npx playwright install --with-deps

# Run tests again
npx playwright test
```

### Workflow Not Going?
1. Check **Actions** tab on GitHub for errors
2. Review workflow logs
3. Verify file paths match your repository structure
4. Ensure dependencies are installed

### Tests Timing Out?
- Increase timeout in workflow: `timeout-minutes: 20`
- Check application availability
- Verify network connectivity

---

## 📄 Documentation Files

### Quick Reference
- **Start Here:** [TEST_PLAN_SUMMARY.md](TEST_PLAN_SUMMARY.md) (5 min read)
- **All Details:** [QA_DELIVERABLES_INDEX.md](QA_DELIVERABLES_INDEX.md)

### Heroku Specific
- **Start Here:** [herokuapp/TEST_PLAN_SUMMARY.md](herokuapp/TEST_PLAN_SUMMARY.md)
- **All Details:** [herokuapp/QA_DELIVERABLES_INDEX.md](herokuapp/QA_DELIVERABLES_INDEX.md)

---

## 📈 Next Steps

### For Development
1. Clone repository
2. Install dependencies: `npm install @playwright/test`
3. Run tests locally: `npx playwright test`
4. Push code and GitHub Actions will run automatically

### For CI/CD Integration
1. Workflows are already configured
2. Push to `main` or create PR to trigger
3. Check Actions tab for results
4. Review test reports in artifacts

### For Team
1. Share test documentation with team
2. Use PR comments for test visibility
3. Review artifacts in Actions
4. Archive reports for compliance

---

## 👤 Author

**tu nguyen** (nguyenvuquoctu@gmail.com)

Comprehensive QA testing automation using:
- 🎭 Playwright CLI for browser automation
- 📋 Markdown for professional documentation
- 🤖 GitHub Actions for CI/CD
- 📊 YAML snapshots for evidence capture

---

## 📝 License

This project is part of the CLI-agent-demo repository.

---

## 🔗 Related Resources

- [Playwright Documentation](https://playwright.dev/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [TodoMVC Application](https://todomvc.com/)
- [The Internet - Heroku App](https://the-internet.herokuapp.com/)

---

## ✨ Quick Status

| Component | Status |
|-----------|--------|
| TodoMVC Tests | ✅ 23/23 PASS |
| Heroku Tests | ✅ 12/12 PASS |
| GitHub Actions | ✅ Configured |
| Documentation | ✅ Complete |
| Automation Code | ✅ Ready |
| CI/CD Pipeline | ✅ Active |

**Overall Status:** ✅ **PRODUCTION READY**

---

**Last Updated:** March 29, 2026  
**Version:** 1.0  
**Status:** Complete & Verified ✅

For detailed information, please refer to the documentation files linked above.
