> ALPHA
> This is a new service. Your [feedback](https://github.com/govuk-digital-backbone/aiengineeringlab/discussions) will help us to improve it.

# Amazon Kiro manager tool guide

> Autonomous AI development environment that works alongside developers through specification-driven workflows and persistent context.
    
## Purpose
This guide provides engineering managers with practical guidance for implementing Amazon Kiro within UK government departments. It covers capabilities assessment, security considerations, phased rollout strategies, and success measurement to support informed decision-making and sustainable adoption.
This guide also explains how it differs from other AI code assistants, and how to use it effectively for complex software development tasks.

## Who this is for
This guide is for:

- software engineers working on complex, long-lived applications
- technical leads evaluating autonomous coding tools
- API developers and backend teams requiring structured development
- engineering teams needing persistent, context-aware AI assistance
    
    
## What's in this guide
    
This guide is organised into the following sections.

Understanding Amazon Kiro:

- [What Amazon Kiro does](#what-amazon-kiro-does) - core capabilities and interaction modes
- [How it compares with other AI code assistants](#how-it-compares-with-other-ai-code-assistants) - see the consolidated comparative guidance
- [Amazon Kiro models and task suitability](#amazon-kiro-models-and-task-suitability) - choosing the right model for different tasks
    
Implementation planning:

- [UK government-specific considerations](#uk-government-specific-considerations) - security classifications, data residency, and procurement
- [Getting started](#getting-started) - licensing options and installation process
- [Training requirements](#training-requirements) - engineer and manager training programmes

Managing adoption:

- [Measuring success](#measuring-success) - quality metrics  
- [Common troubleshooting scenarios](#common-troubleshooting-scenarios) - symptoms and solutions
- [Policy configuration reference](#policy-configuration-reference) - content exclusions and IDE settings
- [Integration with development workflow](#integration-with-development-workflow) - code review, Git workflow, testing, and CI and CD

    
## Before you start
You need:

- a clear understanding of your application's language and stack
- familiarity with version control and development workflows
- an AWS account and identity setup if using cloud integrations
- a development environment (IDE, CLI and VS code)
- awareness of AI limitations and cost model
- testing and validation practices in place

Note: you do not need an AWS account to use Kiro.
    
## What Amazon Kiro does
Amazon Kiro is an AI powered software development assistant that helps developers design, write, test, and maintain code. It converts natural language requirements into structured engineering outputs.
It understands software development workflows, not just code autocomplete.

Kiro's primary capabilities include:

- providing autonomous task execution 
- supporting specification-driven development 
- turning ideas into engineering specs 
- generating and modifying code 
- creating tests and documentation 
- acting as an agent that can perform tasks
- providing steering files for persistent knowledge 
- providing agent hooks for automation 
- providing multi-model intelligence

### Amazon Kiro interaction modes

Amazon Kiro supports multiple interaction modes. Each is designed for a different stage of software development.

| Mode | Description | Best suited for |
|------|-------------|-----------------|
| Chat / Conversational Mode | A natural-language interface | Asking questions or giving instructions, high-level guidance, understanding existing code, similar to ChatGPT | 
| Spec / Planning Mode (Design-Oriented) | A structured mode where Kiro helps turn requirements into engineering artifacts | Functional requirements, technical design and task breakdowns |
| Code Generation / Edit Mode | Kiro directly writes or modifies code in your repository | Creating new files, adding features, refactoring existing code, fixing bugs |
| Test Generation Mode | Focused on generating tests alongside code | Unit tests, test scaffolding, edge-case coverage |
| Documentation Mode | Generates or updates developer documentation | README sections, API documentation, Inline comments, design docs |
| Agentic and multi-step task mode | Kiro acts as an agent | Plan a task, execute multiple steps, iterate based on feedback, this is task-oriented |

When to use each mode:

- chat - ask questions
- spec - plan the work
- code - implement
- test - validate
- docs - explain
- agent - do all of it together

## How it compares with other AI code assistants

For a detailed comparison of Amazon Kiro with other AI coding assistants, see the [comparative guidance](../comparative-guidance.md).

## Amazon Kiro models and task suitability
Kiro does not use a single model. It is built on Amazon Bedrock, meaning it can use multiple large language models under the hood. The primary models currently powering Kiro are Anthropic Claude Sonnet 4.0 and Sonnet 3.7.
| Model	| Strengths	| Typical tasks |
|-------|-----------|---------------|
| Claude Sonnet 4.0	| Best balance of reasoning, code understanding, and detailed output | Complex specs to code tasks, multi step planning, design artifacts | 
| Claude Sonnet 3.7	| Fallback model, slightly lighter and faster	| Less intensive tasks, chats, simple code generation |
| Auto routing (internal routing mix) |	Dynamically selects models for efficiency |	Efficiently balances quality compared to cost on tasks |

Kiro combines these models into different interaction and task contexts that influence which model capabilities are used most effectively.

| Modes | Best used | Model suitability |
|-------|-----------|-------------------|
| Vibe Mode (Chat and conversational) | Asked about code, getting quick clarifications, debugging explanations, exploratory learning, immediate help, understanding segments of code | Uses conversational reasoning models (Claude variants) to interpret and respond to questions |
| Spec driven planning mode | High level requirement and structured output, generates structured spec artifacts | Excellent for complex planning and early stage design when deep reasoning and project context are required |
| Autopilot and task execution mode | Automatically generate or modify code, run tasks end to end autonomously |  Heavy use of comprehensive reasoning models to plan and sequence tasks, propagate context across files, and maintain coherence |
| Agent hooks mode | Automated actions triggered by events,  update tests when a file changes, trigger documentation updates | Streamlines repetitive tasks by invoking agents with relevant model contexts |
| Steering rules and external context mode | Consistent conventions across tasks | Maintain consistency, especially in large projects where repeated conventions matter |

For detailed model capabilities and limitations, see:

- [Amazon Kiro supported models](https://kiro.dev/)
- [AI model comparison](https://docs.github.com/en/copilot/reference/ai-models/model-comparison)
- [Model selection playbook](../../playbooks/model-selection.md) - choosing appropriate models for tasks

# UK government-specific considerations
Unlike the EU, the UK uses a [principle-based regulatory approach](https://commonslibrary.parliament.uk/research-briefings/cbp-10003/). This is regulated through existing legal frameworks and [sector specific guidance](https://www.lawgazette.co.uk/practice-points/ai-regulation-what-uk-businesses-need-to-know/5123086.article). There is additional guidance for public sector AI ethics and governance.

### Security classification

Regulatory context

AI must align with broad expectations that regulators will apply within existing legal regimes. Its key principles include safety, security, transparency, fairness, accountability and governance.

[AI Playbook for the UK Government](https://www.gov.uk/government/publications/ai-playbook-for-the-uk-government/artificial-intelligence-playbook-for-the-uk-government-html)

Government departments must:

- use AI lawfully, ethically and responsibly

- maintain human oversight

- understand and manage the AI lifecycle

- be open and transparent about AI use

- apply ethical considerations at each stage

Transparency and algorithmic accountability: if an AI system influences decisions in public services, departments often must register it. This is under frameworks like the Algorithmic Transparency Recording Standard (ATRS). Failing to document or disclose systems undermines public trust. It may violate transparency expectations for public authorities.

Data protection laws, such as General Data Protection Regulation (GDPR) & Data Protection Act 2018: use of AI tools must comply with UK GDPR, which governs personal data processing. You must justify why personal data is processed and justifications are necessary. Only provide minimum data needed to Kiro. Avoid feeding unnecessary personal data into language models. If AI processing is likely to pose high risk to individuals' rights and freedom, a Data Protection Impact Assessments (DPIA) is required.

Ethics and human control: critical decisions should involve meaningful human review and it should be fair use.

Security and risk management: protect infrastructure and data. Evaluate and mitigate risks early through comprehensive risk management frameworks. This ensures AI tools do not expose sensitive government data or jeopardise system integrity.

Consult your departmental security team before deployment. Reference [NCSC guidance on cloud services](https://www.ncsc.gov.uk/collection/cloud/the-cloud-security-principles) for risk assessment and [NCSC secure development and deployment guidance](https://www.ncsc.gov.uk/collection/developers-collection) for security best practices.

### Content exclusions
Amazon Kiro supports configurable file-access denial patterns. AWS documentation confirms that Kiro relies on AWS security and follows a [shared responsibility model](https://kiro.dev/docs/privacy-and-security/). Users are responsible for protecting sensitive files within their project workspace.

### Sensitive file exclusion patterns in Kiro 
```yaml
{
  "permissions": {
    "deny": [
      "Read(.env)",
      "Read(env.json)",
      "Read(.env.*)",
      "Read(**/.env)",
      "Read(**/.env.*)",
      "Read(**/secrets.*)",
      "Read(**/*.key)",
      "Read(**/*.pem)",
      "Read(**/config/production.*)",
      "Read(**/.git/config)",
      "Read(**/node_modules/**)"
    ]
  }
}
```
### Exclusion patterns for government projects
```yaml
# Credential and secret files (highly sensitive and always excluded)
**/*.pem
**/*.key
**/*.pfx
**/*.p12
**/secrets.*
**/.secrets/**
**/*.gpg
**/*.asc
**/private/**

# Environment and configuration files (contain system variables and sensitive paths)
.env
.env.*
*/config/production.*
config/*.secure.yaml
config/*.secret.json
**/application-*.yml
**/cluster-config/*

# Identity and authentication material (avoid agent access to cryptographic trust stores)
**/certs/**
**/keystore.*
**/truststore.*

# Government specific sensitive artifacts (depending on classification boundaries)
**/FOUO/**
**/CUI/**
**/ITAR/**
**/NOFORN/**
**/export-controlled/**

# Infrastructure as code privacy controls (to prevent revealing cloud architecture secrets)
**/terraform.tfstate
**/terraform.tfvars
**/*credentials*
**/aws-config/**
**/*.kube/config

# Logs, audit files, and system metadata (may leak operational details)
**/*.log
**/audit/**
**/sysinfo/**
**/.git/**

# Build artifacts and third-party code (unnecessary and may include embedded secrets)
**/node_modules/**
**/dist/**
**/build/**
```

### Amazon Kiro data residency in the UK

Amazon Kiro does not currently store data in a UK-based AWS Region. Kiro's supported data storage regions are documented under '[Supported Regions](https://kiro.dev/docs/enterprise/supported-regions/)' in the official Kiro documentation. This complies with EU and EEA data residency requirements but not strict UK-sovereign residency.

The supported regions are:
- US East (N. Virginia)
- Europe (Frankfurt)

### Intellectual property for Amazon Kiro

Amazon Kiro's IP framework is governed by AWS licensing terms. These define ownership, usage rights, and IP protections for both Amazon and the user.

According to the official Kiro license:

- Kiro IDE and Kiro CLI are owned by Amazon and are licensed as AWS content under AWS IP license
- you retain ownership of your own code, data, prompts, and project files
- you own the output generated by Kiro
- Kiro uses open-source libraries under their own licenses
- Amazon maintains a comprehensive IP protection framework that extends to AWS services

# Getting started

Amazon Kiro is not a standalone CLI or package you install like Terraform or Docker. It is an AI-powered development environment and IDE experience. It integrates with AWS services and is accessed through supported IDEs and AWS authentication. So the installation is environment setup, access enablement and IDE configuration.

Below is the complete, step-by-step Amazon Kiro installation guide. For a faster 10-minute introduction, the [Kiro quick start guide](https://kiro.directory/quickstart/) covers the core workflow.

Step 1: system requirements
- supported OS: Windows 10 or 11 (64 bit), macOS (Intel and Apple Silicon), Linux (Ubuntu 18.04 or later, Fedora 32 or later, or similar)
- memory: minimum 4GB RAM (8GB or more recommended)
- storage: approximately 500MB free space
- internet: required for AI features (Bedrock inference, updates)
- some advanced workflows require Node.js 20 or later (optional but recommended for dev tasks)

Step 2: AWS account
- you need an active AWS account
- permissions to use Amazon Bedrock, create IAM roles or policies and access developer tools

Note: in enterprises or government, this usually means going through your cloud or platform team.

Step 3: Amazon Kiro
- download the installer for: Windows, macOS (Intel or ARM), Linux (Deb or Ubuntu or universal)

Step 4: supported operating system
- macOS
- linux
- windows

Step 5: supported IDE, Kiro is designed to work inside modern IDE workflows
- VS Code (primary)
- jetBrains IDEs (depending on rollout)

Step 6: Kiro runs on Amazon Bedrock, this is mandatory
- enable Bedrock for your account (first-time only)
- request access to required models, Anthropic Claude Sonnet family
- without Bedrock enabled, Kiro will not function
- create or use an IAM role or user with least privilege
- read or write access to code repositories (locally)

Step 7: configure AWS credentials locally
- aws configure
- or use AWS SSO, environment variables, credential profiles and verify: aws sts get caller identity

Step 8: install the Amazon Kiro IDE extension
- in VS Code, search for Amazon Kiro and install the extension
- restart VS Code and Kiro panel or sidebar appears
- open a project repository and verify

Step 9: common installation issues (and fixes)
- 'Model access denied': Bedrock not enabled or model access not approved
- 'AWS credentials not found': fix aws configure or SSO login
- 'Kiro cannot see my files': open the project folder correctly in VS Code

# Training requirements
These are mandatory foundational requirements before a user can begin using Kiro effectively.

Module 1 - environment preparation training (60 minutes):

- AWS account and access setup
- Kiro IDE or Kiro CLI installation
- optional DevOps and advanced setup

Module 2 - core skills training (90 minutes):

- understanding Kiro's core workflow which includes specs, hooks, steering
- hands-on first project

Module 3 - feature-focused learning tracks (120 minutes, flexible):

- beginner track which covers foundations
- intermediate track which covers specs, hooks, context
- advanced track which covers production workflows

### Total training time estimate and access setup
- Kiro IDE or Kiro CLI installation
- optional DevOps or advanced setup

Module 2: core skills training (90 minutes)
- understanding Kiro's core workflow which includes specs, hooks, steering
- hands-on first project

Module 3: feature-focused learning tracks (120 minutes, flexible)
- beginner track which covers foundations
- intermediate track – specs, hooks, context
- advanced track – production workflows

### Total training time estimate
| Level | Time required | Who needs it |
|-------|---------------|--------------|
| Basic or Getting Started | 1 to 2 hours | Individual developers |
| Core Kiro Workflow | 1.5 to 3 hours | All users | 
| Intermediate Features | 1.5 to 2 hours | Regular users | 
| Advanced (Production) | 1.5 to 2 hours | Senior devs, DevOps |
| Enterprise Admin | 1 to 1.5 hours | Team leads, cloud admins |

# Measuring success
Measuring success in Kiro is based on three primary dimensions:
- usage and activity metrics (quantitative tracking)
- developer productivity and workflow outcomes
- quality, automation, and DevOps improvements

### Using Kiro's built-in user activity metrics
- daily user activity, per individual
- detailed usage metrics for each developer
- frequency of Kiro interactions
- metrics generated automatically every day at 00:00 UTC
- Kiro outputs daily CSV analytics to an S3 bucket (s3://bucketName/prefix/AWSLogs/accountId/KiroLogs/)
- this helps measure success by measuring adoption rate, feature usage distribution, user productivity patterns over time and team level gaps

### Productivity and delivery metrics
| Metric | What to measure |
|--------|-----------------|
| Lead time for changes | Time from code start to production |
| Cycle time | Time per feature or story |
| PR turnaround time | Time to review and merge |
| Deployment frequency | How often code ships |

### Code quality and maintainability
| Metric | Why it matters |
|--------|----------------|
| Unit test coverage | Kiro often generates tests |
| Test failure rate	| Quality of generated code |
| Lint or static analysis issues	| Consistency |
| Defect rate post-release | Real quality signal |

### Security and compliance metrics
| Metric | Measurement |
|--------|-------------|
| Security findings per PR | Static and IaC scans |
| Secrets leaked | Must be zero |
| Policy violations | Coding or infra standards |
| DPIA and audit findings	| Governance health |

### Documentation and knowledge quality metrics
| Metric | Indicator |
|--------|-----------|
| README completeness | Up to date docs |
| API documentation coverage | Accuracy |
| Onboarding time | New dev ramp up |
| Tribal knowledge reduction | Fewer ad hoc explanations |

Success with Amazon Kiro is measured across productivity, code quality, security, governance, and developer experience. Key indicators include reduced delivery time, improved test coverage and documentation, and stable or improved security outcomes. They also include effective human oversight and positive developer feedback, not just faster code generation.

# Common troubleshooting scenarios
- #### Authentication or access issues
    Symptoms: 
    - cannot sign in, not authorized, feature disabled

    Solutions:
    - check correct AWS account and region
    - IAM role has required permissions
    - session has not expired (SSO timeouts are common)

- #### Tool not responding or timing out
    Symptoms: 
    - Prompts hang, no output, slow responses
    
    Solutions:
    - network/proxy/firewall blocking outbound calls
    - corporate VPN interfering
    - retry in a different region or workspace

- #### Code generation errors
    Symptoms: 
    - incomplete code, hallucinated APIs, wrong language
    
    Solutions:
    - prompt too vague or missing constraints
    - project context not loaded or indexed
    - unsupported framework or SDK version

- #### IDE integration problems
    Symptoms: 
    - plugin not loading, commands missing
    
    Solutions:
    - plugin version matches IDE version
    - restart IDE after install or update
    - clear local cache or reinstall extension

- #### Permissions to modify repositories
    Symptoms: 
    - read-only behavior, failed commits
    
    Solutions:
    - repo access (GitHub, CodeCommit or Bitbucket)
    - local Git credentials and AWS credentials mismatch

- #### SSL Error: unable to get local issuer certificate
    Symptoms:
    - missing or broken OS trust certificates
    
    Solutions:
    - run: curl https://baidu.com

- #### Session timeouts (enterprise users): forced logout after approximately 8 hours
    Symptoms: 
    - identity center default timeout

    Solutions:
    - admin can increase session duration in IAM identity center settings

- #### MCP or CLI integration issues
    Symptoms: 
    - MCP server not connecting

    Solutions:
    - install missing dependencies
    - re-run Kiro CLI setup

# Policy configuration reference

- identity based policies for Amazon Kiro (IAM policies): AWS Kiro relies heavily on IAM for authorization and requires explicit IAM permissions in managing Kiro subscriptions, accessing console, managing KMS keys and controlling user or agent permissions.
- service linked roles for Kiro: key properties
    - are created automatically when you subscribe to Kiro
    - are predefined trust and permission policies
    - only Kiro can assume these roles
    - cannot be manually attached or modified
    - must be deleted only after deleting related Kiro resources

- Kiro project-level configuration policies (.kiro/directory): stored inside the project, runtime policies
    - steering policies (.kiro/steering/*.md)
    - permissions and execution policies (.kiro/permissions.json)
    - MCP policies (.kiro/settings/mcp.json): essential for compliance‑sensitive or restricted environments.
      
      MCP (Model Context Protocol) defines tool execution permissions.
      
      A typical MCP configuration looks like:
      ```yaml
      {
      "mcpServers": {
        "server-name": {
          "command": "uvx",
          "args": ["package@latest"],
          "env": { "ENV_VAR": "value" },
          "disabled": false,
          "autoApprove": ["tool1", "tool2"], 
          "timeout": 60000
         }
       }
      }
- automation and execution control policies (operational policy configuration):
    - autopilot mode means Kiro executes multi-step actions automatically, creates, modifies, deletes files and runs shell commands without asking.
    - supervised mode means requires user approval for each action and prevents unauthorized changes.

- data protection and security policies
    - shared responsibility model
    - URL fetching security policy
    - enterprise data residency and IAM identity center

- real-time security validation policies (using MCP servers) which run automatically while coding using MCP:
    - checkov (IaC scanning)
    - semgrep (application code scanning)
    - bandit (Python security scanning)

### Kiro policy types
| Policy type | Location | Purpose | Source |
| ------------| ---------| -------| -------|
| IAM identity-based |IAM console | Admin and user permissions for Kiro console and subscription management | [kiro.dev] |
| Service-linked roles | IAM | Allows Kiro backend to call AWS services securely | [kiro.dev] | 
| Steering policies | .kiro/steering/ | Coding standards, rules, conventions | [kiro.directory] |
| MCP policies | .kiro/settings/mcp.json | Tool permissions, auto-approvals, server connections | [github.com] |
| Runtime modes | User settings | Execution safety (autopilot compared to supervised) | [kiro.dev] |
| Data protection policies | AWS account and Kiro console | Data location, URL ingestion, compliance alignment | [kiro.dev] | 
| Security validation policies | MCP server configs | Static analysis, IaC scanning, vulnerability checking |  [docs.aws.amazon.com] | 

# Integration with development workflow

The [AI SDLC playbook](../../playbooks/ai-sdlc-playbook.md) covers integrating AI coding assistants across the full software development lifecycle.

- Kiro as an agentic IDE integrated into the dev workflow

Specs integrate into the workflow from planning through to execution and review.

1. Developer prompt.
2. Spec generation.
3. Task list.
4. Code generation.
5. Tests.
6. Documentation.

Agent hooks provide event-driven workflow automation through the following stages.

1. Steering files.
2. AI behavior.
3. Code consistency across the project.

MCP servers connect Kiro to external tools in the following sequence.

1. Kiro.
2. MCP.
3. External tool.
4. Result returned into IDE.

The CLI automates DevOps and deployment workflows in the following order.

1. CI/CD.
2. Kiro CLI.
3. Generate IaC.
4. Validate.
5. Deploy.
### Kiro integrates into dev workflows
| Workflow area | How Kiro integrates | Sources | 
| --------------| --------------------| --------|
| Planning | Specs (requirements to tasks) | [github.com] | 
| Active development | Agent chat and code generation|  [geeky-gadgets.com] |
| Automation | Agent hooks triggered by dev events | [kiro.dev] |
| Project rules | Steering controlling AI behavior | [github.com] | 
| Tooling | MCP servers (GitHub, AWS, Docker, security) | [kiro.dev], [d1.awsstatic.com] |
| DevOps | CLI automates deployments and IaC | [aws.amazon.com] |

## Contributing

We encourage contributions from across government to keep this repository current and comprehensive. Share your team's experience, lessons learned, and effective practices to help other government departments.

See the [contribution guidelines](../../CONTRIBUTING.md) before submitting changes.
