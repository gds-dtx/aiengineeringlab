> ALPHA
> This is a new service. Your [feedback](https://github.com/govuk-digital-backbone/aiengineeringlab/discussions) will help us to improve it.

# Amazon Q manager tool guide

> Central home for Amazon Q best practices content across government departments.

## Audience

This guide is for:

- engineering managers responsible for AI Engineering Lab adoption in their teams
- technical leads overseeing tool implementation and developer workflows
- delivery managers coordinating rollout and measuring adoption success

## Purpose

This guide provides engineering managers with practical guidance for implementing Amazon Q within UK government departments. It covers capabilities assessment, security considerations, phased rollout strategies, and success measurement to support informed decision-making and sustainable adoption.

## What's in this guide

This guide is organised into the following sections.

1. Overview
- [summary](#summary) - key considerations and capabilities at a glance
- [what Amazon Q does](#what-amazon-q-does) - core capabilities and interaction modes
- [how it compares with other AI Engineering Lab tools](#how-it-compares-with-other-ai-engineering-lab-tools) - see the consolidated comparative guidance
- [Q models and task suitability](#q-models-and-task-suitability) - choosing the right model for different tasks

2. Implementation planning
- [government-specific considerations](#government-specific-considerations) - security classifications, data residency, and procurement
- [getting started](#getting-started) - licensing options and installation process
- [phased rollout approach](#phased-rollout-approach) - pilot through to full team adoption
- [training requirements](#training-requirements) - engineer and manager training programmes

3. Managing adoption
- [measuring success](#measuring-success) - metrics and feedback collection
- [common implementation challenges](#common-implementation-challenges) - addressing resistance and technical issues
- [integration with development workflow](#integration-with-development-workflow) - code review, Git workflow, testing, and CI/CD

4. Additional resources
- [contributing](#contributing) - how to improve this guide

## Before you start

Before reading this guide, you should understand:

- your team's current development workflow and tooling
- basic software development lifecycle concepts
- your department's security classification requirements
- the AI Engineering Lab maturity assessment framework (see [maturity assessment framework](../../assessment/maturity-assessment-framework.md) and [team classification guide](../../assessment/team-classification-guide.md))

## Summary

[Amazon Q Engineer](https://docs.aws.amazon.com/amazonq/latest/qdeveloper-ug/) is AWS's AI-powered code assistant, offering deep integration with AWS services and built-in security scanning. It is well-suited for government teams working primarily with AWS infrastructure.

### Key considerations

| Factor | Assessment |
|--------|------------|
| Recommended tier | Amazon Q Engineer Pro |
| Security classification | OFFICIAL with content exclusions; OFFICIAL-SENSITIVE requires risk assessment |
| IP indemnity | Yes (Pro tier only) |
| Procurement route | G-Cloud 14, AWS Enterprise Agreement, or AWS Marketplace |
| Pilot duration | 4 weeks recommended |
| Training time | 60 minutes for engineers, 30 minutes for managers |

### Capabilities at a glance

| Capability | Availability |
|------------|--------------|
| Inline code completion | All tiers |
| Chat assistance | All tiers |
| Agent mode (autonomous tasks) | Pro only |
| Security scanning | Pro only |
| Code transformation (Java upgrades) | Pro only |
| AWS service integration | Native |

### When to choose Amazon Q

Choose Amazon Q when your team:
- works extensively with AWS services
- needs integrated security scanning
- has Java modernisation initiatives
- requires AWS infrastructure as code assistance

Consider alternatives when:
- you need faster inline completions ([GitHub Copilot](../github-copilot/))
- you need complex reasoning capabilities (Claude Code)
- you work primarily with non-AWS cloud providers

## What Amazon Q does

Amazon Q Engineer provides AI-powered code assistance integrated with AWS services and development workflows. It generates code suggestions, explains existing code, and helps with AWS-specific tasks directly in your IDE and command line.

Its primary capabilities include:

- autocompleting code as engineers type
- generating implementations from comments or function signatures
- creating and updating unit tests
- explaining code and answering technical questions
- assisting with AWS service integration and infrastructure code
- performing security scans and code reviews
- supporting application modernisation and transformation

Amazon Q interaction modes:

Amazon Q offers several ways to interact with AI assistance, each suited for different tasks.

| Mode | Description | Best for | Available in |
|------|-------------|----------|--------------|
| Inline suggestions | Real-time completions as you type | Quick code completion, boilerplate | All tiers |
| Q Chat | Conversational interface in IDE | Explanations, debugging, AWS questions | All tiers |
| Agent mode | Autonomous multi-step task execution | Feature implementation, refactoring, testing | Engineer Pro |
| Command line | Terminal-based AI assistance | CLI workflows, script generation | All tiers |
| Code reviews | Automated security and quality scanning | PR reviews, security analysis | Engineer Pro |
| Code transformation | Large-scale code upgrades | Java version upgrades, framework migrations | Engineer Pro |

Each mode is suited to specific tasks, including:

- inline suggestions for daily coding, implementing patterns, and writing boilerplate
- chat feature for understanding AWS services, debugging, and architecture questions
- agent mode for implementing features from requirements and comprehensive refactoring
- command line for DevOps tasks, AWS CLI operations, and script generation
- code reviews for security scanning and best practice validation
- code transformation for upgrading Java versions and modernising legacy applications

Amazon Q is best suited for:

- teams working extensively with AWS services
- projects requiring AWS infrastructure as code
- Java application modernisation initiatives
- security-conscious development workflows
- teams needing integrated code scanning

Amazon Q is not designed for:

- non-AWS cloud provider specific tasks
- complex architectural decisions without human oversight
- replacing comprehensive security audits
- fully autonomous production deployments

## How it compares with other AI Engineering Lab tools

For a detailed comparison of Amazon Q Developer with other AI coding assistants, see the [comparative guidance](../comparative-guidance.md).

### AWS MCP server for enhanced workflows

The AWS MCP (Model Context Protocol) server enables AI assistants like Claude to interact with AWS resources, providing complementary capabilities to Amazon Q's native AWS integration.

AWS MCP server capabilities include:

- resource management for querying and managing AWS resources across services
- cost analysis for reviewing AWS spending and optimisation opportunities
- security posture analysis for IAM policies and security configurations
- infrastructure review for examining CloudFormation and Terraform configurations
- service recommendations for guidance on AWS service selection

#### Example workflow combining Amazon Q and AWS MCP

1. Engineer uses Amazon Q inline suggestions for AWS SDK code.
2. Engineer uses Q Chat for CloudFormation template generation.
3. Engineering manager uses Claude with AWS MCP server to review infrastructure security.
4. Claude analyses IAM policies and suggests least-privilege improvements.
5. Manager reviews AI analysis and implements approved changes.

#### Setting up AWS MCP server

The AWS MCP server is available for use with Claude and other MCP-compatible AI assistants. For configuration details, see [AWS MCP server documentation](https://github.com/modelcontextprotocol/servers/tree/main/src/aws).

#### Government considerations

The AWS MCP server requires IAM credentials with appropriate permissions. You should:
- use IAM roles with least-privilege access
- configure resource-level permissions to limit scope
- review data handling policies with your security team
- ensure compliance with your department's AWS usage policies
- consider using read-only permissions for analysis tasks

## Q models and task suitability

Amazon Q Engineer uses different models optimised for various development tasks. Understanding model capabilities helps set appropriate expectations and choose the right approach. The [model selection playbook](../../playbooks/model-selection.md) provides broader guidance on choosing the right AI tool for different tasks.

### Model comparison

| Model | Best for | Response time | Context window | Cost tier |
|---|---|---|---|---|
| Amazon Q Engineer | Code generation, AWS integration, general development | Fast (1 to 2 seconds) | Large (100,000 or more tokens) | Standard |
| Amazon Q Engineer Pro | Advanced features, security scanning, transformations | Fast (1 to 2 seconds) | Large (100,000 or more tokens) | Premium |

Amazon Q uses AWS's proprietary models optimised for code generation and AWS service integration. Unlike some competitors, Q does not expose multiple model options to users - the appropriate model is selected automatically based on the task.

### Recommended features by task

| Task | Recommended approach | Why |
|---|---|---|
| Autocomplete as you type | Inline suggestions | Optimised for fast, context-aware completions |
| Generate unit tests | Agent mode (Pro) | Can create comprehensive test suites |
| Debug AWS integration issues | Q Chat | Direct access to AWS documentation and patterns |
| Write CloudFormation templates | Q Chat | Trained on AWS infrastructure patterns |
| Refactor legacy code | Agent mode (Pro) | Multi-file understanding and modification |
| Security code review | Code review feature (Pro) | Built-in security scanning |
| Upgrade Java applications | Code transformation (Pro) | Specialised for Java version migrations |
| Generate documentation | Q Chat | Good natural language generation |
| Implement AWS SDK calls | Inline suggestions | Trained on AWS SDK patterns |
| Optimise AWS costs | Q Chat | Can suggest cost-effective alternatives |

### Controlling feature usage

In Amazon Q, you interact with different capabilities through IDE commands and chat commands.

IDE commands include:
- `/dev` - agent mode for feature implementation
- `/test` - generate unit tests
- `/doc` - generate documentation
- `/review` - security and code quality review
- `/transform` - code transformation (Java upgrades)

You can ask questions directly in Q chat. You can also:
- reference workspace with `@workspace`
- get AWS-specific help with service names

## Government-specific considerations

For detailed guidance on security, privacy, and compliance requirements for AI Engineering Lab tools, see the [Security, privacy and compliance guide](../../governance/README.md).

This section covers Amazon Q-specific considerations.

### Security classification

Amazon Q Engineer processes code snippets through AWS services. This means it is generally acceptable for OFFICIAL classification with appropriate content exclusions configured. OFFICIAL-SENSITIVE requires risk assessment and strict content exclusions. SECRET and above classifications are not appropriate for this tool.

Consult your departmental security team before deployment. Reference [NCSC guidance on cloud services](https://www.ncsc.gov.uk/collection/cloud/the-cloud-security-principles) for risk assessment and [NCSC secure development and deployment guidance](https://www.ncsc.gov.uk/collection/developers-collection) for security best practices. The [Amazon Q security documentation](https://docs.aws.amazon.com/amazonq/latest/qdeveloper-ug/security.html) covers Amazon Q-specific security features and configurations.

### Content exclusions

You must [configure Amazon Q to exclude sensitive files and patterns](https://docs.aws.amazon.com/amazonq/latest/qdeveloper-ug/security-data-protection.html). Recommended exclusions for government projects:

```yaml
# Environment and configuration files
/.env
/.env.*
/secrets/
/config/production.yml
/config/production/

# AWS credentials and configuration
/credentials
/.aws/credentials
/.aws/config
/aws-exports.js

# API keys and tokens
/api-keys/
/*-key.json
/*-credentials.json

# Department-specific patterns
/citizen-data/
/personal-identifiable-information/
/security-configurations/
/terraform/production/
```

### Data residency

Amazon Q Engineer processes requests through AWS services in AWS regions. As of January 2025, code suggestions are processed in AWS US regions. No customer code is stored or used for model training. Telemetry data follows AWS data residency policies.

Check your department's data residency requirements before deployment. For UK government, verify compliance with data sovereignty requirements. [AWS Artifact](https://aws.amazon.com/artifact/) provides compliance reports and certifications to support this assessment.

### Intellectual property

Amazon Q Engineer Pro includes IP indemnity, meaning AWS provides legal protection if generated code infringes copyright. Free tier does not include this protection.

For government projects, use Amazon Q Engineer Pro only.

### Risk management

When implementing Amazon Q, follow your department's risk management processes. For guidance on handling AI-related incidents, see the [Incident response playbook](../../governance/incident-response-playbook.md).

## Getting started

### Licensing options

Amazon Q Engineer (free) is:
- free for individual engineers
- not recommended for government projects
- missing enterprise controls and has no IP indemnity
- limited in its features (no agent mode, transformations, or security scans)

Amazon Q Engineer Pro ($19 per month per user):
- is recommended for government teams
- includes IP indemnity
- includes agent mode with full feature access
- includes security scanning and code reviews
- has code transformation capabilities
- has administrative controls via IAM Identity Center
- includes usage analytics and reporting
- doesn't require training on your code

Current pricing is available on the [Amazon Q Engineer pricing page](https://aws.amazon.com/q/developer/pricing/).

### Procurement routes

Amazon Q Engineer is available through [Crown Commercial Service G-Cloud 14](https://www.crowncommercial.gov.uk/agreements/RM1557.14) ([search on the Digital Marketplace](https://www.digitalmarketplace.service.gov.uk/)), AWS Enterprise Agreement (for departments with existing AWS Enterprise Support), AWS Marketplace (direct subscription with consolidated billing), and [TechUK Framework](https://www.techuk.org/) (through authorised AWS resellers).

Consult the procurement guidance documentation for detailed pathways.

### Installation process

The [Amazon Q getting started guide](https://aws.amazon.com/q/developer/getting-started/) on the AWS website provides additional installation options. The installation process consists of 4 steps.

1. Set up IAM Identity Center (if not already configured).
2. Create user groups for Amazon Q access.
3. Assign Amazon Q Engineer Pro licenses.
4. Configure content exclusion policies (via AWS console).

Engineers then need to install the appropriate IDE extension.

For VS Code:
```bash
# Install AWS Toolkit extension (includes Amazon Q)
code --install-extension amazonwebservices.aws-toolkit-vscode
```

For JetBrains IDEs:
- Settings then Plugins then Search "AWS Toolkit" then Install

For Visual Studio:
- Extensions then Manage Extensions then Search "AWS Toolkit" then Install

Engineers authenticate using IAM Identity Center.

1. Open AWS Toolkit in IDE.
2. Click "Connect to AWS".
3. Select "Use IAM Identity Center".
4. Enter your organisation's start URL.
5. Complete browser-based authentication.
6. Select AWS Builder ID or IAM Identity Center profile.

Test installation by checking these indicators.

1. Open a code file (Python, Java, JavaScript, and similar).
2. Start typing - inline suggestions should appear.
3. Open Q Chat panel and ask a question.
4. Verify authentication status shows "Connected".

## Phased rollout approach

### Phase 1: pilot (weeks 1 to 4)

Objective: the objective of this phase is to validate effectiveness and identify issues.

#### Activities

1. Select 5 to 10 engineers across different experience levels.
2. Focus on AWS-related projects or infrastructure work.
3. Schedule weekly feedback sessions.
4. Document effective usage patterns, especially for AWS tasks.
5. Test security scanning features on real code.

#### Success criteria
1. 70% or more of pilot users actively using Amazon Q.
2. No security incidents.
3. Documented productivity benefits for AWS tasks.
4. Clear implementation guidance for wider rollout.
5. Positive feedback on security scanning features.

### Phase 2: team expansion (weeks 5 to 12)

Objective: the objective of this phase is to scale to the full engineering team.

#### Activities

1. Roll out to entire team in groups of 10 to 15.
2. Deliver 45 minute training sessions per group.
3. Share pilot user success stories, especially AWS use cases.
4. Establish support channels (Slack, Teams, or email).
5. Create internal knowledge base of effective prompts.

#### Success criteria
1. 80% or more license activation rate.
2. Acceptance rate above 20%.
3. Engineers report time savings on AWS tasks.
4. No increase in security vulnerabilities.
5. Active use of security scanning features.

### Phase 3: optimisation (ongoing)

Objective: the objective of this phase is to maximise value and address friction.

#### Activities

1. Review monthly usage analytics via AWS console.
2. Refine content exclusion policies based on incidents.
3. Update training materials based on common questions.
4. Share wins across department.
5. Explore advanced features (agent mode, transformations).

#### Success criteria
1. Consistent month-on-month usage.
2. Declining support tickets.
3. Measurable productivity improvements.
4. Positive engineer satisfaction scores.
5. Successful use of advanced features.

## Training requirements

### Engineer training (60 minutes)

Module 1: basic usage (20 minutes)

This module covers:

- accepting and rejecting inline suggestions
- using Q Chat for questions and explanations
- keyboard shortcuts and IDE integration
- when to use Q versus manual coding
- understanding suggestion confidence levels

Module 2: AWS-specific features (20 minutes)

This module covers:

- getting help with AWS services
- generating CloudFormation and CDK code
- using Q for AWS CLI commands
- troubleshooting AWS SDK integration
- best practices for infrastructure as code

Module 3: advanced features and security (20 minutes)

This module covers:

- using agent mode for feature implementation (`/dev`)
- running security scans (`/review`)
- generating comprehensive tests (`/test`)
- reviewing generated code critically
- content exclusions and when they apply
- integration with code review process

Format: this training should be delivered as a live demonstration with hands-on practice using real AWS projects.

### Manager briefing (30 minutes)

This briefing covers:

- capability overview and realistic expectations
- AWS-specific advantages and use cases
- usage metrics and how to interpret them (via AWS console)
- policy configuration and content exclusions
- addressing team concerns about AI tools
- security scanning and compliance features

Format: this briefing should be delivered as a presentation with a Q and A session.

## Measuring success

### Quantitative metrics

Measure adoption metrics such as:
- license activation rate (target: 90% or more)
- daily active users (target: 80% or more of activated licenses)
- suggestion acceptance rate (target: 20% to 30%)
- security scan usage (target: weekly per engineer)

Measure productivity metrics such as:
- lines of code accepted per engineer per day
- time spent on AWS integration tasks (via engineer survey)
- CloudFormation and CDK template generation time
- pull request cycle time
- test coverage increase rate

Measure quality metrics such as:
- security vulnerabilities detected by Q reviews
- code review comments per PR (should remain stable)
- bug escape rate (should not increase)
- AWS best practice compliance

### Qualitative feedback

You should conduct monthly engineer surveys.

1. How often do you use Amazon Q? (Daily, Weekly, Rarely, Never)
2. For which tasks is Amazon Q most helpful?
3. How helpful are the AWS-specific features?
4. Has Amazon Q affected your productivity? (Much faster, Somewhat faster, No change, Slower)
5. Do you feel confident reviewing Q-generated code?
6. How useful is the security scanning feature?

## Common implementation challenges

### Challenge: engineers not using the tool

Symptoms include:
- low activation rates after 2 weeks
- acceptance rates below 15%
- feedback indicates suggestions are "not helpful"

Interventions.

1. Check content exclusions are not too restrictive.
2. Verify engineers understand keyboard shortcuts.
3. Provide pairing sessions with effective users.
4. Share specific AWS use case examples.
5. Demonstrate agent mode for complex tasks.
6. Show security scanning benefits.

### Challenge: security concerns from team

Symptoms include:
- engineers questioning code suggestions
- reluctance to accept any generated code
- requests to disable tool

Interventions.

1. Clarify that code review process remains unchanged.
2. Demonstrate content exclusion configuration.
3. Show built-in security scanning features.
4. Reference IP indemnity coverage.
5. Share NCSC guidance compliance.
6. Demonstrate that Q helps identify security issues.

### Challenge: over-reliance on suggestions

Symptoms include:
- decreased code review thoroughness
- accepting suggestions without understanding them
- reduced manual problem-solving attempts

Interventions.

1. Reinforce code review standards.
2. Include "understanding of implementation" in review checklist.
3. Encourage treating suggestions as first drafts.
4. Pair junior engineers with seniors during adoption.
5. Emphasise security scanning as complement, not replacement.

### Challenge: AWS-specific confusion

Symptoms include:
- suggestions do not match team's AWS patterns
- generated CloudFormation templates need significant modification
- confusion about AWS service recommendations

Interventions.

1. Provide AWS-specific training on Q usage.
2. Create internal library of effective AWS prompts.
3. Document team's AWS architecture patterns.
4. Use Q Chat to ask clarifying questions about AWS services.
5. Use agent mode for complex AWS integrations.

### Challenge: variable suggestion quality

Symptoms include:
- inconsistent helpfulness across different codebases
- better suggestions in some languages than others
- suggestions do not match project patterns

Interventions.

1. Improve context through better comments and function signatures.
2. Ensure relevant code is visible in workspace.
3. Use Q Chat for complex scenarios instead of inline.
4. Check if content exclusions are blocking helpful context.
5. Use agent mode for multi-file context understanding.

## Integration with development workflow

The [AI SDLC playbook](../../playbooks/ai-sdlc-playbook.md) covers integrating AI coding assistants across the full software development lifecycle.

### Code review process

Amazon Q-generated code should pass through the same review process as human-written code. You should check the following things.

1. Logic correctness and edge case handling.
2. No hardcoded secrets or sensitive data.
3. Compliance with team coding standards.
4. Appropriate error handling.
5. Security implications considered (use `/review` command).
6. AWS best practices followed.
7. Test coverage adequate.
8. Performance and cost characteristics acceptable.
9. IAM permissions follow least-privilege principle.

Using Q's built-in code review:

Before submitting PRs, engineers should run:
```
/review
```

This triggers Amazon Q's security and code quality scan, which checks for security vulnerabilities, code quality issues, AWS best practice violations, and potential bugs.

Responsible use guidance involves:

- reviewing all AI-generated code with the same rigour as human-written code
- understanding the code before accepting it into your codebase
- testing thoroughly, especially AWS integrations and error conditions
- being aware of potential security vulnerabilities in suggestions
- maintaining accountability, such as the engineer approving the code is responsible for it
- using `/review` command but do not rely on it exclusively

### Git workflow

No changes needed to your existing Git workflow. Amazon Q operates at the IDE level and does not affect commits, branches, or merges.

Some teams choose to document AI usage in commit messages:

```
feat: Add S3 bucket lifecycle policy

Implemented lifecycle rules using Amazon Q assistance for
AWS SDK integration. Security scan passed. IAM permissions reviewed.
```

This is optional and should align with your team's commit message conventions.

### Testing strategy

Treat Amazon Q-generated code as untested until proven otherwise.

1. Unit tests: use `/test` command to generate test scaffolding, then review and enhance.
2. Integration tests: manually verify AWS service interactions.
3. Security tests: run `/review` and SAST tools on all code.
4. AWS-specific tests: test IAM permissions, resource limits, error handling.
5. Manual review: code review remains mandatory.

### CI/CD pipeline

Amazon Q does not require changes to your pipeline. Ensure existing quality gates remain in place by including:

- linting and formatting checks
- unit test execution and coverage thresholds
- static analysis and security scanning
- integration and end-to-end test suites
- AWS resource validation (CloudFormation linting, and similar)

Generated code must pass all gates before merging.

Optional enhancement: consider integrating Amazon Q security scanning into CI/CD for automated security checks.

## Policy configuration reference

### Recommended content exclusions

Configure in AWS console under Amazon Q Engineer settings:

```yaml
# Secrets and credentials
/.env
/.env.*
/secrets/
/*.key
/*.pem
/credentials
/.aws/

# AWS-specific sensitive files
/aws-exports.js
/amplify-config.json
/terraform.tfstate
/terraform.tfstate.backup

# Configuration files
/config/production.yml
/config/production/
/terraform/production/
/cloudformation/production/

# Citizen data
/citizen-data/
/personal-identifiable-information/
/user-data/

# Security configurations
/security-configurations/
/iam-policies/production/
/security-groups/production/
```

### IDE-level settings

Example VS Code configuration:

```json
{
  "aws.codeWhisperer.includeSuggestionsWithCodeReferences": false,
  "aws.codeWhisperer.shareCodeWhispererContentWithAWS": false,
  "aws.suppressPrompts": {
    "codeWhispererNewWelcomeMessage": true
  },
  "editor.inlineSuggest.enabled": true
}
```

Disable Amazon Q for specific file types where suggestions are not helpful:

```json
{
  "aws.codeWhisperer.enabledLanguages": {
    "python": true,
    "javascript": true,
    "typescript": true,
    "java": true,
    "yaml": false,
    "plaintext": false
  }
}
```

### Organisation-level settings

The [Managing Amazon Q in your organisation guide](https://docs.aws.amazon.com/amazonq/latest/qdeveloper-ug/security-iam.html) covers IAM and access control configuration in detail. Configure in AWS console.

1. Navigate to IAM Identity Center then Applications then Amazon Q Engineer.
2. Assign users and groups.
3. Configure content exclusions (Settings then Content Exclusions).
4. Set up usage analytics (CloudWatch integration).
5. Configure sharing preferences (opt-out of telemetry if required).

IAM policy example for Amazon Q access:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "codewhisperer:GenerateRecommendations",
        "codewhisperer:GetCodeAnalysis"
      ],
      "Resource": "*"
    }
  ]
}
```

## Next steps

1. Assess readiness: complete the maturity assessment (see [maturity assessment framework](../../assessment/maturity-assessment-framework.md) and [team classification guide](../../assessment/team-classification-guide.md)) to determine if your team is ready for Amazon Q.
2. Review security: consult your security team about content exclusions for your specific projects.
3. Verify AWS access: ensure IAM Identity Center is configured and users can be assigned.
4. Start procurement: acquire licenses through appropriate procurement routes (see [Getting started](#getting-started) section).
5. Plan pilot: identify 5 to 10 pilot users, prioritising those working with AWS.
6. Measure impact: set baseline metrics before deployment.

## Further reading

The [Amazon Q Engineer features page](https://aws.amazon.com/q/developer/) provides an overview of capabilities and what is included in each tier. The NCSC [vulnerability disclosure toolkit](https://www.ncsc.gov.uk/information/vulnerability-disclosure-toolkit) covers how to handle security issues identified in your tools or projects.

## Contributing

We encourage contributions from across government to keep this repository current and comprehensive. Share your team's experience, lessons learned, and effective practices to help other government departments.

See the [contribution guidelines](../../CONTRIBUTING.md) before submitting changes.