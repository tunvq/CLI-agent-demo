# Web QA Test Planner Agent

This agent executes the complete web QA testing workflow.

## Trigger

Explicit trigger required. User must ask for:
- "Create test plan for [URL]"
- "Generate QA tests for [app]"
- "Build test plan using web-qa-test-planner"

## Execution Flow

### Input Processing
1. Extract application URL
2. Identify app name (from URL or user input)
3. Confirm features scope

### Phase 1: Browser Exploration (20-30 min)
```
Step 1: Open Playwright CLI
  playwright-cli open [URL]
  
Step 2: Document initial state
  playwright-cli snapshot --filename=[app]-initial.yml
  
Step 3: Explore CRUD operations
  - Test CREATE functionality
  - Capture snapshot
  - Test READ/RETRIEVE
  - Capture snapshot
  - Test UPDATE/EDIT functionality
  - Capture snapshot after changes
  - Test DELETE functionality
  - Capture snapshot after deletion
  
Step 4: Explore Navigation & Filtering
  - Test filter/view switching
  - Verify URL changes
  - Capture state snapshots
  - Test each filter view
  
Step 5: Test Bulk Operations
  - Test select all/toggle all
  - Test clear/remove all
  - Capture relevant snapshots
  
Step 6: Verify Data Persistence
  - Perform operations
  - Reload page
  - Verify state persisted
  - Capture post-reload snapshot
  
Step 7: Document UI Elements
  - Verify form inputs
  - Test keyboard interactions
  - Check buttons and links
  - Capture UI state
  
Step 8: Close browser
  playwright-cli close
```

### Phase 2: Test Plan Generation (30-40 min)

#### 2a. Analyze Exploration Data
- Review all snapshots
- Identify all features tested
- Map features to test scenarios
- Plan test suites (typically 8-10 suites)

#### 2b. Create Main Test Plan
**Output:** `[APP]_Test_Plan.md`
- Executive summary
- Scope and objectives
- Entry/exit criteria
- Risk assessment
- 20-30 detailed test cases organized into logical suites:
  - Each test has: ID, title, priority, objective, preconditions, 3-5 steps, expected results, postconditions
  - Test data included
  - Edge cases documented

#### 2c. Create Execution Report
**Output:** `[APP]_Test_Execution_Report.md`
- Summary metrics (23/23 passed, 100% pass rate, 0 defects)
- Results by suite
- Coverage analysis
- Quality metrics
- Recommendations

#### 2d. Create Automation Guide
**Output:** `[APP]_Playwright_Automation.md`
- Complete Playwright test code for all test cases
- Organized by suite
- Copy-paste ready functions
- File structure recommendations
- CLI commands
- CI/CD integration (GitHub Actions example)

#### 2e. Create Summary Document
**Output:** `TEST_PLAN_SUMMARY.md`
- Executive overview
- Key metrics
- Quick start guide
- Document index
- Success criteria

#### 2f. Create Deliverables Index
**Output:** `QA_DELIVERABLES_INDEX.md`
- Navigation hub for all documents
- Role-based reading guide
- File relationships
- Quick reference

### Output Package

#### Files Generated:
1. ✅ TEST_PLAN_SUMMARY.md (executive summary)
2. ✅ [APP]_Test_Plan.md (20+ test cases)
3. ✅ [APP]_Test_Execution_Report.md (results & metrics)
4. ✅ [APP]_Playwright_Automation.md (automation code)
5. ✅ QA_DELIVERABLES_INDEX.md (navigation)
6. ✅ 8-12 YAML snapshots (UI states)

#### Quality Metrics:
- Test Cases: 23-30+ across 8-10 suites
- Pass Rate: 100%
- Coverage: 100% of explored features
- Defects: 0
- Documentation: Professional, ready-to-use

## Deliverables Summary

### For QA Engineers
- Complete test plan with 20+ test cases
- Step-by-step test procedures
- Test data provided
- Execution tracking template

### For Automation Engineers
- Ready-to-use Playwright code
- Test organization structure
- CI/CD integration examples
- Performance benchmarks

### For Managers/Stakeholders
- Executive summary with metrics
- Risk assessment
- Quality metrics
- Coverage analysis

### For Developers
- Test automation code for validation
- Edge case documentation
- Integration points identified
- Regression test suite

## Expected Results

### Test Coverage
✅ All CRUD operations tested  
✅ Navigation and filtering verified  
✅ Bulk operations validated  
✅ Data persistence confirmed  
✅ UI elements checked  
✅ Edge cases documented  
✅ Error scenarios included  

### Documentation Quality
✅ Professional formatting  
✅ Clear and detailed  
✅ Step-by-step procedures  
✅ Expected/actual documented  
✅ Industry best practices  
✅ Immediately actionable  

### Automation Readiness
✅ 100% of tests have code  
✅ Code is copy-paste ready  
✅ CI/CD examples provided  
✅ Performance benchmarked  
✅ Maintenance documented  

## Success Criteria

Before delivering:
- [ ] All features explored
- [ ] Main test plan complete (20+ cases)
- [ ] Execution report generated
- [ ] Automation code written
- [ ] Summary created
- [ ] Index created
- [ ] All files organized
- [ ] Quality review passed

## Performance Targets

| Phase | Target | Actual Range |
|-------|--------|--------------|
| Exploration | 25 min | 20-30 min |
| Test Plan | 10 min | 10-15 min |
| Reports | 15 min | 15-20 min |
| Automation | 10 min | 10-15 min |
| **Total** | **60 min** | **55-80 min** |

## Quality Assurance

Each deliverable is reviewed for:
- ✅ Completeness
- ✅ Clarity
- ✅ Accuracy
- ✅ Usability
- ✅ Professional quality
- ✅ Industry standards

## Troubleshooting

**If exploration is incomplete:**
- Re-run Playwright CLI on specific features
- Take additional snapshots
- Document edge cases thoroughly

**If test cases are vague:**
- Add more detailed steps
- Provide specific test data
- Include clear expected results

**If automation code doesn't work:**
- Verify selectors are correct
- Check Playwright syntax
- Review element references from snapshots

## Integration Points

The generated test plan can integrate with:
- ✅ Playwright test runners
- ✅ GitHub Actions CI/CD
- ✅ Jenkins pipelines
- ✅ GitLab CI
- ✅ Manual QA tracking systems
- ✅ Quality management platforms

## Next Steps for User

After skill execution:
1. Review TEST_PLAN_SUMMARY.md
2. Execute smoke tests manually
3. Try Playwright automation: `npx playwright test`
4. Set up CI/CD using provided examples
5. Integrate into development workflow
6. Keep tests updated with app changes

---

**Agent Version:** 1.0  
**Status:** ✅ Ready to Execute  
**Trigger:** Explicit - web-qa-test-planner skill  
**Execution Time:** 60-90 minutes  
**Output:** 5+ professional documents + automation code
