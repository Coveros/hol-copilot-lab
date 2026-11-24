# Exercise 7 - Custom Instructions for GitHub Copilot

#### Duration: 30 minutes

## Learning Objectives

By the end of this exercise, you will be able to:

- Explain how repository custom instructions shape GitHub Copilot's behavior.
- Distinguish project-wide instructions from path-specific instructions.
- Create and review `.github/copilot-instructions.md`.
- Use custom instructions with Ask, Plan, Agent, and MCP workflows.
- Keep project context reusable without repeating the same rules in every prompt.

> **Scope:** This Lab focuses only on Custom Instructions. Skills are introduced in Lab 8, and Custom Agents are introduced in Lab 9.

## Scenario: Making Project Guidance Consistent

The Daily Harvest team uses GitHub Copilot for features, tests, bug fixes, and documentation. As usage grows, developers repeatedly provide the same project conventions, tool preferences, and response expectations in new conversations.

Custom Instructions solve this problem by keeping broadly applicable project context in a versioned file. Copilot can then use the same guidance across different conversations and workflows.

## What Are Custom Instructions?

Custom Instructions are Markdown files that describe project context, conventions, and rules for Copilot. They are different from Skills and Custom Agents:

| Customization | Purpose | Covered in |
|---|---|---|
| `.github/copilot-instructions.md` | Project-wide context and rules, similar to Claude Code's `CLAUDE.md` | This Lab |
| `AGENTS.md` | General instructions for AI agents at repository or folder level | This Lab, as an optional alternative |
| `*.instructions.md` | Rules for specific files or contexts, usually with `applyTo` | This Lab, as an optional extension |
| Skill | Reusable workflow for a focused task | Lab 8 |
| Custom Agent | Specialized role with tools, context, and handoffs | Lab 9 |

Custom Instructions should contain rules that are useful across many tasks. Do not turn them into a long task-specific prompt or duplicate every instruction from a Skill.

## Step 1: Create Repository-Wide Instructions

The recommended repository-wide file for GitHub Copilot is `.github/copilot-instructions.md`.

1. Open the **Chat** view in VS Code.
2. Open the Agent Customizations editor from the Chat configuration menu, or run **Chat: Open Customizations** from the Command Palette.
3. Open the **Instructions** section.
4. Choose **New Instructions (Workspace)**, or create `.github/copilot-instructions.md` manually.
5. Add concise guidance similar to the following:

```md
# Daily Harvest project instructions

- This repository is a GitHub Copilot training lab. The eCommApp directory is the sample application.
- The application uses React, TypeScript, Vite, React Router, Vitest, and React Testing Library.
- Run application commands from the eCommApp directory.
- Preserve existing component, routing, context, and CSS patterns unless the task requires a change.
- Review generated changes and validate them with the appropriate tests, lint, or build commands.
- Use Ask for exploration, Plan for analysis, and Agent for approved implementation work.
- Do not commit credentials, tokens, or other secrets.
```

6. Save the file and review it before using it in a task.

Repository-wide instructions are similar in purpose to Claude Code's `CLAUDE.md`, but the file name and location belong to the GitHub Copilot/VS Code ecosystem.

## Step 2: Use Instructions with Ask and Plan

Test whether Copilot applies the new project context.

1. Select **Ask mode**.
2. Ask:

   ```text
   Summarize this repository's application architecture and list the commands used to build, test, and lint it. Follow the repository instructions and cite the relevant files.
   ```

3. Select **Plan mode**.
4. Ask:

   ```text
   Create an implementation plan for improving the product listing page. Follow the repository instructions, do not edit files, and include affected files, acceptance criteria, testing, and risks.
   ```

5. Compare the answers with the rules in `.github/copilot-instructions.md`.
6. If Copilot ignores or conflicts with a rule, revise the instruction so it is clear, concise, and testable.

## Step 3: Use Instructions with Agent and MCP

Custom Instructions can guide workflows that use tools or make changes. They do not replace permissions or human approval.

1. Switch to **Agent mode**.
2. Ask Copilot to review the implementation plan from Step 2.
3. Before allowing any edit, confirm that the Agent follows the project conventions and validation requirements from `.github/copilot-instructions.md`.
4. If the GitHub MCP Server from Lab 6 is available, ask Copilot to create an Issue based on the approved plan:

   ```text
   Using the GitHub MCP Server, create an issue titled "Product Listing Improvement Plan". Include the approved plan, acceptance criteria, testing approach, and risks. Ask for confirmation before creating it.
   ```

5. Review the Issue after creation and verify that the instructions influenced its format and content.

The Agent and MCP server are execution mechanisms. The instructions provide reusable project context, while the user remains responsible for approving tool calls and reviewing results.

## Step 4: Optional Path-Specific Instructions

Use path-specific instructions when a rule applies only to one part of the repository.

1. Create the directory `.github/instructions/`.
2. Create a file named `frontend.instructions.md`.
3. Add frontmatter with an `applyTo` pattern:

```md
---
name: Frontend conventions
description: Conventions for React and TypeScript frontend files.
applyTo: "eCommApp/src/**/*.tsx,eCommApp/src/**/*.ts"
---

- Prefer semantic HTML and accessible names for interactive controls.
- Preserve existing React Router and CartContext patterns.
- Keep styles consistent with eCommApp/src/App.css.
```

4. Open a relevant frontend file and ask Copilot to explain how it will apply the instructions.
5. Use the Chat references or customization diagnostics to check which instruction files were loaded.

Use path-specific files for targeted conventions. Keep project-wide rules in `.github/copilot-instructions.md`.

## Writing Effective Instructions

- Keep each rule short and specific.
- Explain important reasons behind non-obvious rules.
- Include validated commands for build, test, and lint workflows.
- Prefer concrete examples over vague wording.
- Avoid duplicating task-specific procedures that belong in a Skill.
- Avoid conflicting instructions across project-wide and path-specific files.
- Never put passwords, access tokens, or other secrets in instruction files.
- Review the instructions whenever the project architecture or toolchain changes.

## Checkpoint

Before completing this exercise, confirm that:

- `.github/copilot-instructions.md` exists and describes the project accurately.
- Ask and Plan responses reflect the repository instructions.
- Agent and MCP workflows use the instructions without bypassing approval.
- The optional `frontend.instructions.md` file uses a valid `applyTo` pattern.
- You understand that Skills are covered in Lab 8 and Custom Agents are covered in Lab 9.

## Reflection Questions

1. Which project rules belong in `.github/copilot-instructions.md`?
2. When would a path-specific `*.instructions.md` file be better than a project-wide instruction?
3. How did the instructions affect Ask, Plan, Agent, or MCP responses?
4. What information should not be placed in an instruction file?
5. Why should Skills and Custom Agents be taught separately from general instructions?

## Key Takeaways

- `.github/copilot-instructions.md` provides reusable project-wide context for GitHub Copilot.
- `*.instructions.md` files apply focused guidance to matching files or contexts.
- Instructions guide Copilot but do not replace permissions, approvals, tests, or human review.
- Skills and Custom Agents are separate extensions covered in the following Labs.

## What's Next?

In Lab 8, you will create reusable Skills for frontend development and unit testing. In Lab 9, you will create Custom Agents that use those Skills.

#### You have successfully completed the lab.

<div align="center">
  <a href="Lab-6-MCP.md"><strong>&larr; Previous Lab: MCP</strong></a>
  &nbsp;&nbsp;&nbsp;
  <a href="Lab-8-Skills.md"><strong>Next Lab: Skills &rarr;</strong></a>
</div>
