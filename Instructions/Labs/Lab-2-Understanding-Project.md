# Lab 02: Understanding the Project Using Ask Mode

#### Duration : 30 min

### Lab Overview:

This lab is designed to help you build confidence and clarity by actively engaging with Copilot to explore the project’s purpose, setup, and structure. You will create prompts to uncover what the project does, how to build and run it locally, and where existing tests and TODOs reside. This exercise encourages curiosity, reinforces technical comprehension, and sets the stage for deeper collaboration and contribution in later phases of the lab.

### Lab Objective  
You will get a baseline introduction to GitHub Copilot and then use it in Ask Mode to:
- Learn how to build the application and run it locally
- Identify existing tests and TODOs in the codebase
- Feel confident about what’s coming next

### Task 1: Baseline Introduction to GitHub Copilot

This task introduces you to GitHub's capabilities and how it differs from individual Copilot usage.

#### What is GitHub Copilot?

GitHub Copilot is an enterprise-grade AI coding assistant that integrates with GitHub and IDEs to accelerate development. It includes:

| Feature                        | Description                                                                 |
|--------------------------------|-----------------------------------------------------------------------------|
| **Ask Mode**                   | Natural language Q&A about code, setup, and architecture                    |
| **Autocomplete & Suggestions** | Inline code completions triggered by tab or typing context                  |
| **Agent Mode**                 | Goal-based scaffolding, refactoring, and code generation                    |
| **Custom Instructions**        | Tailor Copilot’s tone, style, and priorities                                |
| **Enterprise Controls**        | SAML SSO, repository access policies, and usage dashboards                  |

#### Use Cases

| Scenario                      | GHC Contribution                                      |
|------------------------------|-------------------------------------------------------|
| **Onboarding**               | Summarizes repo structure, explains unfamiliar code   |
| **Refactoring**              | Suggests cleaner logic, removes duplication           |
| **Documentation**            | Generates docstrings or XML comments automatically    |
| **Testing**                  | Writes unit tests with coverage goals                 |
| **Security Review**          | Flags risky patterns, suggests validation             |


### Task 2: Build & Run Locally 
In this step, you will use **Copilot** to understand the project structure and how to build and run the application locally.

**Explore the Project Structure**

Ppen your repo in Visual Studio Code and inspect the folder layout. If desired, you can ask Copilot to explain the purpose of each file and folder in the repository.

<details>
  <summary>Need a hint? Try this prompt.</summary>
  @workspace Walk me through the structure of this repository. Explain the purpose of each folder and file.
</details>

**Choose Your Development Language**

You should now select their preferred stack from these options:

| Language                           | Use Case                         | Strengths                                    |
|------------------------------------|----------------------------------|----------------------------------------------|
| **TypeScript (React/Vite)**        | TBD                              | TBD                                          |
| **LANGUAGE 2**                     | TBD                              | TBD                                          |
| **LANGUAGE 3**                     | TBD                              | TBD                                          |
| **LANGUAGE 4**                     | TBD                              | TBD                                          |

**Build & Run the Application Locally**

Ask Copilot for guidance on how to configure your environment for your chosen stack.

<details>
  <summary>Need a hint? Try this prompt.</summary>
  @workspace I want to work in [CHOSEN TECH STACK]. Help me configure my environment and update any launch settings or dependencies accordingly.
</details>

Follow the guidance provided by Copilot for configuring your environment.
   
### Task 3: Explore Tests & TODOs  
In this task you will identify existing tests and unfinished work.  

**Explore Tests**

Write prompts that will cause Copilot to understand how testing is being performed on this project and to learn what improvements could be made.

<details>
  <summary>Need a hint? Try these prompts.</summary>
  “@workspace Where are the tests located?”<br>
  “@workspace Can you summarize what’s being tested?”<br>
  “@workspace What coverage do the tests have, and what code coverage improvements can you suggest?”
</details>

**Generate TODOs**

Ask Copilot to help you identify any existing uncompleted work within the codebase and other tasks that we might want to complete but which are not explicitly documented.

<details>
  <summary>Need a hint? Try these prompts.</summary>
  “@workspace Are there any TODOs or FIXME comments in the code?”<br>
  “@workspace What is this application missing that should be added?”
</details>

### Review
You should now:
- Understand the project’s purpose and architecture  
- Know how to build and run it locally  
- Be aware of current test coverage and pending work  
- Feel ready to contribute or extend the project confidently
