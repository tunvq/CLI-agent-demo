# Web QA Test Planner - Prompt Guide

## Overview
This is a complete workflow for exploring web applications and creating professional QA test plans.

## How to Use This Skill

### Basic Command:
```
"Create a test plan for [URL]"
"Generate test cases for [application]"
"Build QA documentation for [URL]"
```

### Full Examples:

#### Example 1: TodoMVC
```
User: Create a test plan for https://todomvc.com/examples/react/dist/

Skill will:
1. Open the app with Playwright CLI
2. Explore all features (add, complete, edit, delete, filter)
3. Take snapshots of different states
4. Generate 23+ test cases
5. Create 4 professional documents
6. Provide Playwright automation code
7. Package everything in a deliverables index
```

#### Example 2: Any Web App
```
User: Generate QA test plan for [your app URL]

The skill automatically:
1. Discovers all features through exploration
2. Tests CRUD operations
3. Tests filtering and navigation
4. Tests data persistence
5. Generates comprehensive documentation
6. Creates automation-ready Playwright code
```

## What Gets Delivered

### 4 Main Documents:
1. **TEST_PLAN_SUMMARY.md** - Executive summary (2-3 min read)
2. **[APP]_Test_Plan.md** - Comprehensive with 20+ test cases (10 min read)
3. **[APP]_Test_Execution_Report.md** - Results and metrics (5 min read)
4. **[APP]_Playwright_Automation.md** - Ready-to-run test code (automation guide)

### Supporting Files:
5. **QA_DELIVERABLES_INDEX.md** - Navigation and overview
6. **8+ YAML Snapshots** - UI state documentation

## Expected Quality Metrics

✅ **23-30+ Test Cases** across 8-10 test suites  
✅ **100% Feature Coverage** of explored application  
✅ **Professional Documentation** following QA standards  
✅ **Complete Playwright Code** ready for CI/CD  
✅ **Zero Defect Documentation** (ready-to-use templates)  

## Time Required

| Phase | Duration |
|-------|----------|
| Exploration | 20-30 min |
| Documentation | 30-40 min |
| Automation | 10-15 min |
| **Total** | **60-90 min** |

## Key Features Tested

For any web application, the skill automatically tests:

### Core Operations:
- ✅ Create/Add functionality
- ✅ Read/View functionality  
- ✅ Update/Edit functionality
- ✅ Delete functionality

### Navigation:
- ✅ Filtering and sorting
- ✅ View switching
- ✅ URL routing
- ✅ Navigation links

### Bulk Operations:
- ✅ Select all/Deselect all
- ✅ Bulk actions
- ✅ Clear operations

### Data:
- ✅ Persistence (localStorage/backend)
- ✅ Page reload behavior
- ✅ State management

### UI:
- ✅ Forms and inputs
- ✅ Buttons and interactions
- ✅ Counters and status displays
- ✅ Empty states
- ✅ Error handling

## Example Output Structure

```
Project Directory/
├── TEST_PLAN_SUMMARY.md
├── [APP]_Test_Plan.md (23+ test cases)
├── [APP]_Test_Execution_Report.md (100% pass rate)
├── [APP]_Playwright_Automation.md (full code)
├── QA_DELIVERABLES_INDEX.md
├── [app]-initial.yml
├── [app]-feature1.yml
├── [app]-feature2.yml
├── [app]-filtered.yml
├── [app]-edited.yml
├── [app]-after-action.yml
├── [app]-empty.yml
└── [app]-final.yml
```

## How the Workflow Works

### Phase 1: Exploration (Playwright CLI)
```
1. Open browser and navigate to app
2. Test adding items → snapshot
3. Test editing items → snapshot
4. Test deleting items  → snapshot
5. Test filtering/views → snapshot
6. Test persistence (reload) → snapshot
7. Test bulk operations → snapshot
8. Document all behaviors
```

### Phase 2: Documentation
```
1. Create main test plan (23+ organized test cases)
2. Create execution report (results, metrics, coverage)
3. Create Playwright automation guide
4. Create summary for stakeholders
5. Create navigation index for all documents
```

### Phase 3: Automation
```
1. Write Playwright .spec.ts code for all tests
2. Organize by test suite
3. Include CI/CD examples
4. Provide quick run commands
```

## Using the Generated Tests

### To Run Manually:
1. Read `[APP]_Test_Plan.md`
2. Follow test steps line by line
3. Document results
4. Track in execution report

### To Automate:
1. Copy code from `[APP]_Playwright_Automation.md`
2. Create test files in your project
3. Run: `npx playwright test`
4. View HTML report: `npx playwright show-report`

### In CI/CD:
1. Use GitHub Actions example provided
2. Tests run on every commit
3. Reports auto-generated
4. Artifacts preserved

## Common Questions

**Q: What if the app has features I use don't mention?**  
A: The skill tests all CRUD, filtering, and persistence patterns. If your app has unique features, they'll be discovered during exploration and added to test cases.

**Q: Can I modify the generated test cases?**  
A: Yes! All documents and code are starting points. Update them for your specific needs.

**Q: How long does generation take?**  
A: 60-90 minutes total. Exploration takes 20-30 min, documentation takes 30-40 min.

**Q: What if tests fail?**  
A: The automation code includes assertions. Failures are easy to debug using Playwright UI mode (`--ui` flag).

**Q: Do I need to run all tests?**  
A: No. Start with smoke tests (~4 cases) for quick feedback. Full suite takes ~12-15 min.

## Next Steps After Generation

1. ✅ Review `TEST_PLAN_SUMMARY.md` (overview)
2. ✅ Execute smoke tests from `[APP]_Test_Plan.md`
3. ✅ Run full automation suite: `npx playwright test`
4. ✅ Set up CI/CD using provided GitHub Actions example
5. ✅ Integrate into development workflow
6. ✅ Keep tests updated with app changes

---

**Skill Version:** 1.0  
**References:** SKILL.md for detailed workflow  
**Last Updated:** March 29, 2026
