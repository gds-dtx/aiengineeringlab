> ALPHA
> This is a new service. Your [feedback](https://github.com/govuk-digital-backbone/aiengineeringlab/discussions) will help us to improve it.
# Contributing to this repository

How to propose, submit, and review contributions to the AI Engineering Lab repository.

Thank you for your interest in improving this repository. Contributions from across government help keep these materials current, comprehensive, and practically useful.

## Contents

[Before you contribute](#before-you-contribute)

[Accessibility requirements](#accessibility-requirements)

[Contribution process](#contribution-process)

[Quality checklist](#quality-checklist)

[Recognition](#recognition)

[Getting help](#getting-help)

[Intellectual property](#intellectual-property)

[Further reading](#further-reading)

## Before you contribute

### Who can contribute

This repository welcomes contributions from:

- civil servants across all government departments
- contractors and suppliers working on government projects
- arm's length bodies and agencies
- Forward Deployed Engineers (FDEs) capturing learnings from engagements

### Types of contribution

| Contribution type | Examples | Process |
|-------------------|----------|---------|
| Bug fixes | Typos, broken links, factual errors | Quick fix process |
| Minor improvements | Clarifications, additional examples, formatting | Standard process |
| New content | New playbooks, prompts, case studies | Full review process |
| Structural changes | New sections, reorganisation | Proposal required |
| Tool-specific guides | New AI assistant coverage | Full review and security assessment |

### What we are looking for

We welcome:

- practical examples from real adoption experiences
- prompts that have proven effective in government contexts
- case studies (anonymised where necessary)
- accessibility improvements
- corrections to outdated information
- integration patterns for government technology stacks
- translations or plain English improvements

### What requires additional review

Security or governance reviews are required before merging for:

- content relating to security controls or guardrails
- tool-specific configuration guidance
- incident response procedures
- any content mentioning specific vulnerabilities
- integration patterns involving authentication or secrets

### Writing style

All content must follow [GOV.UK content design principles](https://www.gov.uk/guidance/content-design/writing-for-gov-uk). Contributors must:

- use plain English, avoid jargon, and explain technical terms on first use
- use active voice, such as 'Review the code' instead of 'The code should be reviewed'
- front-load information, putting the most important point first
- keep sentences short, aiming for 25 words or fewer per sentence
- use short paragraphs with one idea per paragraph, and 2 to 3 sentences maximum
- be direct, using 'you' to address the reader, and 'we' for the repository team

### Formatting standards

Headings must:

- use sentence case, capitalising the first word only
- use heading levels sequentially such as H2 to H3, instead of H2 to H4
- be kept descriptive and actionable

Lists must use:

- bullet points for unordered items
- numbered lists for sequential steps only

Numbered lists.

1. They must be a complete sentence.
2. They must start with a capital letter.
3. They must end with a full stop.
4. They should not end with a question mark. 

Bullet lists must:

- have a lead in line which makes sense as a complete sentence with each individual bullet
- be a complete sentence - use dashes rather than starting a new sentence
- use lower case, including the first letter, unless that item is a proper noun
- not end with a full stop

Code examples must:

- use fenced code blocks with language identifiers
- be concise and focused
- include comments explaining non-obvious elements
- be tested before before submitted

Links must:

- use descriptive link text, instead of 'click here'
- use relative links for internal repository references
- be checked and working before being submitted

## Accessibility requirements

All contributions must meet the following accessibility standards.

### Text content

- [ ] Use clear, simple language (aim for reading age 9)
- [ ] Provide alt text descriptions for any images
- [ ] Do not use colour alone to convey meaning
- [ ] Define acronyms on first use
- [ ] Use descriptive link text

### Structure

- [ ] Use proper heading hierarchy
- [ ] Use semantic markup (lists, tables, headings)
- [ ] Keep tables simple and avoid merged cells
- [ ] Provide table headers for data tables

### Code examples

- [ ] Do not rely on syntax highlighting alone
- [ ] Include comments for complex logic
- [ ] Ensure examples are screen-reader friendly when rendered

### Cognitive accessibility

- [ ] Break complex content into manageable chunks
- [ ] Use consistent terminology throughout
- [ ] Provide summaries for long documents
- [ ] Include practical examples alongside theory

For detailed guidance, see the repository's accessibility documentation.

## Contribution process

### Quick fixes (typos, broken links)

1. Fork the repository.
2. Make your change in a new branch.
3. Submit a pull request with a clear description.
4. A maintainer will review and merge within 5 working days.

### Standard contributions

Standard contributions include improvements, clarifications, and new examples.

1. Check existing content and ensure your contribution is not duplicating existing material.
2. Open an issue first and describe what you are proposing and why.
3. A maintainer will respond within 5 working days.
4. Fork and branch with a descriptive name using format 'type/brief-description', such as 'fix/broken-copilot-link' or 'add/terraform-prompt-examples'.
5. Make your changes and follow content standards above.
6. Self-review and check against the quality checklist below.
7. Submit pull request and reference the original issue.
8. Respond to feedback and make requested changes promptly.
9. Maintainers will merge approved contributions.

### New content or structural changes

New content or structural changes are significant contributions.

1. Submit a proposal and open an issue using the 'Content Proposal' template.
2. Include in your proposal what you are proposing, why it is needed, who will benefit, outline of content structure, estimated effort, and any security or governance considerations.
3. The team will review your proposal within 5 working days.
4. You will receive feedback and approval to proceed, or suggestions for alternative approaches.
5. Create content and follow the standard contribution process above.
6. New content receives additional scrutiny in the form of an enhanced review from subject matter experts.

## Quality checklist

Before submitting, verify your contribution against the following checklists.

### Content quality

- [ ] Follows GOV.UK writing style
- [ ] Accurate and factually correct
- [ ] Provides practical, actionable guidance
- [ ] Includes relevant examples
- [ ] Appropriate for government context
- [ ] Does not duplicate existing content

### Technical accuracy

- [ ] Code examples are tested and working
- [ ] Commands and configurations are correct
- [ ] Version numbers and links are current
- [ ] Tool-specific guidance matches current tool versions

### Security and governance

- [ ] Suitable for OFFICIAL classification
- [ ] Does not expose sensitive information
- [ ] Follows security best practices
- [ ] Does not include real credentials, keys, or secrets
- [ ] Aligns with guardrails and compliance requirements

### Accessibility

- [ ] Meets accessibility requirements above
- [ ] Tested with accessibility tools where applicable

### Metadata

- [ ] Document metadata is complete
- [ ] Version number is appropriate
- [ ] Links to related documents are included
- [ ] References are properly cited

### What reviewers check

Maintainers review contributions for alignment, quality, accuracy, security, accessibility, and consistency. Reviewers must check that content:

- fits the repository's purpose and scope
- meets content standards
- is technically correct
- is safe for government use
- meets accessibility standards
- aligns with existing content

### Review outcomes

Maintainers will review each contribution as:

- approved, and the contribution will be merged as submitted
- approved with changes, with minor edits made by maintainer before merge
- changes requested, with feedback provided for the contributor to make updates
- declined, as not meeting requirements with feedback provided

## Recognition

Contributors are recognised through:

- attribution in document metadata where appropriate
- listing in the repository's contributors file
- acknowledgement in release notes for significant contributions

## Getting help

If you need assistance with contributing, contact gdsengineeringexcellence@dsit.gov.uk.


## Intellectual property

Contributions must follow standards on intellectual property, making sure that:

- your contribution is your own original work, or you have permission to submit it
- you have the right to grant the licence below
- your contribution does not infringe any third-party intellectual property rights
- your contribution is suitable for publication under the Open Government Licence

Contributions are published under the [Open Government Licence v3.0](https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/).

## Further reading

[README](README.md) provides a repository overview.

[Repository structure](REPOSITORY-STRUCTURE.md) outlines the repository structure.

[GOV.UK Content Design Guide](https://www.gov.uk/guidance/content-design)

[GOV.UK Writing for GOV.UK](https://www.gov.uk/guidance/content-design/writing-for-gov-uk)

[Civil Service Code](https://www.gov.uk/government/publications/civil-service-code/the-civil-service-code)

[Open Government Licence](https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/)