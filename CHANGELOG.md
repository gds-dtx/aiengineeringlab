# Changelog

All notable changes to this project will be documented in this file.

## [0.1.5] - 2026-07-31

### Added
- Claude Opus 5 model section in model selection playbook with capability, pricing, alignment, cybersecurity constraints, and use-case guidance
- Claude Sonnet 5 model notes and reference links in model selection playbook
- Claude Opus 5 listed in GitHub Enterprise AI controls as available but policy not set
- Claude Sonnet 5 added to Copilot agent mode auto model selection candidates
- Claude Opus 5 and Sonnet 5 added to Copilot agent mode and CLI billing cost tables
- Tokenizer migration note for Claude Sonnet 5 in constrained context windows playbook

### Updated
- Model selection playbook to recommend Claude Sonnet 5 and Opus 5 as default general-purpose and frontier models, replacing Sonnet 4.6 and Opus 4.5/4.6 references throughout
- Claude Code manager guide model table and task recommendations updated to Opus 5, Opus 4.8, Sonnet 5, and Haiku 4.5
- Comparative guidance context window figures for Claude Code updated from 200,000 tokens to up to 1,000,000 tokens (2,000,000 in beta)
- Comparative guidance model lists updated to reflect current GitHub Copilot and Claude Code availability including Opus 5 and Sonnet 5
- Claude Code setup guide default Opus model updated to claude-opus-4-8 with forward-looking Sonnet 5 migration note
- Claude Code customisation guide dynamic workflows section updated to include Opus 5 alongside Opus 4.8
- Token cost management playbook updated to reference Opus 5 and Sonnet 5
- GitHub Enterprise AI controls page restructured with clickable anchor table of contents and blockquote callout formatting


## [0.1.4] - 2026-07-23

### Refactored
- The AI Engineering Lab url link to match the most up-to-date state across entire repo


## [0.1.3] - 2026-07-20

### Added
- Defra GitHub Copilot configuration examples links in the getting started, advanced use, customisation, and licence type guides to support governed public sector setup patterns


### Updated
- GitHub Copilot manager and user guides to align billing guidance with usage-based AI Credits and token-based charging terminology
- Agent mode billing guide to emphasise lower-cost model selection, current auto model selection caveats, and revised cost-behaviour examples
- Copilot CLI billing guide to clarify autopilot continuation cost behaviour and replace fixed multiplier examples with relative cost guidance
- Pull request capabilities guide to reflect AI Credits and GitHub Actions minutes usage for code review and coding agent workflows
- Premium credit management guide reframed as historical reference for the pre-1 June 2026 premium request system
- Comparative guidance and GitHub Copilot index pages updated to reflect current model and pricing language and references


## [0.1.2] - 2026-07-06

### Added
- MCP Servers section including introduction, best practices, server design and architecture guide, industry implementation examples, and partner examples
- GitHub Copilot guide for checking your licence type
- GitHub Copilot pull request capabilities guide
- GitHub Copilot content exclusions guide
- Token cost management playbook
- Claude Code guide on evaluating AI agents
- MCP signpost link added to repository README

### Updated
- Model selection playbook with latest guidance on Anthropic and Google model families
- Context engineering playbook
- Prompt engineering AI roles guide
- Working with constrained context windows playbook
- AI code assistant instructions playbook
- Team classification guide in assessment framework
- GitHub Enterprise AI controls governance documentation
- Secure by design AI evidence documentation
- Comparative guidance for manager tool guides
- GitHub Copilot manager tool guide and usage guide
- Claude Code user guides including setup guide and customisation guide
- GitHub Copilot user guides including getting started, advanced use, customisation, agent mode billing, CLI billing, premium credit management, and safe usage guidance
- Quality assurance README

## [0.1.1] - 2026-05-29

### Added
- updated model selection guide with guidance on Claude Opus 4.8, 4.7 and Sonnet 4.6
- information about Claude Mythos Preview and Project Glasswing
- dynamic workflows feature documentation in Claude Code customisation guide
- effort control feature documentation for managing token usage and response quality
- Messages API system entries feature for mid-task instruction updates
- Information to reflect billing changes introduced by Microsoft for Copilot effective 1 June 2026
- Guidance for token cost management
- Guidance for file exclusions in Copilot
- Improved documentation for junior developers
- Signposting to guidance on using evals in Claude Code

## [0.1.0] - 2026-04-29

### Added
- consolidated and updated comparative guidance documentation
- guidance on baselining for departments
- Amazon Kiro setup guide

## [0.0.9] - 2026-04-13

### Added

- configuration of AI tooling for GitHub Enterprise repository
- quality assurance guidance
- guidance on integrating AI code assistant into SDLC
- Claude Code setup guide

## [0.0.8] - 2026-03-26

### Added

- GDS style guides for Claude
- updating procurement section for Claude
- do/don't document (Copilot Usage Guide)

## [0.0.7] - 2026-03-20

### Added

- source reference to GH manager tool guide
- content GH premium request management for agent mode

## [0.0.6] - 2026-03-13

### Added
- guidance on using AI to help with infrastructure as code (IaC) transformations
- guidance on managing context window limitations when using AI for code generation
- best practices for legacy code modernisation with AI

## [0.0.5] - 2026-03-06

### Added
- Claude Code manager tool guide
- latest model capabilities to Copilot manager tool guide
- links to free training courses for Claude provided by Anthropic

### Fixed
- update Gemini manager tool guides to reference project credentials

## [0.0.4] - 2026-02-20

### Added
- vendor security requirements
- creating secure by design AI
- risk alignment framework
- non-deterministic code generation
- model assurance and transparency
- Copilot premium credit management

### Fixed
- GDS styling fixes

## [0.0.3] - 2026-02-13

### Added
- base guardrails
- security policies
- threat modelling
- safe usage policies
- Claude Code user tool guide
- updated Copilot and Gemini user guides
- manager tool guides for Amazon Q and Amazon Kiro

### Fixed
- updated repository structure and navigation

## [0.0.2] - 2026-02-04

Initial content release.