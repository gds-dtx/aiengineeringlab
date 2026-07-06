> MCP server availability depends on your organisation's approval. Check with your organisation before setting up MCP servers.

# Development and testing MCP servers

This guide covers curated examples of MCP servers for development and testing workflows, including browser automation, accessibility testing, and version control.

## Contents

[Browser automation and testing](#browser-automation-and-testing)

[Accessibility testing](#accessibility-testing)

[Version control and collaboration](#version-control-and-collaboration)

[Reference implementations](#reference-implementations)

[Community repositories for reference](#community-repositories-for-reference)

[Selecting MCP servers for your team](#selecting-mcp-servers-for-your-team)

[Further reading](#further-reading)

### Content

Curated examples of MCP servers for development and testing workflows, including browser automation, accessibility testing, and version control.

### Purpose

To help teams identify suitable community MCP servers for their development and testing needs.

### Who this is for

Developers, testers, and technical leads building AI-assisted development environments. You need a basic understanding of MCP fundamentals (see [MCP servers introduction](mcp-introduction.md)).

---

This guide focuses on MCP servers that enhance development and testing workflows. These servers enable AI code assistants to automate browser testing, perform accessibility checks, run unit tests, and integrate with development tools.

All servers listed are suitable for integration with AI code assistants such as:

- GitHub Copilot
- Claude Code
- Amazon Q
- Gemini Code Assist

## Browser automation and testing

### Microsoft Playwright

Microsoft maintains the official Playwright MCP server for cross browser automation and testing.

The official Playwright MCP server from Microsoft provides cross-browser automation using Playwright's accessibility tree rather than pixel-based approaches. It enables AI assistants to navigate websites, interact with elements, take screenshots, fill forms, and execute JavaScript. It is fast, lightweight, and deterministic. It supports Chrome, Firefox, WebKit, and Edge in both headed and headless modes. Use it for end-to-end testing, web scraping, form automation, and automated workflows.

Find the documentation at [github.com/microsoft/playwright-mcp](https://github.com/microsoft/playwright-mcp).

Key features of the Playwright MCP server are that it:

- uses the browser's accessibility tree for structured, deterministic automation
- requires no vision models or screenshot based approaches
- supports cross-browser automation (Chromium, Firefox, WebKit)
- is configurable via JSON for custom setups
- supports headless mode for continuous integration and continuous delivery (CI and CD) pipelines
- supports persistent profiles and isolated contexts

---

### Browserbase

Browserbase provides official MCP servers for cloud browser automation, designed for real world automation workflows.

Browserbase is an official cloud browser automation platform with 2 MCP server implementations. Browserbase provides direct browser control whilst Stagehand provides natural language driven workflows. It offers remote headless browser sessions for navigation, data extraction, form filling, and multi-step actions. It includes anti-detection capabilities and session persistence. Use it for reliable web scraping and automated testing in cloud environments.

Find the documentation at [browserbase.com](https://www.browserbase.com/) and [github.com/browserbase/mcp-server-browserbase](https://github.com/browserbase/mcp-server-browserbase).

---

## Accessibility testing

### Official vendor servers

#### Deque Axe MCP Server

The Axe MCP Server is an official enterprise-grade accessibility testing tool from Deque Systems. It uses axe DevTools and provides Web Content Accessibility Guidelines (WCAG) testing with context-aware analysis. It supports major IDEs including GitHub Copilot, Cursor, Claude Code, Windsurf, and VS Code. It includes configurable privacy controls, audit logging, and full axe Platform integration. Use it for professional accessibility testing with enterprise support and long-term maintenance.

Find the documentation at [deque.com/axe/devtools/mcp](https://www.deque.com/axe/devtools/mcp/).

Key differences from community alternatives include:

- official maintenance and support by Deque Systems
- integration with axe Assistant AI chatbot trained on Deque University knowledge base
- full axe Platform integration with enterprise features
- requirement for an API key and commercial subscription
- context aware testing beyond basic Axe core rule execution
- enterprise grade security, privacy controls, and audit logging
- professional support and long term maintenance commitment

Note that this is a commercial product from Deque with enterprise features and support. This is the official Deque MCP server for accessibility testing, distinct from community implementations using the open source Axe core library.

---

### Community maintained servers

The following accessibility testing servers are community developed implementations that use open source accessibility libraries. They are not officially maintained by the library vendors (Deque Systems). Assess them for security vulnerabilities, active maintenance status, code quality, and compliance requirements before using them in government projects.

#### MCP Accessibility Scanner (Community)

MCP Accessibility Scanner is a community developed accessibility testing server by Justas Monkevicius. It uses Playwright and Axe core to perform automated WCAG compliance checks at A, AA, and AAA levels for WCAG 2.0, 2.1, and 2.2. It provides detailed JSON reports with remediation guidance. Use it for continuous accessibility testing in CI and CD workflows.

Find the documentation at [github.com/JustasMonkev/mcp-accessibility-scanner](https://github.com/JustasMonkev/mcp-accessibility-scanner).

Key features of the MCP Accessibility Scanner include:

- full WCAG 2.0, 2.1, and 2.2 compliance checking (A, AA, AAA levels)
- detailed JSON reports with remediation guidance
- support for specific violation categories
- natural language element discovery
- screenshot capture and PDF generation
- tab management for multi-page workflows

This is a community maintained server, not an official product from Deque Systems or the Playwright team. It uses the open source Axe core library but lacks enterprise support and commercial backing.

---

#### A11y MCP (Community)

A11y MCP is a community developed accessibility testing server by Ronan Takizawa. It uses Axe core API and Puppeteer to test web pages and HTML snippets against WCAG standards. It provides colour contrast analysis, Accessible Rich Internet Applications (ARIA) validation, and orientation lock detection. Use it for WCAG compliance testing during development.

Find the documentation at [github.com/ronantakizawa/a11y-mcp](https://github.com/ronantakizawa/a11y-mcp) or install the npm package `a11y-mcp-server`.

Key features of A11y MCP include:

- web page accessibility testing via URL
- HTML snippet accessibility testing
- ARIA validation for proper attribute usage
- colour contrast analysis for WCAG compliance
- integration with Claude Desktop, Cursor, and other MCP clients

This is a community developed server by Ronan Takizawa, not officially maintained by Deque Systems. It uses Deque's open source Axe core library but is not an official Deque product. For enterprise-grade accessibility testing with official support, see the Deque Axe MCP Server above.

---

## Version control and collaboration

### GitHub

GitHub maintains the official MCP server for their platform.

The GitHub MCP server provides access to repositories, issues, pull requests, GitHub Actions, security scanning, notifications, and advanced automation. It supports both hosted remote access and local Docker deployment. Use it to automate code reviews, manage workflows, and integrate development processes. It requires a GitHub personal access token or OAuth with appropriate scopes.

Find the documentation at [github.com/github/github-mcp-server](https://github.com/github/github-mcp-server).

---

### GitLab

GitLab maintains an official MCP server integrated into the GitLab Duo Agent Platform.

The GitLab MCP Server (Beta) provides secure access to GitLab projects, issues, merge requests, and CI and CD pipelines. It is built into GitLab 18.6 and later as part of GitLab Duo. It supports HTTP transport with OAuth 2.0 authentication and stdio transport with mcp remote. It supports both GitLab.com and self-hosted instances.

Find the documentation at [docs.gitlab.com/user/gitlab_duo/model_context_protocol/mcp_server](https://docs.gitlab.com/user/gitlab_duo/model_context_protocol/mcp_server/).

This is a beta feature. Evaluate it thoroughly for government use and ensure it meets your security and compliance requirements.

---

## Reference implementations

### Model Context Protocol organisation

Anthropic provides reference MCP server implementations demonstrating protocol features and best practices. These serve as educational examples and templates for custom server development.

The reference implementations provides capability. This includes:

- fetching web content and converting it to markdown for efficient AI use – Fetch ([repository](https://github.com/modelcontextprotocol/servers/tree/main/src/fetch))
- performing secure file operations with access controls and managing local file system permissions – Filesystem ([repository](https://github.com/modelcontextprotocol/servers/tree/main/src/filesystem))
- reading, searching, and manipulating Git repositories including commit history, branches, and file contents – Git ([repository](https://github.com/modelcontextprotocol/servers/tree/main/src/git))
- persisting data across AI assistant sessions using a knowledge graph structure – Memory ([repository](https://github.com/modelcontextprotocol/servers/tree/main/src/memory))
- breaking down complex problems through structured thinking processes – Sequential Thinking ([repository](https://github.com/modelcontextprotocol/servers/tree/main/src/sequentialthinking))

Find all reference implementations at [github.com/modelcontextprotocol/servers](https://github.com/modelcontextprotocol/servers).

---

## Community repositories for reference

Whilst this document focuses on officially maintained development and testing servers, these community repositories catalogue additional MCP servers.

| Repository | Description |
|------------|-------------|
| [MCP reference servers](https://github.com/modelcontextprotocol/servers) | Reference implementations maintained by Anthropic |
| [MCP server registry](https://github.com/modelcontextprotocol/registry) | Official MCP server registry |
| [Awesome MCP Servers by punkpeye](https://github.com/punkpeye/awesome-mcp-servers) | 7,000 and more categorised servers |
| [Awesome MCP Servers by wong2](https://github.com/wong2/awesome-mcp-servers) | Community curated list, independently maintained (assess suitability before use) |

Several community developed MCP servers exist for test frameworks (Vitest, Jest, Cypress). These are not officially maintained by the respective testing framework organisations.

| Repository | Description |
|------------|-------------|
| [Vitest MCP servers](https://github.com/djankies/vitest-mcp) | Community implementations for Vitest integration |
| [MCP Jest](https://github.com/josharsh/mcp-jest) | Community testing framework for MCP servers |
| [Frontend Testing MCP](https://github.com/StudentOfJS/frontend-testing-mcp) | Community Jest and Cypress integration |

Community maintained servers should be assessed for security vulnerabilities, active maintenance status, code quality, and compliance requirements before use in government projects. Unlike officially vendor maintained servers, community implementations may lack:

- enterprise support agreements
- security audit trails
- long-term maintenance commitments
- compliance certifications
- vulnerability disclosure programmes

---

## Selecting MCP servers for your team

### Building custom servers

If existing servers do not meet your needs, you can build custom implementations. See the [MCP server design and architecture guide](mcp-server-design-and-architecture-guide.md) for comprehensive guidance on architecture patterns, security, and step-by-step implementation.

### Evaluation criteria for development tools

When evaluating MCP servers for development and testing, consider the following criteria.

When assessing a vendor, look for:

- official maintenance by the platform vendor or testing framework
- a proven track record for security updates and active development
- a long term support commitment

Functional fit factors include:

- clear development workflow coverage
- support for required test frameworks and browsers
- integration with CI and CD pipeline

Security and compliance requirements include:

- appropriate access controls and credential management
- OAuth 2.1 authentication support
- audit logging capabilities
- NCSC security standards compliance

Government requirements include:

- compliance certifications (Cyber Essentials, ISO 27001, SOC 2)
- UK data sovereignty
- on premises or government cloud deployment options
- WCAG 2.2 AA accessibility support

---

## Further reading

[MCP servers introduction](mcp-introduction.md) covers Model Context Protocol fundamentals.

[MCP partner examples](mcp-partners-examples.md) covers enterprise partner MCP servers.

[MCP server design and architecture guide](mcp-server-design-and-architecture-guide.md) covers architecture patterns.

---
