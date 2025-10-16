# Exercise 3 - Writing Unit Tests with GitHub Copilot Edit Mode

## 🎯 Learning Objectives

By the end of this exercise, you will:
- Understand how to use GitHub Copilot's Autocomplete feature and Edit mode for code modifications
- Learn to write comprehensive unit tests with AI assistance
- Improve existing code coverage using intelligent test generation
- Understand best practices for AI-assisted testing

## 🍎 Scenario: Improving The Daily Harvest's Test Coverage

Your manager at The Daily Harvest has noticed that some critical e-commerce functions lack proper test coverage. During yesterday's code review, the team identified several functions in the shopping cart module that need comprehensive unit tests before the next release.

Your task today is to use GitHub Copilot to write high-quality unit tests that will:
- Verify happy path scenarios such as the cart having items
- Test edge cases like the cart being empty
- Improve overall code quality and reliability

## ✏️ Step 1: Using Autocomplete to Generate One Additional Unit Test

To start off you'd like to generate one additional unit test. We can use GitHub Copilot's Autocomplete feature to make an addition to the unit test suite.

### Instructions:
1. Open the existing test file named `CartPage.test.tsx`
2. Place your cursor underneath the existing test and go to a new line.

   ![](../../media/where-to-add-new-unit-test.png)

3. Add a comment (starting with '//') stating that you'd like to test the condition where the cart displays an "empty cart message" when it is empty. 
   Please refer to the below sample comment if you get stuck.

   <details>
   <summary>Sample New Test Comment</summary>

     ```
     // Verify that an empty cart message is displayed when the cart is empty.
     ```

   </details>

4. After adding the comment you should press `Enter` to go to the next line. GitHub Copilot will start suggesting lines of code, and you can press `Tab` to accept
   one and then press `Enter` to go to the next line, repeating this process until the test is implemented. If GitHub Copilot starts suggesting the next test 
   you can simply press the `Esc` key to stop the code generation process.

6. Once the test is generated, try running it to make sure that it and the existing test pass. If there are any failures, try asking GitHub Copilot how to fix them.

## 💭 Step 2: Using Edit Mode to Generate Additional Unit Tests

There are many other tests that we can write for `CartPage`. While we could use Autocomplete to generate them, that would be very slow and cumbersome. We'll instead
use GitHub Copilot's Edit mode to create comprehensive unit tests.

### Why Edit Mode is Perfect for Unit Testing:
- 🎯 **Context-aware**: Understands your existing code structure and testing patterns
- 🔧 **Precise modifications**: Makes targeted changes without affecting unrelated code
- 📋 **Pattern recognition**: Follows your project's testing conventions and style
- 🚀 **Efficiency**: Generates comprehensive test suites quickly

### Instructions:
1. Open GitHub Copilot Chat and switch to Edit mode
2. Write prompts (examples are hidden below) to generate tests for uncovered conditions in `CartPage`
3. Run the newly-generated tests and use GitHub Copilot to help you correct any failures

### Basic Test Generation:

<details>
  <summary>Sample Test Generation Prompt</summary>

  ```
  Generate comprehensive unit tests for the CartPage class. Make sure to generate tests that cover negative scenarios and edge cases.
  ```

</details>

<details>
  <summary>More Specific Prompt</summary>

  ```
  Add unit tests that cover the following conditions if they have not already been covered:
   - Checkout button is displayed
   - Checkout modal is rendered properly
   - Checkout modal is closed if the checkout is canceled
  ```

</details>

### BONUS: Refine tests to handle an edge case that GitHub Copilot didn't cover initially

**Pro Tip:** The more specific and contextual your Edit mode prompts are, the better the generated code will be. Always review and iterate on AI-generated tests to ensure they meet your quality standards!

## 🎓 Step 3: Best Practices and Code Review

Let's use GitHub Copilot to review and improve our test quality.

### Instructions:

**Ask GitHub Copilot to review your unit tests and make suggestions for improvement. Consider implementing its suggestions if you have time.**

```
@workspace Do these tests follow testing best practices? Check the following and suggest improvements if needed.
- Clear and descriptive test names
- Single responsibility per test
- Clear arrange-act-assert structure
- Single assertion per test (when appropriate)
- Appropriate use of mocks/stubs
- Good error messages
- Good test data setup
- Proper error handling
- Performance considerations
- Maintainable test structure
```

## 🏆 Exercise Wrap-up

### 🎯 Key Skills Practiced:
- Using Autocomplete to make a single targeted code modification
- Using Edit mode to make multiple targeted code modifications
- Generating comprehensive unit test suites
- Iterating and improving AI-generated code
- Following testing best practices with AI assistance

### 💡 Reflection Questions:
1. **How did Edit mode compare to Autocomplete?**
   - Speed: _____________________
   - Quality: _____________________
   - Coverage: _____________________

2. **What types of test scenarios did GitHub Copilot excel at generating?**
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
