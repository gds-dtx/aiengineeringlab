> MCP server availability depends on your organisation's approval. Check with your organisation before setting up MCP servers.

# MCP server design and architecture guide

This guide helps you design and architect effective MCP servers. It covers selecting the right architectural pattern, implementing security controls, testing strategies, and enterprise integration patterns.

## Contents

[What you will learn](#what-you-will-learn)

[Understanding MCP server types](#understanding-mcp-server-types)

[Design principles](#design-principles)

[Creating new MCP servers](#creating-new-mcp-servers)

[Extending existing MCP servers](#extending-existing-mcp-servers)

[Integration and deployment](#integration-and-deployment)


[Validation and testing](#validation-and-testing)

[Common pitfalls](#common-pitfalls)

[Summary](#summary)

[Further reading](#further-reading)

### Content

Architecture patterns, security controls, testing strategies, and enterprise integration patterns for designing and building MCP servers.

### Purpose

To help technical architects and engineers plan and implement MCP servers that are secure, scalable, and fit for government use.

### Who this is for

Technical architects and engineers planning MCP implementations. You should have experience configuring MCP servers (see [MCP servers introduction](mcp-introduction.md)) and be familiar with [MCP best practices](mcp-best-practices.md).

---
## What you will learn

This guide covers both the design and architecture of MCP servers, including:
- four server architecture types (knowledge, function, hybrid, prompt)
- security architecture and authentication layers
- enterprise integration patterns
- deployment and operational architecture
- outcome-focused interface design
- API transformation strategies
- tool and resource naming conventions
- workflow encapsulation patterns
- testing strategies (unit, integration, real AI testing)
- performance optimisation and monitoring
- extending existing servers versus building new ones
- common pitfalls and how to avoid them


## Understanding MCP server types

MCP servers fall into distinct categories based on their purpose and the type of context they provide. Understanding these patterns helps you choose the right design approach.

### Knowledge servers (read only context)

Knowledge servers provide standards, guidelines, documentation, and reference materials to AI assistants without allowing modifications.

A knowledge server's characteristics include:
- the primary exposure of resources (read only data)
- few or no tools
- a focus on context retrieval and search
- examples such as standards documentation, API specifications, and coding guidelines

Use knowledge servers when:
- integrating organisational standards
- providing reference documentation
- making policies and guidelines accessible
- sharing best practices and patterns

The following example shows the architecture pattern.
```javascript
server.addResource({
  name: 'service-standard',
  description: 'GOV.UK Service Standard points and criteria',
  async fetch() {
    return {
      content: await loadStandardsContent()
    };
  }
});
```

### Function servers (action oriented)

Function servers provide tools that perform specific actions or operations, such as querying databases, calling APIs, or processing data.

A function server's characteristics include:
- the primary exposure of tools (executable operations)
- supporting resources for tool documentation where needed
- the ability to perform actions on behalf of users
- examples such as database queries, API integrations, and file operations

Use function servers when:
- integrating with existing systems
- automating common workflows
- providing specialised capabilities
- connecting to external services

An example is a server that queries internal department systems or submits forms to case management platforms.

### Critical security considerations

Function servers are inherently high risk because they perform actions that can modify system state, execute commands, and access sensitive data.

Key security requirements include:
- establishing authentication between all components
- implementing fine grained access control with least privilege
- requiring user confirmation for actions that alter data or environment state
- strictly validating all inputs from clients
- implementing rate limiting and encrypted channels (Transport Layer Security (TLS))
- monitoring for session abuse with anomaly detection

Primary threats to mitigate include:
- confused deputy attacks (users accessing resources via server privileges)
- prompt injection attacks (AI tricked into unintended actions)
- tool poisoning (manipulated tool metadata or execution logic)
- token passthrough and session hijacking

For detailed security implementation, see:
- [MCP best practices – security first](mcp-best-practices.md#security-first) – security requirements and checklist

The following example shows the architecture pattern.
```javascript
server.addTool({
  name: 'query-cases',
  description: 'Query cases from case management system',
  parameters: {
    status: { type: 'string', enum: ['open', 'closed', 'pending'] },
    limit: { type: 'number', default: 10 }
  },
  async execute({ status, limit }) {
    // Validate authentication and authorisation
    if (!context.user || !context.user.hasPermission('cases:read')) {
      throw new Error('Authentication and authorisation required');
    }
    
    // Validate and sanitise inputs
    if (limit > 100) throw new Error('Limit cannot exceed 100 records');
    
    // Audit the action
    await auditLog({
      user: context.user.id,
      action: 'query-cases',
      parameters: { status, limit }
    });
    
    return await queryCaseSystem(status, limit);
  }
});
```

### Hybrid servers (knowledge and actions)

Hybrid servers combine reference knowledge with operational capabilities, providing both context and the ability to act on that context.

A hybrid server's characteristics include:
- the exposure of both resources and tools
- resources that inform tool usage
- tools that may create or modify resources
- examples such as documentation with validation tools, and standards with compliance checkers

Use hybrid servers when:
- providing guidance alongside enforcement
- offering reference materials with related actions
- creating self-documenting systems
- building domain specific assistants

An example is an accessibility server that provides Web Content Accessibility Guidelines (WCAG) guidance (resources) and validates HTML for compliance (tools).

The following example shows the architecture pattern.
```javascript
// Provide WCAG documentation
server.addResource({
  name: 'wcag-criteria',
  description: 'WCAG 2.2 success criteria',
  async fetch() {
    return { content: await loadWCAGCriteria() };
  }
});

// Validate against those criteria
server.addTool({
  name: 'validate-accessibility',
  description: 'Check HTML against WCAG 2.2 Level AA',
  parameters: {
    html: { type: 'string', description: 'HTML content to validate' }
  },
  async execute({ html }) {
    return await runAccessibilityAudit(html);
  }
});
```

### Prompt servers (workflow orchestration)

Prompt servers use MCP's prompts feature to provide pre configured workflows that chain multiple operations together, simplifying complex tasks.

A prompt server's characteristics include:
- the exposure of prompts as reusable workflows
- the ability to delegate to tools or other servers
- reduced cognitive load for common tasks
- examples such as multi step analysis workflows and guided processes

Use prompt servers when:
- standardising complex workflows
- reducing tool budget by wrapping multiple operations
- providing guardrails around sensitive operations
- creating domain specific task templates

The following example shows the architecture pattern.
```javascript
server.addPrompt({
  name: 'security-review',
  description: 'Perform comprehensive security review of code',
  async generate(args) {
    return {
      messages: [
        {
          role: 'user',
          content: `Analyse this code for security issues:
1. Check for OWASP Top 10 vulnerabilities
2. Verify authentication mechanisms
3. Review data validation
4. Assess error handling
5. Check for sensitive data exposure

Code: ${args.code}`
        }
      ]
    };
  }
});
```

## Design principles

### Design for outcomes, not operations

A critical principle in MCP server design is focusing on what users want to achieve. Design for outcomes rather than the specific operations users must perform.

Tools designed around operations (poor pattern) include list-files, read-file, parse-content, search-text, and format-results. This approach:

- requires the user or AI to orchestrate multiple steps
- increases token usage and latency
- exposes implementation details

Tools designed around outcomes (good pattern) include find-in-documentation, which handles all steps in a single call. This approach:

- allows the AI to specify the desired outcome
- lets the server handle implementation details
- provides a cleaner interface with better performance

### Naming conventions

Your tool and resource names should describe the outcome, not the mechanism.

Names that focus on operations are poor choices. Examples include execute-database-query, make-http-request, parse-json-response, and write-to-file.

Names that focus on outcomes are good choices. Examples include find-active-cases, get-user-profile, submit-form, and save-configuration.

Use verb-noun pairs that describe business or user intent. For example, use verify-compliance rather than run-checker-script, generate-report rather than fetch-data-and-format, and schedule-review rather than insert-calendar-entry.

### Encapsulating workflows

When a task naturally requires multiple steps, you should encapsulate the entire workflow in one tool or prompt rather than exposing each step.

Onboarding workflow example.

The poor approach exposes individual steps.
```javascript
server.addTool({ name: 'create-user-account' });
server.addTool({ name: 'assign-default-permissions' });
server.addTool({ name: 'send-welcome-email' });
server.addTool({ name: 'create-home-directory' });
server.addTool({ name: 'add-to-team-channels' });
// AI must call all 5 tools in correct order
```

The good approach focuses on the outcome.
```javascript
server.addTool({
  name: 'onboard-team-member',
  description: 'Complete onboarding for new team member',
  parameters: {
    email: { type: 'string' },
    team: { type: 'string' },
    role: { type: 'string', enum: ['engineer', 'manager', 'admin'] }
  },
  async execute({ email, team, role }) {
    // Orchestrate all steps internally
    const user = await createAccount(email);
    await assignPermissions(user, role);
    await sendWelcome(user);
    await setupWorkspace(user, team);
    await addToChannels(user, team);
    
    return {
      success: true,
      userId: user.id,
      message: `${email} onboarded to ${team} as ${role}`
    };
  }
});
```

### Think tasks, not endpoints (API integration)

The most common mistake when creating MCP servers from APIs is attempting a one-to-one transformation of API endpoints to MCP tools. This approach fails because APIs are resource-based (designed for machines) whilst MCP servers must be task-based (designed for AI understanding).

Do not expose raw API endpoints. This raises problems for the LLM.
```javascript
// Do not do this - exposing raw API endpoints
server.addTool({ name: 'get-laptop' });
server.addTool({ name: 'post-order' });
server.addTool({ name: 'put-status' });
server.addTool({ name: 'delete-item' });
// LLM must orchestrate multiple calls
```

Do expose business tasks.
```javascript
// Do this - expose business tasks
server.addTool({ 
  name: 'order-laptop',
  description: 'Complete laptop procurement process for employee',
  // Orchestrates multiple API calls internally
});
```

### Designing API integration servers

Start by defining what users need to accomplish, not what your API can do. Bundle related API calls into single tools that represent complete workflows.

Laptop procurement MCP server example.

Rather than exposing 10 or more procurement API endpoints as individual tools, create 3 task-based tools.

1. Check laptop eligibility – determines if an employee can order a laptop (checks role, existing assets, budget).
2. Order laptop – completes the full order workflow (validates specs, creates order, assigns approvers, sends notifications).
3. Track laptop order – provides order status and delivery information.

Each tool internally calls multiple API endpoints but presents a single coherent interface to the LLM.

### Error message design for AI agents

When designing error responses, remember that the AI agent calls your tool, not the end user directly. Design error messages that help agents make intelligent decisions.

The following shows a poor error message.
```
"You do not have access to this system"
```

The following shows a good error message.
```
"To access this system, the MCP server needs a valid API_TOKEN. 
The current API_TOKEN is invalid or expired. 
Please update the API_TOKEN in your MCP configuration."
```

Agents need actionable information to decide what to do next. Design error messages that help them understand whether:

- the problem is a configuration issue they can report to the user
- the failure is temporary and they should retry
- the constraint is permanent and they should work around it

The following example shows the error message structure.
```json
{
  "error": {
    "type": "AuthenticationError",
    "message": "OAuth token expired",
    "actionable": true,
    "retryable": false,
    "resolution": "Please re-authenticate in your MCP client settings",
    "documentationUrl": "https://docs.example.gov.uk/mcp/auth"
  }
}
```

### Structured output design

Design outputs with both human and machine audiences in mind using structured content with `outputSchema`.

Benefits include:
- LLM parsable responses alongside human readable text
- reduced token usage through efficient serialisation
- better agent decision making with typed data
- composability across tools

The following example shows the output structure.
```json
{
  "type": "text",
  "text": "Found 42 pending orders for review",
  "structuredContent": {
    "count": 42,
    "status": "pending",
    "priority": "high",
    "schema": {
      "type": "object",
      "properties": {
        "count": { "type": "number" },
        "status": { "type": "string" },
        "priority": { "type": "string" }
      }
    }
  }
}
```

### Authentication layers for API integration

Authentication should be handled in layers. You should ensure:

- the MCP client authenticates to your MCP server using OAuth 2.1
- the MCP server authenticates to each upstream API using whichever method that API requires (API keys, OAuth 2.0, or certificates)
- upstream credentials are never exposed to the LLM

Transform API responses into natural language summaries alongside structured data. Filter technical details and sensitive information before returning to the LLM.

### Security requirements for API integration

Beyond standard function server security, API integration servers must address the following areas.

Address credential isolation by:
- storing each upstream API's credentials separately in secret managers
- using independent credentials per API

Enforce per API permissions by ensuring:
- MCP server access does not grant access to all upstream APIs
- the server enforces per API authorisation checks

Perform request validation by:
- validating all parameters before calling upstream APIs
- preventing injection attacks

Perform response sanitisation by:
- filtering upstream responses to prevent leaking sensitive data or tokens
- removing authentication credentials from responses

Implement audit logging to:
- log all upstream API calls with user context
- record request parameters and responses for security review

Implement approval workflows to:
- require explicit consent when calling APIs in different trust domains
- ensure explicit consent for cross domain operations

## Creating new MCP servers

When building a completely new MCP server, follow this process to ensure a solid foundation.

### Step 1: Define scope and boundaries

Start by clearly defining what your server will and will not do. Apply the single responsibility principle ruthlessly.

Before you start, define the following.

1. The specific domain or capability this server addresses.
2. The context or actions you should include.
3. The related capabilities that belong in separate servers.
4. The primary users and their workflows.

### Step 2: Choose server type and architecture

Based on your scope, select the server type that best fits your needs. Options include:

- knowledge server for standards and documentation
- function server for actions and integrations
- hybrid server for combining guidance with enforcement
- prompt server for workflow orchestration

Select the appropriate design pattern from the examples above.

### Step 3: Design the interface

Sketch out the resources, tools, and prompts you will expose. Write descriptions from both human and AI perspectives.

For resources, consider:

- what content you will provide
- how you will organise and search it
- what format works best for AI consumption

For tools, consider:

- what inputs they require
- what outputs they produce
- what side effects they have
- what can go wrong and how you handle errors

### Step 4: Implement security first

Before writing functional code, implement the security layer. Security is not optional for MCP servers, especially function servers that perform actions.

Essential security components include:
- setting up OAuth 2.1 if using HTTP transport
- configuring secret management
- defining authorisation rules
- implementing input validation schemas
- planning audit logging

For comprehensive security implementation guidance, see:
- [MCP best practices – security first](mcp-best-practices.md#security-first) – security requirements and checklist

### Step 5: Build incrementally

Start with the minimum viable server.

1. Implement server initialisation and health checks.
2. Add one resource or tool with full security.
3. Test thoroughly with MCP Inspector.
4. Add logging and monitoring.
5. Iterate by adding more capabilities.

Validate and test your server by configuring it in actual AI code assistants (Claude Code, GitHub Copilot, and similar) and checking that:
- tools appear as expected during discovery
- operations work correctly during execution
- errors are handled gracefully

For testing strategy and operational patterns, see the following resources.

| Resource | Location |
|----------|----------|
| High-level testing requirements | [MCP best practices – testing and quality](mcp-best-practices.md#testing-and-quality) |
| Detailed test implementation | [Validation and testing](#validation-and-testing) (this guide) |

### Step 6: Document and deploy

Documentation for both humans and AI should include:

- a README with setup instructions
- a tool catalogue with examples
- configuration templates
- a troubleshooting guide

Package your server as a container and deploy using standard microservice practices.

### Using community templates

The MCP community provides starter templates you can adapt.

> REMINDER: Review all community code for security vulnerabilities and compliance before deployment. 

Use the TypeScript template as follows.
```bash
npx @modelcontextprotocol/create-server my-server
cd my-server
npm install
```

Use the Python template as follows.
```bash
pip install mcp
mcp init my-server
cd my-server
```

These templates include:
- basic server structure
- configuration handling
- example resources and tools
- testing setup
- documentation templates

Adapt the template to your needs by modifying the example resources and tools.

## Extending existing MCP servers

Often you do not need to create a new server from scratch. You can extend or wrap an existing one to add government-specific requirements or department-specific context.

### Wrapper pattern

Wrap an existing MCP server to add additional context, authorisation, or transformation logic without modifying the original.

Use the wrapper pattern when:
- adding department specific guardrails
- implementing additional authorisation
- transforming responses for your context
- adding caching or rate limiting

The following example wraps the community standards server with security validation.
```javascript
// Wraps the community standards server with security validation
import { OriginalServer } from '@community/standards-server';

class SecureStandardsServer {
  constructor() {
    this.upstream = new OriginalServer();
  }
  
  async callTool(name, args) {
    // Add security validation
    await this.validateAccess(name, args);
    
    // Call upstream server
    const result = await this.upstream.callTool(name, args);
    
    // Sanitise response
    return this.sanitiseResponse(result);
  }
}
```

### Composite pattern

Combine multiple existing servers into a unified interface, reducing tool budget and simplifying configuration.

Use the composite pattern when:
- creating domain specific assistants
- reducing the number of servers users must configure
- providing a unified interface to related capabilities
- managing dependencies between servers

The following example combines multiple standards servers.
```javascript
// Combines multiple standards servers
class GovStandardsServer {
  constructor() {
    this.servers = {
      serviceStandard: new ServiceStandardServer(),
      accessibility: new AccessibilityServer(),
      security: new SecurityServer()
    };
  }
  
  listTools() {
    // Expose selected tools from each server
    return [
      ...this.servers.serviceStandard.listTools(),
      ...this.servers.accessibility.listTools(),
      ...this.servers.security.listTools()
    ];
  }
}
```

### Fork and enhance pattern

Fork an existing open source MCP server and add your specific requirements.

Use the fork and enhance pattern when:
- the existing server is close but missing critical features
- upstream is inactive or unresponsive
- you need deep customisation
- security review requires code ownership

Follow this process.
1. Fork the repository.
2. Add your enhancements.
3. Maintain compatibility with upstream where possible.
4. Plan migration path if upstream evolves.
5. Consider contributing improvements back.

Document why you forked and under what conditions you would merge back to upstream.

### Working with existing repositories

Many organisations have existing documentation repositories or internal wikis. You can create MCP servers that expose this content without duplicating it.

#### Dynamic fetching

Configure your server to fetch content from existing sources at runtime.

Benefits include:
- content that is always up to date
- no content duplication
- single source of truth maintained

Considerations include:
- requirement for network access to the content source
- potential latency on first fetch
- need for authentication if content is private
- caching implementation needed for performance

#### Build time generation

Generate MCP server resources from existing documentation as part of your build and deployment pipeline.

Benefits include:
- no runtime dependencies
- fast response times
- ability to preprocess and optimise content
- offline capability

Considerations include:
- rebuild required to pick up changes
- larger deployment artifact
- synchronisation required with documentation updates

## Integration and deployment

### Integrating with organisational infrastructure

MCP servers need to integrate with your organisation's existing systems and practices.

For authentication and authorisation, you should:

- use your organisation's identity provider (Azure AD, Google Workspace, and similar)
- implement OAuth 2.1 with your identity service as the authorisation server
- enforce role based access control aligned with existing roles
- integrate with existing secret management solutions

For networking and deployment, you should:

- deploy MCP servers in your existing container orchestration platform
- use internal DNS and service discovery
- configure network policies and firewalls appropriately
- integrate with API gateways if using HTTP transport

For observability, you should:

- send logs to your central logging service (ELK, Splunk, and similar)
- expose metrics in your standard format (Prometheus, DataDog, and similar)
- implement distributed tracing compatible with your tools
- configure alerting consistent with other services

### Team and project level customisation

Different teams have different needs. Design for customisation without forking.

The following example shows configuration driven customisation.
```javascript
// Load team-specific configuration
const config = await loadConfig(`/config/${teamId}.json`);

server.addResource({
  name: 'team-standards',
  description: 'Team-specific coding standards',
  async fetch() {
    // Merge base standards with team overrides
    const base = await loadBaseStandards();
    return mergeStandards(base, config.standards);
  }
});
```

The following example shows project level context injection.
```javascript
// Read from project-specific CLAUDE.md or similar
server.addResource({
  name: 'project-context',
  description: 'Project-specific architecture and decisions',
  async fetch() {
    const projectRoot = process.env.PROJECT_ROOT;
    const claudemd = await readFile(`${projectRoot}/CLAUDE.md`);
    const adr = await readDirectory(`${projectRoot}/docs/adr`);
    
    return {
      content: `
# Project Context

${claudemd}

## Architecture Decision Records
${adr.map(formatADR).join('\n\n')}
      `
    };
  }
});
```

## Validation and testing

### Pre deployment validation

Before rolling out an MCP server, validate that it meets requirements.

The following example shows functional testing.
```javascript
// Test each tool independently
describe('standards-server', () => {
  test('search returns relevant results', async () => {
    const result = await server.callTool('search-standards', {
      query: 'authentication'
    });
    
    expect(result.results.length).toBeGreaterThan(0);
    expect(result.results[0]).toHaveProperty('title');
    expect(result.results[0]).toHaveProperty('content');
  });
});
```

The following example shows security testing.
```javascript
describe('security', () => {
  test('rejects unauthenticated requests', async () => {
    await expect(
      server.callTool('sensitive-operation', {}, { auth: null })
    ).rejects.toThrow('Authentication required');
  });
  
  test('enforces authorisation', async () => {
    const lowPrivUser = { roles: ['viewer'] };
    await expect(
      server.callTool('delete-data', {}, { user: lowPrivUser })
    ).rejects.toThrow('Insufficient permissions');
  });
});
```

The following example shows integration testing with MCP Inspector.
```bash
# Start your server
npm start &

# Run MCP Inspector
npx @modelcontextprotocol/inspector \
  --transport stdio \
  --command "node dist/index.js"
```
For operational testing and troubleshooting deployed servers, see the [MCP introduction – setting up MCP servers](mcp-introduction.md#setting-up-mcp-servers) section.

Use Inspector to:
- verify tool discovery
- test tool invocation manually
- inspect request and response formats
- validate error handling

### Post deployment monitoring

Once deployed, monitor actual usage to identify issues and improvement opportunities.

Usage metrics include:
- most and least used tools
- success versus failure rates by tool
- response time distributions
- token usage per tool
- connection errors and timeouts

Collect user feedback by:
- surveying users about helpfulness
- tracking thumbs up and thumbs down on AI responses
- monitoring support tickets related to MCP servers
- conducting user interviews for qualitative feedback

The following example shows performance tracking and logging.
```javascript
// Track and log performance
server.middleware((req, res, next) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    
    logger.info({
      tool: req.tool,
      duration,
      success: res.statusCode < 400,
      userId: req.user?.id
    });
    
    // Alert if slow
    if (duration > 5000) {
      alerting.warn(`Slow MCP tool: ${req.tool} took ${duration}ms`);
    }
  });
  
  next();
});
```

## Common pitfalls

### Pitfall: overloading servers with too many tools

The problem is creating a single server with 50 or more tools that spans multiple domains.

Symptoms include:
- difficulty maintaining and testing
- unclear security boundaries
- poor performance
- overwhelming tool count for AI to navigate

The solution is to split into multiple focused servers following single responsibility principle. If you have more than 10 to 15 tools in one server, consider splitting by domain.

### Pitfall: exposing implementation details

The problem is that tool names and descriptions focus on technical mechanisms rather than user outcomes.

Symptoms include:
- tools named like execute-sql, call-api-endpoint, run-script
- requiring users to understand implementation to use effectively
- implementation changes that break user workflows

The solution is to design outcome focused interfaces. Name tools for what users want to achieve, not how the server implements them internally.

### Pitfall: insufficient error handling

The problem is that errors from upstream systems bubble up without context.

Symptoms include:
- generic error messages like 'Request failed'
- no guidance on how to resolve issues
- no indication of whether an error is retryable

The solution is to implement comprehensive error handling with actionable messages.

```javascript
try {
  return await callUpstreamAPI();
} catch (error) {
  if (error.code === 'ECONNREFUSED') {
    throw new Error(
      'Unable to connect to case management system. ' +
      'The service may be temporarily unavailable. ' +
      'Please retry in a few minutes or contact support if the issue persists.'
    );
  } else if (error.code === 'UNAUTHORIZED') {
    throw new Error(
      'Your MCP server authentication token has expired. ' +
      'Please update the API_TOKEN in your MCP configuration file.'
    );
  } else {
    throw new Error(
      `Unexpected error: ${error.message}. ` +
      'Please contact support with error code: ' + generateErrorCode()
    );
  }
}
```

### Pitfall: not testing with real AI assistants

The problem is that the server works in unit tests but fails when used with actual AI code assistants.

Symptoms include:
- tools missing from AI's tool list
- tool descriptions the AI cannot understand
- responses in unexpected format
- authentication failures in real usage

The solution is to always test with the actual AI tools your users will use (Claude Code, GitHub Copilot, and similar) in addition to unit and integration tests.

### Pitfall: ignoring security from the start

The problem is when building for functionality first, and not planning to add security until later.

Symptoms include:
- secrets hardcoded or in configuration files
- no authentication or authorisation checks
- no input validation
- no audit logging

The solution is to implement security from day one.

### Pitfall: no versioning or change management

The problem is making breaking changes to tools without versioning.

Symptoms include:
- unexpected breakage of existing prompts and workflows
- inability to pin to stable versions
- no way to test changes before rollout
- difficult rollback

The solution is to use semantic versioning for your server and individual tools. Maintain backwards compatibility or provide clear migration paths.

## Summary

Designing and architecting effective MCP servers requires balancing multiple concerns.

Focus on outcomes – design tools and resources around what users want to achieve, not the operations they must perform. Use clear, intent driven naming.

Choose the right pattern – select server type (knowledge, function, hybrid, prompt) based on your use case. Do not try to make one server do everything.

Build security from the start – implement authentication, authorisation, and audit logging before adding features.

Design for AI consumption – write descriptions and structure outputs for AI agents, not just humans. Test with real AI assistants.

Keep servers focused – apply single responsibility principle. 10 to 15 well designed tools are better than 50 scattered ones. See [MCP best practices](mcp-best-practices.md) for operational patterns.

Extend rather than duplicate – start with existing servers and extend them when possible. Build new servers only when gaps are material.

Monitor and iterate – track usage and performance post deployment. Let real usage inform improvements.


## Further reading

### Getting started

[MCP introduction](mcp-introduction.md) covers MCP fundamentals.

### Building and operating servers

[MCP best practices](mcp-best-practices.md) covers operational patterns and recommendations.

### Advanced topics

[Context engineering playbook](../playbooks/context-engineering.md) covers broader context strategies beyond MCP.

### MCP specifications and implementations

[MCP specification](https://modelcontextprotocol.io/specification/2025-11-25) is the protocol specification.

[MCP documentation](https://modelcontextprotocol.info/docs/) provides implementation guides.

[Anthropic maintained MCP servers repository](https://github.com/modelcontextprotocol/servers) contains reference implementations.

### API integration patterns

[Best practices for transforming APIs into MCP servers](https://blog.axway.com/product-insights/amplify-platform/fusion/api-to-mcp) covers task-based versus resource-based design.

[Building an MCP server as an API engineer](https://heeki.medium.com/building-an-mcp-server-as-an-api-developer-cfc162d06a83) describes the journey from REST API to MCP server.

[MCP authorisation patterns for upstream API calls](https://www.solo.io/blog/mcp-authorization-patterns-for-upstream-api-calls) covers cross-domain trust and authentication.

### Video resources

[MCP server design patterns](https://www.youtube.com/watch?v=96G7FLab8xc) is a comprehensive guide to designing effective MCP servers, including API integration best practices.
