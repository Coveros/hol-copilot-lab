# Exercise 3 - Writing Unit Tests with GitHub Copilot Edit Mode

## 🎯 Learning Objectives

By the end of this exercise, you will:
- Understand how to use GitHub Copilot's Edit mode for code modifications
- Learn to write comprehensive unit tests with AI assistance
- Practice test-driven development workflows with Copilot
- Improve existing code coverage using intelligent test generation
- Understand best practices for AI-assisted testing

## 🍎 Scenario: Improving The Daily Harvest's Test Coverage

Your manager at The Daily Harvest has noticed that some critical e-commerce functions lack proper test coverage. During yesterday's code review, the team identified several functions in the shopping cart module that need comprehensive unit tests before the next release.

Your task today is to use GitHub Copilot's Edit mode to write high-quality unit tests that will:
- Ensure the shopping cart calculations are accurate
- Test edge cases like empty carts and invalid items
- Validate discount and tax calculations
- Improve the overall code quality and reliability

## 🛠️ Understanding GitHub Copilot Edit Mode

Edit mode is one of the most powerful features of GitHub Copilot Chat. Unlike Ask mode (which provides information), Edit mode actively modifies your code files.

### Edit Mode vs Other Modes:

| Mode | Action | Best For | Example Use |
|------|---------|----------|-------------|
| **Ask** | Provides information | Understanding code, getting explanations | "How does this function work?" |
| **Edit** | Modifies existing code | Adding features, refactoring, writing tests | "Add unit tests for this function" |
| **Agent** | Autonomous multi-file changes | Complex features, architecture changes | "Implement user authentication" |

### Why Edit Mode is Perfect for Unit Testing:
- 🎯 **Context-aware**: Understands your existing code structure and testing patterns
- 🔧 **Precise modifications**: Makes targeted changes without affecting unrelated code
- 📋 **Pattern recognition**: Follows your project's testing conventions and style
- 🚀 **Efficiency**: Generates comprehensive test suites quickly

## ✏️ Step 1: Using Edit Mode to Generate Basic Unit Tests

Now let's use Copilot's Edit mode to create comprehensive unit tests.

### Instructions:
1. Create or open your test file (e.g., `shoppingCart.test.js`)
2. Select the area where you want to add tests
3. Open Copilot Chat and switch to Edit mode
4. Write prompts (examples are hidden below) to generate tests for the following methods:
    - `addItem()`
    - `calculateSubtotal()`
    - `removeItem()`

### Basic Test Generation:

<details>
  <summary>Sample Edit Prompts</summary>
  ```
  Generate comprehensive unit tests for the ShoppingCart class. Include tests for adding items, calculating subtotals, and edge cases like empty carts.
  ```
</details>

<details>
  <summary>More Specific Prompts</summary>
  ```
  Add unit tests for the addItem method that cover:
   - Adding a new item
   - Adding quantity to existing item
   - Adding multiple different items
  ```
  
  ```
  Create tests for the calculateSubtotal method including:
   - Empty cart should return 0
   - Single item calculation
   - Multiple items calculation
   - Items with different quantities
  ```
</details>

### BONUS: Refine tests to handle an edge case that copilot didn't cover initially

**Pro Tip:** The more specific and contextual your Edit mode prompts are, the better the generated code will be. Always review and iterate on AI-generated tests to ensure they meet your quality standards!

### Run your tests and confirm they work, iterate if not

## 🎓 Step 7: Best Practices and Code Review

Let's use Copilot to review and improve our test quality.

### Instructions:

**Code Review with Copilot:**
```
@workspace Review these unit tests for best practices. Are there any improvements you'd suggest for maintainability, readability, or coverage?
```

**Testing Best Practices Check:**
```
Do these tests follow testing best practices? Check for:
- Single responsibility per test
- Clear arrange-act-assert structure
- Appropriate use of mocks/stubs
- Good error messages
```

### 📋 Test Quality Checklist:
Review your tests against these criteria:
- [ ] **Clear and descriptive test names**
- [ ] **Single assertion per test (when appropriate)**
- [ ] **Good test data setup**
- [ ] **Proper error handling tests**
- [ ] **Performance considerations**
- [ ] **Maintainable test structure**

## 🏆 Exercise Wrap-up

### 🎯 Key Skills Practiced:
- Using Edit mode for targeted code modifications
- Generating comprehensive unit test suites
- Iterating and improving AI-generated code
- Following testing best practices with AI assistance

### 💡 Reflection Questions:
1. **How did Edit mode compare to writing tests manually?**
   - Speed: _____________________
   - Quality: _____________________
   - Coverage: _____________________

2. **What types of test scenarios did Copilot excel at generating?**
   _____________________________________

3. **Where did you need to provide additional guidance or corrections?**
   _____________________________________

4. **How might you use Edit mode differently in future testing tasks?**
   _____________________________________


## 🚀 Next Steps

Great work! You've successfully used GitHub Copilot's Edit mode to:
- ✅ Generate comprehensive unit tests for critical business logic
- ✅ Cover edge cases and error conditions
- ✅ Improve code coverage and quality
- ✅ Follow testing best practices

### 🔮 Coming Up Next:
In Exercise 4, we'll explore GitHub Copilot's **Agent mode** to tackle more complex, multi-file tasks like implementing the complete shopping cart feature with database integration, API endpoints, and frontend components.