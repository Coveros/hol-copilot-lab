# Exercise 5 - Agentic Coding

#### Duration: 45 minutes

## 🎯 Learning Objectives

By the end of this exercise, you will:
- Understand GitHub Copilot's Coding Agent and its autonomous capabilities
- Learn to create and assign GitHub issues to Copilot for autonomous implementation
- Experience the full autonomous development workflow from issue creation to pull request
- Monitor and interact with Copilot's development process through session logs
- Review and iterate on AI-generated code using pull request workflows
- Understand security, limitations, and best practices for coding agents


## 🍎 Scenario: Freeing Up Your Hands with Coding Agent

 The Daily Harvest is growing rapidly, but development bandwidth is becoming a bottleneck. Your manager has heard about GitHub Copilot's new Coding Agent—an autonomous AI developer that can work independently on GitHub issues, just like a human team member.

Today, you'll explore this revolutionary feature by:
- Creating GitHub issues for Daily Harvest's e-commerce improvements
- Assigning tasks directly to Copilot as you would to any team member
- Watching Copilot work autonomously in its own development environment
- Reviewing and iterating on Copilot's work through the standard pull request workflow

## ⌨️ Introduction to Coding Agent

Unlike the IDE modes of Ask, Edit, and Agent, Coding Agent works within the GitHub.com user interface. Rather than engaging in a back and forth, iterative approach, utilizing Coding Agent involves delegating tasks to the agent, giving the agent time to work, then returning to see the results of GitHub Copilot's work.

Coding Agent can...
- Fix bugs
- Implement incremental new features
- Improve test coverage
- Update documentation
- Address technical debt

## 📝 Step 1: Assign GitHub Copilot to an Issue

The first step in utilizing Coding Agent is to create a GitHub issue outlining a task you'd like completed.

### Instructions:

1. In a new browser tab, click the __Issues__ tab inside the repository.
2. Then, on the right-hand side of the screen, click "New Issue".
3. For the new issue, fill in an appropriate title and description to add a _Contact Us_ page to the application. Feel free to add any specific requirements or acceptance criteria you wish. A sample issue is shown below:

<details>
 
  <summary>Example Issue</summary>
  ![](../../media/sample-issue.png)
</details>

Once complete, create the issue.

4. In the metadata section of the issue under "Assignees", click the "Assign to Copilot" button.
5. In the pop-up window, ensure the target repository and base branch are both accurate, then click "Assign".

### 🚀 How Coding Agent Works:

**1. Assignment & Activation:**
- Assign a GitHub issue to `@copilot` like any team member
- Copilot adds a 👀 emoji reaction to show it's working
- Spins up a secure GitHub Actions environment

**2. Autonomous Development:**
- Analyzes the codebase using advanced RAG (Retrieval Augmented Generation)
- Plans implementation approach
- Creates a new branch (always prefixed with `copilot/`)
- Writes and commits code incrementally

**3. Quality Assurance:**
- Runs existing tests and linters
- Creates new tests when appropriate
- Validates changes against repository standards
- Documents reasoning in commit messages

**4. Pull Request & Review:**
- Opens a draft pull request with detailed description
- Provides session logs showing decision-making process
- Requests review from the original issue assignor
- Responds to feedback and iterates based on comments


## 👀 Step 2: Monitor GitHub Copilot Coding Agent

Now that Copilot has eyes on the issue, let's follow along with its progress:

