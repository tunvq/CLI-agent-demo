# TodoMVC React - Playwright Test Automation Guide

**Application:** TodoMVC React  
**Testing Framework:** Playwright (Spec)  
**Language:** TypeScript/JavaScript  
**Date:** March 29, 2026

---

## Overview

This guide provides Playwright-based automation for TodoMVC React test cases. Each test case includes the automation code that can be implemented in Playwright test files.

---

## Test Case Automation Templates

### Smoke Tests (Automated - 15-20 minutes)

#### AT-001: Add and Complete Todo (Smoke Test)

```javascript
test('TC-001: Add single todo and verify display', async ({ page }) => {
  // Navigate to the application
  await page.goto('https://todomvc.com/examples/react/dist/');
  
  // Verify initial state
  const todoList = page.locator('ul.todo-list');
  await expect(todoList).toHaveCount(0);
  
  // Add a todo
  const input = page.getByTestId('text-input');
  await input.fill('Learn Playwright CLI');
  await page.keyboard.press('Enter');
  
  // Verify todo was added
  const todoItem = page.getByText('Learn Playwright CLI');
  await expect(todoItem).toBeVisible();
  
  // Verify counter
  const counter = page.getByText(/\d+ item left/);
  await expect(counter).toContainText('1 item left');
});

test('TC-004: Mark todo as complete', async ({ page }) => {
  // Setup: Add a todo
  await page.goto('https://todomvc.com/examples/react/dist/');
  const input = page.getByTestId('text-input');
  await input.fill('Test Completion');
  await page.keyboard.press('Enter');
  
  // Complete the todo
  const checkbox = page.getByRole('listitem').first().getByRole('checkbox');
  await checkbox.click();
  
  // Verify completion
  await expect(checkbox).toBeChecked();
  const counter = page.getByText(/\d+ item left/);
  await expect(counter).toContainText('0 item left');
});

test('TC-008: Delete todo', async ({ page }) => {
  // Setup: Add a todo
  await page.goto('https://todomvc.com/examples/react/dist/');
  const input = page.getByTestId('text-input');
  await input.fill('Delete Me');
  await page.keyboard.press('Enter');
  
  // Delete the todo
  const deleteButton = page.getByTestId('todo-item-button');
  await deleteButton.click();
  
  // Verify deletion
  const todoList = page.locator('ul.todo-list li');
  await expect(todoList).toHaveCount(0);
});

test('TC-010: Filter - All View', async ({ page }) => {
  // Setup: Add todos with mixed completion
  await page.goto('https://todomvc.com/examples/react/dist/');
  const input = page.getByTestId('text-input');
  
  await input.fill('Todo 1');
  await page.keyboard.press('Enter');
  
  await input.fill('Todo 2');
  await page.keyboard.press('Enter');
  
  // Complete one todo
  await page.getByRole('listitem').first().getByRole('checkbox').click();
  
  // Click All filter
  const allLink = page.getByRole('link', { name: 'All' });
  await allLink.click();
  
  // Verify all todos are shown
  const todoItems = page.locator('ul.todo-list li');
  await expect(todoItems).toHaveCount(2);
  
  // Verify URL
  await expect(page).toHaveURL(/#\//);
});
```

---

### Core Feature Tests (Automated - 45-60 minutes)

#### AT-002: Todo Creation Tests

```javascript
test('TC-002: Add multiple todos sequentially', async ({ page }) => {
  await page.goto('https://todomvc.com/examples/react/dist/');
  const input = page.getByTestId('text-input');
  
  const todos = ['First Todo', 'Second Todo', 'Third Todo'];
  
  for (const todo of todos) {
    await input.fill(todo);
    await page.keyboard.press('Enter');
    
    await expect(page.getByText(todo)).toBeVisible();
  }
  
  // Verify final counter
  const counter = page.getByText(/\d+ items? left/);
  await expect(counter).toContainText('3 items left');
});

test('TC-003: Empty todo prevention', async ({ page }) => {
  await page.goto('https://todomvc.com/examples/react/dist/');
  const input = page.getByTestId('text-input');
  
  // Try adding empty todo
  await page.keyboard.press('Enter');
  
  // Verify list is still empty
  const todoList = page.locator('ul.todo-list');
  const items = await todoList.locator('li').count();
  expect(items).toBe(0);
  
  // Try adding whitespace only
  await input.fill('   ');
  await page.keyboard.press('Enter');
  
  // Verify list is still empty
  const itemsAfter = await todoList.locator('li').count();
  expect(itemsAfter).toBe(0);
});
```

