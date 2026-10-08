# Activity: Produce Dockerfiles or Helm charts (L5)
Version: 0.1  
Owner: <assign>  
Date: <dd MMM yyyy>


| Field | Value |
|---|---|
| **Timebox** | Half a day |
| **Phase** | Execute (Week 3) |
| **Inputs** | Repository, SBOM, architecture summary |
| **Key output** | Dockerfiles and/or Helm charts |
| **Hub activity** | No |

---

## 1) Why this activity (value and decision)
Once the containerisation exemplar (L5-Containerisation-Exemplar) confirms that a component can run in a container, the next step is producing production-grade build and deployment artefacts. Quick proof-of-concept Dockerfiles often skip security hardening, multi-stage builds, image size optimisation, and parameterised Helm charts.

This activity takes the exemplar as a starting point and produces Dockerfiles and (where applicable) Helm charts or deployment manifests that follow departmental and industry best practices, ready for CI/CD integration and deployment.

Decision enabled: confirm the artefacts are ready for pipeline integration; decide whether to proceed with deploying the containerised component.

Note: for the initial proof of concept, see L5-Containerisation-Exemplar. This activity builds production-grade artefacts.


---

## 2) What we will do (scope and steps)
Description: Produce Dockerfiles or charts for the scoped component.

Sub tasks:
1. Start from the exemplar Dockerfile (from L5-Containerisation-Exemplar, if available). If no exemplar exists, begin from the component's runtime requirements.
2. Harden the Dockerfile: (a) use multi-stage builds to reduce image size, (b) run as a non-root user, (c) pin base image versions, (d) remove build tools and unnecessary packages from the final stage, (e) add a health check instruction, (f) do not embed secrets or credentials.
3. Use the AI assistant to review the Dockerfile for common anti-patterns and suggest improvements.
4. Build and verify: build the image, check the final image size, and verify the application runs correctly.
5. If Helm charts are required: use the AI to generate a chart with parameterised values (image tag, replica count, resource limits, environment variables, secrets references). Include liveness and readiness probes.
6. Run static checks on the Helm chart: helm lint, kubeval, or equivalent. Fix any issues.
7. Validate the deployment: deploy to a test or staging namespace and verify the application starts, serves requests, and passes health checks.
8. Open a PR with the production-grade Dockerfile and Helm chart (or equivalent manifests). Include a README documenting build and deploy instructions.
9. Log time spent (start/end timestamps) for P1 measurement.

> **Sequencing:** runs after the Containerisation Exemplar (L5). Outputs feed into CI/CD enhancement (L4) and IaC Patterns (L5). Schedule in Week 3-4.

> **Out of scope:**
> - Full Helm release process redesign.
> - Deploying to production.
> - Managing a container registry.

---

## 3) How AI is used (options and modes)
- **Generate:** produce production-grade Dockerfiles with multi-stage builds, Helm charts with parameterised values, and deployment manifests.
- **Analyse and reason:** review existing Dockerfiles for anti-patterns (running as root, large image size, embedded secrets, unpinned base images) and suggest improvements.
- **Automate and orchestrate:** diagnose build and deployment errors; run static checks and propose fixes.
- **Human in the loop:** the engineer validates security practices, tests deployments, and the Solution Architect reviews the final PR.


---

## 4) Preconditions, access and governance
- Read/write access to the target repository.
- Docker (or equivalent container runtime) installed.
- Access to a container registry (for image push/pull).
- Kubernetes cluster or test namespace available (if validating Helm charts).
- Containerisation Exemplar completed (recommended, not mandatory).
- Named reviewer (Solution Architect or Tech Lead) available.
- ATRS trigger: Possibly, if deploying to a shared or cloud environment. DPIA check: confirm images do not embed personal data or credentials.


---

## 5) Tooling categories and examples
Use department-approved tools. Names below are illustrative examples only.

| Category | Examples | Notes |
|---|---|---|
| Container runtime | Docker, Podman, containerd |  |
| Orchestration | Helm, Kustomize, raw Kubernetes manifests |  |
| Static analysis for containers/charts | hadolint (Dockerfile linting), helm lint, kubeval, kube-score |  |
| Container scanning | Trivy, Snyk Container, Docker Scout |  |
| Code assistants (for generating configs) | GitHub Copilot, Sourcegraph Cody, Cursor |  |
| Not typically needed | SCA/SBOM tools (unless auditing dependencies within the image), log analytics tools |  |


---

## 6) Timebox
Suggested: 2h for Dockerfile hardening and build; 2h for Helm chart generation, static checks, and deployment validation. Total: half a day. Schedule in Week 3-4.

