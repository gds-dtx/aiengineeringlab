> ALPHA
> This is a new service. Your [feedback](https://github.com/govuk-digital-backbone/aiengineeringlab/discussions) will help us to improve it.

# AI Engineering Lab incident response playbook

> Procedures for identifying, responding to and learning from incidents related to AI code assistant usage.

## Contents

[Purpose](#purpose)

[Key terms and acronyms](#key-terms-and-acronyms)

[Incident classification](#incident-classification)

[Incident response process](#incident-response-process)

[Example incident playbooks](#example-incident-playbooks)

[Roles and responsibilities](#roles-and-responsibilities)

[Communication templates](#communication-templates)

[Metrics and reporting](#metrics-and-reporting)

[Further reading](#further-reading)

## Purpose

This playbook provides standardised procedures for handling security incidents, data exposures and other adverse events involving AI Engineering Lab. It ensures consistent, timely responses that minimise harm and support organisational learning.

Use this playbook when:

- sensitive data has been exposed to an AI tool
- AI-generated code has introduced a security vulnerability
- a service compromise is suspected
- unusual AI behaviour suggests a potential issue
- any event occurs that could harm the organisation through AI tool usage

## Key terms and acronyms

Senior information risk owner (SIRO) – accountable for information risk and approves major decisions.

Senior responsible owner (SRO) – AI Engineering Lab programme lead.

Data protection officer (DPO) – ensures general data protection regulation (GDPR) compliance and manages the information commissioner's office (ICO) notifications.

Chief information security officer (CISO) – overall security leadership and oversight.

National cyber security centre (NCSC) – UK cyber security authority (part of GCHQ).

ICO – UK data protection regulator.

Personally identifiable information (PII) – data that can identify a person (names, emails and similar).

GDPR – UK and EU law on personal data protection.

Data processing agreement (DPA) – contract with AI vendors on data handling.

Prompt injection – security attack using malicious AI instructions to manipulate system behaviour.

## Incident classification

### Severity levels

The following table shows severity levels for incidents.

| Severity | Description | Response time | Examples |
|----------|-------------|---------------|----------|
| P1 - Critical | Immediate threat to data, systems or operations | Within 1 hour | SECRET data exposed, active exploitation of AI-generated vulnerability, credential compromise |
| P2 - High | Significant risk requiring urgent attention | Within 4 hours | OFFICIAL-SENSITIVE data exposed, security vulnerability in production, bulk PII exposure |
| P3 - Medium | Notable incident requiring prompt response | Within 24 hours | OFFICIAL data inadvertently shared, vulnerability detected pre-deployment, single PII record exposed |
| P4 - Low | Minor incident for awareness and tracking | Within 72 hours | Near-miss events, policy violations without data exposure, process failures caught in review |

### Incident categories

| Category | Code | Description |
|----------|------|-------------|
| Data exposure | DE | Sensitive data shared with AI tool |
| Code vulnerability | CV | Security flaw in AI-generated code |
| Credential leak | CL | Secrets, keys or passwords exposed |
| Service compromise | SC | AI tool or integration compromised |
| Policy violation | PV | Guardrails or usage policy breached |
| IP/Licence issue | IP | Copyright or licensing concern |
| Availability | AV | Service outage impacting operations |
| Other | OT | Incidents not fitting other categories |

## Incident response process

### Phase 1: detection and reporting

#### How to report an incident

If you discover an incident, take the following steps.

1. Stop - do not continue the activity that caused or revealed the incident.
2. Do not attempt to fix it - preserve evidence and do not delete prompts, outputs or logs.
3. Report immediately through the appropriate channels in your department.
4. Complete an initial report with the following information:
   - what happened (brief description)
   - when it happened (date and time)
   - which AI tool was involved
   - what data or systems may be affected
   - your contact details

#### Detection sources

Incidents may be detected through:

| Source | Examples |
|--------|----------|
| Self-reporting | Engineer realises they shared sensitive data |
| Code review | Reviewer identifies vulnerability or exposed secret |
| Automated scanning | Static application security testing (SAST) and secret detection tools flag issues |
| Security monitoring | Anomaly detection in AI tool usage patterns |
| External notification | Vendor, third party or security researcher report |
| Audit | Periodic review identifies historical issues |

### Phase 2: triage and assessment

#### Initial triage (within 30 minutes of report)

The Security Team or designated incident handler will complete these steps.

1. Acknowledge receipt to the reporter.
2. Assign incident ID using format: AIENG-[YYYY]-[NNNN].
3. Gather initial facts, including:
   - confirming what occurred
   - identifying AI tool(s) involved
   - determining data classification affected
   - establishing timeline
4. Assign severity level using the classification table above.
5. Identify incident owner responsible for resolution.
6. Notify stakeholders using the escalation matrix.

#### Escalation matrix

Incident severity levels are:

- P1 (Critical) - immediate threat to data, systems or operations requiring urgent, organisation-wide response
- P2 (High) - significant risk requiring urgent attention, but not an immediate crisis
- P3 (Medium) - notable incident needing prompt response, but not urgent
- P4 (Low) - minor incident for awareness and tracking only

| Severity | Immediate notification | Within 4 hours | Within 24 hours |
|----------|------------------------|----------------|-----------------|
| P1 | SIRO, security lead, SRO, IT director | CISO, DPO (if personal data) | Permanent secretary (if required) |
| P2 | Security lead, SRO | SIRO, DPO (if personal data) | Programme board |
| P3 | Security lead | SRO | Included in weekly report |
| P4 | Not applicable | Security lead | Included in monthly report |

#### Assessment questions

| Question | Purpose |
|----------|---------|
| What data was exposed | Determine classification and sensitivity |
| How much data | Scope the exposure |
| Who has access to the AI tool's logs and data | Understand potential access |
| Is the data still accessible | Determine if retrieval is possible |
| Has the vulnerability been exploited | Assess actual versus potential harm |
| Are other systems affected | Identify lateral impact |
| Is the incident ongoing | Determine containment urgency |

### Phase 3: containment

#### Immediate containment actions by incident type

##### Data exposure (DE)

Data exposure (DE) means any incident where sensitive, confidential or personal data is shared with an AI tool, either accidentally or through a security failure.

| Action | Responsibility | Timeframe |
|--------|----------------|-----------|
| Terminate active AI session | User and Security | Immediate |
| Revoke user's AI tool access (if serious) | IT Admin | Within 1 hour |
| Contact vendor to request data deletion | Security Lead | Within 4 hours |
| Document what was shared (from memory and logs) | User | Within 2 hours |
| Assess if data persists | Security Lead | Within 24 hours |

##### Code vulnerability (CV)

| Action | Responsibility | Timeframe |
|--------|----------------|-----------|
| Identify all locations of vulnerable code | Development team | Within 2 hours |
| Remove or disable affected code in production | DevOps | Immediate (P1 or P2) |
| Block deployment pipeline if pre-production | DevOps | Immediate |
| Create hotfix branch | Development team | Within 4 hours |
| Scan for exploitation evidence | Security team | Within 4 hours |

##### Credential leak (CL)

| Action | Responsibility | Timeframe |
|--------|----------------|-----------|
| Rotate affected credentials immediately | IT Admin and DevOps | Within 30 minutes |
| Revoke old credentials | IT Admin | Within 1 hour |
| Audit usage of compromised credentials | Security team | Within 4 hours |
| Update all systems using the credentials | DevOps | Within 24 hours |
| Scan repositories for credential exposure | Security team | Within 4 hours |

##### Service compromise (SC)

| Action | Responsibility | Timeframe |
|--------|----------------|-----------|
| Isolate affected systems | IT or Security | Immediate |
| Disable AI tool integration | IT Admin | Within 30 minutes |
| Preserve logs and forensic evidence | Security team | Immediate |
| Engage vendor security team | Security Lead | Within 1 hour |
| Notify NCSC if significant | SIRO | Within 24 hours |

#### Containment verification

Before proceeding to eradication, you should confirm the following.

- [ ] Immediate threat has been neutralised
- [ ] Affected systems or data have been isolated
- [ ] Evidence has been preserved
- [ ] Spread has been prevented
- [ ] Stakeholders have been notified

### Phase 4: eradication and recovery

#### Eradication activities

| Activity | Description |
|----------|-------------|
| Root cause analysis | Determine how the incident occurred |
| Vulnerability remediation | Fix the underlying security flaw |
| Malicious content removal | Remove any compromised code or data |
| Control gap closure | Implement missing controls that allowed incident |
| Vendor coordination | Work with AI tool vendor on their remediation |

#### Recovery activities

| Activity | Description |
|----------|-------------|
| Service restoration | Return AI tools to operational status |
| Access reinstatement | Restore user access with appropriate controls |
| Monitoring enhancement | Implement additional monitoring for recurrence |
| Verification testing | Confirm systems are secure before full restoration |
| User communication | Inform affected users of resolution and any required actions |

#### Recovery approval

| Severity | Approval required |
|----------|-------------------|
| P1 | SIRO and Security Lead |
| P2 | Security Lead |
| P3 | Incident Owner |
| P4 | Incident Owner |

### Phase 5: post-incident activities

#### Incident report

Complete a post-incident report within:

| Severity | Report due |
|----------|------------|
| P1 | 5 working days |
| P2 | 10 working days |
| P3 | 15 working days |
| P4 | Included in monthly summary |

The report should include details about the incident.

1. Executive summary – what happened, impact, resolution.
2. Timeline – chronological sequence of events.
3. Root cause analysis – why it happened.
4. Impact assessment – what was affected and how.
5. Response evaluation – how well we responded.
6. Lessons learned – what we can improve.
7. Recommendations – specific actions to prevent recurrence.

#### Lessons learned session

For P1 and P2 incidents, conduct a blameless post-incident review.

| Element | Description |
|---------|-------------|
| Attendees | Incident team, affected team leads, Security, AI Engineering Lab programme |
| Timing | Within 10 working days of incident closure |
| Duration | 60 to 90 minutes |
| Output | Documented lessons and action items |
| Focus | Process improvement, not blame |

#### Knowledge sharing

| Action | Audience | Timing |
|--------|----------|--------|
| Update guardrails if gap identified | All users | Within 5 days |
| Add to training materials if relevant | Future users | Next training update |
| Share anonymised lessons | Cross-government | Within 15 days |
| Update risk register | Programme governance | Within 5 days |
| Brief champion network (if appropriate) | Champions | Next community session |

## Example incident playbooks

### Example A: personal data exposed to AI tool

Scenario: an engineer accidentally includes real customer personally identifiable information (PII) in a prompt.

#### Immediate actions

1. End the AI session immediately.
2. Do not attempt to undo by asking AI to forget.
3. Document exactly what was shared.
4. Report to Security and DPO within 1 hour.

#### Assessment

You should consider:

- how many data subjects are affected
- what categories of personal data
- if the AI tool provider is a processor under GDPR
- what the vendor's DPA says about data retention

#### Containment

You must:

- request vendor delete session data (reference DPA terms)
- assess notification requirements (ICO, data subjects)

#### Regulatory considerations

| Condition | Action |
|-----------|--------|
| High risk to individuals | Notify ICO within 72 hours |
| Risk to individuals | Document in breach register |
| Unlikely risk | Document decision not to notify |

### Example B: security vulnerability deployed to production

Scenario: AI-generated code containing an SQL injection vulnerability reaches production.

#### Immediate actions

1. Assess if vulnerability is being exploited (check logs).
2. If exploited: invoke major security incident process.
3. If not exploited: implement emergency change to disable or fix.

#### Assessment

You should consider:

- what data could be accessed via the vulnerability
- how long has the vulnerability been in production
- if there is evidence of exploitation
- what compensating controls exist (web application firewall (WAF), input validation)

#### Containment

You must:

- deploy a hotfix or disable the affected functionality
- implement WAF rule if available
- increase monitoring on affected endpoints

#### Recovery

You must action:

- a full code review of AI-generated sections in the application
- a retrospective security testing
- an update of the code review checklist

### Example C: API key committed to repository

Scenario: the AI suggests code containing a hardcoded API key, which is then committed.

#### Immediate actions

1. Rotate the API key immediately and assume it has been compromised.
2. Check if repository is public or has been cloned.
3. Remove from repository history (not just current version).

#### Assessment

You should consider:

- what does the API key provide access to
- if the key been used since exposure
- who has had access to the repository

#### Containment

```bash
# Remove from git history (example using git-filter-repo)
git filter-repo --invert-paths --path 
```

#### Prevention

You must:

- enable pre-commit hooks for secret detection
- review continuous integration/continuous deployment (CI/CD) secret scanning configuration
- reinforce training on secret management

### Example D: suspected prompt injection attack

Scenario: the AI assistant produces unexpected output suggesting a malicious prompt injection.

#### Immediate actions

1. Stop using the affected AI session.
2. Do not execute any suggested commands or code.
3. Screenshot and document the suspicious output.
4. Report to Security.

#### Assessment

You should consider:

- what triggered the unusual behaviour
- if user input was involved that could contain injection
- if this is a vulnerability in our application or the AI tool

#### Containment

You must:

- review the application for prompt injection vulnerabilities
- implement input sanitisation
- consider rate-limiting AI interactions

#### Vendor notification

You must:

- report to AI tool vendor if it appears to be a tool vulnerability
- share details (sanitised) with AI Engineering Lab for cross-government awareness

## Roles and responsibilities

| Role | Responsibilities |
|------|------------------|
| Reporter | Identify and report incident promptly, preserve evidence, cooperate with investigation |
| Incident Owner | Coordinate response, make decisions within authority, communicate status, ensure resolution |
| Security Lead | Provide security expertise, assess risk, advise on containment, liaise with NCSC if needed |
| IT and DevOps | Execute technical containment and recovery actions, preserve logs |
| SIRO | Approve major decisions, accountable for information risk, escalate to board if needed |
| DPO | Assess personal data impact, advise on ICO notification, ensure GDPR compliance |
| SRO | Programme-level decisions, stakeholder communication, resource allocation |
| Communications | Manage internal and external messaging if required |

## Communication templates

### Initial notification (internal)

```
Subject: [SEVERITY] AI Engineering Lab Security Incident - AIENG-[YYYY]-[NNNN]

An incident involving AI Engineering Lab usage has been reported.

Incident ID: AIENG-[YYYY]-[NNNN]
Severity: [P1 or P2 or P3 or P4]
Category: [Category]
Status: [Investigating or Contained or Resolved]

Summary: [Brief description - 2 to 3 sentences]

Affected: [Systems, data, users affected]

Current actions: [What is being done]

Incident Owner: [Name]
Next update: [Time]

Please direct questions to [contact].
```

### Status update

```
Subject: UPDATE [#N] - AIENG-[YYYY]-[NNNN] - [Brief description]

Status: [Investigating or Contained or Resolving or Resolved]

Progress since last update:
- [Action completed]
- [Action completed]

Current focus:
- [Ongoing action]

Blockers and risks:
- [Any issues]

Next update: [Time]
```

### Incident closure

```
Subject: CLOSED - AIENG-[YYYY]-[NNNN] - [Brief description]

This incident has been resolved and closed.

Resolution: [How it was resolved]

Impact: [Final assessment of impact]

Post-incident report: [Link - for P1 or P2]

Lessons learned session: [Date and time - for P1 or P2]

Questions: Contact [Incident Owner]
```

## Metrics and reporting

### Incident metrics to track

| Metric | Description |
|--------|-------------|
| Total incidents | Count by severity and category |
| Mean time to detect (MTTD) | Time from occurrence to detection |
| Mean time to respond (MTTR) | Time from detection to containment |
| Mean time to resolve | Time from detection to closure |
| Incidents by AI tool | Distribution across tools |
| Incidents by team | Identify teams needing support |
| Repeat incidents | Same root cause recurring |

### Reporting cadence

| Report | Frequency | Audience | Content |
|--------|-----------|----------|---------|
| Incident summary | Weekly | Security Lead, SRO | Open incidents, key metrics |
| Monthly report | Monthly | Programme Board | Trends, lessons learned, recommendations |
| Quarterly review | Quarterly | SIRO, Senior Leadership | Strategic risks, control effectiveness |

## Further reading

The [NCSC incident management guidance](https://www.ncsc.gov.uk/collection/incident-management) provides practical advice on preparing for and responding to incidents. If personal data is involved, the [ICO personal data breach guidance](https://ico.org.uk/for-organisations/report-a-breach/) covers when and how to notify the regulator. The [government security classifications](https://www.gov.uk/government/publications/government-security-classifications) framework underpins the severity and data classification approach used throughout this playbook. For related internal guidance, see the [guardrails base](guardrails-base.md) for security controls that help prevent incidents, and the [risk register template](risk-register-template.md) for documenting and tracking risk.