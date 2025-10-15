__Note:__ This lab is currently built for working directly in VS Code. However, all functionality is available in other IDEs after manually configuring the tooling covered here.

# Exercise 6 - Extending GitHub Copilot with MCP

## 🎯 Learning Objectives

By the end of this exercise, you will be able to...

- Explain what MCP servers are and how they connect external knowledge to GitHub Copilot
- Enable MCP integration with GitHub in this project
- Use MCP server to pull a GitHub Issue into the IDE
- Ask GitHub Copilot Agent to work on that issue
- Understand how MCP expands GitHub Copilot’s capabilities

## 🍎 Scenario: Using Model Context Protocols to Gather External Information

Having spent your time at The Daily Harvest working with GitHub Copilot, you are now (hopefully) quite familiar with the the typical patterns with utilizing GitHub Copilot. However, you have now begun to notice an unusual bottleneck in your daily workflow. In order to appropriately understand the current GitHub.com environment, you have to _go_ to GitHub. Wouldn't it be _so_ much easier if there were a way for GitHub Copilot to be able to do that interfacing for you so you could spend more time focusing on your work and less time moving from your IDE to your browser back to your IDE then back to your browser once more?

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

## 💻 Step 1: Getting the GitHub MCP Server up and running

Before we can begin to utilize the GitHub MCP Server, we need to install it. Luckily for us, installing the Server requires just a few clicks. 

__Instructions:__

1. Start by opening up [the MCP Registry](https://github.com/mcp) in a new browser tab or window.
2. Find the GitHub Server
<img width="557" height="170" alt="image" src="https://github.com/user-attachments/assets/82e8a1b8-066f-4a8f-858f-f6161b5d0732" />
3. Click the "Install" drop-down, then click "Install in VS Code"
3.5. If prompted by your browser, accept opening VS Code
4. In your IDE, an extension page for the GitHub MCP Server should be displayed. Click "Install".
5. Link your GitHub account to your IDE as prompted

With that, you should be all set to begin work with the MCP Server.

### 💡 Additional Learning: Other Servers

If you would like to see what your other options are, take a moment to peruse the MCP Registry.

1. Look at the available pre-configured servers. Are there any you/your organization uses on a regular basis that could be tied in to your GitHub Copilot for greater efficiency?
2. Instead of installing them, click on an interesting server instance. Check out the documentation. Are there any interesting features of that particular MCP Server that could be useful in your day-to-day workflows?

## 🏗️ Step 2: Pulling an Issue from GitHub

With the MCP Server now installed and authenticated to our account, we can now begin to utilize one of the many tools that has been added to our arsenal as a result: _get\_issue_.

Inside the [MCP documentation](https://github.com/mcp/github/github-mcp-server) under the _Issues_ tool section, there is a short note about this tool and its capabilities as displayed here:

<img width="524" height="139" alt="image" src="https://github.com/user-attachments/assets/7c6a056e-a06f-45c3-901e-d6a0be63b045" />

With this, we can utilize GitHub Copilot to directly acquire issues we may need to work on directly into our IDE with the help of [chat variable formatting](https://docs.github.com/en/copilot/reference/cheat-sheet?tool=vscode#chat-variables).

__Instructions:__

1. Within this repository, navigate to the __Issues__ tab and find the issue called "Creation of robots.txt file".
2. Take a moment to understand the issue, and consider how you would ask GitHub Copilot to handle such a task.
3. As shown in the image above, we need three pieces of information to pass along for our MCP Server tool to work: the issue number, the owner, and the repository name. Find these three values.
4. Back inside our IDE, switch GitHub Copilot to agent mode (if it was not there already) and fill in the information required using chat variable formatting syntax at the beginning of our prompt.

<details>
  <summary>Example Syntax</summary>
  `#get_issue 21, Coveros, hol-copilot-lab`
</details>

5. Hit Shift + Enter to move to the next line in your prompt, and fill out the rest of your prompt for how you would have GitHub Copilot tackle this issue.
6. Submit your prompt, and watch GitHub Copilot both extract and work on the issue attached!

## 🏆 Exercise Wrap-up

### 🎯 Key Skills Practiced:

- Installing MCP Servers from the MCP Registry
- Understanding MCP functionality documentation
- Utilizing MCP tools to expand GitHub Copilot's inheret capabilities

### 💡 Reflection Questions:

1. **For your day-to-day work, what systems and services do you utilize for data storage and business planning? Do those have MCP Servers established?**
   _____________________________________
2. **Why might you choose a repository-level configuration over a local configuration for an MCP Server?**
   _____________________________________
3. **Take another look at [the GitHub MCP Server Documentation](https://github.com/mcp/github/github-mcp-server). Are there any tools that may be particularly helpful for your workflow?**
   _____________________________________

## 🔮 What's Next?

In Exercise 7, we'll take the extendability we received by using MCPs and expand that customizability further through the use of __Custom Instructions files__ to ensure GitHub Copilot has both a thorough understanding of our work's context _and_ the format through which we want our responses.
