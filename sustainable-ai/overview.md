> ALPHA
> This is a new service. Your [feedback](https://github.com/govuk-digital-backbone/aiengineeringlab/discussions) will help us improve it.

# Sustainable AI overview

This document outlines DSIT's approach to sustainable AI. It addresses environmental impacts across the [three industry-standard greenhouse gas (GHG) protocol scopes](https://www.nationalgrid.com/stories/energy-explained/what-are-scope-1-2-3-carbon-emissions).

## Contents

[Environmental context](#environmental-context)

[Scope 1: direct emissions](#scope-1-direct-emissions)

[Scope 2: energy indirect emissions](#scope-2-energy-indirect-emissions)

[Scope 3: other indirect emissions](#scope-3-other-indirect-emissions)

[Programme-specific measures](#programme-specific-measures)

[Government policy alignment](#government-policy-alignment)

[Transparency and reporting](#transparency-and-reporting)

[Continuous improvement](#continuous-improvement)

[Conclusion](#conclusion)

[Futher reading](#futher-reading)

| Scope | Summary | Description |
|-------|---------|-------------|
| Scope 1 | Direct emissions | Emissions from sources owned or controlled by the organisation |
| Scope 2 | Energy indirect emissions | Emissions from purchased electricity, heating, and cooling |
| Scope 3 | Other indirect emissions | All other indirect emissions in the value chain, including cloud providers, software vendors, and end-user computing |

Understanding AI's environmental impact across these three scopes enables DSIT to make informed decisions. These decisions align with the UK government's net-zero commitments and [Technology Code of Practice Point 12](https://www.gov.uk/guidance/the-technology-code-of-practice#make-your-technology-sustainable), 'Make your technology sustainable'.

## Environmental context

AI systems, particularly large language models used in code assistants, consume significant computational resources. This includes:

- training large models generates substantial carbon emissions
- inference operations create ongoing energy demands that scale with adoption
- cumulative environmental impact as the programme enables hundreds of engineers across multiple departments, which requires careful consideration

## Scope 1: direct emissions

Scope 1 emissions are minimal as the programme does not operate data centres or physical AI infrastructure.

Engineer workstations consume energy. The programme should act to:

- encourage energy-efficient hardware procurement aligned with Government Buying Standards
- promote power management settings
- support responsible device lifecycle management

Facility operations should minimise emissions through:

- energy-efficient office equipment
- video conferencing to reduce travel
- alignment with departmental environmental policies

## Scope 2: energy indirect emissions

Scope 2 covers emissions from electricity consumed by programme operations and engineer devices.

Operational infrastructure for monitoring, reporting, and knowledge sharing should be:

- prioritised by cloud providers with renewable energy commitments
- selected by region powered by low carbon electricity grids
- right-sized for compute resources and shutdown when not in use

As adoption scales, aggregate electricity consumption increases. End-user computing actions should include:

- monitoring usage patterns
- encouraging efficient use
- providing guidance on tool configurations optimising performance per watt

## Scope 3: other indirect emissions

Scope 3 represents the largest emission category, encompassing the entire AI tool value chain.

### AI model training

Training emissions for models in GitHub Copilot, Amazon Q, Claude Code, and Gemini Code Assist are substantial. The programme influences these through:

- vendor selection prioritising carbon footprint disclosure
- favouring efficient models meeting functional requirements
- including sustainability criteria in procurement

### Cloud computing infrastructure

Most AI inference occurs in third-party clouds. Strategies include:

- selection of providers with net-zero targets
- deployment in regions with cleaner energy grids where security allows
- implementation of caching and batching to reduce redundant API calls

### Premium credit management

Sustainable credit management includes:

- monitoring consumption patterns
- setting usage guidelines balancing capability with environmental impact
- educating users on carbon implications of usage patterns

### Training and enablement

Programme training generates emissions from:

- field delivery engineer travel
- workshop facilities
- materials production

Mitigation includes:

- prioritisation of virtual delivery
- consolidation of in-person sessions
- use of digital-first repositories

### Supply chain

Hardware and software licences carry embedded carbon. The programme:

- applies whole-life costing incorporating carbon impact
- extends hardware lifecycles
- selects suppliers with environmental commitments

## Programme-specific measures

Measurement and monitoring should:

- track usage intensity (API calls, tokens, compute time)
- include carbon footprint in tool comparison analysis
- report department-level environmental impact
- define intervention triggers for unsustainable usage

Creating an AI Engineering Lab repository that includes:

- best practice for efficient AI tool usage
- prompt engineering techniques to reduce token consumption
- guidance on when to use AI versus traditional methods
- carbon awareness training for champions

The tool selection framework will:

- request vendor carbon disclosure as standard
- evaluate model efficiency (capability per compute unit)
- consider regional deployment for cleaner energy

Operational efficiency will:

- use asynchronous communication
- implement efficient data storage policies
- optimise monitoring systems
- consolidate tooling

## Government policy alignment

This approach aligns with:

- [Technology Code of Practice Point 12](https://www.gov.uk/guidance/the-technology-code-of-practice#make-your-technology-sustainable), sustainable planning, procurement and operations
- [Net Zero Strategy](https://www.gov.uk/government/publications/net-zero-strategy), contributing to 2050 carbon reduction commitments
- Government Buying Standards, prioritising energy efficiency in IT procurement
- Greening Government ICT Strategy, reducing ICT environmental impact

## Transparency and reporting

The programme commits to:

- including sustainability metrics in transparency reports
- requesting annual carbon updates from vendors
- contributing lessons to cross-government forums
- ensuring engineers understand environmental context

## Continuous improvement

The programme will:

- monitor emerging research on AI energy efficiency
- participate in industry working groups
- review sustainability measures quarterly
- incorporate user feedback on practical challenges

## Conclusion

As the AI Engineering Lab scales across UK government, environmental sustainability remains a core consideration. By addressing impacts across all three GHG protocol scopes, DSIT demonstrates responsible stewardship and alignment with net-zero commitments. Scope 1 covers direct emissions, scope 2 covers energy indirect emissions, and scope 3 covers value chain emissions.

The programme balances significant productivity benefits with environmental responsibility through informed procurement, efficient operations, transparent monitoring and continuous improvement. Technology transformation and environmental responsibility are complementary obligations. Government should lead by example in sustainable AI deployment.

## Futher reading
Read about [sustainable AI use](ai-use.md) for best practice on reducing environmental impact and the [carbon footprint of AI coding-assistants](carbon-footprint.md) for a comparison across toolsets. [Sustainable AI net benefit](net-benefit.md) considers societal and environmental net benefit over time.

For government guidance, see the [Environmental Reporting Guidelines](https://assets.publishing.service.gov.uk/media/67161e8696def6d27a4c9ab3/environmental-reporting-guidance-secr-march-2019.pdf) and the [Streamlined Energy and Carbon Reporting (SECR) framework](https://energy.drax.com/insights/streamlined-energy-and-carbon-reporting-framework/).
