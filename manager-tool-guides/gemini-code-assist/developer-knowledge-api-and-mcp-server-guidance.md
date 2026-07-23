> ALPHA
> This is a new service. Your [feedback](https://github.com/gds-dtx/aiengineeringlab/discussions) will help us to improve it.

# Google Developer Knowledge API and MCP Server

A guide to configuring and using Google's Developer Knowledge API through Model Context Protocol (MCP) for accessing official Google documentation in Gemini Code Assist.

## Contents

- [Overview](#overview)
- [What it provides](#what-it-provides)
- [How it works](#how-it-works)
- [Setup and configuration](#setup-and-configuration)
- [Using the Developer Knowledge MCP server](#using-the-developer-knowledge-mcp-server)
- [Security and governance](#security-and-governance)
- [Performance and metrics](#performance-and-metrics)
- [Troubleshooting](#troubleshooting)

## Overview

### What and when

The [Google Developer Knowledge API](https://developers.google.com/knowledge/api) provides programmatic access to official Google developer documentation through a Model Context Protocol (MCP) server. Use it when your team needs:

- up-to-date Google Cloud, Firebase, or Android documentation
- implementation guidance based on current best practices
- troubleshooting help for Google API errors
- comparative analysis between Google services

The API serves approximately 400,000 pages of Google's developer documentation. Google's freshness goal is to reindex content within 24 hours of publication, ensuring your AI assistant has access to current information.

Note: This API is currently in public preview. Features may change before general availability.

### Who this is for

This guide is for:

- managers configuring Gemini Code Assist for their teams
- platform administrators setting up MCP servers
- technical leads evaluating documentation integration options

End users do not need to configure this. Once set up, developers can access Google documentation automatically through Gemini Code Assist agent mode.

### Model Context Protocol (MCP)

The [MCP](https://modelcontextprotocol.io) is an open standard developed by Anthropic that enables AI assistants to securely access external data sources. The protocol is gaining adoption across the industry, with support from OpenAI, Google DeepMind, Microsoft, AWS and Cloudflare.

Key benefits include:

- standardised integration across different AI coding tools
- consistent approach to tool discovery and usage
- vendor-neutral architecture
- enhanced security through structured access controls

### AI Engineering Lab context

The AI Engineering Lab programme has identified Gemini Code Assist and GitHub Copilot as core tools for the project. This guide covers Gemini Code Assist configuration for accessing Google's official documentation through the Developer Knowledge MCP server.

## What it provides

The Developer Knowledge API provides access to approximately 400,000 pages of Google's official documentation:

- firebase.google.com
- developer.android.com
- docs.cloud.google.com
- Google Maps Platform
- Other Google developer resources

The service covers public documentation only. It does not access private repositories, GitHub, blogs, or YouTube content.

The [MCP server](https://developers.google.com/knowledge/mcp) provides three tools that Gemini uses automatically:
- search_documents - search the documentation corpus
- get_document - retrieve specific pages
- batch_get_documents - retrieve multiple pages

## How it works

### Architecture

```
Developer using Gemini Code Assist
    ↓
Gemini Code Assist agent mode
    ↓
MCP server (https://developerknowledge.googleapis.com/mcp)
    ↓
Developer Knowledge API
    ↓
Google's official documentation (400,000+ pages)
```

When you ask a question in Gemini Code Assist agent mode, Gemini determines if Google documentation would help. It then queries the MCP server, which retrieves relevant documentation from the API and returns it to Gemini for generating an informed response.

### Freshness commitment

Google's goal is to reindex all documentation within 24 hours of publication, ensuring AI assistants work with current information including breaking changes, new features, and deprecated APIs.

## Setup and configuration

### Prerequisites

You need:

- a Google Cloud project with billing enabled
- Gemini Code Assist installed in VS Code or IntelliJ
- permissions to create API keys in your Google Cloud project
- Google Cloud CLI installed (for MCP server enablement)

### Step 1: enable the API

Note: You need a Google Cloud project with billing enabled. For UK Government departments, work with your cloud platform team to ensure alignment with procurement frameworks. For individual testing, create a project at [console.cloud.google.com](https://console.cloud.google.com) (new users receive $300 in credits for 90 days).

Once you have a Google Cloud project:

1. Open the [Developer Knowledge API page](https://console.cloud.google.com/start/api?id=developerknowledge.googleapis.com) in the Google APIs library.
2. Check that you have the correct project selected.
3. Select Enable.
4. No specific IAM roles are required to enable or use the API beyond standard Google Cloud project access.

### Step 2: create an API key

#### Using Google Cloud Console

1. Go to the [Credentials page](https://console.cloud.google.com/apis/credentials) in your Google Cloud project.
2. Select Create credentials, then select API key.
3. The API key created dialog displays your new key. Make a note of it.
4. Select Edit API key.
5. In the Name field, provide a descriptive name (for example, 'Developer Knowledge MCP').
6. Under API restrictions, select Restrict key.
7. From the Select APIs list, enable Developer Knowledge API and select OK.
8. Select Save.

#### Using gcloud CLI

```bash
# Enable the API
gcloud services enable developerknowledge.googleapis.com --project=PROJECT_ID

# Create the API key
gcloud services api-keys create \
  --project=PROJECT_ID \
  --display-name="Developer Knowledge MCP"
```

Make a note of the returned API key for use in configuration.

For better security, restrict the API key to only the Developer Knowledge API after creation.

### Step 3: enable the MCP server

Prerequisites: you need the [Google Cloud CLI (gcloud)](https://cloud.google.com/sdk/docs/install) installed.

Installation:
- Windows: download the [Windows installer](https://cloud.google.com/sdk/docs/install#windows).
- macOS: use Homebrew: `brew install google-cloud-sdk` or download the [macOS installer](https://cloud.google.com/sdk/docs/install#mac).
- Linux: follow the [Linux installation guide](https://cloud.google.com/sdk/docs/install#linux).

Once installed, run:

```bash
gcloud beta services mcp enable developerknowledge.googleapis.com \
  --project=PROJECT_ID
```

Replace `PROJECT_ID` with your Google Cloud project ID.

If the Developer Knowledge service is not enabled, you will be prompted to enable it before enabling the MCP server.

### Step 4: configure Gemini Code Assist

Configuration depends on your IDE.

#### VS Code

You must add MCP servers to your Gemini settings JSON file manually. You cannot use the command palette to install MCP servers for agent mode.

Configuration file location:
- macOS/Linux: `~/.gemini/settings.json`
- Windows: `%USERPROFILE%\.gemini\settings.json`

Open your Gemini settings file and add:

```json
{
  "mcpServers": {
    "google-developer-knowledge-mcp": {
      "httpUrl": "https://developerknowledge.googleapis.com/mcp",
      "headers": {
        "X-Goog-Api-Key": "YOUR_API_KEY"
      }
    }
  }
}
```

Replace `YOUR_API_KEY` with the API key you created in step 2.

Using Gemini CLI (alternative method):

```bash
gemini mcp add -t http \
  -H "X-Goog-Api-Key: YOUR_API_KEY" \
  google-developer-knowledge-mcp \
  https://developerknowledge.googleapis.com/mcp \
  --scope user
```

Note: This requires [Gemini CLI](https://github.com/google-gemini/gemini-cli) to be installed separately.

Configuration note: the Developer Knowledge MCP server uses HTTP transport (Server-Sent Events), which is why we use `httpUrl` in the configuration.

#### IntelliJ and JetBrains IDEs

Configuration file location:

The file location depends on your operating system:
- macOS/Linux: `~/.gemini/mcp.json`
- Windows: `%USERPROFILE%\.gemini\mcp.json`

Note: unlike VS Code which uses `settings.json`, IntelliJ uses a separate `mcp.json` file for MCP server configuration.

Create or edit this file and add:

```json
{
  "mcpServers": {
    "google-developer-knowledge-mcp": {
      "httpUrl": "https://developerknowledge.googleapis.com/mcp",
      "headers": {
        "X-Goog-Api-Key": "YOUR_API_KEY"
      }
    }
  }
}
```

Replace `YOUR_API_KEY` with your API key.

Important: MCP server support in Gemini Code Assist requires agent mode, not standard chat mode. Ensure you switch to the Agent tab after configuration.

#### Project-level configuration

For team-wide consistency, add MCP configuration to your repository by creating `.gemini/settings.json` in your project root.

Important security considerations:

1. Do not commit API keys to version control. Add `.gemini/settings.json` to your `.gitignore`.

2. Use environment variables for shared configurations:
   ```json
   {
     "mcpServers": {
       "google-developer-knowledge-mcp": {
         "httpUrl": "https://developerknowledge.googleapis.com/mcp",
         "headers": {
           "X-Goog-Api-Key": "${DEVELOPER_KNOWLEDGE_API_KEY}"
         }
       }
     }
   }
   ```

Document the required environment variable in your project README.

### Step 5: restart your IDE

After configuring the MCP server, you must restart your IDE to load the configuration.

VS Code:
1. Close and reopen VS Code, or
2. Use Command Palette (Ctrl/Cmd+Shift+P) then 'Developer: Reload Window'.

IntelliJ:
1. Close and reopen IntelliJ IDEA, or
2. File → Invalidate Caches → Restart (if experiencing issues).

### Step 6: verify the configuration

1. Open Gemini Code Assist (or your configured AI tool) in your IDE.
2. Switch to the Agent tab (agent mode).
3. Type `/mcp` in the chat.
4. You should see `google-developer-knowledge-mcp` listed with its connection status and available tools.

To verify the server is working, enter a test prompt:

```
How do I list Cloud Storage buckets?
```

If you see a tool call to `search_documents`, the server is functioning correctly.

## Using the Developer Knowledge MCP server

### In Gemini Code Assist agent mode

Once configured, Gemini Code Assist automatically uses the MCP server when it determines Google documentation would help answer your question.

You do not need to explicitly invoke the MCP server. Simply ask questions in agent mode:

```
'What's the best way to implement push notifications using Firebase Cloud Messaging in an Android app?'
```

```
'How do I fix this error: ApiNotActivatedMapError in Google Maps?'
```

```
'Compare Cloud Run and Cloud Functions for deploying a Python microservice. Show me a table with use cases, concurrency models and pricing.'
```

### Effective prompts

For best results, be specific about Google services and error codes.

Good: 'How do I deploy a Flask app to Google Cloud Run?'  
Poor: 'How do I deploy a web app?'

Good: 'I'm getting error 401 when calling the Firebase Authentication REST API'  
Poor: 'My Firebase integration is broken'

Avoid overly broad requests like 'Compare all Google Cloud services' as these require processing excessive documentation.

### Managing token usage

Retrieving document content—especially with `batch_get_documents`—consumes tokens within your AI tool's context window. Some Google documentation pages are large, and fetching multiple documents can lead to higher costs, slower responses, and context window overflow.

To optimise performance:

- craft specific prompts targeting only the information you need
- avoid broad requests that force ingestion of large amounts of documentation
- use `search_documents` first to identify relevant pages before fetching full content

## Security and governance

### Security model

The Developer Knowledge API and MCP server have a low-risk security profile:

What it accesses:
- public documentation only
- no access to your code or projects
- no access to private repositories
- no access to user data

What it cannot do:
- execute code
- access file systems
- modify documentation
- read or write Google Cloud resources
- access anything requiring authentication beyond the API key

### Authentication method

The Google Developer Knowledge API uses API key authentication via the `X-Goog-Api-Key` header. This is Google's chosen authentication method for this public documentation service.

Note: While the MCP specification recommends OAuth 2.1 for HTTP transports, Google's Developer Knowledge API uses API keys as they provide simpler authentication for accessing public documentation only.

### API key security

Follow best practices by:

- restricting keys to only the Developer Knowledge API
- not committing keys to version control (add `.gemini/settings.json` and `mcp.json` to `.gitignore`)
- using individual keys rather than sharing team keys for better audit trails and quota management
- rotating keys quarterly
- monitoring quota usage via Google Cloud Console: IAM & Admin > Quotas & System Limits > Developer Knowledge API (see [Quota & limits](https://developers.google.com/knowledge/quota))

Alert on unusual usage patterns that might indicate compromised keys.

### Data classification

The Developer Knowledge MCP server is appropriate for:

- OFFICIAL classified work
- public sector development
- commercial cloud development

It is not suitable for:

- SECRET or TOP SECRET classified work (requires internet access to external API)
- air-gapped environments
- systems with strict prohibitions on external API access

All documentation accessed through the API is publicly available on Google's developer sites. No classified or sensitive information is transmitted.

For classification guidance, see: [Governance Guardrails](../../governance/guardrails-base.md)

### Compliance

The Developer Knowledge API operates under Google Cloud's standard terms of service. Only public documentation is accessed - no personal data or government information is transmitted to the API.

## Performance and metrics

Google's evaluations show the Developer Knowledge MCP server delivers:
- 65% improvement in responses to Google developer prompts
- 50% reduction in Gemini CLI end-to-end latency

These metrics demonstrate the value of providing AI assistants with direct access to current documentation.

For guidance on measuring adoption and value within your team, see [Metrics Collection & Analysis Framework](../../quality-metrics/measurement-playbook.md).

## Troubleshooting

### Setup and configuration issues

Problem: 'gcloud command not found' when enabling MCP server.

Solutions:
1. Install Google Cloud CLI from [cloud.google.com/sdk/docs/install](https://cloud.google.com/sdk/docs/install).
2. Restart your terminal after installation.
3. Run `gcloud init` to authenticate.
4. Verify installation: `gcloud --version`.

Problem: Settings file does not exist.

Solutions:

For VS Code:
- macOS/Linux: Create the directory and file:
  ```bash
  mkdir -p ~/.gemini && touch ~/.gemini/settings.json
  ```
- Windows (PowerShell): Create the directory and file:
  ```powershell
  New-Item -Path "$env:USERPROFILE\.gemini" -ItemType Directory -Force
  New-Item -Path "$env:USERPROFILE\.gemini\settings.json" -ItemType File
  ```

For IntelliJ:
- macOS/Linux: Create the directory and file:
  ```bash
  mkdir -p ~/.gemini && touch ~/.gemini/mcp.json
  ```
- Windows (PowerShell): Create the directory and file:
  ```powershell
  New-Item -Path "$env:USERPROFILE\.gemini" -ItemType Directory -Force
  New-Item -Path "$env:USERPROFILE\.gemini\mcp.json" -ItemType File
  ```

Problem: JSON syntax errors in configuration.

Solutions:
1. Validate your JSON using an online validator like [jsonlint.com](https://jsonlint.com).
2. Common errors:
   - missing commas between objects
   - trailing commas at the end of objects
   - incorrect quote marks (use straight quotes `"`, not curly quotes `"`)
   - mismatched brackets `{}` or braces `[]`

Problem: 'Gemini CLI command not found'.

Solution: the `gemini mcp add` command requires [Gemini CLI](https://github.com/google-gemini/gemini-cli) to be installed separately. If you don't have it, use the manual JSON configuration method instead.

Problem: MCP server not appearing in `/mcp` list.

Solutions:
1. Ensure you have restarted your IDE after configuration changes.
2. Verify the JSON syntax is correct.
3. Check the configuration file is in the correct location.
4. Ensure you are in agent mode (not standard chat mode).
5. Check IDE logs for configuration errors.

### Connection issues

Problem: 'Failed to connect to MCP server'.

Solutions:
1. Verify your API key is correct in the configuration file.
2. Check that the Developer Knowledge API is enabled in your Google Cloud project.
3. Confirm you have internet connectivity.
4. Verify the MCP server was enabled using `gcloud beta services mcp enable`.
5. Check for API key restrictions that might be blocking access.

### Authentication errors

Problem: 403 PERMISSION_DENIED errors.

Solutions:
1. Verify your API key has the Developer Knowledge API enabled in restrictions.
2. Check that the API key has not expired or been revoked.
3. Confirm quota limits have not been exceeded.
4. If using Model Armor, adjust PIJB (Prompt Injection and Jailbreak) filters to HIGH_AND_ABOVE confidence levels.

The Developer Knowledge MCP server only returns public documentation from trusted Google sources, so false positives are common with strict security filters.

### Query issues

Problem: Gemini is not using the Developer Knowledge server.

Solutions:
1. Verify you are in agent mode (not standard chat).
2. Make your query more specific to Google services.
3. Check the MCP server is connected using `/mcp`.
4. Try explicitly mentioning the Google service: 'According to Google Cloud documentation...'

Problem: receiving outdated documentation.

Solutions:
1. Google's reindexing goal is within 24 hours, so very recent changes may not yet be available.
2. Verify the documentation exists on the official Google developer site.
3. Check that the specific domain is included in the [Corpus reference](https://developers.google.com/knowledge/reference/corpus-reference).

### Rate limiting

Problem: 'Quota exceeded' errors.

The following solutions are available.

Solutions:
1. Check current quota usage in Google Cloud Console.
2. Reduce frequency of broad documentation queries.
3. Request quota increase if legitimate usage requires it.
4. Ensure API key is not being used outside your team.

For quota management, go to IAM & Admin > Quotas & System Limits in Google Cloud Console, select Service, then filter for Developer Knowledge API.

## Contributing

See the [contribution guidelines](../../CONTRIBUTING.md) before submitting changes. We encourage contributions from across government to keep this repository current.

## Future development

Google plans to add structured content support (code samples, API references), expand the documentation corpus, and reduce reindexing latency. See Google's [release notes](https://developers.google.com/knowledge/release-notes) for updates.

---