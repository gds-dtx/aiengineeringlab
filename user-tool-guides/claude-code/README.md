> ALPHA
> This is a new service. Your [feedback](https://github.com/govuk-digital-backbone/aiengineeringlab/discussions) will help us to improve it.

# Claude Code: user guide

## Purpose

This guide helps engineers use Claude Code effectively in their daily workflow. It covers practical usage patterns, terminal-based development, advanced features, and integration.

## Who this is for

This guide is for:

- engineers writing code, maintaining and refactoring codebases
- engineers maintaining and refactoring legacy systems
- teams adopting AI-assisted development tools

## What Claude Code does

Claude Code is Anthropic's AI-powered coding assistant that works in your terminal, IDE, or web browser. It helps you write, understand, debug, and refactor code through conversational interaction.

### Core capabilities

| Capability | What it does |
|------------|--------------|
| Codebase exploration | Understands entire repositories, navigates dependencies, finds patterns |
| Multi-file editing | Makes changes across multiple files whilst maintaining consistency |
| Command execution | Runs tests, builds, lints, Git operations, and any CLI tool |
| Documentation | Generates and maintains code documentation, API references, and technical guides |
| Testing | Generates test cases, creates test data, runs test suites |
| Debugging | Analyses errors, identifies root causes, suggests fixes |
| Refactoring | Modernises legacy code, applies patterns, improves structure |
| Workflow integration | Works with GitHub, GitLab, and development tools via Model Context Protocol (MCP) servers |

### How it works

You can use Claude Code:

- in your terminal for conversational command-line interface for development workflows
- integrated with your IDE for visual editing in Visual Studio (VS) Code or JetBrains IDEs
- on the web for browser-based access at [claude.ai/code](https://claude.ai/code) with no installation required

## Quick navigation

| Section | Description |
|---------|-------------|
| [Getting started with Claude Code](getting-started.md) | Installation, authentication, daily coding workflows for new projects and existing codebases, and code quality practices |
| [Advanced use of Claude Code](advanced-use.md) | Techniques for individual engineers including better prompting, context management, and comprehensive security practices |
| [Customisation guide for Claude Code](customisation-guide.md) | Team-level configuration through CLAUDE.md files, custom slash commands, skills, hooks, and Model Context Protocol (MCP) integration |
| [Safe usage guidance: prototyping vs production](safe-usage-prototyping-vs-production.md) | Differentiated controls for prototyping and production environments |
| [Evaluating AI agents](evaluating-ai-agents.md) | Signpost to Anthropic's practical guide on designing evals for agentic systems |

## Getting help

You can get help by:

- typing `/help` in Claude Code for available commands
- browsing the [official Claude Code docs](https://code.claude.com/docs)
- visiting the [support centre](https://support.claude.com)
- typing `/bug` in Claude Code or visiting [GitHub discussions](https://github.com/anthropics/claude-code/discussions) to resolve issues
