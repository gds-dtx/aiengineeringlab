
> MCP server availability depends on your organisation's approval. Check with your organisation before setting up MCP servers.

# MCP server best practices

This document helps you operate, test, and maintain Model Context Protocol (MCP) servers effectively. It covers proven patterns for security, monitoring, and reliability.

## Contents

[Summary of operational principles](#summary-of-operational-principles)

[Security first](#security-first)

[Monitoring and debugging errors](#monitoring-and-debugging-errors)

[Transport and connectivity](#transport-and-connectivity)

[Testing and quality](#testing-and-quality)

[Operating MCP servers](#operating-mcp-servers)

[Authorisation and consent](#authorisation-and-consent)

[Community and ecosystem](#community-and-ecosystem)

[Further reading](#further-reading)

[MCP community resources](#mcp-community-resources)

### Content

Proven operational patterns for security, monitoring, testing, and maintaining MCP servers effectively, drawn from the Model Context Protocol specification and real-world deployments.

### Purpose

To help teams operate MCP servers to a consistent standard, reducing security risk and improving reliability.

### Who this is for

Engineers, DevOps teams, and technical leads operating MCP servers. You need a basic understanding of MCP fundamentals (see [MCP servers introduction](mcp-introduction.md)). To design and architect MCP servers, see the [MCP server design and architecture guide](mcp-server-design-and-architecture-guide.md).

---

## Summary of operational principles

| Principle | Description | Impact |
|-----------|-------------|--------|
| Security first | OAuth 2.1, least privilege, secrets management | Trust, compliance |
| Transport selection | Choose appropriate transport for environment | Performance, security |
| Error monitoring | Track patterns, structured logging, debugging guidance | Reliability, maintainability |
| Comprehensive testing | Functional, security, and UX validation | Quality, reliability |
| Observable | Structured logging, metrics, tracing | Operations, debugging |
| Health monitoring | Liveness, readiness, dependency checks | Availability, resilience |
| Graceful degradation | Fallbacks when dependencies fail | Reliability, user experience |
| Authorisation | Fine grained access control and consent | Security, compliance |
| Proper deployment | Containerised, versioned, documented | Maintainability, scalability |

For architectural and design principles, see [MCP server design and architecture guide](mcp-server-design-and-architecture-guide.md).

---

## Security first

Security is fundamental to operating MCP servers. All MCP servers must implement strong authentication, authorisation, and data protection.

Critical security requirements include:
- implementing OAuth 2.1 for HTTP transports (mandatory as of March 2025 MCP specification)
- storing secrets in enterprise secret managers (never inline credentials)
- validating all inputs with strict schemas
- enforcing per tool and per parameter authorisation checks
- using least privilege principles with minimal, targeted scopes

---

## Monitoring and debugging errors

### Track error patterns

Monitor errors systematically to identify and resolve issues quickly.

Key metrics to track include:
- error rate by tool (which tools fail most often?)
- error types and categories (authentication, validation, timeout, upstream failure)
- user impact (which errors affect the most users?)
- error trends over time (are errors increasing or decreasing?)

Alerting thresholds include:
- alerting when error rate exceeds 5% for any tool
- alerting on authentication failures (potential security issue)
- alerting on upstream service failures (dependency problems)
- alerting on unexpected error types (potential bugs)

### Implement structured error logging

Log errors with sufficient context for debugging without exposing sensitive data.

Required error log fields include:
- timestamp
- tool name
- user ID (anonymised if necessary)
- error type and message
- request parameters (sanitised)
- correlation ID
- stack trace (for server errors)

An example error log.
```json
{
  "timestamp": "2026-01-22T10:30:00Z",
  "level": "error",
  "toolName": "query-cases",
  "userId": "user_abc123",
  "errorType": "AuthenticationError",
  "errorMessage": "OAuth token expired",
  "correlationId": "req_xyz789",
  "retryable": true
}
```

Never log:
- API keys or tokens
- passwords or credentials
- personal identifiable information (PII)
- complete request and response bodies containing sensitive data

### Provide debugging guidance

Help users and support teams debug issues quickly.

Operators should:
- document common error scenarios and resolutions
- provide troubleshooting decision trees
- include correlation IDs in error responses for support lookups
- create runbooks for frequent error patterns

For users, error messages should:
- explain what went wrong
- include actionable next steps
- provide relevant documentation links
- indicate whether a retry is appropriate

For guidance on designing error messages AI agents can understand, see [MCP server design and architecture guide](mcp-server-design-and-architecture-guide.md).

---

## Transport and connectivity

### Choose the right transport

Use STDIO (Standard Input and Output) for local development, maximum client compatibility, and single-user scenarios. It is simple and secure by default but does not support remote access or horizontal scaling.

Use Streamable HTTP for live environments, networked access, horizontal scaling, and incremental results. It supports remote access, load balancing, and standard HTTP tooling. It requires OAuth 2.1 authentication, Transport Layer Security (TLS) encryption, and proper Cross-Origin Resource Sharing (CORS) configuration.

Note that the June 2025 specification update deprecated SSE (Server-Sent Events) transport and replaced it with Streamable HTTP.

### Implement request cancellation

Support request cancellation and timeouts to prevent resource starvation.

Implementation requirements include:
- honouring cancellation requests from clients
- setting reasonable timeouts for all operations
- cleaning up resources properly on cancellation
- documenting expected response times

### Handle streaming responsibly

When using Streamable HTTP, best practices include:
- emitting incremental chunks for long operations
- advertising total counts where feasible
- for large payloads, returning handles or URIs to resources instead of inlining data
- implementing proper backpressure handling
- setting and documenting streaming limits

---

## Testing and quality

### Test with real hosts and failure injection

Required testing includes:
- validating against multiple MCP clients and hosts
- testing both stdio and Streamable HTTP transports
- injecting faults such as slow downstreams, partial failures, and malformed inputs
- verifying discovery, schema validation, and error paths end to end
- testing traditional content blocks and structured content outputs

Tools include:
- official MCP Inspector tool for manual testing
- automated test suites for regression testing
- load testing for live environment readiness

### Test user interactions

Beyond functional testing, validate the complete user experience.

1. Connection testing. Verify you have configured all required settings correctly.
2. Tool discovery. Confirm AI agents see the expected tool list.
3. Tool invocation. Validate behaviour matches expectations, including all failure modes.

The recommended tool is MCP Inspector (`npx @modelcontextprotocol/inspector`) to simulate the client perspective.

### Implement lifecycle testing

Testing should cover the complete MCP server lifecycle, which has two distinct phases.

The connection phase should verify:
- that clients can connect with minimal configuration
- that tools are discoverable even if full configuration is incomplete

The tool invocation phase must:
- keep each tool call self-contained
- create connections per tool call, not on server start
- allow graceful degradation when dependencies are unavailable

This pattern improves usability and reliability. Users can explore available tools even when the server is not fully configured.

---

## Operating MCP servers

### Instrument like any service you operate

You should implement comprehensive observability across logging, metrics, and tracing.

Logging should include:
- emitting structured logs with correlation IDs
- including tool name and invocation ID
- recording latency, success and failure, and token cost hints
- logging soft limits and rate limits explicitly

Metrics should track:
- request counts, latencies (p50, p95, p99)
- error rates by tool and error type
- token usage and costs
- connection counts and durations

Tracing should include:
- implementing distributed tracing for complex workflows
- correlating requests across multiple tool calls
- tracking performance across MCP server boundaries

### Implement health checks

Your MCP server should expose a health status endpoint so your infrastructure can detect failures, route traffic appropriately, and trigger restarts when needed. The endpoint should report on:

- liveness, which checks whether the server process is running
- readiness, which checks whether the server can accept and handle requests
- dependency health, which checks whether external services such as databases and APIs are available

An example health check response.
```json
{
  "status": "healthy|degraded|unhealthy",
  "checks": [
    {
      "name": "database",
      "status": "healthy",
      "responseTime": 45.2,
      "lastChecked": "2025-01-12T10:30:00Z"
    }
  ]
}
```

### Package and deploy like a microservice

Container best practices include:
- containerising your servers with minimal runtime images
- clearly declaring transport and invocation commands
- publishing to trusted container registries
- signing and verifying container images

Documentation requirements include:
- tool catalogue with descriptions
- complete input and output schemas
- security notes and required permissions
- configuration examples and troubleshooting guide

### Implement graceful degradation

Design principles include:
- returning cached data when upstream services fail
- providing partial results when some operations fail
- including retry guidance in error messages
- implementing circuit breakers for unreliable dependencies

An example pattern.
```javascript
try {
  return await fetchFromUpstream();
} catch (DatabaseError) {
  return await fetchFromCache(); // Fallback to cached data
} catch (Exception e) {
  return {
    error: "Service temporarily unavailable",
    cached: true,
    retryAfter: 60
  };
}
```

---

## Authorisation and consent

### Use elicitation carefully

Elicitation allows servers to request additional input during tool execution.

Appropriate uses include:
- filling in missing parameters
- confirming risky actions before execution
- getting user preferences for ambiguous requests

Security requirements include:
- never using elicitation to harvest sensitive data
- keeping prompts concise and specific
- validating responses against your tool's schema
- falling back gracefully if host does not support elicitation

The June 2025 MCP revision introduced Elicitation. Not all clients support it. Always check client capabilities before using elicitation.

### Obtain explicit consent for impactful actions

For operations that change state, spend money, or access sensitive data, required safeguards include:
- requiring confirmation via elicitation or dry run mode
- returning a diff of intended changes before execution
- using structured content for machine readable change summaries
- implementing approval workflows for high risk operations

An example workflow.

1. The user requests 'Delete old backups'.
2. The tool responds with a list of 47 backups to delete (3.2TB) and their last modified dates.
3. The user explicitly confirms before deletion proceeds.

### Implement fine-grained authorisation

Best practices include:
- enforcing per tool authorisation checks
- implementing per parameter authorisation where needed
- supporting role-based access control (RBAC)
- documenting required permissions clearly

A document management server might define permissions at three levels. This includes:
- creating and modifying documents (`write_documents` permission)
- deleting documents (`delete_documents` permission) – requires additional confirmation

---

## Community and ecosystem

### Prefer official and vetted servers

Selection criteria include:
- starting with vendor provided MCP servers for common services
- only adopting servers that are actively maintained, security reviewed, version controlled, and policy compliant

When building custom servers, you should:
- contribute fixes upstream to existing servers when possible
- wrap with gateway policies rather than forking
- build custom servers only when gaps are material
- plan migration paths if third party servers fall behind

### Follow platform guidelines

Important considerations include:
- noting that MCP adoption varies across platforms (Windows, macOS, Linux)
- recognising that not all clients support all features (OAuth 2.1, structured content, elicitation)
- checking platform documentation before relying on specific features
- implementing graceful degradation for unsupported features

### Document and share

Community best practices include:
- publishing a clear README with setup instructions
- sharing configuration examples
- documenting common issues and solutions
- contributing to the MCP community discussions
- sharing lessons learned from real world deployments

---

## Further reading

[MCP servers overview](README.md) provides an introduction to Model Context Protocol servers.

[MCP server design and architecture guide](mcp-server-design-and-architecture-guide.md) provides detailed implementation guidance.

[Context engineering playbook](../playbooks/context-engineering.md) covers broader context strategies.

## MCP community resources

The following sections cover the most up to date information from the MCP community.

### Core specification

[MCP specification (latest)](https://modelcontextprotocol.io/specification/2025-11-25) includes the protocol specification.

[MCP documentation](https://modelcontextprotocol.info/docs/) provides comprehensive guides and tutorials.

[Security best practices](https://modelcontextprotocol.io/specification/draft/basic/security_best_practices) covers security guidance.

[Best practices guide](https://modelcontextprotocol.info/docs/best-practices/) provides detailed implementation guidance.

### Development resources

[MCP GitHub repository](https://github.com/modelcontextprotocol) includes source code and examples.

[MCP Inspector tool](https://github.com/modelcontextprotocol/inspector) is for testing and debugging.

[Official SDKs](https://modelcontextprotocol.io/docs/sdk) covers Python, TypeScript, Java, and C# implementations.

[MCP server registry](https://github.com/modelcontextprotocol/registry) is the community server catalogue.

### Security and enterprise

[OAuth 2.1 implementation guide](https://auth0.com/blog/mcp-specs-update-all-about-auth/) covers authorisation updates.

[Docker MCP security](https://www.docker.com/blog/mcp-server-best-practices/) covers container security practices.

[OWASP practical guide to secure MCP server development](https://genai.owasp.org/resource/a-practical-guide-for-secure-mcp-server-development/) covers threat modelling, input validation, authentication, and secure deployment practices for MCP servers.

### Community and support

[MCP community forum](https://github.com/orgs/modelcontextprotocol/discussions) is for asking questions and sharing experiences.

[Anthropic MCP blog](https://www.anthropic.com/engineering/code-execution-with-mcp) covers code execution patterns.

[The New Stack guide](https://thenewstack.io/15-best-practices-for-building-mcp-servers-in-production/) covers deploying MCP servers in live environments.


---

Remember that these best practices evolve with the MCP specification.
