> ALPHA
> This is a new service. Your [feedback](https://github.com/govuk-digital-backbone/aiengineeringlab/discussions) will help us to improve it.

# Context engineering for AI code assistants

Techniques for providing effective context to AI code assistants to maximise output quality and relevance.

## Contents

[Purpose](#purpose)

[Who this applies to](#who-this-applies-to)

[What is context engineering](#what-is-context-engineering)

[Context hierarchy](#context-hierarchy)

[Repository setup for AI assistance](#repository-setup-for-ai-assistance)

[Prompt engineering techniques](#prompt-engineering-techniques)

[Context window management](#context-window-management)

[Team context standards](#team-context-standards)

[MCP servers for government standards](#mcp-servers-for-government-standards)

[Common context patterns](#common-context-patterns)

[Troubleshooting poor AI output](#troubleshooting-poor-ai-output)

[Further reading](#further-reading)

## Purpose

AI code assistants are only as good as the context they receive. This playbook provides practical techniques for structuring your codebase, creating prompts and managing context to get the best results from AI tools.

Use this playbook to:

- improve the quality and relevance of AI-generated code
- reduce hallucinations and incorrect suggestions
- establish team standards for AI-assisted development
- optimise context window usage across different tools

## Who this applies to

This playbook applies to all technical personnel using AI coding assistants on government projects, including civil servants, contractors and suppliers with access to government code repositories or development environments.

## What is context engineering

Context engineering is the practice of deliberately structuring and providing information to AI assistants so they can generate accurate, relevant and useful outputs.

Unlike simple prompting (asking a question), context engineering considers:

| Aspect | Description |
|--------|-------------|
| What the AI knows | Information in its training data |
| What you provide | Files, instructions, examples in the current session |
| How you structure it | Organisation, prioritisation, format of context |
| What you exclude | Irrelevant information that wastes context space |

Good context engineering dramatically improves AI output quality while reducing iterations and corrections.

## Context hierarchy

AI assistants receive context from multiple sources. Understanding the hierarchy helps you provide context at the right level.

```
┌─────────────────────────────────────────────────────────┐
│  1. System and tool configuration (Most persistent)     │
│     Organisation rules, MCP servers, custom instructions│
├─────────────────────────────────────────────────────────┤
│  2. Repository context                                  │
│     README, architecture docs, .github/copilot, etc.    │
├─────────────────────────────────────────────────────────┤
│  3. Project and workspace context                       │
│     Open files, project structure, dependencies         │
├─────────────────────────────────────────────────────────┤
│  4. File context                                        │
│     Current file, imports, related files                │
├─────────────────────────────────────────────────────────┤
│  5. Immediate context (Most specific)                   │
│     Current prompt, cursor position, selection          │
└─────────────────────────────────────────────────────────┘
```

### Level 1: system and tool configuration

These are organisation-wide settings and rules configured in the AI tool.

You should:

- configure organisation coding standards
- set up Model Context Protocol (MCP) servers for government standards (Technology Code of Practice (TCoP), Web Content Accessibility Guidelines (WCAG), National Cyber Security Centre (NCSC))
- define prohibited patterns or security rules
- establish default behaviours

Example GitHub Copilot organisation settings:
```json
{
  "editor.inlineSuggest.enabled": true,
  "github.copilot.enable": {
    "*": true,
    "plaintext": false,
    "markdown": true
  }
}
```

Example Claude project instructions:
```
You are assisting with a UK Government digital service. Always:
- follow GOV.UK Design System patterns
- use accessible markup (WCAG 2.2 AA)
- apply Government Service Standard principles
- use British English spelling
```

### Level 2: repository context

This is documentation and configuration files that describe your codebase.

Key files to maintain:

| File | Purpose | AI usage |
|------|---------|----------|
| README.md | Project overview, setup, architecture | Primary context source |
| CONTRIBUTING.md | Coding standards, conventions | Style guidance |
| ARCHITECTURE.md | System design, patterns, decisions | Structural understanding |
| .github/copilot-instructions.md | Copilot specific guidance | Tool-specific rules |
| claude.md or CLAUDE.md | Claude-specific guidance | Tool-specific rules |
| cursor-rules.md | Cursor-specific rules | Tool-specific rules |
| docs/adr/ | Architecture Decision Records | Design rationale |

### Level 3: project and workspace context

This is the broader project structure visible to the AI.

You should:

- keep related files in logical directories
- use consistent naming conventions
- maintain up-to-date dependency files (package.json, requirements.txt and similar)
- include type definitions and interfaces

### Level 4: file context

This is the current file and its immediate relationships.

You should:

- write clear imports at the top of files
- include JSDoc or docstrings for functions
- use meaningful variable and function names
- add inline comments for complex logic

### Level 5: immediate context

This is your current prompt, selected code and cursor position.

You should:

- be specific in your requests
- select relevant code before prompting
- provide examples of desired output
- reference specific functions or files by name

## Repository setup for AI assistance

### Essential documentation

#### README.md structure for AI context

```markdown
# Project name

## Overview
[2 to 3 sentences describing what this project does and its purpose]

## Technology stack
- language: [for example, Java 17, TypeScript 5.x]
- framework: [for example, Spring Boot 3.2, Next.js 14]
- database: [for example, PostgreSQL 15]
- cloud: [for example, AWS, Azure, GCP]

## Architecture
[Brief description of architecture pattern, for example microservices, monolith, serverless]

See 'ARCHITECTURE.md' for detailed documentation.

## Project structure

src/
├── controllers/    # HTTP request handlers
├── services/       # Business logic
├── repositories/   # Data access
├── models/         # Domain entities
├── utils/          # Shared utilities
└── config/         # Configuration

## Coding standards
- [link to or summary of coding standards]
- [important patterns used in this project]
- [testing requirements]

## Getting started
[Setup instructions]

## Important patterns
- we use [pattern] for [purpose]
- all services follow [convention]
- error handling uses [approach]
```

#### ARCHITECTURE.md for complex projects

```markdown
# Architecture documentation

## System overview
[Diagram or description of system components]

## Design decisions

### Why [decision]
- context: [what situation led to this]
- decision: [what we chose]
- consequences: [trade-offs accepted]

## Component responsibilities

### [Component name]
- purpose: [what it does]
- interfaces: [how other components interact]
- patterns: [design patterns used]

## Data flow
[Description of how data moves through the system]

## Integration points
[External systems and how we integrate]
```

### Tool-specific configuration files

#### GitHub Copilot instructions

Create .github/copilot-instructions.md:

```markdown
# Copilot instructions for [project name]

## Code style
- use 2-space indentation for JavaScript and TypeScript
- use 4-space indentation for Java and Python
- prefer async and await over callbacks
- use meaningful variable names (no single letters except loop indices)

## Patterns to follow
- repository pattern for data access
- dependency injection for services
- factory pattern for complex object creation

## Patterns to avoid
- do not use var in JavaScript
- do not use raw SQL queries (use ORM)
- do not hardcode configuration values

## Testing
- all new functions require unit tests
- use [testing framework] for tests
- mock external dependencies

## Government standards
- all user-facing content must meet WCAG 2.2 AA
- follow GOV.UK Design System components
- use GOV.UK Frontend for styling
```

#### Claude project instructions

Create CLAUDE.md in repository root:

```markdown
# Claude context for [project name]

## Project overview
This is a [type] service for [department or purpose]. It handles [main functions].

## Important conventions
- British English for all user-facing text
- ISO 8601 dates (YYYY-MM-DD)
- metric units throughout

## Architecture notes
- monorepo structure with packages in /packages
- shared types in /packages/common
- API follows REST conventions with HATEOAS

## Important context
- this service processes [data type]. Never log PII.
- all endpoints require authentication except /health
- rate limiting is handled at API gateway level

## Common tasks

If you are asked to create a new endpoint, follow these steps.

1. Add route in /src/routes.
2. Create controller in /src/controllers.
3. Add service logic in /src/services.
4. Write tests in /__tests__.
5. Update OpenAPI spec in /docs/api.

## What not to do
- never disable TypeScript strict mode
- never commit secrets or API keys
- never bypass input validation
```

## Prompt engineering techniques

### Technique 1: be specific and explicit

Poor prompt:
```
Write a function to validate input
```

Better prompt:
```
Write a TypeScript function that validates a UK National Insurance number. It should:
- accept a string parameter
- return { valid: boolean, formatted: string | null }
- be in a valid format: Two letters, six digits, one letter (for example, AB123456C)
- handle lowercase input
- trim whitespace
```

### Technique 2: provide examples

Prompt with examples:
```
Convert this function to use async and await instead of callbacks.

Example of what I want:
// Before
function getData(callback) {
  fetch(url).then(res => callback(null, res)).catch(err => callback(err));
}

// After
async function getData() {
  const res = await fetch(url);
  return res;
}

Now convert this function:
[paste function]
```

### Technique 3: specify constraints

```
Create a React component for a date picker that:
- must work without JavaScript (progressive enhancement)
- must be accessible (WCAG 2.2 AA)
- must use GOV.UK Design System styling
- has no external dependencies beyond React
- supports the date range: 1900-01-01 to today
- is in the locale: en-GB
```

### Technique 4: request specific output format

```
Analyse this code for security vulnerabilities.

Output format:
## Vulnerability: [Name]
- severity: [critical, high, medium, or low]
- location: [file:line]
- description: [what the issue is]
- fix: [how to remediate]

Code to analyse:
[paste code]
```

### Technique 5: chain-of-thought prompting

```
I need to refactor this database query for performance. 

1. First, explain what the current query does step by step.
2. Identify the performance bottlenecks.
3. Propose optimisations with reasoning.
4. Show the refactored query.
5. Explain how to verify the improvement.

Current query:
[paste query]
```

### Technique 6: role-based prompting

```
You are a senior security engineer reviewing code for a government service 
that handles sensitive personal data.

Review this authentication code and identify:
- security vulnerabilities
- OWASP top 10 violations
- compliance issues for UK government systems

Be thorough and assume hostile users.

[paste code]
```

## Context window management

### Understanding context limits

Each AI tool has a context window limit. This is the maximum amount of text it can consider at one time, including your prompts, the code you share, conversation history, and system instructions.

| Tool | Approximate context window | Notes |
|------|---------------------------|-------|
| GitHub Copilot | Varies by model | Depends on the underlying model selected |
| Claude Code | 200,000 tokens (Claude 4.5); 1,000,000 tokens (Claude Opus 4.8, 4.7, 4.6) | Older Claude models had smaller windows |
| Amazon Q Developer | Varies by feature | Inline completion uses a smaller local window |
| Gemini Code Assist | 1,000,000 tokens (Gemini 1.5 and later) | Gemini 1.0 Pro had a 32,768-token window |

As a rule of thumb, 1 token is roughly 4 characters, or three-quarters of a word in English.

Teams using older models or models deployed on-premises may have significantly smaller context windows — sometimes under 32,000 tokens. See [Working with constrained context windows](working-with-constrained-context-windows.md) for detailed guidance on adapting your workflow in these situations.

### Strategies for large codebases

#### Strategy 1: selective file inclusion

Instead of opening entire codebase, explicitly include relevant files:

```
# In chat interfaces
I am working on the UserService. Here are the relevant files:

1. UserService.ts (the file I am modifying):
[paste content]

2. UserRepository.ts (data access):
[paste content]

3. User.ts (domain model):
[paste content]

Question: How should I add soft delete functionality?
```

#### Strategy 2: summarise distant context

For large systems, provide summaries rather than full code:

```
System context:
- this is an order processing system with 50 and more microservices
- services communicate via Apache Kafka events
- current service: payment-processor
- upstream: order-service (sends OrderCreated events)
- downstream: notification-service (expects PaymentProcessed events)

I need to add retry logic for failed payments. Here is the current handler:
[paste specific code]
```

#### Strategy 3: use reference files

Create context files that summarise important information:

```markdown
<!-- .ai-context/payment-domain.md -->
# Payment domain context

## Events
- orderCreated: { orderId, amount, currency, customerId }
- paymentProcessed: { orderId, paymentId, status, timestamp }
- paymentFailed: { orderId, reason, retryable }

## Business rules
- maximum 3 retry attempts for retryable failures
- exponential backoff: 1min, 5min, 30min
- non-retryable: CARD_DECLINED, FRAUD_DETECTED
- retryable: TIMEOUT, SERVICE_UNAVAILABLE

## Current integrations
- Stripe for card payments
- GoCardless for Direct Debit
```

#### Strategy 4: progressive disclosure

Start with high-level context, then drill down:

```
Prompt 1: 'I am adding a new payment provider. Here is our current architecture:
[paste architecture summary]. What integration points do I need?'

Prompt 2: 'Good. Now here is the PaymentGateway interface we use:
[paste interface]. Can you suggest the implementation structure?'

Prompt 3: 'Here is my first attempt at the implementation:
[paste code]. Review and suggest improvements.'
```

## Team context standards

### Establishing team conventions

Create a shared document defining how your team uses AI context:

```markdown
# AI assistant usage standards

## Required documentation

All repositories must include:

- [ ] README.md with project overview and structure
- [ ] Tool-specific instructions file (.github/copilot-instructions.md, CLAUDE.md)
- [ ] ARCHITECTURE.md for services with 3 or more components

## Prompt standards

When asking AI for code generation you should:

- always specify the language and version
- reference our coding standards document
- include relevant interface or type definitions
- specify testing requirements

## Context hygiene
You should:
- review AI context files quarterly
- update tool instructions when patterns change
- remove outdated architectural decisions
- keep examples current with latest conventions

## Security
You should:
- never paste code containing credentials
- use placeholders for sensitive values
- review AI output for accidental secret inclusion
```

### Code review checklist for AI-assisted code

```markdown
## AI-generated code review checklist

### Context verification
- [ ] Was appropriate context provided to the AI
- [ ] Does the code match our project patterns
- [ ] Are there signs of hallucinated APIs or methods

### Quality checks
- [ ] Does the code compile or run without errors
- [ ] Are all dependencies valid and approved
- [ ] Do tests pass and cover important paths
- [ ] Is the code readable and maintainable

### Security checks
- [ ] No hardcoded credentials or secrets
- [ ] Input validation present where needed
- [ ] No obvious security vulnerabilities
- [ ] Follows secure coding standards

### Standards compliance
- [ ] Follows team coding conventions
- [ ] Meets accessibility requirements (if UI)
- [ ] Documentation is adequate
```

## MCP servers for government standards

Model Context Protocol (MCP) servers provide persistent context about standards and guidelines. The programme maintains MCP servers for important government standards.

### Available MCP servers

| MCP server | Standards covered | Use case |
|------------|-------------------|----------|
| GOV.UK Standards | TCoP, Service Standard, Design System | Service development |
| Accessibility | WCAG 2.2, GOV.UK accessibility guidance | UI/UX development |
| Security | NCSC principles, secure coding | Security review |
| API Standards | GDS API technical standards | API development |

### Configuring MCP servers

For Claude Code, add to your configuration:

```json
{
  "mcpServers": {
    "gov-uk-standards": {
      "command": "npx",
      "args": ["-y", "@aieng/mcp-gov-uk-standards"]
    },
    "wcag": {
      "command": "npx",
      "args": ["-y", "@aieng/mcp-wcag"]
    }
  }
}
```

### Using MCP context in prompts

Once configured, reference standards naturally:

```
Create a form component for collecting user addresses.
Follow GOV.UK Design System patterns and ensure WCAG 2.2 AA compliance.
```

The MCP server provides relevant standards context automatically.

## Common context patterns

### Pattern 1: the interface-first approach

Provide interfaces before requesting implementations:

```typescript
// Give the AI this context first:
interface PaymentProcessor {
  processPayment(payment: Payment): Promise<PaymentResult>;
  refund(paymentId: string, amount: Money): Promise<RefundResult>;
  getStatus(paymentId: string): Promise<PaymentStatus>;
}

interface Payment {
  amount: Money;
  currency: Currency;
  method: PaymentMethod;
  metadata?: Record<string, string>;
}

// Then ask:
// "Implement PaymentProcessor for Stripe integration, following our 
// error handling patterns from the existing OrderService."
```

### Pattern 2: the test-first approach

Provide tests as specification:

```typescript
// Give the AI the tests:
describe('NationalInsuranceValidator', () => {
  it('accepts valid NI numbers', () => {
    expect(validate('AB123456C')).toEqual({ valid: true, formatted: 'AB 12 34 56 C' });
  });
  
  it('handles lowercase', () => {
    expect(validate('ab123456c')).toEqual({ valid: true, formatted: 'AB 12 34 56 C' });
  });
  
  it('rejects invalid formats', () => {
    expect(validate('invalid')).toEqual({ valid: false, formatted: null });
  });
  
  it('rejects administrative prefixes', () => {
    // BG, GB, KN, NK, NT, TN, ZZ are not valid prefixes
    expect(validate('BG123456A')).toEqual({ valid: false, formatted: null });
  });
});

// Then ask:
// "Implement the validate function to pass these tests"
```

### Pattern 3: the example-driven approach

Provide concrete examples of similar patterns:

```
Here is how we implement repositories in this project:

// UserRepository.ts
@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async create(data: CreateUserDto): Promise<User> {
    return this.prisma.user.create({ data });
  }
}

Now create OrderRepository following the same pattern, with these methods:
- findById
- findByCustomerId (returns array)
- create
- updateStatus
```

### Pattern 4: the constraint-driven approach

Specify what not to do:

```
Refactor this function to improve performance.

Constraints:
- do not change the function signature
- do not add new dependencies
- do not use recursion (call stack limits)
- must maintain backward compatibility
- must keep existing error messages (used by monitoring)

Current function:
[paste code]
```

## Troubleshooting poor AI output

| Problem | Likely cause | Solution |
|---------|--------------|----------|
| Wrong language or framework | Insufficient project context | Add README with tech stack |
| Outdated APIs | AI training data age | Provide current API documentation |
| Wrong patterns | No coding standards context | Add tool instruction files |
| Incomplete code | Context window exhaustion | Reduce context, be more specific |
| Hallucinated methods | Unfamiliar library | Provide interface or type definitions |
| Inconsistent style | No style guidance | Add coding standards to context |
| Security issues | No security context | Use security-focused prompting |
| Model forgets earlier instructions | Context overflow on small-window model | Start a new session, use summaries |
| Suggestions drift from project patterns | Silent context truncation | Re-provide key constraints in a new session |

For detailed guidance on working with models that have limited context windows, see [Working with constrained context windows](working-with-constrained-context-windows.md).

## Further reading

### Internal resources

[AI-SDLC playbook](ai-sdlc-playbook.md) covers integrating AI into development lifecycles.

[Model selection playbook](model-selection.md) covers choosing the right model for tasks.

[Working with constrained context windows](working-with-constrained-context-windows.md) covers adapting workflows for models with smaller context windows.

[Prompt library](../prompt-library/) provides reusable prompt patterns.

[Guardrails base](../governance/guardrails-base.md) covers security boundaries.

### External resources

[Anthropic Prompt Engineering Guide](https://docs.anthropic.com/claude/docs/prompt-engineering)

[GitHub Copilot documentation](https://docs.github.com/en/copilot)

[GOV.UK Design System](https://design-system.service.gov.uk/)

[GDS way coding standards](https://gds-way.cloudapps.digital/)