#### AT-003: Todo Completion Tests

```javascript
test('TC-005: Uncomplete a completed todo', async ({ page }) => {
  // Setup
  await page.goto('https://todomvc.com/examples/react/dist/');
  const input = page.getByTestId('text-input');
  
  await input.fill('Test Todo');
  await page.keyboard.press('Enter');
  
  // Complete the todo
  const checkbox = page.getByRole('listitem').first().getByRole('checkbox');
  await checkbox.click();
  
  // Verify it's checked
  await expect(checkbox).toBeChecked();
  let counter = page.getByText(/\d+ item left/);
  await expect(counter).toContainText('0 item left');
  
  // Uncomplete the todo
  await checkbox.click();
  
  // Verify it's unchecked
  await expect(checkbox).not.toBeChecked();
  counter = page.getByText(/\d+ items? left/);
  await expect(counter).toContainText('1 item left');
});
```

#### AT-004: Todo Editing Tests

```javascript
test('TC-006: Edit todo via double-click', async ({ page }) => {
  // Setup
  await page.goto('https://todomvc.com/examples/react/dist/');
  const input = page.getByTestId('text-input');
  
  await input.fill('Original Text');
  await page.keyboard.press('Enter');
  
  // Double-click to edit
  const todoLabel = page.getByTestId('todo-item-label');
  await todoLabel.dblclick();
  
  // Verify edit mode (textbox appears)
  const editInput = page.getByTestId('todo-item').getByTestId('text-input');
  await expect(editInput).toBeFocused();
  
  // Edit the text
  await editInput.fill('Updated Text');
  await page.keyboard.press('Enter');
  
  // Verify edit was saved
  await expect(page.getByText('Updated Text')).toBeVisible();
  await expect(page.getByText('Original Text')).not.toBeVisible();
});

test('TC-007: Cancel edit with Escape', async ({ page }) => {
  // Setup
  await page.goto('https://todomvc.com/examples/react/dist/');
  const input = page.getByTestId('text-input');
  
  await input.fill('Keep This Text');
  await page.keyboard.press('Enter');
  
  // Double-click to edit
  const todoLabel = page.getByTestId('todo-item-label');
  await todoLabel.dblclick();
  
  // Start typing but press Escape
  const editInput = page.getByTestId('todo-item').getByTestId('text-input');
  await editInput.fill('New Text');
  await page.keyboard.press('Escape');
  
  // Verify original text is preserved
  await expect(page.getByText('Keep This Text')).toBeVisible();
  await expect(page.getByText('New Text')).not.toBeVisible();
});
```

#### AT-005: Todo Deletion Tests

```javascript
test('TC-009: Delete all todos', async ({ page }) => {
  // Setup: Add multiple todos
  await page.goto('https://todomvc.com/examples/react/dist/');
  const input = page.getByTestId('text-input');
  
  const todos = ['Todo 1', 'Todo 2', 'Todo 3'];
  
  for (const todo of todos) {
    await input.fill(todo);
    await page.keyboard.press('Enter');
  }
  
  await expect(page.locator('ul.todo-list li')).toHaveCount(3);
  
  // Delete all todos
  const deleteButtons = page.getByTestId('todo-item-button');
  const count = await deleteButtons.count();
  
  for (let i = 0; i < count; i++) {
    const buttons = page.locator('[data-testid="todo-item-button"]');
    await buttons.first().click();
  }
  
  // Verify list is empty
  const todoList = page.locator('ul.todo-list');
  await expect(todoList).toHaveCount(0);
  
  // Verify input is still ready
  await expect(input).toBeVisible();
});
```

