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

Luckily, there is a tool for that!

## 🤖 Introduction to MCPs

[Model Context Protocol](https://github.com/modelcontextprotocol) acts as a mediator between your code base and external services. By combining GitHub Copilot with data stores such as files and databases, tools such as [Google Maps](https://developers.google.com/maps/ai/mcp) or [Slack](https://docs.slack.dev/ai/mcp-server/), or business planning utilities such as [Figma](https://help.figma.com/hc/en-us/articles/32132100833559-Guide-to-the-Figma-MCP-server) or [Trello](https://mcpservers.org/servers/m0xai/trello-mcp-server), you can expand the knowledge GitHub Copilot has access to.

When looking to utilize MCP Servers, there are two primary ways of connecting your GitHub Copilot Client: through the MCP Registry, and through manual configuration.

The [MCP Registry](https://github.com/mcp) provides a list of all currently available MCP Servers that can be easily and automatically installed. Simply find the MCP Server you need, click the appropriate "Install" drop-down menu, then choose the version of VS Code for which you would like to install that Server.

To manually configure an MCP connection, you will need to decide where you want to store your configuration file:

- To store the configuration at the repository level, create an `.vscode/mcp.json` file
- To store the configuration for your local device across workspaces, add the configuration to your `settings.json` file in Visual Studio Code

Inside the chosen file, you will add a configuration such as this template below...

```json
{
"inputs": [
  // The "inputs" section defines the inputs required for the MCP server configuration.
  {
    "type": "promptString"
  }
],
"servers": {
  // The "servers" section defines the MCP servers you want to use.
  "fetch": {
    "command": "uvx",
    "args": ["mcp-server-fetch"]
  }
 }
}
```

By finding and viewing the documentation for your third-party MCP Server, you will be able to retrieve any additional information that may be required for that particular configuration.

## 🔍 Step 1: Getting the GitHub MCP Server up and running

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

## 🏗️ Step 2: Analyzing Project Structure

Now let's understand how the code is organized and what the folder structure tells us.



MCP Servers (Context Enrichment) – 30 min
- Explain what MCP servers are and how they connect external knowledge to Copilot.
- Enable MCP integration with GitHub in this project.
- Use MCP server to pull a GitHub Issue into the IDE.
- Ask Copilot Agent to work on that issue.
- Outcome: Learners understand how MCP expands Copilot’s capabilities.

