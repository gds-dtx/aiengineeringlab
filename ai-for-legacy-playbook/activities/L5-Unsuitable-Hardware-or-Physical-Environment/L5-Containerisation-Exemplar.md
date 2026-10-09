# Activity: Create containerisation exemplar (L5)
Version: 0.1  
Owner: <assign>  
Date: <dd MMM yyyy>


| Field | Value |
|---|---|
| **Timebox** | 2-3h |
| **Phase** | Execute (Week 3) |
| **Inputs** | Repository, Dockerfiles, architecture summary |
| **Key output** | Containerised exemplar + lessons learned |
| **Hub activity** | No |

---

## 1) Why this activity (value and decision)
Before committing to a containerisation migration path, the team needs evidence that the target component can actually run in a container. Configuration issues, undocumented host dependencies, file-system assumptions, and network quirks often surface only when someone tries to build and run the image.

This activity creates a working containerised exemplar for one component: a Dockerfile, a minimal orchestration config (Helm chart, docker-compose, or equivalent), and a successful local or test-environment run. The goal is proof of concept, not production readiness.

Decision enabled: confirm containerisation is viable for this component; identify blockers to address before wider rollout. This feeds directly into L5-Dockerfiles-Helm-Charts (production-grade artefacts) and L5-Evaluate-Feasibility-Risk.

Note: this activity creates a first working container to prove feasibility. For production-grade Dockerfiles and Helm charts across components, see L5-Dockerfiles-Helm-Charts.


---

## 2) What we will do (scope and steps)
Description: Create a Dockerfile and a minimal chart for one component and validate run.

Sub tasks:
1. Select the component to containerise. Choose based on: (a) simplest standalone component (to maximise chance of success), or (b) highest-value component identified in the Migration Options (L5) or Migration Readiness Assessment (L5).
2. Audit the component's runtime dependencies: language runtime version, system packages, configuration files, environment variables, file-system paths, network ports, database connections. Use the AI assistant to scan the code and config for these.
3. Use the AI to generate a Dockerfile: (a) select an appropriate base image, (b) install dependencies, (c) copy application code, (d) configure entrypoint and health check. Follow container best practices (non-root user, minimal layers, no secrets in the image).
4. Use the AI to generate a minimal orchestration config: Helm chart, docker-compose file, or Kubernetes manifest depending on the target platform.
5. Build the image locally and resolve any build errors. Record each error and resolution.
6. Run the container locally or in a test environment. Verify the application starts, serves requests (if applicable), and connects to required backends (use mock or test instances if production backends are unavailable).
7. Document: (a) what worked, (b) what blockers were encountered, (c) what host dependencies or configuration changes were required, (d) any security concerns (exposed ports, mounted volumes, credentials handling).
8. Log time spent (start/end timestamps) for P1 measurement.

> **Sequencing:** benefits from Migration Readiness Assessment (L5) or Generate Migration Options (L5) for context. Outputs feed into Dockerfiles-Helm-Charts (L5) and Evaluate Feasibility-Risk (L5). Schedule in Week 2-3.

> **Out of scope:**
> - Full environment rollout to production.
> - Containerising multiple components (this is a single-component exemplar).
> - CI/CD pipeline integration for the container (see L4-Enhance-CI-CD).

---

## 3) How AI is used (options and modes)
- **Analyse and reason:** scan the application code and configuration to identify runtime dependencies, file-system assumptions, and environment variable requirements.
- **Generate:** produce a Dockerfile, docker-compose or Helm chart, and health check configuration tailored to the component.
- **Automate and orchestrate:** diagnose build and runtime errors from container logs, propose fixes.
- **Human in the loop:** the engineer validates the generated Dockerfile for security best practices (non-root user, no secrets in image), tests the container run, and reviews the blockers log.


---

## 4) Preconditions, access and governance
- Read access to the target repository.
- Docker (or equivalent container runtime) installed locally or in a test environment.
- Access to a container registry if pushing images (or local-only build is acceptable for the exemplar).
- Test or mock instances of required backends (databases, APIs) available.
- Named reviewer (Solution Architect or Tech Lead) available.
- ATRS trigger: Possibly, if deploying to a shared or cloud environment. DPIA check: confirm the container does not embed personal data or credentials.


---

## 5) Tooling categories and examples
Use department-approved tools. Names below are illustrative examples only.

