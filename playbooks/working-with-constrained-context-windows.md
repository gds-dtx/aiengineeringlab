> ALPHA
> This is a new service. Your [feedback](https://github.com/govuk-digital-backbone/aiengineeringlab/discussions) will help us to improve it.

# Working with constrained context windows

Practical guidance for engineers working with AI models that have limited context capacity, including older models and those available under procurement or data residency constraints.

## Purpose

Not all teams can access the latest large-context models. Government departments may be constrained by procurement timelines, cost controls, data residency requirements, or the availability of on-premises model deployments. In these situations, engineers may work with models that have smaller context windows under 32,000 tokens. These are significantly smaller than the windows on current flagship models, which range from 200,000 to 1 million tokens.

## Who this applies to

This guide applies to engineers, technical leads and delivery teams in UK government organisations who are using AI coding assistants under any of the following conditions:

- working with models procured through older or fixed contracts
- using self-hosted or on-premises model deployments
- operating under data residency rules that restrict access to current cloud-hosted models
- managing tight cost budgets that make smaller models more appropriate for routine tasks
- working in air-gapped or restricted environments

## Contents

[Understanding context window sizes](#understanding-context-window-sizes)

[Recognising when a task exceeds your context capacity](#recognising-when-a-task-exceeds-your-context-capacity)

[How tools behave when context overflows](#how-tools-behave-when-context-overflows)

[Techniques for maximising constrained context](#techniques-for-maximising-constrained-context)

[Breaking tasks into context-appropriate chunks](#breaking-tasks-into-context-appropriate-chunks)

[Fallback strategies when switching to a smaller context model](#fallback-strategies-when-switching-to-a-smaller-context-model)

[Context window size as a model selection factor](#context-window-size-as-a-model-selection-factor)

[Trade-offs summary](#trade-offs-summary)

[Quick reference: adapting your workflow](#quick-reference-adapting-your-workflow)

[Further reading](#further-reading)

## Understanding context window sizes

A context window is the maximum amount of text an AI model can consider at one time. This includes your prompt, any files or code you provide, the model's previous responses in the conversation, and any system instructions.

When the total input exceeds the context window, the tool needs to drop something. The tool and model determine what is dropped, and this is not always obvious.

### Common context window sizes

| Category | Model examples                     | Context window (tokens) | Approximate character limit |
|----------|------------------------------------|-------------------------|-----------------------------|
| Limited | GPT-4                              | 32,768 | ~128,000 characters |
| Large | GPT-4o, Claude 4.5  | 128,000 to 200,000 | ~512,000 to 800,000 characters |
| Very large | GPT-4.1, Claude Opus 4.6, Gemini 2.5 Pro | 1,000,000 | ~4,000,000 characters |

As a rule of thumb, 1 token is approximately 4 characters, or about three-quarters of a word in English. A typical source code file of 500 lines might use between 3,000 and 8,000 tokens depending on how verbose the language is.

### Tokens consumed by common inputs

| Input type | Approximate token cost |
|------------|------------------------|
| Single source code file (300 lines) | 2,000 to 4,000 tokens |
| Single source code file (1,000 lines) | 8,000 to 15,000 tokens |
| README.md with architecture notes | 500 to 2,000 tokens |
| System prompt or tool instructions | 200 to 1,000 tokens |
| A single detailed question prompt | 100 to 500 tokens |
| Conversation history (10 exchanges) | 2,000 to 6,000 tokens |
| API interface definition (50 methods) | 3,000 to 5,000 tokens |

Under a 4,096-token model, a single 300-line file, a system prompt, and a question prompt would exhaust the available context.

## Recognising when a task exceeds your context capacity

### Signs that context is insufficient

You may be approaching or exceeding your model's context limit when:

- the model gives vague or non-specific answers about code you have shared
- the model appears to have forgotten earlier parts of the conversation
- suggestions are inconsistent with code you provided earlier in the session
- the model references functions or patterns that are not in the files you included
- the model produces code that contradicts earlier instructions you gave
- the model returns a context limit error or refuses to respond

### Estimating your token budget

Before starting a session, estimate how much context your inputs will consume.

1. Check the model's documented context window size.
2. Subtract your system prompt and tool instructions (typically 200 to 1,000 tokens).
3. Subtract any persistent conversation history from previous exchanges.
4. What remains is your working budget for code, files, and questions.

For a model with a 16,384-token window:

- subtract 500 tokens for system prompt
- subtract 2,000 tokens for conversation history
- you have approximately 13,884 tokens for code and questions
- that is roughly 3 to 4 source code files of average size

If your task requires more files than your budget allows, you need to apply the techniques in this guide.

### When to split a session

Start a new conversation when:

- you have moved to a different part of the codebase or a different problem
- the model is noticeably forgetting earlier context
- you have completed a discrete task and are beginning a new one
- the conversation has run for more than 15 to 20 exchanges

## How tools behave when context overflows

The way a tool handles context overflow affects how you notice the problem and how you should respond.

### GitHub Copilot

#### How it behaves

Copilot uses a sliding window approach. When context is full, Copilot silently drops the oldest parts of the conversation. The model continues to respond, but may give answers that are inconsistent with instructions or files you shared earlier in the session.

#### How to detect it

Suggestions start to drift from your project patterns. The model ignores constraints you specified at the start of the session.

#### What to do

Start a new chat session. Re-provide the most critical context at the start of the new session.

### Claude Code

#### How it behaves

Claude Code tracks context usage and warns you as you approach the limit. It may suggest compacting the conversation to summarise earlier exchanges. If the limit is reached, it asks you to start a new session.

#### How to detect it

You will see explicit warnings in the interface. The `/compact` command summarises the conversation to free up space.

#### What to do

Use `/compact` to summarise the conversation history before the limit is reached. On older Claude models accessible via Application Programming Interface (API) with smaller windows, the model may return a `context_length_exceeded` error.

### Gemini Code Assist

#### How it behaves

Behaviour depends on the underlying model. Newer Gemini models (3.0 Pro and later) have very large context windows and are unlikely to be exceeded in normal use. Older Gemini models have a 32,768-token window. When context is full, the API typically returns an error rather than silently truncating.

#### How to detect it

An error message will appear in the chat interface, or an API error response will contain a context length message.

#### What to do

Reduce the amount of code you are sharing. Use summarisation techniques to compress earlier context before retrying.

### Amazon Q Developer

#### How it behaves

Amazon Q's context handling varies by feature. The inline completion feature uses a smaller local context window focused on the current file. The chat feature has a larger but still limited window. Context overflow typically produces lower-quality suggestions rather than explicit errors.

#### How to detect it

Suggestions become less relevant or start to ignore the broader patterns in your codebase.

#### What to do

For chat, start a new session and re-provide key context. For inline completion, ensure the most relevant files are open in your integrated development environment (IDE).

## Techniques for maximising constrained context

When your context budget is limited, every token counts. Apply these techniques to get the most from a constrained window.

### Technique 1: aggressive summarisation

Replace large blocks of context with concise summaries.

Instead of including a full 500-line service file, provide a structured summary:

```
PaymentService summary:
- processes card and direct debit payments via Stripe and GoCardless adapters
- exposes: processPayment(payment), refund(paymentId, amount), getStatus(paymentId)
- uses exponential backoff: 3 retries at 1min, 5min, 30min
- throws PaymentException for non-retryable errors (FRAUD_DETECTED, CARD_DECLINED)
- logs all transactions to audit table, never logs card numbers
- dependencies: PaymentGatewayAdapter, AuditService, RetryPolicy
```

This gives the model the information it needs to work with the service without consuming the full file. A 500-line file might cost 4,000 tokens. A structured summary costs 100 to 200 tokens.

### Technique 2: minimal file inclusion

Be selective about which files you include. Do not open your entire codebase.

Include only:

- the file you are currently modifying
- the interface or type definition for any service you are calling
- the test file for the code under development (if writing tests)
- the specific function or class you need context about

Exclude:

- files in unrelated modules or services
- build configuration files (package.json, pom.xml) unless directly relevant
- full test suites when you only need one test as an example
- documentation files unless you are working on documentation

When you need to reference a pattern from another file, paste only the relevant function rather than the whole file.

### Technique 3: front-load critical information

AI models give more weight to information at the beginning and end of the context. Put the most important constraints and requirements first.

Structure your prompts in this order.

1. List the constraints that must be respected, such as security requirements, coding standards, and patterns to follow or avoid.
2. State the specific task and describe what you need the model to do.
3. Provide supporting context such as relevant code, interfaces, and examples.
4. Specify output requirements such as format, language, and test coverage expectations.

Example of a front-loaded prompt for a constrained context:

```
Constraints:
- use Java 11, no external libraries beyond what is in pom.xml
- follow our repository pattern (all database access via Repository interfaces)
- no raw SQL, use the existing JPA repositories
- throw ServiceException (not RuntimeException) for business errors

Task: add a method to UserService that finds users by department, returning a paginated result

Context — UserService interface:
[interface definition only, not implementation]

Context — existing findByEmail method for reference:
[paste single method]

Output: method signature and implementation only, with unit test
```

### Technique 4: use structured context documents

Create a compact context document for your session that replaces multiple large files. Keep this document under 2,000 tokens.

```markdown
# Session context — Payment module

## My task
Adding retry logic to PaymentProcessorService.processPayment()

## Key files (not included — summarised)
- PaymentProcessorService: handles payment execution, 3 retry max
- RetryPolicy: exponential backoff util, use RetryPolicy.build(maxAttempts, backoff)
- PaymentException: retryable=true for TIMEOUT/SERVICE_UNAVAILABLE

## Constraints
- do not change method signatures
- log retries at WARN level using existing LogService
- existing tests in PaymentProcessorServiceTest must still pass

## The specific code I am modifying
[paste only the method being changed]
```

### Technique 5: use reference-based prompting

Instead of pasting full files, tell the model what pattern to follow by name, then paste only the relevant example.

```
Follow the same retry pattern used in OrderService.submitOrder() shown below.
Apply it to PaymentService.processPayment().

OrderService.submitOrder() for reference:
[paste single method — 20 to 30 lines]

PaymentService.processPayment() to modify:
[paste single method]
```

### Technique 6: separate concerns across sessions

For tasks that touch multiple concerns, split them across separate sessions rather than trying to handle everything in one conversation.

| Session | Focus | Context needed                                                                                                            |
|---------|-------|---------------------------------------------------------------------------------------------------------------------------|
| Session 1 | Design the interface | Existing interfaces, architecture doc summary. Both Copilot and Claude Code have a `plan` feature that can help with this |
| Session 2 | Implement the service | Interface definition, one example implementation                                                                          |
| Session 3 | Write tests | Implementation code, one example test                                                                                     |
| Session 4 | Write documentation | Final implementation, doc template                                                                                        |

Each session is self-contained and uses a fraction of the context that a combined session would require.

## Breaking tasks into context-appropriate chunks

For models with windows under 32,000 tokens, large tasks need to be broken into smaller, self-contained units of work.

### Planning your chunks

Before starting, identify the discrete steps in your task. Each step should be completable with:

- fewer than 3 to 4 source files included
- a clear, specific output
- minimal dependency on the outputs of earlier steps (or use summarised outputs as inputs)

### Chunking a large refactor

Suppose you need to refactor a legacy service to add async support across 8 files.

Do not attempt this in a single session with a 16K model. Use this approach instead.

1. Share the primary file only and ask the model to identify all synchronous calls that need changing.
2. Share the interface only and ask for updated interface signatures.
3. Share one file at a time and apply changes using the updated interface as context.
4. Share the updated implementation and existing test file, then ask for updated tests.
5. Share the diff output (git diff is compact) and ask for a code review.

Each chunk stays within budget and feeds the next with a compact output rather than full file content.

### Chunking pattern for code migrations

When migrating code from one language or framework to another, follow these steps.

1. Analyse the source file and produce a structured summary of its behaviour, with one chunk per file.
2. Generate the target language equivalent using the compact specification rather than the full source file.
3. Write tests against the specification rather than the original source.

### Token budget planning table

Use this table to plan your session before you start.

| Budget allocation | Token range | Typical use |
|-------------------|-------------|-------------|
| System prompt and constraints | 200 to 500 | Always allocate this |
| Conversation history | 500 to 2,000 | Increases as session continues |
| Primary file (the one being modified) | 2,000 to 5,000 | Include in full |
| Supporting context | 500 to 2,000 | Summaries or single functions only |
| Your question or task | 100 to 300 | Keep concise |
| Reserve for model response | 1,000 to 2,000 | Leave headroom for the response |

For a 16K model this leaves approximately 6,000 to 11,000 tokens for your primary file and supporting context. That is enough for one medium-sized file and targeted summaries.

## Fallback strategies when switching to a smaller context model

If your team loses access to a large-context model and needs to fall back to a smaller one mid-workflow, follow these steps.

### Step 1: audit what relied on large context

Identify which tasks in your workflow depended on large context, such as:

- whole-codebase refactors where many files were shared simultaneously
- long agentic sessions where the model retained state across many steps
- complex debugging sessions where conversation history contained accumulated context
- documentation generation where multiple source files were combined

### Step 2: rebuild your context strategy

For each task type, create a constrained equivalent.

| Large-context task | Constrained equivalent |
|--------------------|------------------------|
| Share 10 files at once for a refactor | Share one file at a time, use compact summaries for others |
| Long agentic session (50+ turns) | Short sessions (10 to 15 turns) with handoff notes between them |
| Whole-codebase search for patterns | Use your IDE or grep to find specific locations, then share only those |
| Generate docs from full source tree | Generate docs one module at a time |

### Step 3: create handoff notes between sessions

When a task spans multiple sessions, maintain a handoff note that carries forward what was decided or completed. Keep it under 500 tokens.

```markdown
# Handoff note — Payment refactor (session 3 of 5)

## Completed
- PaymentService interface updated to async signatures (done)
- PaymentProcessorService implementation updated (done)

## In progress
- PaymentRepository: needs async findByStatus() and findByCustomerId()

## Pending
- update tests in PaymentServiceTest
- update OpenAPI spec

## Key decisions
- using CompletableFuture, not reactive streams
- error handling: wrap checked exceptions in PaymentServiceException
- no changes to method signatures on public API
```

Paste this note at the start of the next session instead of the full conversation history.

### Step 4: update your team's AI usage standards

If the switch is long-term, update your team's context engineering standards to reflect the new constraints. This prevents engineers from writing prompts that assume large-context availability.

## Context window size as a model selection factor

Context window size should be one of several factors when selecting a model. It matters most when your tasks regularly involve:

- large codebases with many interdependencies
- long conversations that need to carry state
- multiple files that need to be considered together
- agentic workflows that run across many steps

### Balancing capability against context size

A more capable model with a smaller context window is not always better than a less capable model with a larger one. The right choice depends on your task.

| Scenario | Recommendation |
|----------|----------------|
| Complex reasoning on a single, small file | Use the more capable model — capability matters more than context size |
| Refactoring across many files simultaneously | Use the larger-context model even if it is less capable — you need to share all the files |
| Long agentic workflow spanning hours | Use the larger-context model — accumulated history will exhaust a small window |
| Generating a single well-defined function | Use the more capable model — the task fits in any window |
| Analysing a large log file or large test output | Use the larger-context model — the input itself may exceed a smaller window |
| Simple, repetitive code generation | Use the smaller, faster model — capability needs are low and context needs are small |

### Model selection decision framework for constrained environments

When you cannot access current flagship models, use this framework.

1. Estimate your task's context needs using the token budget table in this guide.
2. If your task fits within the available window, use the best model available to you.
3. If your task exceeds the available window, apply chunking and summarisation techniques to reduce context needs before selecting a model.
4. If no available model can support your task even with optimisation, escalate to your technical lead for procurement guidance or task restructuring advice.

### Context window sizes as a procurement consideration

When procuring AI tooling for government teams, include minimum context window size as a requirement where the use case demands it. Common thresholds to consider are shown below.

| Use case | Recommended minimum context window |
|----------|-------------------------------------|
| Inline code completion only | 8,000 tokens |
| Chat-based coding assistance | 32,000 tokens |
| Multi-file refactoring | 128,000 tokens |
| Whole-codebase analysis or migration | 200,000 tokens or more |

Document the rationale for your chosen threshold in your service's procurement records and data protection impact assessment (DPIA) where relevant.

## Trade-offs summary

| Trade-off | Smaller window, more capable | Larger window, less capable |
|-----------|-----------------------------|-----------------------------|
| Quality of reasoning on focused tasks | Higher | Lower |
| Ability to consider many files at once | Limited | Better |
| Suitability for long agentic workflows | Limited | Better |
| Cost per task (typically) | Higher | Lower |
| Speed (typically) | Slower | Faster |
| Ease of use for multi-step refactors | Harder | Easier |

There is no universal answer. The best approach is to match the model to the task, and apply context optimisation techniques when the task exceeds a model's natural capacity.

## Quick reference: adapting your workflow

| Problem | Cause | Solution |
|---------|-------|----------|
| Model forgets earlier instructions | Context overflow — oldest context dropped | Start a new session, front-load constraints |
| Model ignores files you provided | Insufficient context budget for all files | Use summaries instead of full files |
| Model gives generic answers despite specific context | Context too large, relevant content diluted | Reduce total context, keep only the most relevant parts |
| Hard context length error | Token limit exceeded | Reduce prompt size before retrying |
| Task too large for any session | Multi-file, multi-step workflow | Chunk into separate sessions with handoff notes |
| Inconsistent suggestions across sessions | No shared context between sessions | Use structured context documents and handoff notes |

## Further reading

### Internal resources

[Context engineering playbook](context-engineering.md) covers broader context management strategies including prompt techniques and repository setup.

[Model selection guide](model-selection.md) covers choosing models based on task type, cost and capability.

[AI-SDLC playbook](ai-sdlc-playbook.md) covers integrating AI into the development lifecycle.

[Prompt library](../prompt-library/) provides ready-to-use prompt patterns.

### External resources

[OpenAI tokeniser tool](https://platform.openai.com/tokenizer) helps estimate token counts for your prompts.

[Anthropic token counting documentation](https://docs.anthropic.com/en/docs/build-with-claude/token-counting) covers how to count tokens with Claude models.

[Hugging Face tokenisers](https://huggingface.co/docs/tokenizers) helps you understand tokenisation for open-source models.