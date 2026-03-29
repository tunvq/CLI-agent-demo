// TodoMVC React - Playwright Test Automation
// Complete test suite based on the QA test plan
const { test, expect } = require('@playwright/test');

const TODO_MVC_URL = 'https://todomvc.com/examples/react/dist/';

test.describe('TodoMVC React - QA Test Suite', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto(TODO_MVC_URL);
  });

  test.describe('Test Suite 1: Todo Creation', () => {
    
    test('TC-001: Add single todo and verify display', async ({ page }) => {
      // Verify initial state
      const todoList = page.locator('ul.todo-list li');
      await expect(todoList).toHaveCount(0);
      
      // Add a todo
      const input = page.locator('.new-todo');
      await input.fill('Learn Playwright');
      await page.keyboard.press('Enter');
      
      // Verify todo was added
      const todoItem = page.locator('ul.todo-list li').first();
      await expect(todoItem).toContainText('Learn Playwright');
      
      // Verify counter
      const counter = page.locator('.todo-count');
      await expect(counter).toContainText('1 item left');
    });

    test('TC-002: Add multiple todos', async ({ page }) => {
      const input = page.locator('.new-todo');
      
      // Add first todo
      await input.fill('Todo 1');
      await page.keyboard.press('Enter');
      
      // Add second todo
      await input.fill('Todo 2');
      await page.keyboard.press('Enter');
      
      // Verify both todos exist
      const todoItems = page.locator('ul.todo-list li');
      await expect(todoItems).toHaveCount(2);
      
      // Verify counter
      const counter = page.locator('.todo-count');
      await expect(counter).toContainText('2 items left');
    });

    test('TC-003: Add empty todo (should not create)', async ({ page }) => {
      // Try to add empty todo
      const input = page.locator('.new-todo');
      await input.fill('');
      await page.keyboard.press('Enter');
      
      // Verify no todo was created
      const todoList = page.locator('ul.todo-list li');
      await expect(todoList).toHaveCount(0);
    });
  });

  test.describe('Test Suite 2: Todo Completion', () => {
    
    test.beforeEach(async ({ page }) => {
      // Setup: Add a test todo
      const input = page.locator('.new-todo');
      await input.fill('Test Todo');
      await page.keyboard.press('Enter');
    });

    test('TC-004: Mark todo as complete', async ({ page }) => {
      // Complete the todo
      const checkbox = page.locator('ul.todo-list li input[type="checkbox"]').first();
      await checkbox.check();
      
      // Verify completion
      await expect(checkbox).toBeChecked();
      
      // Verify counter updates
      const counter = page.locator('.todo-count');
      await expect(counter).toContainText('0 items left');
    });

    test('TC-005: Unmark completed todo', async ({ page }) => {
      // First complete the todo
      const checkbox = page.locator('ul.todo-list li input[type="checkbox"]').first();
      await checkbox.check();
      
      // Then uncheck it
      await checkbox.uncheck();
      
      // Verify it's unchecked
      await expect(checkbox).not.toBeChecked();
      
      // Verify counter updates
      const counter = page.locator('.todo-count');
      await expect(counter).toContainText('1 item left');
    });
  });

  test.describe('Test Suite 3: Todo Editing', () => {
    
    test.beforeEach(async ({ page }) => {
      // Setup: Add a test todo
      const input = page.locator('.new-todo');
      await input.fill('Original Text');
      await page.keyboard.press('Enter');
    });

    test('TC-006: Edit todo text', async ({ page }) => {
      // Double click to edit
      const todoLabel = page.locator('ul.todo-list li label').first();
      await todoLabel.dblclick();
      
      // Edit the text
      const editInput = page.locator('ul.todo-list li input.edit').first();
      await editInput.fill('Edited Text');
      await page.keyboard.press('Enter');
      
      // Verify the text was changed
      await expect(todoLabel).toContainText('Edited Text');
    });

    test('TC-007: Cancel edit with Escape', async ({ page }) => {
      const originalText = 'Original Text';
      
      // Double click to edit
      const todoLabel = page.locator('ul.todo-list li label').first();
      await todoLabel.dblclick();
      
      // Start editing but cancel with Escape
      const editInput = page.locator('ul.todo-list li input.edit').first();
      await editInput.fill('Should be cancelled');
      await page.keyboard.press('Escape');
      
      // Verify original text is preserved
      await expect(todoLabel).toContainText(originalText);
    });
  });

  test.describe('Test Suite 4: Todo Deletion', () => {
    
    test('TC-008: Delete single todo', async ({ page }) => {
      // Setup: Add a todo
      const input = page.locator('.new-todo');
      await input.fill('Delete Me');
      await page.keyboard.press('Enter');
      
      // Hover to reveal delete button and click
      const todoItem = page.locator('ul.todo-list li').first();
      await todoItem.hover();
      
      const deleteButton = todoItem.locator('button.destroy');
      await deleteButton.click();
      
      // Verify todo was deleted
      const todoList = page.locator('ul.todo-list li');
      await expect(todoList).toHaveCount(0);
    });

    test('TC-009: Delete completed todo', async ({ page }) => {
      // Setup: Add and complete a todo
      const input = page.locator('.new-todo');
      await input.fill('Complete and Delete');
      await page.keyboard.press('Enter');
      
      const checkbox = page.locator('ul.todo-list li input[type="checkbox"]').first();
      await checkbox.check();
      
      // Delete the completed todo
      const todoItem = page.locator('ul.todo-list li').first();
      await todoItem.hover();
      
      const deleteButton = todoItem.locator('button.destroy');
      await deleteButton.click();
      
      // Verify deletion
      const todoList = page.locator('ul.todo-list li');
      await expect(todoList).toHaveCount(0);
    });
  });

  test.describe('Test Suite 5: Filtering', () => {
    
    test.beforeEach(async ({ page }) => {
      // Setup: Add mixed todos
      const input = page.locator('.new-todo');
      
      await input.fill('Active Todo 1');
      await page.keyboard.press('Enter');
      
      await input.fill('Active Todo 2');
      await page.keyboard.press('Enter');
      
      await input.fill('Completed Todo');
      await page.keyboard.press('Enter');
      
      // Complete one todo
      const firstCheckbox = page.locator('ul.todo-list li input[type="checkbox"]').first();
      await firstCheckbox.check();
    });

    test('TC-010: Filter - All View', async ({ page }) => {
      // Click All filter
      const allLink = page.locator('a[href="#/"]');
      await allLink.click();
      
      // Verify all todos are visible
      const todoItems = page.locator('ul.todo-list li');
      await expect(todoItems).toHaveCount(3);
      
      // Verify URL
      await expect(page).toHaveURL(/.*#\/$/);
    });

    test('TC-011: Filter - Active View', async ({ page }) => {
      // Click Active filter
      const activeLink = page.locator('a[href="#/active"]');
      await activeLink.click();
      
      // Verify only active todos are visible
      const todoItems = page.locator('ul.todo-list li');
      await expect(todoItems).toHaveCount(2);
      
      // Verify URL
      await expect(page).toHaveURL(/.*#\/active$/);
    });

    test('TC-012: Filter - Completed View', async ({ page }) => {
      // Click Completed filter
      const completedLink = page.locator('a[href="#/completed"]');
      await completedLink.click();
      
      // Verify only completed todos are visible
      const todoItems = page.locator('ul.todo-list li');
      await expect(todoItems).toHaveCount(1);
      
      // Verify URL
      await expect(page).toHaveURL(/.*#\/completed$/);
    });
  });

  test.describe('Test Suite 6: Bulk Operations', () => {
    
    test.beforeEach(async ({ page }) => {
      // Setup: Add multiple todos
      const input = page.locator('.new-todo');
      
      await input.fill('Todo 1');
      await page.keyboard.press('Enter');
      
      await input.fill('Todo 2');
      await page.keyboard.press('Enter');
      
      await input.fill('Todo 3');
      await page.keyboard.press('Enter');
    });

    test('TC-013: Toggle all todos completion', async ({ page }) => {
      // Click toggle all checkbox
      const toggleAll = page.locator('.toggle-all');
      await toggleAll.check();
      
      // Verify all todos are completed
      const checkboxes = page.locator('ul.todo-list li input[type="checkbox"]');
      await expect(checkboxes.first()).toBeChecked();
      await expect(checkboxes.nth(1)).toBeChecked();
      await expect(checkboxes.nth(2)).toBeChecked();
      
      // Verify counter
      const counter = page.locator('.todo-count');
      await expect(counter).toContainText('0 items left');
    });

    test('TC-014: Clear completed todos', async ({ page }) => {
      // Complete some todos
      const firstCheckbox = page.locator('ul.todo-list li input[type="checkbox"]').first();
      const secondCheckbox = page.locator('ul.todo-list li input[type="checkbox"]').nth(1);
      
      await firstCheckbox.check();
      await secondCheckbox.check();
      
      // Click clear completed button
      const clearButton = page.locator('.clear-completed');
      await clearButton.click();
      
      // Verify only active todos remain
      const todoItems = page.locator('ul.todo-list li');
      await expect(todoItems).toHaveCount(1);
    });
  });

  test.describe('Test Suite 7: Data Persistence', () => {
    
    test('TC-015: Data persists after page reload', async ({ page }) => {
      // Add a todo
      const input = page.locator('.new-todo');
      await input.fill('Persistent Todo');
      await page.keyboard.press('Enter');
      
      // Reload page
      await page.reload();
      
      // Verify todo still exists
      const todoItem = page.locator('ul.todo-list li').first();
      await expect(todoItem).toContainText('Persistent Todo');
    });

    test('TC-016: Completed state persists after page reload', async ({ page }) => {
      // Add and complete a todo
      const input = page.locator('.new-todo');
      await input.fill('Complete and Persist');
      await page.keyboard.press('Enter');
      
      const checkbox = page.locator('ul.todo-list li input[type="checkbox"]').first();
      await checkbox.check();
      
      // Reload page
      await page.reload();
      
      // Verify todo is still completed
      const reloadedCheckbox = page.locator('ul.todo-list li input[type="checkbox"]').first();
      await expect(reloadedCheckbox).toBeChecked();
    });
  });

  test.describe('Test Suite 8: UI/UX Elements', () => {
    
    test('TC-017: Verify page title and main elements', async ({ page }) => {
      // Verify page title
      await expect(page).toHaveTitle(/TodoMVC/);
      
      // Verify main elements exist
      const header = page.locator('header.header');
      await expect(header).toBeVisible();
      
      const input = page.locator('.new-todo');
      await expect(input).toBeVisible();
      await expect(input).toHaveAttribute('placeholder', 'What needs to be done?');
    });
  });

  test.describe('Test Suite 9: Accessibility', () => {
    
    test('TC-018: Keyboard navigation works', async ({ page }) => {
      // Add todo using keyboard
      const input = page.locator('.new-todo');
      await input.focus();
      await page.keyboard.type('Keyboard Todo');
      await page.keyboard.press('Enter');
      
      // Verify todo was added
      const todoItem = page.locator('ul.todo-list li').first();
      await expect(todoItem).toContainText('Keyboard Todo');
    });

    test('TC-019: Screen reader elements present', async ({ page }) => {
      // Add a todo first
      const input = page.locator('.new-todo');
      await input.fill('Accessibility Test');
      await page.keyboard.press('Enter');
      
      // Check for accessible elements
      const todoItem = page.locator('ul.todo-list li').first();
      const label = todoItem.locator('label');
      
      await expect(label).toBeVisible();
      await expect(todoItem.locator('input[type="checkbox"]')).toBeVisible();
    });
  });
});