> ALPHA
> This is a new service. Your [feedback](https://github.com/gds-dtx/aiengineeringlab/discussions) will help us to improve it.

# Google Gemini Code Assist: getting started guide

## Purpose

This guide helps developers get started with Google Gemini Code Assist. It includes installation, authentication, daily coding workflows, and essential practices for using AI assistance effectively in government development work.

For advanced features including Agent mode, MCP integration, data science workflows, and GCP development patterns, see the [advanced use guide](advanced-use.md).

## Who this is for

This guide is for:

- software developers new to Gemini Code Assist
- engineers who have credentials but have not yet set up the tool
- developers wanting to understand core features before exploring advanced capabilities

## Contents

[Quick start](#quick-start)

[Before you start](#before-you-start)

[What Gemini Code Assist does](#what-gemini-code-assist-does)

[Getting started](#getting-started)

[Understanding suggestion quality](#understanding-suggestion-quality)

[Daily coding workflows](#daily-coding-workflows)

[Tips for better results](#tips-for-better-results)

[Code quality and review](#code-quality-and-review)

[Security essentials](#security-essentials)

[Limitations and known issues](#limitations-and-known-issues)

[Troubleshooting](#troubleshooting)

[Further reading](#further-reading)

## Quick start

1. Install the extension (VS Code: Ctrl+Shift+X, search 'Gemini Code Assist').
2. Sign in with your department GCP credentials (not your personal Google account).
3. Open a code file — suggestions appear as you type, accept with Tab.
4. Open Gemini Chat pane for questions, explanations, and debugging help.
5. Never include secrets or real citizen data in prompts.

For detailed instructions, continue reading below.

## Before you start

Before using this guide, you should:

- have Gemini Code Assist credentials from your department
- understand your project's security classification (OFFICIAL or OFFICIAL-SENSITIVE)
- have a compatible IDE installed (VS Code, IntelliJ, PyCharm or other JetBrains IDEs)
- know your team's coding standards and review processes

## What Gemini Code Assist does

### Core capabilities

Gemini Code Assist provides AI assistance throughout your development workflow.

| Capability | What it does |
|------------|--------------|
| Code completion | Context-aware inline suggestions as you type |
| Code generation | Creates functions and classes from comments or signatures |
| Code understanding | Explains code, documents functions, answers technical questions |
| Testing | Generates unit tests, creates test data, identifies edge cases |
| Refactoring | Modernises legacy code, converts between languages, applies patterns |
| Debugging and analysis | Analyses errors, suggests fixes, provides stack trace analysis |
| GCP integration | Generates Terraform, creates software development kit (SDK) integration code, troubleshoots configurations |

### Context window

Gemini Code Assist can understand up to 1 million tokens of context. Enterprise deployments have access to 2 million tokens. This means it can analyse your entire codebase, understand project structure and dependencies, and reference documentation throughout your project.

### Interaction modes

| Mode | Best for | How to use |
|------|----------|------------|
| Inline suggestions | Daily coding, implementing patterns | Type naturally, accept with Tab |
| Next Edit Predictions | Related changes within the current file | Make a change, wait for next suggestion |
| Gemini Chat | Explanations, debugging, architecture questions | Open chat pane, ask questions |
| Agent mode | Complex multi-file refactoring, feature implementation | Describe task, approve plan, execute |

## Getting started

### Step 1: Install the extension

#### For VS Code

1. Open Extensions (Ctrl+Shift+X or Cmd+Shift+X).
2. Search for 'Gemini Code Assist'.
3. Select Install and restart if prompted.

#### For JetBrains IDEs (IntelliJ, PyCharm and similar)

1. Go to File, Settings, Plugins.
2. In the Marketplace tab, search for 'Gemini Code Assist'.
3. Select Install and restart your IDE.

### Step 2: Authenticate

1. Select the Gemini icon in your activity bar.
2. Select 'Sign in with Google'.
3. Use your department-provided GCP credentials (not your personal Google account).
4. Select your department's Google Cloud project if prompted.

Your department provides credentials through the central Google Cloud Platform (GCP) enterprise account managed by the Department for Science, Innovation and Technology (DSIT). Contact your team lead if you do not have credentials.

### Step 3: Verify setup

1. Open a code file to verify inline suggestions appear.
2. Check the Gemini icon in your IDE status bar shows as active.
3. Test chat by opening the Gemini pane and asking a question.

## Understanding suggestion quality

Learn to recognise good and poor suggestions.

Accept suggestions when they:

- follow your project's existing patterns
- handle edge cases appropriately
- include error handling
- match your team's coding style

Reject or review carefully suggestions that:

- are generic and do not fit your context
- lack error handling or validation
- show security anti-patterns (hardcoded secrets, SQL injection risks)
- are overly complex when simple would work

You must always get human review for:

- authentication and authorisation logic
- cryptographic operations
- database schema changes
- Identity and Access Management (IAM) policy modifications
- code handling citizen data

## Daily coding workflows

### Writing new functions

#### Step 1: Start with a clear comment

```python
# Function to process CSV file containing benefit claims
# - validates postcode format
# - checks for required fields: claimant_id, benefit_type, amount
# - returns list of valid claims and list of errors
```

#### Step 2: Review and refine

Accept the basic structure, then iterate:

- 'add error handling for malformed CSV rows'
- 'add type hints'
- 'handle Scottish postcodes and British Forces Post Office (BFPO) formats'

#### Step 3: Generate tests

Select the function, then in Gemini Chat:

> 'Generate unit tests covering happy path and error cases, including edge cases for UK-specific data formats'

### Understanding unfamiliar code

When you encounter legacy code, do the following.

1. Get a high-level overview by selecting the file and asking 'Explain what this module does and its main responsibilities'.
2. Understand specific sections by selecting a complex function and asking 'Explain this function step-by-step, focusing on the business logic'.
3. Identify issues by asking 'What are the main issues or technical debt in this code?'
4. Get refactoring suggestions by asking 'How could this be refactored to be more maintainable?'

### Debugging issues

Provide structured context for best results:

```
I'm getting this error: [paste error message]

The code is:
[paste relevant code]

Context information:
- python 3.11 with FastAPI
- running on Google Cloud Platform (GCP) Cloud Run
- intermittent issue, happens under load

What could be causing this?
```

Follow up with specific questions: 'Could this be a concurrency issue?' or 'What monitoring should I add to diagnose this?'

### Implementing common patterns

For government services, you often need standard patterns.

#### Data validation

> 'Create a Pydantic model for UK address validation including postcode format checking'

#### API client

> 'Generate an async HTTP client for calling the GOV.UK Notify API with retry logic and proper error handling'

#### Database migrations

> 'Create an Alembic migration to add citizen_id column with proper indexing'

## Tips for better results

### Be specific and provide context

Instead of vague requests like 'Create a function to process data', provide detail:

```
Create a Python function that:
- reads CSV files from Cloud Storage
- validates UK postcodes and National Insurance numbers
- filters out records with missing required fields
- returns a list of valid records and a list of validation errors

Context: Python 3.11, using google-cloud-storage library
```

### Use iterative refinement

Build up functionality step by step rather than asking for everything at once:

1. 'Create a function to validate postcodes'.
2. 'Add support for all UK postcode formats including British Forces Post Office (BFPO)'.
3. 'Add error messages that specify which format rule failed'.
4. 'Add unit tests including edge cases'.

### Include relevant context

Open related files in your IDE so Gemini can see your existing patterns, types, and conventions. The more context available, the better the suggestions will match your codebase.

## Code quality and review

### Responsibilities

You are responsible for all code you commit. Gemini suggestions are not pre-approved. Standard code review processes apply.

#### Review checklist for AI-generated code

| Category | Check |
|----------|-------|
| Logic | Does it do what you intended? Are edge cases handled? |
| Security | No hardcoded secrets? Input validation present? No injection vulnerabilities? |
| Compliance | Handles citizen data appropriately? Meets accessibility requirements? |
| Quality | Follows team standards? Has test coverage? Maintainable? |
| Performance | No obvious issues? Efficient queries? Reasonable resource usage? |

### Improving code quality iteratively

1. Get the basic working version.
2. 'Add comprehensive error handling with specific exceptions and logging'.
3. 'Add validation for all inputs including type checking and boundary conditions'.
4. 'Optimise this code for performance, especially the database queries'.
5. 'Add docstrings following Google style guide'.
6. 'Generate unit tests covering happy path, error cases, and edge cases'.

## Security essentials

In prompts, you should never include:

- application programming interface (API) keys, passwords, or tokens
- real citizen data or personal information
- production connection strings
- security configuration details

Instead, use placeholder values (`YOUR_API_KEY`, `example@example.com`), synthetic data, generic descriptions.

### Content exclusions

Gemini automatically excludes files matching patterns in `.aiexclude` or `.gitignore`. Typical exclusions include:

- `.env` files and environment configurations
- `secrets/` directories
- service account JSON files
- production configuration files
- files in `.gitignore`

Configuring `.aiexclude` and `.gitignore` settings is supported in VS Code. In JetBrains IDEs, only `.gitignore` exclusions apply automatically. Check with your manager if you are unsure what is excluded.

## Limitations and known issues

### Suggestions may be plausible but incorrect

Gemini can generate code that looks reasonable but contains logical errors, incorrect API usage, or subtle bugs. Always verify suggestions against documentation and test thoroughly.

### Complex business logic requires careful review

AI-generated code may not fully understand your domain-specific requirements. Review business logic carefully and validate against your specifications.

### Generated tests may not cover all edge cases

While Gemini can generate useful test scaffolding, it may miss edge cases specific to your context. Review test coverage and add cases for your particular requirements.

### Context limitations

Even with a 1 million token context window, very large monorepos may have gaps in understanding. If suggestions seem to miss important context, try opening the most relevant files directly.

### Occasional outdated patterns

Suggestions may occasionally use deprecated APIs or older patterns. Verify against current documentation, especially for fast-moving frameworks and libraries.

## Troubleshooting

| Problem | Possible causes | What to try |
|---------|-----------------|-------------|
| Suggestions not appearing | Extension disabled, authentication expired, file type excluded | Check Gemini status icon, sign out and back in, verify file type is supported |
| Low-quality suggestions | Insufficient context, vague comments, exclusions too restrictive | Add descriptive comments, include type hints, open related files |
| Slow performance | Too many extensions, large files, network latency | Disable unused extensions, close unused files, restart IDE |

For persistent issues, contact your team's champion or raise a support ticket.

For advanced troubleshooting including Agent mode and MCP issues, see the [advanced use guide](advanced-use.md).

## Further reading

The [Gemini Code Assist documentation](https://cloud.google.com/gemini/docs/codeassist) and [getting started guide](https://cloud.google.com/gemini/docs/codeassist/getting-started) cover the full feature set.

For secure development, see [NCSC secure development guidance](https://www.ncsc.gov.uk/collection/developers-collection). For building government services, refer to the [Government Design System](https://design-system.service.gov.uk/) and [Service Manual: Technology](https://www.gov.uk/service-manual/technology).

For AI-specific development practices, see the [AI SDLC playbook](../../playbooks/ai-sdlc-playbook.md) and [advanced use guide](advanced-use.md).
