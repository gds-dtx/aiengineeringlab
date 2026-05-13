> ALPHA
> This is a new service. Your [feedback](https://github.com/govuk-digital-backbone/aiengineeringlab/discussions) will help us to improve it.

# AI for infrastructure as code (IaC): Google Cloud Platform (GCP)

## Introduction

Google Cloud Platform (GCP) is an increasingly important part of the UK public sector cloud landscape, particularly for data engineering, machine learning and analytics workloads. Engineering teams across UK government are working with GCP services such as BigQuery, Cloud Run, Vertex AI and Google Kubernetes Engine (GKE).

Infrastructure as code (IaC) tooling for GCP is maturing rapidly and AI coding assistants can accelerate GCP infrastructure delivery. This page covers the primary GCP IaC approaches, including Terraform, Google Cloud Deployment Manager and emerging options such as Pulumi and Config Connector.

## GCP IaC tooling: an overview

### Terraform (with Google provider)

Terraform is the de facto standard for GCP IaC, particularly for teams operating in multi-cloud environments or following a platform engineering model. The [Google Cloud Terraform provider](https://registry.terraform.io/providers/hashicorp/google/latest) is comprehensive and actively maintained, with coverage across GCP's broad service catalogue.

To support these Terraform tasks on GCP, you can use AI to:

- generate modules for foundational GCP patterns such as VPC networks, subnets, Cloud NAT, GKE clusters, Cloud SQL instances and IAM bindings
- explain GCP's project, folder and organisation hierarchy and how it maps to Terraform resources
- write `google_project_iam_binding` and `google_project_iam_member` usage correctly, a common source of drift and confusion
- generate Terraform for GCP organisational policies and Access Context Manager rules
- scaffold Workload Identity Federation configurations for CI/CD pipelines
- diagnose provider authentication errors, for example Application Default Credentials rather than service account key
- write module documentation and variable descriptions for shared platform modules

### Google Cloud Deployment Manager

Cloud Deployment Manager is GCP's native IaC service, allowing teams to define GCP resources in YAML, Python, or Jinja2 templates. While Terraform has largely superseded Deployment Manager for new projects, many existing GCP estates — particularly in data and analytics teams — still use Deployment Manager templates that require support and maintenance.

To support these Cloud Deployment Manager tasks, you can use AI to:

- explain existing Deployment Manager configurations, particularly Python-based templates with complex logic
- generate YAML-based Deployment Manager configs for common GCP resources
- identify deprecated resource types or API versions in existing templates
- convert Deployment Manager configurations to equivalent Terraform code as part of modernisation efforts
- generate schema files (`.schema`) for Deployment Manager template validation

### Pulumi

Pulumi is an increasingly popular IaC tool that allows infrastructure to be defined in general-purpose programming languages such as TypeScript, Python and Go. It supports GCP as a first-class provider and is particularly attractive to teams writing application code in supported languages who want a unified development experience.

To support these Pulumi tasks on GCP, you can use AI to:

- generate Pulumi stacks in TypeScript or Python for GCP services
- write Pulumi component resources, which are reusable abstractions equivalent to Terraform modules
- explain Pulumi's state management and stack configuration model
- convert Terraform configurations to Pulumi code
- write Pulumi automation API scripts for dynamic infrastructure provisioning

### Kubernetes Config Connector

[Config Connector](https://cloud.google.com/config-connector/docs/overview) allows GCP resources to be managed using Kubernetes-style YAML manifests and the `kubectl` toolchain. Teams running GKE will find it a natural fit when using GitOps patterns with tools such as ArgoCD or Flux.

To support these Config Connector tasks, you can use AI to:

- generate Config Connector YAML manifests for GCP resources, for example `SQLInstance`, `StorageBucket` and `IAMServiceAccount`
- explain the relationship between Config Connector resources and their GCP API equivalents
- write Kustomize overlays for environment-specific Config Connector configurations

## Practical AI prompting patterns for GCP IaC

#### Generating a Terraform module
```
'Write a Terraform module for a GCP VPC network with two subnets, one for GKE nodes and one for Cloud SQL, with Private Google Access enabled and Cloud NAT for egress. Use variables for project ID, region and CIDR ranges.'
```

#### Explaining an IAM configuration
```
'Explain this Terraform configuration for GCP IAM bindings. Identify any roles that grant overly broad permissions and suggest least-privilege alternatives.'
```

#### Deployment Manager to Terraform migration
```
'Convert this Cloud Deployment Manager Python template into equivalent Terraform using the google provider. Preserve all resource properties and add comments explaining the migration.'
```

#### Pulumi in Python
```
'Write a Pulumi Python stack that creates a Cloud Run service with a custom domain, backed by a Firestore database. Use workload identity for authentication.'
```

## Security and compliance considerations

GCP IaC in government environments must align with [NCSC Cloud Security Principles](https://www.ncsc.gov.uk/collection/cloud-security) and departmental security frameworks. See our [security policies](../../security/security-policies.md) and [secure-by-design AI evidence guidance](../../governance/secure-by-design-ai-evidence.md) for additional considerations on AI-assisted infrastructure as code.

When using AI for GCP IaC, you should:

- exclude GCP project IDs, service account key JSON or organisation IDs in AI prompts, using placeholder values and substituting these at deployment time
- ask AI tools explicitly to use Workload Identity Federation for CI/CD pipelines rather than exporting service account keys
- validate AI-generated IaC configurations against your organisation policy set before deployment, as they may not account for organisation policy constraints active in your GCP environment
- for high-security workloads, ensure AI-generated configurations include appropriate VPC Service Control perimeters
- include `google_logging_project_sink` or audit log configurations explicitly in your prompts, as AI tools do not consistently generate these alongside core resources
- always run static analysis with `terraform validate`, `tflint` and Checkov before applying GCP Terraform configurations

## GCP AI tooling integration

Google provides AI-assisted development tooling with native GCP integration.

| Tool | Description |
|------|-------------|
| [Gemini Code Assist](../../manager-tool-guides/gemini-code-assist/) | Google's AI coding assistant available in VS Code and JetBrains IDEs, with strong support for Terraform and Cloud-native development, GCP-specific context awareness via the Cloud Code extension, and CLI support |
| Gemini in Google Cloud Console | Provides conversational AI assistance for understanding GCP resources, generating `gcloud` CLI commands and diagnosing deployment issues |
| Cloud Code (VS Code or IntelliJ plugin) | Provides IDE-level support for Kubernetes manifests, Cloud Run configurations and Config Connector YAML with AI completion via Gemini |
| [GitHub Copilot](../../manager-tool-guides/github-copilot/) | Effective for Terraform and Pulumi authoring in GCP environments, particularly when combined with the Cloud Code extension, with CLI support |

## Further reading

[Google Cloud Terraform on Google Cloud documentation](https://cloud.google.com/docs/terraform)

[Google Cloud Deployment Manager documentation](https://cloud.google.com/deployment-manager/docs)

[Pulumi Google Cloud provider](https://www.pulumi.com/registry/packages/gcp/)

[Google Cloud Config Connector overview](https://cloud.google.com/config-connector/docs/overview)

[Gemini Code Assist](https://cloud.google.com/gemini/docs/codeassist/overview)

[NCSC Cloud security principles](https://www.ncsc.gov.uk/collection/cloud-security/implementing-the-cloud-security-principles)
