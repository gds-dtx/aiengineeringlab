> ALPHA
> This is a new service. Your [feedback](https://github.com/govuk-digital-backbone/aiengineeringlab/discussions) will help us to improve it.

# AI Engineering Lab repository

This repository is the central home for all AI Engineering Lab content across government departments.

## Contents

[Overview](#overview)

[Repository structure](#repository-structure)

## Overview

This repository follows a structured approach designed to maintain clarity and scalability as the project grows.

## Repository structure

```
├── README.md                    # Repository overview
├── CODE_OF_CONDUCT.md           # Contributor covenant code of conduct
├── CONTRIBUTING.md              # How to contribute to this repository
├── REPOSITORY-STRUCTURE.md      # Repository structure
│
├── assessment/                  # Readiness and maturity evaluation
│   ├── README.md
│   ├── maturity-assessment-framework.md
│   ├── team-classification-guide.md
│   └── assessment-questionnaires/
│       ├── README.md
│       ├── delivery-manager-assessment.md
│       ├── individual-engineer-assessment.md
│       └── technical-lead-assessment.md
│
├── governance/                  # Policy and guardrails
│   ├── README.md
│   ├── guardrails-base.md
│   ├── department-risk-alignment-framework.md
│   ├── incident-response-playbook.md
│   ├── model-assurance-and-transparency.md
│   ├── non-deterministic-code-assurance.md
│   ├── risk-register-template.md
│   ├── secure-by-design-ai-evidence.md
│   └── vendor-contract-security-requirements.md
│
├── manager-tool-guides/         # Tool selection and management
│   ├── README.md
│   ├── comparative-guidance.md
│   ├── data-residency.md
│   ├── amazon-kiro/
│   │   └── README.md
│   ├── amazon-q/
│   │   ├── README.md
│   │   └── security-and-support.md
│   ├── claude-code/
│   │   ├── style-guides/
│   │   │   ├── go.md
│   │   │   ├── html-css.md
│   │   │   ├── java.md
│   │   │   ├── javascript.md
│   │   │   ├── python.md
│   │   │   ├── ruby.md
│   │   │   ├── shell.md
│   │   │   └── README.md
│   │   └── README.md
│   ├── github-copilot/
│   │   ├── copilot-usage-guide.md
│   │   └── README.md
│   └── gemini-code-assist/
│       ├── README.md
│       └── developer-knowledge-api-and-mcp-server-guidance.md
│
├── playbooks/                   # Operational guidance
│   ├── README.md
│   ├── ai-code-assistant-instructions.md
│   ├── ai-sdlc-playbook.md
│   ├── ai-tools-integration-guide.md
│   ├── context-engineering.md
│   ├── legacy-system-modernisation.md
│   ├── model-selection.md
│   └── prompt-engineering
│       ├── prompt-engineering-agents.md
│       ├── prompt-engineering-ai-roles.md
│       ├── prompt-engineering-documentation.md
│       ├── prompt-engineering-foundations.md
│       ├── prompt-engineering-index.md
│       ├── prompt-engineering-testing.md
│       └── prompt-engineering-use-cases.md
│
├── policy/              # Strategic policy and compliance frameworks
│   ├── README.md
│   ├── data-sovereignty-and-jurisdiction.md
│   └── dpia-ai-coding-assistants.md
│
├── prompt-library/              # Reusable prompt patterns
│   ├── README.md
│   ├── prompt-library-overview.md
│   ├── prompt-template.md
│   └── by-task-type/
│       ├── README.md
│       ├── legacy-maintenance.md
│       ├── modernisation.md
│       └── refactoring.md
│
├── quality-metrics/             # Measurement and reporting
│   ├── measurement-playbook.md
│   └── quality-strategy.md
│
├── security/                    # Security resources 
│   ├── README.md
│   ├── security-policies.md
│   └── threat-modelling.md
│
├── sustainable-ai/              # Environmental sustainability 
│   ├── README.md
│   ├── overview.md
│   ├── carbon-footprint.md
│   ├── net-benefit.md
│   └── ai-use.md
│
├── training-materials/          # Learning resources
│   └── README.md
│
└── user-tool-guides/            # Developer user guides for AI tools
    ├── claude-code/
    │   ├── README.md
    │   ├── getting-started.md
    │   ├── advanced-use.md
    │   ├── customisation-guide.md
    │   ├── safe-usage-prototyping-vs-production.md
    │   └── setup-guide.md
    ├── github-copilot/
    │   ├── README.md
    │   ├── getting-started.md
    │   ├── advanced-use.md
    │   ├── customisation-guide.md
    │   ├── safe-usage-prototyping-vs-production.md
    │   ├── agent-mode-billing.md
    │   ├── copilot-cli-billing.md       
    │   └── premium-credit-management.md
    └── gemini-code-assist/
        ├── README.md
        ├── getting-started.md
        ├── advanced-use.md
        └── safe-usage-prototyping-vs-production.md
```