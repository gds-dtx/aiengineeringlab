> ALPHA
> This is a new service. Your [feedback](https://github.com/gds-dtx/aiengineeringlab/discussions) will help us to improve it.

# Quality gates and CI/CD pipelines

How to configure continuous integration and continuous deployment (CI/CD) quality gates to catch common issues in AI-generated code before it reaches production.

## Who this applies to

This guide applies to:

- engineers configuring continuous integration and continuous deployment (CI/CD) pipelines
- tech leads defining team quality standards
- DevOps engineers maintaining build infrastructure
- delivery managers tracking quality metrics

## Quality gate framework

### Gate 1: Pre-commit (developer workstation)

These checks run before code leaves the developer's machine. They provide immediate feedback and prevent obvious issues from entering the repository.

You should check:

- linting against team coding standards
- formatting checks
- basic static analysis
- secret detection (protecting against [Service Standard point 12](https://www.gov.uk/service-manual/service-standard/point-12-make-new-source-code-open) requirements)

For AI-assisted development, also include checks for common AI patterns. These include commented-out code blocks, placeholder TODO comments, and unused imports that AI tools frequently leave behind.

The speed target is under 10 seconds. If pre-commit checks take longer, developers will bypass them.

### Gate 2: Pull request (automated continuous integration)

These checks run automatically when a pull request is opened or updated. They form the primary automated quality barrier.

You should check:

- full test suite execution with a minimum pass rate of 100 percent for existing tests
- code coverage analysis with enforcement of a minimum threshold, integrated with SonarQube as the programme's standard tool
- static analysis checking for code smells, bugs, vulnerabilities, and security hotspots
- dependency vulnerability scanning using tools like Open Web Application Security Project (OWASP) Dependency-Check or Snyk, supporting [point 9](https://www.gov.uk/service-manual/service-standard/point-9-create-a-secure-service) requirements for due diligence on third-party software including AI-suggested dependencies
- accessibility linting for user interface (UI) changes using axe-core or equivalent, supporting [point 5](https://www.gov.uk/service-manual/service-standard/point-5-make-sure-everyone-can-use-the-service)
- build verification confirming the project compiles and packages correctly

Speed target is under 15 minutes for the full suite. If the pipeline takes longer, consider parallelising test execution. [Service Standard point 14](https://www.gov.uk/service-manual/service-standard/point-14-operate-a-reliable-service) expects that teams can deploy software changes regularly without significant downtime. A slow pipeline undermines that capability.

### Gate 3: Pre-merge (approval and compliance)

These checks require human judgement combined with automated verification.

You should check:

- peer review approval from at least one other engineer
- confirmation that the pull request description explains the change including any AI-assisted generation context
- verification that security scan results have been reviewed and any flagged items addressed
- accessibility checks for UI changes using automated tools supplemented by manual review where needed

### Gate 4: Pre-deployment (staging validation)

These checks run after merge but before production deployment.

You should check:

- integration test suite execution against a staging environment
- performance benchmarks compared against baseline metrics
- smoke tests confirming critical user journeys
- any environment-specific compliance checks

[Service Standard point 14](https://www.gov.uk/service-manual/service-standard/point-14-operate-a-reliable-service) expects testing in an environment that protects users' privacy and is as similar to live as possible.

## Recommended tooling

### Static analysis with SonarQube

SonarQube is the programme's standard tool for code quality measurement. Configure it to track:

- defect density with a target of 15 to 20 percent reduction
- technical debt with a target of 20 percent reduction in remediation cost
- code smells and maintainability issues
- security vulnerabilities and hotspots
- test coverage percentage

Set quality gate profiles in SonarQube that enforce minimum standards and fail the build when thresholds are not met.

### Security scanning with Static Application Security Testing and Dynamic Application Security Testing

Static Application Security Testing (SAST) analyses source code for vulnerabilities without executing it. Dynamic Application Security Testing (DAST) tests running applications for security weaknesses. Both are important and catch different categories of issues.

For AI-generated code, SAST is particularly valuable. AI frequently produces code with security patterns that look correct but contain subtle vulnerabilities. Run SAST on every pull request. [Point 9 of the Service Standard](https://www.gov.uk/service-manual/service-standard/point-9-create-a-secure-service) requires that teams have a plan and budget to manage security during the life of the service. Automated scanning is the most sustainable way to achieve this.

### Dependency scanning

AI code assistants sometimes suggest libraries or dependencies that have known vulnerabilities. Automated dependency scanning catches these before they reach production. Configure your pipeline to fail on critical or high-severity Common Vulnerabilities and Exposures (CVEs) and to warn on medium-severity issues.

### Accessibility checking

Automated accessibility tools such as axe-core can be integrated into continuous integration pipelines to catch common Web Content Accessibility Guidelines (WCAG) violations in generated HTML. While these only catch a subset of accessibility issues, they provide a consistent baseline. [Point 5 of the Service Standard](https://www.gov.uk/service-manual/service-standard/point-5-make-sure-everyone-can-use-the-service) requires that everyone can use the service. Automated checks help maintain this standard as code changes rapidly.

## Pipeline configuration principles

### Fail fast, fix fast

Order your quality gates so that the cheapest and fastest checks run first. Linting takes seconds and integration tests take minutes. If the code fails linting, there is no point running the full test suite.

### Make failures actionable

When a quality gate fails, the developer should understand what went wrong within 30 seconds of reading the failure output. They should also know how to fix it. Configure your tools to provide clear, specific error messages with links to relevant guidance.

### No bypass without escalation

Quality gates should not be easily bypassed. If a team needs to skip a gate for an urgent hotfix, this should require explicit approval from a tech lead. It should be logged as a deviation for review in the next retrospective. [Service Standard point 9](https://www.gov.uk/service-manual/service-standard/point-9-create-a-secure-service) requires a plan for managing security throughout the service lifecycle. Ad-hoc bypasses without oversight undermine that plan.

### Track gate metrics

Monitor:

- gate pass rate over time
- average time to fix gate failures
- categories of failures
- false positive rate

[Service Standard point 10](https://www.gov.uk/service-manual/service-standard/point-10-define-what-success-looks-like-and-publish-performance-data) expects teams to use performance data to make decisions about how to fix problems and improve the service. Quality gate metrics are performance data.

## Aligning with programme metrics

The programme tracks quality through DevOps Research and Assessment (DORA) aligned key performance indicators (KPIs). Your quality gates should directly support these.

| Programme key performance indicator | Quality gate contribution |
|---------------|--------------------------|
| Change failure rate: maintain or reduce | Pre-merge test suite and security scan gates |
| Defect density: reduce 15 to 20 percent | SonarQube quality gate with defect thresholds |
| Technical debt: reduce 20 percent remediation cost | SonarQube technical debt tracking and gate |
| Sprint velocity: increase 10 to 15 percent | Fast, reliable gates that do not slow delivery |
| Rework rate: reduce 10 percent | Comprehensive pre-merge checks catching issues early |

## Evidencing continuous integration and continuous deployment at service assessments

[Service Standard point 14](https://www.gov.uk/service-manual/service-standard/point-14-operate-a-reliable-service) specifically expects teams to be able to deploy software changes regularly without significant downtime. It expects teams to create continuous integration and continuous delivery pipelines from an early phase of the project. At assessment, be prepared to show:

- your CI/CD pipeline configuration and the quality gates it includes
- evidence of regular deployments and their success rate
- how you monitor the service and respond to problems identified by monitoring
- how quality gate data informs your iteration and improvement decisions ([point 8](https://www.gov.uk/service-manual/service-standard/point-8-iterate-and-improve-frequently))
- how security scanning gates support your Secure by Design approach ([point 9](https://www.gov.uk/service-manual/service-standard/point-9-create-a-secure-service))