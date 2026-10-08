# Legacy IT Risk Assessment Tool

A browser-based, single-page application for assessing UK government IT systems against the [Legacy IT Risk Assessment Framework](https://www.gov.uk/government/publications/guidance-on-the-legacy-it-risk-assessment-framework). Built using GOV.UK Frontend.

## What it does

Walk through a guided wizard to score a system across **7 Likelihood** and **6 Impact** criteria, then view a risk rating, manage a portfolio of assessments, and export data for reporting.

| Category | Criteria |
|---|---|
| **Likelihood** | L1 Software out of support · L2 Expired vendor contracts · L3 Lack of knowledge & skills · L4 Inability to meet business needs · L5 Unsuitable physical environment · L6 Known security vulnerabilities · L7 Historically recorded issues |
| **Impact** | C1 Citizen-facing volume · C2 Regulatory/legal obligation · C3 Operational dependency · C4 Data sensitivity · C5 Replaceability · C6 Financial exposure |

Each criterion is scored 1–6. The overall risk score is `likelihood_total × impact_total`. Systems scoring ≥ 16 are **red-rated**.

## Usage

Open `index.html` directly in a browser - no build step or server required.

```
open "index.html"
```

### Workflow

1. **Assess** — click *Start new assessment* and complete the wizard.
2. **Portfolio** — assessed systems are saved to browser `localStorage` and listed on the portfolio tab.
3. **Export** — download a CSV of all assessed systems, or save/load full sessions as JSON.
4. **Guidance** — the *Guidance* tab provides the full CDDO framework reference inline.

## File structure

```
index.html                  Entry point — load directly in a browser
css/
  govuk-frontend.min.css    GOV.UK Frontend styles (vendored)
  app.css                   App-specific styles
js/
  bundle.js                 All application logic (concatenated modules)
```

### Bundle module layout (`js/bundle.js`)

| Section | Lines | Purpose |
|---|---|---|
| `data.js` | ~1–210 | Criterion definitions, scoring thresholds, constants |
| `scoring.js` | ~220–280 | Pure scoring calculation functions |
| `export.js` | ~285–430 | JSON session save/load, CSV export |
| `render.js` | ~435–1110 | HTML rendering — wizard, portfolio, guidance, summary |
| `app.js` | ~1115–1756 | State management, wizard navigation, event wiring |
