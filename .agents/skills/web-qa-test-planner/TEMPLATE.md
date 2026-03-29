# Web QA Test Planner - Reusable Template

Use this template to quickly generate test plans with proper selector verification.

---

## Template 1: Complete Flow (Explore + Verify + Generate Tests)

### Quick Prompt (Copy & Customize)

```
Explore the "[YOUR_URL]" website and:

1. Navigate through all main features
2. Document the key interactive elements (forms, buttons, links)
3. RIGHT-CLICK and INSPECT each element to get the exact CSS selectors
4. Create a selector map document with verification status
5. Test each selector works (toBeAttached, toBeVisible, etc)
6. Once ALL selectors verified ✅, then generate complete Playwright test cases
7. Generate comprehensive test plan document

Application: [APP_NAME]
Focus Areas: [FEATURE_1, FEATURE_2, FEATURE_3]
Test Framework: Playwright
```

### Example (Concrete)

```
Explore the "https://the-internet.herokuapp.com/login" website and:

1. Navigate through all main features (login, logout, secure area, error states)
2. Document the key interactive elements (username field, password field, login button, logout link, error messages)
3. RIGHT-CLICK and INSPECT each element to get the exact CSS selectors
4. Create a selector map document with verification status
5. Test each selector works (toBeAttached, toBeVisible, etc)
6. Once ALL selectors verified ✅, then generate complete Playwright test cases
7. Generate comprehensive test plan document

Application: Heroku Internet Login App
Focus Areas: Authentication, Input Validation, Session Management, Security
Test Framework: Playwright
```

---

## Template 2: Focused Exploration (Single Feature)

### Prompt

```
Explore just the "[FEATURE_NAME]" feature on "[URL]":

1. Navigate to the feature
2. Document all interactive elements and their selectors
3. Create selector map for this feature only
4. Generate test cases ONLY for this feature
5. Create focused test plan

Feature: [FEATURE_NAME]
```

### Example

```
Explore just the "login form" on "https://the-internet.herokuapp.com/login":

1. Navigate to the login page
2. Document: username field, password field, login button, error messages
3. Create selector map for login form
4. Generate test cases for login scenarios
5. Create focused test plan for authentication

Feature: Login Form
```

---

## Template 3: Re-test / Verify Existing

If you want to verify an existing test file:

### Prompt

```
For the file "herokuapp/Heroku_Playwright_Automation.spec.js":

1. Review all CSS selectors used in the tests
2. Verify EACH selector works by inspecting the live website
3. Create a verification report with status for each selector
4. Fix any broken selectors
5. Run tests locally to verify all pass
```

---

## Template 4: Test Different States/Pages

### Prompt

```
Explore "[URL]" and test these different states:

State 1: [INITIAL_STATE] - Document selectors
State 2: [AFTER_ACTION] - Document selectors
State 3: [ERROR_STATE] - Document selectors

For each state:
1. Navigate to the state
2. Inspect and document selectors
3. Create selector map
4. Generate test cases that verify transitions between states

Then: Generate complete state machine test plan
```

### Example

```
Explore "https://the-internet.herokuapp.com" and test these different states:

State 1: Login Page (Fresh Load) - Document username, password, login button selectors
State 2: After Successful Login (Secure Area) - Document logout button, welcome message selectors
State 3: After Logout (Back to Login) - Document that login form is visible again

For each state:
1. Navigate to the state
2. Inspect and document selectors
3. Create selector map
4. Generate test cases that verify transitions between states

Then: Generate complete state machine test plan
```

---

## How to Use These Templates

### Step 1: Copy a template above

### Step 2: Customize for your needs
- Replace `[YOUR_URL]` with actual URL
- Replace `[APP_NAME]` with application name
- Replace `[FEATURE_1, FEATURE_2, ...]` with features to test

### Step 3: Paste into your prompt
Copy the customized prompt and send it to the agent/skill

### Step 4: Let it explore
The skill will:
- ✅ Explore the website
- ✅ Verify all selectors
- ✅ Create selector map
- ✅ Generate tests with verified selectors
- ✅ Create test plan

---

## Output You'll Get

After using any template, you should receive:

1. **Selector Map Document** - All selectors with verification status ✅
2. **Test Plan Document** - Comprehensive test scenarios
3. **Playwright Test File** - Ready-to-run test cases (using verified selectors)
4. **Execution Report** - Showing all tests pass locally ✅

---

## Template Components Explained

| Component | Purpose | Example |
|-----------|---------|---------|
| `[YOUR_URL]` | The website to explore | `https://the-internet.herokuapp.com/login` |
| `[APP_NAME]` | Application identifier | `Heroku Internet Login` |
| `[FEATURE_1, FEATURE_2]` | Areas to focus on | `Authentication, Security, Session Management` |
| Selector Verification | CRITICAL - Verifies before testing | RIGHT-CLICK → INSPECT → Test with toBeAttached() |
| Test Generation | Create test cases AFTER verification | Generate .spec.js file |

---

## Remember!

✅ **KEY RULE:** Always verify selectors BEFORE generating tests
- Don't skip the verification step
- Inspect elements on live website
- Test each selector works
- Only THEN generate tests

This prevents the repeated failures we had before! 🚀

