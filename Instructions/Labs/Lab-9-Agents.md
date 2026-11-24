# Exercise 9 - Creating Specialized Agents with GitHub Copilot

#### Duration: 45 minutes

## Learning Objectives

By the end of this exercise, you will be able to:

- Explain how Custom Agents differ from Skills and repository instructions.
- Create a `dev-front-ag` Custom Agent linked to the `dev-front` Skill.
- Create a `dev-qa-ag` Custom Agent linked to the `dev-qa` Skill.
- Use agent tools and least-privilege configuration for specialized work.
- Connect implementation and testing through explicit delegation to another Agent.
- Use the Contact Us Issue from Exercise 5 as an end-to-end implementation task.
- Review, test, and validate work produced by specialized Agents.

## Prerequisite: Exercise 8

Complete Exercise 8 first. The following Skills must already exist:

```text
.github/skills/dev-front/SKILL.md
.github/skills/dev-qa/SKILL.md
```

This exercise does not recreate those Skills. The Agents created here reference them so that frontend and QA guidance remains in one reusable location.

## What Is a Custom Agent?

A Custom Agent is a reusable role for GitHub Copilot Chat. It combines a focused set of instructions with a selected set of tools and can delegate a bounded task to another Agent through the `agent` tool.

The relationship between the project customizations is:

```text
.github/copilot-instructions.md -> project-wide context and rules
Skill                         -> reusable workflow for a specific task
Custom Agent                  -> specialized executor with role, tools, and delegation permissions
MCP server                    -> external tools and services
```

If you have used Claude Code, a Custom Agent is similar to a specialized subagent, but the GitHub Copilot format is different. In VS Code, workspace Custom Agents are stored in `.github/agents/` as Markdown files with the `.agent.md` extension.

A Skill defines **how** a task should be done. An Agent defines **who** performs it, which tools it can use, and what workflow should follow it.

## Custom Agent File Structure

A workspace Custom Agent has YAML frontmatter followed by Markdown instructions:

```markdown
---
name: agent-name
description: Describe what the agent does and when to use it.
tools: ['search', 'usages', 'agent']
agents: ['another-agent']
---

# Agent instructions

Describe the role, workflow, constraints, and expected report.
```

Important fields include:

| Field | Purpose |
|---|---|
| `name` | The Agent identifier. |
| `description` | Explains the role and when the Agent should be used. |
| `tools` | Limits the tools available to the Agent. Use the minimum required. |
| `model` | Optionally selects a model for the Agent. |
| `agents` | Controls which Agents can be used as subagents when that workflow is required. |

In this lab, `dev-front-ag` delegates the testing responsibility to `dev-qa-ag` through the `agent` tool after implementation. The workflow must not use the `handoffs` frontmatter property or wait for a person to select a transition.

## Exercise 9.1 - Create the `dev-qa-ag` Agent

This Agent is responsible for unit tests. It loads the `dev-qa` Skill and must not change production code.

### Step 1: Generate the Agent

Open Copilot Chat in Agent mode and use the `/create-agent` command, or create a workspace Custom Agent from the Agent Customizations editor. Ask Copilot:

```text
/create-agent Create a workspace Custom Agent named "dev-qa-ag" in .github/agents/dev-qa-ag.agent.md for The Daily Harvest project.

The Agent is a unit-testing specialist and must:

- Explicitly use and follow .github/skills/dev-qa/SKILL.md before creating, reviewing, or changing tests.
- Work with Vitest, React Testing Library, user-event, and the jsdom setup in eCommApp/src/test/setup.ts.
- Create, review, update, or delete unit tests for React components and report the scenarios covered.
- Run focused tests or npm run test:run after test changes.
- Never modify production files under eCommApp/src/components, eCommApp/src/context, or eCommApp/src/utils.
- If a test exposes a production bug, report it and ask for a separate frontend change instead of editing production code.
- Return a concise report with files changed, tests run, results, and remaining risks.

Use the minimum tools needed for reading project files, editing test files, searching symbols, and running the test command.
```

### Step 2: Review the Agent

Open `.github/agents/dev-qa-ag.agent.md` and verify:

- `name` is exactly `dev-qa-ag`;
- `description` explains when QA delegation is appropriate;
- the body references `.github/skills/dev-qa/SKILL.md`;
- production paths are explicitly outside its scope;
- the available tools follow least privilege;
- the report format is predictable.

Do not accept a generated Agent without reviewing its frontmatter and instructions.

### Step 3: Test the Agent in Analysis Mode

Select `dev-qa-ag` from the Agents menu and ask it to analyze the existing component without editing:

```text
Analyze eCommApp/src/components/ProductsPage.tsx and produce a unit-test plan. Do not edit files. Identify the loading state, failed fetch behavior, stock-aware Add to Cart behavior, review modal interactions, and review submission behavior.
```

