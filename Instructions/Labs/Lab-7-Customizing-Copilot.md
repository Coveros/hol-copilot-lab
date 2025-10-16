# Exercise 7 - Customizing GitHub Copilot

## 🎯 Learning Objectives

By the end of this exercise, you will:

- Explain what custom instructions are and how they shape Copilot’s behavior.
- Enable custom instructions in this project.
- Use one custom instruction to plan a new feature.
- Use another to generate a GitHub Issue for that feature.
- Push the issue into the GitHub project using MCP.
- See how Copilot can be tailored to organizational workflows.

## 🍎 Scenario: Limiting Redundancy in The Daily Harvest's workflows

By now, things are running pretty smoothly at The Daily Harvest. Your team is utilizing GitHub Copilot to efficiently learn and develop new features and bug fixes, Coding Agent has been utilized for routine fixes and additions to free up developers' hands for more complex work, and MCPs have been integrated to ensure the information your team _and_ GitHub Copilot needs are always available. However, amidst the productivity, you've noticed an issue that, while small at first, has become more noticeable with the most glaring improvements taken care of...

It began when you asked GitHub Copilot to spin up a new test suite for a customer support utility and you received tests written using the Jest framework when your company uses Puppeteer. You later received functionality from GitHub Copilot that utilized the wrong version of an API for your payment processor.

You've begun to notice that every new context in which you utilize GitHub Copilot—new Copilot Chat threads, individual Issues assigned to Coding Agent, or using resources drawn from MCPs to create improved functionality—require you to regurgitate a copy-pasted list of do's and don'ts regarding style guides, package versions, and response formatting to ensure GitHub Copilot provides an answer that is not just functional but also correct for your organizational standards. There has to be a better way to ensure GitHub Copilot knows which rules to follow, and some diving into the internet leads you to a perfect solution: custom instructions files.

## 📄 Introduction to Custom Instructions

Custom Instructions Files are, unsurprisingly, files that can be created and stored at one of three levels:

1. Organization
2. Repository
3. Personal

While we are going to focus on repository-level custom instructions here, each has its own use case and they are all melded together when applicable for each individual prompt a user submits. When all three are utilized as context for a particular prompt, personal instructions take the highest priority, followed by repository instructions, with organization instructions prioritized last.

But what can these do? Using __natural language__, custom instruction files allow you to define information and rules that are prepended to every prompt within that context.  

<details>
  
  <summary>Repository Instructions support by environment</summary>
  
  <img width="731" height="503" alt="image" src="https://github.com/user-attachments/assets/43d8a28b-d9d7-4f79-97c4-2c905570bcfe" />

</details>

### A Rudimentary Example

Imagine that you have created a very simple `.github/copilot-instructions.md` file that reads,

```md
Begin every response with "Sure thing! Let me get on that."

End every response with "And that about does it."
```

What you will now see from GitHub Copilot, regardless of whether you are utilizing GitHub.com Copilot Chat, Copilot Chat in your IDE, or Coding Agent, is a response that looks like...

```md
Sure thing! Let me get on that.
...
---Answer to prompt---
...
And that about does it.
```

## ⚙️ Step 1: Enable custom instructions

Before we can begin utilizing custom instructions, we should first make sure they are enabled in our IDE.

__Instructions:__

1. In your VS Code instance, switch to the Explorer tab in your sidebar (if you are not already there)
2. Open the Settings editor using `Cmd`+`,` (Mac) or `Ctrl`+`,` (Linux/Windows).
3. In the search box at the top of your settings editor, type "Instruction file"
4. Ensure the check box under "Use Instruction Files" is marked

Great! With that, we should be ready to go building our first set of custom instructions.

## 📝 Step 2: Create a custom instructions file

In order to begin utilizing a custom instructions file, we must first create one. Perhaps we could utilize GitHub Copilot to generate its own guardrails...? 

__Instructions:__

1. In your VS Code instance, open GitHub Copilot Chat and switch to Agent Mode
2. Click the cogwheel in the upper-right portion of the Chat window
3. From the drop-down, select the "Generate Agent Instructions"
4. Watch GitHub Copilot analyze your repository and return a custom instructions file specifically catered to your environment.
5. Take a moment to assess the results returned from GitHub Copilot. Are there any results you think are out of place? Are there any guidelines that you might not have previously considered for this kind of project?

## 💭 Step 3: Using the instructions file for feature planning

Now that we have an custom instructions files ready to guide GitHub Copilot to greatness, we are going to utilize that to plan and push a feature issue up to GitHub.

__Instructions:__

1. Switch GitHub Copilot to Ask Mode, and ask how it would plan to develop a new feature of your choice. Did GitHub Copilot's response match or break any of the rules from the instructions file?
2. Switch back to Agent Mode, and ask GitHub Copilot to utilize the `create_issue` tool in the GitHub MCP Server to push an issue detailing that plan to your GitHub repository.

<details>
  
  <summary>`create_issue` Documentation</summary>
  
  <img width="551" height="266" alt="image" src="https://github.com/user-attachments/assets/dd0f8940-8ae5-484a-b62a-1491f064e99b" />

</details>

3. After GitHub Copilot has finished, refresh your repository on GitHub.com (or simply navigate to the __Issues__ tab if you are not already there). Do you see your issue? If so, did it follow the guidelines established in your instructions file?

## 🏆 Exercise Wrap-up

### 💡 Reflection Questions

- A more limited feature utilizing custom instructions is the [path-specific custom instructions file](https://docs.github.com/en/copilot/how-tos/configure-custom-instructions/add-repository-instructions#creating-path-specific-custom-instructions-1). How might these be beneficial over more general repository instruction sets?
- What are some prompts you might be using in your daily workflow that can be consolidated into an instructions file?
- A _Public Preview_ feature similar to custom instructions files is [prompt files](https://docs.github.com/en/copilot/how-tos/configure-custom-instructions/add-repository-instructions#enabling-and-using-prompt-files). How might you use these in conjunction with or separately from custom instructions files?

### 🎯 Key Takeaways

- Custom instructions files can be used to limit repetition in your prompts
- Custom instructions can both reinforce context and define response formats
- These files can be stored at different levels to enforce rules with different scopes