| Category | Examples | Notes |
|---|---|---|
| Container runtime | Docker, Podman, containerd |  |
| Orchestration (minimal) | docker-compose, Helm, raw Kubernetes manifests |  |
| Code assistants (for Dockerfile/chart generation) | GitHub Copilot, Sourcegraph Cody, Cursor |  |
| Container scanning (optional for exemplar) | Trivy, Snyk Container, Docker Scout |  |
| Not typically needed | SCA/SBOM tools (unless auditing base image), log analytics tools, document analysis tools |  |


---

## 6) Timebox
Suggested: 2h for Dockerfile generation, build, and initial run; 1h for troubleshooting and documentation. Total: 3h. Schedule in Week 2-3.

Expandability: this activity can be repeated per component. Each additional component adds approximately 3h.

---

## 7) Inputs and data sources
- Target repository (source code, configuration files, dependency manifest).
- Architecture Summary (from L3, if available) for understanding the component's dependencies and integrations.
- Migration Options or Migration Readiness Assessment (from L5, if available) for component selection context.
- If unavailable: if no architecture summary exists, the AI will analyse the code directly to identify dependencies. Budget additional time for troubleshooting.


---

## 8) Outputs and artefacts
- Working Dockerfile for the selected component.
- Minimal orchestration config (docker-compose, Helm chart, or Kubernetes manifest).
- Exemplar run log: build output, runtime verification, and any errors encountered with resolutions.
- Blockers and findings document: host dependencies, configuration changes, security concerns, and unresolved issues.
- Time log entry for P1.

Audience: Solution Architect, Tech Lead, engineers planning the migration. Findings feed into the Feasibility and Risk assessment (L5).


---

## 9) Metrics and measurement plan (map to P1-P8)

| Metric | Measurement approach |
|---|---|
| **P1 Task Time delta** | record time to create a working containerised exemplar with AI assistance. Compare against estimate for manual Dockerfile authoring and troubleshooting |
| **P2 Quality score** | reviewer rates the Dockerfile and orchestration config on the 1-5 rubric for correctness (it runs), security (best practices followed), and maintainability |
| **P8 Reusable artefacts** | count the Dockerfile, orchestration config, dependency audit checklist, and any prompt templates |


Secondary:
- **P3 Developer sentiment**: include in the post-pilot SPACE survey.
- **P7 Vulnerability/risk reduction**: if a container scan is run, record findings.

---

## 10) Risks and controls

| Risk | Mitigation |
|---|---|
| **Undocumented host dependencies**: the application may rely on system packages, file paths, or network configurations not visible in the code | use the AI to scan for system calls and file-system references; document each dependency discovered during the build |
| **Secrets embedded in the image**: credentials or API keys may be copied into the Docker image | use environment variables or secrets management; never copy .env files or credential stores into the image |
| **Build succeeds but application fails at runtime**: the container may build but crash when trying to connect to backends or read configuration | test the full runtime (not just the build); use mock backends if production backends are unavailable |
| **Scope creep into production readiness**: the exemplar may expand into full hardening and deployment | frame this explicitly as a proof of concept. Production-grade work is handled in L5-Dockerfiles-Helm-Charts |


---

## 11) Review and definition of done
Done when all of the following are true:
- [ ] Container image builds successfully.
- [ ] Application starts and responds to basic verification (health check, sample request, or equivalent).
- [ ] Blockers and findings are documented.
- [ ] Dockerfile and orchestration config are committed to a feature branch.
- [ ] Solution Architect or Tech Lead has reviewed.
- [ ] Time log entry is recorded for P1.
- [ ] Evidence Log and Evaluation Scorecard are updated.


---

## 12) Playbook contribution
- **Where AI helped**: speed of Dockerfile generation, dependency discovery, and build error diagnosis.
- **Prerequisites to document**: container runtime availability, backend mock availability, repository access.
- **Limits and risks to document**: undocumented dependencies, secrets handling, runtime failures not caught at build time.
- **Reusable assets**: Dockerfile template, dependency audit checklist, troubleshooting log format.

- **Department continuation**: containerise additional components using the Dockerfile pattern and dependency audit checklist from the exemplar.

Pattern candidates:
- **"Dependency-audit-first containerisation"**: scanning the application for host dependencies before writing the Dockerfile avoids the trial-and-error cycle of repeated build failures.
- **"Minimal orchestration for proof of concept"**: using docker-compose for local testing before graduating to Helm charts reduces complexity during the exemplar phase.

Anti-pattern candidates:
- **"Production hardening during proof of concept"**: spending time on multi-stage builds, image size optimisation, and Kubernetes resource limits during the exemplar phase delays the feasibility answer. Do the minimum needed to prove the concept runs.
- **"Skipping runtime verification"**: a successful build does not mean the application works. Always verify at runtime.
- Reusable assets: prompts, templates, patterns for the library.