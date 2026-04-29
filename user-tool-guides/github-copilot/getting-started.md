> ALPHA
> This is a new service. Your [feedback](https://github.com/govuk-digital-backbone/aiengineeringlab/discussions) will help us improve it.

# Getting started with GitHub Copilot

## Contents

[Access, licensing and public sector considerations](#1-access-licensing-and-public-sector-considerations)

[Set up GitHub Copilot in your IDE](#2-set-up-github-copilot-in-your-ide)

[Generate code in your IDE](#3-generate-code-in-your-ide)

[Use Copilot safely and responsibly](#4-use-copilot-safely-and-responsibly)

[Next steps](#5-next-steps)

This guide helps you start using GitHub Copilot in a development environment. It is written for developers with a range of experience.

The guide is split into clear steps. Follow them in order.

## Who this guide is for

This guide is for:

- software developers and engineers
- DevOps and platform engineers
- technical staff working in UK public sector organisations

You may be new to GitHub Copilot or already experienced with modern IDEs.

## What GitHub Copilot is

GitHub Copilot is an AI coding assistant that suggests code and explains existing code inside your development tools.

It can help you to:

- write code faster
- understand unfamiliar code
- create tests and documentation
- reduce time spent on repetitive tasks

Essential reading: [GitHub Copilot documentation](https://docs.github.com/en/copilot)

## Contents

[Access, licensing and public sector considerations](#1-access-licensing-and-public-sector-considerations)

[Set up GitHub Copilot in your IDE](#2-set-up-github-copilot-in-your-ide)

[Generate code in your IDE](#3-generate-code-in-your-ide)

[Use Copilot safely and responsibly](#4-use-copilot-safely-and-responsibly)

[Next steps](#5-next-steps)

## 1. Access, licensing and public sector considerations

Before installing Copilot, you should understand how access and data handling work.

Many public sector organisations use GitHub Copilot Business or Enterprise.

You should know:

- your organisation controls licensing and policies
- Copilot Business and Enterprise data is not used to train models
- privacy and security settings can be centrally managed

Read the [GitHub Copilot Trust Center](https://copilot.github.trust.page/faq) and this guide on [responsibly adopting GitHub Copilot](https://github.blog/news-insights/policy-news-and-insights/how-to-responsibly-adopt-github-copilot-with-the-github-copilot-trust-center/).

## 2. Set up GitHub Copilot in your IDE

GitHub Copilot works in several IDEs. This guide covers Visual Studio Code and JetBrains IDEs.

You need:

- a GitHub account approved by your organisation
- an active Copilot licence
- a supported IDE

### Set up Visual Studio Code

Use the following steps if you work in Visual Studio Code.

1. Install the GitHub Copilot extension from the Visual Studio Code marketplace.
2. Sign in using your GitHub account.
3. Confirm Copilot is enabled in the status bar.

See the [VS Code Copilot setup guide](https://code.visualstudio.com/docs/copilot/setup) for full installation instructions.


### Set up JetBrains IDEs

Use the following steps if you work in IntelliJ IDEA, PyCharm or another JetBrains IDE.

1. Install the GitHub Copilot plugin from JetBrains Marketplace.
2. Sign in using your GitHub account.
3. Enable the plugin for your current project.

See the [JetBrains Copilot setup guide](https://docs.github.com/en/copilot/how-tos/set-up/install-copilot-extension) for full installation instructions.

## 3. Generate code in your IDE

Once Copilot is set up, start using it to generate code.

### Generate code in Visual Studio Code

You can generate code by:

- starting to type code and accepting inline suggestions
- writing a comment that describes what you want to build
- using Copilot Chat to ask for code or explanations

You can improve how you work in Visual Studio Code by:

- accepting suggestions only after reading them carefully
- using comments to describe intent rather than exact syntax
- using Copilot Chat to explain existing code before changing it

See [Get started with GitHub Copilot in VS Code](https://code.visualstudio.com/docs/copilot/getting-started) for a practical walkthrough.

### Generate code in JetBrains IDEs

JetBrains IDEs support inline suggestions and chat based prompts.

You can generate code by:

- starting to type and reviewing inline completions
- writing comments that describe behaviour
- using the Copilot chat panel for larger changes

You can improve how you work in JetBrains IDEs by:

- using Copilot for small focused tasks rather than large rewrites
- combining Copilot suggestions with built in refactoring tools
- reviewing generated code against your project standards

## 4. Use Copilot safely and responsibly

You are always responsible for the code you commit.

You should use Copilot responsibly by:

- reviewing all generated code
- checking security, performance and accessibility
- avoiding secrets or sensitive data in prompts
- following your organisation’s coding standards

For structured learning, complete [GitHub Copilot Fundamentals Part 1 of 2](https://learn.microsoft.com/training/paths/copilot/) on Microsoft Learn.


## 5. Next steps

After you are comfortable with the basics, you can:

- improve how you write prompts
- use Copilot to generate tests and documentation
- explore advanced features such as refactoring and code review

Once you are confident using GitHub Copilot, consider reading the [advanced guide on 
using GitHub Copilot](advanced-use.md).