1. Wait for GitHub Copilot to add a 👀 reaction to the issue, indicating it has started working. 
2. Copilot will create a new Pull Request to track its progress. Browse to the PR by following the link in the **Development** section of the issue sidebar or in the issue timeline. If the PR link is not yet available, wait a few moments and refresh the page.
3. Notice how the PR is marked as a draft, indicating that work is still in progress. Copilot will set the description of the PR based off the issue details you provided.
4. While Copilot is working, you can monitor its progress by viewing the session logs by clicking the "View Session" button in the Pull Request timeline.
5. Here you can see all the steps Copilot is taking to address the issue, including code changes, test runs, and any challenges it encounters. It will behave similarly to how it does in the IDE, but without the need for your direct input. Feel free to check back on this page periodically to see new updates as Copilot works through the issue.
6. Back in the Pull Request, you can also watch as Copilot updated the PR description with it's planned approach to solving the issue. As it progresses, it will mark off tasks in the description to indicate what has been completed.
7. Once Copilot has completed its work, you can scroll to the bottom of the Pull Request and press the "Ready for review" button

Note: Depending on the complexity of the issue, this process may take some time. Be patient as Copilot works through the task autonomously. Remember, normally you would be free to work on other tasks while Copilot handles this issue in the background. In the meantime, feel free to explore the optional tasks below.

## 🎁 Optional Task: Become Your Own Tech Lead

While Copilot is working autonomously on your first issue, this is the perfect time to experience what it's like to be a tech lead delegating tasks to your AI team member. Just as a tech lead would distribute work across their team, you can now assign different types of tasks to Copilot based on complexity and priority.

Try creating and assigning Copilot some additional issues while it works on the first one. Here are some ideas for issues you can create and assign:
- Improve the shopping cart to make it easier for users to adjust quantities of items
- Add a search bar to the product listing page
- Add categories to the product page to make it easier to find specific types of products
- Anything you think would improve the Daily Harvest e-commerce experience!

### Pro Tips for Effective Delegation:
- Be specific in your issue descriptions - clear requirements lead to better outcomes
- Set clear acceptance criteria in your issues
- You can even use Copilot to help plan out the tasks before assigning them

- Start with smaller, well-defined tasks before moving to complex features

This parallel workflow mimics real-world team dynamics where a tech lead can keep multiple developers busy with different priorities while focusing on higher-level architecture and planning decisions.

## 🎁 Optional Task: More ways of working with the GitHub Copilot Coding Agent

Now that you've seen how to assign an issue to Copilot, here are additional ways you can interact with Coding Agent. Feel free to pick one or more of the methods below to create and assign new tasks to Copilot.

### Agent Panel

The Agent Panel is a dedicated interface within the GitHub UI that allows you to manage and monitor your interactions with Coding Agent: 

1. Navigate to the Agent Panel at https://github.com/copilot/agents or click the Copilot icon on the top right on any GitHub page.
2. Select the appropriate repository from the dropdown menu.
3. Describe a new task for Copilot to work on in the text box provided.
4. Click "Start Task" button to assign the task to Copilot without needing to create a formal GitHub issue.

