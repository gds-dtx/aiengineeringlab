> ALPHA
> This is a new service. Your [feedback](https://github.com/govuk-digital-backbone/aiengineeringlab/discussions) will help us to improve it.

# GitHub Copilot usage guide

This guide explains how to use GitHub Copilot safely and effectively within your organisation. It covers which tools you can use, what you must and must not do, and how to configure security settings.

## Who can use GitHub Copilot

Only approved tools and licensed users can use GitHub Copilot under your organisation's AI tooling policy.

| Tool | Who can use it | Maximum classification |
|------|----------------|------------------------|
| GitHub Copilot Enterprise | Approved users only | OFFICIAL |
| GitHub Copilot Free | No one (prohibited) | Security and legal risks |
| Any non approved tool | No one (prohibited) | Security and legal risks |

You cannot use GitHub Copilot Free, GitHub Copilot Individual, GitHub Copilot Pro, or other public AI tools without explicit information governance approval.

Never input OFFICIAL SENSITIVE, SECRET, TOP SECRET, personal data, or special category data into any AI tool.

## Accountability

You remain responsible for all code you produce. Your project's accountable owner is ultimately accountable for any errors.

AI assistance does not reduce the need for testing, documentation, and review.

## What you must do

The following recommendations help you use AI coding tools safely and effectively while managing intellectual property, security, and quality risks.

### Enable all filtering features

Turn on all filtering features in GitHub Copilot settings. This includes the duplicate detection filter which prevents suggestions that match public code. See [GitHub Copilot filter settings](https://docs.github.com/en/copilot/configuring-github-copilot/configuring-github-copilot-settings-on-githubcom).

Enabling filters protects against intellectual property risks by blocking suggestions that match publicly available code. It also reduces the chance of introducing known vulnerable code patterns into your codebase.

### Review every line of AI generated code

Do not accept AI suggestions without understanding what the code does. Treat AI code with the same scrutiny as code from a junior developer.

### Remove sensitive data before submitting prompts

Check and clean code before using it with AI tools. Remove all or add relevant files to `.copilotignore`:

- secrets and credentials
- personal data
- special category data
- internal system details

### Test AI generated code thoroughly

AI code needs the same or more thorough testing as human written code. Test for correctness, security vulnerabilities, and edge cases.

### Get approval from your accountable owner

Your service owner, delivery lead, or other accountable approver must approve AI tool usage before you use AI tools on your project. Document this approval in your project risk register.

### Run security scanning on all AI-generated code

Use Static Application Security Testing (SAST) tools to scan for vulnerabilities. This is mandatory for all code, including AI-assisted code.

### Validate all dependencies

Check that all suggested packages:

- exist
- are current
- are secure
- are properly licensed

AI may suggest packages that do not exist.

### Document when you use AI assistance

Where your organisation requires it, record AI usage in commit messages. For example: 'Implemented with GitHub Copilot assistance'. This maintains transparency and audit trails.

## Required security configuration

Your enterprise administrator or repository owner must enable these settings before you use Copilot. See [GitHub Copilot enterprise settings](https://docs.github.com/en/copilot/managing-copilot/managing-github-copilot-in-your-organization).

| Setting | Configuration |
|---------|---------------|
| Duplicate detection filter | Set to 'Block' mode to prevent code matching public repositories |
| Push protection | Enabled to block secrets from being committed |
| Branch protection | Configured to restrict deletions, block force pushes, and require pull requests and status checks |
| Content exclusions | Configured to exclude sensitive files from AI indexing |
| Firewall rules | Block GitHub Copilot Free endpoints |

You should also create a `.copilotignore` file in VS Code to exclude config files, environment files, and credentials from Copilot context.

## What you must not do

Do not input any of the following into AI coding tools.

### Credentials and secrets

Do not input:

- API keys
- passwords
- tokens
- database connection strings
- any authentication credentials

### Personal data

Do not input:

- names
- employee or customer identifiers
- email addresses
- phone numbers
- addresses
- any personally identifiable information

### Special category or sensitive operational data

Do not input:

- medical or case records
- regulated personal data
- confidential case information
- operational data with personal identifiers

### Classified information

Do not input SECRET or TOP SECRET data. In most cases only OFFICIAL and OFFICIAL SENSITIVE classification is permitted, but this may vary between organisations. Check your organisation's policies if unsure.

### System details

Do not input:

- internal URLs
- hostnames
- network infrastructure
- server names

## Additional restrictions

You must:

- complete peer review for all AI-generated code through pull or merge requests
- get expert review before using AI for security critical code like authentication or encryption
- disable Terminal auto approve in agent mode to prevent accidental file deletion (see [GitHub Copilot agent mode settings](https://docs.github.com/en/copilot/using-github-copilot/using-copilot-coding-agent))

Use Copilot in your IDE rather than on GitHub.com. The IDE does not retain your prompts, whereas GitHub.com retains them for 28 days.

## Checklists

### Before using AI tools on a project

- [ ] Approval from the accountable owner obtained
- [ ] Data Protection Impact Assessment completed if required
- [ ] Project risk register updated

### Before submitting code to AI

- [ ] All secrets and credentials removed
- [ ] Personal and sensitive data anonymised or removed
- [ ] Unique identifiers and case references redacted
- [ ] Data classification verified (OFFICIAL or OFFICIAL SENSITIVE, per your organisation's policy)
- [ ] Internal URLs and system names redacted
- [ ] Database connection strings removed

### When reviewing AI generated code

- [ ] Every line reviewed and understood
- [ ] Purpose and logic verified
- [ ] All dependencies verified and current
- [ ] Package versions checked for vulnerabilities
- [ ] Security scanning completed (SAST tools)
- [ ] Licences checked for all suggested packages
- [ ] Code follows your organisation's engineering standards
- [ ] No hard coded credentials or configuration
- [ ] Error handling implemented properly
- [ ] Unit tests written and passing
- [ ] Peer review completed

### Before deploying AI assisted code

- [ ] Full test suite passed (unit, integration, end to end)
- [ ] Security vulnerabilities addressed
- [ ] Documentation updated
- [ ] AI usage documented in commits or pull requests
- [ ] Dependency audit completed

### Every 2 weeks

Use your organisation's standard review cycle.

- [ ] DevOps Research and Assessment (DORA) metrics reviewed
- [ ] AI impact on delivery performance assessed
- [ ] Any negative trends identified and addressed

## Related guidance

- [AI SDLC playbook](../../playbooks/ai-sdlc-playbook.md)
- [Security policies](../../security/security-policies.md)
- [AI Engineering Lab repository](https://github.com/govuk-digital-backbone/aiengineeringlab)
- [GOV.UK AI Playbook](https://www.gov.uk/government/publications/ai-playbook-for-the-uk-government)
- [GitHub Copilot documentation](https://docs.github.com/en/copilot)