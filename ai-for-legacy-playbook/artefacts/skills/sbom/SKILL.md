---
name: sbom-generation
description: "Generate environment-agnostic SBOMs for any repository by scoping to repository/build artifacts, preventing host-machine contamination, and producing deterministic CycloneDX output."
argument-hint: "repository path and optional module scope"
---

# sbom-generation

## Purpose
Generate a standards-compliant SBOM that represents the application build inputs and deliverables, not the analyst workstation.

Primary default output:
- `sbom.cyclonedx.json`

Default derived outputs:
- `sbom/derived/eol-oos-summary.json`
- `sbom/derived/l6-triage-feed.json`
- `sbom/derived/l1-upgrade-plan-feed.json`

Optional module output:
- `sbom.<module>.cyclonedx.json`

## Supported Inputs
- Repository root path
- Optional module path(s)
- Dependency manifests and lockfiles (`package.json`, `package-lock.json`, `project.clj`, `Gemfile.lock`, etc.)
- Container build definitions (`Dockerfile`) and container image references used by the build
- Existing build artifacts when already available

Do not require a specific build platform (Windows, Linux, macOS). The analysis must be build-platform agnostic.

## Default Strategy
1. Discover ecosystem manifests and lockfiles in the repository only.
2. Choose the narrowest reliable SBOM command path first.
3. Prefer manifest-driven generation over broad filesystem inventory.
4. Validate output for contamination and suspicious component classes.
5. If contamination is detected, regenerate with stricter scoping.
6. Generate derived planning artifacts from the SBOM for lifecycle and delivery workflows without requiring repository-shipped scripts.

## Derived Artifact Generation (No Repo Script Requirement)
Generate derived outputs directly from the generated SBOM as part of the skill workflow. Do not require checked-in helper scripts.

Required derived artifacts:
- `sbom/derived/eol-oos-summary.json`
- `sbom/derived/l6-triage-feed.json`
- `sbom/derived/l1-upgrade-plan-feed.json`

Lifecycle method:
- Identify out-of-support and EOL findings using ecosystem metadata that is available at execution time.
- At minimum, include npm deprecation metadata when npm components are present.
- Record method and caveats in the summary output.

Execution preference on Windows:
1. Git Bash (preferred)
2. Python (if available)
3. Node (if available)
4. PowerShell (fallback)

Execution preference on Linux/macOS:
1. Bash shell
2. Python (if available)
3. Node (if available)

Fallback behavior:
- If a preferred runtime is missing, try the next runtime.
- If no suitable runtime is available for derivation, still return a valid SBOM and report that derived outputs were skipped with reasons.

## Environment-Agnostic Guardrails
Always enforce these rules unless the user explicitly requests host inventory.

- Restrict scan root to the repository path.
- Reject or ignore dependency evidence from user-profile and machine-local paths, including:
  - `AppData`
  - `~/Library`
  - `~/.config`
  - `~/.cache`
  - Browser profile directories
  - IDE extension folders
- Never treat local browser extensions, OS apps, or editor plugins as application dependencies.
- Treat host-only artifacts as noise and report them as excluded.
- Avoid broad scan modes that are likely to include host environment data.

## Command Selection Logic
Use this precedence and keep commands reproducible.

1. `cdxgen` (preferred for manifest fidelity)
- Use for repository-scoped manifest/lockfile extraction.
- Avoid broad universal scans when they risk host contamination.
- Pin tool version when invoked via `npx`.

Example default:
```bash
npx -y @cyclonedx/cdxgen@12.3.3 -o sbom.cyclonedx.json .
```

2. `syft` (fallback or supplement)
- Use repository path or image reference, not host home directories.

Example:
```bash
syft dir:. -o cyclonedx-json=sbom.cyclonedx.json
```

3. `trivy` (fallback or verification)
- Use filesystem scope rooted at repository path or explicit container image.

Example:
```bash
trivy fs --format cyclonedx --output sbom.cyclonedx.json .
```

