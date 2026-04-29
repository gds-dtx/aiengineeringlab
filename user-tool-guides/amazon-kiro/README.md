> ALPHA
> This is a new service. Your [feedback](https://github.com/govuk-digital-backbone/aiengineeringlab/discussions) will help us to improve it.

# Amazon Kiro setup guide

## Purpose

Use this guide to set up Amazon Kiro through AWS IAM Identity Center.

## Who this is for

This guide is for engineers and technical leads onboarding to Amazon Kiro.

## Before you start

You need:

- an approved Amazon Kiro licence request
- access to AWS IAM Identity Center
- permission to install software on your device

## Install and configure Kiro

1. Download and install the Kiro integrated development environment (IDE) from [kiro.dev/downloads](https://kiro.dev/downloads).
2. Open Kiro and choose 'Sign in with AWS IAM Identity Center'.
3. Enter the Start URL `https://d-9c674b5f02.awsapps.com/start`.
4. Enter the AWS Region `eu-west-2` that hosts the identity directory.
5. Choose Continue.
6. Complete the sign-in through IAM Identity Center. The browser will open an AWS sign-in page.
7. Authenticate using your AWS credentials.

After you authenticate successfully, Kiro will be ready to use.

## Troubleshooting

| Issue | What it usually means | How to fix it |
|---|---|---|
| Cannot open Kiro | Application is not installed | Download and install Kiro from [kiro.dev/downloads](https://kiro.dev/downloads) |
| Browser authentication fails | Single sign-on or network issue | Clear your browser cookies and sign in again |
| Access denied | You do not have permission in IAM Identity Center | Check with your departmental administrator that your user has been added to the correct group |

## Related guidance

[Manager tool guide for Amazon Kiro](../../manager-tool-guides/amazon-kiro/README.md)

