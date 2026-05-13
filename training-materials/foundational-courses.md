> ALPHA
> This is a new service. Your [feedback](https://github.com/govuk-digital-backbone/aiengineeringlab/discussions) will help us to improve it.

# Foundational courses for AI engineering tools

## Contents

[GitHub Copilot](#github-copilot)

[Gemini Code Assist](#gemini-code-assist)

[Amazon Q Developer](#amazon-q-developer)

[Kiro](#kiro)

[Choosing a starting point](#choosing-a-starting-point)

[What to do after the foundational course](#what-to-do-after-the-foundational-course)

This page helps you find the right training for the AI engineering tools used across the programme. Each tool has a recommended foundational course and a certification path where available.

Complete the foundational course for any tool you have been given a licence for. Your forward deployed engineer (FDE) or change lead can help you choose where to start.

## GitHub Copilot

GitHub Copilot is the primary AI engineering tool used across the programme. It provides code completions, chat assistance and command line support directly in your integrated development environment (IDE).

### Recommended course

['GitHub Copilot Fundamentals'](https://learn.microsoft.com/en-us/training/paths/copilot/) on Microsoft Learn is split into 2 parts. Part 1 covers responsible AI, Copilot plans and how Copilot handles data, taking approximately 2 hours 45 minutes. Part 2 covers prompt engineering, developer use cases, testing and privacy, taking approximately 3 hours 20 minutes.

### Certification

The GH-300 GitHub Copilot certification validates your ability to use Copilot across the development lifecycle. It covers 7 domains.

| Domain | Exam weighting |
|--------|----------------|
| Responsible AI | 7% |
| Plans and features | 31% |
| How Copilot works and handles data | 15% |
| Prompt crafting and engineering | 9% |
| Developer use cases | 14% |
| Testing | 9% |
| Privacy and content exclusions | 15% |

[Study guide](https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/gh-300)

Concentrate on plans and features, privacy and content exclusions, and how Copilot handles data. Together these make up over 60% of the exam.

The exam lasts 100 minutes and includes approximately 60 scored questions. You need roughly 70% to pass. The certification is valid for 2 years.

### Video training

The Microsoft Learn modules include embedded video walkthroughs within each lesson. The recommended self-paced paths are ['GitHub Copilot Fundamentals Part 1 of 2'](https://learn.microsoft.com/en-us/training/paths/copilot/) and ['GitHub Copilot Fundamentals Part 2 of 2'](https://learn.microsoft.com/en-us/training/paths/gh-copilot-2/).

The ['official instructor-led course GH-300T00-A'](https://learn.microsoft.com/en-us/training/courses/gh-300t00) covers the same material in a 1-day format.

For a video-first approach, ['Complete Guide to GitHub Copilot for Developers'](https://github.com/timothywarner-org/copilot-cert-prep) by Tim Warner is available on O'Reilly. The companion repository includes hands-on labs, demos and a quick reference cheat sheet.

### Practice exams

Before sitting the exam, you should complete at least one practice exam. The recommended options are the [Microsoft official practice assessment (free)](https://learn.microsoft.com/en-us/credentials/certifications/github-copilot/), the Microsoft exam sandbox (free), which lets you experience the exam interface and question types before the real exam, ['GitHub Copilot Certification Practice Exams' on Udemy (paid)](https://www.udemy.com/course/practice-exams-github-copilot-certificate/), with scenario-based questions with detailed explanations, regularly updated for 2026 exam changes, and ['GH-300 GitHub Copilot Practice Exams' on Tutorials Dojo (paid)](https://portal.tutorialsdojo.com/courses/gh-300-github-copilot-practice-exams/), with 100 or more questions across all 7 domains with timed, review and section-based modes. The free Microsoft practice assessment is the best starting point as it shows you the question style and helps you identify gaps before committing to paid resources.

### Further reading

For more information, see the [GitHub Copilot documentation](https://docs.github.com/en/copilot), the [GitHub Learn certification page](https://learn.github.com/certification/COPILOT), [Tim Warner's cert prep repository](https://github.com/timothywarner-org/copilot-cert-prep) with labs, cheat sheet and feature updates, and the AI Engineering Lab prompt engineering guide (internal) in the playbooks/prompt-engineering folder in the repository.

## Gemini Code Assist

Gemini Code Assist is Google Cloud's AI-powered development assistant. It provides code completion, chat, smart actions and agent mode in your IDE.

### Recommended course

'Streamline App Development with Gemini Code Assist' on Google Cloud Skills Boost covers setup, code completion, chat, explaining code, generating tests and refactoring.

Course link: https://www.cloudskillsboost.google/

### Editions

Gemini Code Assist is available in three editions.

| Edition | Features |
|---------|----------|
| Free (for individuals) | Up to 6,000 code completions and 240 chat requests per day |
| Standard | Enterprise security, IP indemnity and Google Cloud integration |
| Enterprise | Code customisation from private repositories |

### What to focus on

When completing this course, pay attention to:

- smart actions such as explain code, generate tests, add comments and make more readable
- agent mode for multi-step tasks
- how to guide suggestions using comments and context
- the differences between editions, especially around data privacy

### Further reading

For more information, see the [Gemini Code Assist documentation](https://developers.google.com/gemini-code-assist/docs/overview).

## Amazon Q Developer

Amazon Q Developer is the generative AI assistant from AWS for the full software development lifecycle. It was previously known as Amazon CodeWhisperer.

### Recommended course

['Amazon Q Developer Getting Started'](https://skillbuilder.aws/) on AWS Skill Builder covers features, setup, inline suggestions, chat, security scanning and code transformation.

### Pricing tiers

Amazon Q Developer has 2 tiers. The free tier provides unlimited inline suggestions, 50 agentic requests per month and security scanning, requiring a free AWS Builder ID. The Pro tier adds higher limits, enterprise access controls and codebase customisation.

### What to focus on

When completing this course, pay attention to:

- security scanning for vulnerabilities and hardcoded secrets
- code transformation for upgrading Java and .NET applications
- agentic coding for multi-file changes
- chat commands such as /transform, /review, /doc and /test
- the differences between free and Pro tiers around data handling

### Further reading

[Amazon Q Developer documentation](https://docs.aws.amazon.com/amazonq/latest/qdeveloper-ug/)

## Kiro

Kiro is an AI-powered IDE from AWS built on Visual Studio Code. It introduces spec-driven development, a structured approach that creates requirements and design documents before writing code.

### Recommended course

['Kiro Getting Started'](https://skillbuilder.aws/) on AWS Skill Builder covers spec-driven development, steering files, agent hooks and Model Context Protocol (MCP) server connections.

### What to focus on

When completing this course, pay attention to:

- the difference between vibe sessions for quick questions and spec sessions for structured planning
- the 3-phase spec workflow producing requirements, design and tasks
- EARS notation (Easy Approach to Requirements Syntax) for writing clear requirements
- steering files for giving Kiro persistent knowledge about your project
- agent hooks for automating repetitive tasks

### Further reading

For more information, see the [Kiro documentation](https://kiro.dev/docs/) and the MCP introduction (internal) in the mcp-servers folder in the repository.

## Choosing a starting point

If you are not sure which course to complete first, use this guide.

| If you | Start with |
|--------|------------|
| Have a GitHub Copilot licence | GitHub Copilot Fundamentals |
| Have a Gemini Code Assist licence | Streamline App Development with Gemini Code Assist |
| Have an Amazon Q Developer licence | Amazon Q Developer Getting Started |
| Want to try spec-driven development | Kiro Getting Started |
| Want a recognised certification | GH-300 GitHub Copilot certification |

If you have access to more than one tool, start with the one your team uses most. Your FDE can advise on which tool best fits your current work.

## What to do after the foundational course

Once you have completed a foundational course, you should:

- apply what you have learned in your daily work for at least 2 weeks before moving on
- explore the prompt engineering guide in the repository for techniques that work across all tools
- talk to your FDE or champion about tailored support for your team's use cases
- consider working towards the GH-300 certification if you are using GitHub Copilot

---

