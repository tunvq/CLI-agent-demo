# TodoMVC React Test Plan

## Test Plan Overview

**Application:** TodoMVC React  
**URL:** https://todomvc.com/examples/react/dist/  
**Framework:** React.js  
**Testing Tool:** Playwright CLI  
**Date:** March 29, 2026

---

## 1. Executive Summary

This test plan covers comprehensive testing of the TodoMVC React application's core functionality including todo item management, filtering, editing, and deletion. The application implements the standard TodoMVC specification with client-side state management using React.

**Scope:** Full functional testing of the todo management system  
**Timeline:** 2-3 hours for complete manual testing  
**Browser Coverage:** Chrome (primary), Firefox, Safari, Edge (secondary)

---

## 2. Test Objectives

- ✅ Verify all CRUD operations (Create, Read, Update, Delete) on todos
- ✅ Validate filtering functionality (All, Active, Completed views)
- ✅ Test bulk operations (Toggle All, Clear Completed)
- ✅ Ensure proper state management and counter updates
- ✅ Verify data persistence using localStorage
- ✅ Test edge cases and error scenarios
- ✅ Validate UI responsiveness and accessibility

---

## 3. Scope and Out-of-Scope

### In Scope
- Adding new todos
- Completing/uncompleting todos
- Editing existing todos
- Deleting individual todos
- Filtering todos (All, Active, Completed)
- Toggle All functionality
- Clear Completed functionality
- Item counter display
- URL routing for filters (#/, #/active, #/completed)
- Double-click to edit functionality

### Out of Scope
- Backend API integration
- User authentication
- Multi-user scenarios
- Performance testing under load
- Mobile device testing
- Cross-browser compatibility (basic smoke testing only)

---

## 4. Entry/Exit Criteria

### Entry Criteria
- ✅ Application is accessible at https://todomvc.com/examples/react/dist/
- ✅ Browser console has no critical errors (favicon 404 is acceptable)
- ✅ Initial page load completes successfully
- ✅ Input field accepts keyboard input

### Exit Criteria
- ✅ All test cases executed
- ✅ No blockers preventing testing
- ✅ All critical and high priority tests passed
- ✅ Documentation completed

---

## 5. Test Environment

**Browser:** Chrome/Firefox/Safari/Edge  
**OS:** Windows/macOS/Linux  
**Screen Resolution:** 1920x1080 (minimum 1280x720)  
**Network:** Stable internet connection  
**Testing Tools:** Playwright CLI, browser DevTools

---

## 6. Risk Assessment

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|-----------|
| localStorage not working | Low | High | Test data persistence across sessions |
| Browser compatibility issues | Medium | Medium | Test on multiple browsers |
| Network issues | Low | Low | Test offline behavior |
| State sync issues | Low | High | Test rapid state changes |

---

## 7. Test Scenarios & Cases

### Test Suite 1: Todo Creation

#### TC-001: Add Single Todo
**Priority:** Critical | **Type:** Functional

**Objective:** Verify that users can add a single todo item to the list

**Preconditions:**
- Application is loaded
- Input field is empty and focused

**Test Steps:**
1. Type "Learn Playwright CLI" in the input field
   - **Expected:** Text appears in input field
2. Press Enter
   - **Expected:** Todo is added to the list below
3. Verify the todo appears with an unchecked checkbox
   - **Expected:** Todo is visible in the list
4. Verify counter shows "1 item left!"
   - **Expected:** Item counter updates correctly

**Post-conditions:**
- Input field is cleared and ready for new entry
- Todo remains in the list

---

#### TC-002: Add Multiple Todos
**Priority:** High | **Type:** Functional

**Objective:** Verify that multiple todos can be added sequentially

**Preconditions:**
- Application is loaded
- No todos exist in the list

**Test Steps:**
1. Add first todo: "Learn Playwright CLI"
   - **Expected:** First todo appears in list
2. Add second todo: "Test TodoMVC functionality"
   - **Expected:** Second todo appears in list
3. Add third todo: "Explore features"
   - **Expected:** Third todo appears in list
4. Verify counter shows "3 items left!"
   - **Expected:** Counter correctly reflects all active items

**Post-conditions:**
- All three todos are visible in the list
- Input field is empty

---

#### TC-003: Add Empty or Whitespace Todo
**Priority:** Medium | **Type:** Edge Case

**Objective:** Verify behavior when adding empty or whitespace-only todos

**Test Steps:**
1. Press Enter without typing anything
   - **Expected:** No new todo is added, input remains empty
2. Type only spaces and press Enter
   - **Expected:** Either no todo is added or empty todo is not displayed

**Post-conditions:**
- No empty todos in the list

---

### Test Suite 2: Todo Completion

#### TC-004: Complete Single Todo
**Priority:** Critical | **Type:** Functional

**Objective:** Verify that todos can be marked as complete

**Preconditions:**
- At least one uncompleted todo exists
- Todo: "Learn Playwright CLI"

**Test Steps:**
1. Click the checkbox next to the todo
   - **Expected:** Checkbox becomes checked
2. Observe the todo item styling
   - **Expected:** Todo may show strikethrough or different styling
3. Verify counter updates to "1 item left!"
   - **Expected:** Counter decreases by 1

**Post-conditions:**
- Todo remains in the list with completed state
- Counter reflects active items only

---

#### TC-005: Uncomplete a Completed Todo
**Priority:** High | **Type:** Functional

**Objective:** Verify that completed todos can be marked as incomplete

**Preconditions:**
- One completed todo exists
- Todo: "Learn Playwright CLI" is checked

**Test Steps:**
1. Click the checkbox of the completed todo
   - **Expected:** Checkbox becomes unchecked
2. Observe the todo item styling
   - **Expected:** Completed styling is removed
3. Verify counter updates back to "2 items left!"
   - **Expected:** Counter increases by 1

**Post-conditions:**
- Todo is back to uncompleted state
- Counter updates correctly

---

### Test Suite 3: Todo Editing

#### TC-006: Edit Todo via Double-Click
**Priority:** High | **Type:** Functional

**Objective:** Verify that todos can be edited inline

**Preconditions:**
- Todo exists: "Test TodoMVC functionality"
- Todo is in view

**Test Steps:**
1. Double-click on the todo text
   - **Expected:** Todo text becomes editable in a textbox
2. Clear the current text and type new text: "Explore TodoMVC features completed!"
   - **Expected:** New text is entered in the textbox
3. Press Enter to save
   - **Expected:** Edit mode exits, todo text is updated

**Post-conditions:**
- Todo displays updated text
- Checkbox and delete button are visible again
- Edit mode is exited

---

#### TC-007: Cancel Edit with Escape Key
**Priority:** Medium | **Type:** Functional

**Objective:** Verify that editing can be cancelled without saving

**Preconditions:**
- Todo in edit mode: "Test TodoMVC functionality"

**Test Steps:**
1. Double-click on todo to enter edit mode
   - **Expected:** Textbox appears
2. Type new text: "Modified text"
   - **Expected:** New text appears in textbox
3. Press Escape key
   - **Expected:** Edit mode exits without saving
4. Verify original text is displayed
   - **Expected:** Text reverts to "Test TodoMVC functionality"

**Post-conditions:**
- Todo text is unchanged
- Edit mode is exited

---

### Test Suite 4: Todo Deletion

#### TC-008: Delete Individual Todo
**Priority:** Critical | **Type:** Functional

**Objective:** Verify that individual todos can be deleted

**Preconditions:**
- Two or more todos exist
- Todo to delete: "Explore features"

**Test Steps:**
1. Hover over the todo or locate the delete button (×)
   - **Expected:** Delete button becomes visible/clickable
2. Click the delete button
   - **Expected:** Todo is removed from the list
3. Verify counter updates appropriately
   - **Expected:** Counter decreases if item was active

**Post-conditions:**
- Todo is completely removed
- Counter reflects remaining active items

---

#### TC-009: Delete All Todos
**Priority:** Medium | **Type:** Functional

**Objective:** Verify behavior when deleting all todos

**Preconditions:**
- Multiple todos exist in the list

**Test Steps:**
1. Delete first todo
   - **Expected:** Todo is removed
2. Delete second todo
   - **Expected:** Todo is removed
3. Delete all remaining todos
   - **Expected:** List becomes empty
4. Verify input field is still visible and functional
   - **Expected:** User can add new todos

**Post-conditions:**
- List is completely empty
- Input field is ready for new entries

---

### Test Suite 5: Filtering

#### TC-010: Filter - All View
**Priority:** High | **Type:** Functional

**Objective:** Verify that "All" filter shows all todos regardless of status

**Preconditions:**
- Todos exist: 1 completed, 1 active

**Test Steps:**
1. Click the "All" filter link
   - **Expected:** URL changes to #/
2. Verify both completed and active todos are visible
   - **Expected:** All todos display in the list
3. Verify "All" link appears highlighted/active
   - **Expected:** Current filter is indicated

**Post-conditions:**
- Both completed and active todos visible
- "All" link is marked as active

---

#### TC-011: Filter - Active View
**Priority:** High | **Type:** Functional

**Objective:** Verify that "Active" filter shows only uncompleted todos

**Preconditions:**
- Todos exist: 1 completed, 1 active

**Test Steps:**
1. Click the "Active" filter link
   - **Expected:** URL changes to #/active
2. Verify only active (uncompleted) todos are displayed
   - **Expected:** Completed todo is hidden
3. Completed todo is NOT visible
   - **Expected:** Only "Test TodoMVC functionality" shows
4. Verify "Active" link appears highlighted
   - **Expected:** Current filter is indicated

**Post-conditions:**
- Only active todos visible
- "Active" link is marked as active

---

#### TC-012: Filter - Completed View
**Priority:** High | **Type:** Functional

**Objective:** Verify that "Completed" filter shows only completed todos

**Preconditions:**
- Todos exist: 1 completed, 1 active

**Test Steps:**
1. Click the "Completed" filter link
   - **Expected:** URL changes to #/completed
2. Verify only completed todos are displayed
   - **Expected:** Active todo is hidden
3. Verify "Completed" link appears highlighted
   - **Expected:** Current filter is indicated

**Post-conditions:**
- Only completed todos visible
- "Completed" link is marked as active

---

### Test Suite 6: Bulk Operations

#### TC-013: Toggle All - Check All Todos
**Priority:** High | **Type:** Functional

**Objective:** Verify that "Toggle All" checkbox completes all todos

**Preconditions:**
- Multiple active todos exist
- Counter shows "3 items left!"

**Test Steps:**
1. Click the "Toggle All" checkbox
   - **Expected:** Checkbox becomes checked
2. Verify all todos are marked as complete
   - **Expected:** All todo checkboxes are checked
3. Verify counter changes to "0 items left!"
   - **Expected:** Counter shows no active items

**Post-conditions:**
- All todos are completed
- Counter reflects 0 active items

---

#### TC-014: Toggle All - Uncheck All Todos
**Priority:** High | **Type:** Functional

**Objective:** Verify that "Toggle All" unchecks all completed todos

**Preconditions:**
- All todos are completed
- Toggle All checkbox is checked

**Test Steps:**
1. Click the "Toggle All" checkbox
   - **Expected:** Checkbox becomes unchecked
2. Verify all todos are marked as incomplete
   - **Expected:** All todo checkboxes are unchecked
3. Verify counter shows all items as active
   - **Expected:** Counter reflects all items

**Post-conditions:**
- All todos are active again
- Toggle All is unchecked

---

#### TC-015: Clear Completed
**Priority:** High | **Type:** Functional

**Objective:** Verify that "Clear Completed" removes all completed todos

**Preconditions:**
- At least one completed and one active todo exist
- "Clear Completed" button is enabled

**Test Steps:**
1. Click the "Clear Completed" button
   - **Expected:** All completed todos are removed
2. Verify only active todos remain
   - **Expected:** "Learn Playwright CLI" is removed
3. Verify "Clear Completed" button becomes disabled
   - **Expected:** Button is disabled when no completed todos exist

**Post-conditions:**
- Only active todos remain
- "Clear Completed" button is disabled

---

](#TC-016: Clear Completed When Empty
**Priority:** Medium | **Type:** Edge Case

**Objective:** Verify "Clear Completed" button behavior when no completed todos exist

**Preconditions:**
- Only active todos exist
- No completed todos

**Test Steps:**
1. Observe the "Clear Completed" button
   - **Expected:** Button is disabled/grayed out
2. Attempt to click the button
   - **Expected:** No action occurs

**Post-conditions:**
- Button remains disabled
- No todos are affected

---

### Test Suite 7: Data Persistence

#### TC-017: Todos Persist After Page Reload
**Priority:** High | **Type:** Functional

**Objective:** Verify that todos are saved and restored after page reload

**Preconditions:**
- Multiple todos exist with mixed completion states

**Test Steps:**
1. Open the todo app and add: "Test persistence - Item 1"
2. Add: "Test persistence - Item 2" and mark as complete
3. Refresh the page
   - **Expected:** Page reloads
4. Verify todos are restored
   - **Expected:** Both todos appear with correct states
5. Verify completion status is preserved
   - **Expected:** Item 2 is still marked as complete

**Post-conditions:**
- All todos and their states are preserved
- localStorage is functioning correctly

---

#### TC-018: Empty List After Clear
**Priority:** Medium | **Type:** Functional

**Objective:** Verify that clearing all todos and reloading shows empty list

**Preconditions:**
- Todos exist in the list

**Test Steps:**
1. Delete all todos
2. Refresh the page
   - **Expected:** Page reloads
3. Verify list is empty
   - **Expected:** No todos are displayed

**Post-conditions:**
- List is empty and clean

---

### Test Suite 8: UI/UX & Accessibility

#### TC-019: Input Field Placeholder
**Priority:** Medium | **Type:** UI

**Objective:** Verify input field displays placeholder text

**Test Steps:**
1. Load the application
   - **Expected:** Input field is visible
2. Verify placeholder text "What needs to be done?"
   - **Expected:** Placeholder is displayed when input is empty

**Post-conditions:**
- Placeholder text is visible and clear

---

#### TC-020: Counter Display Accuracy
**Priority:** High | **Type:** Functional

**Objective:** Verify item counter always shows correct count

**Test Steps:**
1. Start with empty list, counter should show nothing
2. Add one todo
   - **Expected:** Counter shows "1 item left!"
3. Add another todo
   - **Expected:** Counter shows "2 items left!"
4. Complete one todo
   - **Expected:** Counter shows "1 item left!"
5. Complete the other
   - **Expected:** Counter shows "0 items left!"

**Post-conditions:**
- Counter is always accurate

---

#### TC-021: Footer Links
**Priority:** Low | **Type:** UI

**Objective:** Verify footer information and links are present

**Test Steps:**
1. Scroll to footer
   - **Expected:** Footer is visible
2. Verify text: "Double-click to edit a todo"
   - **Expected:** Instructions are displayed
3. Verify "TodoMVC" link is present
   - **Expected:** Link points to http://todomvc.com

**Post-conditions:**
- Footer is complete and functional

---

### Test Suite 9: State Management

#### TC-022: Rapid State Changes
**Priority:** Medium | **Type:** Stress Test

**Objective:** Verify state consistency under rapid changes

**Test Steps:**
1. Add three todos quickly
2. Complete them in random order
3. Delete them in random order
4. Verify counter is always accurate
   - **Expected:** Counter reflects current state
5. Verify UI doesn't break or show inconsistencies
   - **Expected:** UI remains stable

**Post-conditions:**
- Application handles rapid changes without errors

---

#### TC-023: Undo/Redo Not Available
**Priority:** Low | **Type:** Verification

**Objective:** Verify that undo/redo functionality is not promised

**Test Steps:**
1. Add a todo
2. Delete it
3. Attempt common undo shortcuts (Ctrl+Z, Cmd+Z)
   - **Expected:** No undo functionality (expected behavior)

**Post-conditions:**
- Application works as designed without undo

---

## 8. Test Execution Plan

### Phase 1: Smoke Testing (30 minutes)
- TC-001: Add Single Todo
- TC-004: Complete Single Todo
- TC-008: Delete Individual Todo
- TC-010: Filter - All View

### Phase 2: Functional Testing (90 minutes)
- Test Suite 2: Todo Completion (TC-004 to TC-005)
- Test Suite 3: Todo Editing (TC-006 to TC-007)
- Test Suite 4: Todo Deletion (TC-008 to TC-009)
- Test Suite 5: Filtering (TC-010 to TC-012)
- Test Suite 6: Bulk Operations (TC-013 to TC-016)

### Phase 3: Advanced Testing (30 minutes)
- Test Suite 7: Data Persistence (TC-017 to TC-018)
- Test Suite 8: UI/UX (TC-019 to TC-021)
- Test Suite 9: State Management (TC-022 to TC-023)

### Phase 4: Regression Testing (30 minutes)
- Run all critical and high-priority tests
- Verify no regressions from previous sessions

---

## 9. Defect Reporting

### Defect Template

**Defect ID:** DEF-XXX  
**Title:** [Component] - [Brief description]  
**Severity:** Critical | High | Medium | Low  
**Priority:** P1 | P2 | P3 | P4  

**Environment:**
- Browser: [Chrome/Firefox/Safari/Edge]
- OS: [Windows/macOS/Linux]
- URL: https://todomvc.com/examples/react/dist/

**Reproduction Steps:**
1. [Step 1]
2. [Step 2]
3. [Step 3]

**Expected Result:** [What should happen]

**Actual Result:** [What actually happened]

**Screenshot/Video:** [Attach evidence]

---

## 10. Sign-Off

| Role | Name | Date | Signature |
|------|------|------|-----------|
| QA Lead | [Name] | [Date] | |
| Developer | [Name] | [Date] | |
| Product Owner | [Name] | [Date] | |

---

## Appendix A: Test Data

### Sample Todos
- "Learn Playwright CLI"
- "Test TodoMVC functionality"
- "Explore features"
- "Complete QA testing"
- "Document test plan"

### Special Characters Test
- "Todo with @special #characters!"
- "Todo with émoji 🎉"
- "Todo with numbers 12345"
- "Todo with quotes \"quoted text\""

---

## Appendix B: Browser Compatibility Matrix

| Browser | Version | Status | Notes |
|---------|---------|--------|-------|
| Chrome | Latest | ✅ Primary | Used for main testing |
| Firefox | Latest | ⚠️ Secondary | Verify compatibility |
| Safari | Latest | ⚠️ Secondary | macOS only |
| Edge | Latest | ⚠️ Secondary | Windows only |

---

**Document Version:** 1.0  
**Last Updated:** March 29, 2026  
**Next Review:** After feature updates or monthly