Expandability: this activity can be repeated per component. Each additional component adds approximately half a day.

---

## 7) Inputs and data sources
- Exemplar Dockerfile and orchestration config from L5-Containerisation-Exemplar (if available).
- Target repository (source code, configuration, dependency manifest).
- SBOM (from L1-Extract-SBOM, if available) for dependency inventory and version pinning.
- Architecture Summary (from L3, if available) for understanding service boundaries and inter-service dependencies.
- Departmental container security standards and best-practice guidelines (if documented).
- Target platform details: Kubernetes cluster version, namespace policies, resource quotas.
- If unavailable: if no exemplar exists, treat this activity as combined proof-of-concept and hardening. Budget additional time.


---

## 8) Outputs and artefacts
- Production-grade Dockerfile (multi-stage, non-root, pinned base image, health check).
- Helm chart or deployment manifests with parameterised values.
- Build and deploy README with step-by-step instructions.
- Container image size and scan results (if scan tool is available).
- Time log entry for P1.

Audience: engineers, DevOps/platform team, Solution Architect. The artefacts are intended for CI/CD integration.


---

## 9) Metrics and measurement plan (map to P1-P8)

| Metric | Measurement approach |
|---|---|
| **P1 Task Time delta** | record time to produce production-grade artefacts with AI assistance. Compare against estimate for manual Dockerfile/chart authoring |
| **P2 Quality score** | reviewer rates the artefacts on the 1-5 rubric for security compliance, best-practice adherence, and maintainability |
| **P7 Vulnerability/risk reduction** | if a container scan is run, report the number and severity of findings |
| **P8 Reusable artefacts** | count the Dockerfile template, Helm chart template, build/deploy README, static check pipeline snippet |


Secondary:
- **P3 Developer sentiment**: include in the post-pilot SPACE survey.
- **P4 Lead time**: if the artefacts enable faster deployment, note qualitatively.

---

## 10) Risks and controls

| Risk | Mitigation |
|---|---|
| **AI-generated Dockerfile with security issues**: the AI may produce images running as root, with unpinned base images, or with embedded secrets | apply the hardening checklist in sub-task 2; run hadolint and container scanning |
| **Helm chart values not parameterised correctly**: hard-coded values (image tags, environment-specific config) make the chart non-portable | review values.yaml for anything that should be a parameter |
| **Large image size impacting deployment speed**: the image may include unnecessary build tools or layers | use multi-stage builds; check final image size and compare against a reasonable target |
| **Deployment fails in the target namespace**: Kubernetes policies (resource quotas, network policies, security contexts) may reject the deployment | test in a namespace that mirrors production policies; fix issues before merging |


---

## 11) Review and definition of done
Done when all of the following are true:
- [ ] Dockerfile follows best practices (multi-stage, non-root, pinned base, health check, no secrets).
- [ ] Helm chart (if applicable) passes helm lint and kubeval.
- [ ] Image builds successfully and application passes health checks.
- [ ] Container scan has been run (if tool is available) and critical findings addressed.
- [ ] Build and deploy README is complete.
- [ ] PR has been reviewed and approved by the named reviewer.
- [ ] Time log entry is recorded for P1.
- [ ] Evidence Log and Evaluation Scorecard are updated.


---

## 12) Playbook contribution
- **Where AI helped**: speed of Dockerfile and Helm chart generation; anti-pattern detection.
- **Prerequisites to document**: container runtime, registry access, Kubernetes cluster access, exemplar availability.
- **Limits and risks to document**: security issues in generated Dockerfiles, non-parameterised chart values, namespace policy conflicts.
- **Reusable assets**: Dockerfile template (multi-stage), Helm chart template, hadolint config, build/deploy README template.

- **Department continuation**: produce production-grade artefacts for additional components using the templates and static check pipeline from the pilot.

Pattern candidates:
- **"Hardening checklist for AI-generated Dockerfiles"**: applying a structured security checklist (non-root, pinned base, no secrets, multi-stage) after AI generation catches the most common issues.
- **"Static-check-driven chart validation"**: running helm lint, kubeval, and kube-score before deployment catches configuration errors early.

Anti-pattern candidates:
- **"Shipping the proof-of-concept Dockerfile to production"**: the exemplar Dockerfile is optimised for speed, not security or size. Always harden before deployment.
- **"Hard-coding environment-specific values in Helm charts"**: values that differ across environments (image tags, URLs, credentials) must be parameterised. Hard-coding breaks portability.
- Reusable assets: prompts, templates, patterns for the library.