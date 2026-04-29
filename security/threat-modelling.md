> ALPHA
> This is a new service - your feedback will help us to improve it.

# AI coding assistant threat model

> Threat model for AI coding assistants in UK government contexts, covering adversarial ML, data security, supply chain and agentic AI risks.

## Contents

[Purpose](#purpose)

[Threat model scope](#threat-model-scope)

[Deployment architectures and data flows by tool type](#deployment-architectures-and-data-flows-by-tool-type)

[Assets to protect](#assets-to-protect)

[Threat actors](#threat-actors)

[Threat catalogue](#threat-catalogue)

[Risk Register summary](#risk-register-summary)

[Control coverage matrix](#control-coverage-matrix)

[Tool-type risk profiles](#tool-type-risk-profiles)

[Emerging threats](#emerging-threats)

[Threat model maintenance](#threat-model-maintenance)

[Further reading](#further-reading)

[Document control](#document-control)

## Purpose

This document provides a structured threat model for AI coding assistant deployments in government. It identifies:

- assets requiring protection
- threat actors and their capabilities
- attack vectors and techniques (mapped to MITRE ATLAS and OWASP)
- tool type specific deployment architectures and data flows
- risk assessment per threat
- control mappings to [Guardrails Base](../governance/guardrails-base.md)

This threat model aligns with [NCSC Machine Learning Security Principles](https://www.ncsc.gov.uk/files/Principles-for-the-security-of-machine-learning.pdf) and the [MITRE ATLAS](https://atlas.mitre.org/) framework.

---

## Threat model scope

### Systems in scope

| System Type | Examples | Autonomy Level |
|-------------|----------|----------------|
| Cloud-hosted AI assistants | GitHub Copilot, Amazon Q Developer, Gemini Code Assist, Claude.ai | L1-L2 |
| IDE-integrated agents | Cursor, Windsurf, GitHub Copilot (extension), Amazon Kiro, Claude Code | L2-L4 |
| Autonomous agents | Devin, Amazon Kiro (frontier mode), Claude Code (agentic) | L4-L5 |
| Self-hosted solutions | Ollama, LocalAI, LM Studio, private model hosting | L1-L4 |

### Data flows overview

AI coding assistants involve data flowing between user devices, cloud providers, repositories and training systems. Each tool type has distinct data flow characteristics and trust boundaries.

---

## Deployment architectures and data flows by tool type

### Architecture 1: cloud-hosted AI assistant

Example tools: GitHub Copilot, Amazon Q Developer, Gemini Code Assist, Claude.ai

Architecture diagram:
```mermaid
flowchart TD
    subgraph gov["Government Network"]
        subgraph ws["Developer Workstation"]
            ide["IDE (+ Plugin)"]
        end
    end

    ide -->|"HTTPS/TLS 1.3<br>[TB-01]"| lb

    subgraph vendor["Vendor Cloud"]
        lb[Load Balancer]
        api["AI Model API (Inference)"]
        store[User Data Store]
        lb --> api --> store
    end

    store -.->|"[TB-02] Optional"| training["Training Data Pipeline"]
```


Data flows:

| Step | From | To | Data | Purpose |
|------|------|----|----- |---------|
| 1 | Developer | IDE | Code, prompts | User input |
| 2 | IDE | Vendor Cloud | Code context (surrounding code), prompt, metadata | AI inference request |
| 3 | Vendor Cloud | AI Model | Processed input | Inference |
| 4 | AI Model | Vendor Cloud | Code suggestions | Response |
| 5 | Vendor Cloud | IDE | Suggestions | Display to user |
| 6 | IDE | Repository | Accepted code | Commit (after review) |
| 7 (Optional) | Vendor Cloud | Training pipeline | Anonymised usage data | Model improvement |

Trust boundaries:

| ID | Boundary | Risk | Controls |
|----|----------|------|----------|
| TB-01 | Government network ↔ Vendor cloud | Data leaves government control; potential exposure | G-DH-01-05, TLS encryption, enterprise license |
| TB-02 | Vendor operations ↔ Training data | User data may enter training pipeline | Contract terms, data retention policies |

Unique threats include:
- T-DE-01: sensitive data in prompts (HIGH)
- T-CH-01: multi-tenant data leakage (MEDIUM)
- T-CH-02: data residency violation (MEDIUM)
- T-SC-02: compromised AI provider (CRITICAL)
- T-AV-01: service dependency (MEDIUM)

Key security considerations include:

- data in transit - all communication over TLS 1.3; certificate validation mandatory
- data at rest - vendor storage security; data residency requirements
- multi tenancy - tenant isolation at provider; enterprise licensing reduces shared infrastructure risk
- training data - opt-out from training data collection where possible
- availability - dependency on vendor uptime; business continuity planning needed

---

### Architecture 2: IDE-integrated agent (Hybrid: Local + Cloud)

Example tools: Cursor, Windsurf, GitHub Copilot (IDE extension), Amazon Kiro, Claude Code

Architecture diagram:
```mermaid
flowchart TD
    subgraph ws["Developer Workstation"]
        ide["IDE (Cursor / Windsurf / Kiro CLI)"]
        cache["Local Cache / Index Engine"]
        ctx["Context Selection<br>(Privacy filtering)"]
        ide -->|Local processing| cache
        cache -->|Context filtering| ctx
    end

    ctx -->|"HTTPS filtered context<br>[TB-01]"| model

    subgraph provider["AI Provider"]
        model[AI Model]
    end

    model -->|Suggestions| ide
```


Data flows:

| Step | From | To | Data | Purpose |
|------|------|----|----- |---------|
| 1 | User | IDE | Query, code selection | User request |
| 2 | IDE | Local index | Codebase scan | Create embeddings |
| 3 | IDE | Context selection | RAG query | Find relevant code |
| 4 | Context selection | Cloud filter | Selected snippets | Privacy filtering |
| 5 | IDE | AI Provider | Filtered context + prompt | Inference request |
| 6 | AI Provider | IDE | Suggestions | Response |
| 7 | User | IDE | Review + accept | Human in loop |
| 8 | IDE | Repository | Accepted code | Commit |

Trust boundaries:

| ID | Boundary | Risk | Controls |
|----|----------|------|----------|
| TB-01 | Local workstation ↔ AI provider | Selected context sent externally | Context filtering, privacy mode, G-DH-04 |
| TB-03 | Local cache | Cache contains sensitive codebase data | Encryption at rest, secure permissions, cache clearing |

Unique threats include:
- T-DE-01: sensitive data in prompts (MEDIUM-HIGH)
- T-DE-03: context window leakage (MEDIUM)
- T-IDE-01: malicious IDE extension (LOW-MEDIUM)
- T-IDE-02: local cache compromise (MEDIUM)
- T-PI-02: indirect prompt injection (MEDIUM)

Key security considerations include:

- local processing reduces data sent to cloud and provides privacy benefits
- cache security is critical as the local index and cache require protection with encryption mandatory
- context selection uses intelligent filtering to reduce risk, though it does not eliminate it entirely
- extension security demands that the IDE extension supply chain be verified before use
- privacy modes should be enabled where available to maximize local processing
- session isolation requires clearing context between projects to comply with G-DH-05

---

### Architecture 3: autonomous agent (sandboxed)

Example tools: Devin, Amazon Kiro (frontier agent mode), Claude Code (agentic with extended permissions)

Architecture diagram:
```mermaid
flowchart TD
    subgraph gov["Government Network"]
        operator["Operator (Human)"]
        console["Agent Control Console"]
        operator -->|Task definition| console
        console -->|"Monitor / Control"| operator
    end

    console -->|"API / CLI [TB-01]"| engine

    subgraph sandbox["Sandbox Environment"]
        engine[Agent Runtime Engine]
        aimodel[AI Model Service]
        engine <-->|API| aimodel

        engine -->|"[TB-05]"| repo["Dev Repo (Clone)"]
        engine -->|"[TB-05]"| testenv["Test Env (Isolated)"]

        repo --> audit["Audit Log (Immutable)"]
        testenv --> metrics["Metrics & Monitoring"]
    end

    engine -->|"Output [TB-04]"| pr["Pull Request<br>(Dual Approval Required)"]
```


Data flows:

| Step | From | To | Data | Purpose |
|------|------|----|----- |---------|
| 1 | Operator | Control console | Task definition, constraints | Initialize session |
| 2 | Control console | Agent runtime | Task, steering files | Agent setup |
| 3 | Agent | AI Model | Plan, sub tasks | Multi-step reasoning |
| 4 | Agent | Dev repo clone | Code changes | Autonomous development |
| 5 | Agent | Test environment | Tests, validation | Verification |
| 6 | Agent | Audit log | All actions | Accountability |
| 7 | Agent | Control console | Checkpoint status | Human review point |
| 8 | Operator | Agent | Continue/pause/abort | Human decision |
| 9 | Agent | Pull request | Completed work | Submit for review |
| 10 | Reviewers (2) | Pull request | Approval | Dual approval gate |

Trust boundaries:

| ID | Boundary | Risk | Controls |
|----|----------|------|----------|
| TB-01 | Operator ↔ Sandbox | Command injection, task definition attacks | Input validation, authentication |
| TB-04 | Sandbox output ↔ Production | Malicious or vulnerable code reaching production | Dual approval, security scanning, human review |
| TB-05 | Agent ↔ External systems | Uncontrolled agent actions, privilege escalation | Restricted network, least privilege, action logging |

Unique threats:
- T-AG-01: uncontrolled autonomous action (HIGH CRITICAL)
- T-AG-02: privilege escalation via agent (HIGH)
- T-AG-03: agent to agent attack propagation (MEDIUM)
- T-AG-04: agent persistence and evasion (CRITICAL if successful)
- T-PI-02: indirect prompt injection (HIGH)
- T-SC-01: malicious dependency suggestion (HIGH)
- T-AV-02: cost abuse (MEDIUM)

Key security considerations include:

- sandbox isolation is mandatory with separate cloud account or VPC and no production access
- network restrictions include allowlist for external access with no production systems accessible
- checkpoint controls are mandatory human review at intervals as defined in G-AG-04
- kill switch requires multiple methods tested before every session as defined in G-AG-03
- time limits with maximum session duration are enforced as defined in G-AG-02
- dual approval requires all pull requests to receive two human reviewers before merge
- audit logging provides comprehensive immutable logs of all agent actions for forensic analysis
- SIRO approval is required for L5 autonomous agents as defined in PS-05

---

### Architecture 4: self-hosted LLM (air-gapped)

Example tools: Ollama, LocalAI, LM Studio, private model hosting on isolated networks

Architecture diagram:

```mermaid
flowchart TD
    subgraph transfer["Model Transfer (One-Way)"]
        download["External Network"] --> media["Removable Media"]
        media --> review["Security Review"]
        review --> verify["Hash Verify (SHA-256)"]
    end

    verify -->|"Physical transfer"| model

    subgraph airgap["Air-Gapped Environment"]
        model["Local LLM Model Files"]
        model --> inference
        inference["Inference Server (Ollama/LocalAI)"]

        subgraph ws["Developer Workstation"]
            ide["IDE (+ Plugin)"]
        end

        ide -->|"Localhost / LAN"| inference
        inference -->|"Code suggestions"| ide

        inference --> applogs
        subgraph logging["Local Logging"]
            applogs[Application Logs] --> syslog[Syslog Server]
        end
    end
```


#### Data flows:

| Step | From | To | Data | Purpose |
|------|------|----|----- |---------|
| 1 | Developer | IDE | Prompt, code | User input |
| 2 | IDE | Inference server (local) | Prompt + context | Inference request |
| 3 | Inference server | LLM model (local) | Tokenized input | Processing |
| 4 | LLM model | Inference server | Generated tokens | Response |
| 5 | Inference server | IDE | Code suggestions | Display |
| 6 | User | IDE | Review + accept | Human in loop |
| 7 | IDE | Repository (local) | Code | Commit |
| All | Applications | Syslog (local) | Logs | Audit trail |

#### Model transfer process (one way into air gap):

| Step | Location | Process | Security Control |
|------|----------|---------|------------------|
| 1 | Internet | Download model from approved source | Official repository only |
| 2 | Connected workstation | Save to removable media | Antivirus scan |
| 3 | Security review station | Verify cryptographic hash | SHA-256 against published hash |
| 4 | Security review station | Scan for malware | Multiple AV engines |
| 5 | Air gap transfer point | Physical transfer to isolated network | One way media transfer process |
| 6 | Air gap network | Load model to inference server | No return path |

#### Trust boundaries:

| ID | Boundary | Risk | Controls |
|----|----------|------|----------|
| NONE | Fully contained system | No external boundaries | Physical security, access controls |
| TB-TRANSFER | Model transfer process | Compromised model file introduction | Hash verification, AV scanning, approved sources only |

Unique threats include:
- T-SA-01: compromised model file (MEDIUM-HIGH before transfer)
- T-SA-02: model poisoning in fine-tuning (LOW unless fine-tuning)
- T-SA-03: infrastructure compromise (MEDIUM)
- T-SA-04: air gap violation (LOW if properly implemented)
- T-CS-01: vulnerable code generation (HIGH - no provider filtering)

Key security considerations include:

- no external dependencies complete autonomy from cloud providers
- air gap integrity physical network isolation with no wireless connections
- model provenance critical only approved hash verified models
- local security infrastructure hardening patching and access controls
- no telemetry all update checks and analytics disabled
- resource limits CPU GPU memory limits to prevent resource exhaustion
- physical security secure facility with access controls to infrastructure
- maintenance windows scheduled physical media transfers for updates

---

## Assets to protect

| Asset ID | Asset | C | I | A | Notes |
|----------|-------|---|---|---|-------|
| A-01 | Source code (government IP) | H | H | M | Core intellectual property |
| A-02 | Prompts and context | M | M | L | May reveal intent, architecture, security patterns |
| A-03 | Credentials and secrets | C | C | H | API keys, tokens, certificates, passwords |
| A-04 | Personal data (PII) | H | H | M | Subject to UK GDPR, DPA 2018 |
| A-05 | Security configurations | H | C | H | Firewall rules, WAF configs, security policies |
| A-06 | AI model access | M | H | M | Abuse prevention, cost control |
| A-07 | Development infrastructure | H | H | H | Build systems, repositories, CI/CD |
| A-08 | Audit logs | M | C | H | Accountability, forensics, compliance |
| A-09 | Classified information | C | C | H | OFFICIAL SENSITIVE and above |
| A-10 | Local model files (self-hosted) | M | H | M | Model IP, potential backdoors |
| A-11 | Agent runtime state | M | C | M | Autonomous agent session state, decisions |

Key: C = Critical, H = High, M = Medium, L = Low

---

## Threat actors

| ID | Actor | Motivation | Capability | Likelihood | Primary Targets |
|----|-------|------------|------------|------------|-----------------|
| TA-01 | Nation state APT | Espionage, disruption, IP theft | Very High | Medium | A-01, A-03, A-05, A-09 |
| TA-02 | Organised crime | Financial gain, ransomware | High | Medium | A-03, A-04, A-07 |
| TA-03 | Malicious insider | Grievance, financial, ideology | Medium | Low | A-01, A-03, A-09 |
| TA-04 | Compromised supply chain | Access, espionage, sabotage | High | Medium | A-01, A-07, A-10 |
| TA-05 | AI provider (unintentional) | N/A (data handling issues) | High | Medium | A-01, A-02, A-04 |
| TA-06 | Opportunistic attacker | Various (exposed credentials) | Low-medium | High | A-03 (exposed credentials) |
| TA-07 | AI worm or automated attack | Propagation, crypto mining | Medium | Low | A-07, A-08, A-11 |
| TA-08 | Malicious AI model creator | Backdoor, data exfiltration | Medium-high | Low | A-10 (self-hosted models) |

---

## Threat catalogue

### Category 1: Data exfiltration

#### T-DE-01: sensitive data in prompts

User inadvertently includes classified data, PII, credentials, or security configurations in prompts sent to cloud AI provider.

MITRE ATLAS: [AML.T0024](https://atlas.mitre.org/techniques/AML.T0024) - Exfiltration via ML Inference API

Attack vectors include:
- user error (copy and paste of sensitive code)
- inadequate training on data handling
- poor prompt hygiene practices
- context window including sensitive files automatically

#### Tool types affected
All cloud-hosted, IDE-integrated (hybrid)

#### Threat actors
TA-05 (unintentional), TA-01 (if provider compromised)

Potential impacts include:
- data breach requiring notification under UK GDPR
- compliance violation (GSC, DPA)
- reputational damage
- potential for data to appear in training data or be memorized

Likelihood: HIGH (most common risk based on industry incidents)

Inherent risk: HIGH

Controls:
| Control ID | Control | Effectiveness |
|------------|---------|---------------|
| G-DH-01 | Data classification limits | High |
| G-DH-02 | Prohibited data types | High |
| G-DH-04 | Prompt hygiene | Medium |
| G-DH-05 | Context window awareness | Medium |
| PS-06 | Training | Medium |
| PS-11 | Enterprise licensing (better isolation) | Medium |

Residual risk: MEDIUM (after controls)

---

#### T-DE-02: Training data extraction

Attacker queries AI model to extract memorised training data, which may include government code from other users or organizations.

MITRE ATLAS: [AML.T0024.002](https://atlas.mitre.org/techniques/AML.T0024.002) - Extract ML Artifacts

Attack vectors include:
- repeated targeted queries designed to trigger memorisation
- prompt crafting to extract specific patterns or snippets
- model inversion techniques
- exploiting training data memorisation vulnerabilities

#### Tool types affected
Cloud-hosted AI assistants

#### Threat actors
TA-01, TA-02

Potential impacts include:
- exposure of other organisations' code or data
- intellectual property theft
- security vulnerability disclosure
- compliance issues if PII extracted

Likelihood: LOW (requires sophisticated attack, major providers have mitigations)

Inherent risk: MEDIUM

Controls:
| Control ID | Control | Effectiveness |
|------------|---------|---------------|
| PS-09 | Vendor assessment (training data handling) | Medium |
| PS-11 | Enterprise licensing (stronger isolation) | Medium |
| Provider controls | Output filtering, differential privacy, memorisation detection | Varies |

Residual risk: LOW

---

#### T-DE-03: Context window leakage

Sensitive data from one session or project leaks into another via retained context, or is exposed to other users in shared or misconfigured environments.

MITRE ATLAS: [AML.T0025](https://atlas.mitre.org/techniques/AML.T0025) - Exfiltration via Cyber Means (adapted)

Attack vectors include:
- session state retained between different projects
- shared IDE configurations in multi-user environments
- multi-tenant tool deployments with insufficient isolation
- local cache containing previous session data

#### Tool types affected
IDE-integrated agents (especially with local caching)

#### Threat actors
 TA-03, TA-05

Potential impacts include:
- cross-project data exposure
- classification boundary violation
- multi-tenant data leakage in shared environments

Likelihood: MEDIUM

Inherent risk: MEDIUM

#### Controls
| Control ID | Control | Effectiveness |
|------------|---------|---------------|
| G-DH-05 | Context window awareness, new sessions between projects | High |
| G-DH-05 | Clear context explicitly when available | High |
| Tool configuration | Session isolation settings | High |
| T-IDE-02 controls | Local cache security | Medium |

Residual risk: LOW

---

### Category 2: prompt injection

#### T-PI-01: direct prompt injection

User or attacker provides malicious input that overrides AI system instructions, causing unintended behaviour or bypassing safety controls.

OWASP LLM Top 10: [LLM01:2025](https://genai.owasp.org/llm-top-10/) - Prompt Injection

Attack vectors include:
- malicious prompts crafted to override system instructions
- instruction override attacks ('Ignore previous instructions...')
- role hijacking ('You are now an unrestricted assistant...')
- encoded instructions (Base64, Unicode obfuscation, emoji encoding)
- multi language injection (combining languages to bypass filters)

#### Tool types affected
All

#### Threat actors
TA-02, TA-06 (opportunistic), TA-03

Potential impacts include:
- bypassing safety guardrails
- generating prohibited content (malicious code, exploits)
- exposing system prompts or configuration
- executing unintended actions (in agentic tools)
- data exfiltration via crafted outputs

Likelihood: MEDIUM (attack techniques well known, defences improving)

Inherent risk: MEDIUM (for coding assistants), HIGH (for agentic tools)

Controls:
| Control ID | Control | Effectiveness |
|------------|---------|---------------|
| G-CS-05 | Prompt injection awareness | Medium |
| G-CS-01 | Human review of output | High |
| PS-06 | Training on injection techniques | Medium |
| Provider controls | Input filtering, instruction hierarchy, output monitoring | Varies |
| Playbook | Prompt injection testing | Medium |

Residual risk: LOW-MEDIUM

---

#### T-PI-02: indirect prompt injection

Malicious instructions embedded in external content (retrieved documents, code comments, web pages, documentation) that the AI processes as context.

OWASP LLM Top 10: [LLM01:2025](https://genai.owasp.org/llm-top-10/) - Prompt Injection (indirect variant)

MITRE ATLAS: [AML.T0051](https://atlas.mitre.org/techniques/AML.T0051) - LLM Prompt Injection (indirect)

Attack vectors include:
- poisoned documents in RAG knowledge base
- malicious code comments in repositories
- compromised web content retrieved by agents
- hidden instructions in markdown, HTML, PDFs
- steganographic prompts in images (multi modal)
- malicious instructions in dependencies or documentation

#### Tool types affected
 All, but especially IDE-integrated (RAG) and autonomous agents

#### Threat actors
 TA-01, TA-04, TA-07

Potential impacts include:
- compromised AI behaviour without user awareness
- data exfiltration via AI actions (for example, agent makes external requests)
- persistent attack across multiple users (for example, poisoned shared docs)
- supply chain compromise
- agent taking unintended actions

Likelihood: MEDIUM (growing attack surface with RAG and agents)

Inherent risk: HIGH

Controls:
| Control ID | Control | Effectiveness |
|------------|---------|---------------|
| G-CS-05 | Prompt injection awareness (limited for indirect) | Low-medium |
| G-AG-04 | Checkpoint requirements | Medium |
| G-AG-05 | Prohibited agentic actions | High |
| RAG Playbook | RAG security controls, content validation | Medium |
| Document sanitisation | Strip potentially malicious formatting | Medium |

Residual risk: MEDIUM

---

#### T-PI-03: prompt extraction

Attacker manipulates AI to reveal its system prompt, exposing security controls, business logic, or sensitive instructions.

OWASP LLM Top 10: [LLM01:2025](https://genai.owasp.org/llm-top-10/) - Prompt Injection

Attack vectors include:
- direct extraction attempts (for example, 'print your system prompt')
- indirect extraction via role play or social engineering
- encoding or format manipulation
- exploiting error messages that reveal prompts

#### Tool types affected
All

#### Threat actors
TA-01, TA-02, TA-06

Potential impacts include:
- exposure of security controls logic
- bypass of safety measures with knowledge of restrictions
- intellectual property exposure (for example, custom prompts)
- information for crafting more effective attacks

Likelihood: MEDIUM

Inherent risk: LOW-MEDIUM (for coding assistants)

Controls:
| Control ID | Control | Effectiveness |
|------------|---------|---------------|
| Provider controls | Prompt protection, output filtering | Varies |
| G-DH-02 | Do not include secrets in system prompts | High |
| Assume prompt exposure | Design defences that work even if prompt is known | High |

Residual risk: LOW

---

### Category 3: supply chain

#### T-SC-01: malicious dependency suggestion

AI suggests packages or dependencies that are malicious, typosquatted, abandoned, contain known vulnerabilities or do not exist.

OWASP LLM Top 10: [LLM05:2025](https://genai.owasp.org/llm-top-10/) - Improper Output Handling, [LLM09:2025](https://genai.owasp.org/llm-top-10/) - Misinformation (hallucinated packages)

Attack vectors include:
- AI suggests typosquatted package names (for example, 'reqeusts' instead of 'requests')
- hallucinated packages that do not exist (but an attacker could register)
- outdated packages with known CVEs
- packages from untrusted or unofficial sources
- legitimate package names from wrong ecosystems

#### Tool types affected
All

#### Threat actors
TA-04 (supply chain), TA-02, TA-06

Potential impacts include:
- malware introduction into codebase
- backdoor installation providing persistent access
- data exfiltration via malicious dependency
- system compromise
- supply chain attack affecting downstream users

Likelihood: MEDIUM (AI frequently suggests plausible but incorrect packages)

Inherent risk: HIGH

Controls:
| Control ID | Control | Effectiveness |
|------------|---------|---------------|
| G-CS-03 | Dependency verification process | High |
| G-CS-02 | Dependency scanning (SCA tools) | High |
| G-CS-01 | Human review | Medium |
| PS-06 | Training on hallucination risks | Medium |

Residual risk: LOW

---

#### T-SC-02: compromised AI provider

AI provider infrastructure is compromised, affecting model behaviour, data handling, service availability or integrity.

MITRE ATLAS: [AML.T0019](https://atlas.mitre.org/techniques/AML.T0019) - Publish Poisoned Datasets (adapted to provider compromise)

Attack vectors include:
- provider data breach exposing customer data
- model tampering affecting outputs systematically
- backdoor in provider infrastructure
- insider threat at provider organization
- state-sponsored compromise of provider

#### Tool types affected
All cloud-hosted, IDE-integrated (hybrid)

#### Threat actors
TA-01, TA-04

Potential impacts include:
- widespread data exposure across all customers
- compromised code generation affecting all users
- loss of service availability (business impact)
- supply chain attack at massive scale
- loss of trust in AI tools

Likelihood: LOW (major providers have strong security, but high-value targets)

Inherent risk: CRITICAL

Controls:
| Control ID | Control | Effectiveness |
|------------|---------|---------------|
| PS-09 | Vendor assessment, security audits | Medium |
| PS-01 | Tool approval process | Medium |
| G-CS-02 | Security scanning (detect malicious output) | Medium |
| Business continuity | Multi-vendor strategy, offline fallback | Medium |
| Contractual | Security commitments, breach notification | Low |

Residual risk: MEDIUM

---

#### T-SC-03: model poisoning

 Base models or fine-tuned models contain backdoors or biases introduced during training that systematically affect code generation.

MITRE ATLAS: [AML.T0020](https://atlas.mitre.org/techniques/AML.T0020) - Poison Training Data

Attack vectors include:
- poisoned open-source training data with malicious patterns
- backdoors in publicly available pre-trained models
- bias introduced via training data selection
- supply chain attack on model distribution (for example, a compromised model hub)

#### Tool types affected
All, especially self-hosted using community models

#### Threat actors
TA-01, TA-04, TA-08

Potential impacts include:
- subtly vulnerable code patterns introduced systematically
- backdoors in generated code (for example, always uses weak crypto)
- bias in code suggestions (security versus functionality trade-offs)
- difficult to detect (as it appears as normal code)

Likelihood: LOW (for major commercial providers), MEDIUM (for self-hosted community models)

Inherent risk: HIGH

Controls:
| Control ID | Control | Effectiveness |
|------------|---------|---------------|
| PS-09 | Vendor assessment (training practices) | Low |
| PS-11 | Model provenance verification (self-hosted) | Medium |
| G-CS-02 | Security scanning (detect patterns) | Medium |
| G-CS-01 | Human security review | Medium |

Residual risk: MEDIUM

---

### Category 4: agentic AI risks

#### T-AG-01: uncontrolled autonomous action

Agentic AI tool takes actions beyond intended scope without adequate human oversight or checkpoints.

OWASP Agentic AI: Excessive Agency

Attack vectors include:
- overly permissive tool permissions granted
- lack of checkpoint controls between actions
- inadequate time limits on autonomous operation
- missing or ineffective kill switch
- prompt injection causing unintended action sequence

#### Tool types affected
Autonomous agents (L4-L5)

#### Threat actors
TA-05 (unintentional misconfiguration), TA-01 (if exploited via prompt injection)

Potential impacts include:
- unintended code changes or deletions
- unintended system access or resource consumption
- resource exhaustion (cost, compute)
- security control bypass
- difficult to trace actions requiring forensic investigation

Likelihood: MEDIUM (for L4-L5 tools without proper controls)

Inherent risk: HIGH (L4), CRITICAL (L5)

Controls:
| Control ID | Control | Effectiveness |
|------------|---------|---------------|
| G-AG-01 | Autonomy classification | High |
| G-AG-02 | Proportionate controls (time limits) | High |
| G-AG-03 | Kill switch requirements | High |
| G-AG-04 | Checkpoint requirements | High |
| G-AG-05 | Prohibited actions list | High |
| PS-05 | SIRO approval for L5 | High |
| Sandbox | Isolated environment | High |

Residual risk: LOW (L1-L3), MEDIUM (L4), MEDIUM-HIGH (L5)

---

#### T-AG-02: privilege escalation via agent

Agentic AI discovers and exploits credentials or accesses resources beyond the intended permission scope.

OWASP Agentic AI: Privilege Escalation

Attack vectors include:
- agent granted excessive initial permissions
- agent discovers and exploits credentials in files or environment
- agent accesses security sensitive files without proper controls
- agent modifies authentication or authorization code
- agent exploits misconfigured access controls

#### Tool types affected
Autonomous agents (L4-L5)

#### Threat actors
TA-01 (via prompt injection), TA-05 (misconfiguration)

Potential impacts include:
- credential theft providing persistent access
- unauthorized system access beyond sandbox
- security control modification
- data exfiltration
- lateral movement potential

Likelihood: LOW-MEDIUM (depends on sandbox implementation)

Inherent risk: HIGH

Controls:
| Control ID | Control | Effectiveness |
|------------|---------|---------------|
| G-AG-05 | Prohibited actions (security sensitive files) | High |
| G-AG-04 | Approval required for credential access | High |
| G-UB-01 | Prohibited use cases | High |
| Tool config | Least privilege permissions | High |
| Sandbox | Credential isolation, no production credentials | High |
| G-CS-02 | Secret detection pre-commit | High |

Residual risk: LOW

---

#### T-AG-03: agent-to-agent attack propagation

Prompt injection or malicious content propagates through chained AI agents, amplifying impact across multiple systems.

OWASP Agentic AI: Cascading Hallucination Attacks, Multi-agent Poisoning

Attack vectors include:
- prompt injection in Agent A output consumed as input by Agent B
- malicious content in shared context or intermediate artifacts
- poisoned data in agent communication layer
- worm like propagation across agent network

#### Tool types affected
Autonomous agents with chaining or multi-agent scenarios

#### Threat actors
TA-01, TA-07 (AI worm - emerging threat)

Potential impacts include:
- multi system compromise
- difficult to trace attack origin
- amplified damage across toolchain
- potential for exponential propagation
- cascading failures

Likelihood: LOW (emerging threat, limited multi-agent deployments currently)

Inherent risk: HIGH

Controls:
| Control ID | Control | Effectiveness |
|------------|---------|---------------|
| G-AG-04 | Checkpoints between agent handoffs | Medium |
| G-CS-05 | Prompt injection awareness | Low-medium |
| Architecture | Limit agent chaining depth | High |
| Sandbox | Per agent isolation | Medium |
| Monitoring | Anomaly detection across agent network | Medium |

Residual risk: MEDIUM

---

#### T-AG-04: agent persistence and evasion

Malicious instructions cause agent to establish persistence mechanisms or evade detection or logging.

MITRE ATLAS: [AML.T0043](https://atlas.mitre.org/techniques/AML.T0043) - Craft Adversarial Data (adapted for agents)

Attack vectors include:
- agent creating scheduled tasks or cron jobs
- agent modifidying monitoring or logging configuration
- agent creating hidden files or backdoors
- agent modifidying its own configuration or steering files
- agent disabling security tools

#### Tool types affected
Autonomous agents (L5 primarily)

#### Threat actors
TA-01, TA-07

Potential impacts include:
- persistent compromise surviving session termination
- evaded detection during and after operation
- long term access for attacker
- difficult remediation

Likelihood: LOW (requires sophisticated attack and poor controls)

Inherent risk: CRITICAL

Controls:
| Control ID | Control | Effectiveness |
|------------|---------|---------------|
| G-AG-05 | Prohibited actions (CI or CD, security files, cron) | High |
| G-MA-01 | Monitoring and logging (immutable logs) | High |
| G-AG-04 | Checkpoints for suspicious actions | High |
| Sandbox | Isolated, ephemeral environment | High |
| Infrastructure | Immutable infrastructure, reset between sessions | High |

Residual risk: LOW

---

### Category 5: code security

#### T-CS-01: vulnerable code generation

AI generates code containing security vulnerabilities such as injection flaws, XSS, path traversal or insecure deserialisation.

OWASP LLM Top 10: [LLM02:2025](https://genai.owasp.org/llm-top-10/) - Sensitive Information Disclosure (via generated vulnerable code)

OWASP Top 10: Various (injection, broken access control, etc.)

Attack vectors include:
- AI trained on vulnerable code patterns from public repositories
- AI lacks security context for the specific application
- AI optimises for functionality not security
- hallucinated security controls that do not actually work

#### Tool types affected
All

#### Threat actors
TA-06 (exploiting vulnerabilities later), TA-01

Potential impacts include:
- security vulnerabilities deployed to production
- data breaches via exploited vulnerabilities
- system compromise
- compliance violations

Likelihood: HIGH (AI frequently generates insecure patterns without security context)

Inherent risk: HIGH

Controls:
| Control ID | Control | Effectiveness |
|------------|---------|---------------|
| G-CS-02 | SAST scanning mandatory | High |
| G-CS-01 | Human security review | Medium |
| G-CS-04 | No AI for crypto/auth | High |
| PS-06 | Security training for reviewers | Medium |
| PS-04 | DAST testing | Medium |

Residual risk: MEDIUM

---

#### T-CS-02: hallucinated security controls

AI generates security controls that appear correct but are non-functional, bypassable or provide false sense of security.

OWASP LLM Top 10: [LLM09:2025](https://genai.owasp.org/llm-top-10/) - Misinformation

Attack vectors include:
- AI generating plausible but incorrect input validation
- AI creating authentication that can be easily bypassed
- AI implementing 'security theatre' controls without actual protection
- AI misunderstanding security requirements and implements wrong controls

#### Tool types affected
All

#### Threat actors
TA-06 (exploiting weaknesses)

Potential impacts include:
- false sense of security
- bypassable controls deployed to production
- compliance failures (controls exist but do not work)
- difficult to detect without security expertise

Likelihood: MEDIUM

Inherent risk: HIGH

Controls:
| Control ID | Control | Effectiveness |
|------------|---------|---------------|
| G-CS-01 | Human review with security expertise | High |
| G-CS-04 | No AI for crypto or auth or security critical | High |
| G-UB-01 | Prohibited use cases | High |
| Testing | Security testing of AI-generated controls | High |
| PS-04 | Penetration testing | High |

Residual risk: LOW

---

#### T-CS-03: credential hardcoding

AI generates code with hardcoded credentials, API keys, secrets or other sensitive authentication material.

Attack vectors include:
- AI following patterns from training data containing hardcoded secrets
- user provides credentials in prompt/context inadvertently
- AI 'helpfully' includes example credentials that are real
- AI completes partial credentials visible in context

#### Tool types affected
All

#### Threat actors
TA-06 (exposed credentials discovered)

Potential impacts include:
- credential exposure in version control repositories
- unauthorised access to systems and data
- potential data breaches
- difficult remediation (credential in git history)

Likelihood: MEDIUM

Inherent risk: HIGH

Controls:
| Control ID | Control | Effectiveness |
|------------|---------|---------------|
| G-CS-02 | Secret detection (pre-commit hook) | High |
| G-DH-02 | Prohibited data types (no credentials in prompts) | High |
| G-CS-01 | Human review | Medium |
| PS-06 | Training on credential hygiene | Medium |

Residual risk: LOW

---

### Category 6: availability and abuse

#### T-AV-01: service dependency and vendor lock in

Critical development workflows become dependent on AI tool availability, creating single points of failure and business continuity risks.

Attack vectors include:
- provider outage affecting all development
- API rate limiting or throttling
- account suspension or service termination
- geopolitical access restrictions
- provider business failure

#### Tool types affected
Cloud-hosted, IDE-integrated (hybrid)

#### Threat actors
N/A (operational risk), TA-01 (targeted DoS against provider)

Potential impacts include:
- development velocity reduction during outages
- missed deadlines and delivery commitments
- loss of productivity
- dependencies on specific vendor platforms
- data portability challenges

Likelihood: MEDIUM (outages occur, geopolitical risks exist)

Inherent risk: MEDIUM

Controls:
| Control ID | Control | Effectiveness |
|------------|---------|---------------|
| Business continuity | Multi vendor strategy | High |
| PS-06 | Developer proficiency without AI (training) | Medium |
| Fallback | Local or offline alternatives (self-hosted) | Medium |
| Contractual | SLA commitments from vendor | Low-medium |

Residual risk: LOW

---

#### T-AV-02: cost abuse and resource exhaustion

Excessive or malicious use of AI APIs resulting in unexpected costs, quota exhaustion or service degradation.

Attack vectors include:
- runaway agentic sessions consuming excessive API calls
- prompt injection causing infinite loops or repeated queries
- credential theft enabling abuse of organization's account
- misconfigured quotas or rate limits
- malicious insider deliberately exhausting resources

#### Tool types affected
Cloud-hosted, IDE-integrated, Autonomous agents

#### Threat actors
TA-03 (insider), TA-02 (credential theft), TA-01

Potential impacts include:
- unexpected costs and budget overruns
- service suspension due to quota exhaustion
- degraded service for legitimate users
- budget reallocation required

Likelihood: MEDIUM (especially for agentic tools without controls)

Inherent risk: MEDIUM

Controls:
| Control ID | Control | Effectiveness |
|------------|---------|---------------|
| G-AG-02 | Time limits on autonomous operation | High |
| G-AG-03 | Kill switch | High |
| API config | Quotas, rate limits, spending alerts | High |
| Monitoring | Cost monitoring and alerting | High |
| IAM | Least privilege access to API credentials | Medium |

Residual risk: LOW

---

### Category 7: model usage risks

#### T-MU-01: over trust in AI output

Users accept AI-generated code without adequate review, leading to quality, security and maintainability issues.

Attack vectors include:
- automation bias (meaning trusting a machine over human judgment)
- time pressure reducing review thoroughness
- lack of security expertise to identify issues
- plausible looking output creating false confidence

#### Tool types affected
All

#### Threat actors
N/A (human factors risk)

Potential impacts include:
- vulnerabilities deployed to production
- logic errors causing functional issues
- maintenance burden from low quality code
- technical debt accumulation
- security incidents from unreviewed code

Likelihood: HIGH (very common human behavior)

Inherent risk: HIGH

Controls:
| Control ID | Control | Effectiveness |
|------------|---------|---------------|
| G-CS-01 | Mandatory human review | High |
| G-AG-07 | Meaningful review requirements defined | High |
| PS-06 | Training on AI limitations and risks | Medium |
| PS-03 | Policy mandate for human oversight | High |
| Culture | Security aware development culture | Medium |

Residual risk: MEDIUM

---

#### T-MU-02: hallucination acceptance

User accepts AI generated content that is factually incorrect, including non-existent APIs, incorrect security guidance, fabricated references or impossible configurations.

OWASP LLM Top 10: [LLM09:2025](https://genai.owasp.org/llm-top-10/) - Misinformation

Attack vectors include:
- AI generates plausible but false information
- user lacks expertise to verify claims
- no validation process for AI suggestions
- hallucinated packages or APIs that do not exist
- incorrect security advice that seems reasonable

#### Tool types affected
All

#### Threat actors
N/A (model limitation)

Potential impacts include:
- incorrect implementations wasting development time
- security misconfigurations based on bad advice
- wasted effort on non-existent solutions
- technical debt from fundamentally wrong approaches

Likelihood: HIGH

Inherent risk: MEDIUM

Controls:
| Control ID | Control | Effectiveness |
|------------|---------|---------------|
| G-CS-01 | Human review | Medium |
| G-CS-03 | Dependency verification | High |
| PS-06 | Training on hallucination awareness | Medium |
| Testing | Automated testing catches non-functional code | High |

Residual risk: LOW-MEDIUM

---

### Category 8: cloud-hosted-specific threats (T-CH-XX)

#### T-CH-01: multi-tenant data leakage

In shared cloud infrastructure, data from one tenant (customer) leaks to another tenant due to insufficient isolation.

#### Tool types affected
GitHub Copilot (non-Enterprise), Claude.ai (Team plan), other shared SaaS offerings

Attack vectors include:
- insufficient tenant isolation in provider infrastructure
- context bleeding between users or organizations
- shared model state retaining previous tenant data
- metadata leakage (for example, usernames, repo names)

#### Threat actors
TA-05 (unintentional), TA-01 (if deliberately exploited)

Potential impacts include: Cross-organisation data exposure, compliance violations

Likelihood: LOW (providers implement isolation, but risk exists)

Inherent risk: MEDIUM

Controls:
| Control ID | Control | Effectiveness |
|------------|---------|---------------|
| PS-11 | Enterprise licensing required for government | High |
| PS-09 | Provider security assessment | Medium |
| Contract | Tenant isolation guarantees | Medium |

Residual risk: LOW

---

#### T-CH-02: data residency violation

Government data processed or stored in non-approved jurisdictions, violating data sovereignty requirements or regulations.

#### Tool types affected
All cloud-hosted tools

Attack vectors include:
- provider processes data in non-UK or EU regions
- backup or disaster recovery in unapproved locations
- training data collection processed in other regions
- sub-processors in unapproved jurisdictions

#### Threat actors
TA-05 (unintentional compliance violation)

Potential impacts include:
- compliance violation (for example, UK GDPR, data sovereignty requirements)
- potential legal issues
- audit findings
- contractual breaches

Likelihood: MEDIUM (without proper configuration and contractual controls)

Inherent risk: MEDIUM

Controls:
| Control ID | Control | Effectiveness |
|------------|---------|---------------|
| PS-11 | Data residency requirements (EU/UK only) | High |
| Contract | Contractual terms specifying regions | High |
| PS-09 | Regular compliance audits | Medium |
| Config | Provider region configuration verified | High |

Residual risk: LOW

---

### Category 9: IDE-integrated specific threats (T-IDE-XX)

#### T-IDE-01: malicious IDE extension

Compromised or intentionally malicious IDE extension exfiltrates code, credentials or other sensitive data.

#### Tool types affected
Cursor, Windsurf, VS Code extensions, JetBrains plugins

Attack vectors include:
- supply chain compromise of legitimate extension
- malicious extension masquerading as AI assistant
- extension update hijacking
- typosquatted extension names
- extension with excessive permissions

#### Threat actors
TA-04 (supply chain), TA-02

Potential impacts include:
- code theft and IP loss
- credential exposure
- persistent access to development environment
- supply chain attack vector

Likelihood: LOW-MEDIUM (growing threat, recent incidents)

Inherent risk: MEDIUM-HIGH

Controls:
| Control ID | Control | Effectiveness |
|------------|---------|---------------|
| PS-11 | Extension vetting process | High |
| PS-09 | Vendor security assessment | Medium |
| G-CS-03 | Source code review (open-source extensions) | High |
| Monitoring | Extension behavior monitoring | Medium |
| IAM | Least privilege extension permissions | Medium |

Residual risk: LOW

---

#### T-IDE-02: local cache compromise

Attacker accesses local cache or index containing sensitive code, embeddings or project context.

#### Tool types affected
Cursor (local index), Windsurf, tools with local caching

Attack vectors include:
- malware accessing cache directory
- physical access to unencrypted device
- inadequate file permissions on cache
- cache not cleared after project completion
- backup systems capturing unencrypted cache

#### Threat actors
TA-02 (malware), TA-03 (insider with physical access)

Potential impacts include:
- code exposure without network exfiltration
- context leakage between projects
- persistent data exposure
- forensic evidence of all code worked on

Likelihood: MEDIUM

Inherent risk: MEDIUM

Controls:
| Control ID | Control | Effectiveness |
|------------|---------|---------------|
| Encryption | Full disk encryption mandatory | High |
| File permissions | Secure cache directory permissions | Medium |
| G-DH-05 | Cache clearing on project switch | High |
| Monitoring | File access monitoring | Low-medium |
| Physical security | Device security controls | Medium |

Residual risk: LOW

---

### Category 10: self-hosted specific threats (T-SA-XX)

#### T-SA-01: Compromised Model File

Downloaded model file contains backdoor, malicious behavior or has been tampered with.

#### Tool types affected
All self-hosted LLM deployments (Ollama, LocalAI, LM Studio)

Attack vectors include:
- model downloaded from untrusted or compromised source
- man in the middle during model download
- compromised model repository (for example, Hugging Face)
- model file replaced after download but before deployment
- malicious model uploaded with similar name

#### Threat actors
TA-04 (supply chain), TA-08 (malicious model creator), TA-01

Potential impacts include:
- malicious code generation (systematic backdoors)
- data exfiltration via model behavior
- covert channels in generated code
- persistent compromise

Likelihood: MEDIUM (for non-verified sources), LOW (for verified official sources)

Inherent risk: HIGH

Controls:
| Control ID | Control | Effectiveness |
|------------|---------|---------------|
| PS-11 | Model provenance verification | High |
| PS-11 | Cryptographic hash validation (SHA-256) | High |
| PS-11 | Approved model sources only | High |
| ML-BOM | Supply chain documentation | Medium |
| Antivirus | Malware scanning of model files | Low-medium |

Residual risk: LOW (with controls)

---

#### T-SA-02: model poisoning in self-hosted fine-tuning

If fine-tuning models locally, poisoned training data introduces backdoors or biases.

#### Tool types affected
Self-hosted deployments with fine-tuning capability

Attack vectors include:
- compromised fine-tuning training data
- insider adds malicious training examples
- automated data collection inadvertently includes poisoned data
- backdoor triggers embedded in training data

#### Threat actors
TA-03 (insider), TA-04 (if training data sourced externally)

Potential impacts include:
- systematic generation of vulnerable code patterns
- backdoors triggered by specific inputs
- bias in security vs functionality trade-offs

Likelihood: LOW (only if fine-tuning is performed, many self-hosted deployments use pre-trained only)

Inherent risk: HIGH (if fine-tuning)

Controls:
| Control ID | Control | Effectiveness |
|------------|---------|---------------|
| Training data | Provenance tracking for all training data | High |
| Data validation | Security review before fine-tuning | Medium |
| G-CS-01 | Human review of fine-tuned outputs | Medium |
| Testing | Adversarial testing of fine-tuned models | Medium |

Residual risk: MEDIUM

---

#### T-SA-03: self-hosted infrastructure compromise

Hosting infrastructure for self-hosted LLM is compromised, affecting model integrity, availability or confidentiality.

#### Tool types affected
All self-hosted deployments

Attack vectors includes:
- unpatched inference server software
- weak access controls on inference API
- inadequate network segmentation
- misconfigured authentication
- default credentials not changed

#### Threat actors
TA-01, TA-02, TA-06

Potential impacts include:
- model theft (valuable IP)
- output manipulation
- denial of service
- backdoor installation
- lateral movement to other systems

Likelihood: MEDIUM (standard infrastructure security challenges)

Inherent risk: MEDIUM-HIGH

Controls:
| Control ID | Control | Effectiveness |
|------------|---------|---------------|
| PS-11 | Infrastructure baseline requirements | High |
| Patching | Regular patching and updates | High |
| Network | Network isolation/segmentation | High |
| Access control | Least privilege, MFA | High |
| Monitoring | Security monitoring and alerting | Medium |

Residual risk: LOW

---

#### T-SA-04: air-gap violation

Supposedly air-gapped system has network connectivity, enabling data exfiltration or external attack.

#### Tool types affected
Air-gapped self-hosted deployments

Attack vectors include:
- misconfigured network isolation (e.g., bridged VMs)
- unauthorised network connection added
- wireless adapter not disabled
- removable media used for bidirectional transfer
- covert channels (for example, acoustic, electromagnetic)

#### Threat actors
TA-01 (sophisticated), TA-03 (insider)

Potential impacts include:
- data breach from classified environment
- loss of air gap security benefit
- compliance violations
- potential compromise of sensitive systems

Likelihood: LOW (if properly implemented and verified)

Inherent risk: CRITICAL (if violated)

Controls:
| Control ID | Control | Effectiveness |
|------------|---------|---------------|
| Physical | Physical network isolation verification | High |
| PS-11 | Air gap compliance checks (quarterly) | High |
| Removable media | Unidirectional transfer process | High |
| Wireless | Wireless disabled/removed physically | High |
| Monitoring | Network traffic monitoring for anomalies | Medium |

Residual risk: LOW

---

### Category 11: network architecture threats (T-NET-XX)

#### T-NET-01: man in the middle attack

Network traffic between user and AI provider is intercepted or modified by attacker.

#### Tool types affected
All cloud-hosted and IDE-integrated (hybrid) tools

Attack vectors include:
- compromised network infrastructure
- certificate validation bypass or disabled
- DNS hijacking redirecting to malicious endpoint
- rogue Wi Fi access point
- BGP hijacking at ISP level

#### Threat actors
TA-01, TA-02

Potential impacts include:
- code exposure in transit
- response tampering (malicious code injected)
- credential theft (if authentication tokens intercepted)
- loss of confidentiality and integrity

Likelihood: LOW (with proper TLS implementation)

Inherent risk: MEDIUM

Controls:
| Control ID | Control | Effectiveness |
|------------|---------|---------------|
| TLS | TLS 1.3 mandatory | High |
| Certificate validation | Certificate pinning where possible | Medium-high |
| Network security | Network security monitoring | Medium |
| VPN | Corporate VPN for remote workers | Medium |

Residual risk: LOW

---

#### T-NET-02: VPN or proxy bypass

AI tool traffic bypasses corporate network controls (proxy, DLP, monitoring), evading security visibility.

#### Tool types affected
IDE-integrated tools, desktop applications

Attack vectors include:
- tool configured to bypass system proxy
- split tunneling misconfiguration allowing direct internet
- user circumventing corporate network controls
- tool using hard coded DNS or alternative ports

#### Threat actors
TA-03 (insider circumventing controls), TA-05 (misconfiguration)

Potential impacts include:
- loss of visibility into data flows
- policy violations undetected
- DLP bypass
- shadow IT creation

Likelihood: MEDIUM

Inherent risk: MEDIUM

Controls:
| Control ID | Control | Effectiveness |
|------------|---------|---------------|
| Network policy | Proxy configuration mandatory (enforced) | High |
| PS-11 | Tool configuration review | Medium |
| DLP | Data loss prevention monitoring | Medium |
| Network ACLs | Block direct internet for sensitive systems | High |
| Training | User awareness of policy requirements | Low-medium |

Residual risk: LOW-MEDIUM

---

## Risk Register summary

| ID | Threat | Likelihood | Impact | Inherent Risk | Primary Controls | Residual Risk | Tool Types |
|----|--------|------------|--------|---------------|------------------|---------------|------------|
| T-DE-01 | Data in prompts | High | High | HIGH | G-DH-01,02,04,05 | MEDIUM | All cloud or hybrid |
| T-DE-02 | Training extraction | Low | Medium | MEDIUM | PS-09, Provider | LOW | Cloud-hosted |
| T-DE-03 | Context leakage | Medium | Medium | MEDIUM | G-DH-05, Encryption | LOW | IDE-integrated |
| T-PI-01 | Direct injection | Medium | Medium | MEDIUM | G-CS-05, G-CS-01 | LOW-MEDIUM | All |
| T-PI-02 | Indirect injection | Medium | High | HIGH | G-AG-04, G-AG-05 | MEDIUM | IDE/Agents |
| T-PI-03 | Prompt extraction | Medium | Low | LOW-MEDIUM | Provider, Assume exposure | LOW | All |
| T-SC-01 | Malicious deps | Medium | High | HIGH | G-CS-03, G-CS-02 | LOW | All |
| T-SC-02 | Provider compromise | Low | Critical | CRITICAL | PS-09, Multi-vendor | MEDIUM | Cloud/hybrid |
| T-SC-03 | Model poisoning | Low | High | HIGH | G-CS-02, G-CS-01 | MEDIUM | All |
| T-AG-01 | Uncontrolled action | Medium | High or Crit | HIGH CRIT | G-AG-01-05, Sandbox | LOW-MEDIUM | Agents |
| T-AG-02 | Privilege escalation | Low-Med | High | HIGH | G-AG-05, Sandbox | LOW | Agents |
| T-AG-03 | Agent propagation | Low | High | HIGH | G-AG-04, Arch | MEDIUM | Agents |
| T-AG-04 | Agent persistence | Low | Critical | CRITICAL | G-AG-05, Sandbox | LOW | Agents L5 |
| T-CS-01 | Vulnerable code | High | High | HIGH | G-CS-02, G-CS-01 | MEDIUM | All |
| T-CS-02 | Hallucinated security | Medium | High | HIGH | G-CS-01, G-CS-04 | LOW | All |
| T-CS-03 | Hardcoded creds | Medium | High | HIGH | G-CS-02, G-DH-02 | LOW | All |
| T-AV-01 | Service dependency | Medium | Medium | MEDIUM | Business continuity | LOW | Cloud/hybrid |
| T-AV-02 | Cost abuse | Medium | Medium | MEDIUM | G-AG-02,03, Quotas | LOW | Cloud/agents |
| T-MU-01 | Over-trust | High | High | HIGH | G-CS-01, G-AG-07 | MEDIUM | All |
| T-MU-02 | Hallucination | High | Medium | MEDIUM | G-CS-01, G-CS-03 | LOW-MEDIUM | All |
| T-CH-01 | Multi-tenant leak | Low | Medium | MEDIUM | Enterprise license | LOW | Cloud SaaS |
| T-CH-02 | Data residency | Medium | Medium | MEDIUM | PS-11, Contract | LOW | Cloud-hosted |
| T-IDE-01 | Malicious extension | Low-Med | Medium-High | MEDIUM-HIGH | PS-11, Vetting | LOW | IDE-integrated |
| T-IDE-02 | Local cache compromise | Medium | Medium | MEDIUM | Encryption, G-DH-05 | LOW | IDE-integrated |
| T-SA-01 | Compromised model | Medium | High | HIGH | PS-11, Hash verify | LOW | Self-hosted |
| T-SA-02 | Model poisoning (FT) | Low | High | HIGH | Data provenance | MEDIUM | Self-hosted |
| T-SA-03 | Infrastructure compromise | Medium | Medium-High | MEDIUM-HIGH | PS-11, Hardening | LOW | Self-hosted |
| T-SA-04 | Air-gap violation | Low | Critical | CRITICAL | Physical, PS-11 | LOW | Self-hosted AG |
| T-NET-01 | MITM | Low | Medium | MEDIUM | TLS 1.3, Cert | LOW | Cloud/hybrid |
| T-NET-02 | Proxy bypass | Medium | Medium | MEDIUM | Network policy | LOW-MEDIUM | IDE-integrated |

---

## Control coverage matrix

| Threat | G-DH | G-CS | G-UB | G-AG | G-MA | PS | Provider | Arch | Encrypt |
|--------|------|------|------|------|------|-----|----------|------|---------|
| T-DE-01 | Yes 01,02,04,05 | - | - | - | Yes 01 | Yes 06,11 | - | - | - |
| T-DE-02 | - | - | - | - | - | Yes 09,11 | Yes | - | - |
| T-DE-03 | Yes 05 | - | - | - | - | Yes 11 | Yes | - | Yes |
| T-PI-01 | Yes 04 | Yes 01,05 | - | - | - | Yes 06 | Yes | - | - |
| T-PI-02 | - | Yes 05 | - | Yes 04,05 | - | - | - | - | - |
| T-PI-03 | Yes 02 | - | - | - | - | - | Yes | - | - |
| T-SC-01 | - | Yes 02,03 | - | - | - | Yes 11 | - | - | - |
| T-SC-02 | - | Yes 02 | - | - | - | Yes 01,09 | - | - | - |
| T-SC-03 | - | Yes 01,02 | - | - | - | Yes 09,11 | - | - | - |
| T-AG-01 | - | - | - | Yes 01-05 | - | Yes 05 | - | Yes | - |
| T-AG-02 | - | - | Yes 01 | Yes 04,05 | - | - | - | Yes | - |
| T-AG-03 | - | - | - | Yes 04 | - | - | - | Yes | - |
| T-AG-04 | - | - | - | Yes 05 | Yes 01 | - | - | Yes | - |
| T-CS-01 | - | Yes 01,02 | - | - | - | Yes 04,06 | - | - | - |
| T-CS-02 | - | Yes 01,04 | Yes 01 | - | - | - | - | - | - |
| T-CS-03 | Yes 02 | Yes 01,02 | - | - | - | - | - | - | - |
| T-AV-01 | - | - | - | - | - | - | - | - | - |
| T-AV-02 | - | - | - | Yes 02,03 | - | - | - | - | - |
| T-MU-01 | - | Yes 01 | - | Yes 07 | - | Yes 03,06 | - | - | - |
| T-MU-02 | - | Yes 01,03 | - | - | - | Yes 06 | - | - | - |
| T-CH-01 | - | - | - | - | - | Yes 09,11 | - | - | - |
| T-CH-02 | - | - | - | - | - | Yes 11 | - | - | - |
| T-IDE-01 | - | Yes 03 | - | - | - | Yes 09,11 | - | - | - |
| T-IDE-02 | Yes 05 | - | - | - | - | - | - | - | Yes |
| T-SA-01 | - | - | - | - | - | Yes 11 | - | - | - |
| T-SA-02 | - | Yes 01 | - | - | - | Yes 11 | - | - | - |
| T-SA-03 | - | - | - | - | - | Yes 11 | - | - | - |
| T-SA-04 | - | - | - | - | - | Yes 11 | - | - | - |
| T-NET-01 | - | - | - | - | - | - | - | - | Yes |
| T-NET-02 | - | - | - | - | - | Yes 11 | - | - | - |

---

## Tool-type risk profiles

### Cloud-hosted AI assistants

Tools: GitHub Copilot, Amazon Q Developer, Gemini Code Assist, Claude.ai

| Risk Category | Level | Key Threats | Key Controls |
|---------------|-------|-------------|--------------|
| Data Exfiltration | HIGH | T-DE-01, T-CH-01, T-CH-02 | G-DH-01-05, PS-11, Enterprise license |
| Prompt Injection | MEDIUM | T-PI-01, T-PI-03 | G-CS-05, Provider filters |
| Supply Chain | MEDIUM | T-SC-02, T-SC-03 | PS-09, Vendor assessment |
| Availability | MEDIUM | T-AV-01 | Business continuity plan |
| Over-Trust | HIGH | T-MU-01, T-MU-02 | G-CS-01, PS-06 training |
| Network Security | LOW-MEDIUM | T-NET-01, T-NET-02 | TLS 1.3, Network policy |

Recommended deployment: General development on OFFICIAL data, OFFICIAL-SENSITIVE with enterprise licensing and enhanced controls.

Best practices include:
- use enterprise licensing for government
- configure data residency controls (EU/UK)
- enable SSO and MFA
- disable training data collection where possible
- review usage analytics regularly

---

### IDE-integrated agents

Tools: Cursor, Windsurf, GitHub Copilot (extension), Amazon Kiro, Claude Code

| Risk Category | Level | Key Threats | Key Controls |
|---------------|-------|-------------|--------------|
| Data Exfiltration | MEDIUM-HIGH | T-DE-01, T-DE-03 | G-DH-05, Local filtering, Privacy mode |
| Prompt Injection | MEDIUM | T-PI-01, T-PI-02 | G-CS-05, Context validation |
| Supply Chain | MEDIUM-HIGH | T-IDE-01, T-SC-01 | PS-11 extension vetting, G-CS-03 |
| Local Compromise | MEDIUM | T-IDE-02 | Full disk encryption, Permissions |
| Over-Trust | HIGH | T-MU-01 | G-CS-01, Training |
| Network Security | MEDIUM | T-NET-02 | Proxy enforcement |

Recommended deployment: Developer productivity tools; OFFICIAL to OFFICIAL-SENSITIVE (with controls).

Best practices include:
- enable privacy and local processing modes
- clear context between projects (G-DH-05)
- use full disk encryption
- vet IDE extensions before installation
- configure to respect corporate proxy
- review local cache security settings

---

### Autonomous agents

Tools: Devin, Amazon Kiro (frontier mode), Claude Code (agentic)

| Risk Category | Level | Key Threats | Key Controls |
|---------------|-------|-------------|--------------|
| Uncontrolled Action | CRITICAL | T-AG-01 | G-AG-01-08, Sandbox, SIRO approval |
| Privilege Escalation | HIGH | T-AG-02 | G-AG-05, Least privilege, Sandbox |
| Prompt Injection | HIGH | T-PI-01, T-PI-02 | G-AG-04 Checkpoints, Monitoring |
| Agent Propagation | MEDIUM | T-AG-03 | Architecture, Isolation |
| Supply Chain | MEDIUM | T-SC-01 | G-CS-03, Scanning |
| Cost Abuse | MEDIUM | T-AV-02 | G-AG-02,03, Quotas, Kill switch |
| Code Security | MEDIUM-HIGH | T-CS-01, T-CS-02 | G-CS-02 SAST, Dual approval |

Recommended deployment: Complex refactoring tasks, approved use cases only, with SIRO approval for L5.

Best practices include:
- mandatory sandbox environment (isolated cloud account)
- test kill switch before every session
- enforce time limits (30 min L4, 2 hr L5)
- require dual-approval for all PRs
- comprehensive audit logging
- security team on-call for L5 sessions
- network restrictions (allowlist only)

---

### Self-hosted solutions

Tools: Ollama, LocalAI, LM Studio, private model hosting, air-gapped deployments

| Risk Category | Level | Key Threats | Key Controls |
|---------------|-------|-------------|--------------|
| Model Compromise | MEDIUM-HIGH | T-SA-01 | PS-11 provenance, Hash verification |
| Infrastructure | MEDIUM | T-SA-03 | PS-11 baseline, Hardening, Patching |
| Air-Gap Violation | LOW (if implemented) | T-SA-04 | Physical controls, Verification |
| Vulnerable Code | HIGH | T-CS-01 | G-CS-02 SAST, Human review |
| No Provider Security | N/A | - | Self-managed responsibility |
| Fine-Tuning Risk | LOW HIGH | T-SA-02 | Data provenance, Validation |

Recommended deployment: Sensitive projects, data sovereignty requirements, air-gapped environments, projects with high security needs.

Best practices include:
- use only approved, hash-verified models
- hardening hosting infrastructure
- implementing resource limits
- disabling all telemetry and external connections
- regular patching and updates
- physical security for air-gapped systems
- one-way model transfer process for air-gap
- document model provenance (ML-BOM)

---

## Emerging threats

The following threats are emerging or anticipated in the next 12-24 months:

| Threat | Description | Timeline | Preparation Needed |
|--------|-------------|----------|-------------------|
| AI worms | Self-propagating prompt injection across agent networks | Near-term (6-12 mo) | Limit agent chaining, enhanced monitoring |
| Multi modal injection | Attacks via images, audio, video in context | Current | Input validation across modalities, content sanitization |
| Model theft via API | Extracting model weights through API queries | Current | Provider responsibility, query monitoring |
| Regulatory non-compliance | EU AI Act, future UK AI regulation | Near-term (6-12 mo) | Maintain compliance posture, risk classification |
| Agentic malware | Self modifying, AI driven malware | Medium term (12 to 24 mo) | Detection research, behavioral analysis |
| Deepfake code attribution | False attribution of malicious code | Medium term | Code signing, stronger attribution |
| Quantum threats | Post quantum crypto vulnerabilities | Long term (5+ yrs) | Follow NCSC quantum guidance |

---

## Threat model maintenance

| Activity | Frequency | Owner | Trigger |
|----------|-----------|-------|---------|
| Full threat model review | Annually | AI Security Lead | Scheduled |
| MITRE ATLAS update check | Quarterly | AI Security Lead | ATLAS releases |
| OWASP LLM Top 10 check | Annually | AI Security Lead | OWASP releases |
| Tool-specific threat update | Per onboarding | Security Team | New tool adoption |
| Post-incident review | Per incident | Security Team | Security incident |
| Emerging threat scan | Monthly | AI Security Lead | Research monitoring |
| Architecture review | Per major change | Security Team | Architecture changes |

Threat model version control:
- all changes tracked in version history
- significant changes require SIRO review
- tool-specific sections updated when tools added/removed

---

## Further reading

[Security Policies](security-policies.md) covers governance mandate and policy framework.

[Guardrails Base](../governance/guardrails-base.md) covers technical control implementation.

### UK Government

[NCSC Guidelines for Secure AI System Development](https://www.ncsc.gov.uk/collection/guidelines-secure-ai-system-development)

[NCSC Supply Chain Security](https://www.ncsc.gov.uk/collection/supply-chain-security)

[UK AI Playbook for Government (2025)](https://www.gov.uk/government/publications/ai-playbook-for-the-uk-government)

### International standards and frameworks

[NCSC Machine Learning Security Principles](https://www.ncsc.gov.uk/files/Principles-for-the-security-of-machine-learning.pdf)

[MITRE ATLAS: Adversarial Tactics, Techniques and Common Knowledge for Machine Learning Systems](https://atlas.mitre.org/)

[MITER Adversarial ML Taxonomy (AI 100-2)](https://csrc.nist.gov/pubs/ai/100/2/e2023/final)

[NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework)

[OWASP Top 10 for Large Language Model Applications (2025)](https://genai.owasp.org/llm-top-10/)

[OWASP Agentic AI Threats and Mitigations](https://genai.owasp.org/resource/agentic-ai-threats-and-mitigations/)

[OWASP Prompt Injection Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/LLM_Prompt_Injection_Prevention_Cheat_Sheet.html)

[EU AI Act](https://ec.europa.eu/info/law/artificial-intelligence-act_en)

### Industry research

[Simon Willison – Prompt Injection Research Collection](https://simonwillison.net/tags/promptinjection/)

[OWASP Agentic AI Threats and Mitigations](https://genai.owasp.org/resource/agentic-ai-threats-and-mitigations/)

[OWASP Prompt Injection Prevention Cheatsheet](https://cheatsheetseries.owasp.org/cheatsheets/LLM_Prompt_Injection_Prevention_Cheat_Sheet.html)

[NIST AI RMF](https://www.nist.gov/itl/ai-risk-management-framework)

[NIST Adversarial ML Taxonomy (AI 100-2)](https://csrc.nist.gov/pubs/ai/100/2/e2023/final)

### Research (Tier 5)

Greshake et al. (2023) - 'Not What You've Signed Up For: Compromising Real-World LLM-Integrated Applications with Indirect Prompt Injection'

Zou et al. (2023) - 'Universal and Transferable Adversarial Attacks on Aligned Language Models'

[Simon Willison - Prompt Injection Research Collection](https://simonwillison.net/tags/promptinjection/)

---

## Document control

| Field | Value |
|-------|-------|
| Version | 1.0.0 |
| Status | Draft |
| Classification | OFFICIAL |
| Owner | AI Security Lead |
| Created | 2026-02-05 |
| Updated | 2026-02-10 |
| Review date | 2026-08-09 |

### Version history

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 0.1.0 | 2026-02-05 | AI Security Lead | Initial draft with core threats |
| 1.0.0 | 2026-02-09 | AI Security Lead | Added comprehensive tool-type architectures (4 types), data flows, tool-specific threat categories (T-CH, T-IDE, T-SA, T-NET), risk profiles, 11 new threats |
| 1.0.1 | 2026-02-10 | AI Security Lead | Applied GDS style guide formatting: bullet points start with lower case, replaced tick-box characters with plain text in Control Coverage Matrix |