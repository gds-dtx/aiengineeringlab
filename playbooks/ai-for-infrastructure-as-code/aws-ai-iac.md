> ALPHA
> This is a new service. Your [feedback](https://github.com/govuk-digital-backbone/aiengineeringlab/discussions) will help us to improve it.

# AI for infrastructure as code (IaC): Amazon Web Services (AWS)

## Introduction

Amazon Web Services (AWS) is a significant part of the UK public sector cloud estate. UK government departments operate substantial AWS environments, often running production workloads for citizen-facing services. AI coding assistants are well-suited to accelerating delivery across all of these formats.

This page covers how AI tools can support the primary AWS infrastructure as code IaC formats, including Terraform, AWS CloudFormation and the AWS Cloud Development Kit (CDK).

## AWS IaC tooling: an overview

### Terraform (with AWS provider)

Terraform remains the most widely adopted IaC tool in government AWS environments, particularly for teams that also manage Azure or multi-cloud resources. The [AWS Terraform provider](https://registry.terraform.io/providers/hashicorp/aws/latest) is one of the most mature in the ecosystem, with comprehensive coverage of AWS services.

To support these Terraform tasks on AWS, you can use AI to:

- generate modules for foundational patterns such as VPCs, subnets, Transit Gateways, ECS clusters and RDS instances
- write `data` source lookups for existing resources, for example fetching AMI IDs and Route53 zones
- explain complex IAM policy documents in plain English
- identify overly permissive S3 bucket policies or security group rules
- refactor `count`-based patterns to `for_each` for more maintainable code
- write Terratest or equivalent test scaffolding for module validation
- generate `.tfvars` files and variable documentation

### AWS CloudFormation

CloudFormation is AWS's native IaC service and is deeply integrated with the AWS ecosystem. It is commonly found in longer-standing government AWS environments and is the format used by many AWS Quick Starts and AWS Service Catalog products. CloudFormation templates can be authored in either YAML or JSON.

To support these CloudFormation tasks, you can use AI to:

- generate CloudFormation stacks for common patterns, for example VPC with public and private subnets, ALB with WAF and ECS Fargate services
- explain `DependsOn`, `Conditions`, `Mappings` and `Transform` sections for engineers new to CloudFormation
- convert JSON CloudFormation to YAML for readability
- generate CloudFormation Guard (`cfn-guard`) rules to enforce security policies
- diagnose `CREATE_FAILED` or `ROLLBACK_IN_PROGRESS` errors from stack events
- write nested stacks and cross-stack references using `Exports` and `Fn::ImportValue`
- generate AWS SAM (Serverless Application Model) templates for Lambda-based workloads

### AWS Cloud Development Kit (CDK)

The AWS CDK allows teams to define infrastructure using familiar programming languages such as TypeScript, Python and Java. These are then synthesised into CloudFormation templates. CDK is increasingly popular with engineering teams that prefer a code-first approach. They can apply software engineering practices such as abstraction, testing and reuse directly to infrastructure.

To support these CDK tasks, you can use AI to:

- generate CDK constructs and stacks in TypeScript or Python for common AWS architectures
- explain the difference between L1 (CloudFormation resource), L2 (curated) and L3 (pattern) constructs
- write unit tests using the CDK assertions library (`aws-cdk-lib/assertions`)
- refactor monolithic CDK apps into reusable, shareable construct libraries
- convert existing CloudFormation templates into CDK code
- explain CDK bootstrap requirements and synthesised output

## Practical AI prompting patterns for AWS IaC

#### Generating a Terraform module
```
'Write a Terraform module for an AWS VPC with three public and three private subnets across three availability zones. Include a NAT Gateway per AZ and output the VPC ID and subnet IDs.'
```

#### Explaining a CloudFormation template
```
'Explain this CloudFormation template in plain English. Identify any resources that could expose data publicly or that use deprecated configuration options.'
```

#### CDK construct generation
```
'Write a CDK TypeScript construct that creates an ECS Fargate service behind an Application Load Balancer with HTTPS termination. Use existing VPC and certificate ARNs as props.'
```

#### IAM policy review
```
'Review this IAM policy document. Identify any statements that grant broad permissions (for example, `*` actions or resources) that could be scoped down.'
```

## Security and compliance considerations

AWS IaC in government environments must align with [NCSC Cloud Security Principles](https://www.ncsc.gov.uk/collection/cloud-security) and departmental security frameworks. See our [security policies](../../security/security-policies.md) and [secure-by-design AI evidence guidance](../../governance/secure-by-design-ai-evidence.md) for additional considerations on AI-assisted infrastructure as code.

When using AI for AWS IaC, you should:

- exclude AWS Account IDs, access keys or ARNs containing sensitive resource names in AI prompts, as these are sensitive identifiers
- always verify that AI-generated configurations enable S3 Block Public Access settings, as this is not always applied by default
- explicitly ask AI tools to scope IAM policies to specific resources and actions, rather than accepting `*` wildcards
- ensure AI-generated configurations include KMS encryption for EBS volumes, RDS instances, S3 buckets and SQS queues
- include VPC flow logs and CloudTrail settings explicitly in your prompts, as AI tools do not consistently generate these alongside core infrastructure
- validate CloudFormation templates with AWS-native linting and policy tools before deployment

## AWS AI tooling integration

AWS provides native AI tooling that integrates directly with IaC workflows.

| Tool | Description |
|------|-------------|
| [Amazon Q](../../manager-tool-guides/amazon-q/) Developer (formerly CodeWhisperer) | AWS's AI coding assistant with native support for CloudFormation, CDK, and Terraform, including security vulnerability scanning |
| Amazon Q in the AWS Console | Conversational AI assistance for understanding resources, generating CLI commands, and troubleshooting deployments |
| [GitHub Copilot](../../manager-tool-guides/github-copilot/) | Strong support for Terraform and CDK authoring, particularly in VS Code with AWS Toolkit extensions, with CLI support |

## Further reading

[AWS CloudFormation documentation](https://docs.aws.amazon.com/cloudformation/index.html)

[AWS CDK developer guide](https://docs.aws.amazon.com/cdk/v2/guide/home.html)

[HashiCorp AWS Terraform provider](https://registry.terraform.io/providers/hashicorp/aws/latest/docs)

[Amazon Q Developer](https://aws.amazon.com/q/developer/)

[AWS Security best practices for IaC](https://docs.aws.amazon.com/prescriptive-guidance/latest/terraform-aws-provider-best-practices/security.html)
