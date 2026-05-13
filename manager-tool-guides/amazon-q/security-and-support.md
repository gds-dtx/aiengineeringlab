> ALPHA
> This is a new service. Your [feedback](https://github.com/govuk-digital-backbone/aiengineeringlab/discussions) will help us to improve it.
# Amazon Q - security and support guidance

> Central home for Amazon Q security best practices and support content across government departments.

## Audience

Engineering managers, technical leads, and delivery managers responsible for AI Engineering Lab adoption in their teams.

## Purpose

This guide provides engineering managers with practical guidance for implementing Amazon Q within UK government departments. It covers security considerations, troubleshooting issues and incident reporting.

## Contents

[Security best practices](#security-best-practices) 

[Support and escalation](#support-and-escalation) 


[Further reading](#further-reading) 

[Contributing guidance](#contributing-guidance) 

## Prerequisites

Before reading this guide, you should understand:
- your team's current development workflow and tooling
- basic software development lifecycle concepts
- your department's security classification requirements
- the AI Engineering Lab maturity assessment framework (see 'maturity assessment framework' and 'team classification guide')
- manager-tool-guides for [Amazon Q](../amazon-q/)

## Security best practices

### For managers

Policy configuration requires the following steps.

1. Configure content exclusions before any engineer access.
2. Review exclusion patterns quarterly or after incidents.
3. Enable usage analytics via AWS console.
4. Establish clear escalation path for security concerns.
5. Configure IAM policies with least-privilege access.

Monitoring activities include:
- reviewing usage patterns in AWS CloudWatch
- checking for unusual acceptance rates (very high or very low)
- monitoring security scan results across team
- conducting periodic audits of generated code in production
- reviewing IAM permissions granted to engineers

Communication activities include:
- sharing security expectations clearly during training
- reinforcing that all code requires review regardless of source
- documenting and sharing security incidents as learning opportunities
- encouraging reporting of concerning suggestions without blame
- promoting use of command before PRs
### For engineers

You should perform the following daily practices.
1. Never accept suggestions containing API keys, passwords or tokens.
2. Review all security-critical code (authentication, encryption, input validation) with extra scrutiny.
3. Verify generated SQL queries for injection vulnerabilities.
4. Check generated AWS SDK calls for proper error handling.
5. Ensure IAM policies follow least-privilege principle.
6. Run command before submitting PRs.
7. Validate CloudFormation templates for security misconfigurations.

Avoid Amazon Q when:
- implementing cryptographic algorithms
- writing security controls (authentication, authorisation)
- processing citizen data or personal information
- making critical infrastructure decisions without review
- configuring production IAM policies without validation

AWS-specific security considerations include:
- verifying S3 bucket policies do not allow public access
- checking IAM roles have appropriate trust relationships
- ensuring security groups follow least-privilege network access
- validating KMS key policies and encryption settings
- reviewing CloudWatch logging and monitoring configurations

## Support and escalation

### Engineer support

Tier 1 self-service resources include:
- Amazon Q Engineer documentation
- a getting started guide
- AWS re:Post for Amazon Q
- an internal knowledge base (if established)

Tier 2 team support options include:
- an internal Slack or Teams channel
- a champion network
- weekly office hours

Tier 3 AWS support options include:
- the AWS Support Center (requires AWS Support plan)
- response time depends on support tier (Engineer, Business, Enterprise)
- Amazon Q engineer Pro includes enhanced support

### Common troubleshooting scenarios

#### Inline suggestions not appearing

Symptoms include:
- no autocomplete suggestions while typing
- the extension appearing inactive

Follow these steps to resolve the issue.

1. Verify AWS Toolkit extension is installed and enabled.
2. Check authentication status - ensure connected to IAM Identity Center.
3. Verify Amazon Q engineer Pro license is assigned.
4. Check that file type is supported (Python, Java, JavaScript, TypeScript, and similar).
5. Restart IDE and check network connectivity.
6. Review IAM permissions for Amazon Q access.

#### Q Chat not responding

Symptoms include:
- the chat window opening but no responses
- error messages in chat interface

Follow these steps to resolve the issue.

1. Check AWS service health at AWS Health Dashboard.
2. Verify license is active in IAM Identity Center.
3. Clear chat history and restart conversation.
4. Check corporate proxy or firewall allows AWS endpoints.
5. Update to latest AWS Toolkit version.
6. Verify IAM permissions include 'codewhisperer:GenerateRecommendations'.

#### Agent mode failures

Symptoms include:
- commands failing to complete
- timeout errors or incomplete work
- agent getting stuck in loops

Follow these steps to resolve the issue.

1. Break down complex tasks into smaller, more specific requests.
2. Ensure workspace has clear structure and dependencies.
3. Check repository size (very large repos may struggle).
4. Provide more specific requirements in the prompt.
5. Review agent progress and provide clarifications when requested.
6. Verify sufficient context is available (not excluded by content filters).

#### Security scan issues

Symptoms include:
- the command failing or returning no results
- scan taking a very long time
- false positives in scan results

Follow these steps to resolve the issue.

1. Ensure file is in supported language.
2. Check file size (very large files may timeout).
3. Review scan results carefully - some findings may be intentional.
4. Configure scan sensitivity if available.
5. Report false positives to AWS support for model improvement.

#### Authentication problems

Symptoms include:
- being unable to connect to IAM Identity Center
- 'Unauthorised' errors
- an unrecognised license

Follow these steps to resolve the issue.

1. Verify IAM Identity Center start URL is correct.
2. Check user is assigned to correct group with Q access.
3. Ensure Amazon Q engineer Pro license is assigned to user.
4. Try signing out and back in.
5. Clear cached credentials and re-authenticate.
6. Verify IAM policies allow Amazon Q access.
7. Contact AWS administrator to verify license assignment.

#### Poor suggestion quality

Symptoms include:
- the suggestions not matching project patterns
- irrelevant or incorrect code generated
- AWS SDK calls using outdated patterns

Follow these steps to resolve the issue.

1. Provide more context via descriptive comments and function signatures.
2. Ensure relevant imports and dependencies are visible.
3. Use more specific variable and function names.
4. Check if content exclusions are blocking helpful context.
5. Try using Q Chat for complex scenarios instead of inline.
6. For AWS tasks, be explicit about service versions and SDKs.

Examples of effective prompting:

Example 1: generating AWS Lambda function

Poor prompt:
```python
# lambda function
def handler(event, context):
```

Good prompt:
```python
# AWS Lambda function to process S3 event notifications. Extract object key,
# validate file type (only .json and .csv), read content from S3, transform
# data, and write to DynamoDB table 'ProcessedData'. Include error handling
# for missing objects and DynamoDB throttling. Use boto3 SDK.
def process_s3_event(event, context):
```

Why it's better: specifies AWS services, data flow, validation rules, error conditions, and SDK preference.

Example 2: creating CloudFormation template

Poor prompt:
```yaml
# cloudformation template
Resources:
```

Good prompt:
```yaml
# CloudFormation template for serverless API: API Gateway REST API with
# Lambda integration, DynamoDB table with on-demand billing, CloudWatch
# Logs with 7-day retention, IAM roles with least-privilege permissions.
# Include outputs for API endpoint and table name. Use AWS::Serverless
# transform for simplified syntax.
AWSTemplateFormatVersion: '2010-09-09'
Transform: AWS::Serverless-2016-10-31
Resources:
```

Why it's better: describes complete architecture, specifies AWS services, includes operational requirements (logging, IAM), and mentions desired CloudFormation features.

Example 3: implementing IAM policy

Poor prompt:
```json
{
  "Version": "2012-10-17",
  "Statement": [
```

Good prompt:
```json
# IAM policy for Lambda function to: read from S3 bucket 'data-input-bucket'
# with prefix 'incoming/', write to DynamoDB table 'ProcessedRecords',
# write logs to CloudWatch Logs group '/aws/lambda/data-processor'.
# Follow least-privilege principle with resource-level permissions.
{
  "Version": "2012-10-17",
  "Statement": [
```

Why it's better:  specifies exact resources, actions needed, and security principle to follow.

General tips for better prompts with Amazon Q include:
- being specific about AWS services and versions
- providing resource names and ARNs when known
- mentioning error handling and edge cases
- specifying IAM permission requirements
- referencing AWS best practices explicitly
- including operational requirements (logging, monitoring)

#### Performance issues

Symptoms include:
- slow suggestion generation
- the IDE lagging when Amazon Q active

Follow these steps to resolve the issue.

1. Reduce number of active IDE extensions.
2. Check network connectivity and latency to AWS.
3. Clear extension cache and reload IDE.
4. Update to latest AWS Toolkit version.
5. Check system resources (CPU, memory).
6. Verify no proxy issues affecting AWS connectivity.

#### Enterprise-specific issues

Symptoms include:
- the license assignment not working
- policy changes not taking effect
- usage metrics not appearing

Follow these steps to resolve the issue.

1. Verify user is in correct IAM Identity Center group.
2. Check license assignment in AWS console.
3. Allow 15 to 30 minutes for policy changes to propagate.
4. Ensure user has signed out and back in after policy updates.
5. Contact AWS support for billing or access issues.
6. Review CloudTrail logs for permission errors.

### Security incidents

An engineer should report immediately if they discover or accept code containing:
- hardcoded secrets or credentials
- known security vulnerabilities
- data protection violations
- insecure AWS configurations

They must take the following immediate actions.

1. Do not commit the code.
2. Report to your security team using standard incident process.
3. Document the suggestion for analysis.
4. Update content exclusions if pattern-based.
5. Run command to check for similar issues.

Follow-up activities include:
- reviewing similar code in recent commits
- updating team training materials
- sharing learning without blame
- reporting issue to AWS if appropriate

## Further reading

### Official AWS resources
Amazon Q Engineer documentation - complete official documentation

Amazon Q Engineer features - feature overview and capabilities

Getting started with Amazon Q - initial setup guides

Amazon Q Engineer pricing - licensing and cost information

AWS re:Post for Amazon Q - community questions and answers

### Enterprise and security
Managing Amazon Q in your organisation - IAM and access control

Amazon Q security - security features and best practices

Content exclusions - configuring what Amazon Q can access

AWS Artifact - compliance reports and certifications

### Government procurement
Crown Commercial Service G-Cloud 14 - UK government cloud services framework

AWS on G-Cloud - search for AWS services including Amazon Q

TechUK framework - alternative procurement route

### NCSC guidance
Cloud security principles - assessing cloud services

Secure development and deployment guidance - security best practices

Vulnerability disclosure - handling security issues

### Repository resources
AI SDLC playbook - integrating AI Engineering Lab tools across development lifecycle

Model selection playbook - choosing appropriate tools for tasks

GitHub Copilot manager guide - complementary tool for inline completions

## Contributing guidance

We encourage contributions from across government to keep this repository current and comprehensive. Share your team's experience, lessons learned, and effective practices to help other government departments.

See the [contribution guidelines](../../CONTRIBUTING.md) before submitting changes.