Tool checks:
- Check executable availability first.
- If a preferred tool is unavailable, fall back and document limitations.
- Do not fail solely due to one missing optional tool.

Determinism rules:
- Pin tool versions where possible.
- Avoid mutating dependency state in-repo unless required.
- If temporary artifacts are created (`node_modules`, lockfiles), remove them unless user asks to keep them.

## Validation and Sanity Checks
After SBOM generation, perform checks before accepting output.

Required checks:
- SBOM parses as valid JSON and includes CycloneDX metadata.
- Component inventory is non-empty (unless repo genuinely has no dependencies).
- Flag unexpected component types for server/container apps (for example `chrome-extension`) as likely noise.
- Flag absolute host paths as likely contamination (for example `C:\Users\...`, `/Users/...`, `/home/...` outside repo scope).

If contamination is found:
1. Report findings succinctly.
2. Regenerate with stricter repository-only scanning.
3. Re-run validation checks.

## Output Contract
Always provide:
- Artifact path(s)
- Format and spec version
- Total component count
- Ecosystems detected
- Exclusions and caveats
- Reproducible command(s) used

When derived artifacts are generated, also provide:
- Out-of-support and EOL count with method used
- L6 triage item count and artifact path
- L1 upgrade-plan item count and artifact path
- Any ecosystem caveats for lifecycle coverage

Standard artifact names:
- `sbom.cyclonedx.json` (default)
- `sbom.<module>.cyclonedx.json` (optional per module)
- `sbom/derived/eol-oos-summary.json` (default derived)
- `sbom/derived/l6-triage-feed.json` (default derived)
- `sbom/derived/l1-upgrade-plan-feed.json` (default derived)

Optional additional format:
- SPDX JSON when requested by user

Derived output schema guidance:
- `eol-oos-summary.json` should include generation time, source SBOM path, ecosystem counts, EOL/OOS counts, method used, and caveats.
- `l6-triage-feed.json` should include a top-level `items` array with queue-ready findings.
- `l1-upgrade-plan-feed.json` should include a top-level `items` array grouped by component/package with target version guidance where available.

## Failure Handling
- Continue with fallbacks when one tool fails.
- Fail only when no valid SBOM can be produced.
- On partial coverage, return a valid SBOM plus explicit limitations.
- Record per-tool status: `used`, `skipped-missing`, or `failed`.

## Examples

Environment-agnostic repository default:
```bash
npx -y @cyclonedx/cdxgen@12.3.3 -o sbom.cyclonedx.json .
```

Generate default derived artifacts inline:
- Parse SBOM JSON directly in the selected runtime.
- Derive EOL/OOS findings from available ecosystem metadata (for example npm deprecation metadata).
- Emit `sbom/derived/eol-oos-summary.json`, `sbom/derived/l6-triage-feed.json`, and `sbom/derived/l1-upgrade-plan-feed.json`.

Per-module output:
```bash
npx -y @cyclonedx/cdxgen@12.3.3 -o sbom.hubadapter.cyclonedx.json hubadapter
npx -y @cyclonedx/cdxgen@12.3.3 -o sbom.mep.cyclonedx.json mep
```

Container-focused fallback:
```bash
syft dir:. -o cyclonedx-json=sbom.cyclonedx.json
```

Validation spot checks:
```bash
grep -nE "AppData|/Users/|/home/|chrome-extension" sbom.cyclonedx.json
node -e "const b=require('./sbom.cyclonedx.json');console.log(b.bomFormat,b.specVersion,(b.components||[]).length)"
```

Acceptance expectations:
- Same repository and commit should produce materially equivalent inventories across Windows/Linux/macOS (ignoring timestamp and serial fields).
- Final SBOM should not include host-user-profile path evidence by default.
- Any unavoidable non-determinism must be explained with mitigation advice.
- Derived outputs should include explicit counts for EOL/OOS findings and machine-readable feeds for L6/L1 workflow ingestion.
- Derived output generation must not depend on repository-shipped helper scripts.