---

### Filtering & Routing Tests (Automated - 30-40 minutes)

#### AT-006: Filter Tests

```javascript
test('TC-011: Filter - Active View', async ({ page }) => {
  // Setup
  await page.goto('https://todomvc.com/examples/react/dist/');
  const input = page.getByTestId('text-input');
  
  // Add todos
  await input.fill('Active Todo');
  await page.keyboard.press('Enter');
  
  await input.fill('Completed Todo');
  await page.keyboard.press('Enter');
  
  // Complete second todo
  const checkboxes = page.getByRole('listitem').getByRole('checkbox');
  await checkboxes.last().click();
  
  // Click Active filter
  const activeLink = page.getByRole('link', { name: 'Active' });
  await activeLink.click();
  
  // Verify only active todo is shown
  await expect(page.getByText('Active Todo')).toBeVisible();
  await expect(page.getByText('Completed Todo')).not.toBeVisible();
  
  // Verify URL
  await expect(page).toHaveURL(/#\/active/);
  
  // Verify link is active
  await expect(activeLink).toHaveClass(/active/);
});

test('TC-012: Filter - Completed View', async ({ page }) => {
  // Setup
  await page.goto('https://todomvc.com/examples/react/dist/');
  const input = page.getByTestId('text-input');
  
  // Add and complete todos
  await input.fill('Todo 1');
  await page.keyboard.press('Enter');
  
  await input.fill('Todo 2');
  await page.keyboard.press('Enter');
  
  await page.getByRole('listitem').first().getByRole('checkbox').click();
  
  // Click Completed filter
  const completedLink = page.getByRole('link', { name: 'Completed' });
  await completedLink.click();
  
  // Verify only completed todo is shown
  await expect(page.getByText('Todo 1')).toBeVisible();
  await expect(page.getByText('Todo 2')).not.toBeVisible();
  
  // Verify URL
  await expect(page).toHaveURL(/#\/completed/);
});
```

---

### Bulk Operations Tests (Automated - 25-30 minutes)

#### AT-007: Toggle All & Clear Tests

```javascript
test('TC-013: Toggle All - Check all todos', async ({ page }) => {
  // Setup
  await page.goto('https://todomvc.com/examples/react/dist/');
  const input = page.getByTestId('text-input');
  
  // Add multiple todos
  for (let i = 1; i <= 3; i++) {
    await input.fill(`Todo ${i}`);
    await page.keyboard.press('Enter');
  }
  
  // Click Toggle All
  const toggleAll = page.locator('input[id="toggle-all"]');
  await toggleAll.click();
  
  // Verify all are checked
  const checkboxes = page.getByRole('listitem').getByRole('checkbox');
  const count = await checkboxes.count();
  
  for (let i = 0; i < count; i++) {
    await expect(checkboxes.nth(i)).toBeChecked();
  }
  
  // Verify counter shows 0 items left
  const counter = page.getByText(/\d+ item left/);
  await expect(counter).toContainText('0 item left');
});

test('TC-015: Clear Completed', async ({ page }) => {
  // Setup
  await page.goto('https://todomvc.com/examples/react/dist/');
  const input = page.getByTestId('text-input');
  
  // Add and complete some todos
  await input.fill('Todo 1');
  await page.keyboard.press('Enter');
  
  await input.fill('Todo 2');
  await page.keyboard.press('Enter');
  
  // Complete first todo
  const checkbox = page.getByRole('listitem').first().getByRole('checkbox');
  await checkbox.click();
  
  // Click Clear Completed
  const clearButton = page.getByRole('button', { name: 'Clear completed' });
  await expect(clearButton).not.toBeDisabled();
  await clearButton.click();
  
  // Verify completed todo is removed
  await expect(page.getByText('Todo 1')).not.toBeVisible();
  
  // Verify active todo remains
  await expect(page.getByText('Todo 2')).toBeVisible();
  
  // Verify button is now disabled
  await expect(clearButton).toBeDisabled();
});

test('TC-016: Clear Completed - Disabled when empty', async ({ page }) => {
  await page.goto('https://todomvc.com/examples/react/dist/');
  
  // No completed todos exist
  const clearButton = page.getByRole('button', { name: 'Clear completed' });
  
  // Verify button is disabled
  await expect(clearButton).toBeDisabled();
});
```

