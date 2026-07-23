> ALPHA
> This is a new service. Your [feedback](https://github.com/gds-dtx/aiengineeringlab/discussions) will help us to improve it.

# Technical lead assessment questionnaire

## Why we are asking for this information

This questionnaire helps us understand your team's technical environment so we can design AI coding assistant adoption that works with your existing tools, practices and constraints. We are gathering information to tailor the right integration approach and guardrails for your specific context.

## What happens next

Your responses, along with questionnaires from your delivery manager and team engineers, help us determine how to integrate AI coding assistants into your workflows effectively and safely.

You will need approximately 10 to 15 minutes to complete this questionnaire.

Your responses are confidential and will only be used to design your team's adoption plan. No individual team data is shared beyond the programme team.

## Technical environment

### 1. Primary programming languages
What languages does your team primarily work in? Select all that apply.
- [ ] Python
- [ ] Java
- [ ] JavaScript or TypeScript
- [ ] C# or .NET
- [ ] Go
- [ ] Ruby
- [ ] PHP
- [ ] Scala
- [ ] Kotlin
- [ ] Rust
- [ ] Legacy languages (COBOL, Fortran and similar)
- [ ] Other (specify): _________________

### 2. Development environments
Where do engineers write code? Select all that apply.
- [ ] Local machines with full internet access
- [ ] Local machines with restricted internet access
- [ ] Virtual desktop infrastructure (VDI)
- [ ] Cloud development environments (for example, GitHub Codespaces)
- [ ] Secure environments with air-gapped networks
- [ ] Mixed depending on project or engineer

### 3. IDEs and editors
What development tools does your team use? Select all that apply.
- [ ] Visual Studio Code
- [ ] IntelliJ IDEA
- [ ] PyCharm
- [ ] Eclipse
- [ ] Visual Studio
- [ ] Vim or Neovim
- [ ] Emacs
- [ ] Sublime Text
- [ ] Other (specify): _________________

### 4. Version control
What version control system does your team use?
- [ ] Git (GitHub)
- [ ] Git (GitLab)
- [ ] Git (Bitbucket)
- [ ] Git (Azure DevOps)
- [ ] Git (self-hosted)
- [ ] Other version control system (specify): _________________
- [ ] No version control system

## Development practices

### 5. Branching strategy
How does your team manage code branches?
- [ ] Trunk-based development (frequent small merges to main)
- [ ] Feature branching (branches live for days or weeks)
- [ ] GitFlow or similar (release branches, hotfixes and similar)
- [ ] No formal strategy
- [ ] Varies by project

### 6. Code review process
How are code reviews conducted? Select all that apply.
- [ ] Pull or merge requests with written review
- [ ] Pair programming
- [ ] Mob programming
- [ ] Asynchronous review using PR comments
- [ ] Synchronous review (video calls, in-person)
- [ ] Automated review tools only
- [ ] No formal review process

### 7. Automated testing coverage
What is the current state of automated testing in your codebase?
- [ ] Comprehensive - most code paths covered
- [ ] Good - critical paths well covered
- [ ] Moderate - some tests exist but significant gaps
- [ ] Limited - minimal test coverage
- [ ] None - no automated tests

### 8. Test types in use
What types of automated tests does your team maintain? Select all that apply.
- [ ] Unit tests
- [ ] Integration tests
- [ ] End-to-end tests
- [ ] API or contract tests
- [ ] Performance tests
- [ ] Security tests (Static application security testing (SAST) or Dynamic application security testing (DAST))
- [ ] Accessibility tests
- [ ] None currently

### 9. Continuous Integration
How does your team handle Continuous integration/Continuous deployment (CI/CD)?
- [ ] Full CI/CD pipeline - automated build, test, deploy
- [ ] CI only - automated build and test
- [ ] Basic automation - some checks automated
- [ ] Manual process - builds and deployments done manually
- [ ] No formal CI/CD

## Code quality and standards

### 10. Code quality tools
What automated code quality tools does your team use? Select all that apply.
- [ ] Linters (ESLint, Pylint and similar)
- [ ] Static analysis tools (SonarQube and similar)
- [ ] Code formatters (Prettier, Black and similar)
- [ ] Security scanners (Snyk, Dependabot and similar)
- [ ] Complexity analysis tools
- [ ] None currently

### 11. Coding standards
How are coding standards maintained?
- [ ] Documented standards with automated enforcement
- [ ] Documented standards with manual review
- [ ] Informal standards understood by team
- [ ] No formal standards
- [ ] Standards exist but not consistently followed

### 12. Documentation practices
How does your team document code?
- [ ] Comprehensive inline comments and external documentation
- [ ] Inline comments for complex logic
- [ ] README files and high-level architecture docs
- [ ] Minimal documentation
- [ ] Documentation is a known gap

### 13. Technical debt management
How does your team handle technical debt?
- [ ] Tracked and regularly prioritised in sprint planning
- [ ] Tracked but rarely addressed (always deprioritised)
- [ ] Addressed opportunistically when touching code
- [ ] Not formally tracked
- [ ] Overwhelmed by technical debt

## System architecture and constraints

### 14. System architecture
What architectural patterns does your team primarily work with? Select all that apply.
- [ ] Microservices
- [ ] Monolithic applications
- [ ] Serverless or functions
- [ ] Event-driven architecture
- [ ] Service-oriented architecture (SOA)
- [ ] Legacy mainframe systems
- [ ] Mixed or hybrid architecture

### 15. Cloud and infrastructure
Where do your systems run? Select all that apply.
- [ ] Public cloud (AWS, Azure, Google Cloud Platform (GCP))
- [ ] Private cloud
- [ ] On-premises data centres
- [ ] Hybrid (mix of cloud and on-premises)
- [ ] Legacy infrastructure
- [ ] Unsure

### 16. Data handling constraints
What data handling constraints does your team work within? Select all that apply.
- [ ] Cannot send code to external AI services
- [ ] Cannot send data samples to external services
- [ ] Must anonymise any data before using external tools
- [ ] All development work on air-gapped systems
- [ ] Standard internet-connected development allowed
- [ ] Specific approved tools only (allowlist approach)
- [ ] Unsure what constraints apply

### 17. Compliance requirements
What compliance frameworks does your team work within? Select all that apply.
- [ ] Government Security Classifications (OFFICIAL and similar)
- [ ] General data protection regulation (GDPR) data protection requirements
- [ ] Payment card industry data security standard (PCI DSS) (payment card data)
- [ ] ISO 27001
- [ ] Cyber Essentials or Cyber Essentials Plus
- [ ] No specific compliance requirements
- [ ] Other (specify): _________________

## Integration and tooling

### 18. Development workflow
Describe a typical workflow from starting a task to deploying code:

_________________

### 19. Tool integration challenges
What would make integrating a new tool into your workflow difficult? Select all that apply.
- [ ] Security approval process is lengthy
- [ ] Tools must integrate with specific corporate systems
- [ ] Network restrictions limit what tools can be used
- [ ] Engineers use diverse development setups
- [ ] Limited time to learn new tools
- [ ] Resistance to changing established workflows
- [ ] Budget or procurement constraints
- [ ] Other (specify): _________________

### 20. Existing AI tool integration
If engineers currently use AI coding tools, how are they integrated?
- [ ] Not currently using any AI tools
- [ ] Standalone tools (browser-based, not IDE-integrated)
- [ ] IDE extensions or plugins
- [ ] API integrations in custom tooling
- [ ] Mix of approaches
- [ ] Unsure

## Technical team capability

### 21. Team's technical practices maturity
How would you describe your team's development practices?
- [ ] Mature - strong practices, well automated, continuously improving
- [ ] Developing - good practices in place, some automation, room to improve
- [ ] Basic - fundamental practices exist but inconsistently applied
- [ ] Ad-hoc - practices vary significantly by engineer or project
- [ ] Evolving - practices adapting to delivery demands

### 22. Knowledge sharing
How does technical knowledge spread within your team?
- [ ] Structured approaches (docs, tech talks, pair programming)
- [ ] Informal but effective (ad-hoc conversations work well)
- [ ] Inconsistent (knowledge siloed with specific individuals)
- [ ] Developing (building better knowledge sharing practices)

### 23. Legacy system constraints
Do legacy systems or technical constraints significantly limit what your team can do?
- [ ] Yes, major constraints (old languages, platforms, limited tooling)
- [ ] Yes, moderate constraints (some limitations but workarounds exist)
- [ ] Minor constraints (mostly modern stack with some legacy elements)
- [ ] No significant constraints (modern tech stack)

## AI coding assistant integration

### 24. Anticipated integration challenges
What technical challenges do you anticipate with AI coding assistant adoption? Select all that apply.
- [ ] Ensuring AI suggestions meet our security requirements
- [ ] Integrating with existing code review processes
- [ ] Maintaining code quality standards
- [ ] Working with legacy codebases
- [ ] Network restrictions preventing tool access
- [ ] Tool compatibility with our tech stack
- [ ] Training AI tools on our specific codebase patterns
- [ ] Cost of API usage or token limits
- [ ] Other (specify): _________________

### 25. Success criteria
From a technical perspective, what would indicate successful AI coding assistant adoption? (Open text)

_________________

### 26. Technical context
Is there anything else about your technical environment that would help us design the right integration approach? (Open text - optional)

_________________

## Thank you for completing this questionnaire

Your assessment lead will review your responses alongside the delivery manager and individual engineer questionnaires to design your team's adoption approach.

If you have any questions, contact the assessment lead.
