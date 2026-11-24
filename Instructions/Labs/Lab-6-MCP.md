# Exercise 6 - Extending GitHub Copilot with MCP

#### Duration: 30 minutes

## Learning Objectives

By the end of this exercise, you will be able to:

- Explain how Model Context Protocol (MCP) connects Copilot to external tools and services.
- Configure the official GitHub MCP Server in Visual Studio Code.
- Authenticate the connection securely with GitHub.
- Verify that MCP tools are available in Copilot Agent mode.
- Use MCP tools to read and create GitHub Issues.
- Connect Copilot to Microsoft Learn for documentation research.
- Apply basic security and troubleshooting practices when using MCP servers.

## Scenario: Reducing Context Switching

The Daily Harvest team frequently switches between Visual Studio Code and GitHub.com to inspect repositories, read Issues, and look up documentation. MCP can connect Copilot to external services so that you can work with those services from the IDE.

## What Is MCP?

[Model Context Protocol](https://modelcontextprotocol.io/) is an open standard for connecting AI applications to external tools and data sources. In this exercise:

- **Host:** Visual Studio Code and GitHub Copilot.
- **MCP client:** The connection managed by the host.
- **MCP server:** A service that exposes tools, resources, or prompts.
- **MCP tools:** Actions that Copilot can request, such as reading an Issue or searching documentation.

MCP servers can connect Copilot to GitHub, Microsoft Learn, databases, communication systems, project management tools, and other services. The server does not automatically give Copilot unrestricted access: the available capabilities depend on its configuration and your authenticated permissions.

## Prerequisites

Before starting, make sure that:

- Visual Studio Code is installed and updated to a version that supports the current MCP workflow. Remote GitHub MCP support requires VS Code 1.101 or later.
- The GitHub Copilot Chat extension is installed and you are signed in to GitHub.
- You have access to the repository used in this lab.
- You are using a trusted MCP server. Local MCP servers can run code on your machine, so review the publisher and configuration before starting one.

## How MCP Configuration Works in VS Code

MCP server configurations can be stored in two places:

- **Workspace:** `.vscode/mcp.json`. Use this when the configuration should be shared with the project.
- **User profile:** the MCP user configuration. Use this when the server should be available across workspaces.

For this lab, use the official remote GitHub MCP Server. The remote server uses HTTP and GitHub authentication, so no local runtime or Docker installation is required.

## Step 1: Install the GitHub MCP Server

The VS Code MCP gallery is the recommended installation path.

1. Open the **Extensions** view in VS Code.
2. Search for `@mcp`.
3. Find the official **GitHub MCP Server** and review its publisher and configuration.
4. Select **Install** for your user profile, or install it in the workspace if you want to share the configuration with the project.
5. If VS Code asks whether you trust the server, review the configuration and select **Trust** only if the server and its source are appropriate.

You can also open the [official GitHub MCP Server documentation](https://github.com/github/github-mcp-server) and use its **Install in VS Code** link.

## Step 2: Configure the Server Manually (Alternative)

Use this option when the gallery installation is unavailable or when you want to understand the workspace configuration.

Create or open `.vscode/mcp.json` and add the remote GitHub server:

```json
{
  "servers": {
    "github": {
      "type": "http",
      "url": "https://api.githubcopilot.com/mcp/"
    }
  }
}
```

Do not hardcode a Personal Access Token in a repository file. If your environment cannot use OAuth, follow the authentication instructions in the [GitHub MCP Server documentation](https://github.com/github/github-mcp-server#remote-github-mcp-server) and use a secret input or environment variable instead.

## Step 3: Start and Authenticate the Connection

1. Open the Command Palette with `Ctrl+Shift+P`.
2. Run **MCP: List Servers**.
3. Select **GitHub** and choose **Start** or **Restart** if necessary.
4. If prompted, trust the server configuration.
5. Complete the GitHub OAuth flow in your browser.
6. Return to VS Code after authentication finishes.

The server should now be running and its tools should be available to Copilot. Use **MCP: List Servers** again to confirm that GitHub is active. If available, choose **Show Output** to inspect the server log.

## Step 4: Verify the Connection with a Read-Only Request

Use Agent mode because it can select and invoke MCP tools.

1. Open GitHub Copilot Chat and select **Agent mode**.
2. Ask Copilot to inspect the current repository without making changes:

   ```
   Using the GitHub MCP Server, list the open issues in this repository. Do not create, update, or close anything.
   ```

3. Review the tool request before allowing it.
4. Confirm that Copilot returns the repository's open Issues.

This first request validates authentication, repository access, tool discovery, and the use of an external service without performing a write operation.

## Step 5: Create an Issue with MCP

Writing data requires extra care. Review the title and body before allowing the tool call.

1. Stay in Agent mode.
2. Enter the following prompt:

   ```
   Using the GitHub MCP Server, create an issue in this repository titled "MCP Test Issue" with the body "This is a test issue created using MCP." Ask for confirmation before creating it.
   ```

3. Confirm the proposed repository, title, and body.
4. Allow the tool call only after reviewing the details.
5. Open the repository's **Issues** tab on GitHub.com and verify that the Issue was created.

The same workflow can be used for other GitHub operations, but you should always distinguish read-only requests from actions that create or modify data.

## Step 6: Connect Microsoft Learn MCP

Microsoft Learn MCP provides current Microsoft documentation and code examples in Copilot Chat.

1. Open the Extensions view and search for `@mcp`.
2. Find the official **Microsoft Learn MCP Server** and review its publisher and capabilities.
3. Install the server for your user profile or workspace.
4. Trust and start the server when prompted.
5. Open Copilot Chat in Agent mode.
6. Ask Copilot:

   ```
   Search Microsoft Learn and recommend deployment options for this React and Vite application. Include the relevant documentation links and explain the trade-offs.
   ```

Try additional questions:

- `Search Microsoft Learn for best practices for securing a React application.`
- `Find the current Microsoft documentation for hosting a Vite application on Azure.`

GitHub MCP and Microsoft Learn MCP are independent servers. Use the server that provides the context required for the current task.

## Security and Token-Efficiency Practices

- Install MCP servers only from trusted publishers and review their configuration.
- Grant only the GitHub permissions and toolsets required for the exercise.
- Prefer read-only exploration before enabling write operations.
- Review every tool call that creates, updates, or deletes data.
- Never commit tokens, passwords, or other secrets to `.vscode/mcp.json`.
- Provide only the repository and Issue context needed for the request.
- Use a focused prompt and avoid repeating the entire task after each tool result.
- Limit enabled tools when possible; fewer tools reduce unnecessary context and make tool selection clearer.

## Troubleshooting

### The server does not appear

Confirm that VS Code is updated, the MCP server is installed, and you searched for the official server with `@mcp`. Run **MCP: List Servers** from the Command Palette.

### The server does not start

Review the trust prompt and the configuration in `.vscode/mcp.json`. Select the server in **MCP: List Servers** and choose **Show Output** to inspect its log.

### OAuth does not complete

Confirm that you are signed in to the intended GitHub account and that the account can access this repository. Restart the server and repeat the browser authentication flow.

### Copilot cannot find the tools

Confirm that the server is running, Copilot Chat is in Agent mode, and the tools are enabled in the chat tool configuration. Restart the MCP server if its tools were added or changed.

### The Issue request is denied

Check that your GitHub account has permission to read or write Issues in the repository. Read-only requests may succeed even when write operations are restricted.

## Optional Task: Explore Other MCP Servers

Open the [MCP Registry](https://github.com/mcp) or the VS Code MCP gallery and inspect another server used by your team. Before installing it, review:

- Who publishes and maintains it?
- What data can it access?
- Which tools and permissions does it expose?
- Does it support workspace or user-level configuration?
- How would you limit its access to the minimum required?

## Exercise Wrap-up

You have now connected GitHub Copilot to external services through MCP. You practiced installation, authentication, tool verification, read-only requests, write approval, documentation research, and troubleshooting.

### Reflection Questions

1. How did MCP change your workflow compared with switching between VS Code and a browser?
2. Which MCP tools would be most useful in your daily work?
3. Why should read-only requests be tested before write operations?
4. What security risks should you consider before installing a local MCP server?
5. How can limiting context and enabled tools improve both efficiency and safety?

### Key Takeaways

- MCP connects Copilot to external tools and services through a standard protocol.
- Agent mode is the Copilot Chat mode used to invoke MCP tools in this exercise.
- OAuth and secret inputs are safer than hardcoded credentials.
- Server trust, permissions, and tool approval are part of the normal MCP workflow.
- MCP servers can provide tools, resources, prompts, and interactive experiences.

## What's Next?

In Exercise 7, you will customize Copilot with repository instructions, reusable prompt files, and custom chat modes.

#### You have successfully completed the lab.

<table align="center">
  <tr>
    <td><a href="Lab-5-Agentic-Coding.md"><strong>&larr; Previous Lab</strong></a></td>
    <td>&nbsp;&nbsp;&nbsp;</td>
    <td><a href="Lab-7-Customizing-Copilot.md"><strong>Next Lab &rarr;</strong></a></td>
  </tr>
</table>
