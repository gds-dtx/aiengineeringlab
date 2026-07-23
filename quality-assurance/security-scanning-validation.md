> ALPHA
> This is a new service. Your [feedback](https://github.com/gds-dtx/aiengineeringlab/discussions) will help us to improve it.

# Security scanning and validation

Validating AI-generated code for security, correctness, and compliance with government standards.


## Contents

[Service Standard alignment](#service-standard-alignment)

[Who this applies to](#who-this-applies-to)

[Why AI-generated code needs extra security scrutiny](#why-ai-generated-code-needs-extra-security-scrutiny)

[Security scanning tools](#security-scanning-tools)

[Security validation workflow](#security-validation-workflow)

[Government compliance alignment](#government-compliance-alignment)

[Responding to findings](#responding-to-findings)

[Evidencing security at service assessments](#evidencing-security-at-service-assessments)

## Service Standard alignment

| Point | How this guide helps |
|-------|----------------------|
| [Point 9. Create a secure service which protects users' privacy](https://www.gov.uk/service-manual/service-standard/point-9-create-a-secure-service) | Primary resource for meeting point 9 in AI-assisted development, covering Secure by Design principles, threat management, data protection, and third-party software due diligence |
| [Point 11. Choose the right tools and technology](https://www.gov.uk/service-manual/service-standard/point-11-choose-the-right-tools-and-technology) | Security scanning tooling selection and configuration guidance |
| [Point 13. Use and contribute to open standards, common components and patterns](https://www.gov.uk/service-manual/service-standard/point-13-use-common-standards-components-patterns) | Aligns scanning with NCSC, OWASP, and other open security standards |
| [Point 14. Operate a reliable service](https://www.gov.uk/service-manual/service-standard/point-14-operate-a-reliable-service) | Security scanning supports reliability by catching vulnerabilities that could cause outages or breaches |

## Who this applies to

This guide applies to:

- engineers writing and reviewing AI-assisted code
- security-conscious engineers on government projects
- DevSecOps engineers configuring security tooling
- tech leads responsible for security standards

## Why AI-generated code needs extra security scrutiny

Government services hold personal data about users and sensitive information about operational activities. Government has an obligation to protect this information and minimise disruption to services. AI tools generate code based on training data that includes both secure and insecure patterns. The AI does not distinguish between them based on your context. It produces what is statistically likely to be correct, which is not the same as what is secure for your specific environment.

Service Standard point 9 requires that teams perform due diligence on the security of third-party software. Treat AI-generated code as third-party code. It was not written by your team, and it was not written with knowledge of your threat model.

Common security issues in AI-generated code include:

- input validation that checks format but not content
- authentication patterns that work for simple cases but miss edge cases like token expiry or session fixation
- database queries that are parameterised in some places but not others
- error responses that leak internal system information
- default configurations that are permissive rather than restrictive

## Security scanning tools

### Static Application Security Testing (SAST)

SAST tools analyse source code without executing it. They catch security vulnerabilities at the earliest possible stage during development.

SonarQube is the programme's standard static analysis tool. Configure it to check for Open Web Application Security Project (OWASP) Top 10 vulnerabilities, Common Weakness Enumeration (CWE) listed weaknesses, and security hotspots that require manual review. Run SonarQube on every pull request to catch issues before they are merged.

Language-specific SAST tools can supplement SonarQube for deeper analysis. Examples include Bandit for Python, SpotBugs with FindSecBugs for Java, and ESLint security plugins for JavaScript and TypeScript.

### Dynamic Application Security Testing (DAST)

DAST tools test running applications by sending malicious inputs and observing responses. They catch vulnerabilities that only manifest at runtime, such as misconfigured headers, insecure cookie settings, and server-side injection vulnerabilities.

Run DAST scans against staging environments as part of your pre-deployment quality gate. DAST is slower than SAST and should not block pull requests, but it should block production deployments when critical findings are present. Service Standard point 14 expects testing in an environment that is as similar to live as possible.

### Dependency scanning

AI code assistants sometimes suggest libraries with known vulnerabilities, outdated packages, or dependencies with restrictive licences incompatible with your project. Automated dependency scanning catches these issues automatically.

Tools such as OWASP Dependency-Check, Snyk, or GitHub Dependabot can scan your dependency manifest on every build. Configure them to fail on critical and high-severity Common Vulnerabilities and Exposures (CVEs) and to alert on medium-severity findings. This directly supports point 9's requirement for due diligence on third-party software.

### Secret detection

AI-generated code occasionally includes placeholder Application Programming Interface (API) keys, tokens, or credentials that look like they should be replaced but may accidentally get committed. Service Standard point 12 requires that new source code is made open. Secrets in open repositories are a serious security incident.

Configure pre-commit hooks to run secret detection locally before code reaches the repository. Tools like GitLeaks or TruffleHog can be integrated into both pre-commit hooks and continuous integration (CI) pipelines.

## Security validation workflow

### Step 1: Automated scanning on every pull request

Configure your CI pipeline to run SAST (SonarQube) and dependency scanning on every pull request. The pipeline should fail if critical or high-severity vulnerabilities are found. Medium-severity findings should be flagged for manual review but should not block the pull request.

### Step 2: Manual security review for sensitive code

Any code that touches authentication, authorisation, payment processing, personal data handling, or external API integration should receive a manual security review. This is in addition to automated scanning. Service Standard point 9 requires that teams perform user research to create security processes that are fit for purpose. Security review processes should be proportionate to risk, not a blanket overhead on every change.

### Step 3: DAST scanning before deployment

Run DAST scans against the staging environment after code is merged but before it is promoted to production. Address critical findings before deployment. Log medium and low findings for remediation in subsequent sprints.

### Step 4: Regular full-codebase scans

In addition to per-pull request scanning, run full-codebase security scans weekly. This catches issues that may have been introduced through configuration changes, dependency updates, or interactions between separately reviewed changes.

## Government compliance alignment

### Secure by Design principles

Service Standard point 9 requires that teams follow the [Secure by Design principles](https://www.security.gov.uk/policy-and-guidance/secure-by-design/). In the context of AI-assisted development, this means considering security from the start of any AI tool adoption, not as an afterthought. Embed security scanning into the development workflow rather than bolting it on at the end.

Key Secure by Design expectations relevant to AI-assisted development include:

- ensuring senior leaders who are accountable for security are aware of the risks associated with AI-generated code
- having a plan and budget to manage security throughout the service lifecycle including responding to new threats that may emerge as AI tools evolve
- performing due diligence on the security of AI-generated code as third-party software

### NCSC secure development guidance

AI-generated code should meet the same standards as human-written code under [National Cyber Security Centre (NCSC) guidance](https://www.ncsc.gov.uk/collection/developers-collection). Pay particular attention to:

- secure defaults (AI often generates permissive configurations)
- defence in depth (AI may implement only one layer of protection)
- logging and monitoring (AI-generated code frequently omits security event logging)

### Technology Code of Practice

[Technology Code of Practice (TCoP) point 6 (Make things secure)](https://www.gov.uk/guidance/make-things-secure) requires that plans show how you are securing data and systems. This includes improving your mean time to recovery after incidents and aligning with the Security Policy Framework and Minimum Cyber Security Standard. Automated security scanning and clear remediation workflows support this.

### Departmental security policies

Each department may have additional security requirements beyond NCSC and TCoP. Ensure your security scanning configuration reflects these. Model Context Protocol (MCP) servers can embed departmental security standards directly into the AI's context, improving the security quality of generated code at source.

## Responding to findings

### Triage

Not all security findings require immediate action. Triage findings by severity and exploitability. A critical Structured Query Language (SQL) injection in a public-facing endpoint needs immediate remediation. A low-severity code smell in an internal utility can be scheduled for a future sprint.

### Fix and verify

When remediating a security finding, follow these steps. 
1. Write a specific test that reproduces the vulnerability.
2. Fix the vulnerability. 
3. Verify the test now passes. 

This ensures the same vulnerability cannot be reintroduced without detection.

### Document and share

When a significant security finding is identified in AI-generated code, document it (anonymised for sharing) in the programme's lessons learned process. This feeds into the Best Practice Repository (D07) and helps other teams avoid the same issue. Distribution channels include fortnightly Lessons Learned sessions and week notes.

### Update guardrails

If a category of security issue recurs, update your team's review guidance. Add a specific check to your CI pipeline. Consider whether an MCP server rule could prevent the AI from generating the problematic pattern in the first place. Service Standard point 8 expects teams to iterate and improve. Recurring security issues that are not addressed will be a concern at assessment.

## Evidencing security at service assessments

Service Standard point 9 is assessed at every stage, including alpha, beta, and live. At assessment, be prepared to show evidence of:

- how you follow Secure by Design principles throughout delivery
- how you treat AI-generated code as third-party software for security due diligence
- your security scanning toolchain and how it integrates into continuous integration and continuous deployment (CI/CD)
- how you triage and remediate and learn from security findings
- that senior leaders accountable for security are aware of AI-related risks
- your plan and budget for managing security throughout the service lifecycle
- how you collect, process, and store data securely in a way that respects users' privacy