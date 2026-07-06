> MCP server availability depends on your organisation's approval. Check with your organisation before setting up MCP servers.

# MCP servers introduction

This guide explains Model Context Protocol (MCP) servers in straightforward terms – what they are, why they are useful, and how to set them up.

## Contents

[Quick reference](#quick-reference)

[What is an MCP server?](#what-is-an-mcp-server)

[How it works](#how-it-works)

[Why it matters](#why-it-matters)

[What MCP servers can provide](#what-mcp-servers-can-provide)

[Setting up MCP servers](#setting-up-mcp-servers)

[Agent skills](#agent-skills)

[Further reading](#further-reading)

### Content

This guide explains MCP servers – what they are, why they are useful, how to set them up, and how to use agent skills.

### Purpose

To help teams get started with MCP servers and understand core concepts before exploring more advanced topics.

### Who this is for

Developers, engineers, and technical leads who are new to MCP servers or setting up AI code assistants for the first time.

---

## Quick reference

| Term | Definition |
|------|------------|
| MCP server | A service that provides standards and context to AI code assistants |
| Agent skills | Markdown files containing project specific instructions for AI assistants |
| Standards | Rules and guidelines your organisation follows |
| Configuration | Settings that connect your AI tool to an MCP server |
| Context | Information the MCP server or agent skills share with the AI |

---

## What is an MCP server?

An MCP server works alongside your AI coding assistant (such as Claude or Copilot) to provide context and standards automatically.

Without MCP, your AI assistant does not know about your organisation's specific rules, standards, or best practices. You end up explaining the same context repeatedly such as 'Follow our design system', 'Ensure it is WCAG accessible', and 'Apply our security requirements'.

With MCP, the MCP server provides your AI assistant with the right information at the right time. Your AI already understands the requirements before you ask your question.

---

## How it works

```
Without MCP:

  ┌──────────┐                    ┌─────────────┐
  │   You    │ ◄── You explain ─► │     AI      │
  │          │     everything     │  Assistant  │
  └──────────┘                    └─────────────┘


With MCP:

  ┌──────────┐                    ┌─────────────┐      ┌──────────────┐
  │   You    │ ◄─── Better ────►  │     AI      │ ◄──► │  MCP Server  │
  │          │      results       │  Assistant  │      │  (Standards) │
  └──────────┘                    └─────────────┘      └──────────────┘
```

When you send a prompt, your AI assistant queries the MCP server for relevant context. The server returns applicable standards, patterns, or guidance. Your AI incorporates this into its response automatically.

---

## Why it matters

When working with AI code assistants, you often repeat instructions such as:

- use our design system
- ensure this meets Web Content Accessibility Guidelines (WCAG) accessibility requirements
- follow our security guidelines
- apply our team's coding standards


Configure an MCP server once, and your AI applies this knowledge automatically. Benefits include:

- less repetition because you do not need to explain the same requirements each time
- higher quality, more consistent output because your design and code standards apply from the start
- more secure code because security best practices are applied by default, not left to memory
- fewer errors because the server applies the same guidance every time
- more accessible services that work for everyone through built-in WCAG 2.2 requirements
- faster onboarding because new team members learn standards naturally through the AI's responses
- standards that scale across every project and person without extra effort, so quality does not depend on who is doing the work

---

## What MCP servers can provide

| Category | Examples | Benefit |
|----------|----------|---------|
| Design | Your organisation's design system patterns | Consistent, familiar interfaces |
| Accessibility | WCAG 2.2 requirements | Services that work for everyone |
| Security | Security best practices | More secure code |
| Code quality | Team conventions | Consistent code across the organisation |
| API design | REST and GraphQL patterns | Well structured APIs |

---

## Setting up MCP servers

### Prerequisites

Before setting up MCP servers, ensure you have:

- an AI tool that supports MCP (Claude Code, GitHub Copilot with agent mode, or compatible IDE extensions)
- Node.js 18 or later installed
- network access to MCP server endpoints
- appropriate permissions and authentication credentials from your organisation

### Step 1: Find your configuration file

| Tool | Configuration file location |
|------|----------------------------|
| Claude Code | `~/.claude/settings.json` |
| Cursor | `~/.cursor/mcp.json` |
| VS Code (Copilot) | `.vscode/settings.json` in your project |

### Step 2: Add an MCP server

Configuration depends on whether your MCP server runs locally or you host it remotely.

#### Local servers

For Claude Code, create or edit `~/.claude/settings.json`:

```json
{
  "mcpServers": {
    "my-server": {
      "command": "npx",
      "args": ["-y", "@your-org/your-mcp-server"]
    }
  }
}
```

Replace `@your-org/your-mcp-server` with the actual package name from your organisation or chosen MCP server provider.

For GitHub Copilot in VS Code, add to `.vscode/settings.json`:

```json
{
  "github.copilot.chat.mcpServers": {
    "my-server": {
      "command": "npx",
      "args": ["-y", "@your-org/your-mcp-server"]
    }
  }
}
```

For Cursor, create or edit `~/.cursor/mcp.json`:

```json
{
  "servers": {
    "my-server": {
      "command": "npx",
      "args": ["-y", "@your-org/your-mcp-server"]
    }
  }
}
```

#### Remote servers

For servers hosted on your network or the internet:

```json
{
  "mcpServers": {
    "org-server": {
      "url": "https://mcp.your-organisation.example.com/sse",
      "transport": "sse"
    }
  }
}
```

#### Multiple servers

You can connect to several MCP servers at once:

```json
{
  "mcpServers": {
    "org-standards": {
      "command": "npx",
      "args": ["-y", "@your-org/standards-mcp"]
    },
    "playwright": {
      "command": "npx",
      "args": ["-y", "@microsoft/playwright-mcp"]
    }
  }
}
```

#### Project level configuration

For team wide consistency, add MCP configuration to your repository.

Add a `claude-config.json` to your repository root with the same structure as your personal config. You can also document the required servers in a `CLAUDE.md` or `AGENTS.md` file.

```markdown
# Project context

This project uses the following MCP servers:
- standards-server: our team coding standards
- playwright: browser automation and testing

When generating code, apply these standards automatically.
```

### Step 3: Restart your AI tool

Close and reopen your editor or IDE to pick up the new configuration.

### Step 4: Verify it works

Start your AI assistant and ask:

```
What MCP servers are currently connected?
```

The AI should list active servers and their capabilities.

To test that the AI is applying context, try a prompt that would normally require you to specify your standards manually. If the MCP server is working, the AI will apply them automatically.

### Troubleshooting

If your MCP server is not connecting, follow these steps.

1. Check your configuration file is in the correct location.
2. Ensure the JSON is valid (no trailing commas, proper quotes).
3. Restart your AI tool after making changes.
4. Try running the server manually to see error output.
   ```bash
   npx -y @your-org/your-mcp-server
   ```

If the AI is not applying standards, follow these steps.

1. Verify your MCP server is running.
2. Be specific in your prompts – the server matches relevant standards to your request.
3. Check network connectivity for remote servers.

'Command not found' error

Ensure you have Node.js and npm installed and available in your PATH.

---

## Agent skills

In addition to MCP servers, you can provide context to your AI assistant through agent skills. These are markdown files that contain project specific instructions, standards, or guidance.

### What are agent skills?

Agent skills are simple text files (typically markdown) that you place in your project repository. Your AI assistant reads these files and applies the guidance they contain. Common examples include:

- `CLAUDE.md` or `AGENTS.md` – project specific instructions for your AI assistant
- `CONTRIBUTING.md` – contribution guidelines the AI should follow
- architecture decision records (ADRs) – design decisions the AI should be aware of

### How they differ from MCP servers

| Aspect | MCP servers | Agent skills |
|--------|-------------|--------------|
| Purpose | Connect to external tools and data | Teach how to use those tools |
| Scope | Organisation wide standards | Project or task specific context |
| Format | Structured server with tools | Markdown files with instructions |
| Setup | Configuration file | Files in your repo or uploaded |

Use both together. MCP gives your AI access to tools and data. Agent skills teach your AI how to use them effectively.

### Where skills live

#### For Claude

| Location | Scope |
|----------|-------|
| `~/.claude/skills/` | Personal skills (all projects) |
| `.claude/skills/` in your repo | Project skills (shared with team) |
| Organisation provisioned | Team wide (Enterprise or Team plans) |

#### For GitHub Copilot

| Location | Scope |
|----------|-------|
| `~/.copilot/skills/` | Personal skills |
| `.github/skills/` in your repo | Repository skills |

Skills you create are portable and work across any skills-compatible agent.

### Creating a skill

Every skill needs a `SKILL.md` file with YAML frontmatter and markdown instructions.

```markdown
---
name: my-skill-name
description: A clear description of what this skill does and when to use it
---

# My skill name

[Instructions that your AI will follow when this skill is active]

## When to use

- situation 1
- situation 2

## Guidelines

- guideline 1
- guideline 2
```

The description is the most important field. Your AI uses it to decide when the skill applies. A strong description should answer what the skill does and when the AI should use it.

### When to use each approach

Use MCP servers for standards that apply across multiple projects or teams, such as accessibility requirements, security guidance, or design system compliance.

Use agent skills for project specific context, such as your application's architecture, coding conventions unique to your team, or decisions that do not apply elsewhere.

In practice, you will likely use both.

---


## Further reading

[MCP best practices](mcp-best-practices.md) covers operating, testing, and maintaining MCP servers.

[MCP server design and architecture guide](mcp-server-design-and-architecture-guide.md) covers building custom MCP servers.

[MCP industry implementation examples](mcp-industry-implementation-examples.md) covers examples of development and testing MCP servers.

[MCP partner examples](mcp-partners-examples.md) covers MCP servers from major technology vendors.
