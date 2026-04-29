> ALPHA
> This is a new service. Your [feedback](https://github.com/govuk-digital-backbone/aiengineeringlab/discussions) will help us to improve it.

# Google Gemini Code Assist: advanced use guide

## Purpose

This guide explains advanced features and specialist workflows in Google Gemini Code Assist. It includes Agent mode, MCP integration, data science capabilities, GCP development patterns, and prompt engineering techniques.

This guide assumes you have completed the [getting started guide](getting-started.md) and are comfortable with basic Gemini Code Assist usage.

## Who this is for

This guide is for:

- developers comfortable with basic Gemini Code Assist features who want to maximise productivity
- data scientists and analysts working with government data
- technical specialists implementing Google Cloud Platform (GCP) based solutions
- engineers maintaining and refactoring legacy systems

## Contents

[Advanced features](#advanced-features)

[Data science and analytics](#data-science-and-analytics)

[Development for GCP](#development-for-gcp)

[Customisation](#customisation)

[Security considerations](#security-considerations)

[Troubleshooting](#troubleshooting)

[Prompt engineering tips](#prompt-engineering-tips)

[Further reading](#further-reading)

## Advanced features

### Agent mode for complex tasks

Agent mode handles multi-file changes that would be tedious manually. Use it for migrations, refactoring, or implementing features that touch many files.

#### How to use agent mode

1. Open the Agent tab in the Gemini pane.
2. Describe your task clearly with requirements.
3. Review the proposed plan before approving.
4. Approve each file modification individually.
5. Test thoroughly after completion.

#### Example prompt

```
Migrate all database queries from synchronous SQLAlchemy to async SQLAlchemy.

Requirements

1. Update all model definitions to use async sessions.
2. Change query methods to use async/await.
3. Update tests to handle async fixtures.
4. Maintain backward compatibility for existing API contracts.
```

#### Important notes

Agent mode uses Human-in-the-Loop (HiTL) approval for all changes. Recitation and source citations are not available in agent mode. Break large tasks into smaller chunks for better results. Keep a clean git state so you can revert if needed.

#### Limitations by IDE

VS Code has full agent mode support including `/mcp`, `/deploy`, and yolo mode commands. JetBrains has agent mode available but without `/mcp`, `/deploy`, and yolo mode commands.

### Model Context Protocol (MCP) integration

Agent mode connects to external services using Model Context Protocol (MCP) servers. MCP replaced the deprecated @-tools feature in October 2025.

#### What MCP enables

MCP provides:

- integration with external APIs and services
- custom tooling for your workflow
- access to real-time data sources
- extended capabilities beyond built-in features

#### Configure MCP servers

VS Code: edit `~/.gemini/settings.json`
```json
{
  "mcpServers": {
    "google-maps": {
      "command": "npx",
      "args": ["-y", "@googlemaps/code-assist-mcp@latest"]
    }
  }
}
```

JetBrains: edit `.gemini/mcp.json` in your project

#### Using MCP in agent mode

The `/mcp` command lists configured servers and their status (VS Code only). The `/deploy` command deploys web apps to Cloud Run (VS Code only). Ask agent to use specific MCP servers: 'Use the Cloud Run MCP to deploy this application'.

#### Popular MCP servers

Popular MCP servers include Google Maps Platform Code Assist, Cloud Run deployment, BigQuery integration, and custom internal tools.

### Next Edit Predictions

Next Edit Predictions suggests the next likely edits within your current file as you work.

#### How it works

1. Make a change to your code.
2. Pause typing and predictions appear as ghost text.
3. Press Tab to accept, or keep typing to ignore.
4. Predictions only apply to the current file.

Enable in VS Code: available in Preview by default.
Enable in JetBrains: File, Settings, Tools, Gemini, enable 'Next Edit Predictions'.

### Code transformation

Use transformation commands for quick modifications:

| Command | Example |
|---------|---------|
| `/fix` | `/fix potential NullPointerExceptions in my code` |
| `/generate` | `/generate a function to get the current time` |
| `/doc` | `/doc this function` |
| `/simplify` | `/simplify if statement in this code` |

Access through Ctrl+I (Windows and Linux) or Cmd+I (macOS) in VS Code.

## Data science and analytics

Gemini Code Assist has strong capabilities for data science workflows, particularly with GCP services.

### Data exploration and analysis

#### Generating pandas code

```python
# 'Create pandas code to load this CSV, handle missing values in the 
# benefit_amount column, and group by region to calculate average claim amounts'
```

#### Data validation

> 'Generate data quality checks for this DataFrame to identify outliers, missing values, and duplicate records'

#### Statistical analysis

> 'Create code to perform chi-square test between claimant_age_group and benefit_type and interpret the results'

### Working with BigQuery

Gemini excels at generating BigQuery SQL and integration code.

#### Complex queries

```
Write a BigQuery SQL query to:
- join claims table with claimants table
- filter for claims in the last 6 months
- group by benefit type and region
- calculate total amount, average amount, and claim count
- only include groups with more than 100 claims
```

#### Python BigQuery client

> 'Generate Python code using the BigQuery client library to run this query, process results in batches, and save to Cloud Storage as CSV'

#### Data pipelines

> 'Create an Apache Beam pipeline to process claim events from Pub/Sub, validate data, aggregate by region, and write to BigQuery'

### Machine learning workflows

#### Feature engineering

```python
# 'Generate feature engineering code to:
# - encode categorical variables (region, benefit_type)
# - create time-based features (month, day_of_week, quarter)
# - handle missing values using median imputation
# - scale numerical features'
```

#### Model training

> 'Create code to train a random forest classifier using scikit-learn to predict claim approval, including cross-validation and hyperparameter tuning'

#### Vertex AI integration

```
Generate code to:

1. Package my scikit-learn model for Vertex AI.
2. Upload to Model Registry.
3. Deploy as an endpoint.
4. Create a prediction function with proper error handling.
```

### Working with GCP AI and ML services

#### Natural Language API

> 'Generate code to use Cloud Natural Language API to extract entities and sentiment from free-text claim descriptions'

#### Document AI

> 'Create code to process scanned benefit forms using Document AI, extract fields, and validate results'

### Google Colab integration

Google Colab has built-in Gemini integration, particularly valuable for data science work.

#### Benefits

Google Colab provides free access to GPUs and TPUs for ML training, pre-installed data science libraries, works with Google Drive and BigQuery, and built-in Gemini assistance directly in notebooks.

### Data Science Agent

The Data Science Agent, launched in March 2025 and powered by Gemini 2.0, is an agentic AI assistant integrated into Google Colab. It can generate complete, functional notebooks from natural language descriptions.

#### What the Data Science Agent does

The Data Science Agent takes a text prompt describing your analysis goal and generates a complete Colab notebook. It handles data loading, library imports, exploratory analysis, and visualisation code. It creates fully executable notebooks rather than isolated code snippets. It iteratively suggests fixes when errors arise, presenting proposed changes in a diff view.

#### How to use it

1. Open Google Colab and select the Gemini toggle to open the chat dialog.
2. Upload your dataset or connect to BigQuery tables.
3. Describe your analysis goal in plain language (for example, 'visualise trends', 'train a prediction model', 'clean missing values').
4. Review and execute the generated notebook.

#### Example prompts

- 'Help me perform exploratory data analysis and get insights about this dataset'
- 'Create visualisations showing trends over time grouped by region'
- 'Train a classification model to predict claim approval and evaluate its performance'
- 'Clean this data by handling missing values and removing outliers'

#### Use cases

Use cases include large-scale data processing with BigQuery ML, BigQuery DataFrames, or Serverless for Apache Spark. Other uses are exploratory data analysis and insight generation, machine learning model training and evaluation, and data cleaning and transformation workflows.

#### Colab Enterprise

For enterprise users, the Data Science Agent in Colab Enterprise offers additional capabilities. These include direct BigQuery table integration (type @ to search for tables). It also provides integration with your organisation's Google Cloud project and enhanced security controls.

#### Security considerations for Colab

Do not upload real citizen data to Colab notebooks. Use synthetic or properly anonymised data only. For OFFICIAL-SENSITIVE work, verify your department's policy on Colab usage.

### Data science best practices

Always validate AI-generated analysis code. Check statistical assumptions (normality, independence), verify calculations with known test cases, review data transformations for correctness, and ensure proper handling of missing data.

For sensitive data, never include real citizen data in prompts. Use synthetic or anonymised examples and follow your department's data protection policies.

## Development for GCP

### Infrastructure as Code

#### Generating Terraform

```
Create Terraform code for:

- Cloud Run service for a Python FastAPI application
- Cloud SQL PostgreSQL instance with read replicas
- Cloud Storage bucket for file uploads
- virtual private cloud (VPC) with private service connection
- Identity and Access Management (IAM) service accounts with least privilege

Include variable definitions, outputs, and Google Cloud Storage (GCS) backend configuration.
```

### Service integration

#### Cloud Functions

```python
# 'Generate a Cloud Function triggered by Cloud Storage uploads that:
# - validates uploaded CSV files
# - transforms data to JSON
# - publishes to Pub/Sub topic
# - handles errors with dead letter queue'
```

#### Cloud Run services

> 'Create a Cloud Run service in Python with FastAPI that exposes a health check endpoint and integrates with Cloud Logging'

#### Pub/Sub patterns

> 'Generate code for a Pub/Sub subscriber that processes messages in batches, implements retry logic with exponential backoff, and tracks processing metrics'

### Monitoring and observability

#### Structured logging

```python
# 'Add structured logging to this Flask application using Cloud Logging
# Include request IDs, user IDs (when available), and timing information'
```

#### Custom metrics

> 'Generate code to publish custom metrics to Cloud Monitoring for claim processing rate, error rate, and queue depth'

## Customisation

Gemini Code Assist customisation varies by context. Standard chat features work across all modes, while agent mode has additional options. VS Code agent mode is powered by a bundled Gemini CLI and has more features than IntelliJ.

### File exclusions (.aiexclude)

Control which files Gemini can access by creating an `.aiexclude` file in your project root.

```
.env
.env.*
secrets/
**/credentials.json
```

The syntax follows glob patterns. Gemini also respects `.gitignore` patterns, with `.aiexclude` taking precedence when both exist.

### IDE settings (all modes)

These settings apply to standard chat and code completion across both IDEs.

Custom commands (Prompt Library): Create reusable prompt shortcuts. 

In VS Code: Settings, Extensions, Gemini Code Assist, Custom Commands. 

In JetBrains: Settings, Tools, Gemini, Prompt Library. Access via Quick Pick menu (Ctrl+I or Cmd+I).

Instructions Gemini follows for every prompt. 

In VS Code: Settings, Extensions, Gemini Code Assist, Rules. 

In JetBrains: Settings, Tools, Gemini, Rules. Rules are stored locally, not in version control.

### Agent mode customisation (VS Code)

VS Code agent mode is powered by a bundled Gemini CLI and supports these additional features.

GEMINI.md context files: Create hierarchical context files that the agent loads automatically. These include `~/.gemini/GEMINI.md` for global defaults for all projects, project root `GEMINI.md` for project-specific context, and subdirectory `GEMINI.md` files for component-specific overrides.

MCP server configuration: Configure external tool integrations in `~/.gemini/settings.json`.

Tool control: Restrict which tools the agent can use by adding `coreTools` (allow list) or `excludeTools` (block list) to `~/.gemini/settings.json`.

Yolo mode: Auto-approve all agent actions in trusted workspaces. Enable via VS Code setting `geminicodeassist.agentYoloMode`. Use with caution.

Available commands: `/memory` (view loaded context), `/tools` (list available tools), `/mcp` (check MCP server status), `/stats` (usage statistics).

### Agent mode customisation (IntelliJ)

IntelliJ agent mode does not use Gemini CLI and has fewer customisation options.

GEMINI.md or AGENT.md: Create a context file at your project root. Does not support hierarchical loading.

MCP server configuration: Configure in `mcp.json` in your IDE's configuration directory.

Auto-approve: Enable via Agent options checkbox in the Gemini chat panel.

Tool control and slash commands are not available in IntelliJ agent mode.

### GitHub integration

For pull request reviews, create a `.gemini/` folder in your repository root. This is the most team-friendly customisation as files are version-controlled.

config.yaml: Controls review behaviour, severity thresholds, and ignore patterns.

```yaml
code_review:
  disable: false
  comment_severity_threshold: MEDIUM
pull_request_opened:
  summary: true
  code_review: true
ignore_patterns:
  - "*.generated.ts"
```

styleguide.md: Natural language instructions for code review areas that you should concentrate on (security checks, style rules, testing requirements).

### Code customisation (Enterprise)

Enterprise subscribers can index private repositories through the Google Cloud Console. Once configured, use `@` in chat to reference indexed repositories for suggestions based on your organisation's codebase.

### Limitations

GEMINI.md is agent-mode only. Context files do not affect standard chat or code completions.

VS Code has more features. IntelliJ lacks tool control and slash commands.

IDE settings are not shareable. Rules and custom commands are stored locally.

Agent mode is preview. Features may change.

## Security considerations

For essential security practices including what to never include in prompts and content exclusions, see the [getting started guide](getting-started.md).

This section explains advanced security topics for sensitive code.

### Security-critical code review

For authentication, database queries, or citizen data handling, add extra scrutiny:

```python
# Generated by Gemini - REVIEW CAREFULLY
# CHECK: Is password hashing correct?
# CHECK: Are session tokens secure?
# CHECK: Is rate limiting in place?
```

### Security incident response

If you discover a security issue in generated code, use the following steps.

1. Do not commit the code.
2. Report to your security team immediately.
3. Document the issue, saving the prompt and response.
4. Alert your team so they can check their code.

## Troubleshooting

| Problem | Possible causes | What to try |
|---------|-----------------|-------------|
| Suggestions not appearing | Extension disabled, authentication expired, file type excluded | Check Gemini status icon, sign out and back in, verify file type is supported |
| Low-quality suggestions | Insufficient context, vague comments, exclusions too restrictive | Add descriptive comments, include type hints, open related files |
| Agent mode not working | Task too complex, insufficient permissions, MCP misconfigured | Break into smaller requests, check file permissions, verify MCP using `/mcp` command |
| MCP server not connecting | Server not installed, authentication issues, incorrect config | Run `/mcp` to check status, verify settings.json, reinstall server |
| Slow performance | Too many extensions, large files, network latency | Disable unused extensions, close unused files, restart IDE |

For persistent issues, contact your team's champion or raise a support ticket.

## Prompt engineering tips

### Be specific and provide context

#### Less effective

> 'Create a function to process data'

#### More effective

```
Create a Python function that:

- reads CSV files from Cloud Storage
- validates UK postcodes and National Insurance numbers
- filters out records with missing required fields
- returns a list of valid records and a list of validation errors
- handles large files efficiently (streaming if possible)

Context: Python 3.11, using google-cloud-storage library
```

### Use iterative refinement

```
First: 'Create a function to validate postcodes'
Then: 'Add support for all UK postcode formats including British Forces Post Office (BFPO)'
Then: 'Add error messages that specify which format rule failed'
Then: 'Add unit tests including edge cases'
```

### High-value use cases

Based on research with developers, the greatest time savings are achieved with:

- stack trace analysis to paste error messages for diagnosis
- refactoring existing code to modernise and improve legacy code
- test case generation for comprehensive test suites quickly
- complex query writing for SQL, regex, and CLI commands
- learning new techniques to understand unfamiliar patterns
- code documentation to generate docstrings and comments

For detailed prompt engineering techniques and strategies, see the [Prompt engineering playbooks](../../playbooks/prompt-engineering/prompt-engineering-index.md).

## Further reading

### Official Google documentation

[Gemini Code Assist documentation](https://cloud.google.com/gemini/docs/codeassist)

[Getting started guide](https://cloud.google.com/gemini/docs/codeassist/getting-started)

[Agent mode documentation](https://developers.google.com/gemini-code-assist/docs/use-agentic-chat-pair-programmer)

[Model Context Protocol (MCP) configuration](https://docs.cloud.google.com/gemini/docs/codeassist/configure-mcp-servers)

[GitHub customisation](https://developers.google.com/gemini-code-assist/docs/customize-gemini-behavior-github)

[Chat and custom commands](https://developers.google.com/gemini-code-assist/docs/chat-gemini)

### Government guidance

[NCSC secure development guidance](https://www.ncsc.gov.uk/collection/developers-collection)

[Government Design System](https://design-system.service.gov.uk/)

[Service Manual: Technology](https://www.gov.uk/service-manual/technology)

### AI Engineering Lab resources

[AI SDLC playbook](../../playbooks/ai-sdlc-playbook.md)

[Getting started guide](getting-started.md)
