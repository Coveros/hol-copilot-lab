# Exercise 8 - Creating Reusable Skills with GitHub Copilot

#### Duration: 45 minutes

## Learning Objectives

By the end of this exercise, you will be able to:

- Explain how Skills extend GitHub Copilot with reusable, task-specific workflows.
- Distinguish repository instructions, Skills, prompts, and Agents.
- Create a `dev-qa` Skill for unit testing.
- Create a `dev-front` Skill for React frontend development.
- Invoke both Skills against a real component in the Daily Harvest application.
- Prepare Skills to be reused by specialized Agents in Exercise 9.

## Scenario: Making Team Expertise Reusable

The Daily Harvest team has already explored Copilot modes, MCP servers, and custom instructions. The team now wants to capture repeatable expertise without adding every rule to the instructions that Copilot reads for every task.

A Skill is a reusable workflow that Copilot can load when a task matches its purpose. In this exercise, you will create two project Skills:

- `dev-qa`: a specialist for unit tests.
- `dev-front`: a specialist for React frontend development.

The Skills will be used with `ProductsPage.tsx`, a real component in this project. In Exercise 9, specialized Agents will load these same Skills and coordinate work with them.

## How Skills Fit into Copilot Customization

Use the customization that matches the scope of the guidance:

| Customization | Purpose | Example |
|---|---|---|
| `.github/copilot-instructions.md` | Project-wide rules and context, similar to Claude Code's `CLAUDE.md` | TypeScript conventions and common commands |
| `AGENTS.md` | General instructions for AI agents, at the repository or folder level | Shared guidance for multiple agents |
| `*.instructions.md` | Instructions that apply to specific files or contexts | React or test-specific conventions |
| Skill | A reusable workflow for a specific type of task | Unit testing or frontend development |
| Prompt file | A repeatable prompt for one focused task | Explain a selected code snippet |
| Agent | A specialized worker with its own role and context | Frontend implementation agent |
| MCP server | Connection to an external tool or service | GitHub Issues or Microsoft Learn |

If you have used Claude Code, think of `.github/copilot-instructions.md` as the closest GitHub Copilot equivalent to `CLAUDE.md`: both provide project-wide context and rules that guide the assistant across tasks. The file format and location are different because each tool has its own customization system.

Use `*.instructions.md` files when a rule should apply only to a particular file type or part of the project. These files are stored in `.github/instructions/` and can use an `applyTo` pattern. Skills are different: they describe focused, reusable workflows that Copilot loads when the task requires them.

A useful way to remember the relationship is:

```text
Skill  -> defines how a type of task should be done
Agent  -> defines who performs the task and in which context
```

Skills should not be loaded for every request. Their description should make it clear when they are relevant, and their instructions should stay focused on the responsibility they own.

## Skill File Structure

For repository-level Skills, create a directory under `.github/skills`:

```text
.github/
└── skills/
    ├── dev-qa/
    │   └── SKILL.md
    └── dev-front/
        └── SKILL.md
```

Each `SKILL.md` should contain YAML frontmatter and Markdown instructions:

```markdown
---
name: skill-name
description: Use when the task involves a specific workflow.
---

# Skill instructions

Describe the workflow, constraints, and expected result.
```

The `name` should match the Skill directory name. The `description` is important because it helps Copilot decide when the Skill is relevant.

## Exercise 8.1 - Create the `dev-qa` Skill

The first Skill will specialize in unit testing React components in this repository.

### Step 1: Ask Copilot to create the Skill

Open Copilot Chat in Agent mode and ask it to create the Skill. Describe the requirements instead of pasting a finished `SKILL.md`:

```text
/create-skill Create a repository Skill named "dev-qa" in .github/skills/dev-qa/SKILL.md for the The Daily Harvest project.

This Skill is a unit-testing specialist. It must:

- Use Vitest, React Testing Library, user-event, and the jsdom environment used by this project.
- Follow the setup in eCommApp/src/test/setup.ts.
- Use existing tests such as eCommApp/src/components/CartPage.test.tsx as a style reference.
- Support creating, reviewing, analyzing, and improving unit tests.
- Use clear test names and an Arrange-Act-Assert structure.
- Cover happy paths, empty states, loading states, error states, disabled controls, and user interactions when they apply.
- Mock network requests, context providers, and child components only when that keeps the test focused and maintainable.
- Keep tests isolated, deterministic, and free from real external I/O.
- Include accessibility-oriented queries such as roles and accessible names when appropriate.
- Keep the Skill focused on tests; do not implement production frontend features.

Use the target file or component supplied in the user's request as the scope for the workflow.
```

### Step 2: Review the generated Skill

Open `.github/skills/dev-qa/SKILL.md` and check that it contains:

- valid frontmatter with `name` and `description`;
- the correct project tools and test paths;
- explicit boundaries around unit testing;
- instructions that can be followed for a specific target component.

If the Skill is too general, ask Copilot to make its description and workflow more specific to this repository.

### Step 3: Generate example unit tests as a reference asset

A Skill becomes more reliable when it can point to concrete examples instead of only describing rules. Ask Copilot to create a separate file with example unit tests that follow the `dev-qa` conventions, so future test generation can use it as a base reference:

```text
Using the dev-qa Skill conventions, create a separate file with example unit tests at .github/skills/dev-qa/examples/example-tests.md.

Include at most 2 short, illustrative test snippets (not a full test suite). Choose the 2 scenarios that best demonstrate the Skill's core conventions, for example:

- one happy-path render or user-interaction test
- one test that mocks a dependency (a child component or CartContext)
- use technique of 3A (Arrange, Act and Assert) and put comment on each fase.
- The created example files must be referenced within the skill so that it can use them as a basis for generating unit tests.
```

Open the generated `examples/example-tests.md` and confirm it only contains illustrative snippets (not a duplicate of a real test file), and that `SKILL.md` links to it as a resource. This file becomes the base reference the Skill can point to whenever it creates new tests.

## Exercise 8.2 - Create the `dev-front` Skill

The second Skill will specialize in frontend development. It is the companion to `dev-qa`: `dev-front` owns production frontend changes, while `dev-qa` owns unit tests.

### Step 1: Ask Copilot to create the Skill

In Agent mode, ask Copilot:

```text
/create-skill Create a repository Skill named "dev-front" in .github/skills/dev-front/SKILL.md for the The Daily Harvest project.

This Skill is a React frontend development specialist. It must:

- Work primarily in eCommApp/src/components and use TypeScript with the existing React and Vite setup.
- Follow the existing component patterns, React Router routes, CartContext usage, and styling conventions in eCommApp/src/App.css.
- Preserve existing behavior unless the requested feature requires a change.
- Consider loading, error, empty, disabled, responsive, and accessibility states.
- Prefer semantic HTML, accessible names, keyboard-friendly interactions, and maintainable component boundaries.
- Keep production UI logic in components and shared state in the existing context or utility layers when appropriate.
- Support create, improve, refactor, analyze, and review operations on frontend code.
- Keep the Skill focused on production frontend code; writing or evaluating tests is the responsibility of the dev-qa Skill.

Use the target component supplied in the user's request as the scope for the workflow.
```

### Step 2: Review the generated Skill

Open `.github/skills/dev-front/SKILL.md` and verify that it:

- has valid frontmatter;
- mentions the real project paths and technologies;
- includes accessibility and responsive design expectations;
- clearly excludes ownership of tests;
- works for one target component at a time.

## Exercise 8.3 - Apply `dev-front` to `ProductsPage.tsx`

`ProductsPage.tsx` loads products, renders product cards, adds products to the cart, and opens `ReviewModal` for product reviews. It is a useful target because it contains asynchronous loading, user interactions, shared context, and responsive UI.

Invoke the Skill with a focused request:

```text
/dev-front @eCommApp/src/components/ProductsPage.tsx

Analyze this component and propose one small, high-value frontend improvement. Consider loading and error states, accessibility, responsive behavior, and maintainability. Do not edit files yet. Return:

1. The current behavior you observed.
2. The proposed improvement.
3. The files that would be affected.
4. Acceptance criteria.
5. Any risks or trade-offs.
```