Additional details can be found in the [GitHub Docs](https://docs.github.com/copilot/how-tos/use-copilot-agents/coding-agent/create-a-pr#asking-copilot-to-create-a-pull-request-from-the-agents-panel-or-page).

### Visual Studio Code

While you are working inside of Visual Studio Code, instead of writing TODOs comments in your codebase, you can hand off tasks to Copilot directly from your IDE:

1. Make sure you have the [GitHub Pull Request extension](https://marketplace.visualstudio.com/items?itemName=GitHub.vscode-pull-request-github) installed in Visual Studio Code.
2. Use GitHub Copilot Chat to write a new task for Copilot to work on. Make sure to include `#copilotCodingAgent` in your prompt to indicate you want to use Coding Agent.
3. Copilot will do some initial processing to gather context.
4. Click "Continue" to start the task. Copilot will create a new branch and open a Pull Request to start working on the task.

Additional details can be found in the [GitHub Docs](https://docs.github.com/copilot/how-tos/use-copilot-agents/coding-agent/create-a-pr#asking-copilot-to-create-a-pull-request-from-copilot-chat-in-visual-studio-code).


### GitHub CLI

You can also assign tasks to Copilot directly from the command line using the GitHub CLI and the `gh agent-task create` command. Additional details can be found in the [GitHub Docs](https://docs.github.com/copilot/how-tos/use-copilot-agents/coding-agent/create-a-pr#asking-copilot-to-create-a-pull-request-from-the-github-cli).


### Azure DevOps Work Items

If you are using Azure DevOps Boards to track work items, you can now assign those work items directly to Copilot Coding Agent. This feature is currently in public preview. Additional details can be found in the [GitHub Blog](https://github.blog/changelog/2025-09-18-assign-azure-boards-work-items-to-copilot-coding-agent-in-public-preview/).


Even more ways to interact with Coding Agent can be found in the [GitHub Docs](https://docs.github.com/copilot/how-tos/use-copilot-agents/coding-agent/create-a-pr).

## 🎁 Optional Task: Use GitHub Advanced Security + Copilot Autofix to fix a code vulnerability

So far, we've looked at utilizing Coding Agent to handle improved functionality. Now, we are going to see how it handles resolving security vulnerabilities.

### Turning on GitHub Advanced Security

Before having GitHub Copilot tackle some security flaws, we first need to enable GitHub Advanced Security.

__Instructions:__

1. At the top of your your repository on GitHub.com, click the __Settings__ tab (you may need to click the 3 dots depending on your browser's width
2. On the left sidebar, scroll towards the bottom and click "Advanced Security" under the "Security" header
3. Once the new page loads, scroll to the bottom and, next to "GitHub Advanced Security", click "Enable"
4. In the pop-up confirming your desire to enable the feature, click "Enable GitHub Advanced Security for this repository"
5. Once the page refreshes and becomes quite a bit longer, scroll down to the section labeled "Code Scanning"
6. In the box titled "CodeQL Analysis", click the "Set Up" drop-down menu and choose "Default"
7. At the bottom of the pop-up window detailing what will be scanned, press "Enable CodeQL"
8. If all goes well, you should see a blue strip at the top of your screen noting that a full scan of your repository is taking place

### Combining the powers of GHAS and GitHub Copilot

With our repository scanned, we can now begin to utilize GitHub Copilot to resolve any unsavory warnings we have received.

__Instructions:__

1. At the top of your repository UI, click the __Security__ tab
2. Navigate to the __Code scanning__ section under the "Vulnerability alerts" header in the sidebar
3. Click on the code scanning alert that has been generated by GitHub Advanced Security titled "DOM text reinterpreted as HTML"
4. Take a moment to familiarize yourself with the Code scanning alert UI and to understand the current issue
5. At the top of the page, just below the title, notice the `Speed up the remediation of this alert with Copilot Autofix for CodeQL` text, and click the "Generate Fix" button in that text box
6. Once GitHub Copilot has generated a fix, scroll below the proposed change and click "Commit to a new branch"

At this point, resolution of this vulnerability has moved into a similar workflow as with our other changes. It may be ready to submit as a Pull Request where it will be reviewed and (hopefully) merged to keep your code base safe.

## 👀 Step 3: Review Copilot's Work

Once GitHub Copilot has completed work on your assigned issue, it's time to review the Pull Request it created. Just like with human developers, it's important to ensure that the code meets your team's standards and requirements.


__Instructions:__

1. Return to the Pull Request that Copilot created for the issue you assigned.
2. Notice that Copilot has added a detailed description of the changes it made and likely has included screenshots of the implemented Contact Us page.
3. Review the code changes made by Copilot. Look for:
   - Correctness: Does the code function as intended?
   - Quality: Is the code clean, well-structured, and maintainable?
   - Tests: Are there sufficient tests covering the new functionality?
4. If you find any issues or areas for improvement, you can leave comments on the PR or specific lines of the code changes, just like you would in a regular code review. Make sure to tag `@copilot` in your comments so that Copilot is notified.
5. If you request changes, Copilot will re-open the session and work to address your feedback autonomously. You can monitor its progress through the session logs as before.
6. You can also even assign Copilot to review its own Pull Request (or any other PR in the repository) by adding `Copilot` as a reviewer on the PR. Copilot will analyze the code changes and provide feedback or suggest improvements. See the [GitHub Docs](https://docs.github.com/copilot/how-tos/use-copilot-agents/request-a-code-review/use-code-review) for more details.
6. Once you are satisfied with the changes, approve the Pull Request and merge it into the main branch.

### Scaling Security with Copilot Autofix

Copilot Autofix isn't just for fixing individual vulnerabilities - it can help your organization pay down security debt at scale:

- **Security Campaigns**: Use [security campaigns](https://docs.github.com/enterprise-cloud@latest/code-security/securing-your-organization/fixing-security-alerts-at-scale/about-security-campaigns) to address vulnerabilities across multiple repositories in your organization, with Copilot Autofix helping to generate fixes automatically
- **Pull Request Integration**: Automatically [triage and fix vulnerabilities in pull requests](https://docs.github.com/code-security/code-scanning/managing-code-scanning-alerts/triaging-code-scanning-alerts-in-pull-requests#working-with-copilot-autofix-suggestions-for-alerts-on-a-pull-request) before they're merged, stopping new security issues before they enter your codebase



## 🏆 Exercise Wrap-up

Congratulations! You've successfully used GitHub Copilot Coding Agent to autonomously implement new functionality in a codebase. You've experienced the full workflow from issue creation to code review, gaining insight into how AI can augment your development process.

### Reflection Questions:
1. What types of tasks will you delegate to Coding Agent in your projects?
2. When reviewing Copilot's work, what stood out as particularly well done? What areas could use improvement?
3. Should GitHub Copilot be the only reviewer on a Pull Request? If so, what are the trade-offs of foregoing human reviewers? If not, how might you supplement your current review process with Coding Agent?
4. Which method of assigning tasks to Copilot did you find most convenient or effective?
5. How does using Copilot autofix for security vulnerabilities compare to traditional methods of remediation?

## Key Takeaways:

### 🎯 Coding Agent as Your AI Team Member
- **Treat Copilot like a developer**: Assign issues with clear requirements, acceptance criteria, and context just as you would for any team member
- **Leverage autonomous work**: Copilot can work independently while you focus on other tasks, truly scaling your development capacity
- **Multiple assignment methods**: Use GitHub Issues, Agent Panel, VS Code, or CLI - choose what fits your workflow best

### 🔄 Quality Assurance & Review Process
- **Code review remains essential**: Even AI-generated code benefits from human oversight for correctness, maintainability, and alignment with project goals
- **Iterative improvement**: Copilot responds to feedback and can refine its work based on your comments, creating a collaborative development loop
- **Transparent decision-making**: Session logs provide visibility into Copilot's reasoning and approach, helping you understand and trust the process

### 🚀 Scaling Development Workflows  
- **Tech lead mindset**: Delegate multiple tasks across different complexity levels while maintaining oversight and architectural decisions
- **Security integration**: Copilot Autofix seamlessly integrates vulnerability remediation into your existing security workflows
- **Standard GitHub processes**: All work flows through familiar pull request workflows, maintaining your team's existing review and approval processes

### 💡 Best Practices for Success
- **Be specific in requirements**: Clear, detailed issue descriptions lead to better implementation outcomes
- **Start small and scale up**: Begin with well-defined tasks before moving to complex features
- **Combine human and AI review**: Use both Copilot's automated review capabilities and human oversight for comprehensive code quality
- **Monitor and guide**: While Copilot works autonomously, periodic check-ins help ensure alignment with your goals

## 🔮 Coming Up Next:

In Exercise 6, we'll take a look at bringing additional context to GitHub Copilot through the use of **MCP Servers** to provide new functionality and information to smooth out your workflows.

#### You have successfully completed the lab. Click on **Next >>** to continue to the next lab.

![](../../media/next-page.png)