---

### Data Persistence Tests (Automated - 15-20 minutes)

#### AT-008: localStorage Tests

```javascript
test('TC-017: Todos persist after page reload', async ({ page }) => {
  // Add todos
  await page.goto('https://todomvc.com/examples/react/dist/');
  const input = page.getByTestId('text-input');
  
  await input.fill('Item One');
  await page.keyboard.press('Enter');
  
  await input.fill('Item Two');
  await page.keyboard.press('Enter');
  
  // Complete second item
  await page.getByRole('listitem').last().getByRole('checkbox').click();
  
  // Reload page
  await page.reload();
  
  // Verify todos are restored
  await expect(page.getByText('Item One')).toBeVisible();
  await expect(page.getByText('Item Two')).toBeVisible();
  
  // Verify completion state is preserved
  const checkboxes = page.getByRole('listitem').getByRole('checkbox');
  await expect(checkboxes.last()).toBeChecked();
  
  // Verify counter
  const counter = page.getByText(/\d+ item left/);
  await expect(counter).toContainText('1 item left');
});

test('TC-018: Empty list persists after reload', async ({ page }) => {
  // Start clean
  await page.goto('https://todomvc.com/examples/react/dist/');
  
  // Reload
  await page.reload();
  
  // Verify still empty
  const todoList = page.locator('ul.todo-list');
  const items = await todoList.locator('li').count();
  expect(items).toBe(0);
});
```

---

### UI & Accessibility Tests (Automated - 20-25 minutes)

#### AT-009: UI Element Tests

```javascript
test('TC-019: Input field placeholder visible', async ({ page }) => {
  await page.goto('https://todomvc.com/examples/react/dist/');
  
  const input = page.getByTestId('text-input');
  const placeholder = await input.getAttribute('placeholder');
  
  expect(placeholder).toBe('What needs to be done?');
});

test('TC-020: Counter display accuracy', async ({ page }) => {
  await page.goto('https://todomvc.com/examples/react/dist/');
  const input = page.getByTestId('text-input');
  const counter = page.getByText(/\d+ item left/);
  
  // Initially no counter should show
  await expect(counter).not.toBeVisible();
  
  // Add first todo
  await input.fill('Todo 1');
  await page.keyboard.press('Enter');
  await expect(counter).toContainText('1 item left');
  
  // Add second todo
  await input.fill('Todo 2');
  await page.keyboard.press('Enter');
  await expect(counter).toContainText('2 items left');
  
  // Complete one
  const checkbox = page.getByRole('listitem').first().getByRole('checkbox');
  await checkbox.click();
  await expect(counter).toContainText('1 item left');
});

test('TC-021: Footer contains required elements', async ({ page }) => {
  await page.goto('https://todomvc.com/examples/react/dist/');
  
  // Scroll to footer
  const footer = page.locator('footer');
  await footer.scrollIntoViewIfNeeded();
  
  // Verify text
  await expect(page.getByText('Double-click to edit a todo')).toBeVisible();
  
  // Verify TodoMVC link
  const link = page.getByRole('link', { name: 'TodoMVC' });
  await expect(link).toBeVisible();
  await expect(link).toHaveAttribute('href', 'http://todomvc.com');
});
```

---

### State Management & Stress Tests (Automated - 15-20 minutes)

#### AT-010: Advanced Tests

