> ALPHA
> This is a new service. Your [feedback](https://github.com/govuk-digital-backbone/aiengineeringlab/discussions) will help us to improve it.

# Prompt library overview

> A curated collection of effective prompts for AI Engineering Labs in government software development.

## Purpose

This library contains tested, reusable prompts that help engineers get better results from AI code assistants. Prompts are organised by task type or language and include context on when and how to use them effectively.

Use this library to:

- find proven prompts for common development tasks
- learn effective prompting patterns
- avoid reinventing prompts others have refined
- contribute prompts that worked well for you

## How to use this library

### Finding prompts

1. Browse by category by navigating to the relevant folder for your task type.
2. Use the repository search for specific keywords.

### Using prompts

1. Read the full prompt entry to understand the context and when to use it.
2. Adapt to your situation by replacing placeholders text and adjusting for your codebase.
3. Iterate by using the prompt as a starting point, refine based on results.
4. Provide context as prompts work best with good surrounding context.

### Contributing prompts

We welcome contributions. See [Contributing a prompt](#contributing-a-prompt) below.

---

## Prompt categories

```
prompt-library/
├── README.md                    # This file
├── prompt-template.md           # Template for new prompts
│
├── by-language/             # Language and framework specific prompts
│   ├── angular-best-pracites.md
│   ├── java.md
│   ├── javascript.md
│   └── python.md
│
├── by-task-type/                     # Task specific prompts
│   ├── README.md
│   ├── legacy-maintenance.md
│   ├── modernisation.md
│   └── refactoring.md
│
└── workflow/                    # Development workflow prompts
    ├── code-review.md
    ├── git-operations.md
    └── ci-cd.md
```

---

## Contributing a prompt

### When to contribute

Contribute a prompt when you have:

- refined a prompt that consistently produces good results
- solved a common problem others would benefit from
- adapted a prompt for government or public sector context
- discovered an effective pattern for a specific tool

### Contribution process

1. Copy the template from [prompt-template.md](prompt-template.md).
2. Complete all sections to ensure the prompt is well documented.
3. Test the prompt thoroughly to verify it works across scenarios.
4. Submit a PR following the [contribution guidelines](../CONTRIBUTING.md).
5. Request peer review from champions or maintainers before merge.

### Quality criteria

| Criterion | Description |
|-----------|-------------|
| Effective | Consistently produces useful results |
| Documented | Clear explanation of when and how to use |
| Tested | Verified across multiple scenarios |
| Generalised | Useful beyond one specific situation |
| [Safe](../governance/guardrails-base.md) | No security or data concerns |

---

## Prompt effectiveness tips

### What makes prompts effective

| Factor | Guidance |
|--------|----------|
| Specificity | Be precise about what you want |
| [Context](../playbooks/context-engineering.md) | Provide relevant background information |
| Constraints | State boundaries and requirements clearly |
| Examples | Show what good output looks like |
| Format | Specify desired output structure |
| Iteration | Refine based on initial results |

### Iterating on prompts

If results are not what you expected:

1. Check your context to see if you provided enough information.
2. Clarify constraints to ensure requirements were explicit.
3. Try rephrasing as different wording may help.
4. Break down the request as smaller requests may work better.
5. Add examples to show what you want.
6. Try a different approach by asking differently.

---

## Tool-specific notes

### GitHub Copilot
You should use:
- inline suggestions work best with clear code context
- comments to guide suggestions
- chat mode for longer explanations and generation
- Copilot Edits for multi-file changes

### Claude Code
Claude Code:
- excels at longer, more complex prompts
- is strong at explaining and documenting
- has good multi-file context awareness
- can use CLAUDE.md for project context

### Amazon Q Engineer:
Amazon Q Engineer:
- provides strong AWS service integration
- is good for infrastructure as code
- has security scanning built-in
- is effective for Java/.NET modernisation

### Gemini Code Assist:
Gemini Code Assist:
- is good for GCP related tasks
- has strong code explanation capabilities
- is effective for large codebase understanding
- works well for code customisation with your repos

---

## Further reading

[Prompt template](prompt-template.md)

[Context engineering playbook](../playbooks/context-engineering.md)

[AI-SDLC playbook](../playbooks/ai-sdlc-playbook.md)

[Guardrails base](../governance/guardrails-base.md)

[GitHub Copilot documentation](https://docs.github.com/en/copilot)

[Prompt engineering guide](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview)