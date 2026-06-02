> ALPHA
> This is a new service. Your [feedback](https://github.com/govuk-digital-backbone/aiengineeringlab/discussions) will help us to improve it.

# Team classification guide

> Detailed criteria and guidance for classifying teams as starting, developing, or established.

## Contents

[Purpose](#purpose)

[Classification overview](#classification-overview)

[Starting classification](#starting-classification)

[Developing classification](#developing-classification)

[Established classification](#established-classification)

[Classification decision guide](#classification-decision-guide)

[Dimension-specific guidance](#dimension-specific-guidance)

[Common classification scenarios](#common-classification-scenarios)

[Classification communication](#classification-communication)

[Reassessment and progression](#reassessment-and-progression)

[Further reading](#further-reading)

## Purpose

This guide provides detailed criteria for classifying teams following the [maturity assessment](maturity-assessment-framework.md). It helps assessors make consistent classification decisions and helps teams understand what their classification means.

Use this guide to:

- make consistent classification decisions across teams
- explain classification rationale to teams
- identify specific areas for improvement
- plan appropriate support interventions

For the full assessment process, see [Maturity assessment framework](maturity-assessment-framework.md).

## Classification overview

| Level | Description | Support model | Typical programme duration |
|-------|-------------|---------------|---------------------------|
| Starting | Teams needing intensive support to begin adoption | Embedded forward deployed engineer (FDE), high-touch | 6 to 8 weeks to developing |
| Developing | Teams building proficiency with moderate support | Shared FDE, blended | 4 to 6 weeks to established |
| Established | Teams ready for self-sufficient adoption | On-demand consultation | Ongoing self-service |

## Starting classification

### Profile summary

Starting teams have limited AI assistant experience, face significant constraints, or have substantial barriers to adoption. They need intensive, hands-on support to successfully begin using AI coding assistants.

### Identifying characteristics

#### Technical indicators

| Indicator | What it looks like |
|-----------|-------------------|
| Complex legacy environment | Mainframe, COBOL, outdated frameworks, minimal tooling |
| Non-standard development setup | No consistent IDE, complex local environment requirements |
| Limited CI/CD maturity | Manual deployments, no automated testing pipeline |
| Security constraints | Air-gapped networks, complex approval processes, OFFICIAL-SENSITIVE and above data |
| Poor documentation | Tribal knowledge, outdated or missing architecture docs |

#### Team indicators

| Indicator | What it looks like                                   |
|-----------|------------------------------------------------------|
| Limited AI experience | Less than 20% of team have used any AI coding tools  |
| Junior-heavy composition | More than 50% of team are junior engineers           |
| High turnover | Significant team changes in past 6 months            |
| Knowledge silos | One to two individuals hold important knowledge      |
| Limited learning culture | No time allocated for learning, no knowledge sharing |

#### Delivery indicators

| Indicator | What it looks like |
|-----------|-------------------|
| Critical deadline pressure | Major delivery commitment within 8 weeks |
| Change fatigue | Team has undergone major changes recently |
| No protected time | Cannot allocate any time for training or adoption |
| Uncertain management support | Manager ambivalent or unsupportive |
| Resource constraints | Team understaffed for current commitments |

#### Attitude indicators

| Indicator | What it looks like |
|-----------|-------------------|
| Active resistance | Vocal opposition from team members |
| Strong scepticism | 'This will not work for us' mindset |
| Job security concerns | Fear that AI will replace engineers |
| Previous negative experience | Bad experience with AI tools or failed initiatives |
| Trust issues | Distrust of management motives for adoption |

### Support approach for starting teams

| Element | Approach |
|---------|----------|
| FDE model | Embedded (dedicated FDE for 2 to 4 weeks) |
| Training | Face-to-face workshops, guided hands-on |
| Check-ins | Daily during first 2 weeks |
| Change management | High-touch, address resistance directly |
| Focus | Build basic confidence, quick wins, address concerns |
| Junior-heavy teams | Pair juniors with AI tools under structured supervision for the first 2 to 4 weeks. A senior engineer reviews not just the code output but the prompts used and the junior's understanding of the response. This turns the FDE engagement into a teaching opportunity rather than just a tool rollout. See [For junior engineers: building foundations through AI](../playbooks/prompt-engineering/prompt-engineering-ai-roles.md#for-junior-engineers-building-foundations-through-ai). |

### What starting teams need to progress

To progress to developing classification, starting teams need to demonstrate:

- basic tool proficiency, with the team using AI for simple tasks
- reduced resistance, with no active blockers to adoption
- established workflows, with AI integrated into daily work
- sustainability, with the team working independently for short periods
- champion emergence, with at least one enthusiastic team member

## Developing classification

### Profile summary

Developing teams have foundational capabilities or some AI experience. They need moderate support to build proficiency and establish sustainable practices. Most teams enter at or quickly progress to this level.

### Identifying characteristics

#### Technical indicators

| Indicator | What it looks like |
|-----------|-------------------|
| Standard tooling | Common IDEs, modern version control |
| Reasonable CI/CD | Automated builds, some automated testing |
| Mixed codebase | Some legacy, some modern code |
| Manageable constraints | Security requirements understood and addressed |
| Basic documentation | README exists, some architecture documentation |

#### Team indicators

| Indicator | What it looks like |
|-----------|-------------------|
| Some AI experience | 20% to 50% of team have used AI coding tools |
| Mixed experience levels | Balance of junior, mid, and senior engineers |
| Stable core team | Some changes but core team intact |
| Knowledge sharing exists | Some demos, documentation, or pairing |
| Learning interest | Team interested in improving practices |

#### Delivery indicators

| Indicator | What it looks like |
|-----------|-------------------|
| Moderate pressure | Deliverables but manageable workload |
| Some capacity | Can allocate 2 to 4 hours per week for adoption activities |
| Management support | Manager supportive of adoption |
| Reasonable stability | No major changes imminent |

#### Attitude indicators

| Indicator | What it looks like                           |
|-----------|----------------------------------------------|
| Cautiously positive | Open to trying, want to see results          |
| Some concerns | Questions about quality, security, workflow  |
| Mixed enthusiasm | Some keen, some neutral, few resistant       |
| Pragmatic mindset | 'Show me it works' attitude                  |
| Potential champions | One or two people who could become champions |

### Support approach for developing teams

| Element | Approach |
|---------|----------|
| FDE model | Shared (FDE across 2 to 3 teams, 2 to 3 days per week) |
| Training | Blended (self-paced and facilitated sessions) |
| Check-ins | Weekly |
| Change management | Standard approach, address concerns as they arise |
| Focus | Build proficiency, advanced techniques, identify champions |
| Junior-heavy teams | Pair juniors with AI tools under structured supervision for the first 2 to 4 weeks. A senior engineer reviews not just the code output but the prompts used and the junior's understanding of the response. This turns the FDE engagement into a teaching opportunity rather than just a tool rollout. See [For junior engineers: building foundations through AI](../playbooks/prompt-engineering/prompt-engineering-ai-roles.md#for-junior-engineers-building-foundations-through-ai). |

### What Developing teams need to progress

To progress to established classification, developing teams need to demonstrate:

- consistent daily usage, with more than 80% of team using tools daily
- quality output, with AI-generated code passing reviews consistently
- advanced techniques, with the team using context engineering and complex prompting
- self-sufficiency, with minimal FDE support needed
- an active champion, with at least one person supporting others, contributing to the community

## Established classification

### Profile summary

Established teams are ready for self-sufficient AI Engineering Lab adoption. They have strong foundational practices, experienced team members, and positive attitudes. They need minimal direct support and can serve as role models for other teams.

### Identifying characteristics

#### Technical indicators

| Indicator | What it looks like |
|-----------|-------------------|
| Modern tooling | Standardised IDE, modern frameworks |
| Mature CI/CD | Comprehensive automated testing, continuous deployment |
| Well-maintained codebase | Low technical debt, regular refactoring |
| Clear security posture | Security requirements clear and met |
| Strong documentation | Up to date docs, architecture decision records |

#### Team indicators

| Indicator | What it looks like |
|-----------|-------------------|
| Significant AI experience | More than 50% of team have used AI coding tools |
| Senior presence | Strong senior engineers who mentor others |
| Stable team | Low turnover, strong team cohesion |
| Active learning culture | Regular learning activities, conference attendance |
| Strong knowledge sharing | Pairing, mob programming, internal tech talks |

#### Delivery indicators

| Indicator | What it looks like |
|-----------|-------------------|
| Manageable workload | Sustainable pace, time for improvement |
| Capacity for adoption | Can dedicate meaningful time to AI adoption |
| Strong management support | Manager actively championing adoption |
| Proactive improvement | Team seeks out improvement opportunities |

#### Attitude indicators

| Indicator | What it looks like |
|-----------|-------------------|
| Enthusiastic | Eager to use and experiment with AI tools |
| Confident | Comfortable trying new approaches |
| Quality-focused | Want AI to improve quality, not just speed |
| Willing to share | Happy to help other teams, contribute to programme |
| Champions present | Multiple people who could lead adoption |

### Support approach for established teams

| Element | Approach |
|---------|----------|
| FDE model | On-demand consultation |
| Training | Self-paced with optional advanced workshops |
| Check-ins | Bi-weekly or monthly |
| Change management | Light-touch, team self-manages |
| Focus | Optimisation, advanced use cases, champion development |

### Role of established teams in programme

Established teams contribute to the broader programme.

| Contribution | Description |
|--------------|-------------|
| Champions | Provide champions for community of practice |
| Case studies | Share success stories and lessons learned |
| Pattern development | Pioneer advanced patterns for AI Engineering Lab repository |
| Peer support | Help other teams through community channels |
| Demos | Showcase effective AI usage to other departments |

## Classification decision guide

### Decision flowchart

```
START
  │
  ├─► Are there blocking security or compliance issues?
  │     YES → Cannot proceed (resolve first)
  │     NO ↓
  │
  ├─► Is there active, widespread resistance (more than 50% team)?
  │     YES → Starting (address resistance first)
  │     NO ↓
  │
  ├─► Is there a critical deadline within 4 weeks?
  │     YES → Starting (or defer adoption)
  │     NO ↓
  │
  ├─► Has less than 20% of team used AI coding tools?
  │     YES → Likely Starting
  │     NO ↓
  │
  ├─► Has more than 50% of team used AI coding tools AND
  │   team has strong practices AND
  │   team is enthusiastic?
  │     YES → Likely Established
  │     NO ↓
  │
  └─► Default → Developing
```

### Scoring-based classification

Consider using dimension scoring from the [Maturity Assessment Framework](maturity-assessment-framework.md).

| Average score | Classification |
|---------------|----------------|
| 1.0 to 1.7 | Starting |
| 1.8 to 2.4 | Developing |
| 2.5 to 3.0 | Established |

### Override conditions

Certain conditions override the score-based classification.

| Condition | Override |
|-----------|----------|
| No security approval | Maximum: starting |
| Critical deadline within 4 weeks | Maximum: starting |
| More than 50% active resistance | Maximum: starting |
| No management support | Maximum: starting |
| Air-gapped environment (cloud tools) | Not suitable for cloud AI tools |
| Active champions and more than 80% daily usage | Minimum: developing |

### Borderline cases

For teams scoring near classification boundaries, such as 1.7 to 1.8 or 2.4 to 2.5, you should:

- review qualitative factors, do interview notes suggest scores are higher or lower
- consider trajectory, is the team improving or facing new challenges
- apply 'benefit of doubt', when uncertain, classify lower to ensure adequate support
- document rationale, record why borderline decision was made
- plan early reassessment, schedule check-in at 2 weeks instead of 4

## Dimension-specific guidance

### Technical environment scoring

| Score | Criteria |
|-------|----------|
| 1 (starting) | Non-standard IDEs, legacy VCS, no CI/CD, manual deployments, more than 70% legacy code, complex local setup |
| 2 (developing) | Standard IDE with some variation, Git workflows, basic CI/CD, 30% to 70% legacy code, documented setup |
| 3 (established) | Standardised IDE, mature Git practices, comprehensive CI/CD, less than 30% legacy, containerised or automated setup |

### Team composition scoring

| Score | Criteria |
|-------|----------|
| 1 (starting) | More than 50% junior, less than 20% AI experience, limited learning time, siloed knowledge |
| 2 (developing) | Mixed levels, 20% to 50% AI experience, some learning activities, some knowledge sharing |
| 3 (established) | Strong senior presence, more than 50% AI experience, active learning culture, systematic knowledge transfer |

### Delivery context scoring

| Score | Criteria |
|-------|----------|
| 1 (starting) | Critical deadline less than 8 weeks, recent major changes, no time for training, uncertain management support |
| 2 (developing) | Moderate pressure, some recent changes, can allocate some time, supportive management |
| 3 (established) | Manageable workload, stable period, can dedicate time, management actively championing |

### Security posture scoring

| Score | Criteria |
|-------|----------|
| 1 (starting) | OFFICIAL-SENSITIVE and above, significant restrictions, complex compliance, security concerns unresolved |
| 2 (developing) | OFFICIAL-SENSITIVE with controls, some restrictions, moderate compliance, security engaged |
| 3 (established) | OFFICIAL only, standard requirements, security approved, clear posture |

### Attitudes scoring

| Score | Criteria |
|-------|----------|
| 1 (starting) | Sceptical or resistant, significant concerns, no champions, negative prior experience |
| 2 (developing) | Cautiously positive, some concerns, potential champions, mixed enthusiasm |
| 3 (established) | Enthusiastic, concerns managed, active champions, positive prior experience |

### Ways of working scoring

| Score | Criteria |
|-------|----------|
| 1 (starting) | Informal or no standards, limited testing, minimal docs, high technical debt |
| 2 (developing) | Documented but inconsistent standards, reasonable testing, basic docs, moderate debt |
| 3 (established) | Clear enforced standards, comprehensive testing, good docs, managed debt |

---

## Common classification scenarios

### Scenario 1: legacy modernisation team

Team maintaining 15-year-old Java application, planning modernisation.

| Assessment | Score | Description |
|------------|-------|-------------|
| Technical | 1 | Java 8, Subversion, limited CI/CD |
| Team | 2 | Mixed experience, 30% used AI tools |
| Delivery | 2 | Modernisation starting in 3 months |
| Security | 3 | OFFICIAL, standard requirements |
| Attitudes | 2 | Interested, see AI helping modernisation |
| Ways of working | 2 | Basic standards, reasonable testing |

Average: 2.0 leading to developing classification.

Despite legacy technical environment, team is stable, has capacity, and sees AI as helpful for modernisation. Developing classification with focus on legacy-specific techniques.

---

### Scenario 2: high-pressure delivery team

Team building new citizen-facing service with go-live in 6 weeks.

| Assessment | Score | Description |
|------------|-------|-------------|
| Technical | 3 | Modern stack, good CI/CD |
| Team | 3 | Experienced, 60% used AI tools |
| Delivery | 1 | Critical deadline in 6 weeks |
| Security | 3 | OFFICIAL, approved |
| Attitudes | 2 | Enthusiastic but time-poor |
| Ways of working | 3 | Strong practices |

Average: 2.5 leading to established classification.

However, critical deadline override applies.

Classification: starting (deferred).

Despite strong indicators, team cannot allocate time for adoption. Recommend deferring intensive adoption until after go-live, with self-service resources available for interested individuals now.

### Scenario 3: security-constrained team

Team working on law enforcement system with strict security requirements.

| Assessment | Score | Description |
|------------|-------|-------------|
| Technical | 2 | Modern but constrained environment |
| Team | 2 | Experienced, 40% AI experience |
| Delivery | 3 | Manageable workload |
| Security | 1 | OFFICIAL-SENSITIVE, significant constraints |
| Attitudes | 2 | Positive but cautious about security |
| Ways of working | 3 | Strong practices |

Average: 2.2 leading to developing classification.

Developing classification but with security-focused onboarding. FDE engagement should focus on guardrails configuration and security-safe workflows. May need extended timeline for security approvals.

### Scenario 4: resistant team

Team where engineers are sceptical about AI tools.

| Assessment | Score | Description |
|------------|-------|-------------|
| Technical | 3 | Good environment |
| Team | 2 | Experienced but negative prior AI experience |
| Delivery | 2 | Reasonable capacity |
| Security | 3 | Standard |
| Attitudes | 1 | 40% resistant, 30% neutral, 30% positive |
| Ways of working | 3 | Strong |

Average: 2.3 leading to developing classification.

Despite good technical foundations, attitude score pulls down average. Developing classification with heavy change management emphasis. FDE should work with resistant individuals, demonstrating value, and building from the 30% who are positive.

### Scenario 5: champion-ready team

Team with several AI enthusiasts already experimenting.

| Assessment | Score | Description |
|------------|-------|-------------|
| Technical | 3 | Modern, well-maintained |
| Team | 3 | Mixed, but 3 engineers already using AI extensively |
| Delivery | 3 | Stable, capacity available |
| Security | 3 | OFFICIAL, approved |
| Attitudes | 3 | Enthusiastic, multiple potential champions |
| Ways of working | 3 | Strong practices |


Average: 3.0 leading to established classification.

Clear established classification. Focus on enabling existing enthusiasts as champions, capturing their patterns for AI Engineering Lab repository, and connecting them to community. Light-touch support only.

## Classification communication

### Communicating to teams

When you share classification with teams, you should:

- explain what the classification means for support they will receive
- frame as 'matching support to needs' not judgement
- highlight strengths identified in assessment
- be clear about path to progression
- answer questions openly

Do not:

- present as a grade or ranking
- compare teams to each other
- make teams feel 'behind'
- suggest classification is permanent
- dismiss concerns about classification

### Template for classification communication

```
Team classification summary

Team: [Name]
Classification: [Starting, Developing, or Established]
Assessment date: [Date]

What this means:

[2 to 3 sentences explaining the classification and support model]

Main strengths identified.

1. [Strength 1]
2. [Strength 2]
3. [Strength 3]

Areas for development.

1. [Area 1]
2. [Area 2]

Your support plan.

1. FDE model: [Embedded, Shared, or On-demand]
2. Training: [Approach]
3. Check in frequency: [Frequency]

Next steps.

1. [Immediate action]
2. [Short-term action]
3. [Medium-term goal]

Questions? Contact [Name] at [email].
```

---

## Reassessment and progression

### When to reassess

| Trigger | Action |
|---------|--------|
| Scheduled interval | Every 4 weeks during active adoption |
| Significant change | Team composition, delivery context, or technical environment changes |
| Progression request | Team believes they have met progression criteria |
| Support concern | FDE or delivery manager believes classification does not match reality |

### Progression approval

| Transition | Approval needed |
|------------|-------------------|
| Starting to developing | FDE and programme team |
| Developing to established | FDE and programme team |
| Downgrade (any) | Programme team and delivery manager agreement |

### Documenting progression

You should record:

- the previous classification and date
- new classification and date
- evidence supporting the change
- an updated support plan
- the next reassessment date

---

## Further reading

The [delivery manager assessment](assessment-questionnaires/delivery-manager-assessment.md), [technical lead assessment](assessment-questionnaires/technical-lead-assessment.md), and [individual engineer assessment](assessment-questionnaires/individual-engineer-assessment.md) questionnaires are the assessment instruments used alongside this guide to gather the evidence needed to make classification decisions.