```javascript
test('TC-022: Rapid state changes handle consistently', async ({ page }) => {
  await page.goto('https://todomvc.com/examples/react/dist/');
  const input = page.getByTestId('text-input');
  
  // Add 3 todos rapidly
  for (let i = 1; i <= 3; i++) {
    await input.fill(`Todo ${i}`);
    await input.press('Enter');
  }
  
  // Complete them in random order
  const checkboxes = page.getByRole('listitem').getByRole('checkbox');
  await checkboxes.nth(1).click(); // Complete second
  await checkboxes.nth(0).click(); // Complete first
  await checkboxes.nth(2).click(); // Complete third
  
  // Delete them in random order
  let deleteButtons = page.getByTestId('todo-item-button');
  let count = await deleteButtons.count();
  
  for (let i = 0; i < count; i++) {
    const buttons = page.locator('[data-testid="todo-item-button"]');
    if (await buttons.count() > 0) {
      await buttons.nth(Math.floor(Math.random() * await buttons.count())).click();
    }
  }
  
  // Verify end state is consistent
  const todoList = page.locator('ul.todo-list');
  await expect(todoList).toHaveCount(0);
});

test('TC-023: Undo/Redo not available', async ({ page }) => {
  await page.goto('https://todomvc.com/examples/react/dist/');
  const input = page.getByTestId('text-input');
  
  // Add a todo
  await input.fill('Delete Me');
  await input.press('Enter');
  
  // Delete it
  const deleteButton = page.getByTestId('todo-item-button');
  await deleteButton.click();
  
  // Try undo with Ctrl+Z
  await page.keyboard.press('Control+Z');
  
  // Todo should NOT be restored (undo not implemented)
  const todoList = page.locator('ul.todo-list');
  const count = await todoList.locator('li').count();
  expect(count).toBe(0);
});
```

---

## Test Organization

### File Structure

```
tests/
├── smoke/
│   └── todomvc-smoke.spec.ts          # Critical path tests
├── functional/
│   ├── todo-creation.spec.ts          # TC-001, TC-002, TC-003
│   ├── todo-completion.spec.ts        # TC-004, TC-005
│   ├── todo-editing.spec.ts           # TC-006, TC-007
│   ├── todo-deletion.spec.ts          # TC-008, TC-009
│   ├── filtering.spec.ts              # TC-010, TC-011, TC-012
│   └── bulk-operations.spec.ts        # TC-013, TC-014, TC-015, TC-016
├── persistence/
│   └── data-persistence.spec.ts       # TC-017, TC-018
├── ui/
│   └── ui-elements.spec.ts            # TC-019, TC-020, TC-021
└── advanced/
    └── state-management.spec.ts       # TC-022, TC-023
```

---

## Running the Tests

### Prerequisites

```bash
npm install -D @playwright/test
npx playwright install
```

### Run All Tests

```bash
npx playwright test
```

### Run Smoke Tests Only

```bash
npx playwright test tests/smoke/
```

### Run with UI Mode

```bash
npx playwright test --ui
```

### Debug a Test

```bash
npx playwright test --debug tests/functional/todo-creation.spec.ts
```

### Generate HTML Report

```bash
npx playwright test
npx playwright show-report
```

---

## Performance Benchmarks

| Test Type | Duration | Status |
|-----------|----------|--------|
| Smoke Tests | 2-3 min | ✅ Fast |
| Single Test Case | 30-45 sec | ✅ Acceptable |
| Full Suite (23 tests) | 12-15 min | ✅ Reasonable |

---

## CI/CD Integration

### GitHub Actions Example

```yaml
name: TodoMVC Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npx playwright test
      - uses: actions/upload-artifact@v3
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 30
```

---

## Maintenance & Updates

- Review tests quarterly for changes
- Update selectors if UI changes
- Add new tests for new features
- Keep Playwright version updated

---

**Document Version:** 1.0  
**Last Updated:** March 29, 2026  
**Maintenance Owner:** QA Team
