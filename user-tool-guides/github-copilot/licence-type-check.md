> ALPHA
> This is a new service. Your [feedback](https://github.com/govuk-digital-backbone/aiengineeringlab/discussions) will help us to improve it.

# How to check your GitHub Copilot licence type

## Purpose

Use this guide to check which GitHub Copilot licence plan you are using and what to do if it is not the right one for your work.

Before you start, consult your organisation's AI policy to confirm whether Copilot is approved for your work and whether any restrictions apply.

---

## Contents

- [Who this is for](#who-this-is-for)
- [Why this matters](#why-this-matters)
- [Quick check: determine your licence type](#quick-check-determine-your-licence-type)
- [Detailed comparisons](#detailed-comparisons)
- [Personal plans](#personal-plans)
- [Organisation-managed plans](#organisation-managed-plans)
- [What to do if you are on the wrong plan](#what-to-do-if-you-are-on-the-wrong-plan)
- [Common scenarios](#common-scenarios)
- [Troubleshooting](#troubleshooting)

---

## Who this is for

This guide is for engineers, technical leads, and Copilot administrators in government teams who need to confirm whether they are using a personal or organisation-managed GitHub Copilot plan.

---

## Why this matters

The licence type you use affects three critical areas.

Data handling and privacy. Personal Copilot plans may share code snippets with GitHub for model improvement. Organisation-managed plans (Business or Enterprise) do not share code with third parties. If you use a personal licence on government code, you may inadvertently transmit departmental code to external systems.

Adoption tracking. Only organisation-managed plans provide usage analytics. If your team uses personal licences, the AI Engineering Lab cannot see adoption metrics or usage patterns, creating blind spots in engagement monitoring. This creates Shadow AI risk (unapproved AI use outside organisational controls).

Feature and policy enforcement. Only Business and Enterprise plans support custom instructions, content exclusions, and admin policies. Teams using personal plans cannot enforce security or consistency controls across developers.

For these reasons, government teams should use organisation-managed (Business or Enterprise) plans. Personal plans are only suitable for non-government experimental use.

---

## Quick check: determine your licence type

### In the GitHub Copilot integrated development environment (IDE) extension

1. Open your IDE with the Copilot extension (VS Code, JetBrains, or equivalent).
2. Open the Copilot Chat sidebar or panel.
3. Look for your user account indicator (usually top-right corner or account menu).
4. Select your account or settings icon.

You should see one of these.

A personal plan indicator includes:
- a "Free", "Pro", or "Pro+" label
- your personal GitHub username
- no organisation name visible

An organisation-managed plan indicator includes:
- a "Business" or "Enterprise" label
- your organisation name (for example "Cabinet Office", "DfE")
- an organisation logo or badge

### On GitHub.com

1. Sign into GitHub.com
2. Click your profile picture (top-right corner)
3. Select "Settings" from the dropdown
4. In the left sidebar, click "Copilot"

A personal plan shows:
- your current subscription shown as "Free", "Pro", or "Pro+"
- billing information under your personal account
- no organisation context

An organisation-managed plan shows:
- "You are using Copilot via [Organisation Name]"
- a note that "This is an organisation-managed subscription"
- no billing information visible (organisation pays)
- a link to your organisation's Copilot settings

### In the Copilot Chat panel (latest IDEs)

Some newer IDE versions show licence details directly in the Copilot interface.

1. Open Copilot Chat
2. Look for a settings icon or information button
3. Your plan type and organisation (if applicable) should be displayed

---

## Detailed comparisons

For the latest plan details, see the [official GitHub Copilot plans page](https://github.com/features/copilot/plans).

### Personal plans

The Free plan includes:
- limited requests per month (usually 15 completion requests)
- only available in select IDE extensions
- code snippets may be shared with GitHub for product improvement
- no usage analytics or team controls
- no custom instructions or content exclusions

The Pro plan includes:
- unlimited requests per month
- available in most IDE extensions (VS Code, JetBrains, Neovim)
- code snippets may be shared with GitHub for product improvement
- no usage analytics or team controls
- no custom instructions or content exclusions
- costs £10 per month per developer (paid personally)

The Pro+ plan includes:
- unlimited requests per month
- available in all IDE extensions
- advanced features including extended context window and agent mode
- code snippets may be shared with GitHub for product improvement
- no usage analytics or team controls
- no custom instructions or content exclusions
- costs £20 per month per developer (paid personally)

**Common issue with personal plans:** Even if an individual developer has a personal Pro plan with "unlimited" requests, the organisation cannot see usage, enforce policies, or verify that developers are not sharing code inappropriately.

### Organisation-managed plans

The Business plan includes:
- unlimited requests for all team members
- includes all IDE extensions and tools (Copilot CLI, agent mode)
- code is not shared with GitHub (secure for government use)
- full usage analytics and adoption tracking
- admin controls for custom instructions, content exclusions, and policy settings
- costs approximately £19 to £21 per user per month (organisation pays)
- suitable for most government teams

The Enterprise plan includes:
- unlimited requests for all team members
- includes all IDE extensions and tools
- code is not shared with GitHub (secure for government use)
- full usage analytics and adoption tracking
- advanced admin controls including single sign on (SSO) and organisation policies
- data residency and compliance options for high-security requirements
- costs negotiated per contract (usually £25 or more per user per month)
- suitable for large departments or high-security environments

The key difference between these plans are that Enterprise adds advanced authentication, data residency, and compliance options. However, the Business plan is sufficient for most government use cases.

---

## Personal plans

### How to tell if you are on a personal plan

You are on a personal plan if you:

- see "Free", "Pro", or "Pro+" on your Copilot settings
- see your personal GitHub username without an organisation context
- receive a personal invoice for Copilot (or free Copilot access)
- manage your own billing through your GitHub personal account

### Data handling on personal plans

Important. On personal plans, GitHub may share code snippets you write with Copilot with third parties (including GitHub's model training). This is true even if you are working on government code.

You can disable code sharing in your IDE settings:

1. Open your IDE settings (VS Code: Code → Preferences → Settings)
2. Search for "Copilot" → "Telemetry"
3. Set "Telemetry enabled" to "Off" (or equivalent for your IDE)
4. Restart your IDE

Even with telemetry disabled, using a personal plan on government code is not recommended. Organisations cannot verify data handling or enforce security policies.

### If you are on a personal plan and should not be

Your organisation may have purchased an organisation-managed plan for you but it is not yet assigned to your account.

Contact your:

- line manager or tech lead to verify whether an organisation plan is available
- Copilot administrator to find the right admin in your organisation settings on GitHub.com
- GitHub Enterprise support if you are unsure who administers Copilot for your team

See [What to do if you are on the wrong plan](#what-to-do-if-you-are-on-the-wrong-plan) for next steps.

---

## Organisation-managed plans

### How to tell if you are on an organisation-managed plan

You are on an organisation-managed plan if:

- you see "Business" or "Enterprise" on your Copilot settings
- you see your organisation name (for example "Cabinet Office", "DSIT", "DfE") in your Copilot context
- you do not receive a personal invoice for Copilot
- your subscription is managed by your organisation's GitHub admin

### Data handling on organisation-managed plans

Good news. On Business and Enterprise plans, your code is not shared with GitHub. Snapshots remain within GitHub's systems and are used only to improve Copilot for your organisation, not for external training.

This makes organisation-managed plans safe for government code.

### Features and controls available

A Business or Enterprise plan allows your organisation to:

- set coding standards, security policies, or documentation requirements that Copilot follows (custom instructions)
- prevent Copilot from accessing sensitive files (for example files containing secrets, credentials, or OFFICIAL-SENSITIVE data) using content exclusions
- track which teams and individuals are using Copilot, how often, and in which repositories (usage analytics)
- enforce data residency, disable specific features, or require approval workflows (policy settings)

Ask your Copilot administrator if these controls are configured for your team.

---

## What to do if you are on the wrong plan

### Scenario 1: You are on a personal plan and should be on an organisation plan

Take these actions:

1. Verify that an organisation plan is available. Contact your line manager or tech lead, ask your organisation's GitHub admin (your org's GitHub settings then Copilot settings), or check your organisation's documentation or intranet for Copilot guidance.
2. Request to be added to the organisation plan. Your admin should add your GitHub account to the organisation's Copilot subscription. This usually takes a few minutes to take effect.
3. Verify the change. Close and restart your IDE, check your Copilot settings again, and you should now see your organisation name and "Business" or "Enterprise".
4. If nothing changes after 30 minutes, sign out of GitHub in your IDE and sign back in, clear your IDE's cache (IDE documentation varies by tool), and restart your IDE again.

### Scenario 2: You are on a personal plan and should not be (you should not be using Copilot)

Take these actions:

1. Stop using Copilot immediately.
2. If you have a paid personal plan (Pro or Pro+), consider cancelling to avoid unexpected charges.
3. Confirm with your line manager or tech lead whether Copilot use is approved for your work.

### Scenario 3: Your organisation has no plan yet

Take these actions:

1. Raise this with your line manager or department leadership.
2. Refer them to the [AI Engineering Lab guidance on licence selection](../../manager-tool-guides/comparative-guidance.md).
3. Once a plan is procured, your admin will set it up and assign you.

### Scenario 4: You think you should have an organisation plan but cannot find it

Common reasons include:

- not yet being added to the organisation's Copilot subscription (ask your admin)
- being signed into a different GitHub account (check you are signed into the right account)
- your organisation managing Copilot through an enterprise account (ask IT or your Copilot admin)
- your organisation's subscription having lapsed or become inactive

Take these actions:

1. Confirm your GitHub account name and organisation.
2. Ask your Copilot admin (find them in your org's GitHub settings) to verify you are added.
3. If still unresolved, contact GitHub support with your organisation.

---

## Common scenarios

### I have Pro, my colleague has Business. Why does it matter?

Your colleague's Business plan is safer for government code (no sharing with third parties) and the organisation can track adoption and enforce policies. If you are both working on the same codebase, you should both be on the Business plan to ensure consistency.

If you are working on different projects, confirm with your line manager which licence type is appropriate.

### I am a contractor or consultant. Which licence should I use?

If you are working on government code, you should use the organisation's Business or Enterprise plan, not a personal plan. Your organisation's Copilot admin should add you to the subscription. If the organisation has not set this up, raise it with them before using Copilot.

If you are working on your own commercial work, a personal Pro or Pro+ plan is appropriate. Do not use government organisation's Copilot access for your own projects.

### My organisation does not have a Copilot plan yet. Can I use my personal plan temporarily?

Personal plans are not recommended, particularly for government code.

However, if you must use Copilot now (for example to pilot its use), disable telemetry in your IDE settings. Document this as temporary and set a deadline to migrate to an organisation plan. Notify your line manager and Copilot administrator that this is happening. Do not store sensitive files or credentials in code you write with Copilot.

### I have a Business plan. Do I still need to worry about data privacy?

On a Business plan, your code is not shared with third parties.

However, you should still follow your organisation's data handling policies. Content exclusions should protect sensitive files, but do not rely solely on Copilot exclusions. Always review Copilot suggestions before committing them (as you would with any code).

For OFFICIAL-SENSITIVE or other classified information, use content exclusions to prevent Copilot access.

### Can I use a personal plan for open-source work and a Business plan for government work?

Yes, you can have both accounts, but keep them clearly separated. Never accidentally push government code to an open-source repository. Verify you are signed into the correct account before opening Copilot. This is particularly risky, so consider asking your organisation to give you explicit guidance.

---

## Troubleshooting

### I updated to a Business plan but Copilot still shows Personal

Take these steps:

1. Restart your IDE completely (close and reopen).
2. Sign out of GitHub in your IDE settings and sign back in.
3. Check your IDE's Copilot extension settings.
4. Verify your account is added to the organisation's subscription (GitHub.com then organisation settings then Copilot).
5. If still not working after 30 minutes, the subscription may not have synced. Contact GitHub support.

### My IDE does not show a licence type anywhere

Different IDEs display this information in different ways.

In VS Code, check the Copilot icon in the activity bar and hover over it for account info. In JetBrains IDEs, check Tools then GitHub Copilot then Account. In Neovim or CLI, check your terminal with `github-copilot status` or similar commands.

If you cannot find your licence type, check on GitHub.com (always shows it). Go to github.com, click your profile picture then Settings then Copilot, and you will see your licence type there.

### I see my organisation name but it says 'Free' or 'Pro' underneath

This usually means your IDE is showing cached or outdated information, you are signed in but the subscription has not fully synced, or there is a configuration issue.

Restart your IDE. Check your account on GitHub.com directly (Settings then Copilot) to see the source of truth. If GitHub.com shows Business or Enterprise, your IDE will update within a few minutes. If it still shows Personal on GitHub.com, contact your Copilot admin.

### Copilot is disabled but I have a Business plan

Your organisation may have disabled Copilot in specific repositories, disabled agent mode or CLI features, or configured policies that limit your access.

Ask your Copilot administrator whether Copilot is available for your team and which features are enabled.

---

## Next steps

The next steps depend on which type of licence you hold:

- if you are on a Business or Enterprise plan, see [Getting started with GitHub Copilot](getting-started.md) for usage guidance
- if you are on a Personal plan and should be on an organisation plan, request to be added as described above
- if you are on a Personal plan and unsure whether you should be, ask your line manager or your organisation's GitHub admin

Your Copilot administrator should:

- see the [enterprise AI controls](../../governance/github-enterprise-ai-controls.md#usage-based-billing-from-1-june-2026) and GitHub's [models and pricing reference](https://docs.github.com/en/copilot/reference/copilot-billing/models-and-pricing) for current subscription and billing guidance
- see [Customisation guide](customisation-guide.md) for setting up custom instructions and policies

All developers should:

- see [Safe usage guidance](safe-usage-prototyping-vs-production.md) for appropriate usage patterns
- see [Content exclusions](content-exclusions.md) if you work with sensitive files
- use [Defra GitHub Copilot config examples](https://defra.github.io/defra-ai-config-examples/) when moving from individual usage to a governed team setup
- see [Safe usage guidance](safe-usage-prototyping-vs-production.md) for appropriate usage patterns
- see [Content exclusions](content-exclusions.md) if you work with sensitive files
