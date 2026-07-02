> ALPHA
> This is a new service. Your [feedback](https://github.com/govuk-digital-backbone/aiengineeringlab/discussions) will help us to improve it.

> MCP server availability depends on your organisation's approval. Check with your organisation before setting up MCP servers.

# MCP servers: partner implementations

This guide covers examples of Model Context Protocol (MCP) servers from major technology vendors to evaluate for your team's needs.

## Contents

[Industry adoption and governance](#industry-adoption-and-governance)

[Cloud infrastructure platforms](#cloud-infrastructure-platforms)

[Development and collaboration platforms](#development-and-collaboration-platforms)

[AI and machine learning platforms](#ai-and-machine-learning-platforms)

[Data and analytics platforms](#data-and-analytics-platforms)

[Evaluating MCP servers for your team](#evaluating-mcp-servers-for-your-team)

[Cloud provider comparison](#cloud-provider-comparison)

[Further reading](#further-reading)

### Content

Examples of MCP servers from major technology vendors – including cloud platforms, development tools, and collaboration services – with evaluation guidance for enterprise teams.

### Purpose

To help teams evaluate and select MCP servers from established vendors, making informed decisions before deployment.

### Who this is for

Technical leads, enterprise architects, and procurement teams evaluating MCP servers from established vendors. You need a basic understanding of MCP fundamentals (see [MCP servers introduction](mcp-introduction.md)).

---

Verify the following before deployment.

1. Security and compliance requirements for your organisation.
2. Vendor support arrangements and service level agreements.
3. Data residency and sovereignty requirements.
4. Costs and licensing terms.

Each vendor section includes links to official documentation where you can find current information about compliance certifications, security features, and support options.

---

## Industry adoption and governance

Anthropic donated the MCP to the Agentic AI Foundation (AAIF) under the Linux Foundation in December 2025. Founding platinum members include:

- Amazon Web Services (AWS)
- Anthropic
- Block
- Bloomberg
- Cloudflare
- Google
- Microsoft
- OpenAI

This vendor-neutral governance ensures MCP remains open, interoperable, and community driven as critical infrastructure for AI.

Adoption metrics as of January 2026 include:

- over 97 million monthly software development kit (SDK) downloads
- 10,000 active MCP servers and more
- first class client support across major AI platforms (ChatGPT, Claude, Cursor, Gemini, Microsoft Copilot)
- enterprise deployments at Block, Bloomberg, Amazon, and hundreds of Fortune 500 companies

---

## Cloud infrastructure platforms

### Microsoft Azure

Microsoft provides the Azure MCP Server for Azure cloud management.

The Azure MCP Server enables AI agents to interact with Azure resources through natural language. It provides access to Azure services including Storage, Cosmos DB, Log Analytics, Azure CLI, Azure Developer CLI (azd), PostgreSQL, and MySQL. It uses the Azure Identity library with Entra ID authentication and supports role-based access control (RBAC) for fine-grained permissions. It is available as an npm package, a Docker container, or through VS Code integration.

Find the documentation at [learn.microsoft.com/azure/developer/azure-mcp-server](https://learn.microsoft.com/en-us/azure/developer/azure-mcp-server/) and [github.com/Azure/azure-mcp](https://github.com/Azure/azure-mcp).

This server is in public preview.

For information about Azure's security certifications and compliance, see [Microsoft Trust Center](https://www.microsoft.com/en-us/trust-center).

---

### Amazon Web Services (AWS)

AWS provides multiple MCP servers for AWS service integration.

The AWS MCP Server is a managed remote MCP server that gives AI agents secure, authenticated access to AWS services through natural language. It combines comprehensive AWS API support with access to AWS documentation, API references, and agent standard operating procedures (SOPs).

The AWS Documentation MCP Server provides tools to access AWS documentation, search for content, and get recommendations. Find documentation at [github.com/aws/aws-documentation-mcp-server](https://github.com/aws/aws-documentation-mcp-server) and [awslabs.github.io/mcp](https://awslabs.github.io/mcp/).

AWS also provides specialised MCP servers for Amazon MSK (Kafka management), AWS CDK (infrastructure as code), AWS Cloud Control API, AWS Serverless, and more.

Find the documentation at [docs.aws.amazon.com/aws-mcp](https://docs.aws.amazon.com/aws-mcp/), [awslabs.github.io/mcp](https://awslabs.github.io/mcp/), and [github.com/awslabs/mcp](https://github.com/awslabs/mcp).

The AWS MCP Server is available at no additional cost in the US East (N. Virginia) Region.

For information about AWS security certifications and compliance, see [AWS compliance programmes](https://aws.amazon.com/compliance/programs/).

---

### Google Cloud Platform

Google provides managed remote MCP servers for Google Cloud and Workspace services.

Google Cloud MCP Servers provide a unified interface across Google and Google Cloud services. They are currently available for BigQuery, Google Maps, Google Kubernetes Engine, Google Compute Engine, and Cloud Storage. Additional services are rolling out, including Cloud Run, AlloyDB, Cloud SQL, Spanner, Looker, Pub/Sub, and Dataplex. They use OAuth authentication with Identity and Access Management (IAM) controls and audit logging.

Google Workspace MCP Servers are remote MCP servers for Google Workspace services including Docs, Sheets, Slides, Calendar, and Gmail. They enable document creation, spreadsheet manipulation, presentation generation, and email management using OAuth 2.0 with workspace level permissions.

The Google Cloud Database Toolbox provides an MCP server for databases including BigQuery, Cloud SQL, AlloyDB, Spanner, and Firestore.

Find the documentation at [docs.cloud.google.com/mcp](https://docs.cloud.google.com/mcp/overview), [github.com/googleapis/gcloud-mcp](https://github.com/googleapis/gcloud-mcp), and [github.com/google/mcp](https://github.com/google/mcp).

Google announced these servers on 10 December 2025.

For information about Google Cloud security certifications and compliance, see [Google Cloud Compliance](https://cloud.google.com/security/compliance).

---

### Cloudflare

Cloudflare provides infrastructure for deploying MCP servers on their edge network.

The Cloudflare Workers MCP integration enables deployment of MCP servers on Cloudflare's edge network. It provides low-latency, globally distributed MCP server hosting with automatic scaling. Cloudflare's Agents SDK provides OAuth support and remote MCP server capabilities. Find documentation at [developers.cloudflare.com](https://developers.cloudflare.com/).

Cloudflare is a platinum member of the Agentic AI Foundation. Partners including Atlassian use Cloudflare infrastructure for their remote MCP server hosting.

For information about Cloudflare security certifications and compliance, see [Cloudflare Trust Hub](https://www.cloudflare.com/trust-hub/).

---

## Development and collaboration platforms

### Microsoft

Microsoft builds MCP servers for their development ecosystem, integrating with Azure, documentation, and business tools.

| Server | Capability |
|--------|------------|
| Microsoft Learn Docs | Searches Microsoft's official documentation including Microsoft Learn, Azure, and Microsoft 365 |
| Microsoft Clarity | Provides behavioural analytics data showing user interactions and website performance |
| Microsoft Dataverse | Queries business data using natural language, discovering tables and retrieving data |
| Microsoft Teams | Enables agent orchestration and multi-agent collaboration with Teams messaging |
| Microsoft Business Central | Manages Dynamics 365 Business Central customers, contacts, sales opportunities, invoices, and vendors |

Find the documentation at [developer.microsoft.com/blog/10-microsoft-mcp-servers](https://developer.microsoft.com/blog/10-microsoft-mcp-servers-to-accelerate-your-development-workflow) and [github.com/microsoft/mcp](https://github.com/microsoft/mcp).

Microsoft has integrated MCP into Windows 11 and Azure AI Foundry.

---

### Atlassian

Atlassian provides a remote MCP server for Jira and Confluence integration.

The Atlassian Rovo MCP Server connects Jira, Confluence, and Compass to AI tools. It enables you to search and read Confluence spaces and pages, access Jira issues and project metadata, create work items, and manage Atlassian Cloud products. Atlassian built it in partnership with Anthropic and runs it on Cloudflare infrastructure.

Find the documentation at [atlassian.com/platform/remote-mcp-server](https://www.atlassian.com/platform/remote-mcp-server), [github.com/atlassian/atlassian-mcp-server](https://github.com/atlassian/atlassian-mcp-server), and [support.atlassian.com/atlassian-rovo-mcp-server](https://support.atlassian.com/atlassian-rovo-mcp-server/).

This server is in public beta. It uses OAuth installation and is not installed via the Atlassian Marketplace.

For information about Atlassian security certifications and compliance, see [Atlassian Trust Center](https://www.atlassian.com/trust).

---

## AI and machine learning platforms

### Anthropic

Anthropic maintains reference MCP servers demonstrating protocol features and best practices.

These reference servers are educational examples including Postgres, GitHub, Slack, Puppeteer, and others. They demonstrate best practices for MCP implementation and serve as templates for custom server development. They are not intended for operational deployments requiring enterprise compliance certifications.

Find the documentation at [modelcontextprotocol.io](https://modelcontextprotocol.io) and [github.com/modelcontextprotocol/servers](https://github.com/modelcontextprotocol/servers).

Anthropic donated MCP to the Agentic AI Foundation in December 2025 to ensure vendor-neutral governance.

---

### OpenAI

OpenAI provides MCP support across their AI products and development tools.

OpenAI provides full MCP support in GPT-4o, the Agents SDK, and the ChatGPT desktop application. OpenAI officially adopted MCP in March 2025 after integrating the standard across its products. It enables developers to connect AI applications with external data sources and tools.

OpenAI also contributed AGENTS.md, a universal standard that provides AI coding agents with project-specific guidance for reliable operation across repositories. More than 60,000 open source projects have adopted it. Find documentation at [docs.aaif.ai](https://docs.aaif.ai/).

Find the documentation at [platform.openai.com](https://platform.openai.com/).

OpenAI is a founding platinum member of the Agentic AI Foundation. For compliance information about specific OpenAI products, see [OpenAI Trust Portal](https://trust.openai.com/).

---

## Data and analytics platforms

### Hugging Face

Hugging Face provides MCP server capabilities for AI model discovery and integration.

The Hugging Face MCP server provides model discovery, inference APIs, and chat application integration. The community has created thousands of MCP applications using Gradio. It enables AI integration with Hugging Face's model hub for accessing pre-trained models and datasets.

Find the documentation at [huggingface.co/docs](https://huggingface.co/docs).

Hugging Face integrations use community developed MCP implementations. Verify compatibility, security, and support requirements before deployment.

---
## Evaluating MCP servers for your team

For evaluation guidance, see:

- [MCP best practices](mcp-best-practices.md)

---

## Cloud provider comparison

| Feature | AWS | Azure | Google Cloud |
|---------|-----|-------|--------------|
| MCP server availability | Multiple servers | Azure MCP Server | GCP and Workspace servers |
| Authentication | IAM | Entra ID | Google Cloud IAM |
| UK data residency | London regions | UK South and West | London region |
| Government framework | G-Cloud 14 | G-Cloud 14 | G-Cloud 14 |
| Documentation | docs.aws.amazon.com/aws-mcp | learn.microsoft.com | docs.cloud.google.com/mcp |

For current compliance and security certifications, consult each vendor's trust centre.

---

## Further reading

[MCP servers introduction](mcp-introduction.md) covers Model Context Protocol fundamentals.

[MCP industry implementation examples](mcp-industry-implementation-examples.md) covers development and testing MCP servers.

[MCP server design and architecture guide](mcp-server-design-and-architecture-guide.md) covers architecture patterns.

---
