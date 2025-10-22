# Exercise 1 - Lab Overview and Setup

#### Duration: 15 minutes

## Overall Lab Objectives

This 4-hour hands-on lab is designed to give developers practical experience using **GitHub Copilot** as an AI-powered assistant throughout the Software Development Life Cycle (SDLC). You will explore how GitHub Copilot can improve developer productivity, code quality, and security—from feature planning and prototyping to implementation, code review, and remediation.

Through a series of guided, real-world exercises, you will learn how to:
- Understand GitHub Copilot’s role across all phases of the SDLC
- Plan new features and define success criteria with GitHub Copilot
- Use AI-powered code completions directly within the IDE
- Leverage GitHub Copilot Chat in Ask, Edit, and Agent modes
- Delegate tasks to the GitHub Copilot coding agent to multiply development impact
- Review code at scale using GitHub Copilot code reviews
- Detect and fix security vulnerabilities using GitHub Copilot Autofix
- Extend GitHub Copilot’s capabilities with Model Context Protocol (MCP) servers
- Optimize GitHub Copilot performance using Custom Instructions and Prompt Files

## Welcome to The Daily Harvest

🍎 **Your Mission: Develop your daily pick of fresh code!**

Congratulations! You've just been hired as a software developer at **The Daily Harvest**, an exciting new startup that's revolutionizing the way fresh fruit is sold. Your company specializes in creating websites that allow orchards to sell their products to those who will never drive to a store.

### Your Role

As a new developer on the team, you'll be working on extending the functionality of the website and ensuring that it is well-tested. The company has recently adopted **GitHub Copilot** as part of its development workflow, and you'll be learning how to leverage this AI-powered assistant to accelerate your productivity and code quality.

### The Challenge Ahead

Throughout this lab, you'll help The Daily Harvest tackle real development challenges:
- Understanding and navigating the existing codebase effectively
- Enhancing test coverage across critical application components
- Planning and implementing a robust shopping cart system for the e-commerce platform
- Maintaining high code quality standards across the development team
- Identifying and resolving security vulnerabilities

Your manager has emphasized that speed to market is crucial in the competitive fruit-selling space, but code quality and security cannot be compromised. This is where GitHub Copilot becomes your secret weapon—helping you write better code faster while maintaining the high standards that fruit lovers expect from The Daily Harvest.

Let's get started and grow some ripe code together! 🍊

## Logging into the Lab Environment

### Accessing Your Lab Environment
 
Once you're ready to dive in, your virtual machine and **Guide** will be right at your fingertips within your web browser.
   
   ![](../../media/guide.png)

#### Virtual Machine & Lab Guide
 
Your virtual machine is your workhorse throughout the workshop. The lab guide is your roadmap to success.

### Exploring Your Lab Resources

To get a better understanding of your lab resources and credentials, navigate to the **Environment** tab.

   ![Manage Your Virtual Machine](../../media/exp-lab-resources.png)

### Utilizing the Split Window Feature

For convenience, you can open the lab guide in a separate window by selecting the **Split Window** button from the top right corner.

![Use the Split Window Feature](../../media/split-window.png)

### Managing Your Virtual Machine

Feel free to **Start**, **Stop**, or **Restart** your virtual machine as needed from the **Resources** tab. Your experience is in your hands!

![Manage Your Virtual Machine](../../media/23-7-25-g-2.png)

### Utilizing the Zoom In/Out Feature

To adjust the zoom level for the environment page, click the A↕: 100% icon located next to the timer in the lab environment.

![Use the Split Window Feature](../../media/zoom.png)

### Login to GitHub

1. In the LABVM desktop, open the **Microsoft Edge** browser.

   ![](../../media/23-7-25-g-1.png)

1. In a new tab, navigate to the **GitHub login** page by copying and pasting the following URL into the address bar:

   ```
   https://github.com/login
   ```

1. On the **Sign in to GitHub** tab, enter the provided **GitHub username** **(1)** in the input field, and click on **Sign in with your identity provider** to continue **(2)**.

    - Email/Username: <inject key="GitHub User Name" enableCopy="true"/>

      ![](../../media/23-7-25-g1.png)

1. Click on **Continue** on the **Single sign-on to CloudLabs Organizations** page to proceed.

    ![](../../media/23-7-25-g2.png)

1. You'll see the **Sign in** tab. Here, enter your Azure Entra credentials:

   - **Email/Username:** <inject key="AzureAdUserEmail"></inject>

       ![Enter Your Username](../../media/23-7-25-g3.png)

1. Next, provide your password and click on **Sign in**

   - **Password:** <inject key="AzureAdUserPassword"></inject>

      ![Enter Your Password](../../media/23-7-25-g4.png)

1. On the **Stay Signed in?** pop-up, click on No.

    ![](../../media/23-7-25-g4.1.png)

1. You are now successfully logged in to **GitHub** and have been redirected to the **GitHub homepage**.

   ![](../../media/github-homepage01.png)

## Creating your Repository

1. Navigate to the **hol-copilot-lab** repository in a web browser.

   ```
   https://github.com/Coveros/hol-copilot-lab/tree/main
   ```

1. Click the green **Use this template** button.

   ![](../../media/use-this-template-button.png)

1. You should see a repository creation form. Make the following selections and then click the **Create repository** button.
   - **Include all branches:** On
   - **Owner:** Cloudlabs-Enterprises
   - **Repository name:** <inject key="GitHub User Name" enableCopy="true"/>
   - **Visibility:** Internal

1. After a few moments you should be taken to the home page of your newly-created repository.

   ![](../../media/new-repo-home-page.png)

## Setting up IDE

1. Double-click on the Visual Studio Code shortcut on the desktop of your virtual environment.

   ![](../../media/visual-studio-code-shortcut.png)

1. Once the IDE opens, click on the **Welcome** link.

   ![](../../media/link-to-return-to-welcome-screen.png)

1. Click on the "Clone Git Repository..." option and select **Clone from GitHub** when that option appears at the top of the IDE. Follow the steps for signing into GitHub.

   ![](../../media/clone-git-repo-vs-code.png)

1. In Visual Studio Code, type the name of the repository that you just created in the search bar at the top of the IDE.

1. Choose a location on the local filesystem to save the repo. If prompted, sign into GitHub in the browser and authorize the Git Credential Manager, confirm that you want to open the repository in your current VS Code window, and indicate that you trust the author of the files in the folder.

1. Click on the **Extensions** button on the left-hand banner and search for **GitHub Copilot**. Install the extension.

   ![](../../media/install-github-copilot-extension.png)

1. Verify that the Copilot chat window appears on the right-hand side of the IDE.

   ![](../../media/evidence-that-copilot-extension-was-installed.png)

## Support Contact

The CloudLabs support team is available 24/7, 365 days a year, via email and live chat to ensure seamless assistance at any time. We offer dedicated support channels tailored specifically for both learners and instructors, ensuring that all your needs are promptly and efficiently addressed.

Learner Support Contacts:

- Email Support: cloudlabs-support@spektrasystems.com
- Live Chat Support: https://cloudlabs.ai/labs-support

## Summary

In this lab, you successfully set up your development environment, logged into GitHub, created a new repository, and configured Visual Studio Code with GitHub Copilot. 

#### You have successfully completed the lab. Click on **Next >>** to continue to the next lab.

![](../../media/next-page.png)