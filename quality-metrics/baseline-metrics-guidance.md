> ALPHA
> This is a new service. Your [feedback](https://github.com/govuk-digital-backbone/aiengineeringlab/discussions) will help us to improve it.

# Baselining metrics before AI tool adoption

> A step-by-step guide to establishing your measurement baseline before introducing AI Engineering Lab tools. Use this to demonstrate the value of adoption with evidence.

---

## Contents

[Why baselining matters](#why-baselining-matters)

[When to baseline](#when-to-baseline)

[What to measure](#what-to-measure)

[Collection schedule](#collection-schedule)

[The baselining process](#the-baselining-process)

[Data collection methods](#data-collection-methods)

[Templates and tools](#templates-and-tools)

[When you cannot collect data](#when-you-cannot-collect-data)

[Starting to track mid-engagement](#starting-to-track-mid-engagement)

[Common mistakes](#common-mistakes)

[What happens after baselining](#what-happens-after-baselining)

[Further reading](#further-reading)

---

## Why baselining matters

Without a baseline, you cannot demonstrate improvement. This is the single most important principle in measurement.

When an engineer says "the tool saves me hours every week", that is a valuable signal - but it is not evidence. Evidence requires knowing what the before state looked like, measured in the same way as the after state.

Baselining serves three purposes.

1. Demonstrate value. 

Sponsors, senior responsible owners, and programme boards need to justify continued investment. A clear before-and-after comparison, for example, "lead time fell from 18 days to 12 days", is far more persuasive than an anecdote.

2. Enable early intervention. 

When you have a baseline, you can see when metrics are moving in the wrong direction. Without it, you cannot tell whether a rising defect rate is new or was always there.

3. Build the evidence base. 

AI Engineering Lab is building a reusable blueprint for the wider public sector. Teams that baseline well contribute to a shared understanding of what AI tools actually produce and under what conditions.

---

## When to baseline

Baselining should happen before AI Engineering Lab tools are introduced. Once engineers start using the tools, the pre-adoption signal is lost.

Follow these recommended timelines and actions when baselining. 

| Recommended timeline | Action |
|---------|-------------|
| Weeks -4 to -2 | Collect historical data (4 to 8 weeks back) |
| Weeks -2 to 0 | Run active baseline observation period |
| Week 0 | Tool introduction |
| Weeks 1+ | Ongoing measurement against baseline |


If your team has already started using AI Engineering Lab tools, do not skip baselining entirely. See [starting to track mid-engagement](#starting-to-track-mid-engagement) for a step-by-step approach to recovering a useful baseline and collecting consistently from this point forward.

---

## What to measure

Baseline measurement is organised across four tiers. You do not need to collect everything. We recommend starting with what is achievable, documenting what you cannot collect and why, and add more over time.

### Tier 1 baseline: delivery

These metrics tell you how fast work is moving through your pipeline. They are the foundation of your productivity story.

| Metric | What it measures | How to calculate | Where to find it |
|--------|-----------------|-----------------|-----------------|
| Sprint velocity | Story points completed per sprint | Completed story points per sprint | Jira velocity chart |
| Lead time for changes | Days from first commit to production | Days from first commit to production deployment | CI/CD platform or DORA dashboard |
| Cycle time | Days from work started to work done | Days from work started to PR merged | Git or Azure DevOps |
| Deployment frequency | How often code reaches production | Deployments per week or sprint | CI/CD platform |
| PR acceptance rate | AI suggestions accepted as a proportion of total | Accepted suggestions divided by total suggestions, multiplied by 100 | GitHub Copilot admin dashboard |
| Average time to merge PR | How long PRs sit open before merging | Total PR open hours divided by merged PRs | GitHub Insights or Azure DevOps |
| Time on routine tasks | Minutes spent on boilerplate, tests, docs | Self-reported estimate per task type | Task time log (see templates) |

The recommended minimum delivery metrics to collect are sprint velocity and lead time. 

---

### Tier 2 baseline: quality

These metrics tell you whether speed improvements later come at the cost of quality.

| Metric | What it measures | How to calculate | Where to find it |
|--------|-----------------|-----------------|-----------------|
| Defect rate | New bugs introduced per period | Count of new bug tickets | Jira filter or Azure Boards |
| Change failure rate | Failed deployments as a proportion of total | Failed deployments divided by total deployments, multiplied by 100 | CI/CD platform |
| Rework rate | PRs returned for significant revision | Returned PRs divided by total PRs, multiplied by 100 | GitHub or Azure DevOps |
| Security vulnerabilities | New security alerts by severity | Count of new critical, high, and medium alerts | Dependabot, Snyk, or SonarQube |
| Code coverage | Percentage of code covered by automated tests | Lines tested divided by total lines | CI/CD pipeline or SonarQube |
| Technical debt score | Accumulated code quality issues | SonarQube estimate and grade | SonarQube dashboard |

The recommended minimum quality metrics to collect are defect rate (even a rough count) and change failure rate.

---

### Tier 3 baseline: engineer experience

These metrics tell you how engineers feel about their work. They predict whether adoption will be sustained.

| Metric | What it measures | Why it matters |
|--------|-----------------|----------------|
| Overall satisfaction | How satisfied engineers are with their current tooling and workflow | Pre-adoption benchmark |
| Confidence level | How confident engineers feel in their work | Often increases with AI assistance |
| Time on frustrating tasks | Self-reported time lost to friction | Highlights where AI can help most |
| Specific pain points | Qualitative description of what is slow or hard | Gives you things to look for later |

The recommended minimum experience metric to collect is a short pre-adoption survey capturing satisfaction and the main pain points.

---

### Tier 4 baseline: business context

This contextual information is not strictly a metric, but it is essential for interpreting results later.

| Context factor | Why record it |
|----------------|-----------------|
| Team size and composition | Changes in team size affect almost every metric |
| Seniority mix | Junior-heavy teams may show larger productivity gains |
| Primary technology stack | Some languages and frameworks see greater AI benefit |
| Current project phase | New development vs maintenance shows different patterns |
| Planned team changes | Upcoming joiners, leavers, restructures |
| Upcoming major milestones | Releases, audits, or events that may skew metrics |
| Existing tooling | Understand what engineers currently use |

---

## Collection schedule

Collecting metrics consistently matters as much as collecting them at all. Irregular collection makes it harder to spot trends and easier to miss problems early.

| When | What to collect |
|------|----------------|
| Every Friday | PR acceptance rate, average time to merge PR, defect rate, rework rate, security vulnerabilities, code coverage, technical debt score |
| End of sprint | Time to delivery, cost per feature, sprint velocity |
| Monthly | Consolidate four weeks of data and review trends |

Use the [monthly metrics summary template](#monthly-metrics-summary-template) for the monthly consolidation.

---

## The baselining process

### Step 1: decide what you will measure

Before collecting anything, agree the metric set with your team and your FDE. Use the tables above to select metrics that are:

- achievable given your tooling and access
- meaningful for the work your team does
- sufficient to tell the value story later

Record your choices using the [metric selection record template](#metric-selection-record). Document any metrics you have chosen not to collect and why.

---

### Step 2: identify your data sources

For each metric you collect, confirm where the data will come from.

| Data source | Metrics available | Access required |
|-------------|------------------|-----------------|
| Git or GitHub or GitLab | Commit frequency, PR cycle time, lead time | API access or manual export |
| CI/CD platform | Deployment frequency, change failure rate | Dashboard or API access |
| Issue tracker (Jira and similar) | Velocity, defect density, rework rate | Report configuration |
| Code analysis tools (SonarQube) | Coverage, technical debt, security findings | Existing integration |
| Sprint ceremonies | Velocity (manually recorded) | Team participation |
| Engineer survey | Satisfaction, confidence, pain points | Survey tool or simple form |
| Direct observation | Time on task, workflow patterns | FDE pairing sessions |

If you cannot access a data source, record this as a measurement limitation and identify an alternative approach. See [when you cannot collect data](#when-you-cannot-collect-data).

---

### Step 3: collect historical data

Where possible, gather four to eight weeks of historical data. This gives you a more stable baseline than a single sprint and smooths out anomalies.

For each metric, record:

- the individual data points (not just an average)
- any known anomalies (for example, a sprint affected by bank holidays)
- the date range the data covers

You should treat the last two to four weeks before tool introduction as your primary baseline period, using earlier data as additional context.

---

### Step 4: run an active observation period

In the two weeks immediately before tool introduction, take a more deliberate snapshot. This is your most comparable baseline because it reflects the team in its current state, doing current work.

During this period:

- run the engineer pre-adoption survey
- record time estimates for common task types (see template below)
- note current friction points in a brief facilitated conversation or retro item
- confirm all automated data collection is working

This active observation period is also the right time to run your FDE's initial team assessment, which provides additional qualitative context.

---

### Step 5: document and store the baseline

Complete the [baseline record template](#baseline-record-template) and store it in the AI Engineering Lab facilitator evidence folder for your team.

Your baseline record should be:

- dated precisely
- signed off by the team lead or delivery manager
- stored alongside subsequent measurement reports so comparisons are easy

---

## Data collection methods

### Automated collection

Automated collection is more reliable and less burdensome than manual collection. Set it up before the baseline period begins.

#### Git analytics
Most Git platforms expose commit frequency, PR creation and merge times, and branch lifetimes via their APIs or built-in dashboards. GitHub Insights, GitLab Analytics, and similar tools can provide this without custom instrumentation.

#### CI/CD dashboards
Deployment frequency and change failure rate are often available from your pipeline tool. DORA-specific dashboards are available for common platforms including GitHub Actions, GitLab CI, and Jenkins.

#### Issue tracker reports
Sprint velocity, defect counts, and rework rates are typically available from standard reports in Jira, Azure DevOps, or similar tools. Configure the reports before the baseline period and export them regularly.

#### Code quality tools
If SonarQube or an equivalent is already integrated into your pipeline, export a snapshot at the start of the baseline period. Repeat this at regular intervals afterwards.

---

### Manual collection

Where automated collection is not possible, use structured manual methods.

#### Time-on-task sampling
Ask engineers to estimate time spent on specific task types during the baseline period. Use the task time log template below. This does not need to be exhaustive, so a sample of ten comparable tasks per task type is enough.

#### Sprint metrics summary
If your issue tracker does not produce clean reports, record the main numbers at each sprint review using the sprint summary template below.

#### Engineer pre-adoption survey
Run this in the week before tool introduction. Keep it short, between five to seven questions. Longer surveys reduce completion rates.

---

### Qualitative collection

Quantitative data tells you what changed. Qualitative data helps you understand why and whether the change matters to engineers.

#### Pain point mapping
Run a short session (fifteen to twenty minutes) where the team identifies their most time-consuming or frustrating tasks. Record these specifically, "writing unit tests for existing functions" is more useful than "testing". You will revisit this list when collecting value stories after adoption.

#### Task time estimates
For the same specific tasks, ask engineers to estimate roughly how long they currently take. Record a range rather than a single number. These estimates become the benchmark for your most concrete value stories.

#### Baseline sentiment
Note the team's general attitude towards AI tools before introduction. This matters for interpreting later satisfaction scores and for understanding whether changes in sentiment reflect the tool itself or prior expectations.

---

## Templates and tools

### Metric selection record

```markdown
## Metric selection record — [Team name]

Completed by: [Name and role]
Date: [Date]
FDE: [Name]

### Metrics we will collect

| Metric | Data source | Collection method | Owner |
|--------|-------------|------------------|-------|
| [Metric] | [Source] | [Automated / manual] | [Name] |

### Metrics we will not collect

| Metric | Reason not collected | Alternative approach |
|--------|---------------------|---------------------|
| [Metric] | [Reason] | [Alternative] |

### Known limitations

[Any factors that may affect the quality or completeness of baseline data]
```

---

### Baseline record template

```markdown
## Baseline metrics — [Team name]

Baseline period: [start date] to [end date]
Active observation period: [start date] to [end date]
Collected by: [Name]
Approved by: [Name and role]
Date approved: [Date]

---

### Team context

- team size: [X] engineers
- seniority mix: [X] junior, [X] mid, [X] senior
- primary technology stack: [stack]
- current project phase: [greenfield / modernisation / maintenance / mixed]
- planned changes in next 3 months: [team changes, major releases, or none known]
- current tooling: [IDEs, existing productivity tools]

---

### Delivery metrics

| Metric | Value | Notes |
|--------|-------|-------|
| Average sprint velocity | [X] story points | [Date range, number of sprints] |
| Average lead time for changes | [X] days | [Source] |
| Average cycle time | [X] days | [Source] |
| Deployment frequency | [X] per week or sprint | [Source] |
| Code commit frequency | [X] commits per engineer per day | [Source] |
| Average PR cycle time | [X] hours or days | [Source] |

---

### Quality metrics

| Metric | Value | Notes |
|--------|-------|-------|
| Defect rate | [X] new bugs per week or sprint | [Source, time period] |
| Change failure rate | [X]% | [Source, time period] |
| Rework rate | [X]% of PRs | [How measured] |
| Code coverage | [X]% | [Tool, date] |
| Security vulnerabilities | [X] per sprint | [Tool, classification] |
| Technical debt score | [X] | [Tool, date] |

---

### Engineer experience

| Metric | Value | Notes |
|--------|-------|-------|
| Overall satisfaction | [X]/10 | [Survey date, response rate] |
| Confidence level | [X]/10 | [Survey date, response rate] |
| NPS | [X] | [Survey date, response rate] |

---

### Task time estimates

| Task type | Estimated time | Range | Notes |
|-----------|---------------|-------|-------|
| Writing unit tests for an existing function | [X] minutes | [low–high] | |
| Understanding unfamiliar code | [X] minutes | [low–high] | |
| Writing boilerplate or scaffolding | [X] minutes | [low–high] | |
| Drafting PR descriptions | [X] minutes | [low–high] | |
| Code review (per PR) | [X] minutes | [low–high] | |
| [Team-specific task] | [X] minutes | [low–high] | |

---

### Pain points (pre-adoption)

Record the top three to five frustrations or time sinks identified by the team.

1. [Pain point - be specific]
2. [Pain point - be specific]
3. [Pain point - be specific]

---

### Baseline sentiment

[Brief note on team attitude to AI tools before introduction. Are they enthusiastic, sceptical, or neutral? Have they used similar tools before? Any specific concerns?]

---

### Measurement limitations

[Document anything that may affect the quality of this baseline, for example, incomplete data, team changes during the baseline period, unusual workload.]
```

---

### Engineer pre-adoption survey

Run this in the week before tool introduction. Aim for 100% completion.

```
AI Engineering Lab - pre-adoption survey

This short survey takes about 5 minutes. Responses are anonymous and will only
be used at team level to understand your starting point before the tools are
introduced.

1. How satisfied are you with your current development tooling and workflow?
   (1 = very dissatisfied, 10 = very satisfied)

2. How confident do you feel in your ability to deliver high-quality code
   efficiently?
   (1 = not confident, 10 = very confident)

3. Which of the following tasks currently take you more time than they should?
   (Select all that apply)
   [ ] Writing unit tests
   [ ] Understanding unfamiliar code or legacy systems
   [ ] Writing boilerplate or repetitive code
   [ ] Code reviews
   [ ] Writing documentation
   [ ] Debugging
   [ ] Researching how to do something
   [ ] Other: [specify]

4. Roughly how many hours per week do you spend on the tasks you selected above?
   [ ] Less than 2 hours
   [ ] 2 to 5 hours
   [ ] 5 to 10 hours
   [ ] More than 10 hours

5. How familiar are you with AI-assisted coding tools (like GitHub Copilot,
   Claude, or similar)?
   [ ] I use one regularly
   [ ] I have tried one briefly
   [ ] I have not used one

6. How do you feel about starting to use an AI coding assistant?
   [ ] Enthusiastic - I think it will help
   [ ] Open - I am willing to see how it goes
   [ ] Cautious - I have some concerns
   [ ] Sceptical - I am not sure it will help

7. What is your biggest concern about using AI coding tools, if any?
   [Free text - optional]

8. What would a successful outcome look like for you after 3 months?
   [Free text - optional]
```

---

### Task time log (for manual time-on-task sampling)

Ask engineers to complete this for a sample of tasks during the baseline period. You do not need this from every engineer for every task, a sample of ten comparable tasks is enough for each task type.

```markdown
## Task time log — [Engineer initials, not name]

Week: [Week beginning date]

| Date | Task type | Time taken (minutes) | Notes |
|------|-----------|---------------------|-------|
| | | | |
| | | | |

Task types to track (use consistent labels):
- unit-test-new - writing tests for new code
- unit-test-existing - writing tests for existing functions
- understand-code - reading and understanding unfamiliar code
- boilerplate - writing scaffolding or repetitive patterns
- pr-review - reviewing a pull request
- debug - finding and fixing a bug
- docs - writing comments or documentation
- research - looking up how to do something
```

---

### Sprint metrics summary (manual collection)

Use this if automated collection is not possible.

```markdown
## Sprint metrics summary - Sprint [number]

Team: [Team name]
Sprint dates: [start] to [end]
Completed by: [Name]

| Metric | Value |
|--------|-------|
| Story points planned | |
| Story points completed | |
| Stories completed | |
| Stories carried over | |
| Defects found in sprint | |
| Defects found in production | |
| PRs merged | |
| PRs requiring significant rework | |
| Deployments | |
| Failed deployments | |

Notes:
[Any context affecting this sprint, for example, holidays, incidents, scope changes]
```

---

### Monthly metrics summary template

Complete this at the end of each month. Share it with your delivery manager and programme team.

```markdown
## Monthly metrics summary — [Month Year]

Team: [Team name]
Completed by: [Name]
Date: [Date]

### Weekly metrics - four-week summary

| Metric | Week 1 | Week 2 | Week 3 | Week 4 | Monthly average | Trend |
|--------|--------|--------|--------|--------|----------------|-------|
| PR acceptance rate | | | | | | improving / stable / declining |
| Average time to merge PR | | | | | | improving / stable / declining |
| Defect rate | | | | | | improving / stable / declining |
| Rework rate | | | | | | improving / stable / declining |
| Security vulnerabilities | | | | | | improving / stable / declining |
| Code coverage | | | | | | improving / stable / declining |
| Technical debt score | | | | | | improving / stable / declining |

### Sprint metrics - this month

| Metric | Sprint 1 | Sprint 2 | Notes |
|--------|----------|----------|-------|
| Time to delivery | | | |
| Cost per feature | | | |
| Sprint velocity | | | |

### Observations

[What do the trends tell you? Are any metrics moving in the wrong direction? What is improving?]

### Actions

| Observation | Action | Owner | By when |
|-------------|--------|-------|---------|
| | | | |
```

---

## When you cannot collect data

It will not always be possible to collect every metric. This is normal. The priority is to collect what you can, document what you cannot, and use alternative approaches where available.

### No access to tool analytics or Git data

If you cannot access automated data sources, use self-reported approaches.

Conduct brief check-ins at sprint ceremonies where team members estimate how long specific tasks took. This is less precise than automated data but still creates a meaningful before-and-after signal.

Use the task time log template above to capture a sample of manual time recordings during the baseline period.

### No historical data

If there is no historical data to draw on (for example, it's a new team or new project), start your baseline now. Treat the first two weeks as your pre-tool measurement period before introducing AI Engineering Lab tools.

Alternatively, use a qualitative baseline. Document the team's current pain points, time estimates, and sentiment in detail. These can be revisited after adoption to demonstrate change even without hard numbers.

### No survey tool

If you cannot run a formal survey, use retrospectives. Add a standing item to the sprint retro covering current tooling and workflow. Record the discussion notes. This creates a qualitative baseline that can be compared to later retro discussions.

You can also gather informal feedback during pairing sessions or one-to-ones. Document these conversations briefly and date them.

### Limited time

If the team cannot commit time to baselining, concentrate on the absolute minimum: sprint velocity and a three-question pulse survey. Sprint velocity is one number, available from any sprint review.

```
Minimum viable baseline survey (3 questions):

1. How satisfied are you with your current workflow? (1 to 10)

2. Which task currently takes you most time that you wish was faster?
   [Free text]

3. Roughly how long does that task take you right now?
   [Free text]
```

---

## Starting to track mid-engagement

If your engagement has already started before you have set up metric collection, do not wait for the next cycle to begin. Starting late is better than not starting at all.

### Step 1: recover what you can from existing sources

You cannot recreate precise historical data, but you can recover a useful approximate baseline. Identify what is already available before the engagement started or in its earliest weeks.

| Data source | What to extract |
|-------------|----------------|
| GitHub or Azure DevOps | PR history - open and close dates for the past four weeks |
| Jira or Azure Boards | Bug tickets opened in the past four weeks, sprint velocity from the last two sprints |
| SonarQube | Current technical debt score and code coverage percentage |
| CI/CD pipeline | Latest code coverage report |
| Finance system | Sprint cost for the last completed sprint |

Record these figures as your starting point. Label them clearly as "approximate baseline from [date range]" so anyone reading the data later understands the context.

### Step 2: begin collecting weekly metrics

Use the standard [collection schedule](#collection-schedule) to begin collecting weekly metrics. Do not try to backfill weekly data in detail. Use your approximate baseline as the pre-engagement reference. 

### Step 3: capture a qualitative snapshot now

Numbers you cannot recover can often be replaced by qualitative evidence. You should record:

- the team's own estimate of how long common tasks take (test writing, code review, debugging)
- the main pain points the team identified at the start of the engagement
- any performance concerns the delivery manager raised early on

Even rough estimates are useful. They give you something to compare against when you collect value stories later.

### Step 4: be transparent about the gap

When you share metrics, be clear that collection started mid-engagement and that the baseline is approximate. 

A brief note in your monthly summary is enough:

```markdown
Note: metric collection began on [date], approximately [X] weeks into the engagement.
Figures prior to this date are estimated from historical data.
Trends are reliable from [start date] onwards.
```

### What to prioritise if time is short

If you can only collect a subset of metrics when starting mid-engagement, these are the priority metrics.

1. Sprint velocity - available immediately from any sprint review.
2. Defect rate - available from your issue tracker right now.
3. PR acceptance rate - available from the Copilot admin dashboard.
4. Code coverage - available from the latest pipeline run.
5. Engineer satisfaction - run the three-question pulse survey this week.

These 5 metrics give you coverage across delivery, quality, and adoption. Add the remaining metrics as your collection process develops.

---

## Common mistakes

### Starting too late

The most common baselining failure is beginning after tools have already been introduced. Once engineers start using AI Engineering Lab tools, you have lost your clean baseline. Where possible, build baselining into the timeline before tools are introduced.

### Averaging without context

A single average figure hides variation. Record the range and individual data points where possible, and note any anomalies that affected specific sprints or periods.

### Measuring the wrong things

Lines of code, number of commits, and similar output measures are easy to collect but easy to game and often misleading. Concentrate on outcomes, for example how fast the work moved, how many defects appeared, or how satisfied the engineers were. 

### Collecting data but not storing it

Baseline data must be findable. Store it in a consistent location that your forward deployed engineer (FDE), delivery manager, and programme team can all access. The facilitator evidence folder is the right place.

### Skipping qualitative data

Numbers tell you what changed. Qualitative data tells you why and whether it mattered. The pre-adoption survey, pain point mapping, and baseline sentiment are as important as the quantitative metrics.

### Not documenting limitations

Every baseline has gaps. If you document them honestly, stakeholders can interpret results appropriately. If you do not, gaps will surface later.

### Comparing teams rather than baselines

Always compare a team's post-adoption metrics to its own baseline, not to another team. Teams differ in size, maturity, technology, and type of work. Cross-team comparisons require careful controls that are rarely feasible in practice.

---

## What happens after baselining

Once your baseline is established and tools are introduced, measurement continues against it.

#### Weeks 1 to 4 (adoption phase)
Concentrate on leading indicators. For example:
- are licences activated?
- are engineers using the tools daily?
- are they attending training?

These tell you whether adoption is on track before productivity effects are visible.

#### Weeks 4 to 12 (productivity phase)
Begin comparing delivery and quality metrics to your baseline. Early signs of change typically appear in commit frequency, PR cycle time, and self-reported task times. Continue running the engineer satisfaction survey monthly.

#### Month 3 onwards (outcome phase)
Compare all metrics to baseline. At this point you should be able to tell a clear story about what changed, by how much, and with what effect on quality. This is also when business outcome metrics (lead time, deployment frequency, cost per feature) become meaningful.

#### Capturing value stories
When you see a specific improvement, document it as a value story immediately. The baseline gives you the "before", you need to record the "after" while it is fresh. A complete value story includes three things:
- what the team was doing before
- what changed with AI Engineering Lab tools
- what the specific result was in concrete terms

---

## Further reading

[Measurement playbook](measurement-playbook.md) includes  full implementation guidance including dashboard setup, reporting templates, and analysis approaches.

[Quality strategy](quality-strategy.md)  includes the programme-level measurement framework and success criteria.

[DORA four keys](https://dora.dev/guides/dora-metrics-four-keys/) includes background on lead time, deployment frequency, change failure rate, and time to restore.

[Accelerate](https://itrevolution.com/product/accelerate/) by Forsgren, Humble and Kim is the research underpinning DORA metrics.

[GDS service manual: measuring success](https://www.gov.uk/service-manual/measuring-success) includes government guidance on defining and measuring performance.
