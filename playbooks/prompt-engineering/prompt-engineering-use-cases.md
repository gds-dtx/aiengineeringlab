> ALPHA
> This is a new service. Your [feedback](https://github.com/gds-dtx/aiengineeringlab/discussions) will help us to improve it.

# Prompt engineering for common development tasks

Real-world examples of using AI assistants for common development tasks - writing functions, refactoring code and debugging.

## Purpose

This guide provides practical, step-by-step workflows for using AI assistants in your daily development work. Learn how to write effective prompts to iteratively build features, refactor messy code and debug issues effectively.

Use this guide to learn how to prompt AI for:

- writing new functions using iterative refinement workflows
- refactoring legacy code systematically and safely
- debugging issues by providing structured context to AI
- recognising when AI is not helping and what to do about it
- reviewing AI-generated code against quality standards

## Who this applies to

This guide applies to engineers working on government projects:

- engineers building new features
- engineers maintaining legacy systems
- anyone debugging production issues
- code reviewers assessing AI-generated code


### Use case 1: 'I need to write a new function'

The scenario: you are building a new feature. The requirements are clear-ish, but you know from experience that 'clear-ish' means you will discover edge cases as you go.

This is where the iterative approach shines. Do not try to get perfect code in one prompt. Instead, build it up systematically, switching roles to get different perspectives.

The iterative refinement workflow follows these rounds.

#### Round 1: get the basics working

Start with reverse prompting to uncover what you might have missed:
```
Example prompt:

'Help me write an async function to update user profile information including email, phone, and address.

This is critical for production code that handles sensitive user data.

Before you start, ask me questions about:
- validation requirements
- error handling expectations  
- integration points
- performance constraints
- security considerations

Context:
- Python 3.11 with FastAPI
- PostgreSQL with SQLAlchemy ORM
- we use async and await patterns throughout
- here is an example of our existing user creation endpoint:
[paste example showing your patterns]

Act as a senior backend engineer.'
```

What happens: the AI asks clarifying questions. You answer them. This surfaces requirements you had not explicitly thought about like rate limiting, audit logging, or what happens if the email is already taken by another user.

Now you get a basic implementation that actually addresses real requirements.

#### Round 2: layer on validation

Do not try to do everything at once. Now that the basic logic works, add validation:

Example prompt:
```
'Now add comprehensive input validation using Pydantic models:
- email: valid format, deliverability check
- phone: international format (E.164), optional field
- address: structured fields (line1, line2, city, postcode)
- required vs optional fields

Return clear validation errors with field-level detail.'
```

#### Round 3: add proper error handling

Example prompt:
```
'Add comprehensive error handling for:
- database connection failures
- duplicate email addresses (unique constraint violation)
- invalid data formats
- transaction rollbacks

Use specific exception types and meaningful error messages that do not expose internal implementation details.'
```

#### Round 4: security review - switch roles

This is when changing roles becomes powerful.

Example prompt:
```
'Act as a security expert reviewing this function.

Identify vulnerabilities:
- input sanitisation issues
- SQL injection risks
- data exposure in error messages
- authentication and authorisation gaps

Rate each by severity and provide secure refactored code.'
```

Note: the AI might flag things you missed. A security expert role often catches that you are returning too much information in error messages, or that you are not properly sanitising inputs even though Pydantic is handling validation.

#### Using few-shot for consistency

If you have got existing code that follows your team's patterns, use it:

Example prompt:
```
'Here are 2 existing endpoints from our codebase:

[Example 1: User creation endpoint]
[Example 2: Password update endpoint]

Notice our patterns:
- async and await style
- error handling with custom exceptions
- structured logging format
- docstring style (Google format)
- response format

Now write the profile update function following these same patterns.'
```

This works because you get code that looks like it was written by your team, not generic AI code. It uses your error handling patterns, your logging approach and your response structure.

You should avoid:

- trying to get everything in one prompt by asking 'Write a complete, production ready, secure, well tested, documented function that does X' as this results in generic code that does not fit your context
- not providing examples as this results in code that does not match your style and needs extensive refactoring
- accepting code without understanding it - if you cannot explain what every line does, iterate until you can

The correct iterative approach:

- builds basics first
- layers on complexity
- switches roles for different perspectives
- understands before moving to the next round

### Use case 2: refactoring complex code

The scenario: you have inherited a 300 line function that does everything. It is untested, undocumented and somehow critical to production. Sound familiar?

AI excels at systematic refactoring, but you need to guide it through the process methodically.

#### The 3-step refactoring approach

Step 1: analyse (do not touch the code yet).

Example prompt:
```
'Act as a code reviewer analysing this function:

[paste the monolithic function]

Context:
- this handles user authentication and session creation
- it has been in production for 3 years
- we have basic integration tests but no unit tests
- performance has degraded as traffic increased

Identify:
- code smells and anti-patterns
- responsibilities this function has (it should have one)
- complexity issues
- testability problems
- performance concerns

Do not refactor yet - just analyse and explain what is wrong.'
```

You should do the analysis first as you need to understand what you are dealing with before you start changing it. The AI will spot things like:

- the function does 5 different things
- mixed business logic with data access
- inconsistent error handling
- synchronous calls that could be async
-duplicated logic that could be extracted

#### Step 2: plan (create a refactoring strategy)

Example prompt:
```
'Based on your analysis, create a refactoring plan:

1. What patterns should we apply? (for example, repository pattern, dependency injection)
2. What is the order of changes? (safest to riskiest)
3. How do we maintain backwards compatibility?
4. What new tests do we need?
5. What are the risks at each step?

We need to do this incrementally - we cannot break production.'
```

The AI gives you a step-by-step plan.

1. Extract database operations into a repository class.
2. Extract validation into separate validator.
3. Extract session management into a service.
4. Add dependency injection.
5. Make database operations async.
6. Add comprehensive error handling.

#### Step 3: execute (one step at a time)

Now refactor incrementally.

Example prompt:
```
'Let us implement step 1 from your plan: extract database operations into a repository class.

Show me:
- the new repository class
- the refactored function using the repository
- what changed and why
- how to test this in isolation
- how this maintains backwards compatibility with existing callers'
```

After implementing step 1, test it. Make sure nothing broke. Then move to step 2.

#### Using chain of thought for complex refactoring

Example prompt:
```
'I want to refactor this class [paste code]. Let us think through it step-by-step:

1. What are all the responsibilities of this class?
2. Which responsibilities violate single responsibility principle?
3. How could we separate these into focused classes?
4. What design patterns would help?
5. How would dependency injection work here?
6. What is the migration path from old to new?

Walk me through your reasoning, then show the refactored architecture.'
```

This surfaces the thought process, helping you understand not just the 'what' but the 'why' of the refactoring.

Common refactoring mistakes include:

- refactoring without tests so you do not know if you broke something
- trying to refactor everything at once with high risk of introducing bugs
- refactoring without understanding the original behaviour, meaning you might change functionality unintentionally

The safe approach to follow includes:

- analysing first
- planning incrementally
- testing after each step
- keeping backwards compatibility
- deploying gradually

### Use case 3: 'Something's broken - help me debug'

The scenario: your code worked yesterday. Now it does not. The error message is cryptic. You have been staring at it for 30 minutes. Time to bring in a systematic debugging partner.

#### The systematic debugging approach

Provide complete context - do not just paste the error.

Example prompt:
```
'I am getting this error:

[full error message and stack trace]

In this code:
[relevant code - not your entire codebase, but enough context]

Expected behaviour: user submits form, gets confirmation email
Actual behaviour: form submits but no email, logs show this error

Environment:
- Python 3.11, FastAPI, Celery for background tasks
- Redis for task queue
- GOV.UK Notify for email sending
- this worked yesterday, broke after we updated Celery version

Recent changes:
- updated Celery from 5.2.7 to 5.3.4
- added rate limiting to email sending
- changed Redis connection pool settings

Act as a senior debugger. What is likely causing this?'
```

Why this works: you have given the AI the symptoms, context, timeline and expected vs actual behaviour. This is exactly what you would tell a human colleague.

The AI will think through possibilities systematically, suggest tests for each hypothesis and help you identify the root cause. For complex issues, ask it to use chain of thought reasoning: 'Walk me through 5 possible causes and how to test each one.'

#### The exploratory testing approach

Before bugs happen, find them.

Example prompt:
```
'Act as a QA engineer trying to break this function:

[function code]

List edge cases and error conditions that could cause problems:
- boundary values
- null or empty inputs
- type mismatches
- concurrent access
- resource exhaustion  
- network failures
- invalid data combinations

For each, explain how it would fail and how to handle it.'
```

Note: run this before deployment. The AI will find edge cases you missed.

Common debugging mistakes include:

- jumping to solutions without understanding the problem: 'just make it work' leads to band aid fixes
- not providing enough context: 'why does not this work?' [pastes one line]
- ignoring the AI's questions: if it asks for logs, there is a reason

The correct systematic approach:

- provides complete context
- uses chain of thought to explore hypotheses
- tests each hypothesis
- understands the fix before applying it
- adds tests to prevent recurrence

### When AI gets it wrong (and what to do about it)

AI-generated code is not automatically good code. Understanding when and how AI fails helps you catch problems early and know when to step away.

#### Security vulnerabilities

The problem: AI might suggest code that works perfectly in testing but contains security vulnerabilities only visible with proper security scanning.

Example scenario: AI suggests using regex for input validation. The code works perfectly in testing, but when run through Open Web Application Security Project (OWASP) and SonarQube security checks, it flags a ReDoS (Regular Expression Denial of Service) vulnerability.

The lesson: AI does not know your security standards. Always run generated code through your organisation's security checks, for example:

- SonarCloud for code quality
- OWASP Dependency Check for Common Vulnerabilities and Exposures (CVE) vulnerabilities
- your organisation's standard security scanning tools

Treat AI-generated code the same way you would treat code from any new team member: review it, test it, scan it.

#### The loop of despair

The problem: AI suggests a fix. It does not work. You ask for another fix. That makes it worse. You keep iterating, and suddenly you are 20 minutes into solving what should have been a 2-minute problem.

You may be in the loop if:

- the AI's suggestions are getting increasingly complex
- you are not understanding the changes anymore
- the code is drifting further from your codebase patterns
- you have been iterating for more than 3 or 4 rounds

What to do: stop. Step away from the AI. Look at the actual problem with fresh eyes. Often, you will spot a simple solution you missed because you were too focused on making the AI's approach work.

The principle: if the AI is not helping after a few iterations, it is not going to. Reset your approach.

#### When to skip AI entirely

Some tasks are faster without AI.

Quick tasks your IDE handles better include:

- simple variable renames (use IDE refactoring)
- basic formatting (use your formatter)
- obvious typo fixes

Tasks requiring deep understanding include:

- hotfixes where you need to understand every character
- authentication or payment processing logic
- anything touching sensitive data handling
- critical security-related code

You may already know exactly what to do, for example:

- simple logic you have written dozens of times
- standard patterns you know by heart
- quick bug fixes in familiar code

Remember: AI is a tool, not a requirement. Sometimes the simple approach is better than the AI-powered one. Use your judgment about when AI adds value and when it is just adding overhead.

#### Quality gate integration

Best practice: integrate AI usage with your existing quality processes.

Before committing AI-generated code, you should check that:

- the code passes all unit tests
- the security scan shows no new vulnerabilities
- the code follows team style guidelines
- you understand every line
- the documentation is updated
- new tests are added for new functionality
- performance impact is assessed
- accessibility requirements are met (if UI code)

The principle: AI-generated code goes through the same quality gates as human-written code. No shortcuts.
