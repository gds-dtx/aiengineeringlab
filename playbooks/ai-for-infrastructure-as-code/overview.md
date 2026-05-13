> ALPHA
> This is a new service. Your [feedback](https://github.com/govuk-digital-backbone/aiengineeringlab/discussions) will help us to improve it.

# AI for infrastructure as code (IaC)

## Overview

Infrastructure as code (IaC) is the practice of managing and provisioning cloud and on-premises infrastructure through machine-readable configuration files, rather than manual processes or interactive tooling. IaC has become foundational to modern software delivery. Teams can version, review, test, and automate their infrastructure in the same way they manage application code.

AI coding assistants are transforming how engineering teams write, review, and maintain IaC. Departments across UK government are exploring AI tools such as GitHub Copilot, Claude, and Google Gemini. These tools can accelerate IaC workflows, reduce configuration drift, and surface security misconfigurations before they reach production.

## Why IaC matters in the public sector

Public sector engineering teams face unique infrastructure challenges.

| Challenge | Description |
|---|---|
| Compliance and security | Government services must meet security standards (Cyber Essentials, NCSC guidance) and data sovereignty requirements |
| Multi-cloud environments | Many departments operate across Microsoft Azure, Amazon Web Services (AWS), and Google Cloud Platform (GCP), often concurrently |
| Legacy modernisation | Much IaC work involves migrating legacy infrastructure to cloud-native patterns rather than greenfield development |
| Consistency at scale | Shared platforms like GOV.UK PaaS and departmental landing zones require reusable, reliable IaC modules |

AI assistants can address all of these areas by generating boilerplate, explaining unfamiliar syntax, suggesting policy-compliant configurations, and reviewing code for common misconfigurations.

## The three major cloud platforms

### Microsoft Azure

[Microsoft Azure IaC guidance](azure-ai-iac.md) covers the most widely adopted cloud platform across UK central government, underpinned by agreements with the Crown Commercial Service. IaC tooling for Azure includes Terraform, Bicep, and Azure Resource Manager (ARM) templates. AI assistants have demonstrated strong capability in generating and explaining Bicep and Terraform for Azure. This makes IaC a high-value use case for departments running Azure-first strategies.

### Amazon Web Services

[Amazon Web Services (AWS)](aws-ai-iac.md) remains the platform of choice for several digital and data teams within government. It suits workloads that require high levels of flexibility, or where teams have existing AWS expertise. Primary IaC tooling includes Terraform, AWS CloudFormation, and AWS Cloud Development Kit (CDK). AI assistants can generate CloudFormation templates and explain CDK constructs. They can also identify Identity and Access Management (IAM) permission issues that are common pain points for public sector teams.

### Google Cloud Platform

[Google Cloud Platform (GCP)](gcp-ai-iac.md) adoption is growing across government data and AI workloads. IaC tooling for GCP includes Terraform, Google Cloud Deployment Manager, and Pulumi. AI assistants can assist with generating GCP-specific Terraform modules, writing deployment configurations, and navigating GCP's IAM and networking models.

## How AI assistants add value in IaC workflows

| Capability | Example Use Case |
|---|---|
| Code generation | Scaffold a Terraform module for a new VNet or VPC from a plain English description |
| Code explanation | Explain what an existing ARM template or CloudFormation stack does |
| Error diagnosis | Identify why a Terraform plan is failing or a Bicep deployment is rejected |
| Security review | Flag overly permissive IAM roles, open security groups, or missing encryption settings |
| Refactoring | Convert legacy ARM templates to Bicep, or CloudFormation to CDK |
| Documentation | Auto-generate README files and inline comments for IaC modules |
| Policy compliance | Suggest changes to align configurations with CIS benchmarks or departmental standards |

## Key considerations for public sector teams

Keep the following in mind when using AI to write IaC.

| Consideration | Guidance |
|---|---|
| Data sovereignty | Ensure IaC configurations do not inadvertently create resources in non-approved regions |
| Secret management | AI tools should not be used to generate configurations that embed secrets or credentials in plain text |
| Review gates | AI-generated IaC should always pass through peer review and policy-as-code tooling (Checkov, OPA/Conftest) before deployment |
| Prompt hygiene | Avoid including sensitive infrastructure details (IP ranges, account IDs, internal hostnames) in AI prompts |

## Further reading

[NCSC Cloud Security Guidance](https://www.ncsc.gov.uk/collection/cloud-security)

[GOV.UK Technology Code of Practice](https://www.gov.uk/guidance/the-technology-code-of-practice)

[HashiCorp Infrastructure-as-Code](https://developer.hashicorp.com/terraform/tutorials/aws-get-started/infrastructure-as-code)

[GitHub Copilot for Infrastructure](https://github.com/features/copilot)

[CDDO Cloud First Policy](https://www.gov.uk/guidance/government-cloud-first-policy)
