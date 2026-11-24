# GitHub Copilot Hands-on Lab

This repository contains a hands-on training program for developers and other technical professionals who work with code and want to learn how to use GitHub Copilot throughout the software development lifecycle.

The training uses a sample e-commerce project as a practical environment, but the main subject is GitHub Copilot: how to understand its modes, provide effective context, delegate work, connect external tools, create reusable Skills, and configure specialized Agents.

## Training Goals

By completing the Labs, participants will learn how to:

- Explore an unfamiliar codebase with Copilot.
- Choose between Ask, Plan, and Agent modes.
- Write, review, and validate tests with AI assistance.
- Use Agent mode for goal-oriented, multi-file tasks.
- Delegate work to Copilot Coding Agent through Issues and Pull Requests.
- Connect external services through Model Context Protocol (MCP) servers.
- Use repository instructions, prompt files, and custom Agents.
- Create reusable Skills for frontend development and unit testing.
- Connect specialized Agents to Skills through controlled handoffs.
- Review AI-generated work with appropriate human oversight.

## Lab Sequence

| Lab | Topic | Main Focus |
|---|---|---|
| [Lab 1](Instructions/Labs/Lab-1-Getting-Started.md) | Getting Started | Set up the environment, repository, VS Code, and GitHub Copilot. |
| [Lab 1a](Instructions/Labs/Lab-1a-Getting-Started-2.md) | Alternative Local Setup | Set up the training with your own GitHub account and local VS Code installation instead of the Microsoft-provided virtual machine. Skip this Lab if Lab 1 was completed. |
| [Lab 2](Instructions/Labs/Lab-2-Understanding-Project.md) | Understanding the Project | Explore a codebase with Ask mode, identify the technology stack, run the application, and improve `eCommApp/README.md`. |
| [Lab 3](Instructions/Labs/Lab-3-Code-Editing.md) | Planning and Writing Unit Tests | Use Autocomplete and Plan mode to design and write tests with Copilot assistance. |
| [Lab 4](Instructions/Labs/Lab-4-Agent-Mode.md) | Agent Mode | Use Plan and Agent modes to work toward an 80% code coverage goal. |
| [Lab 5](Instructions/Labs/Lab-5-Agentic-Coding.md) | Agentic Coding | Assign Issues to Copilot Coding Agent and review the resulting Pull Request. |
| [Lab 6](Instructions/Labs/Lab-6-MCP.md) | Model Context Protocol | Connect GitHub Copilot to GitHub and Microsoft Learn through MCP servers. |
| [Lab 7](Instructions/Labs/Lab-7-Customizing-Copilot.md) | Customizing Copilot | Use repository instructions, prompt files, and custom Agents to tailor Copilot. |
| [Lab 8](Instructions/Labs/Lab-8-Skills.md) | Skills | Create `dev-front` and `dev-qa` Skills and apply them to a real component. |
| [Lab 9](Instructions/Labs/Lab-9-Agents.md) | Custom Agents | Create `dev-front-ag` and `dev-qa-ag`, connect them to Skills, and coordinate implementation and testing. |

## Learning Path

The Labs follow a progressive path:

```text
Understand -> Plan -> Test -> Delegate -> Integrate -> Customize -> Specialize
```

Each step builds on the previous one. Participants should complete the Labs in order, especially Labs 8 and 9, because the Agents created in Lab 9 use the Skills created in Lab 8.

## Supporting Application

The `eCommApp` directory contains the sample application used during the exercises. It is a supporting training environment, not the primary subject of this repository.

For application-specific setup, scripts, structure, and technical details, see the [`eCommApp/README.md`](eCommApp/README.md).

## Repository Structure

```text
hol-copilot-lab/
├── Instructions/
│   └── Labs/              # Training instructions for Labs 1 through 9
├── eCommApp/              # Sample application used during the exercises
├── AdditionalLearning/    # Additional training material
├── masterdoc.json         # Ordered catalog of the Labs
└── media/                 # Images used by the training documentation
```

## Using the Labs

Start with [Lab 1 - Getting Started](Instructions/Labs/Lab-1-Getting-Started.md) and use the navigation links at the end of each Lab to move through the sequence. The Labs are written in English and are designed to be completed interactively in Visual Studio Code with GitHub Copilot.

Throughout the training, review and validate Copilot's suggestions. The Labs demonstrate how AI can accelerate development, but human judgment remains responsible for requirements, security, correctness, testing, and final approval.