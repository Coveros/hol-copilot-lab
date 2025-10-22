# Exercise 6 - Extending GitHub Copilot with MCP

#### Duration: 30 minutes

## 🎯 Learning Objectives

By the end of this exercise, you will be able to...

- Explain what MCP servers are and how they connect external knowledge to GitHub Copilot
- Enable MCP integration with GitHub in this project
- Use MCP server to pull a GitHub Issue into the IDE
- Ask GitHub Copilot Agent to work on that issue
- Understand how MCP expands GitHub Copilot’s capabilities

## 🍎 Scenario: Using Model Context Protocols to Gather External Information

Having spent your time at The Daily Harvest working with GitHub Copilot, you are now (hopefully) quite familiar with the typical patterns with utilizing GitHub Copilot. However, you have now begun to notice an unusual bottleneck in your daily workflow. In order to appropriately understand the current GitHub.com environment, you have to _go_ to GitHub. Wouldn't it be _so_ much easier if there were a way for GitHub Copilot to be able to do that interfacing for you so you could spend more time focusing on your work and less time moving from your IDE to your browser back to your IDE then back to your browser once more?

Luckily, there is a tool for that!

## 🤖 Introduction to MCPs

[Model Context Protocol](https://github.com/modelcontextprotocol) acts as a mediator between your code base and external services. By combining GitHub Copilot with various external systems, you can expand the knowledge GitHub Copilot has access to:

- **Data stores**: Files and databases
- **Communication tools**: [Slack](https://docs.slack.dev/ai/mcp-server/)
- **Design platforms**: [Figma](https://help.figma.com/hc/en-us/articles/32132100833559-Guide-to-the-Figma-MCP-server)
- **Project management**: [Jira](https://github.com/atlassian/atlassian-mcp-server) or [Azure DevOps](https://devblogs.microsoft.com/devops/azure-devops-mcp-server-public-preview/)
- **Cloud providers**: [Azure](https://learn.microsoft.com/azure/developer/azure-mcp-server/get-started)
- And many, many more!  

When looking to utilize MCP Servers, there are two primary ways of connecting your GitHub Copilot Client: through the MCP Registry and through manual configuration.

The [GitHub MCP Registry](https://github.com/mcp) provides a list of all currently available MCP Servers that can be easily and automatically installed. Simply find the MCP Server you need, click the appropriate "Install" drop-down menu, then choose the version of VS Code for which you would like to install that Server.

To manually configure an MCP connection, you will need to decide where you want to store your configuration file:

- To store the configuration at the repository level, create a `.vscode/mcp.json` file
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

By finding and viewing the documentation for your third-party MCP Server, you will be able to retrieve any additional information that may be required for that particular configuration. The communuity maintains a list of common MCP servers at https://github.com/modelcontextprotocol/servers.

## 💻 Step 1: Getting the GitHub MCP Server up and running

Before we can begin to utilize the GitHub MCP Server, we need to install it. Luckily for us, installing the Server requires just a few clicks. 

__Instructions:__

1. Start by opening up [the MCP Registry](https://github.com/mcp) in a new browser tab or window.
2. Find the GitHub Server

<img width="557" height="170" alt="image" src="https://github.com/user-attachments/assets/82e8a1b8-066f-4a8f-858f-f6161b5d0732" />

3. Click the "Install" drop-down, then click "Install in VS Code"
4. If prompted by your browser, accept opening VS Code
5. In your IDE, an extension page for the GitHub MCP Server should be displayed. Click "Install".
6. Link your GitHub account to your IDE as prompted

With that, you should be all set to begin work with the MCP Server.

## 🏗️ Step 2: Working with GitHub

With the MCP Server now installed and authenticated to our account, we can now begin to utilize one of the many tools that has been added to our arsenal as a result: _get\_issue_.

Inside the [MCP documentation](https://github.com/mcp/github/github-mcp-server) under the _Issues_ tool section, there is a short note about this tool and its capabilities as displayed here:

<img width="524" height="139" alt="image" src="https://github.com/user-attachments/assets/7c6a056e-a06f-45c3-901e-d6a0be63b045" />

__Note:__ Before moving on, please make sure your MCP Server is running. 

<details>
  
  <summary>Instructions for ensuring MCP is started</summary>
  
  - Click on the __Extensions__ tab in VS Code
  - At the bottom of that section, there should be a tab labeled "MCP Servers - Installed". You may need to collapse your "Installed" and "Recommended" extension sections.
  - In that installed MCP server section, locate "GitHub" and click the cogwheel next to it

  <img width="349" height="465" alt="image" src="https://github.com/user-attachments/assets/ea8211dc-198d-44e2-9005-e863d7ddf742" />
  
  - If the "Start Server" option is available to click, select it
  - If "Start Server" is greyed out, and you instead see "Stop Server" and "Restart Server" are clickable, you are all set! 

</details> 

__Instructions:__

1. The GitHub MCP server provides a large number of tools for interacting with GitHub such as Actions, Issues, Security Findings, PRs, and more. A full list of tools can be found in the [MCP documentation](https://github.com/mcp/github/github-mcp-server#available-toolsets). 
2. Open up Github Copilot Chat and select "agent" mode.
3. Let's start by asking GitHub Copilot to retrieve the list of issues for this repository.  You can do this by entering the following prompt into the chat input:
  
  ```
  What open issues are there in my repository?
  ```

4. Copilot will respond with a list of open issues in the repository including the issues we have created in previous exercises.
5. Next, let's ask GitHub Copilot to create a new issue. You can do this by entering the following prompt into the chat input: _Note you may need to click allow to give permission for GitHub Copilot to create the issue._
  
  ```
  Create a new issue titled "MCP Test Issue" with the body "This is a test issue created using MCP." 
  ```

6. After a moment, Copilot will confirm that the issue has been created. You can verify this by navigating to the Issues tab in the GitHub repository in your web browser.


## 📖 Step 3: Using the Microsoft Learn MCP server

Microsoft also provides an MCP server that connects GitHub Copilot to the Microsoft Learn documentation. This can be particularly useful when working with Microsoft technologies and services to receive up-to-date information and code examples directly within your IDE.

__Instructions:__

1. Start by opening up [the MCP Registry](https://github.com/mcp) in a new browser tab or window.
2. Find the "Microsoft Learn" Server
3. Click the "Install" drop-down, then click "Install in VS Code"
4. If prompted by your browser, accept opening VS Code
5. In your IDE, an extension page for the Microsoft Learn MCP Server should be displayed. Click "Install".

With that, you should be all set to begin work with the MCP Server.

1. Open up Github Copilot Chat and select "agent" mode.
2. Let's ask GitHub Copilot to retrieve information From Microsoft about different options for hosting this application. You can do this by entering the following prompt into the chat input:
  
  ```
  Search the Microsoft docs and recommend options for deploying this application.
  ```

3. Try other prompts to explore the Microsoft Learn documentation. For example, you could ask:
  - "Find best practices for securing a React application."
  - "What are the steps to integrate Azure AD authentication in a web app?"


### 🎁 Optional Task: Other Servers

If you would like to see what your other options are, take a moment to peruse the MCP Registry.

1. Look at the available pre-configured servers. Are there any you / your organization uses on a regular basis that could be tied in to your GitHub Copilot for greater efficiency?
2. Instead of installing them, click on an interesting server instance. Check out the documentation. Are there any interesting features of that particular MCP Server that could be useful in your day-to-day workflows?


## 🏆 Exercise Wrap-up

Congratulations! You've successfully extended GitHub Copilot's capabilities using Model Context Protocol (MCP) servers. You've experienced how MCP bridges the gap between your IDE and external services, bringing real-time data and functionality directly into your development workflow without context switching.

### Reflection Questions:

1. How did using MCP servers change your workflow compared to manually switching between your IDE and browser?
2. What types of external services or data sources would be most valuable to integrate with GitHub Copilot in your daily work?
3. How might MCP servers help reduce context switching and improve developer productivity in team environments?
4. What security considerations should you keep in mind when connecting external services through MCP servers?
5. How could you use the Microsoft Learn MCP server to stay updated with the latest documentation and best practices?

### Key Takeaways:

### 🔌 MCP as a Universal Connector
- **Eliminates context switching**: Access external services directly from your IDE without browser switching
- **Extensible architecture**: Connect GitHub Copilot to virtually any service with an MCP server
- **Real-time data access**: Get up-to-date information from external sources without leaving your development environment

### 🛠️ Easy Installation and Configuration
- **MCP Registry**: One-click installation for popular services through the centralized registry
- **Flexible configuration**: Choose between repository-level (`.vscode/mcp.json`) or user-level (`settings.json`) configurations
- **Authentication handling**: Secure connection to external services with proper credential management

### 📚 Enhanced Knowledge Base
- **Documentation integration**: Access Microsoft Learn, API documentation, and knowledge bases directly in GitHub Copilot
- **Issue management**: Create, retrieve, and manage GitHub issues without leaving your IDE
- **Cross-platform connectivity**: Connect to project management tools, communication platforms, and cloud services

### 🚀 Workflow Optimization
- **Reduced friction**: Streamline common tasks by bringing external tools into your development workflow
- **Consistent interface**: Use natural language to interact with all connected services through GitHub Copilot
- **Scalable integration**: Start with essential services and expand based on team needs and workflow requirements


## 🔮 What's Next?

In Exercise 7, we'll take the extendability we received by using MCPs and expand that customizability further through the use of __Custom Instructions files__ to ensure GitHub Copilot has both a thorough understanding of our work's context _and_ the format in which we want our responses.

#### You have successfully completed the lab. Click on **Next >>** to continue to the next lab.

![](../../media/next-page.png)
