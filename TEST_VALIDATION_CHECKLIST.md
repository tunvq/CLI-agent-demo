# Test Validation Checklist

**Before committing ANY test file, verify:**

## File Setup
- [ ] Test file follows naming convention: `*.spec.js` or `*.test.js`
- [ ] File is in correct directory structure
- [ ] All imports and dependencies are correct

## Selector Validation
- [ ] All CSS selectors have been **inspected on live site** (not guessed)
- [ ] Use browser DevTools to verify selectors exist: `document.querySelector('#username')`
- [ ] Test that selectors return elements: `expect(page.locator(selector)).toBeAttached()`
- [ ] Avoid generic patterns like `[class*="username"]` - prefer specific IDs

## Test Execution
- [ ] Run tests locally: `npx playwright test <testfile> --headed`
- [ ] Verify test passes completely (not just some tests)
- [ ] Check all assertions work correctly
- [ ] Verify timeout values are appropriate (not too tight/loose)

## Code Quality
- [ ] No hardcoded URLs without constants
- [ ] Proper error handling and fallbacks
- [ ] Meaningful test descriptions
- [ ] Console logs for debugging flow

## GitHub Actions Compatibility
- [ ] Remove `--headed` flag (browser runs headless in CI)
- [ ] Ensure timeout is 30000ms or reasonable for CI speed
- [ ] Verify test works with parallel execution
- [ ] Check for any local environment dependencies

## Final Check
- [ ] Commit message clearly describes what was fixed/added
- [ ] No "WIP" or "test" commits
- [ ] Only push after all checks pass

---

**Golden Rule:** Never commit a test file that hasn't been verified to pass locally first.
