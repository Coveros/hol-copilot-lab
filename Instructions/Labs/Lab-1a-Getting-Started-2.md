# Exercise 1a - Local Setup with Your Own GitHub Account

#### Duration: 15 minutes

> **Important:** If you have already completed **Exercise 1 - Lab Overview and Setup**, you do not need to complete this Lab 1a. This Lab is an alternative setup path for participants who are not using the Microsoft-provided virtual machine.
>
> **Environment note:** When you complete this Lab outside the Microsoft lab virtual machine, some later exercises may not be available exactly as documented. In particular, Lab 5 may depend on organization policies, Copilot Coding Agent access, GitHub Advanced Security, or other resources provided by the Microsoft lab environment.

## Overall Lab Objectives

This hands-on training gives developers practical experience using **GitHub Copilot** throughout the Software Development Life Cycle (SDLC). You will explore how GitHub Copilot can improve developer productivity, code quality, and security—from feature planning and prototyping to implementation, code review, and remediation.

Through a series of guided, real-world exercises, you will learn how to:

- Understand GitHub Copilot's role across all phases of the SDLC.
- Plan new features and define success criteria with GitHub Copilot.
- Use AI-powered code completions directly within the IDE.
- Use GitHub Copilot Chat in Ask, Plan, and Agent modes.
- Delegate tasks to GitHub Copilot Coding Agent when your account and repository policies support it.
- Review AI-generated code and test changes.
- Detect and address security concerns with Copilot and GitHub security tools.
- Extend GitHub Copilot with Model Context Protocol (MCP) servers.
- Optimize GitHub Copilot with repository instructions, Skills, and Custom Agents.

## Welcome to The Daily Harvest

**Your mission: develop your daily pick of fresh code!**

You will work with **The Daily Harvest**, a sample e-commerce project used throughout the training. The application provides the practical context for learning GitHub Copilot; the main subject of this repository is the training itself.

## Before You Begin

Make sure you have:

- 🛠️ Visual Studio Code installed.
- 📦 Node.js 18 or later installed.
- 🐙 A GitHub account.
- 💻 Git Bash installed.
- 🔌 Permission to install VS Code extensions when required.
- 🌐 Internet access.
- Permission to create a private repository under your own GitHub account.
- A GitHub Copilot subscription or organization access appropriate for the exercises.
- npm for the application exercises.

Use your own credentials throughout this Lab. Do not use credentials supplied for the Microsoft lab environment, and never commit passwords, tokens, or other secrets to the repository.

## Logging in to GitHub with Your Own Account

1. Open a browser on your local computer.
2. Go to [github.com/login](https://github.com/login).
3. Sign in with your personal GitHub account.
4. Confirm that the account has access to GitHub Copilot. You can check your Copilot settings at [github.com/settings/copilot](https://github.com/settings/copilot).
5. Keep this account selected when creating and cloning the training repository.

## Create Your Private Training Repository

1. Open the [hol-copilot-lab repository](https://github.com/Coveros/hol-copilot-lab).
2. Select **Use this template** and then **Create a new repository**.
3. Select your own GitHub account as the owner.
4. Choose a unique repository name, for example `hol-copilot-lab-training`.
5. Set the visibility to **Private**.
6. Select **Create repository from template**.
7. Open the new repository and confirm that its files are available under your account.

The repository belongs to you, so you can create Issues, branches, and Pull Requests according to your own account and repository permissions.

## Clone the Repository Locally

You can clone the repository from the VS Code welcome screen or from a terminal.

### Option A: Clone from VS Code

1. Open Visual Studio Code on your local computer.
2. Select **Clone Git Repository** from the welcome screen, or run **Git: Clone** from the Command Palette.
3. Enter the URL of your private training repository.
4. Select a local folder for the repository.
5. Sign in to GitHub when Git Credential Manager or the browser requests authentication.
6. Open the cloned repository in VS Code.
7. Confirm that you trust the workspace when VS Code asks.

### Option B: Clone from a terminal

Replace the URL with the HTTPS or SSH URL of your private repository:

```bash
git clone https://github.com/<your-username>/<your-repository>.git
cd <your-repository>
code .
```

## Verify GitHub Copilot in VS Code

Recent versions of Visual Studio Code may include GitHub Copilot Chat and Agent features by default. Verify whether Copilot is already available before installing anything.

1. Open the Chat or Agents view in VS Code.
2. Sign in with the same personal GitHub account used to create the repository.
3. Confirm that Copilot is available and that Ask, Plan, and Agent modes are shown.
4. If Copilot is not available, open the **Extensions** view and search for **GitHub Copilot**.
5. Install or enable the official GitHub Copilot extension, then reopen the Chat view.
6. If a later exercise requires GitHub Issues or Pull Requests integration, install the separate **GitHub Pull Requests and Issues** extension as needed.

The exact availability, extension names, sign-in prompts, and organization policies can vary with the VS Code and Copilot versions installed on your computer.

## Access and Feature Limitations Outside the Microsoft VM

The Microsoft lab virtual machine may provide organization accounts, policies, extensions, licenses, or preconfigured services that are not available on a personal computer. Outside that environment:

- Exercise 5 may not be available if Coding Agent is not enabled for your account or repository.
- GitHub Advanced Security and Copilot Autofix may require a plan or repository policy that your account does not have.
- MCP servers may require separate installation, authentication, and administrator approval.
- Model availability, Agent mode, premium features, and usage limits depend on your Copilot plan and organization policies.
- Screenshots and menu names may differ from the Microsoft lab environment.

When a feature is unavailable, continue with the conceptual activity, use the provided fallback prompts, or ask your repository administrator for access. Do not use someone else's credentials to bypass a limitation.

## Summary

You created a private copy of the training repository under your own GitHub account, cloned it locally, configured VS Code and GitHub Copilot, and verified the sample application without using the Microsoft-provided virtual machine.

#### You have successfully completed the lab.

<table align="center">
  <tr>
    <td><a href="Lab-1-Getting-Started.md"><strong>&larr; Original Lab 1</strong></a></td>
    <td>&nbsp;&nbsp;&nbsp;</td>
    <td><a href="Lab-2-Understanding-Project.md"><strong>Next Lab: Explore the Project &rarr;</strong></a></td>
  </tr>
</table>
