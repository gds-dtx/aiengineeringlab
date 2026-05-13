> ALPHA
> This is a new service. Your [feedback](https://github.com/govuk-digital-backbone/aiengineeringlab/discussions) will help us to improve it.

# AI for infrastructure as code (IaC): Microsoft Azure

## Introduction

Microsoft Azure is the dominant cloud platform across UK central government, supported through Crown Commercial Service (CCS) frameworks and deeply embedded in departmental technology strategies. Engineering teams working with Azure represent the most common infrastructure as code (IaC) environment where AI coding assistants can provide significant, measurable value.

This page covers how AI tools can support the three primary Azure IaC formats, including Terraform, Bicep and Azure Resource Manager (ARM) templates. It also provides practical guidance for teams adopting AI-assisted IaC practices.

## Azure IaC tooling: an overview

### Terraform (HashiCorp or OpenTofu)

Terraform is the most widely used multi-cloud IaC tool and a natural fit for government teams that operate across Azure, AWS, or GCP simultaneously. The [AzureRM provider](https://registry.terraform.io/providers/hashicorp/azurerm/latest) gives Terraform access to the full Azure resource catalogue. Teams using Terraform benefit from a large ecosystem of community modules and strong support from AI coding assistants trained on extensive Terraform corpora.

To support these Terraform tasks on Azure, you can use AI to:

- generate modules for common patterns, for example hub-and-spoke networking, Azure Kubernetes Service clusters and Key Vault configurations
- explain `terraform plan` output in plain English
- diagnose provider version conflicts and state file issues
- refactor flat configurations into reusable module structures
- write `README.md` documentation for published modules
- identify non-compliant configurations against CIS Azure Benchmarks

### Bicep

Bicep is Microsoft's domain-specific language for Azure Resource Manager, designed as a cleaner, more readable alternative to raw ARM JSON. It compiles down to ARM templates and is Microsoft's recommended approach for Azure-native IaC. AI assistants, particularly GitHub Copilot with Azure extensions, are well-suited to Bicep given its structured, declarative syntax.

To support these Bicep tasks, you can use AI to:

- scaffold `.bicep` files for new Azure services from natural language descriptions
- explain `param`, `var`, `resource` and `module` blocks for engineers new to Bicep
- convert existing ARM JSON templates to Bicep, a common modernisation task
- generate Bicep modules for Azure Landing Zone patterns
- suggest `@description` decorators and metadata for policy compliance
- identify missing `dependsOn` relationships causing deployment ordering failures

### ARM Templates

Azure Resource Manager (ARM) templates are the original Azure-native IaC format. They are JSON-based, verbose and widely deployed across government. While Bicep has superseded ARM as the recommended authoring format, many departments still maintain large ARM template estates and need support understanding, modifying, and migrating them.

To support these ARM template tasks, you can use AI to:

- explain complex nested templates and `copy` loops
- identify security misconfigurations, for example storage accounts with public blob access enabled
- generate parameter files for deployment pipelines
- assist migration from ARM JSON to Bicep
- document legacy templates that lack inline comments

## Practical AI prompting patterns for Azure IaC

Good prompting is essential to getting useful output from AI assistants when working with Azure IaC. The following patterns have been found effective.

#### Scaffolding a new resource
```
'Write a Bicep module to deploy an Azure Key Vault with soft delete enabled, RBAC authorisation and private endpoint. Assume the VNet and subnet already exist as parameters.'
```

#### Explaining existing code
```
'Explain what this ARM template does, step by step, in plain English. Highlight any security concerns.'
```

#### Refactoring
```
'Convert this ARM JSON template to Bicep. Use modules where possible and add `@description` decorators to all parameters.'
```

#### Security review
```
'Review this Terraform configuration for the AzureRM provider and identify any resources that do not follow least-privilege principles or that expose public endpoints unnecessarily.'
```

## Security and compliance considerations

Azure IaC in government environments must align with departmental security policies and [NCSC guidance](https://www.ncsc.gov.uk/collection/cloud-security). See our [security policies](../../security/security-policies.md) and [secure-by-design AI evidence guidance](../../governance/secure-by-design-ai-evidence.md) for additional considerations on AI-assisted infrastructure as code. Follow these security guidelines when using AI assistants for Azure IaC.

| Guideline | Detail |
|-----------|--------|
| Never include subscription IDs, tenant IDs, or service principal credentials in AI prompts | These are sensitive identifiers that should remain within secure pipelines |
| Validate AI-generated configurations with policy as code tools | Use tools such as [Checkov](https://www.checkov.io/) or Azure Policy before deployment |
| Use Private Endpoints for all PaaS services where possible | AI tools do not always default to this pattern and may generate publicly accessible resource configurations |
| Managed Identity over service principals | Prompt AI tools explicitly to use Managed Identity rather than client secrets where applicable |
| Azure Policy and Blueprints | AI-generated IaC should be tested against existing Azure Policy assignments in your environment to avoid deployment failures |

## Azure AI tooling integration

Microsoft provides AI assistance integrated directly into Azure development workflows.

| Tool | Description |
|------|-------------|
| [GitHub Copilot](../../manager-tool-guides/github-copilot/) | Provides inline completion and chat for Terraform, Bicep, and ARM authoring in VS Code and Visual Studio, with Azure-specific context via the Azure extension pack, and CLI support |
| Azure Developer CLI (`azd`) | Supports AI-assisted project scaffolding for Azure environments |
| Microsoft Copilot in Azure (Portal) | Offers conversational assistance for understanding and modifying Azure resources directly within the portal |

## Further reading

[Microsoft Bicep documentation](https://learn.microsoft.com/en-us/azure/azure-resource-manager/bicep/overview)

[HashiCorp AzureRM Terraform provider](https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs)

[Microsoft ARM template documentation](https://learn.microsoft.com/en-us/azure/azure-resource-manager/templates/overview)

[Checkov Azure IaC security scanning](https://www.checkov.io/5.Policy%20Index/arm.html)

[NCSC Secure cloud deployment guidance](https://www.ncsc.gov.uk/collection/cloud-security/implementing-the-cloud-security-principles)
