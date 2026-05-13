> ALPHA
> This is a new service. Your [feedback](https://github.com/govuk-digital-backbone/aiengineeringlab/discussions) will help us to improve it.

# Prompt engineering for code documentation

How to write effective prompts to generate and maintain high-quality code documentation using AI assistants.

## Purpose

Good documentation is essential for maintainable code, but it is often neglected. This guide teaches you how to write effective prompts to get AI assistants to generate comprehensive, high-quality documentation efficiently.

Use this guide to learn how to prompt AI for:

- different documentation levels (inline comments, docstrings, README files, API documentation)
- appropriate documentation for different audiences
- maintaining and updating documentation as code evolves
- automating documentation generation with tools like Sphinx
- avoiding common documentation mistakes

## Who this applies to

This guide applies to engineers responsible for code maintainability:

- developers documenting their code
- technical writers working with development teams
- team leads establishing documentation standards
- open-source contributors on government projects


### The documentation hierarchy

Documentation exists at multiple levels. Each serves a different purpose. The following sections show you how to prompt AI to generate each type.

### Level 1: inline comments - use sparingly

The first rule of comments: your code should explain what it does. Comments explain why.

Example prompt for adding comments:
```
Review this function and add inline comments only where the logic is not self-evident:

[paste function with complex business logic]

You should:
- not comment what is obvious from the code
- explain why decisions were made, not what the code does
- comment complex algorithms or non-obvious business rules
- highlight behaviour that might surprise
- explain workarounds for known issues

Remove any existing comments that just restate the code.
```

Example of good vs bad comments:

```python
# Bad: States the obvious
user_count = len(users)  # Get the count of users
total = sum(prices)      # Sum the prices

# Good: Explains why
user_count = len(users)  # Batch size limited to 1000 per API constraint
total = sum(prices)      # VAT calculated separately to match legacy system

# Bad: Explains what (code already does this)
# Loop through users and send email to each
for user in users:
    send_email(user)

# Good: Explains why and how it handles edge cases
# Process users in batches to avoid overwhelming email service
# If any batch fails, we continue with next (failures logged for retry)
for batch in chunk(users, size=100):
    try:
        send_batch_emails(batch)
    except EmailServiceError:
        log_for_retry(batch)
        continue
```

Prompt for comment review:
```
'Analyse the comments in this code:

[paste code with comments]

Identify:
- comments that add no value (just restate code)
- missing comments where logic is unclear
- outdated comments that do not match the current code
- comments that should be moved to docstrings
- places where refactoring would eliminate need for comments

Provide specific suggestions for improvements.'
```

### Level 2: docstrings - the primary documentation

Docstrings are how engineers understand your functions without reading the implementation.

Example prompt for generating comprehensive docstrings:
```
Add Google-style docstrings to all functions and classes in this module:

[paste code]

For each function, include:
- one-line summary (imperative mood: 'Calculate', not 'Calculates')
- detailed description of what it does and why it exists
- args with types and clear descriptions
- returns with type and description
- raises listing all exceptions (when and why they are raised)
- examples showing typical usage
- notes for important behaviour or gotchas

For classes, include:
- class purpose and responsibility
- attributes with types
- usage example
- any important lifecycle considerations
```

Example prompt for converting between docstring formats:
```
Convert these docstrings from Google style to NumPy style:

[paste code with Google-style docstrings]

Maintain all information while following NumPy conventions.
Ensure compatibility with Sphinx autodoc.
```

### Level 3: README files - project overview

Example prompt for creating a comprehensive README:
```
Create a comprehensive README for this module:

[describe module purpose and components]

The module handles:
- user authentication and session management
- integration with GOV.UK Verify
- OAuth2 for API access
- audit logging for security events

Include sections for:
- clear description of what the module does (2 to 3 sentences)
- why it exists (the problem it solves)
- installation instructions (dependencies, setup steps)
- quick start example (get something working in 5 minutes)
- common use cases with code examples (3 to 4 scenarios)
- configuration options (environment variables, config files)
- troubleshooting section (common issues and solutions)
- testing instructions (how to run tests locally)
- contributing guidelines (for team members)
- security considerations (for government service context)

Use GitHub Flavoured Markdown (GFM) with appropriate headings, code blocks, and badges where relevant.
```

### Level 4: API documentation

For APIs, documentation is part of the product.

Example prompt for generating API documentation:
```
Generate OpenAPI and Swagger documentation for these FastAPI endpoints:

[paste endpoint code]

Make sure the documentation includes:
- clear endpoint descriptions (what it does, why it exists)
- request schema with example payloads
- response schemas for success (200, 201) and all error cases (400, 401, 403, 404, 500)
- example requests showing typical usage
- authentication requirements
- rate limiting information
- deprecation warnings if applicable

Write descriptions in plain English suitable for both technical and non-technical stakeholders.
```

### Maintaining documentation

Documentation rots faster than code. Keep it current.

Example prompt for auditing documentation:
```
Review these docstrings against the current code:

Code:
[paste current code]

Docstrings:
[paste existing docstrings]

Identify:
- parameters that were added, removed or renamed
- changed return types
- new exceptions being raised
- changed behaviour not reflected in description
- examples that no longer work
- outdated notes or warnings

Provide updated docstrings that match the current implementation.
```

Example prompt for batch updates after refactoring:
```
After refactoring, update all documentation in this module:

[paste refactored code with old docstrings]

Update:
- function signatures (parameter names, types, defaults)
- parameter descriptions (reflect new behaviour)
- return value descriptions
- examples (ensure they work with new implementation)
- notes about changed behaviour
- cross-references to renamed functions

Maintain the same docstring style (Google format).
Flag any examples that are now invalid.
```

### Automating documentation with Sphinx

Example prompt for setting up Sphinx documentation:
```
I want to generate HTML documentation from my code using Sphinx.

Current setup:
- Python 3.11 project with Google-style docstrings
- multiple modules: auth, applications, notifications
- FastAPI for API endpoints

Help me complete these steps:

1. Review my docstrings for Sphinx compatibility.
2. Create a Sphinx configuration (conf.py).
3. Set up the documentation structure (index.rst, module pages).
4. Configure autodoc to generate API documentation.
5. Add a Makefile for building docs.
6. Provide commands to generate and serve the documentation locally.

Include extensions for:
- autodoc (API documentation from docstrings)
- Napoleon (Google and NumPy style support)
- Mermaid (for diagrams)
- OpenAPI (for FastAPI endpoint documentation)
```

### Common documentation mistakes

Mistakes to avoid.

Documenting obvious things:
```python
# Bad
def add(a, b):
    """Add two numbers together."""
    return a + b
```

Missing critical context:
```python
# Bad - no mention of side effects
def process_payment(amount):
    """Process a payment."""
```

Other common mistakes:

- outdated examples - documentation says one thing, code does another
- no examples - engineers learn by example, not just descriptions

The good documentation approach:

- explain why and when, not just what
- include realistic examples
- document edge cases and gotchas
- keep it current as code evolves
- add context about system integration
- warn about security and Personally Identifiable Information (PII) considerations