Confirm that the Agent loads the `dev-qa` Skill and does not propose production edits as part of its test task.

## Exercise 9.2 - Create the `dev-front-ag` Agent

This Agent owns production frontend changes and uses the `dev-front` Skill. It will implement the Contact Us functionality from Exercise 5.

### Step 1: Generate the Agent

Use `/create-agent` or the Agent Customizations editor and ask Copilot:

```text
/create-agent Create a workspace Custom Agent named "dev-front-ag" in .github/agents/dev-front-ag.agent.md for The Daily Harvest project.

The Agent is a React frontend specialist and must:

- Explicitly use and follow .github/skills/dev-front/SKILL.md before analyzing or changing frontend code.
- Work primarily in eCommApp/src/components, eCommApp/src/App.tsx, eCommApp/src/App.css, and directly related frontend files.
- Follow the existing React, TypeScript, React Router, CartContext, component, and CSS patterns.
- Implement accessible, responsive UI with semantic HTML, keyboard-friendly interactions, and clear user-visible states.
- Review the requested behavior and acceptance criteria before editing.
- Keep the Contact Us modal in a separate component and connect it through the existing header menu.
- Do not create, rewrite, delete, or execute unit tests as part of the frontend implementation. Delegate all unit-test responsibility to dev-qa-ag.
- Review the diff and run the relevant build, lint, or validation commands before reporting completion.
- Return a concise report with the plan, files changed, validation performed, and remaining risks.

Use the minimum tools required for reading, searching, editing frontend files, running approved frontend validation commands, and delegating to another agent. The generated agent must include `agent` in `tools`, declare `agents: [dev-qa-ag]`, and must not declare `handoffs`. The delegation request must include the changed files, acceptance criteria, and testing request.

The generated agent must explicitly invoke `dev-qa-ag` through the `agent` tool after implementation and frontend validation, wait for its result, and never stop at a frontend-only report or ask the user to start QA manually.
```

### Step 2: Review the Agent

Open `.github/agents/dev-front-ag.agent.md` and verify:

- `name` is exactly `dev-front-ag`;
- `description` identifies frontend implementation tasks;
- the body references `.github/skills/dev-front/SKILL.md`;
- the Contact Us requirements are clear;
- `agents: [dev-qa-ag]` is the only delegation permission;
- `agent` is included in `tools` and `agents: [dev-qa-ag]` restricts delegation to the QA Agent;
- `handoffs` is not present;
- creating, editing, deleting, and executing unit tests are delegated instead of duplicated;
- the tool list is appropriate for production changes.

## Exercise 9.3 - Verify the Agent and Skill Connection

Before implementing the feature, test the Agent with a read-only request, seclect the dev-front-ag and write the prompt bellow:

```text
Inspect eCommApp/src/components/Header.tsx and the current routes. Explain where a Contact Us entry and modal component should be connected. Do not edit files.
```

Check the response and references. The Agent should use the `dev-front` workflow, inspect the existing header and routing patterns, and identify the smallest set of files needed.

The connection should be visible in the Agent definition, not only in the prompt you typed:

```text
 dev-front-ag.agent.md -> .github/skills/dev-front/SKILL.md
 dev-qa-ag.agent.md    -> .github/skills/dev-qa/SKILL.md
```

## Exercise 9.4 - Retrieve the Contact Us Issue

The implementation task is the same Contact Us functionality introduced in Exercise 5. First, retrieve the Issue with the GitHub MCP Server so the Agent works from the actual repository context.

1. Open Copilot Chat in Agent mode.
2. Ask Copilot to retrieve the Issue created during Exercise 5:

   ```text
   Using the GitHub MCP Server, find the open Issue for the Contact Us page created in Exercise 5. Read and display its title, description, and acceptance criteria. Do not modify the Issue or any files.
   ```

3. Review the retrieved Issue and copy its requirements into the implementation prompt.

If the Issue is not available, use this fallback User Story:

```text
Only put this information in your context.

## User Story

### Title
Add a Contact Us page

### Description
A user should be able to click a "Contact Us" button, displaying a form where they can enter their name, email address, and message.

Below the message field, the user should be able to click "Submit".

When the user clicks "Submit", a pop-up should display the message "Thank you for your message" along with a "Continue" button, and the form fields should be cleared.

### Technical Notes
- The Contact Us modal should be accessible from the existing header menu.
- The modal should be implemented as a separate component.
- The modal should be centered in the browser.
```

## Exercise 9.5 - Implement Contact Us with `dev-front-ag`

Select `dev-front-ag` and provide the Issue or fallback User Story:

```text
Using the Contact Us Issue above, implement the feature in this React and Vite project.

Acceptance criteria:
- Add a Contact Us entry to the existing header menu.
- Implement the modal in a separate component.
- Center the modal in the browser and make it keyboard-friendly.
- Provide fields for name, email address, and message.
- Place a Submit button below the message field.
- After Submit, show "Thank you for your message" and a Continue button.
- Clear the form values when the message is submitted and when the modal is closed.
- Preserve existing routes, cart behavior, and unrelated UI.
- All text visible to the end user must be in English.
- The format of the new menu item used to trigger the "Contact Us" modal must be identical to that of the "CART" menu item.

Before editing, inspect the Header component, App routing, existing modal components, and CSS conventions. Explain the planned files and behavior first. Then implement the smallest complete change, review the diff, and run the relevant validation commands.
```

Observe the workflow:

1. `dev-front-ag` loads the `dev-front` Skill.
2. The Agent identifies the existing header, route, modal, and style patterns.
3. The Agent implements the feature without duplicating QA instructions.
4. You review the proposed changes and the diff.
5. The Agent invokes `dev-qa-ag` through the `agent` tool after implementation and frontend validation, then waits for the QA result.

Do not approve or merge changes only because an Agent produced them. Review the files and behavior yourself.

## Delegation to `dev-qa-ag`

After `dev-front-ag` finishes the frontend implementation and its frontend validation, it must invoke `dev-qa-ag` through the `agent` tool.

The delegation transfers responsibility for unit tests: `dev-qa-ag` creates, reviews, changes, deletes, and executes the tests, then returns the QA result. `dev-front-ag` must wait for that result before returning its final report. A human can review the combined implementation and test result afterward.

## Exercise 9.6 - Review and Validate the Result

From the `eCommApp` directory, the Agents must run the checks appropriate to their responsibilities:

```bash
# dev-qa-ag owns unit-test execution
npm run test:coverage

# dev-front-ag owns frontend validation, not unit tests
npm run lint
npm run build
```

Review the final result:

- Does the Contact Us entry work from the existing header?
- Is the modal a separate, centered component?
- Are the form states and confirmation message correct?
- Are the inputs cleared at the expected times?
- Are tests focused on observable behavior?
- Did the Agents avoid unrelated changes?

If a check fails, provide the specific failure to the appropriate Agent instead of repeating the entire original request.

## Agent Delegation and Least Privilege

Use explicit Agent delegation when a workflow has clear stages and the next specialist must run without an extra user turn. For this Lab:

```text
dev-front-ag --agent tool--> dev-qa-ag -> combined report
```

Use least privilege when defining tools:

- `dev-front-ag` needs tools for reading, searching, editing frontend files, running approved frontend validation commands, and invoking its explicitly allowed `dev-qa-ag` subagent through `agent`.
- `dev-qa-ag` needs tools for reading, searching, editing test files, and running approved test commands.
- A review-only Agent should receive read-only tools.

Tool availability can vary by VS Code version, extension, and agent harness. If a generated Agent includes a tool that is unavailable, remove it or replace it with the equivalent tool offered by the current environment.

## Checkpoint

Before completing this exercise, confirm that:

- `.github/agents/dev-front-ag.agent.md` exists and references `.github/skills/dev-front/SKILL.md`.
- `.github/agents/dev-qa-ag.agent.md` exists and references `.github/skills/dev-qa/SKILL.md`.
- Both Agents have clear descriptions and appropriate tool lists.
- `dev-front-ag` implemented the Contact Us functionality from the Issue or fallback story.
- The delegation through `agent` to `dev-qa-ag` was invoked and its test result was included.
- Tests and project checks were run, and failures were reported or fixed.
- The final diff contains no unrelated changes.

## Reflection Questions

1. What does an Agent add beyond the reusable workflow in a Skill?
2. What are the trade-offs of automatic delegation here, and where should the human review the combined result?
3. How did least-privilege tools affect the safety of each Agent?
4. Which parts of the Contact Us feature belonged to `dev-front-ag`, and which belonged to `dev-qa-ag`?
5. How could you create a read-only review Agent for a future workflow?

## Key Takeaways

- Custom Agents package a role, instructions, tools, and workflow transitions.
- Skills remain the reusable source of truth for specialized procedures.
- Agent delegation connects implementation and focused QA so both complete in one workflow; human review still happens on the combined result.
- Least-privilege tools reduce accidental changes.
- Agents must be reviewed and validated like any other generated code.

## What's Next?

You have completed the current GitHub Copilot training sequence. Continue by adapting the `dev-front-ag` and `dev-qa-ag` workflows to other components and features in The Daily Harvest project.

#### CONGRATS \o/ | You have successfully completed the labs.

<table align="center">
  <tr>
    <td><a href="Lab-8-Skills.md"><strong>&larr; Previous Lab</strong></a></td>
  </tr>
</table>
