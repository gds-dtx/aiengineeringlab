> ALPHA
> This is a new service. Your [feedback](https://github.com/govuk-digital-backbone/aiengineeringlab/discussions) will help us to improve it.

# Claude Code setup guide

## Purpose

Use this guide to set up Claude Code through the AI Engineering Lab LiteLLM service.

This guide draws from onboarding sessions with departments and covers the issues teams hit most often.

## Who this is for

This guide is for engineers and technical leads onboarding to Claude Code through the AI Engineering Lab.

## Contents

[Before you start](#before-you-start)

[Install Claude Code](#install-claude-code)

[Configure Claude Code for AI Engineering Lab LiteLLM](#configure-claude-code-for-ai-engineering-lab-litellm)

[Configure the VS Code extension](#configure-the-vs-code-extension)

[Global and project configuration paths](#global-and-project-configuration-paths)

[Application programming interface (API) key lifecycle](#application-programming-interface-api-key-lifecycle)

[Cost-effective model usage](#cost-effective-model-usage)

[Troubleshooting](#troubleshooting)

[Security and content checks](#security-and-content-checks)

[Related guidance](#related-guidance)

## Before you start

You need:

- an approved Claude Code licence request
- a LiteLLM invitation link from your departmental LiteLLM administrator
- permission to install software on your device, or support from your information technology (IT) team
- internet access to `https://licenseportal.aiengineeringlab.co.uk`

Follow these onboarding steps.

1. Receive approval and a LiteLLM invitation.
2. Activate your LiteLLM portal account.
3. Generate a virtual key in LiteLLM.
4. Configure Claude Code to use the AI Engineering Lab endpoint.
5. Refresh your key before it expires.

## Install Claude Code

Use one route only.

### macOS using Homebrew

```bash
brew install --cask claude-code
```

### macOS using shell script

```bash
curl -fsSL https://claude.ai/install.sh | bash
```

### Windows using PowerShell

```powershell
irm https://claude.ai/install.ps1 | iex
```

### Windows using Command Prompt

```cmd
curl -fsSL https://claude.ai/install.cmd -o install.cmd && install.cmd && del install.cmd
```

### Windows Subsystem for Linux

Open your WSL terminal and run this command.

```bash
curl -fsSL https://claude.ai/install.sh | bash
```

### Company Portal or Intune-managed devices

If local installs are blocked, request the Claude Code package from your IT team through Company Portal or Microsoft Intune.

After IT deploys the app, open a terminal and run this command.

```bash
claude --version
```

## Configure Claude Code for AI Engineering Lab LiteLLM

Create or update your `.claude/settings.json` file with the department defaults below. This file uses JavaScript Object Notation (JSON) format.

```json
{
  "env": {
    "ANTHROPIC_BASE_URL": "https://licenseportal.aiengineeringlab.co.uk",
    "ANTHROPIC_AUTH_TOKEN": "sk-your-litellm-virtual-key",
    "ANTHROPIC_DEFAULT_SONNET_MODEL": "eu.anthropic.claude-sonnet-4-6",
    "ANTHROPIC_DEFAULT_HAIKU_MODEL": "eu.anthropic.claude-haiku-4-5-20251001-v1:0",
    "ANTHROPIC_DEFAULT_OPUS_MODEL": "eu.anthropic.claude-opus-4-6-v1"
  }
}
```

Use these model identifiers:

- `eu.anthropic.claude-sonnet-4-6` for most coding tasks
- `eu.anthropic.claude-haiku-4-5-20251001-v1:0` for quick, low-cost tasks
- `eu.anthropic.claude-opus-4-6-v1` for high-complexity planning and reasoning

## Configure the VS Code extension

Add environment variables in VS Code settings using the `claudeCode.environmentVariables` array-of-objects format.

```json
{
  "claudeCode.environmentVariables": [
    {
      "name": "ANTHROPIC_BASE_URL",
      "value": "https://licenseportal.aiengineeringlab.co.uk"
    },
    {
      "name": "ANTHROPIC_AUTH_TOKEN",
      "value": "sk-your-litellm-virtual-key"
    }
  ]
}
```

For workspace-only configuration, add the same block to your project `.vscode/settings.json` file.

## Global and project configuration paths

Use global settings when you want the same setup for every repository. Use project settings when you need repository-specific controls.

| Scope | macOS path | Windows path |
|---|---|---|
| Global Claude Code settings | `~/.claude/settings.json` | `%USERPROFILE%\.claude\settings.json` |
| Project Claude Code settings | `<repo>/.claude/settings.json` | `<repo>\.claude\settings.json` |
| Global VS Code user settings | `~/Library/Application Support/Code/User/settings.json` | `%APPDATA%\Code\User\settings.json` |
| Project VS Code workspace settings | `<repo>/.vscode/settings.json` | `<repo>\.vscode\settings.json` |

## Application programming interface (API) key lifecycle

### Activate your LiteLLM portal account

Once a licence request is approved, your departmental LiteLLM administrator creates your user account and sends you an invitation link.

1. Open the invitation link in your browser.
2. You will see the LiteLLM web portal login page at `https://licenseportal.aiengineeringlab.co.uk`.
3. Create a new password when prompted.
4. Sign in to confirm your account is active.

### Generate a virtual key

After signing in, generate a virtual key to authenticate Claude Code.

1. Log in to the LiteLLM web portal.
2. Navigate to the virtual keys section.
3. Create a new virtual key for your user account.
4. Copy the generated key, which starts with `sk-`.
5. Store the key in an approved secret management tool such as a password manager or vault.

Your LiteLLM administrator can also generate the key on your behalf. They share it securely through a password manager, vault, or secure email.

### Key expiry and renewal

Virtual keys expire after 90 days.

1. Before the key expires, log in to the LiteLLM web portal.
2. Generate a new virtual key.
3. Replace the old key in your local `.claude/settings.json` and VS Code settings.
4. Confirm the new key works by running `claude` in your terminal.

Do not store keys in source control. Do not share keys in chat, tickets, or pull requests.

## Cost-effective model usage

Use a two-step pattern to reduce spend and keep quality high.

1. Plan with Opus (4.8, 4.7, or 4.6) for complex decomposition, risk spotting, and architecture decisions.
2. Execute with Sonnet for implementation, tests, and iterative edits.

Use Haiku for lightweight tasks such as formatting fixes, short explanations, and quick boilerplate.

Opus 4.8 offers improved judgement in agentic tasks and is 4 times less likely to allow code flaws to pass unremarked compared to earlier versions.

## Troubleshooting

| Issue | What it usually means | How to fix it |
|---|---|---|
| `claude: command not found` | Claude Code is not installed or not on PATH | Reinstall with the correct installer and restart your terminal |
| Group policy blocks install or execution | Device policy restricts scripts or binaries | Use the Company Portal or Intune route and ask IT to approve the package |
| Browser auth redirect fails | Single sign-on, default browser, or callback handling issue | Retry with your default browser, clear session cookies, then sign in again |
| JSON parse error in settings | Invalid commas, quotes, or braces | Validate your JSON and compare against the example blocks in this guide |
| Hypertext Transfer Protocol (HTTP) 429 errors | Rate limit or budget threshold reached | Wait and retry, then ask your LiteLLM administrator to review limits |
| Firewall or proxy blocks endpoint | Network policy blocks outbound traffic | Ask your network team to allow `https://licenseportal.aiengineeringlab.co.uk` |

## Security and content checks

This guide excludes sensitive values and department-specific data. When handling keys and credentials, you should:

- never paste real API keys in documentation
- use placeholder values in examples
- store keys in approved secret management tools only
- keep `.claude/settings.json` out of shared screenshots if it includes live keys

## Related guidance

[Getting started with Claude Code](getting-started.md)

[Customisation guide for Claude Code](customisation-guide.md)

[Manager tool guide for Claude Code](../../manager-tool-guides/claude-code/README.md)