# Exercise 6 - Extending GitHub Copilot with MCP

## 🎯 Learning Objectives

By the end of this exercise, you will be able to...

- Explain what MCP servers are and how they connect external knowledge to GitHub Copilot
- Enable MCP integration with GitHub in this project
- Use MCP server to pull a GitHub Issue into the IDE
- Ask GitHub Copilot Agent to work on that issue
- Understand how MCP expands GitHub Copilot’s capabilities

## 🍎 Scenario: Using Model Context Protocols to Gather External Information

Having spent your time at The Daily Harvest working with GitHub Copilot, you are now (hopefully) quite familiar with the the typical patterns with utilizing GitHub Copilot. However, you have now begun to notice an unusual bottleneck in your daily workflow. In order to appropriately understand the current GitHub.com environment, you have to _go_ to GitHub. Wouldn't it be so much easier if there were a way for GitHub Copilot to be able to do that interfacing for you so you could spend more time focusing on your work and less time moving from your IDE to your browser back to your IDE then back to your browser once more? 

🤖 Introduction to GitHub Copilot Chat
GitHub Copilot Chat is an AI-powered conversational interface that helps you understand code, generate implementations, and solve development challenges. There are several modes to interact with Copilot:

Mode	Purpose	Best For
Ask	Get explanations and answers about code	Understanding existing code, learning new concepts
Edit	Modify existing code with AI assistance	Refactoring, bug fixes, feature additions
Agent	Delegate complex tasks to AI	Multi-file changes, architectural decisions
For exploring an unfamiliar codebase, Ask mode is ideal because it allows you to:

Query specific files or code patterns without making changes
Get high-level explanations of project structure and purpose
Understand dependencies, build processes, and testing strategies
Ask follow-up questions to deepen your understanding
🔍 Step 1: Understanding the Project Purpose
Let's start by getting a high-level understanding of what this application does.

Instructions:
Open GitHub Copilot Chat (Ctrl+Shift+I or Cmd+Shift+I)
Ask Copilot some questions to help you understand the application as it is currently working. If you get stuck, try using these sample prompts to explore the project:
Sample Prompts
💡 What to Expect from Copilot
When you ask these questions, Copilot will analyze your workspace and provide insights such as:

Application Type: Whether it's an e-commerce site, API, web application, etc.
Core Features: Key functionality like user authentication, product catalogs, payment processing
Technology Stack: Programming languages, frameworks, and architectural patterns in use
Business Domain: The industry or use case the application serves
Copilot's responses will be based on analyzing your codebase structure, configuration files, dependencies, and code patterns. The more specific your questions, the more targeted and useful the responses will be.

🏗️ Step 2: Analyzing Project Structure
Now let's understand how the code is organized and what the folder structure tells us.



MCP Servers (Context Enrichment) – 30 min
- Explain what MCP servers are and how they connect external knowledge to Copilot.
- Enable MCP integration with GitHub in this project.
- Use MCP server to pull a GitHub Issue into the IDE.
- Ask Copilot Agent to work on that issue.
- Outcome: Learners understand how MCP expands Copilot’s capabilities.