Review the response. The goal is to practice a reusable workflow, not to accept every suggestion automatically. Choose one improvement or record why the current implementation should remain unchanged.

## Exercise 8.4 - Apply `dev-qa` to the Same Component

Use the same component so the two Skills remain connected:

```text
/dev-qa @eCommApp/src/components/ProductsPage.tsx

Create a focused unit-test plan for this component. Cover product loading, loading feedback, failed requests, stock-aware Add to Cart behavior, opening and closing the review modal, and review submission. Use the project's Vitest and React Testing Library conventions. Do not edit files yet.
```

Compare the result with the `dev-front` analysis:

- Does the test plan validate the proposed frontend improvement?
- Does it cover the component's main user-visible states?
- Does it avoid testing implementation details unnecessarily?
- Does it use the existing test setup and project patterns?

This is the key connection between the Skills: `dev-front` describes the production behavior, and `dev-qa` defines how that behavior should be verified.

## Optional Exercise 8.5 - Implement and Validate the Approved Improvement

Only continue after reviewing the proposed change and its acceptance criteria.

1. Ask `dev-front` to implement only the approved improvement in `ProductsPage.tsx` and any directly related production file.
2. Review the diff and confirm that unrelated files were not changed.
3. Ask `dev-qa` to create or update focused tests for the approved behavior.
4. Run the tests from the `eCommApp` directory:

   ```bash
   npm run test:coverage
   ```

5. Review failures with Copilot in Ask mode and make sure the final tests validate behavior rather than merely reproducing implementation details.

Do not treat a generated change as complete until you have reviewed the diff and verified the tests.

## Preparing for Lab 9 - Agents

The two Skills created in this exercise are the shared foundation for the next exercise:

```text
Lab 8:
  dev-front -> defines how frontend work should be done
  dev-qa    -> defines how unit tests should be done

Lab 9:
  dev-front-ag -> the frontend specialist that loads dev-front
  dev-qa-ag    -> the testing specialist that loads dev-qa
```

A Skill is reusable guidance. An Agent is a specialized executor with a role, context, and tool permissions. In Exercise 9, you will create Agents that use these Skills instead of duplicating their rules in every agent definition.

## Checkpoint

Before continuing to Exercise 9, confirm that:

- `.github/skills/dev-qa/SKILL.md` exists and describes the unit-testing workflow.
- `.github/skills/dev-front/SKILL.md` exists and describes the frontend workflow.
- Both Skills have valid frontmatter and useful descriptions.
- `/dev-front` can analyze `eCommApp/src/components/ProductsPage.tsx`.
- `/dev-qa` can produce a test plan for the same component.
- The Skills have distinct responsibilities and do not duplicate each other's ownership.

## Reflection Questions

1. What guidance belongs in a Skill instead of repository-wide instructions?
2. How did using the same component connect the frontend and QA workflows?
3. Which details made the Skill description easier for Copilot to discover and apply?
4. What should an Agent add beyond the reusable instructions in a Skill?
5. How could these Skills reduce repeated context in future tasks?

## Key Takeaways

- Skills package reusable workflows for focused types of work.
- Skill descriptions are part of their discovery mechanism.
- `dev-front` owns production frontend changes, while `dev-qa` owns unit tests.
- Reviewing generated Skills is as important as reviewing generated code.
- Well-scoped Skills can be loaded by multiple specialized Agents.

## What's Next?

In Exercise 9, you will create specialized Agents that use the `dev-front` and `dev-qa` Skills to coordinate frontend development and testing.

#### You have successfully completed the lab.

<table align="center">
  <tr>
    <td><a href="Lab-7-Customizing-Copilot.md"><strong>&larr; Previous Lab</strong></a></td>
    <td>&nbsp;&nbsp;&nbsp;</td>
    <td><a href="Lab-9-Agents.md"><strong>Next Lab: Agents &rarr;</strong></a></td>
  </tr>
</table>
