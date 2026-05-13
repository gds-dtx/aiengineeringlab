> ALPHA
> This is a new service. Your [feedback](https://github.com/govuk-digital-backbone/aiengineeringlab/discussions) will help us to improve it.
# AI Engineering Lab quality strategy

> Strategic framework for measuring success and demonstrating value across the AI Engineering Lab programme.

## Contents

[Purpose](#purpose)

[Strategic objectives](#strategic-objectives)

[Success criteria](#success-criteria)

[Tier 1: adoption metrics](#tier-1-adoption-metrics)

[Tier 2: productivity metrics](#tier-2-productivity-metrics)

[Tier 3: Quality and delivery metrics](#tier-3-quality-and-delivery-metrics)

[Tier 4: Business outcome metrics](#tier-4-business-outcome-metrics)

[Satisfaction metrics](#satisfaction-metrics)

[Adaptability metrics](#adaptability-metrics)

[Comparative analysis](#comparative-analysis)

[Reporting framework](#reporting-framework)

[Governance and accountability](#governance-and-accountability)

[Continuous improvement](#continuous-improvement)

[Data quality and integrity](#data-quality-and-integrity)

[Further reading](#further-reading)

## Purpose

This strategy defines what success looks like for AI Engineering Lab adoption and how we measure it. It provides a consistent approach across all participating departments while allowing flexibility for local context.

Use this strategy to:

- understand programme success criteria and targets
- align departmental measurement with programme goals
- report consistently across the programme
- make evidence-based decisions about adoption approach

For practical implementation guidance, read the [measurement playbook](measurement-playbook.md).

---

## Strategic objectives

The AI Engineering Lab programme aims to achieve the following five strategic objectives.

| Objective | Description | Why it matters |
|-----------|-------------|----------------|
| Adoption | AI tools actively used by allocated engineers | Investment only works if tools are used |
| Productivity | Measurable improvement in engineer efficiency | Core value proposition of AI assistants |
| Quality | Code quality maintained or improved | Speed must not sacrifice quality |
| Satisfaction | Positive engineer and stakeholder experience | Sustainable adoption requires satisfaction |
| Sustainability | Adoption continues beyond programme support | Long-term value, not temporary uplift |

---

## Success criteria

### Programme-level targets

These targets apply across the AI Engineering Lab programme.

| Metric | Target | Rationale |
|--------|--------|-----------|
| Licence activation | 100% within 48 hours | Previous trial achieved only 66% to 75%, Structured support should achieve full activation |
| Daily active usage | Over 80% of activated licences | High usage indicates tools embedded in workflow                                            |
| Training attendance | 70% or more of allocated users | Training correlates with successful adoption                                               |
| Training satisfaction | 8.0 or more out of 10 | Quality training accelerates proficiency                                                   |
| Champion engagement | 200 identified, 50 or more actively contributing | Champions sustain adoption beyond programme                                                |
| Use cases documented | 2 or more with measured benefits | Evidence base for future investment                                                        |
| Reusable blueprint | Complete and validated | Enables wider public sector rollout                                                        |

### Tiered success framework

Success builds progressively through the following four tiers.

```
┌─────────────────────────────────────────────────────────────┐
│  Tier 4: Business outcomes                                  │
│  Faster delivery, reduced costs, increased capacity.        │
├─────────────────────────────────────────────────────────────┤
│  Tier 3: Quality and delivery                               │
│  Maintained quality, improved throughput, reduced rework.   │
├─────────────────────────────────────────────────────────────┤
│  Tier 2: Productivity                                       │
│  Time savings, faster task completion, efficiency gains.    │
├─────────────────────────────────────────────────────────────┤
│  Tier 1: Adoption                                           │
│  Tools activated, actively used, training completed.        │
└─────────────────────────────────────────────────────────────┘
```

Progression principle: higher tiers only matter if lower tiers are achieved. There is no productivity gain without adoption. There is no business outcome without sustained quality.

---

## Tier 1: adoption metrics

Question answered: are people using the tools?

### Metrics

| Metric | Definition | Target | Measurement frequency |
|--------|------------|--------|----------------------|
| Licence activation rate | Licences activated and licences allocated | 100% within 48 hours | Daily during rollout |
| Daily active users (DAU) | Users with activity today and activated users | Over 80% | Daily |
| Weekly active users (WAU) | Users with activity this week and activated users | Over 90% | Weekly |
| Training completion | Users completing core training and allocated users | 70% or more | Weekly |
| Feature adoption breadth | Features used per user (completion, chat, and similar) | Increasing trend | Monthly |

### Leading indicators

#### Early warning signs of adoption issues

| Indicator | Warning threshold | Action trigger |
|-----------|-------------------|----------------|
| Activation delay | Over 48 hours | Immediate outreach |
| DAU decline | Less than 70% for 3 consecutive days | Forward Deployed Engineer (FDE) intervention |
| Training non-attendance | Less than 50% by week 2 | Delivery manager (DM) escalation |
| Feature usage narrow | Only 1 feature used after 2 weeks | Additional training |

### Segmentation

Analyse adoption by:

- department
- [team maturity level](../assessment/maturity-assessment-framework.md) (starting, developing or established)
- tool (Copilot, Claude, Q or Gemini)
- role (engineer, tech lead, or another suitable role)
- work type (modernisation, greenfield or maintenance)

---

## Tier 2: productivity metrics

Question answered: are engineers more efficient?

### Metrics

| Metric | Definition | Target | Measurement frequency |
|--------|------------|--------|-----------------------|
| Suggestion acceptance rate | AI suggestions accepted and suggestions shown | Baseline and positive trend | Weekly |
| Time on task | Time to complete comparable tasks | Decreasing versus baseline | Sprint |
| Code commit frequency | Commits per engineer per day | Increasing versus baseline | Weekly |
| [Lead time for changes](https://dora.dev/) | Time from commit to production | Decreasing versus baseline | Sprint |
| Engineer velocity | Story points per engineer per sprint | Baseline and improvement | Sprint |

### Productivity targets (indicative)

| Metric | Indicative target | Notes |
|--------|-------------------|-------|
| Commit frequency | Increase by 15% by month 3 | More frequent, smaller commits |
| Lead time | Reduce by 20% | Faster path to production |
| Code review cycle time | Reduce by 25% | Faster reviews with AI assistance |
| Time on routine tasks | Reduce by 30% to 50% | Largest gains on boilerplate, tests |

### Measurement cautions

Compare teams to their own baselines, not each other. Account for sprint to sprint variation. Control for team changes, holidays, major releases. Balance speed metrics with quality metrics.

---

## Tier 3: Quality and delivery metrics

Question answered: is the code good and work reliable?

### Metrics

| Metric | Definition | Target | Measurement frequency |
|--------|------------|--------|----------------------|
| Defect density | Defects per story or per feature | Maintain or reduce | Sprint |
| Change failure rate | Failed deployments or total deployments | Maintain or reduce | Monthly |
| Code review findings | Significant issues per PR | Maintain or reduce | Sprint |
| Test coverage | Percentage of code covered by automated tests | Maintain or increase | Sprint |
| Technical debt score | SonarQube or equivalent | Maintain or improve | Monthly |
| Rework rate | Stories reopened or stories completed | Maintain or reduce | Sprint |

### Quality targets

| Metric | Target | Rationale |
|--------|--------|-----------|
| Defect density | Reduce by 15% to 20% | AI should reduce errors, not increase them |
| Change failure rate | Maintain or reduce | Speed must not sacrifice stability |
| Test coverage | Maintain or increase by 5% to 10% | AI-assisted test generation should improve coverage |
| Technical debt | Reduce remediation cost by 20% | AI helps address debt faster |

### Quality safeguards

| Safeguard | Implementation |
|-----------|----------------|
| Mandatory code review | All AI-generated code reviewed by human |
| Security scanning | AI code passes same security checks |
| Test requirements | AI-generated code must include tests |
| Quality gates | CI/CD gates unchanged or strengthened |

---

## Tier 4: Business outcome metrics

Question answered: is the programme providing organisational value?

### Metrics

| Metric | Definition | Target | Measurement frequency |
|--------|------------|--------|----------------------|
| Time to work completion | Calendar time to complete features | Decreasing | Quarterly |
| Development cost per feature | Total cost or features completed | Decreasing | Quarterly |
| Effective capacity | Work completed without headcount increase | Increasing | Quarterly |
| Contractor dependency | Contractor ratio or spend | Decreasing | Quarterly |
| Engineer retention | Turnover rate | Maintaining or improving | Annually |
| Service improvements | User-facing service metrics | Improving | Quarterly |

### Business case alignment

| Priority | Related metrics |
|----------|-----------------|
| Efficiency savings | Cost per feature, contractor reduction |
| Digital transformation acceleration | Time to work completion, capacity increase |
| Civil service capability | Skills development, contractor reduction |
| Service quality | Defect rates, service metrics |

### Long-term value indicators

| Indicator | Measurement | Target |
|-----------|-------------|--------|
| Self-sufficiency | Teams operating without FDE support | Over 80% by programme end |
| Community health | Active champions, community engagement | Growing engagement |
| Knowledge assets | Repository contributions, reusable materials | Comprehensive coverage |
| Replication readiness | Blueprint completeness | Ready for Phase 2 |

---

## Satisfaction metrics

Question answered: how do people feel about it?

### Engineer satisfaction

| Metric | Definition | Target | Frequency |
|--------|------------|--------|-----------|
| Overall satisfaction | 'How satisfied are you with AI tools?' (on a scale of 1 to 10) | 8.0 or more | Monthly |
| Net promoter score | 'Would you recommend to a colleague?' (on a scale from -100 to +100) | Positive | Monthly |
| Confidence level | 'How confident are you using AI tools?' (on a scale of 1 to 10) | Increasing | Monthly |
| Workflow integration | 'AI tools fit well into my workflow' (on a scale of 1 to 5) | 4.0 or more | Monthly |
| Training satisfaction | Post-training survey score | 8.0 or more | Post-training |

### Stakeholder satisfaction

| Stakeholder | Key concerns | Measurement |
|-------------|--------------|-------------|
| Technical leads | Quality, standards compliance | Quarterly survey |
| Delivery managers | Work performance, team health | Quarterly survey |
| Senior responsible owners (SROs) | Value for money and risk management | Quarterly review |
| Security teams | Compliance and incident rates | Quarterly review |

### Sentiment tracking

Beyond scores, track qualitative sentiment.

| Channel | Frequency | Analysis |
|---------|-----------|----------|
| Survey free text | Monthly | Theme extraction |
| Retrospective feedback | Per sprint | Issue identification |
| Community channels | Ongoing | Sentiment monitoring |
| FDE observations | Per engagement | Qualitative insights |

---

## Adaptability metrics

Beyond measuring adoption and productivity, tracking adaptability helps make sure teams and the programme can respond to change and sustain success long-term.

### Why measure adaptability

| Reason | Description |
|--------|-------------|
| Sustain adoption | Adaptable teams maintain adoption through changes in tools, team composition, and priorities |
| Scale effectively | Adaptability indicators predict readiness to expand AI usage |
| Build resilience | Teams that adapt well recover faster from setbacks |
| Future-proof investment | Adaptable workforce can adopt future AI capabilities |

### Adaptability dimensions

#### Operational agility

Question answered: how flexibly can teams respond to changing needs?

| Metric | Definition | Leading or lagging | Target |
|--------|------------|-----------------|--------|
| Cross-tool proficiency | Percentage of engineers proficient in 2 or more AI tools | Leading | Over 30% by programme end |
| Team onboarding time | Days to onboard new team to AI tools | Lagging | Decreasing trend |
| FDE redeployment speed | Days to redeploy FDE to new team | Leading | Less than 5 days |
| Support request resolution | Time to resolve AI-related issues | Lagging | Decreasing trend |
| Practice adoption speed | Time from new practice introduced to team adoption | Lagging | Decreasing trend |

The following are some operational agility indicators.

| Indicator | What it signals | How to measure |
|-----------|-----------------|----------------|
| Teams sharing practices | Knowledge flows across teams | Cross-team contributions to repository |
| Self-service resolution | Teams solve problems independently | Percentage of issues resolved without FDE |
| Rapid experimentation | Teams try new AI features or techniques | New feature adoption within 2 weeks of release |

---

#### Workforce readiness

Question answered: are people equipped for current and future AI-assisted development?

| Metric | Definition | Leading or lagging | Target |
|--------|------------|-----------------|--------|
| Skills currency | Percentage of team trained on latest tool features | Leading | Over 80% within 4 weeks of major updates |
| Learning velocity | Time from training to demonstrated competency | Lagging | Decreasing trend |
| Champion density | Champions per 100 engineers | Leading | 2 or more per 100 engineers |
| Knowledge contribution | Repository contributions per team | Leading | 1 or more per team per quarter |
| Willingness to change | Survey score on openness to new practices | Leading | 4.0 or more |
| Internal mobility | Engineers moving to AI-focused roles or projects | Lagging | Increasing trend |

The following is workforce readiness indicators.

| Indicator | What it signals | How to measure |
|-----------|-----------------|----------------|
| Proactive learning | Engineers seek out AI skills | Self-initiated training completion |
| Peer teaching | Knowledge multiplies through team | Champion-led sessions provided |
| Experimentation culture | Safe to try and fail | New techniques tried per sprint |
| Career development | AI skills valued in progression | AI skills in role expectations |

---

### Measuring adaptability in practice

#### Team adaptability assessment

Add these questions to periodic team assessments:

```markdown
## Adaptability check-in

1. How confident is the team in adopting new AI features? (1 to 5)

2. How quickly could the team onboard a new member to AI tools?
   [ ] Less than 1 week  
   [ ] 1 to 2 weeks  
   [ ] 2 to 4 weeks  
   [ ] Over 4 weeks

3. If your primary AI tool was unavailable, could the team use an alternative?
   [ ] Yes, immediately  
   [ ] Yes, with some adjustment  
   [ ] No

4. How often does the team experiment with new AI techniques?
   [ ] Weekly  
   [ ] Monthly  
   [ ] Quarterly  
   [ ] Rarely

5. How many team members could help onboard another team?
   [ ] 0  
   [ ] 1 to 2  
   [ ] 3 or more
```

#### Programme adaptability dashboard

| Metric | Current | Target | Trend |
|--------|---------|--------|-------|
| Cross-tool proficiency | X% | Over 30% | Increasing, decreasing or stable |
| Average team onboarding time | X days | Less than 10 days | Increasing, decreasing or stable |
| Champion density | X per 100 | 2 or more per 100 | Increasing, decreasing or stable |
| Self-service resolution rate | X% | Over 70% | Increasing, decreasing or stable |
| Willingness to change score | X/5 | 4.0 or more | Increasing, decreasing or stable |

---

### Adaptability maturity levels

| Level | Characteristics | Indicators |
|-------|-----------------|------------|
| Reactive | Teams struggle with change, heavily dependent on support | Low self-service, slow onboarding, resistance to new features |
| Responsive | Teams adapt when required with moderate support | Moderate self-service, standard onboarding time, accept new features |
| Proactive | Teams anticipate and prepare for change | High self-service, fast onboarding, actively seek new features |
| Generative | Teams drive change and help others adapt | Contribute to repository, mentor other teams, champion new practices |

Target: move all teams to at least 'responsive' by programme end, with 30% at 'Proactive' or 'Generative'.

---

### Building adaptability

| Metric gap | Intervention |
|------------|--------------|
| Low cross-tool proficiency | Introduce secondary tool familiarisation |
| Slow team onboarding | Create onboarding playbook, assign buddy |
| Low champion density | Targeted champion recruitment and enablement |
| Low willingness to change | Address concerns, showcase benefits, involve sceptics |
| Low knowledge contribution | Recognise contributions, reduce friction to contribute |
| High support dependency | Gradual support reduction, build self-service resources |

---

## Comparative analysis

### Cross-tool comparison

Where teams use different tools, the following should be compared.

| Dimension | Metrics |
|-----------|---------|
| Adoption speed | Time to over 80% DAU |
| Productivity impact | Acceptance rate, time savings |
| Quality impact | Defect rates by tool |
| Satisfaction | Scores by tool |
| Cost effectiveness | Value provided per licence cost |

Caution: control for team differences. Tool comparisons require similar team contexts.

### Cross-department comparison

Compare departments on the following dimensions.

| Dimension | Purpose |
|-----------|---------|
| Adoption trajectory | Identify fast or slow adopters |
| Support efficiency | FDE time to achieve outcomes |
| Pattern effectiveness | Which approaches work best |
| [Maturity progression](../assessment/maturity-assessment-framework.md) | Speed through starting, developing and established |

Use for identifying transferable practices, not ranking departments.

### Work type analysis

| Work type | Specific metrics of interest |
|-----------|------------------------------|
| Modernisation | Legacy code understanding, refactoring speed |
| Greenfield | Time to first deployment, code quality |
| Maintenance | Bug fix time, regression rates |
| Data engineering | Pipeline development speed, data quality |
| Infrastructure | IaC development speed, deployment reliability |

---

## Reporting framework

### Report types and audiences

| Report | Frequency | Audience | Focus |
|--------|-----------|----------|-------|
| Operational dashboard | Real-time | Programme team | Adoption alerts, daily metrics |
| Weekly summary | Weekly | Programme team, delivery managers | Progress, issues, actions |
| Monthly report | Monthly | Programme board | Trends, insights, decisions |
| Quarterly review | Quarterly | Senior responsible owners, senior leadership | Business outcomes, strategic direction |
| [Final evaluation](https://www.gov.uk/government/publications/the-magenta-book) | Programme end | DSIT, senior stakeholders | Overall impact, lessons, recommendations |

### Dashboard design principles

| Principle | Implementation |
|-----------|----------------|
| Lead with headlines | Metrics and alerts at top |
| Show trends | Direction matters more than point-in-time |
| Enable drill-down | Summary to department to team |
| Highlight exceptions | Automatic flagging of concerns |
| Provide context | Targets, baselines, explanations |

### Monthly report structure

```markdown
## AI Engineering Lab monthly report [Month Year]

### Executive summary
- [3 to 5 bullet headlines]

### Programme health
| Metric | Target | Actual | Trend | Status |
|--------|--------|--------|-------|--------|
| [Metric] | [X] | [Y] | Increasing, decreasing or stable | Green, amber or red |

### Adoption
- Licences activated: X/Y (Z%)
- Daily active users: X%
- Training completion: X%

### Productivity and quality
- [Important metrics with trend]

### Satisfaction
- Engineer satisfaction: X/10
- NPS: X

### Highlights
- [Successes and positive developments]

### Concerns and actions
| Concern | Impact | Action | Owner | Due |
|---------|--------|--------|-------|-----|

### Decisions required
- [Any decisions needed from board]

### Next month focus
- [Priorities for coming month]
```

---

## Governance and accountability

### Metric ownership

| Metric category | Data owner | Analysis owner | Action owner |
|-----------------|------------|----------------|--------------|
| Adoption | Programme operations | Programme operations | Programme leads |
| Productivity | Department teams | Programme operations | FDEs and tech leads |
| Quality | Department teams | Programme operations | Tech leads |
| Satisfaction | Programme operations | Programme operations | Programme leads |
| Business outcomes | Departments | Programme operations | Senior responsible owners |

### Review rhythm

| Review | Frequency | Participants | Decisions |
|--------|-----------|--------------|-----------|
| Daily stand-up | Daily | Programme team | Immediate interventions |
| Weekly review | Weekly | Programme leads | Tactical adjustments |
| Monthly board | Monthly | Programme board | Resource allocation, escalations |
| Quarterly steering | Quarterly | Senior responsible owners, DSIT | Strategic direction |

### Escalation triggers

| Condition | Escalate to | Timeline |
|-----------|-------------|----------|
| Single team below adoption threshold | FDE lead | Within 48 hours |
| Department below adoption threshold | Programme board | Within 1 week |
| Quality metrics declining | Tech lead, security | Within 1 week |
| Satisfaction below 6.0 | Programme board | Within 1 week |
| Programme-wide metric decline | Senior responsible owner, DSIT | Immediate |

---

## Continuous improvement

### Metric review cycle

| Activity | Frequency | Purpose |
|----------|-----------|---------|
| Metric relevance review | Quarterly | Retire unused metrics, add emerging needs |
| Target calibration | Quarterly | Adjust targets based on evidence |
| Collection method audit | Quarterly | Make sure data quality is high |
| Benchmark update | Annually | Refresh industry comparisons |

### Learning loops

| Loop | Mechanism | Output |
|------|-----------|--------|
| Team to programme | FDE reports and metrics | Pattern identification |
| Programme to teams | Best practice sharing | Improved approaches |
| Programme to AI Engineering Lab repository | Documented learnings | Reusable knowledge |
| Programme to future phases | Evaluation report | Blueprint refinement |

### Success pattern capture

1. Identify the factors contributing to success.
2. Document the approach and context.
3. Assess transferability to other teams.
4. Add to AI Engineering Lab repository as recommended practice.
5. Share through champion network.

---

## Data quality and integrity

### Data quality principles

| Principle | Implementation |
|-----------|----------------|
| Accuracy | Validate data sources, cross-check anomalies |
| Completeness | Track coverage, address gaps |
| Timeliness | Define freshness requirements, monitor lag |
| Consistency | Use standard definitions, avoid ambiguity |

### Known data limitations

| Limitation | Impact | Mitigation |
|------------|--------|------------|
| Self-reported data | Potential bias | Triangulate with observed data |
| Tool analytics gaps | Incomplete picture | Supplement with surveys |
| Baseline variability | Comparison challenges | Document context |
| Attribution difficulty | Cannot isolate AI impact | Use control comparisons where possible |

### Data governance

| Requirement | Implementation |
|-------------|----------------|
| Privacy | Team-level aggregation minimum, no individual reporting |
| Security | Data classification official, secure storage |
| Retention | Retain for programme duration plus 2 years |
| Access | Role-based access to dashboards and data |

---

## Further reading

The [GDS service manual section on measuring success](https://www.gov.uk/service-manual/measuring-success) covers how to set performance metrics and define success criteria for government digital services.
