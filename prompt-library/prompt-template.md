> ALPHA
> This is a new service. Your [feedback](https://github.com/gds-dtx/aiengineeringlab/discussions) will help us to improve it.
# Prompt template

> Use this template when contributing new prompts to the library.

## Instructions

1. Copy this template to the appropriate category folder.
2. Name the file clearly (for example, `unit-test-generation.md`, `sql-query-optimisation.md`).
3. Complete all required sections.
4. Delete the instructions and optional sections you do not use.
5. Submit via pull request following [contribution guidelines](../CONTRIBUTING.md).

---

## Template

Copy everything below this line:

---

# [Prompt name]

> [one-line description of what this prompt does]

## Overview

| Attribute | Value |
|-----------|-------|
| Category | [code-generation or testing or refactoring or documentation or debugging or security-review or accessibility or gov-uk-patterns or workflow] |
| Tools | [All or GitHub Copilot or Claude or Amazon Q or Gemini or specific combinations] |
| Languages | [language-agnostic or specific languages] |
| Difficulty | [Beginner or Intermediate or Advanced] |
| Last updated | [Date] |

## When to use

[Describe the situations where this prompt is most effective. Be specific about the problem it solves.]

Use this prompt when you:
- [situation 1]
- [situation 2]
- [situation 3]

Do not use this prompt when you:
- [situation where it is not appropriate]
- [alternative approach might be better]

## The prompt

```
[The actual prompt text goes here]

[Use placeholders in square brackets for variable parts, for example:]
[language]
[framework]
[paste code here]
[describe requirements]
```

## Placeholders

| Placeholder | Description | Example |
|-------------|-------------|---------|
| `[placeholder1]` | [What to replace it with] | [Example value] |
| `[placeholder2]` | [What to replace it with] | [Example value] |

## Example usage

### Input

Context: [Describe the scenario]

Placeholder values:
- [placeholder1]: [actual value used]
- [placeholder2]: [actual value used]

Code or content provided:

```[language]
[The actual code or content that was provided to the AI]
```

### Output

[What the AI produced - can be abbreviated if long]

```[language]
[Example output from the AI]
```

### Why this worked

[Explain what made this prompt effective in this example]

## Tips for best results

- [tip 1: Specific advice for getting good results]
- [tip 2: Common adjustments that help]
- [tip 3: Context that improves output]

## Common issues and fixes

| Issue | Cause | Fix |
|-------|-------|-----|
| [Problem you might encounter] | [Why it happens] | [How to fix it] |
| [Another common issue] | [Why it happens] | [How to fix it] |

## Related prompts

- [link to related prompt 1] - [Brief description of relationship]
- [link to related prompt 2] - [Brief description of relationship]

## Tags

`[tag1]` `[tag2]` `[tag3]` `[tag4]`

Suggested tags:
- tool: `copilot` `claude` `amazon-q` `gemini`
- language: `java` `python` `typescript` `csharp` `go`
- framework: `spring` `react` `dotnet` `express`
- task: `testing` `refactoring` `documentation` `security`
- level: `beginner` `intermediate` `advanced`
- context: `gov-uk` `legacy` `greenfield` `api`

---

## Template ends above

---

## Example completed prompt

Below is an example of a completed prompt using this template:

---

# Generate unit tests with edge cases

> Generate comprehensive unit tests including edge cases and error conditions.

## Overview

| Attribute | Value                                      |
|-------|--------------------------------------------|
| Category | testing                                    |
| Tools | All                                        |
| Languages | language-agnostic (examples in TypeScript) |
| Difficulty | Beginner                                   |
| Contributed by | AI Engineering Lab programme team          |
| Last updated | Jan 2026                                   |

## When to use

Use this prompt when you need to create unit tests for existing functions and want comprehensive coverage including edge cases.

Use this prompt when you:
- have a function without tests
- want to ensure edge cases are covered
- need tests that document expected behaviour

Do not use this prompt when you:
- need integration tests (use integration test prompt)
- the function has complex external dependencies (mock first)
- are testing UI components (use component testing prompt)

## The prompt

```
Generate unit tests for the following function.

Requirements:
- test the happy path with typical inputs
- test edge cases: null or undefined, empty values, boundary conditions
- test error cases: invalid inputs, exception scenarios
- use descriptive test names following the pattern: 'should [expected behaviour] when [condition]'
- follow Arrange-Act-Assert pattern
- include comments explaining non-obvious test cases

Testing framework: [framework]
Language: [language]

Function to test:
[paste code here]
```

## Placeholders

| Placeholder | Description | Example |
|-------------|-------------|---------|
| `[framework]` | Your testing framework | Jest, JUnit 5, pytest, xUnit |
| `[language]` | Programming language | TypeScript, Java, Python |
| `[paste code here]` | The function to test | Your function code |

## Example usage

### Input

Context: Testing a utility function that validates UK postcodes

Placeholder values:
- [framework]: Jest
- [language]: TypeScript

Code provided:

```typescript
function isValidUKPostcode(postcode: string): boolean {
  if (!postcode) return false;
  const cleaned = postcode.replace(/\s/g, '').toUpperCase();
  const regex = /^[A-Z]{1,2}\d[A-Z\d]?\s?\d[A-Z]{2}$/;
  return regex.test(cleaned);
}
```

### Output

```typescript
describe('isValidUKPostcode', () => {
  describe('valid postcodes', () => {
    it('should return true when given a valid postcode with space', () => {
      expect(isValidUKPostcode('SW1A 1AA')).toBe(true);
    });

    it('should return true when given a valid postcode without space', () => {
      expect(isValidUKPostcode('SW1A1AA')).toBe(true);
    });

    it('should return true when given lowercase postcode', () => {
      expect(isValidUKPostcode('sw1a 1aa')).toBe(true);
    });
  });

  describe('edge cases', () => {
    it('should return false when given empty string', () => {
      expect(isValidUKPostcode('')).toBe(false);
    });

    it('should return false when given null', () => {
      expect(isValidUKPostcode(null as any)).toBe(false);
    });

    it('should return false when given undefined', () => {
      expect(isValidUKPostcode(undefined as any)).toBe(false);
    });

    it('should handle extra whitespace', () => {
      expect(isValidUKPostcode('  SW1A  1AA  ')).toBe(true);
    });
  });

  describe('invalid postcodes', () => {
    it('should return false when given incomplete postcode', () => {
      expect(isValidUKPostcode('SW1A')).toBe(false);
    });

    it('should return false when given invalid format', () => {
      expect(isValidUKPostcode('12345')).toBe(false);
    });

    it('should return false when given US zipcode', () => {
      expect(isValidUKPostcode('90210')).toBe(false);
    });
  });
});
```

### Why this worked:

- specific requirements guided comprehensive coverage
- framework specification ensured correct syntax
- the function was self-contained with clear inputs and outputs

## Variations

### Variation 1: with mocking requirements

Use when the function has dependencies that need mocking

```
Generate unit tests for the following function.

Requirements:
- test the happy path with typical inputs
- test edge cases and error cases
- mock the following dependencies: [list dependencies]
- verify mock interactions where appropriate

Testing framework: [framework]
Mocking library: [mock library]

Function to test:
[paste code here]
```

### Variation 2: minimal tests

Use when you need quick coverage, not comprehensive tests

```
Generate essential unit tests for this function.
Focus on: 1 happy path, 1 edge case, 1 error case.
Keep tests concise.

Testing framework: [framework]

Function:
[paste code here]
```

## Tips for best results
You should: 
- include the function's imports and type definitions for better context
- specify your team's test naming conventions if different from standard
- mention any specific edge cases you know are important
- if the function is part of a class, include relevant class context

## Common issues and fixes

| Issue | Cause | Fix |
|-------|-------|-----|
| Tests use wrong assertion syntax | Framework not specified clearly | Explicitly state framework and version |
| Missing edge cases for your domain | AI does not know domain specifics | Add 'Also test for: [specific cases]' |
| Tests are too verbose | Default style is comprehensive | Add 'Keep tests concise' to prompt |
| Mock syntax incorrect | Mocking library not specified | Specify both test framework and mock library |

## Tags

`testing` `unit-tests` `beginner` `language-agnostic`

---

## Contribution checklist

Before submitting your prompt, verify:

- [ ] Prompt tested with at least 2 different inputs
- [ ] All placeholders documented
- [ ] Example usage included with real output
- [ ] Tips section includes practical advice
- [ ] Tags added for discoverability
- [ ] File placed in correct category folder
- [ ] File name is descriptive and kebab-case
