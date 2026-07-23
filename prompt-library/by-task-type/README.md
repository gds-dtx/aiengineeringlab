> ALPHA
> This is a new service. Your [feedback](https://github.com/gds-dtx/aiengineeringlab/discussions) will help us to improve it.

# By task type

Prompts organised by development task. Each file covers a specific task area with guidance on when to use the prompts, key techniques, and how to contribute.

## Quick navigation

### Available now

| Task area | Description |
|-----------|-------------|
| [Legacy maintenance](legacy-maintenance.md) | Prompts for technical debt identification, dependency mapping, codebase documentation, and characterisation test generation |
| [Modernisation](modernisation.md) | Prompts for migration planning, dependency upgrades, framework migration, and scope decomposition |
| [Refactoring](refactoring.md) | Prompts for code smell detection, constraint-driven refactoring, and diff-only output |

### Planned

The following task areas are planned. To contribute content for any of these, see [Contributing](#contributing) below.

| Task area | Description |
|-----------|-------------|
| Accessibility | Prompts for WCAG compliance checks, accessible markup generation, and accessibility testing |
| Code generation | Prompts for generating new functions, classes, and components from requirements |
| Debugging | Prompts for diagnosing errors, interpreting logs, and identifying root causes |
| Documentation | Prompts for generating docstrings, README files, and API documentation |
| GOV.UK patterns | Prompts for applying GOV.UK Design System components and patterns |
| Security review | Prompts for identifying vulnerabilities, reviewing authentication logic, and checking OWASP compliance |
| Testing | Prompts for generating unit tests, integration tests, and edge case discovery |

## How to use this section

Each available file follows the same structure:

- purpose — what the prompts help you achieve
- who this is for — the roles and situations these prompts suit
- key techniques — the prompting patterns that work well for this task area
- related guidance — links to playbooks and governance documents

Browse by task to find prompts relevant to your current work. Use your browser or IDE search to find specific keywords within a file.

## Contributing

To add a new prompt to any task area, follow these steps. 

1. Copy [prompt-template.md](../prompt-template.md).
2. Complete all sections, including when to use and when not to use the prompt.
3. Test the prompt across at least 2 different scenarios before submitting.
4. Add it to the relevant task area file, or create a new task area file if none fits.
5. Submit a pull request following [CONTRIBUTING.md](../../CONTRIBUTING.md).

To propose a new task area, open a discussion before creating the file.
