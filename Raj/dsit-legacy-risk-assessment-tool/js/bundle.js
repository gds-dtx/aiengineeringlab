// ===== data.js =====
/**
 * data.js
 * Single source of truth for all criteria, scoring descriptors, and guidance text.
 * Based on: GOV.UK Guidance on the Legacy IT Risk Assessment Framework (updated 13 March 2025)
 */

// ---------------------------------------------------------------------------
// LIKELIHOOD CRITERIA  (scored 1–6)
// ---------------------------------------------------------------------------
const LIKELIHOOD_CRITERIA = [
  {
    code: 'L1',
    name: 'End of Life / End of Support',
    description: 'The level to which the technology used is out of support — i.e. technical support, upgrades, patches and new features are no longer available from the vendor.',
    levels: [
      { score: 6, label: 'Certain',   descriptor: 'Already out of support' },
      { score: 5, label: 'Very High', descriptor: 'Very high likelihood technology will be out of support within 3 years' },
      { score: 4, label: 'High',      descriptor: 'High likelihood technology will be out of support within 3 years' },
      { score: 3, label: 'Medium',    descriptor: 'Medium likelihood technology will be out of support within 3 years' },
      { score: 2, label: 'Low',       descriptor: 'Low likelihood technology will be out of support within 3 years' },
      { score: 1, label: 'Very Low',  descriptor: 'Very low likelihood technology will be out of support within 3 years' },
    ],
    examples: [
      'Operating systems no longer receiving security patches (e.g. Windows Server 2012, RHEL 6)',
      'Programming language runtimes past end-of-life (e.g. Python 2, Java 8 extended support expiry)',
      'Frameworks or libraries abandoned by maintainers with no migration path',
      'Database engines no longer under vendor support agreements (e.g. Oracle 10g, SQL Server 2008)',
      'Middleware or integration platforms that cannot be upgraded',
    ],
  },
  {
    code: 'L2',
    name: 'Expired Vendor Contract',
    description: 'The level to which support contracts for services are due to expire with no replacement agreement in place.',
    levels: [
      { score: 6, label: 'Certain',   descriptor: 'Already out of vendor contract with no replacement in place' },
      { score: 5, label: 'Very High', descriptor: 'Very high likelihood vendor contracts will expire with no replacement agreement in place' },
      { score: 4, label: 'High',      descriptor: 'High likelihood vendor contracts will expire with no replacement agreement in place' },
      { score: 3, label: 'Medium',    descriptor: 'Medium likelihood vendor contracts will expire with no replacement agreement in place' },
      { score: 2, label: 'Low',       descriptor: 'Low likelihood vendor contracts will expire with no replacement agreement in place' },
      { score: 1, label: 'Very Low',  descriptor: 'Very low likelihood vendor contracts will expire with no replacement agreement in place' },
    ],
    extraField: {
      key: 'contractExpiryDate',
      label: 'Contract expiry date',
      hint: 'When does the current vendor or support contract expire? Leave blank if unknown.',
      type: 'date',
      inputClass: 'govuk-input--width-10',
    },
  },
  {
    code: 'L3',
    name: 'Lack of Knowledge and Skills',
    description: 'The prevalence of personnel with the skills and knowledge to provide support and make changes to the asset.',
    levels: [
      { score: 6, label: 'Certain',   descriptor: 'Already insufficient expertise — skills and knowledge are not available internally or externally' },
      { score: 5, label: 'Very High', descriptor: 'Very high likelihood that expertise to provide support or make changes to the asset will become an issue' },
      { score: 4, label: 'High',      descriptor: 'High likelihood that expertise to provide support or make changes to the asset will become an issue' },
      { score: 3, label: 'Medium',    descriptor: 'Medium likelihood that expertise to provide support or make changes to the asset will become an issue' },
      { score: 2, label: 'Low',       descriptor: 'Low likelihood that expertise to provide support or make changes to the asset will become an issue' },
      { score: 1, label: 'Very Low',  descriptor: 'Very low likelihood that expertise to provide support or make changes to the asset will become an issue' },
    ],
    extraField: {
      key: 'keyPersonRisk',
      label: 'Key-person risk',
      hint: 'How many people can currently maintain and support this system?',
      type: 'select',
      options: [
        { value: '', label: 'Select an option' },
        { value: 'Single point of failure', label: 'Single point of failure \u2014 1 person' },
        { value: 'Small team', label: 'Small team \u2014 2 to 3 people' },
        { value: 'Adequate coverage', label: 'Adequate coverage \u2014 4 or more people' },
      ],
    },
  },
  {
    code: 'L4',
    name: 'Inability to Meet Current or Future Business Needs',
    description: 'Technical inability for the asset to meet current or future business needs, for example inability to be scaled or have improvements applied.',
    levels: [
      { score: 6, label: 'Certain',   descriptor: 'Already not meeting current business needs — the system cannot satisfy current requirements' },
      { score: 5, label: 'Very High', descriptor: 'Very high likelihood that the system will be unable to meet its business needs' },
      { score: 4, label: 'High',      descriptor: 'High likelihood that the system will be unable to meet its business needs' },
      { score: 3, label: 'Medium',    descriptor: 'Medium likelihood that the system will be unable to meet its business needs' },
      { score: 2, label: 'Low',       descriptor: 'Low likelihood that the system will be unable to meet its business needs' },
      { score: 1, label: 'Very Low',  descriptor: 'Very low likelihood that the system will be unable to meet its business needs' },
    ],
    extraField: {
      key: 'capabilityGaps',
      label: 'Known capability gaps',
      hint: 'What business needs does this system currently fail to meet, or what changes can it not accommodate?',
      type: 'textarea',
      rows: 2,
    },
  },
  {
    code: 'L5',
    name: 'Unsuitable Physical Environment',
    description: 'The degree to which the asset is based on old hardware or housed in an improper physical environment, for example due to climate or location.',
    levels: [
      { score: 6, label: 'Certain',   descriptor: 'Hardware or physical environment is currently unsuitable' },
      { score: 5, label: 'Very High', descriptor: 'Very high level of concern regarding the suitability of the hardware or physical environment' },
      { score: 4, label: 'High',      descriptor: 'High level of concern regarding the suitability of the hardware or physical environment' },
      { score: 3, label: 'Medium',    descriptor: 'Medium level of concern regarding the suitability of the hardware or physical environment' },
      { score: 2, label: 'Low',       descriptor: 'Low level of concern regarding the suitability of the hardware or physical environment' },
      { score: 1, label: 'Very Low',  descriptor: 'Very low level of concern regarding the suitability of the hardware or physical environment' },
    ],
    extraField: {
      key: 'hostingType',
      label: 'Hosting type',
      hint: 'Where is this system primarily hosted?',
      type: 'select',
      options: [
        { value: '', label: 'Select an option' },
        { value: 'On-premise', label: 'On-premise' },
        { value: 'Co-located', label: 'Co-located data centre' },
        { value: 'Cloud (public)', label: 'Cloud \u2014 public (AWS, Azure, GCP)' },
        { value: 'Cloud (private)', label: 'Cloud \u2014 private / Crown Hosting' },
        { value: 'Hybrid', label: 'Hybrid' },
      ],
    },
  },
  {
    code: 'L6',
    name: 'Known Security Vulnerabilities',
    description: 'The likelihood that security vulnerabilities exist in the system, for example due to unpatched software, outdated protocols or lack of vendor security updates.',
    levels: [
      { score: 6, label: 'Certain',   descriptor: 'Security vulnerabilities are known to currently exist' },
      { score: 5, label: 'Very High', descriptor: 'Very high likelihood that security vulnerabilities exist' },
      { score: 4, label: 'High',      descriptor: 'High likelihood that security vulnerabilities exist' },
      { score: 3, label: 'Medium',    descriptor: 'Medium likelihood that security vulnerabilities exist' },
      { score: 2, label: 'Low',       descriptor: 'Low likelihood that security vulnerabilities exist' },
      { score: 1, label: 'Very Low',  descriptor: 'Very low likelihood that security vulnerabilities exist' },
    ],
    extraField: {
      key: 'lastSecurityAssessment',
      label: 'Last security assessment date',
      hint: 'When was this system last subject to a vulnerability scan, penetration test, or IT Health Check? Leave blank if unknown or never.',
      type: 'date',
      inputClass: 'govuk-input--width-10',
    },
  },
  {
    code: 'L7',
    name: 'Historically Recorded Issues',
    description: 'Evidence of historical failures or issues with the system — for example outages, data loss events, or failed change deployments.',
    levels: [
      { score: 6, label: 'Certain',   descriptor: 'Issues or failures are currently occurring' },
      { score: 5, label: 'Very High', descriptor: 'Severe issues or failures have occurred in the recent past' },
      { score: 4, label: 'High',      descriptor: 'Major issues or failures have occurred in the recent past' },
      { score: 3, label: 'Medium',    descriptor: 'Moderate issues or failures have occurred in the recent past' },
      { score: 2, label: 'Low',       descriptor: 'Minor issues or failures are known to have occurred in the recent past' },
      { score: 1, label: 'Very Low',  descriptor: 'No issues or failures are known to have occurred in the recent past' },
    ],
    extraField: {
      key: 'majorIncidents24m',
      label: 'P1/P2 incidents in last 24 months',
      hint: 'Count of major incidents (severity 1 or 2) in the last 24 months. Enter 0 if none.',
      type: 'number',
      inputClass: 'govuk-input--width-5',
      min: 0,
    },
  },
];

// ---------------------------------------------------------------------------
// IMPACT CRITERIA  (scored 1–5)
// ---------------------------------------------------------------------------
const IMPACT_CRITERIA = [
  {
    code: 'C1',
    name: 'National Security Impact',
    description: 'The impact of a failure of the system directly or indirectly resulting in a threat to national security, health, personal safety or loss of human life.',
    levels: [
      { score: 5, label: 'Very High', descriptor: 'Very high sustained impact, including threats to health, personal safety or loss of human life' },
      { score: 4, label: 'High',      descriptor: 'High impact to national security, health, personal safety or loss of human life' },
      { score: 3, label: 'Medium',    descriptor: 'Medium impact to national security, health, personal safety or loss of human life' },
      { score: 2, label: 'Low',       descriptor: 'Low impact to national security, health or personal safety' },
      { score: 1, label: 'Very Low',  descriptor: 'Very low impact to national security, including threats to health or personal safety' },
    ],
  },
  {
    code: 'C2',
    name: 'Reputational Impact',
    description: 'The impact to the perception of UK Government and the scale of intervention required to manage damage to reputation.',
    levels: [
      { score: 5, label: 'Very High', descriptor: 'Very high impact to perception of UK government, requiring major intervention at a parliamentary level to manage reputation' },
      { score: 4, label: 'High',      descriptor: 'High impact on perception of UK government, requiring significant intervention to manage reputation' },
      { score: 3, label: 'Medium',    descriptor: 'Medium impact on perception of UK government, requiring some intervention to manage reputation' },
      { score: 2, label: 'Low',       descriptor: 'Low impact on perception of UK government, requiring little intervention to manage reputation' },
      { score: 1, label: 'Very Low',  descriptor: 'Very low impact on perception of UK government, requiring no intervention to manage reputation' },
    ],
  },
  {
    code: 'C3',
    name: 'Direct Financial Impact',
    description: 'The financial impact — either absolute or as a percentage of departmental budget — that would result from regulatory fines, litigation, citizen redress or other direct costs including exit costs and break clauses.',
    levels: [
      { score: 5, label: 'Very High', descriptor: 'Very high impact — e.g. >10% of departmental budget or >£50m — related to regulatory, litigation, citizen redress and other direct costs' },
      { score: 4, label: 'High',      descriptor: 'High impact — e.g. 8–10% or £21–50m — related to regulatory, litigation, citizen redress and other direct costs' },
      { score: 3, label: 'Medium',    descriptor: 'Medium impact — e.g. 5–7% or £11–20m — related to regulatory, litigation, citizen redress and other direct costs' },
      { score: 2, label: 'Low',       descriptor: 'Low impact — e.g. 1–4% or £5–10m — related to regulatory, litigation, citizen redress and other direct costs' },
      { score: 1, label: 'Very Low',  descriptor: 'Very low impact — e.g. <1% of departmental budget or <£5m — related to regulatory, litigation, citizen redress and other direct costs' },
    ],
  },
  {
    code: 'C4',
    name: 'Direct External Stakeholder Impact',
    description: 'The impact on external stakeholders, including economic loss and/or significant inconvenience to citizens, businesses or other organisations that depend on this system.',
    levels: [
      { score: 5, label: 'Very High', descriptor: 'Very high impact on external stakeholders, including significant economic loss and/or major inconvenience at national scale' },
      { score: 4, label: 'High',      descriptor: 'High impact on external stakeholders, including economic loss and/or significant inconvenience' },
      { score: 3, label: 'Medium',    descriptor: 'Medium impact on external stakeholders, including some economic loss and/or inconvenience' },
      { score: 2, label: 'Low',       descriptor: 'Low impact on external stakeholders, including minor economic loss and/or inconvenience' },
      { score: 1, label: 'Very Low',  descriptor: 'Very low impact on external stakeholders — minimal or no economic loss or inconvenience' },
    ],
  },
  {
    code: 'C5',
    name: 'Operational Impact',
    description: 'The extent of resource hours lost or additional workload hours required following an outage or significant failure of this system.',
    levels: [
      { score: 5, label: 'Very High', descriptor: 'Very high impact — e.g. >500,000 resource hours of idleness or increased workload' },
      { score: 4, label: 'High',      descriptor: 'High impact — e.g. 100,001–500,000 resource hours of idleness or increased workload' },
      { score: 3, label: 'Medium',    descriptor: 'Medium impact — e.g. 1,001–100,000 resource hours of idleness or increased workload' },
      { score: 2, label: 'Low',       descriptor: 'Low impact — e.g. 101–1,000 resource hours of idleness or increased workload' },
      { score: 1, label: 'Very Low',  descriptor: 'Very low impact — e.g. <100 resource hours of idleness or increased workload' },
    ],
  },
  {
    code: 'C6',
    name: 'Impact on Other Systems (Technical Barrier to Innovation)',
    description: 'The level of difficulty in improving or replacing this system due to significant codependency with other systems — a high score means other projects are blocked or significantly complicated by this system.',
    levels: [
      { score: 5, label: 'Very High', descriptor: 'Very high barrier to innovation — highly integrated with other systems, significantly increasing build cost or duration for other projects' },
      { score: 4, label: 'High',      descriptor: 'High barrier to innovation — significant dependencies constrain other systems' },
      { score: 3, label: 'Medium',    descriptor: 'Medium barrier to innovation — integrated with some systems, sometimes increasing build cost or duration for projects' },
      { score: 2, label: 'Low',       descriptor: 'Low barrier to innovation — limited dependencies, minimal impact on other systems' },
      { score: 1, label: 'Very Low',  descriptor: 'Very low barrier to innovation — no meaningful interactions with other systems' },
    ],
  },
];

// ---------------------------------------------------------------------------
// LEGACY INDICATORS  (used in the before-you-start section)
// ---------------------------------------------------------------------------
const LEGACY_INDICATORS = [
  'Software out of support',
  'Expired vendor contracts',
  'Too few people with required knowledge and skills',
  'Inability to meet current or future business needs',
  'Unsuitable hardware',
  'Known security vulnerabilities',
  'Recent problems or downtime',
];

// ---------------------------------------------------------------------------
// SCORING THRESHOLDS
// ---------------------------------------------------------------------------
const THRESHOLDS = {
  legacyMinScore: 3,     // any single L score ≥ 3 → system is Legacy
  mediumMinScore: 4,     // overall score ≥ 4  → Medium zone in risk matrix
  highMinScore: 8,       // overall score ≥ 8  → High zone in risk matrix
  redRatedMinScore: 16,  // overall score ≥ 16 → system is Red-Rated
  maxOverall: 30,        // theoretical maximum: L total max (6) × I total max (5)
};

// ---------------------------------------------------------------------------
// ASSESSMENT STATUS KEYS
// Produced by calcFullScore in scoring.js; consumed by render.js STATUS_META.
// Using named constants avoids silent breakage from typos.
// ---------------------------------------------------------------------------
const STATUS = Object.freeze({
  UNSCORED:    'unscored',
  NOT_LEGACY:  'not-legacy',
  LEGACY:      'legacy',
  RED_RATED:   'red-rated',
});

// ===== scoring.js =====
/**
 * scoring.js
 * Pure scoring calculation functions — no DOM dependencies.
 * Formula from the Legacy IT Risk Assessment Framework guidance:
 *   total = (mean of all scores + max single score) / 2
 *   overall = likelihood_total × impact_total
 */


/**
 * Calculate a category score (likelihood OR impact) from an array of numeric scores.
 * @param {number[]} scores - Array of raw criterion scores (0 = not yet scored)
 * @returns {{ mean: number, max: number, total: number, allScored: boolean }}
 */
function calcCategoryScore(scores) {
  const valid = scores.filter(score => score > 0);
  if (valid.length === 0) return { mean: 0, max: 0, total: 0, allScored: false };

  const mean = valid.reduce((sum, score) => sum + score, 0) / valid.length;
  const max  = Math.max(...valid);
  const total = (mean + max) / 2;
  const allScored = valid.length === scores.length;

  return { mean: roundScore(mean), max, total: roundScore(total), allScored };
}

/**
 * Calculate the overall risk score and status.
 * @param {Object} likelihoodScores - e.g. { L1: 5, L2: 4, … }
 * @param {Object} impactScores     - e.g. { C1: 5, C2: 3, … }
 * @returns {Object} full breakdown
 */
function calcFullScore(likelihoodScores, impactScores) {
  const lValues = Object.values(likelihoodScores).map(Number);
  const iValues = Object.values(impactScores).map(Number);

  const likelihood = calcCategoryScore(lValues);
  const impact     = calcCategoryScore(iValues);

  const allScored = likelihood.allScored && impact.allScored;

  const overall = allScored ? roundScore(likelihood.total * impact.total) : 0;
  const isLegacy   = lValues.some(score => score >= THRESHOLDS.legacyMinScore);
  const isRedRated = allScored && overall >= THRESHOLDS.redRatedMinScore;

  let status = 'unscored';
  if (allScored && isRedRated) status = 'red-rated';
  else if (allScored && isLegacy)  status = 'legacy';
  else if (allScored)              status = 'not-legacy';

  return { likelihood, impact, overall, isLegacy, isRedRated, status, allScored };
}



function roundScore(n) {
  return Math.round(n * 100) / 100;
}

// ===== export.js =====
/**
 * export.js
 * Save/load JSON sessions and CSV export.
 */


// ---------------------------------------------------------------------------
// Save session → JSON download
// ---------------------------------------------------------------------------
function saveSession(portfolio) {
  const payload = {
    version: 1,
    savedAt: new Date().toISOString(),
    portfolio,
  };
  downloadFile(
    JSON.stringify(payload, null, 2),
    `legacy-it-assessment-${datestamp()}.json`,
    'application/json'
  );
}

// ---------------------------------------------------------------------------
// Load session from JSON file → calls callback(portfolio[])
// ---------------------------------------------------------------------------
function loadSession(callback) {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.json,application/json';
  input.addEventListener('change', () => {
    const file = input.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        if (data.version !== 1) {
          throw new Error('Unrecognised file version — this session was saved by a different version of the tool.');
        }
        if (!data.portfolio || !Array.isArray(data.portfolio)) {
          throw new Error('Invalid session file: missing portfolio array.');
        }
        callback(null, data.portfolio);
      } catch (err) {
        callback(err, null);
      }
    };
    reader.onerror = () => {
      callback(new Error('Could not read the file. It may be corrupt or inaccessible.'), null);
    };
    reader.readAsText(file);
  });
  document.body.appendChild(input);
  input.click();
  document.body.removeChild(input);
}

// ---------------------------------------------------------------------------
// Build CSV string (pure — no DOM, no download, testable)
// ---------------------------------------------------------------------------
function buildCSVString(portfolio) {
  const lCodes = LIKELIHOOD_CRITERIA.map(c => c.code); // L1…L7
  const iCodes = IMPACT_CRITERIA.map(c => c.code);     // C1…C6

  const headers = [
    'Asset Name',
    'Department',
    'Assessor',
    'System Owner',
    'Date Assessed',
    'Asset Description',
    'Legacy Components',
    'Services Supported',
    'Contract Expiry Date',
    'Key-Person Risk',
    'Capability Gaps',
    'Hosting Type',
    'Last Security Assessment',
    'P1/P2 Incidents (24m)',
    // Likelihood raw scores
    ...lCodes.map(c => `${c} Score`),
    'Likelihood Mean',
    'Likelihood Max',
    'Likelihood Total',
    // Impact raw scores
    ...iCodes.map(c => `${c} Score`),
    'Impact Mean',
    'Impact Max',
    'Impact Total',
    // Results
    'Overall Risk Score',
    'Is Legacy',
    'Is Red-Rated',
    // Remediation
    'Has Remediation Plan',
    'Remediation Plan Funded',
    'Target Resolution Date',
    'Estimated Cost Change (%)',
    'Notes',
    'Remediation Milestones',
  ];

  const rows = portfolio.map(sys => {
    const lScores = lCodes.map(c => sys.likelihoodScores?.[c] ?? '');
    const iScores = iCodes.map(c => sys.impactScores?.[c] ?? '');
    const r = sys.result || {};

    return [
      sys.name,
      sys.department,
      sys.assessor,
      sys.systemOwner,
      sys.dateAssessed,
      sys.description,
      sys.legacyComponents,
      sys.services,
      sys.contractExpiryDate,
      sys.keyPersonRisk,
      sys.capabilityGaps,
      sys.hostingType,
      sys.lastSecurityAssessment,
      sys.majorIncidents24m,
      ...lScores,
      r.likelihood?.mean ?? '',
      r.likelihood?.max  ?? '',
      r.likelihood?.total ?? '',
      ...iScores,
      r.impact?.mean  ?? '',
      r.impact?.max   ?? '',
      r.impact?.total ?? '',
      r.overall ?? '',
      r.allScored ? (r.isLegacy   ? 'Yes' : 'No') : '',
      r.allScored ? (r.isRedRated ? 'Yes' : 'No') : '',
      sys.hasRemediationPlan,
      sys.remediationFunded,
      sys.targetResolutionDate,
      sys.estimatedCostChange,
      sys.notes,
      sys.remediationMilestones,
    ].map(csvCell);
  });

  return [headers.map(csvCell).join(','), ...rows.map(r => r.join(','))].join('\r\n');
}

// ---------------------------------------------------------------------------
// Export CSV → downloads a flat CSV of all systems
// ---------------------------------------------------------------------------
function exportCSV(portfolio) {
  if (portfolio.length === 0) return;
  downloadFile(buildCSVString(portfolio), `legacy-it-portfolio-${datestamp()}.csv`, 'text/csv');
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function csvCell(val) {
  const str = (val === null || val === undefined) ? '' : String(val);
  if (str.includes(',') || str.includes('"') || str.includes('\n') || str.includes('\r')) {
    return `"${str.replace(/"/g, '""')}`+`"`;
  }
  return str;
}

function datestamp() {
  return new Date().toISOString().slice(0, 10);
}

function downloadFile(content, filename, mime) {
  const blob = new Blob([content], { type: mime });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// ===== render.js =====
/**
 * render.js — wizard version
 * Renders wizard steps, summary pages, portfolio and guidance tabs.
 */


// Total number of scored wizard steps — used for the progress bar.
// Must stay in sync with the stepMeta() map in this file.
const TOTAL_WIZARD_STEPS = 15;

// GOV.UK brand colours — named constants to avoid stray hex literals across functions.
const COLOUR = Object.freeze({
  RED:         '#d4351c', // GOV.UK red    — Red-Rated risk borders and text
  ORANGE:      '#f47738', // GOV.UK orange — Legacy risk borders
  GREEN:       '#00703c', // GOV.UK green  — Not-Legacy risk borders
  GREY_BG:     '#f3f2f1', // GOV.UK light grey — panel backgrounds
  GREY_TEXT:   '#505a5f', // GOV.UK secondary text
  BLACK:       '#0b0c0c', // GOV.UK black  — primary text and score numbers
  BLUE:        '#1d70b8', // GOV.UK blue   — progress bar and information
  // Risk matrix zone fills (SVG-specific, approximate GOV.UK palette)
  ZONE_MEDIUM: '#f4a100',
  ZONE_HIGH:   '#d4531a',
  ZONE_RED:    '#c0111f',
});

// Status display metadata — presentation layer only, keyed by STATUS constants.
const STATUS_META = {
  [STATUS.UNSCORED]:   { label: 'Not yet scored', tagClass: 'govuk-tag--grey',   description: 'Complete all criteria to see the result.' },
  [STATUS.NOT_LEGACY]: { label: 'Not Legacy',     tagClass: 'govuk-tag--green',  description: 'No likelihood criterion scored 3 or above. Not currently classified as a legacy system.' },
  [STATUS.LEGACY]:     { label: 'Legacy',         tagClass: 'govuk-tag--yellow', description: 'At least one likelihood criterion scored 3 (Medium) or above. This system is classified as Legacy.' },
  [STATUS.RED_RATED]:  { label: 'Red-Rated',      tagClass: 'govuk-tag--red',    description: 'Overall risk score is 16 or above. This is a Red-Rated system and must be added to the Legacy IT Asset Register.' },
};

// ---------------------------------------------------------------------------
// STEP MAP
// 0: before-you-start  1: system details  2-8: L1-L7  9-14: C1-C6
// 15: remediation  16: result
// ---------------------------------------------------------------------------
function stepMeta(n) {
  if (n === 0)  return { type: 'start' };
  if (n === 1)  return { type: 'details', label: 'System details' };
  if (n >= 2 && n <= 8) {
    const i = n - 2;
    return { type: 'criterion', cat: 'L', criterion: LIKELIHOOD_CRITERIA[i],
             sectionLabel: 'Likelihood \u00b7 ' + (i + 1) + ' of 7' };
  }
  if (n >= 9 && n <= 14) {
    const i = n - 9;
    return { type: 'criterion', cat: 'C', criterion: IMPACT_CRITERIA[i],
             sectionLabel: 'Impact \u00b7 ' + (i + 1) + ' of 6' };
  }
  if (n === 15) return { type: 'remediation', label: 'Remediation' };
  if (n === 16) return { type: 'result' };
  return null;
}

// ---------------------------------------------------------------------------
// Wizard shell
// ---------------------------------------------------------------------------
function renderWizardShell(container) {
  container.innerHTML = '<div id="wizard-container"></div>';
}

// ---------------------------------------------------------------------------
// Dispatch to the right step renderer
// ---------------------------------------------------------------------------
function renderStepContent(n, draft, opts = {}) {
  const hasDraft        = opts.hasDraft        || false;
  const result          = opts.result          || null;
  const returnToSummary = opts.returnToSummary || false;
  const meta = stepMeta(n);
  if (!meta) return '<p class="govuk-body">Unknown step.</p>';
  switch (meta.type) {
    case 'start':       return renderBeforeYouStart(hasDraft);
    case 'details':     return renderSystemDetailsStep(draft, n, returnToSummary);
    case 'criterion':   return renderWizardCriterionStep(meta.criterion, meta.cat, meta.sectionLabel, n, draft, returnToSummary);
    case 'remediation': return renderRemediationStep(draft, n, returnToSummary);
    case 'result':      return renderResultStep(result, draft);
  }
}

// ---------------------------------------------------------------------------
// Step 0 — Before you start
// ---------------------------------------------------------------------------
function renderBeforeYouStart(hasDraft) {
  const indicators = LEGACY_INDICATORS.map(function(indicator){ return '<li>' + indicator + '</li>'; }).join('');
  let actionBlock;
  if (hasDraft) {
    actionBlock = '<div class="govuk-notification-banner" role="region" aria-labelledby="draft-banner-title" style="margin-bottom:1.5rem">'
      + '<div class="govuk-notification-banner__header"><h2 class="govuk-notification-banner__title" id="draft-banner-title">Draft in progress</h2></div>'
      + '<div class="govuk-notification-banner__content">'
      + '<p class="govuk-body">You have an unfinished assessment. Resume where you left off, or discard it and start fresh.</p>'
      + '<div class="govuk-button-group">'
      + '<button class="govuk-button govuk-!-margin-bottom-0" id="btn-wizard-resume">Resume assessment</button>'
      + '<button class="govuk-button govuk-button--secondary govuk-!-margin-bottom-0" id="btn-wizard-restart">Discard and start fresh</button>'
      + '</div></div></div>';
  } else {
    actionBlock = '<button class="govuk-button govuk-button--start" id="btn-wizard-start">Start assessment'
      + '<svg class="govuk-button__start-icon" xmlns="http://www.w3.org/2000/svg" width="17.5" height="19" viewBox="0 0 33 40" focusable="false" aria-hidden="true"><path fill="currentColor" d="M0 0h13l20 20-20 20H0l20-20z"/></svg>'
      + '</button>';
  }
  return '<h2 class="govuk-heading-l">Assess a system</h2>'
    + '<p class="govuk-body">Use this tool to assess your legacy IT systems against the <a class="govuk-link" href="https://www.gov.uk/government/publications/guidance-on-the-legacy-it-risk-assessment-framework" target="_blank" rel="noopener noreferrer">Legacy IT Risk Assessment Framework</a>. All guidance is included \u2014 select the <strong>Guidance</strong> tab if you need it.</p>'
    + '<div class="govuk-inset-text"><h3 class="govuk-heading-s">Before you start</h3>'
    + '<p class="govuk-body">This tool implements the <a class="govuk-link" href="https://www.gov.uk/government/publications/guidance-on-the-legacy-it-risk-assessment-framework" target="_blank" rel="noopener noreferrer"><strong>Legacy IT Risk Assessment Framework</strong></a>. '
    + 'Assessments cover a <strong>3-year horizon</strong> and use expert judgement based on available information.</p>'
    + '<p class="govuk-body">A system should be considered for assessment if it shows any of these indicators:</p>'
    + '<ul class="govuk-list govuk-list--bullet">' + indicators + '</ul>'
    + '<p class="govuk-body govuk-!-margin-bottom-0"><strong>Legacy</strong>: any single Likelihood score \u2265 3 (Medium).<br>'
    + '<strong>Red-Rated</strong>: overall risk score \u2265 16 \u2014 must be added to the Legacy IT Asset Register.</p>'
    + '</div>'
    + '<p class="govuk-body">You will answer <strong>15 questions</strong> (system details, 7 Likelihood criteria, 6 Impact criteria, remediation info), '
    + 'then see your result. Your progress is saved automatically.</p>'
    + actionBlock;
}

// ---------------------------------------------------------------------------
// Step 1 — System details
// ---------------------------------------------------------------------------
function renderSystemDetailsStep(draft, stepNum, returnToSummary) {
  return renderStepChrome('System details', stepNum, returnToSummary)
    + '<h2 class="govuk-heading-l">About this system</h2>'
    + '<p class="govuk-body">Fields marked * are required.</p>'
    + '<div class="govuk-form-group" id="fg-sys-name">'
    + '<label class="govuk-label govuk-label--s" for="sys-name">Asset name *</label>'
    + '<div class="govuk-hint">The name of the IT system or application.</div>'
    + '<input class="govuk-input" id="sys-name" name="sys-name" type="text" value="' + esc(draft.name) + '" autocomplete="off"></div>'
    + '<div class="govuk-form-group" id="fg-sys-dept">'
    + '<label class="govuk-label govuk-label--s" for="sys-dept">Department *</label>'
    + '<input class="govuk-input" id="sys-dept" name="sys-dept" type="text" value="' + esc(draft.department) + '" autocomplete="organization"></div>'
    + '<div class="govuk-form-group" id="fg-sys-assessor">'
    + '<label class="govuk-label govuk-label--s" for="sys-assessor">Assessor name *</label>'
    + '<input class="govuk-input" id="sys-assessor" name="sys-assessor" type="text" value="' + esc(draft.assessor) + '" autocomplete="name"></div>'
    + '<div class="govuk-form-group" id="fg-sys-owner">'
    + '<label class="govuk-label govuk-label--s" for="sys-owner">System owner</label>'
    + '<div class="govuk-hint">Name of the person accountable for this asset in the department (required for submission to the Legacy IT Asset Register).</div>'
    + '<input class="govuk-input" id="sys-owner" name="sys-owner" type="text" value="' + esc(draft.systemOwner) + '" autocomplete="name"></div>'
    + '<div class="govuk-form-group" id="fg-sys-date">'
    + '<label class="govuk-label govuk-label--s" for="sys-date">Date assessed *</label>'
    + '<div class="govuk-hint">For example, 2026-02-25</div>'
    + '<input class="govuk-input govuk-input--width-10" id="sys-date" name="sys-date" type="date" value="' + esc(draft.dateAssessed) + '"></div>'
    + '<div class="govuk-form-group">'
    + '<label class="govuk-label govuk-label--s" for="sys-description">Asset description</label>'
    + '<div class="govuk-hint">What type of system is it? What does it do?</div>'
    + '<textarea class="govuk-textarea" id="sys-description" name="sys-description" rows="3">' + esc(draft.description) + '</textarea></div>'
    + '<div class="govuk-form-group">'
    + '<label class="govuk-label govuk-label--s" for="sys-legacy-components">Legacy components</label>'
    + '<div class="govuk-hint">Which specific components (OS, database, hardware, etc.) are legacy?</div>'
    + '<textarea class="govuk-textarea" id="sys-legacy-components" name="sys-legacy-components" rows="2">' + esc(draft.legacyComponents) + '</textarea></div>'
    + '<div class="govuk-form-group">'
    + '<label class="govuk-label govuk-label--s" for="sys-services">Services supported</label>'
    + '<div class="govuk-hint">Which services or business capabilities does this system support?</div>'
    + '<textarea class="govuk-textarea" id="sys-services" name="sys-services" rows="2">' + esc(draft.services) + '</textarea></div>'
    + renderWizardFooter(stepNum, returnToSummary);
}

// ---------------------------------------------------------------------------
// Steps 2-14 — One criterion per screen
// ---------------------------------------------------------------------------
function renderWizardCriterionStep(criterion, cat, sectionLabel, stepNum, draft, returnToSummary) {
  const name = cat + '-' + criterion.code;
  const currentScore = cat === 'L' ? draft.likelihoodScores[criterion.code] : draft.impactScores[criterion.code];

  const radios = criterion.levels.map(function(level) {
    return '<div class="govuk-radios__item">'
      + '<input class="govuk-radios__input" id="' + name + '-' + level.score + '" name="' + name + '" type="radio" value="' + level.score + '"'
      + (currentScore === level.score ? ' checked' : '')
      + ' aria-describedby="' + name + '-' + level.score + '-hint">'
      + '<label class="govuk-label govuk-radios__label" for="' + name + '-' + level.score + '">'
      + '<strong>' + level.score + ' \u2014 ' + level.label + '</strong></label>'
      + '<div id="' + name + '-' + level.score + '-hint" class="govuk-hint govuk-radios__hint">'
      + level.descriptor + '</div></div>';
  }).join('');

  const tableRows = criterion.levels.map(function(level) {
    return '<tr class="govuk-table__row">'
      + '<td class="govuk-table__cell">' + level.score + '</td>'
      + '<td class="govuk-table__cell"><strong>' + level.label + '</strong></td>'
      + '<td class="govuk-table__cell">' + level.descriptor + '</td></tr>';
  }).join('');

  const contextNote = cat === 'L'
    ? '<p class="govuk-body">Score the <strong>likelihood</strong> of this issue being realised over the next 3 years. A score of <strong>3 (Medium) or above</strong> on any Likelihood criterion classifies this system as Legacy.</p>'
    : '<p class="govuk-body">Score the potential <strong>impact</strong> if this system fails or is attacked. Base your assessment on the most plausible failure scenario.</p>';

  return renderStepChrome(sectionLabel, stepNum, returnToSummary)
    + '<h2 class="govuk-heading-l">' + criterion.code + ' \u2014 ' + criterion.name + '</h2>'
    + '<p class="govuk-body govuk-hint" style="margin-bottom:0.5rem">' + criterion.description + '</p>'
    + contextNote
    + renderExamplesPanel(criterion)
    + '<div class="govuk-form-group" id="fg-criterion"><fieldset class="govuk-fieldset">'
    + '<legend class="govuk-fieldset__legend govuk-fieldset__legend--s">Select the most appropriate score</legend>'
    + '<div class="govuk-radios" id="' + name + '-radios">' + radios + '</div>'
    + '</fieldset></div>'
    + renderExtraField(criterion, draft)
    + '<details class="govuk-details" style="margin-bottom:1.5rem">'
    + '<summary class="govuk-details__summary"><span class="govuk-details__summary-text">Full scoring table for ' + criterion.code + '</span></summary>'
    + '<div class="govuk-details__text" style="overflow-x:auto">'
    + '<table class="govuk-table govuk-!-font-size-16">'
    + '<thead class="govuk-table__head"><tr class="govuk-table__row">'
    + '<th class="govuk-table__header" scope="col" style="width:3em">Score</th>'
    + '<th class="govuk-table__header" scope="col" style="width:7em">Level</th>'
    + '<th class="govuk-table__header" scope="col">Description</th></tr></thead>'
    + '<tbody class="govuk-table__body">' + tableRows + '</tbody></table></div></details>'
    + renderWizardFooter(stepNum, returnToSummary);
}

// ---------------------------------------------------------------------------
// Step 15 — Remediation
// ---------------------------------------------------------------------------
function renderRemediationStep(draft, stepNum, returnToSummary) {
  function chk(field, val) { return draft[field] === val ? ' checked' : ''; }
  return renderStepChrome('Remediation', stepNum, returnToSummary)
    + '<h2 class="govuk-heading-l">Remediation information</h2>'
    + '<p class="govuk-body">These fields are required for Red-Rated systems on the Legacy IT Asset Register. All fields on this page are optional.</p>'
    + '<div class="govuk-form-group"><fieldset class="govuk-fieldset">'
    + '<legend class="govuk-fieldset__legend govuk-fieldset__legend--s">Does a remediation plan exist?</legend>'
    + '<div class="govuk-radios govuk-radios--inline govuk-radios--small">'
    + '<div class="govuk-radios__item"><input class="govuk-radios__input" id="remediation-yes" name="sys-remediation" type="radio" value="Yes"' + chk('hasRemediationPlan','Yes') + '><label class="govuk-label govuk-radios__label" for="remediation-yes">Yes</label></div>'
    + '<div class="govuk-radios__item"><input class="govuk-radios__input" id="remediation-no" name="sys-remediation" type="radio" value="No"' + chk('hasRemediationPlan','No') + '><label class="govuk-label govuk-radios__label" for="remediation-no">No</label></div>'
    + '<div class="govuk-radios__item"><input class="govuk-radios__input" id="remediation-partial" name="sys-remediation" type="radio" value="Partially"' + chk('hasRemediationPlan','Partially') + '><label class="govuk-label govuk-radios__label" for="remediation-partial">Partially</label></div>'
    + '</div></fieldset></div>'
    + '<div class="govuk-form-group"><fieldset class="govuk-fieldset">'
    + '<legend class="govuk-fieldset__legend govuk-fieldset__legend--s">Is the remediation plan funded?</legend>'
    + '<div class="govuk-radios govuk-radios--inline govuk-radios--small">'
    + '<div class="govuk-radios__item"><input class="govuk-radios__input" id="funded-yes" name="sys-funded" type="radio" value="Yes"' + chk('remediationFunded','Yes') + '><label class="govuk-label govuk-radios__label" for="funded-yes">Yes</label></div>'
    + '<div class="govuk-radios__item"><input class="govuk-radios__input" id="funded-no" name="sys-funded" type="radio" value="No"' + chk('remediationFunded','No') + '><label class="govuk-label govuk-radios__label" for="funded-no">No</label></div>'
    + '<div class="govuk-radios__item"><input class="govuk-radios__input" id="funded-partial" name="sys-funded" type="radio" value="Partially"' + chk('remediationFunded','Partially') + '><label class="govuk-label govuk-radios__label" for="funded-partial">Partially</label></div>'
    + '</div></fieldset></div>'
    + '<div class="govuk-form-group"><label class="govuk-label govuk-label--s" for="sys-target-date">Target resolution date</label>'
    + '<input class="govuk-input govuk-input--width-10" id="sys-target-date" name="sys-target-date" type="date" value="' + esc(draft.targetResolutionDate) + '"></div>'
    + '<div class="govuk-form-group"><label class="govuk-label govuk-label--s" for="sys-cost-change">Estimated % change in annual running costs if no longer legacy</label>'
    + '<div class="govuk-hint">Negative = saving, positive = increase. E.g. -20 for a 20% saving.</div>'
    + '<div class="govuk-input__wrapper">'
    + '<input class="govuk-input govuk-input--width-5" id="sys-cost-change" name="sys-cost-change" type="number" step="0.1" value="' + esc(draft.estimatedCostChange) + '">'
    + '<div class="govuk-input__suffix" aria-hidden="true">%</div></div></div>'
    + '<div class="govuk-form-group"><label class="govuk-label govuk-label--s" for="sys-notes">Additional notes</label>'
    + '<textarea class="govuk-textarea" id="sys-notes" name="sys-notes" rows="3">' + esc(draft.notes) + '</textarea></div>'
    + '<div class="govuk-form-group"><label class="govuk-label govuk-label--s" for="sys-milestones">Key remediation milestones</label>'
    + '<div class="govuk-hint">List the main milestones with target dates, e.g. "Procurement decision by Q2 2026, migration complete by Q4 2027". Required for Red-Rated systems on the register.</div>'
    + '<textarea class="govuk-textarea" id="sys-milestones" name="sys-milestones" rows="3">' + esc(draft.remediationMilestones) + '</textarea></div>'
    + renderWizardFooter(stepNum, returnToSummary);
}

// ---------------------------------------------------------------------------
// Step 16 — Result
// ---------------------------------------------------------------------------
function renderResultStep(result, draft) {
  if (!result) return '<p class="govuk-body">Could not calculate result \u2014 please go back and ensure all criteria are scored.</p>';
  const meta = STATUS_META[result.status || STATUS.UNSCORED];
  const borderCol = result.isRedRated ? COLOUR.RED : result.isLegacy ? COLOUR.ORANGE : COLOUR.GREEN;
  return '<h2 class="govuk-heading-l">Assessment result</h2>'
    + '<p class="govuk-caption-m">' + esc(draft.name) + ' \u2014 ' + esc(draft.department) + '</p>'
    + '<div style="padding:1.5rem;background:' + COLOUR.GREY_BG + ';border-left:6px solid ' + borderCol + ';margin-bottom:2rem">'
    + '<p class="govuk-body govuk-!-margin-bottom-0"><strong>Overall risk score</strong></p>'
    + '<div style="font-size:3rem;font-weight:bold;color:' + (result.isRedRated ? COLOUR.RED : COLOUR.BLACK) + ';line-height:1.1;margin:0.25rem 0">' + result.overall + '</div>'
    + '<p class="govuk-body govuk-!-margin-bottom-2" style="color:' + COLOUR.GREY_TEXT + '">out of a maximum of ' + THRESHOLDS.maxOverall + '</p>'
    + '<strong class="govuk-tag ' + meta.tagClass + '" style="font-size:1rem;padding:6px 10px">' + meta.label + '</strong>'
    + '<p class="govuk-body govuk-!-margin-top-2 govuk-!-margin-bottom-0">' + meta.description + '</p></div>'
    + (result.isRedRated ? '<div class="govuk-warning-text"><span class="govuk-warning-text__icon" aria-hidden="true">!</span><strong class="govuk-warning-text__text"><span class="govuk-visually-hidden">Warning</span>This system is Red-Rated and must be added to the Legacy IT Asset Register.</strong></div>' : '')
    + '<dl class="govuk-summary-list" style="margin-bottom:2rem">'
    + '<div class="govuk-summary-list__row"><dt class="govuk-summary-list__key">Likelihood total</dt>'
    + '<dd class="govuk-summary-list__value">' + result.likelihood.total + ' <span class="govuk-body-s" style="color:' + COLOUR.GREY_TEXT + '">(mean ' + result.likelihood.mean + ', max ' + result.likelihood.max + ')</span></dd></div>'
    + '<div class="govuk-summary-list__row"><dt class="govuk-summary-list__key">Impact total</dt>'
    + '<dd class="govuk-summary-list__value">' + result.impact.total + ' <span class="govuk-body-s" style="color:' + COLOUR.GREY_TEXT + '">(mean ' + result.impact.mean + ', max ' + result.impact.max + ')</span></dd></div>'
    + '<div class="govuk-summary-list__row"><dt class="govuk-summary-list__key">Overall (Likelihood \u00d7 Impact)</dt>'
    + '<dd class="govuk-summary-list__value"><strong>' + result.likelihood.total + ' \u00d7 ' + result.impact.total + ' = ' + result.overall + '</strong></dd></div></dl>'
    + '<div class="govuk-button-group">'
    + '<button class="govuk-button" id="btn-save-system">Save to portfolio</button>'
    + '<button class="govuk-button govuk-button--secondary" id="btn-wizard-restart">Discard and start again</button></div>';
}

// ---------------------------------------------------------------------------
// Summary / check-your-answers page
// ---------------------------------------------------------------------------
function renderSummaryPage(sys, portfolioIdx) {
  const r    = sys.result || {};
  const meta = STATUS_META[r.status || STATUS.UNSCORED];
  const borderCol = r.isRedRated ? COLOUR.RED : r.isLegacy ? COLOUR.ORANGE : COLOUR.GREEN;

  function changeLink(step) {
    return '<a href="#" class="govuk-link" data-action="change-step" data-step="' + step + '" data-idx="' + portfolioIdx + '">Change</a>';
  }
  function scoreVal(scores, code, levels) {
    const score = scores && scores[code];
    if (!score) return '\u2014';
    const level = levels.find(function(l){ return l.score === score; });
    return score + ' \u2014 ' + (level ? level.label : '');
  }

  const lRows = LIKELIHOOD_CRITERIA.map(function(c, i) {
    var row = '<div class="govuk-summary-list__row">'
      + '<dt class="govuk-summary-list__key">' + c.code + ' \u2014 ' + c.name + '</dt>'
      + '<dd class="govuk-summary-list__value">' + scoreVal(sys.likelihoodScores, c.code, c.levels) + '</dd>'
      + '<dd class="govuk-summary-list__actions">' + changeLink(i + 2) + '</dd></div>';
    if (c.extraField && sys[c.extraField.key]) {
      row += '<div class="govuk-summary-list__row"><dt class="govuk-summary-list__key" style="padding-left:2em">\u21b3 ' + c.extraField.label + '</dt>'
        + '<dd class="govuk-summary-list__value">' + esc(sys[c.extraField.key]) + '</dd>'
        + '<dd class="govuk-summary-list__actions">' + changeLink(i + 2) + '</dd></div>';
    }
    return row;
  }).join('');

  const iRows = IMPACT_CRITERIA.map(function(c, i) {
    return '<div class="govuk-summary-list__row">'
      + '<dt class="govuk-summary-list__key">' + c.code + ' \u2014 ' + c.name + '</dt>'
      + '<dd class="govuk-summary-list__value">' + scoreVal(sys.impactScores, c.code, c.levels) + '</dd>'
      + '<dd class="govuk-summary-list__actions">' + changeLink(i + 9) + '</dd></div>';
  }).join('');

  const lTot  = r.likelihood ? r.likelihood.total : '\u2014';
  const lMean = r.likelihood ? r.likelihood.mean  : '\u2014';
  const lMax  = r.likelihood ? r.likelihood.max   : '\u2014';
  const iTot  = r.impact     ? r.impact.total      : '\u2014';
  const iMean = r.impact     ? r.impact.mean       : '\u2014';
  const iMax  = r.impact     ? r.impact.max        : '\u2014';

  return '<a href="#" class="govuk-back-link" id="btn-back-to-portfolio">Back to portfolio</a>'
    + '<h2 class="govuk-heading-l">' + esc(sys.name) + '</h2>'
    + '<div style="padding:1rem 1.5rem;background:#f3f2f1;border-left:6px solid ' + borderCol + ';margin-bottom:2rem">'
    + '<p class="govuk-body govuk-!-margin-bottom-1"><strong>Risk score: ' + (r.overall !== undefined ? r.overall : '\u2014') + ' / 30</strong></p>'
    + '<strong class="govuk-tag ' + meta.tagClass + '">' + meta.label + '</strong>'
    + '<p class="govuk-body-s govuk-!-margin-top-1 govuk-!-margin-bottom-0">' + meta.description + '</p></div>'
    + '<h3 class="govuk-heading-m">System details</h3>'
    + '<dl class="govuk-summary-list">'
    + '<div class="govuk-summary-list__row"><dt class="govuk-summary-list__key">Asset name</dt><dd class="govuk-summary-list__value">' + esc(sys.name) + '</dd><dd class="govuk-summary-list__actions">' + changeLink(1) + '</dd></div>'
    + '<div class="govuk-summary-list__row"><dt class="govuk-summary-list__key">Department</dt><dd class="govuk-summary-list__value">' + esc(sys.department) + '</dd><dd class="govuk-summary-list__actions">' + changeLink(1) + '</dd></div>'
    + '<div class="govuk-summary-list__row"><dt class="govuk-summary-list__key">Assessor</dt><dd class="govuk-summary-list__value">' + esc(sys.assessor) + '</dd><dd class="govuk-summary-list__actions">' + changeLink(1) + '</dd></div>'
    + '<div class="govuk-summary-list__row"><dt class="govuk-summary-list__key">System owner</dt><dd class="govuk-summary-list__value">' + esc(sys.systemOwner || '\u2014') + '</dd><dd class="govuk-summary-list__actions">' + changeLink(1) + '</dd></div>'
    + '<div class="govuk-summary-list__row"><dt class="govuk-summary-list__key">Date assessed</dt><dd class="govuk-summary-list__value">' + esc(sys.dateAssessed) + '</dd><dd class="govuk-summary-list__actions">' + changeLink(1) + '</dd></div>'
    + '<div class="govuk-summary-list__row"><dt class="govuk-summary-list__key">Description</dt><dd class="govuk-summary-list__value">' + esc(sys.description || '\u2014') + '</dd><dd class="govuk-summary-list__actions">' + changeLink(1) + '</dd></div>'
    + '<div class="govuk-summary-list__row"><dt class="govuk-summary-list__key">Legacy components</dt><dd class="govuk-summary-list__value">' + esc(sys.legacyComponents || '\u2014') + '</dd><dd class="govuk-summary-list__actions">' + changeLink(1) + '</dd></div>'
    + '<div class="govuk-summary-list__row"><dt class="govuk-summary-list__key">Services supported</dt><dd class="govuk-summary-list__value">' + esc(sys.services || '\u2014') + '</dd><dd class="govuk-summary-list__actions">' + changeLink(1) + '</dd></div>'
    + '</dl>'
    + '<h3 class="govuk-heading-m">Likelihood scores <span class="govuk-body-s" style="font-weight:normal">Total: ' + lTot + ' (mean ' + lMean + ', max ' + lMax + ')</span></h3>'
    + '<dl class="govuk-summary-list">' + lRows + '</dl>'
    + '<h3 class="govuk-heading-m">Impact scores <span class="govuk-body-s" style="font-weight:normal">Total: ' + iTot + ' (mean ' + iMean + ', max ' + iMax + ')</span></h3>'
    + '<dl class="govuk-summary-list">' + iRows + '</dl>'
    + '<h3 class="govuk-heading-m">Remediation</h3>'
    + '<dl class="govuk-summary-list">'
    + '<div class="govuk-summary-list__row"><dt class="govuk-summary-list__key">Remediation plan exists</dt><dd class="govuk-summary-list__value">' + esc(sys.hasRemediationPlan || '\u2014') + '</dd><dd class="govuk-summary-list__actions">' + changeLink(15) + '</dd></div>'
    + '<div class="govuk-summary-list__row"><dt class="govuk-summary-list__key">Remediation funded</dt><dd class="govuk-summary-list__value">' + esc(sys.remediationFunded || '\u2014') + '</dd><dd class="govuk-summary-list__actions">' + changeLink(15) + '</dd></div>'
    + '<div class="govuk-summary-list__row"><dt class="govuk-summary-list__key">Target resolution date</dt><dd class="govuk-summary-list__value">' + esc(sys.targetResolutionDate || '\u2014') + '</dd><dd class="govuk-summary-list__actions">' + changeLink(15) + '</dd></div>'
    + '<div class="govuk-summary-list__row"><dt class="govuk-summary-list__key">Estimated cost change</dt><dd class="govuk-summary-list__value">' + (sys.estimatedCostChange ? sys.estimatedCostChange + '%' : '\u2014') + '</dd><dd class="govuk-summary-list__actions">' + changeLink(15) + '</dd></div>'
    + '<div class="govuk-summary-list__row"><dt class="govuk-summary-list__key">Notes</dt><dd class="govuk-summary-list__value">' + esc(sys.notes || '\u2014') + '</dd><dd class="govuk-summary-list__actions">' + changeLink(15) + '</dd></div>'
    + '<div class="govuk-summary-list__row"><dt class="govuk-summary-list__key">Remediation milestones</dt><dd class="govuk-summary-list__value">' + esc(sys.remediationMilestones || '\u2014') + '</dd><dd class="govuk-summary-list__actions">' + changeLink(15) + '</dd></div>'
    + '</dl>'
    + '<div class="govuk-button-group govuk-!-margin-top-4">'
    + '<button class="govuk-button govuk-button--secondary" id="btn-back-to-portfolio-btn">Back to portfolio</button></div>';
}

// ---------------------------------------------------------------------------
// Shared chrome: progress bar + caption
// ---------------------------------------------------------------------------
function renderStepChrome(label, stepNum, returnToSummary) {
  const pct = Math.round((stepNum / TOTAL_WIZARD_STEPS) * 100);
  const editBadge = returnToSummary
    ? '<span style="background:#ffdd00;padding:1px 6px;font-weight:bold;font-size:0.875rem">Editing</span> '
    : '';
  return '<p class="govuk-caption-m govuk-!-margin-bottom-1" style="color:' + COLOUR.GREY_TEXT + '">'
    + editBadge + 'Step ' + stepNum + ' of ' + TOTAL_WIZARD_STEPS + ' \u2014 <strong>' + label + '</strong></p>'
    + '<div style="background:' + COLOUR.GREY_BG + ';height:6px;border-radius:3px;margin-bottom:1.5rem;overflow:hidden">'
    + '<div style="background:' + COLOUR.BLUE + ';width:' + pct + '%;height:6px;border-radius:3px"></div></div>';
}

function renderWizardFooter(stepNum, returnToSummary) {
  const nextLabel = returnToSummary ? 'Save and return to summary' : 'Next';
  const showBack  = stepNum > 1;
  return '<div class="govuk-button-group govuk-!-margin-top-4">'
    + (showBack ? '<button class="govuk-button govuk-button--secondary" id="btn-wizard-back">Back</button>' : '')
    + ' <button class="govuk-button" id="btn-wizard-next">' + nextLabel + '</button>'
    + (!returnToSummary ? ' <a href="#" class="govuk-link" id="btn-wizard-restart" style="margin-left:1rem">Discard and start again</a>' : '')
    + '</div>';
}

// ---------------------------------------------------------------------------
// TAB 2 — PORTFOLIO
// ---------------------------------------------------------------------------
function renderPortfolioTab(container, portfolio) {
  const isEmpty = portfolio.length === 0;
  container.innerHTML = '<h2 class="govuk-heading-m">Your portfolio</h2>'
    + '<div class="govuk-button-group app-portfolio-actions">'
    + '<button class="govuk-button govuk-button--secondary" id="btn-save-session">Save session (JSON)</button>'
    + '<button class="govuk-button govuk-button--secondary" id="btn-load-session">Load session (JSON)</button>'
    + '<button class="govuk-button govuk-button--secondary" id="btn-export-csv"' + (isEmpty ? ' disabled aria-disabled="true"' : '') + '>Export CSV</button>'
    + '</div>'
    + (isEmpty ? renderEmptyPortfolio() : renderPortfolioTable(portfolio))
    + (!isEmpty ? renderRiskMatrix(portfolio) : '');
}

function renderEmptyPortfolio() {
  return '<div class="app-empty-state"><h3 class="govuk-heading-s">No systems assessed yet</h3>'
    + '<p class="govuk-body">Go to the <strong>Assess a system</strong> tab, complete the assessment, and save to portfolio.</p></div>';
}

function renderPortfolioTable(portfolio) {
  const rows = portfolio.map(function(sys, idx) {
    const r = sys.result || {};
    const statusMeta = STATUS_META[r.status || STATUS.UNSCORED];
    const rowClass = r.isRedRated ? 'app-row--red-rated' : r.isLegacy ? 'app-row--legacy' : '';
    return '<tr class="govuk-table__row ' + rowClass + '">'
      + '<td class="govuk-table__cell">'
      + '<a href="#" class="govuk-link" data-action="view" data-idx="' + idx + '"><strong>' + esc(sys.name) + '</strong></a>'
      + '<br><span class="govuk-body-s">' + esc(sys.department) + '</span></td>'
      + '<td class="govuk-table__cell">' + (r.likelihood ? r.likelihood.total : '\u2014') + '</td>'
      + '<td class="govuk-table__cell">' + (r.impact ? r.impact.total : '\u2014') + '</td>'
      + '<td class="govuk-table__cell"><strong>' + (r.overall !== undefined ? r.overall : '\u2014') + '</strong></td>'
      + '<td class="govuk-table__cell">' + (r.isLegacy ? 'Yes' : (r.allScored ? 'No' : '\u2014')) + '</td>'
      + '<td class="govuk-table__cell"><strong class="govuk-tag ' + statusMeta.tagClass + '">' + statusMeta.label + '</strong></td>'
      + '<td class="govuk-table__cell">'
      + '<div style="display:flex;flex-direction:column;gap:0.5rem;align-items:flex-start">'
      + '<button class="govuk-button govuk-button--secondary govuk-!-margin-bottom-0 govuk-!-font-size-16" data-action="view" data-idx="' + idx + '">View / Edit</button>'
      + '<button class="govuk-button govuk-button--warning govuk-!-margin-bottom-0 govuk-!-font-size-16" data-action="remove" data-idx="' + idx + '">Remove</button>'
      + '</div>'
      + '</td></tr>';
  }).join('');
  return '<div style="overflow-x:auto"><table class="govuk-table" id="portfolio-table">'
    + '<caption class="govuk-table__caption govuk-table__caption--s">'
    + portfolio.length + ' system' + (portfolio.length !== 1 ? 's' : '') + ' assessed</caption>'
    + '<thead class="govuk-table__head"><tr class="govuk-table__row">'
    + '<th class="govuk-table__header" scope="col">Asset</th>'
    + '<th class="govuk-table__header" scope="col">Likelihood total</th>'
    + '<th class="govuk-table__header" scope="col">Impact total</th>'
    + '<th class="govuk-table__header" scope="col">Overall <span class="govuk-body-s">(max ' + THRESHOLDS.maxOverall + ')</span></th>'
    + '<th class="govuk-table__header" scope="col">Legacy</th>'
    + '<th class="govuk-table__header" scope="col">Status</th>'
    + '<th class="govuk-table__header" scope="col">Actions</th>'
    + '</tr></thead><tbody class="govuk-table__body">' + rows + '</tbody></table></div>'
    + '<p class="govuk-body-s" style="margin-top:0.5rem">'
    + '<span style="background:' + COLOUR.ZONE_MEDIUM + ';color:#fff;padding:2px 7px;border-radius:2px">Medium</span> &nbsp;'
    + '<span style="background:' + COLOUR.ZONE_HIGH + ';color:#fff;padding:2px 7px;border-radius:2px">High</span> &nbsp;'
    + '<span style="background:' + COLOUR.ZONE_RED + ';color:#fff;padding:2px 7px;border-radius:2px">Red-Rated</span>'
    + ' &nbsp;<span style="color:' + COLOUR.GREY_TEXT + '">(based on overall score: Medium \u2265' + THRESHOLDS.mediumMinScore + ', High \u2265' + THRESHOLDS.highMinScore + ', Red-Rated \u2265' + THRESHOLDS.redRatedMinScore + ')</span></p>';
}

function renderRiskMatrix(portfolio) {
  // SVG viewport dimensions in pixels.
  const W = 560, H = 440;
  // Plot margins — ml left (space for Y-axis labels), mt top (title), mr/mb minimal.
  const ml = 65, mr = 20, mt = 50, mb = 58;
  // Usable plot area after subtracting margins.
  const pw = W - ml - mr, ph = H - mt - mb;
  // Score ranges: Likelihood 1–6, Impact 1–5 (matching criteria in data.js).
  const L_MIN = 1, L_MAX = 6, I_MIN = 1, I_MAX = 5;

  function toX(l) { return ml + ((l - L_MIN) / (L_MAX - L_MIN)) * pw; }
  function toY(i) { return H - mb - ((i - I_MIN) / (I_MAX - I_MIN)) * ph; }

  // Build an SVG polygon string for the zone where Likelihood × Impact ≥ T.
  // The boundary L × I = T is a hyperbola. We trace it across the plot area
  // from its entry point to its exit point, then close the polygon along the
  // plot borders so the entire high-score region is filled.
  //
  // Entry: top edge if T / I_MAX is within [L_MIN, L_MAX] ("topEntry" = true),
  //        otherwise left edge at I = T / L_MIN.
  // Exit:  right edge if T / L_MAX ≥ I_MIN ("rightExit" = true),
  //        otherwise bottom edge at L = T / I_MIN.
  // Returns '' if the threshold hyperbola lies entirely outside the plot area.
  function zonePoly(T) {
    const N = 80;
    const topEntry = (T / I_MAX >= L_MIN);
    const L_entry = topEntry ? T / I_MAX : L_MIN;
    const I_entry = topEntry ? I_MAX : Math.min(I_MAX, T / L_MIN);
    if (topEntry && L_entry > L_MAX) return '';
    if (!topEntry && I_entry < I_MIN) return '';
    const rightExit = (T / L_MAX >= I_MIN);
    const L_exit = rightExit ? L_MAX : Math.min(L_MAX, T / I_MIN);
    const I_exit = rightExit ? T / L_MAX : I_MIN;
    if (!rightExit && L_exit < L_MIN) return '';

    const pts = [];
    if (!topEntry) pts.push([L_MIN, I_MAX]);   // top-left corner
    pts.push([L_MAX, I_MAX]);                   // top-right corner
    pts.push([L_MAX, I_exit]);                  // down right edge
    if (!rightExit) pts.push([L_exit, I_MIN]);  // along bottom edge

    // Trace hyperbola from exit back to entry (right-to-left = increasing I)
    for (let n = 0; n <= N; n++) {
      let l = L_exit - (n / N) * (L_exit - L_entry);
      l = Math.max(L_MIN, Math.min(L_MAX, l));
      const i = Math.max(I_MIN, Math.min(I_MAX, T / l));
      pts.push([l, i]);
    }
    if (!topEntry) pts.push([L_MIN, I_entry]);  // up left edge to close

    return pts.map(function(p) {
      return toX(p[0]).toFixed(1) + ',' + toY(p[1]).toFixed(1);
    }).join(' ');
  }

  const xGrid = [1,2,3,4,5,6].map(function(l) {
    const x = toX(l);
    return '<line x1="'+x+'" y1="'+mt+'" x2="'+x+'" y2="'+(H-mb)+'" stroke="rgba(255,255,255,0.5)" stroke-width="0.8"/>'
      + '<text x="'+x+'" y="'+(H-mb+18)+'" text-anchor="middle" class="rml">'+l+'</text>';
  }).join('');
  const yGrid = [1,2,3,4,5].map(function(i) {
    const y = toY(i);
    return '<line x1="'+ml+'" y1="'+y+'" x2="'+(W-mr)+'" y2="'+y+'" stroke="rgba(255,255,255,0.5)" stroke-width="0.8"/>'
      + '<text x="'+(ml-8)+'" y="'+(y+4)+'" text-anchor="end" class="rml">'+i+'</text>';
  }).join('');

  // Colour palette for system dots — cycles through for portfolios with many systems.
  const DOT_COLOURS = ['#003078','#00703c','#4c2c92','#6f3605','#28a197','#912b88'];

  // Pre-filter to only fully-scored systems so dot numbers match legend row numbers.
  const scoredSystems = portfolio.filter(function(sys) {
    return sys.result && sys.result.allScored;
  });

  // Render numbered dots (pass 1) and tooltip hover-targets (pass 2) as separate layers
  // so tooltips always paint above all dots regardless of document order.
  function buildSystemDots() {
    // Pass 1 — visible circles + index numbers only.
    const circles = scoredSystems.map(function(sys, idx) {
      const res = sys.result;
      const cx = toX(res.likelihood.total), cy = toY(res.impact.total);
      const col = DOT_COLOURS[idx % DOT_COLOURS.length];
      const num = String(idx + 1);
      const cr = num.length > 1 ? 11 : 9;
      return '<circle cx="' + cx.toFixed(1) + '" cy="' + cy.toFixed(1) + '" r="' + cr
        + '" fill="' + col + '" stroke="#fff" stroke-width="2"/>'
        + '<text x="' + cx.toFixed(1) + '" y="' + (cy + 4).toFixed(1) + '" text-anchor="middle"'
        + ' style="font-size:9px;font-weight:bold;fill:#fff;pointer-events:none">' + num + '</text>';
    }).join('');

    // Pass 2 — invisible hit-target circles + tooltip panels, rendered after all circles
    // so they sit on top in SVG z-order.
    const tips = scoredSystems.map(function(sys, idx) {
      const res = sys.result;
      const cx = toX(res.likelihood.total), cy = toY(res.impact.total);
      const col = DOT_COLOURS[idx % DOT_COLOURS.length];
      const num = String(idx + 1);
      const cr = num.length > 1 ? 11 : 9;

      const ttW = 224, ttH = 46, ttPad = 7;
      const ttX = (cx + cr + 10 + ttW) > (W - mr) ? cx - cr - 12 - ttW : cx + cr + 10;
      const ttY = Math.max(mt + 2, Math.min(H - mb - ttH - 2, cy - ttH / 2));
      const ttName = sys.name.length > 33 ? sys.name.slice(0, 32) + '\u2026' : sys.name;
      const ttScore = 'L\u2009' + res.likelihood.total + '\u2002\u2022\u2002I\u2009' + res.impact.total + '\u2002\u2022\u2002Overall\u2009' + res.overall;

      return '<g role="img" aria-label="' + esc(sys.name) + '" class="rm-dot" tabindex="0">'
        + '<circle cx="' + cx.toFixed(1) + '" cy="' + cy.toFixed(1) + '" r="' + cr + '" fill="transparent" stroke="none"/>'
        + '<g class="rm-tip">'
        + '<rect x="' + ttX.toFixed(1) + '" y="' + ttY.toFixed(1) + '" width="' + ttW + '" height="' + ttH
        + '" rx="3" fill="#0b0c0c" opacity="0.92"/>'
        + '<text x="' + (ttX + ttPad).toFixed(1) + '" y="' + (ttY + 16).toFixed(1)
        + '" style="font-size:11px;font-weight:bold;fill:#fff">' + esc(ttName) + '</text>'
        + '<text x="' + (ttX + ttPad).toFixed(1) + '" y="' + (ttY + 34).toFixed(1)
        + '" style="font-size:10px;fill:#ccc">' + esc(ttScore) + '</text>'
        + '</g>'
        + '<title>' + esc(sys.name) + ' \u2014 Likelihood: ' + res.likelihood.total + ', Impact: ' + res.impact.total + ', Overall: ' + res.overall + '</title>'
        + '</g>';
    }).join('');

    return '<g>' + circles + '</g><g>' + tips + '</g>';
  }

  // Legend table rendered below the SVG mapping dot numbers to system names.
  function buildLegend() {
    if (scoredSystems.length === 0) return '';
    const rows = scoredSystems.map(function(sys, idx) {
      const res = sys.result;
      const col = DOT_COLOURS[idx % DOT_COLOURS.length];
      const statusMeta = STATUS_META[res.status || STATUS.UNSCORED];
      return '<tr class="govuk-table__row">'
        + '<td class="govuk-table__cell" style="width:2.5rem;vertical-align:middle;padding-top:6px;padding-bottom:6px">'
        + '<span style="display:inline-flex;align-items:center;justify-content:center;'
        + 'width:22px;height:22px;border-radius:50%;background:' + col + ';color:#fff;font-size:11px;font-weight:bold">'
        + String(idx + 1) + '</span></td>'
        + '<td class="govuk-table__cell" style="padding-top:6px;padding-bottom:6px">' + esc(sys.name) + '</td>'
        + '<td class="govuk-table__cell" style="text-align:right;padding-top:6px;padding-bottom:6px">' + res.likelihood.total + '</td>'
        + '<td class="govuk-table__cell" style="text-align:right;padding-top:6px;padding-bottom:6px">' + res.impact.total + '</td>'
        + '<td class="govuk-table__cell" style="text-align:right;padding-top:6px;padding-bottom:6px"><strong>' + res.overall + '</strong></td>'
        + '<td class="govuk-table__cell" style="padding-top:6px;padding-bottom:6px"><strong class="govuk-tag ' + statusMeta.tagClass + '">' + statusMeta.label + '</strong></td>'
        + '</tr>';
    }).join('');
    return '<details class="govuk-details govuk-!-margin-top-3" open>'
      + '<summary class="govuk-details__summary"><span class="govuk-details__summary-text">System key \u2014 ' + scoredSystems.length + ' system' + (scoredSystems.length !== 1 ? 's' : '') + ' plotted</span></summary>'
      + '<div class="govuk-details__text govuk-!-padding-top-2"><div style="overflow-x:auto">'
      + '<table class="govuk-table govuk-!-margin-bottom-0" style="font-size:14px">'
      + '<thead class="govuk-table__head"><tr class="govuk-table__row">'
      + '<th class="govuk-table__header" scope="col" style="width:2.5rem">#</th>'
      + '<th class="govuk-table__header" scope="col">System name</th>'
      + '<th class="govuk-table__header" scope="col" style="text-align:right">Likelihood</th>'
      + '<th class="govuk-table__header" scope="col" style="text-align:right">Impact</th>'
      + '<th class="govuk-table__header" scope="col" style="text-align:right">Overall</th>'
      + '<th class="govuk-table__header" scope="col">Status</th>'
      + '</tr></thead>'
      + '<tbody class="govuk-table__body">' + rows + '</tbody>'
      + '</table></div></div></details>';
  }

  const medPts  = zonePoly(THRESHOLDS.mediumMinScore);
  const highPts = zonePoly(THRESHOLDS.highMinScore);
  const redPts  = zonePoly(THRESHOLDS.redRatedMinScore);
  const dots = buildSystemDots();
  const legend = buildLegend();

  return '<h3 class="govuk-heading-s govuk-!-margin-top-4">Risk matrix</h3>'
    + '<div class="app-risk-matrix-container">'
    + '<svg viewBox="0 0 '+W+' '+H+'" xmlns="http://www.w3.org/2000/svg"'
    + ' style="font-family:GDS Transport,arial,sans-serif;display:block;width:100%">'
    + '<style>'
    + '.rml{font-size:11px;fill:#444}.rmtitle{font-size:13px;fill:#111;font-weight:bold}.rmaxis{font-size:12px;fill:#111;font-weight:bold}'
    + '.rm-dot{cursor:pointer}.rm-tip{visibility:hidden;pointer-events:none}'
    + '.rm-dot:hover .rm-tip,.rm-dot:focus .rm-tip{visibility:visible}'
    + '</style>'
    // Plot background
    + '<rect x="'+ml+'" y="'+mt+'" width="'+pw+'" height="'+ph+'" fill="#f0f0f0"/>'
    // Zones — painted back to front (medium first, red last)
    + (medPts  ? '<polygon points="'+medPts+'"  fill="' + COLOUR.ZONE_MEDIUM + '" opacity="0.85"/>' : '')
    + (highPts ? '<polygon points="'+highPts+'" fill="' + COLOUR.ZONE_HIGH + '" opacity="0.90"/>' : '')
    + (redPts  ? '<polygon points="'+redPts+'"  fill="' + COLOUR.ZONE_RED + '" opacity="0.95"/>' : '')
    + xGrid + yGrid
    // Axes
    + '<line x1="'+ml+'" y1="'+mt+'" x2="'+ml+'" y2="'+(H-mb)+'" stroke="#333" stroke-width="1.5"/>'
    + '<line x1="'+ml+'" y1="'+(H-mb)+'" x2="'+(W-mr)+'" y2="'+(H-mb)+'" stroke="#333" stroke-width="1.5"/>'
    // Title
    + '<text x="'+(ml+pw/2).toFixed(0)+'" y="'+(mt-14)+'" text-anchor="middle" class="rmtitle">Legacy Risk Assessment</text>'
    // Axis labels
    + '<text x="'+(ml+pw/2).toFixed(0)+'" y="'+(H-6)+'" text-anchor="middle" class="rmaxis">Likelihood Score</text>'
    + '<text transform="rotate(-90)" x="'+(-(mt+ph/2)).toFixed(0)+'" y="14" text-anchor="middle" class="rmaxis">Impact Score</text>'
    // Zone labels
    + '<text x="'+toX(1.35).toFixed(1)+'" y="'+toY(4.72).toFixed(1)+'" style="font-size:10px;font-weight:bold;fill:#6b3a00">Medium</text>'
    + '<text x="'+toX(2.85).toFixed(1)+'" y="'+toY(4.72).toFixed(1)+'" style="font-size:10px;font-weight:bold;fill:#fff">High</text>'
    + '<text x="'+toX(4.6).toFixed(1)+'"  y="'+toY(4.72).toFixed(1)+'" style="font-size:10px;font-weight:bold;fill:#fff">Red-Rated</text>'
    + dots
    + '</svg></div>'
    + legend;
}

// ---------------------------------------------------------------------------
// TAB 3 — GUIDANCE
// ---------------------------------------------------------------------------
function renderGuidanceTab(container) {
  function li(items) { return items.map(function(i){ return '<li>'+i+'</li>'; }).join(''); }

  // Worked example data — fictional system from the guidance (scores as per spec)
  const exampleLScores = { L1:5, L2:5, L3:5, L4:5, L5:6, L6:6, L7:6 };
  const exampleIScores = { C1:5, C2:5, C3:2, C4:5, C5:5, C6:4 };
  const exampleLRows = LIKELIHOOD_CRITERIA.map(function(c) {
    return '<tr class="govuk-table__row"><td class="govuk-table__cell">' + c.code + '</td>'
      + '<td class="govuk-table__cell">' + c.name + '</td>'
      + '<td class="govuk-table__cell govuk-!-text-align-right">' + exampleLScores[c.code] + '</td></tr>';
  }).join('');
  const exampleIRows = IMPACT_CRITERIA.map(function(c) {
    return '<tr class="govuk-table__row"><td class="govuk-table__cell">' + c.code + '</td>'
      + '<td class="govuk-table__cell">' + c.name + '</td>'
      + '<td class="govuk-table__cell govuk-!-text-align-right">' + exampleIScores[c.code] + '</td></tr>';
  }).join('');

  container.innerHTML = '<h2 class="govuk-heading-m">Guidance</h2>'
    + '<p class="govuk-body">All content from the '
    + '<a class="govuk-link" href="https://www.gov.uk/government/publications/guidance-on-the-legacy-it-risk-assessment-framework" target="_blank" rel="noopener noreferrer">GOV.UK Legacy IT Risk Assessment Framework guidance</a>'
    + ' (updated 13 March 2025) is reproduced below.</p>'
    + '<div class="govuk-accordion" data-module="govuk-accordion" id="guidance-accordion">'
    + accordionSection('guidance-1','What is legacy IT?',
        '<p class="govuk-body">\u2018Legacy IT\u2019 refers to outdated and often obsolete technology systems, software and hardware that have been in use for a considerable period.</p>'
        + '<h4 class="govuk-heading-s">Indicators a system is legacy</h4>'
        + '<ul class="govuk-list govuk-list--bullet">' + li(LEGACY_INDICATORS) + '</ul>')
    + accordionSection('guidance-2','What is the Legacy IT Risk Assessment Framework?',
        '<p class="govuk-body">The framework provides a structured approach for evaluating and prioritising the risks associated with outdated IT systems within government departments.</p>'
        + '<h4 class="govuk-heading-s">What does \u2018Red-Rated\u2019 mean?</h4>'
        + '<p class="govuk-body">A red-rated system has an <strong>overall risk score of 16 or above</strong> (out of a maximum of 30). Red-rated systems must have agreed remediation plans and be registered on the Legacy IT Asset Register.</p>')
    + accordionSection('guidance-3','How to use the framework',
        '<p class="govuk-body">Assessments cover an assumed <strong>3-year period</strong>.</p>'
        + '<ol class="govuk-list govuk-list--number">'
        + '<li><strong>Identification</strong> \u2014 identify the system and confirm it shows legacy indicators.</li>'
        + '<li><strong>Likelihood assessment</strong> \u2014 score each of the 7 Likelihood criteria (L1\u2013L7) using the 1\u20136 scale. A score of 3 or above classifies the system as Legacy.</li>'
        + '<li><strong>Impact assessment</strong> \u2014 score each of the 6 Impact criteria (C1\u2013C6) using the 1\u20135 scale.</li>'
        + '<li><strong>Aggregate scores</strong> \u2014 for each category: <em>total = (mean + max) \u00f7 2</em>. Then multiply Likelihood total \u00d7 Impact total.</li>'
        + '<li><strong>Risk categorisation</strong> \u2014 overall \u2265 16: Red-Rated. Any single L score \u2265 3 but overall &lt; 16: Legacy. Otherwise: Not Legacy.</li>'
        + '<li><strong>Submit assessments</strong> \u2014 all ministerial departments must submit assessments annually.</li>'
        + '</ol>'
        + '<div class="govuk-inset-text">'
        + '<p class="govuk-body govuk-!-margin-bottom-1"><strong>Likelihood total</strong> = (mean of L1\u2013L7 + max of L1\u2013L7) \u00f7 2</p>'
        + '<p class="govuk-body govuk-!-margin-bottom-1"><strong>Impact total</strong> = (mean of C1\u2013C6 + max of C1\u2013C6) \u00f7 2</p>'
        + '<p class="govuk-body govuk-!-margin-bottom-0"><strong>Overall risk score</strong> = Likelihood total \u00d7 Impact total (max = 30)</p>'
        + '</div>')
    + accordionSection('guidance-4','Full scoring tables \u2014 Likelihood (L1\u2013L7)',renderCriteriaTable(LIKELIHOOD_CRITERIA, 6))
    + accordionSection('guidance-5','Full scoring tables \u2014 Impact (C1\u2013C6)',renderCriteriaTable(IMPACT_CRITERIA, 5))
    + accordionSection('guidance-6','Worked example \u2014 HR Management Plus',
        renderWorkedExampleSection(exampleLRows, exampleIRows))
    + accordionSection('guidance-7','Legacy IT Asset Register',
        '<p class="govuk-body">All ministerial departments are mandated to provide all legacy IT assessments each year.</p>'
        + '<p class="govuk-body">Contact: <a class="govuk-link" href="mailto:technology.management@digital.cabinet-office.gov.uk">technology.management@digital.cabinet-office.gov.uk</a></p>')
    + accordionSection('guidance-8','Best practice for treating legacy systems',
        '<ul class="govuk-list govuk-list--bullet">'
        + '<li><strong>Assessment and prioritisation</strong> \u2014 prioritise Red-Rated for immediate action.</li>'
        + '<li><strong>Modernisation and migration</strong> \u2014 consider migrating critical systems to current cloud technologies.</li>'
        + '<li><strong>Security enhancement</strong> \u2014 implement firewall protection, intrusion detection and regular vulnerability assessments.</li>'
        + '<li><strong>Isolation and segmentation</strong> \u2014 isolate legacy systems and enforce strict access controls.</li>'
        + '<li><strong>Regular patching</strong> \u2014 establish a routine schedule for applying patches and security fixes.</li>'
        + '<li><strong>Backup and disaster recovery</strong> \u2014 implement comprehensive recovery plans.</li>'
        + '<li><strong>Documentation</strong> \u2014 maintain a knowledge repository so critical knowledge is not lost due to staff turnover.</li>'
        + '<li><strong>Monitoring and incident response</strong> \u2014 develop incident response plans specific to legacy systems.</li>'
        + '</ul>')
    + '</div>';
}

// Builds the HTML body for the 'Worked example' accordion section.
// Kept separate from renderGuidanceTab to reduce its line count.
function renderWorkedExampleSection(exampleLRows, exampleIRows) {
  return '<p class="govuk-body">This fictional example is taken directly from the guidance. It shows how to apply the framework from initial scores through to a final risk classification.</p>'
    + '<dl class="govuk-summary-list govuk-summary-list--no-border govuk-!-margin-bottom-4">'
    + '<div class="govuk-summary-list__row"><dt class="govuk-summary-list__key">Department</dt><dd class="govuk-summary-list__value">Ministry of Space Transport Infrastructure</dd></div>'
    + '<div class="govuk-summary-list__row"><dt class="govuk-summary-list__key">System</dt><dd class="govuk-summary-list__value">HR Management Plus</dd></div>'
    + '</dl>'

    + '<h4 class="govuk-heading-s">Step 1 &mdash; Score the Likelihood criteria (L1&ndash;L7)</h4>'
    + '<p class="govuk-body">Each criterion is scored from 1 (lowest) to 6 (highest). Any single score of 3 or above classifies the system as Legacy.</p>'
    + '<table class="govuk-table govuk-!-margin-bottom-2">'
    + '<thead class="govuk-table__head"><tr class="govuk-table__row">'
    + '<th class="govuk-table__header">Criterion</th>'
    + '<th class="govuk-table__header">Name</th>'
    + '<th class="govuk-table__header govuk-!-text-align-right">Score</th>'
    + '</tr></thead>'
    + '<tbody class="govuk-table__body">'
    + exampleLRows
    + '</tbody></table>'

    + '<h4 class="govuk-heading-s">Step 2 &mdash; Calculate the Likelihood total</h4>'
    + '<p class="govuk-body">The formula is: <strong>Likelihood total = (mean of L1&ndash;L7 + max of L1&ndash;L7) &divide; 2</strong></p>'
    + '<div class="govuk-inset-text govuk-!-margin-bottom-4">'
    + '<p class="govuk-body govuk-!-margin-bottom-1">Sum of scores = 5 + 5 + 5 + 5 + 6 + 6 + 6 = <strong>38</strong></p>'
    + '<p class="govuk-body govuk-!-margin-bottom-1">Mean = 38 &divide; 7 = <strong>5.43</strong></p>'
    + '<p class="govuk-body govuk-!-margin-bottom-1">Max = <strong>6</strong></p>'
    + '<p class="govuk-body govuk-!-margin-bottom-0">Likelihood total = (5.43 + 6) &divide; 2 = <strong>5.71</strong></p>'
    + '</div>'

    + '<h4 class="govuk-heading-s">Step 3 &mdash; Score the Impact criteria (C1&ndash;C6)</h4>'
    + '<p class="govuk-body">Each criterion is scored from 1 (lowest) to 5 (highest).</p>'
    + '<table class="govuk-table govuk-!-margin-bottom-2">'
    + '<thead class="govuk-table__head"><tr class="govuk-table__row">'
    + '<th class="govuk-table__header">Criterion</th>'
    + '<th class="govuk-table__header">Name</th>'
    + '<th class="govuk-table__header govuk-!-text-align-right">Score</th>'
    + '</tr></thead>'
    + '<tbody class="govuk-table__body">'
    + exampleIRows
    + '</tbody></table>'

    + '<h4 class="govuk-heading-s">Step 4 &mdash; Calculate the Impact total</h4>'
    + '<p class="govuk-body">The formula is: <strong>Impact total = (mean of C1&ndash;C6 + max of C1&ndash;C6) &divide; 2</strong></p>'
    + '<div class="govuk-inset-text govuk-!-margin-bottom-4">'
    + '<p class="govuk-body govuk-!-margin-bottom-1">Sum of scores = 5 + 5 + 2 + 5 + 5 + 4 = <strong>26</strong></p>'
    + '<p class="govuk-body govuk-!-margin-bottom-1">Mean = 26 &divide; 6 = <strong>4.33</strong></p>'
    + '<p class="govuk-body govuk-!-margin-bottom-1">Max = <strong>5</strong></p>'
    + '<p class="govuk-body govuk-!-margin-bottom-0">Impact total = (4.33 + 5) &divide; 2 = <strong>4.67</strong></p>'
    + '</div>'

    + '<h4 class="govuk-heading-s">Step 5 &mdash; Calculate the overall risk score</h4>'
    + '<p class="govuk-body">The formula is: <strong>Overall = Likelihood total &times; Impact total</strong> (maximum possible = 30)</p>'
    + '<div class="govuk-inset-text govuk-!-margin-bottom-4">'
    + '<p class="govuk-body govuk-!-margin-bottom-0">Overall = 5.71 &times; 4.67 = <strong>26.67</strong></p>'
    + '</div>'

    + '<h4 class="govuk-heading-s">Step 6 &mdash; Classify the system</h4>'
    + '<table class="govuk-table govuk-!-margin-bottom-2">'
    + '<thead class="govuk-table__head"><tr class="govuk-table__row">'
    + '<th class="govuk-table__header">Rule</th>'
    + '<th class="govuk-table__header">Condition</th>'
    + '<th class="govuk-table__header">This system</th>'
    + '<th class="govuk-table__header">Result</th>'
    + '</tr></thead>'
    + '<tbody class="govuk-table__body">'
    + '<tr class="govuk-table__row"><td class="govuk-table__cell">Red-Rated</td><td class="govuk-table__cell">Overall &ge; 16</td><td class="govuk-table__cell">26.67 &ge; 16 &mdash; <strong>yes</strong></td><td class="govuk-table__cell"><strong class="govuk-tag govuk-tag--red">Red-Rated</strong></td></tr>'
    + '<tr class="govuk-table__row"><td class="govuk-table__cell">Legacy</td><td class="govuk-table__cell">Any single L score &ge; 3</td><td class="govuk-table__cell">All L scores &ge; 5</td><td class="govuk-table__cell"><strong class="govuk-tag govuk-tag--orange">Legacy</strong> (also applies)</td></tr>'
    + '</tbody></table>'
    + '<p class="govuk-body">Because the overall score of 26.67 meets the Red-Rated threshold (16+), this system is classified as <strong>Red-Rated</strong> and must have an agreed remediation plan and be registered on the Legacy IT Asset Register.</p>';
}

function renderCriteriaTable(criteria, maxScore) {
  const scores = [];
  for (let s = maxScore; s >= 1; s--) scores.push(s);
  const minWidth = maxScore === 6 ? '900px' : '800px';
  const headers = ['Score', 'Level'].concat(criteria.map(function(c) { return c.code + ': ' + c.name; }));
  const rows = scores.map(function(score) {
    const lv0 = criteria[0].levels.find(function(l) { return l.score === score; });
    const label = lv0 ? lv0.label : '';
    const cells = criteria.map(function(c) {
      const lv = c.levels.find(function(l) { return l.score === score; });
      return '<td class="govuk-table__cell" style="font-size:0.8rem">' + (lv ? lv.descriptor : '') + '</td>';
    }).join('');
    return '<tr class="govuk-table__row"><td class="govuk-table__cell"><strong>' + score + '</strong></td><td class="govuk-table__cell">' + label + '</td>' + cells + '</tr>';
  }).join('');
  const ths = headers.map(function(h) { return '<th class="govuk-table__header" scope="col" style="font-size:0.8rem;min-width:8em">' + h + '</th>'; }).join('');
  return '<div style="overflow-x:auto"><table class="govuk-table" style="min-width:' + minWidth + '"><thead class="govuk-table__head"><tr class="govuk-table__row">'
    + ths + '</tr></thead><tbody class="govuk-table__body">' + rows + '</tbody></table></div>';
}

function accordionSection(id, heading, content) {
  return '<div class="govuk-accordion__section">'
    + '<div class="govuk-accordion__section-header">'
    + '<h3 class="govuk-accordion__section-heading">'
    + '<span class="govuk-accordion__section-button" id="' + id + '-heading">' + heading + '</span>'
    + '</h3></div>'
    + '<div id="' + id + '-content" class="govuk-accordion__section-content" aria-labelledby="' + id + '-heading" role="region">'
    + content + '</div></div>';
}

function esc(str) {
  return String(str === null || str === undefined ? '' : str)
    .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

// ---------------------------------------------------------------------------
// Helpers for criterion extra data fields
// ---------------------------------------------------------------------------
function renderExamplesPanel(criterion) {
  if (!criterion.examples || !criterion.examples.length) return '';
  return '<details class="govuk-details" style="margin-bottom:1rem">'
    + '<summary class="govuk-details__summary">'
    + '<span class="govuk-details__summary-text">What to look for when scoring ' + criterion.code + '</span></summary>'
    + '<div class="govuk-details__text"><ul class="govuk-list govuk-list--bullet">'
    + criterion.examples.map(function(ex){ return '<li>' + ex + '</li>'; }).join('')
    + '</ul></div></details>';
}

function renderExtraField(criterion, draft) {
  if (!criterion.extraField) return '';
  var ef = criterion.extraField;
  var currentVal = draft[ef.key] || '';
  var html = '<div class="govuk-form-group" style="margin-top:1.5rem">'
    + '<label class="govuk-label govuk-label--s" for="ef-' + ef.key + '">' + ef.label + '</label>';
  if (ef.hint) html += '<div class="govuk-hint">' + ef.hint + '</div>';
  if (ef.type === 'select') {
    html += '<select class="govuk-select" id="ef-' + ef.key + '" name="ef-' + ef.key + '">';
    ef.options.forEach(function(opt) {
      html += '<option value="' + esc(opt.value) + '"' + (currentVal === opt.value ? ' selected' : '') + '>' + esc(opt.label) + '</option>';
    });
    html += '</select>';
  } else if (ef.type === 'textarea') {
    html += '<textarea class="govuk-textarea" id="ef-' + ef.key + '" name="ef-' + ef.key + '" rows="' + (ef.rows || 2) + '">' + esc(currentVal) + '</textarea>';
  } else {
    html += '<input class="govuk-input ' + (ef.inputClass || '') + '" id="ef-' + ef.key + '" name="ef-' + ef.key + '" type="' + ef.type + '" value="' + esc(currentVal) + '"';
    if (ef.min !== undefined) html += ' min="' + ef.min + '"';
    if (ef.max !== undefined) html += ' max="' + ef.max + '"';
    html += '>';
  }
  html += '</div>';
  return html;
}

// ===== app.js =====
/**
 * app.js — wizard version
 * Controls wizard navigation, localStorage draft, portfolio and tabs.
 */





// ---------------------------------------------------------------------------
// State
// ---------------------------------------------------------------------------
let wizardStep               = 0;
let wizardDraft              = emptyDraft();
let editingPortfolioIdx      = -1;
let returnToSummaryAfterStep = false;
let portfolio                = [];
const DRAFT_KEY                  = 'legacy-it-wizard-draft';
const PORTFOLIO_KEY              = 'legacy-it-portfolio';
const NOTIFICATION_DURATION_MS   = 4000;

// ---------------------------------------------------------------------------
// Empty draft object
// ---------------------------------------------------------------------------
function emptyDraft() {
  const lScores = {};
  const iScores = {};
  LIKELIHOOD_CRITERIA.forEach(function(c){ lScores[c.code] = 0; });
  IMPACT_CRITERIA.forEach(function(c){ iScores[c.code] = 0; });
  return {
    name: '', department: '', assessor: '', systemOwner: '', dateAssessed: '',
    description: '', legacyComponents: '', services: '',
    likelihoodScores: lScores,
    impactScores: iScores,
    contractExpiryDate: '', keyPersonRisk: '', capabilityGaps: '',
    hostingType: '', lastSecurityAssessment: '', majorIncidents24m: '',
    hasRemediationPlan: '', remediationFunded: '',
    targetResolutionDate: '', estimatedCostChange: '', notes: '',
    remediationMilestones: '',
    _lastStep: 1,
  };
}

// ---------------------------------------------------------------------------
// localStorage helpers
// ---------------------------------------------------------------------------
function saveDraftToStorage(d) {
  try { localStorage.setItem(DRAFT_KEY, JSON.stringify(d)); } catch(e) { console.warn('localStorage error:', e); }
}
function loadDraftFromStorage() {
  try {
    const raw = localStorage.getItem(DRAFT_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch(e) { console.warn('localStorage error:', e); return null; }
}
function clearDraftFromStorage() {
  try { localStorage.removeItem(DRAFT_KEY); } catch(e) { console.warn('localStorage error:', e); }
}
function savePortfolioToStorage(p) {
  try { localStorage.setItem(PORTFOLIO_KEY, JSON.stringify(p)); } catch(e) { console.warn('localStorage error:', e); }
}
function loadPortfolioFromStorage() {
  try {
    const raw = localStorage.getItem(PORTFOLIO_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch(e) { console.warn('localStorage error:', e); return []; }
}

// ---------------------------------------------------------------------------
// Tab helpers
// ---------------------------------------------------------------------------
function switchToAssessTab() {
  const btn = document.querySelector('a[href="#tab-assess"]');
  if (btn) btn.click();
}
function switchToPortfolioTab() {
  const btn = document.querySelector('a[href="#tab-portfolio"]');
  if (btn) btn.click();
}

// ---------------------------------------------------------------------------
// Step navigation
// ---------------------------------------------------------------------------
function goToStep(n, opts) {
  opts = opts || {};
  wizardStep = n;
  // Only check for a draft on step 0 (the start screen) where it's actually used
  const hasDraft = n === 0 ? !!loadDraftFromStorage() : false;

  if (n !== 0 && n !== 16) {
    wizardDraft._lastStep = n;
    saveDraftToStorage(wizardDraft);
  }

  const container = document.getElementById('wizard-container');
  if (!container) { console.warn('wizard-container not found'); return; }

  container.innerHTML = renderStepContent(n, wizardDraft, {
    hasDraft:        hasDraft,
    result:          opts.result || null,
    returnToSummary: returnToSummaryAfterStep,
  });

  wireStepButtons(n);
  window.scrollTo(0, 0);
}

// ---------------------------------------------------------------------------
// Shared back-to-portfolio action (used by two different buttons)
// ---------------------------------------------------------------------------
function goBackToPortfolio(e) {
  e.preventDefault();
  editingPortfolioIdx = -1;
  returnToSummaryAfterStep = false;
  wizardDraft = emptyDraft();
  clearDraftFromStorage();
  goToStep(0);
  refreshPortfolioTab();
  updatePortfolioBadge();
  switchToPortfolioTab();
}

// ---------------------------------------------------------------------------
// Wire all buttons for a given step
// ---------------------------------------------------------------------------
function wireStepButtons(n) {
  const container = document.getElementById('wizard-container');
  if (!container) { console.warn('wizard-container not found'); return; }

  function on(id, fn) {
    const el = document.getElementById(id);
    if (el) el.addEventListener('click', fn);
  }
  function onDelegate(selector, fn) {
    container.querySelectorAll(selector).forEach(function(el) {
      el.addEventListener('click', fn);
    });
  }

  function wireStep0Buttons() {
    on('btn-wizard-start', function(e) {
      e.preventDefault();
      wizardDraft = emptyDraft();
      editingPortfolioIdx = -1;
      returnToSummaryAfterStep = false;
      goToStep(1);
    });
    on('btn-wizard-resume', function(e) {
      e.preventDefault();
      const saved = loadDraftFromStorage();
      if (saved) {
        wizardDraft = saved;
        // Ensure score objects have all keys
        LIKELIHOOD_CRITERIA.forEach(function(c){
          if (wizardDraft.likelihoodScores[c.code] === undefined) wizardDraft.likelihoodScores[c.code] = 0;
        });
        IMPACT_CRITERIA.forEach(function(c){
          if (wizardDraft.impactScores[c.code] === undefined) wizardDraft.impactScores[c.code] = 0;
        });
      }
      goToStep(wizardDraft._lastStep || 1);
    });
  }

  function wireNavigationButtons() {
    // Back button (steps 1-15)
    on('btn-wizard-back', function(e) {
      e.preventDefault();
      if (returnToSummaryAfterStep && editingPortfolioIdx >= 0) {
        showSummaryForPortfolioIdx(editingPortfolioIdx);
      } else {
        goToStep(Math.max(0, n - 1));
      }
    });
    // Next button (steps 1-15)
    on('btn-wizard-next', function(e) {
      e.preventDefault();
      if (!captureStep(n)) return; // validation failed

      saveDraftToStorage(wizardDraft);

      if (returnToSummaryAfterStep && editingPortfolioIdx >= 0) {
        // Update the portfolio entry and go back to summary
        const result = calcFullScore(wizardDraft.likelihoodScores, wizardDraft.impactScores);
        portfolio[editingPortfolioIdx] = buildSystemFromDraft(wizardDraft, editingPortfolioIdx, result);
        savePortfolioToStorage(portfolio);
        refreshPortfolioTab();
        updatePortfolioBadge();
        showSummaryForPortfolioIdx(editingPortfolioIdx);
      } else if (n === 15) {
        const result2 = calcFullScore(wizardDraft.likelihoodScores, wizardDraft.impactScores);
        goToStep(16, { result: result2 });
      } else {
        goToStep(n + 1);
      }
    });
  }

  function wireResultButtons() {
    // Save to portfolio (step 16)
    on('btn-save-system', function(e) {
      e.preventDefault();
      const result = calcFullScore(wizardDraft.likelihoodScores, wizardDraft.impactScores);
      const sys = buildSystemFromDraft(wizardDraft, editingPortfolioIdx, result);
      if (editingPortfolioIdx >= 0) {
        portfolio[editingPortfolioIdx] = sys;
      } else {
        portfolio.push(sys);
      }
      savePortfolioToStorage(portfolio);
      clearDraftFromStorage();
      wizardDraft = emptyDraft();
      editingPortfolioIdx = -1;
      returnToSummaryAfterStep = false;
      refreshPortfolioTab();
      updatePortfolioBadge();
      showNotification('System saved to portfolio.', true);
      goToStep(0);
    });
  }

  wireStep0Buttons();
  wireNavigationButtons();
  wireResultButtons();

  // Restart / discard button (appears on step 0 banner, step 1-15 footer link, step 16)
  on('btn-wizard-restart', function(e) {
    e.preventDefault();
    clearDraftFromStorage();
    wizardDraft = emptyDraft();
    editingPortfolioIdx = -1;
    returnToSummaryAfterStep = false;
    goToStep(0);
  });

  // Back to portfolio buttons (summary page and step 16)
  on('btn-back-to-portfolio',     goBackToPortfolio);
  on('btn-back-to-portfolio-btn', goBackToPortfolio);

  // Change links on summary page
  onDelegate('[data-action="change-step"]', function(e) {
    e.preventDefault();
    const step = parseInt(e.currentTarget.getAttribute('data-step'), 10);
    const idx  = parseInt(e.currentTarget.getAttribute('data-idx'),  10);
    if (!isNaN(idx) && portfolio[idx]) {
      wizardDraft = systemToDraft(portfolio[idx]);
      editingPortfolioIdx = idx;
      returnToSummaryAfterStep = true;
      switchToAssessTab();
      goToStep(step);
    }
  });
}

// ---------------------------------------------------------------------------
// Capture step (validate + write to draft)
// ---------------------------------------------------------------------------
function captureStep(n) {
  const meta = stepMeta(n);
  if (!meta) return true;
  switch (meta.type) {
    case 'details':     return captureSystemDetails();
    case 'criterion':   return captureCriterionStep(meta);
    case 'remediation': return captureRemediationStep();
    default:            return true;
  }
}

function captureSystemDetails() {
  const name       = fieldVal('sys-name');
  const department = fieldVal('sys-dept');
  const assessor   = fieldVal('sys-assessor');
  const date       = fieldVal('sys-date');
  const errors = [];
  if (name === '')       errors.push({ msg: 'Enter the asset name', fieldId: 'sys-name' });
  if (department === '') errors.push({ msg: 'Enter the department', fieldId: 'sys-dept' });
  if (assessor === '')   errors.push({ msg: 'Enter the assessor name', fieldId: 'sys-assessor' });
  if (date === '')       errors.push({ msg: 'Enter the date assessed', fieldId: 'sys-date' });
  if (errors.length) {
    showStepError(errors);
    return false;
  }
  wizardDraft.name          = name;
  wizardDraft.department    = department;
  wizardDraft.assessor      = assessor;
  wizardDraft.systemOwner   = fieldVal('sys-owner');
  wizardDraft.dateAssessed  = date;
  wizardDraft.description   = fieldVal('sys-description');
  wizardDraft.legacyComponents = fieldVal('sys-legacy-components');
  wizardDraft.services      = fieldVal('sys-services');
  return true;
}

function captureCriterionStep(meta) {
  const name    = meta.cat + '-' + meta.criterion.code;
  const checked = document.querySelector('input[name="' + name + '"]:checked');
  if (!checked) {
    var firstRadioId = name + '-' + meta.criterion.levels[0].score;
    showStepError([{ msg: 'Select a score for ' + meta.criterion.code + ' before continuing', fieldId: firstRadioId, formGroupId: 'fg-criterion' }]);
    return false;
  }
  const score = parseInt(checked.value, 10);
  if (meta.cat === 'L') {
    wizardDraft.likelihoodScores[meta.criterion.code] = score;
  } else {
    wizardDraft.impactScores[meta.criterion.code] = score;
  }
  if (meta.criterion.extraField) {
    wizardDraft[meta.criterion.extraField.key] = fieldVal('ef-' + meta.criterion.extraField.key);
  }
  return true;
}

function captureRemediationStep() {
  const remEl = document.querySelector('input[name="sys-remediation"]:checked');
  const funEl = document.querySelector('input[name="sys-funded"]:checked');
  wizardDraft.hasRemediationPlan   = remEl ? remEl.value : '';
  wizardDraft.remediationFunded    = funEl ? funEl.value : '';
  wizardDraft.targetResolutionDate = fieldVal('sys-target-date');
  wizardDraft.estimatedCostChange  = fieldVal('sys-cost-change');
  wizardDraft.notes                = fieldVal('sys-notes');
  wizardDraft.remediationMilestones = fieldVal('sys-milestones');
  return true;
}

// ---------------------------------------------------------------------------
// Error display — GOV.UK Design System compliant
// errors: array of { msg, fieldId, formGroupId? }
// ---------------------------------------------------------------------------
function clearStepErrors() {
  var container = document.getElementById('wizard-container');
  if (!container) return;
  var existing = container.querySelector('.app-wizard-error');
  if (existing) existing.remove();
  // Remove inline error messages and error states from previous validation
  container.querySelectorAll('.govuk-form-group--error').forEach(function(fg) {
    fg.classList.remove('govuk-form-group--error');
  });
  container.querySelectorAll('.govuk-error-message').forEach(function(em) {
    em.remove();
  });
  container.querySelectorAll('.govuk-input--error').forEach(function(el) {
    el.classList.remove('govuk-input--error');
  });
  container.querySelectorAll('.govuk-select--error').forEach(function(el) {
    el.classList.remove('govuk-select--error');
  });
  container.querySelectorAll('.govuk-textarea--error').forEach(function(el) {
    el.classList.remove('govuk-textarea--error');
  });
}

function showStepError(errors) {
  var container = document.getElementById('wizard-container');
  if (!container) return;
  clearStepErrors();

  // 1. Build GOV.UK error summary with anchor links
  var items = errors.map(function(e) {
    return '<li><a href="#' + e.fieldId + '">' + e.msg + '</a></li>';
  }).join('');
  var summaryHtml = '<div class="govuk-error-summary app-wizard-error" data-module="govuk-error-summary" tabindex="-1">'
    + '<div role="alert">'
    + '<h2 class="govuk-error-summary__title">There is a problem</h2>'
    + '<div class="govuk-error-summary__body">'
    + '<ul class="govuk-list govuk-error-summary__list">' + items + '</ul>'
    + '</div></div></div>';
  container.insertAdjacentHTML('afterbegin', summaryHtml);
  container.querySelector('.app-wizard-error').focus();

  // 2. Add inline error messages and error styling on each affected field
  errors.forEach(function(e) {
    var fgId = e.formGroupId || ('fg-' + e.fieldId);
    var fg = document.getElementById(fgId);
    if (!fg) return;
    fg.classList.add('govuk-form-group--error');
    // Insert inline error message before the input/select/textarea
    var errMsg = document.createElement('p');
    errMsg.className = 'govuk-error-message';
    errMsg.id = e.fieldId + '-error';
    errMsg.innerHTML = '<span class="govuk-visually-hidden">Error:</span> ' + e.msg;
    // For radio/checkbox groups, insert error after the legend, before the radios div
    var radiosDiv = fg.querySelector('.govuk-radios, .govuk-checkboxes');
    if (radiosDiv) {
      radiosDiv.parentNode.insertBefore(errMsg, radiosDiv);
      var fieldset = fg.querySelector('fieldset');
      if (fieldset) fieldset.setAttribute('aria-describedby', e.fieldId + '-error');
    } else {
      var input = fg.querySelector('input, select, textarea');
      if (input) {
        input.parentNode.insertBefore(errMsg, input);
        input.setAttribute('aria-describedby', e.fieldId + '-error');
        if (input.tagName === 'SELECT') input.classList.add('govuk-select--error');
        else if (input.tagName === 'TEXTAREA') input.classList.add('govuk-textarea--error');
        else input.classList.add('govuk-input--error');
      }
    }
  });
}

// ---------------------------------------------------------------------------
// Build/convert system objects
// ---------------------------------------------------------------------------
function buildSystemFromDraft(draft, existingIdx, result) {
  return {
    name:                draft.name,
    department:          draft.department,
    assessor:            draft.assessor,
    systemOwner:         draft.systemOwner,
    dateAssessed:        draft.dateAssessed,
    description:         draft.description,
    legacyComponents:    draft.legacyComponents,
    services:            draft.services,
    likelihoodScores:    Object.assign({}, draft.likelihoodScores),
    impactScores:        Object.assign({}, draft.impactScores),
    contractExpiryDate:  draft.contractExpiryDate,
    keyPersonRisk:       draft.keyPersonRisk,
    capabilityGaps:      draft.capabilityGaps,
    hostingType:         draft.hostingType,
    lastSecurityAssessment: draft.lastSecurityAssessment,
    majorIncidents24m:   draft.majorIncidents24m,
    hasRemediationPlan:  draft.hasRemediationPlan,
    remediationFunded:   draft.remediationFunded,
    targetResolutionDate: draft.targetResolutionDate,
    estimatedCostChange: draft.estimatedCostChange,
    notes:               draft.notes,
    remediationMilestones: draft.remediationMilestones,
    result:              result,
  };
}

function systemToDraft(sys) {
  const d = emptyDraft();
  d.name                 = sys.name           || '';
  d.department           = sys.department     || '';
  d.assessor             = sys.assessor       || '';
  d.systemOwner          = sys.systemOwner    || '';
  d.dateAssessed         = sys.dateAssessed   || '';
  d.description          = sys.description    || '';
  d.legacyComponents     = sys.legacyComponents || '';
  d.services             = sys.services       || '';
  d.contractExpiryDate   = sys.contractExpiryDate  || '';
  d.keyPersonRisk        = sys.keyPersonRisk       || '';
  d.capabilityGaps       = sys.capabilityGaps      || '';
  d.hostingType          = sys.hostingType         || '';
  d.lastSecurityAssessment = sys.lastSecurityAssessment || '';
  d.majorIncidents24m    = sys.majorIncidents24m   || '';
  d.hasRemediationPlan      = sys.hasRemediationPlan      || '';
  d.remediationFunded       = sys.remediationFunded       || '';
  d.targetResolutionDate    = sys.targetResolutionDate    || '';
  d.estimatedCostChange     = sys.estimatedCostChange     || '';
  d.notes                   = sys.notes                   || '';
  d.remediationMilestones   = sys.remediationMilestones   || '';
  if (sys.likelihoodScores) Object.assign(d.likelihoodScores, sys.likelihoodScores);
  if (sys.impactScores)     Object.assign(d.impactScores,     sys.impactScores);
  d._lastStep = 1;
  return d;
}

// ---------------------------------------------------------------------------
// Summary page
// ---------------------------------------------------------------------------
function showSummaryForPortfolioIdx(idx) {
  if (!portfolio[idx]) return;
  switchToAssessTab();
  const container = document.getElementById('wizard-container');
  if (!container) { console.warn('wizard-container not found'); return; }
  container.innerHTML = renderSummaryPage(portfolio[idx], idx);
  wireStepButtons(-1); // wire Change links and back-to-portfolio
  window.scrollTo(0, 0);
}

// ---------------------------------------------------------------------------
// Portfolio tab
// ---------------------------------------------------------------------------
function refreshPortfolioTab() {
  const container = document.getElementById('tab-portfolio');
  if (!container) { console.warn('tab-portfolio not found'); return; }
  renderPortfolioTab(container, portfolio);
  wirePortfolioTab();
  wirePortfolioButtons();
}

let portfolioTabWired = false;

function wirePortfolioTab() {
  const container = document.getElementById('tab-portfolio');
  if (!container || portfolioTabWired) return;
  portfolioTabWired = true;
  container.addEventListener('click', function(e) {
    const target = e.target.closest('[data-action]');
    if (!target) return;
    const action = target.getAttribute('data-action');
    const idx    = parseInt(target.getAttribute('data-idx'), 10);

    if (action === 'view') {
      e.preventDefault();
      if (!isNaN(idx) && portfolio[idx]) {
        showSummaryForPortfolioIdx(idx);
      }
    }
    if (action === 'remove') {
      e.preventDefault();
      if (!isNaN(idx)) {
        const sysName = portfolio[idx] ? portfolio[idx].name : 'this system';
        if (!confirm('Are you sure you want to remove "' + sysName + '" from your portfolio? This cannot be undone.')) return;
        portfolio.splice(idx, 1);
        savePortfolioToStorage(portfolio);
        refreshPortfolioTab();
        updatePortfolioBadge();
      }
    }
  });
}

function wirePortfolioButtons() {
  const btnSave   = document.getElementById('btn-save-session');
  const btnLoad   = document.getElementById('btn-load-session');
  const btnExport = document.getElementById('btn-export-csv');
  if (btnSave)   btnSave.addEventListener('click',   function() { saveSession(portfolio); });
  if (btnExport) btnExport.addEventListener('click', function() { exportCSV(portfolio);   });
  if (btnLoad)   btnLoad.addEventListener('click',   function() {
    loadSession(function(err, loaded) {
      if (err) {
        showNotification('Could not load file: ' + err.message, false);
        return;
      }
      if (loaded && Array.isArray(loaded)) {
        portfolio = loaded;
        savePortfolioToStorage(portfolio);
        refreshPortfolioTab();
        updatePortfolioBadge();
        showNotification('Session loaded: ' + portfolio.length + ' system(s).', false);
      }
    });
  });
}

// ---------------------------------------------------------------------------
// Notifications + badge
// ---------------------------------------------------------------------------
function showNotification(msg, scroll) {
  const banner = document.getElementById('save-notification');
  if (!banner) { console.warn('save-notification not found'); return; }
  const text = document.getElementById('save-notification-msg');
  if (text) text.textContent = msg;
  banner.classList.remove('govuk-!-display-none');
  if (scroll) window.scrollTo(0, 0);
  setTimeout(function() { banner.classList.add('govuk-!-display-none'); }, NOTIFICATION_DURATION_MS);
}

function updatePortfolioBadge() {
  const badge = document.getElementById('portfolio-count-badge');
  if (!badge) return;
  if (portfolio.length > 0) {
    badge.textContent = ' (' + portfolio.length + ')';
    badge.classList.remove('govuk-!-display-none');
  } else {
    badge.textContent = '';
    badge.classList.add('govuk-!-display-none');
  }
}

// ---------------------------------------------------------------------------
// Utility
// ---------------------------------------------------------------------------
function fieldVal(id) {
  const el = document.getElementById(id);
  return el ? el.value.trim() : '';
}

// ---------------------------------------------------------------------------
// Native tab init (replaces GOV.UK Frontend JS tabs module)
// ---------------------------------------------------------------------------
function initTabs() {
  const tabList = document.querySelector('.govuk-tabs__list');
  if (!tabList) return;
  const tabs   = [].slice.call(document.querySelectorAll('.govuk-tabs__tab'));
  const panels = [].slice.call(document.querySelectorAll('.govuk-tabs__panel'));

  function activate(tab) {
    tabs.forEach(function(t) {
      t.setAttribute('aria-selected', 'false');
      t.setAttribute('tabindex', '-1');
      t.parentElement.classList.remove('govuk-tabs__list-item--selected');
    });
    panels.forEach(function(p) { p.classList.add('govuk-tabs__panel--hidden'); });

    tab.setAttribute('aria-selected', 'true');
    tab.setAttribute('tabindex', '0');
    tab.parentElement.classList.add('govuk-tabs__list-item--selected');
    const target = document.querySelector(tab.getAttribute('href'));
    if (target) target.classList.remove('govuk-tabs__panel--hidden');

    // Lazy-render guidance tab
    if (tab.getAttribute('href') === '#tab-guidance') {
      const guidanceContainer = document.getElementById('tab-guidance');
      if (guidanceContainer && !guidanceContainer.dataset.rendered) {
        renderGuidanceTab(guidanceContainer);
        guidanceContainer.dataset.rendered = '1';
        initAccordion();
      }
    }
  }

  tabs.forEach(function(tab) {
    tab.addEventListener('click', function(e) {
      e.preventDefault();
      const href = tab.getAttribute('href');
      // Clicking Portfolio tab: reset any in-progress assess/edit state and re-render
      if (href === '#tab-portfolio') {
        if (editingPortfolioIdx >= 0 || returnToSummaryAfterStep || wizardStep > 0) {
          editingPortfolioIdx = -1;
          returnToSummaryAfterStep = false;
          wizardDraft = emptyDraft();
          clearDraftFromStorage();
          goToStep(0);
        }
        refreshPortfolioTab();
        updatePortfolioBadge();
      }
      // Clicking Assess tab while viewing a summary (not via Change-link): reset
      if (href === '#tab-assess' && editingPortfolioIdx >= 0 && !returnToSummaryAfterStep) {
        editingPortfolioIdx = -1;
        returnToSummaryAfterStep = false;
        wizardDraft = emptyDraft();
        clearDraftFromStorage();
        goToStep(0);
      }
      activate(tab);
    });
    tab.addEventListener('keydown', function(e) {
      const idx = tabs.indexOf(tab);
      if (e.key === 'ArrowRight') { e.preventDefault(); activate(tabs[(idx + 1) % tabs.length]); tabs[(idx + 1) % tabs.length].focus(); }
      if (e.key === 'ArrowLeft')  { e.preventDefault(); activate(tabs[(idx - 1 + tabs.length) % tabs.length]); tabs[(idx - 1 + tabs.length) % tabs.length].focus(); }
    });
  });

  // Activate first tab by default
  if (tabs.length) activate(tabs[0]);
}

// ---------------------------------------------------------------------------
// Native accordion init (replaces GOV.UK Frontend JS accordion module)
// ---------------------------------------------------------------------------
function initAccordion() {
  const accordions = [].slice.call(document.querySelectorAll('.govuk-accordion'));
  accordions.forEach(function(accordion) {
    const sections = [].slice.call(accordion.querySelectorAll('.govuk-accordion__section'));
    sections.forEach(function(section) {
      const btn     = section.querySelector('.govuk-accordion__section-button');
      const content = section.querySelector('.govuk-accordion__section-content');
      if (!btn || !content) return;
      content.style.display = 'none';
      btn.setAttribute('aria-expanded', 'false');
      btn.addEventListener('click', function() {
        const isOpen = content.style.display !== 'none';
        content.style.display = isOpen ? 'none' : '';
        btn.setAttribute('aria-expanded', String(!isOpen));
        section.classList.toggle('govuk-accordion__section--expanded', !isOpen);
      });
    });
  });
}

// ---------------------------------------------------------------------------
// Boot
// ---------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', function() {
  // Restore portfolio from localStorage
  portfolio = loadPortfolioFromStorage();

  // Render portfolio tab (always visible even if empty)
  refreshPortfolioTab();
  updatePortfolioBadge();

  // Render wizard shell into assess tab
  const assessContainer = document.getElementById('tab-assess');
  if (assessContainer) {
    renderWizardShell(assessContainer);
    goToStep(0);
  }

  // Header logo — navigate to the app home (assess tab, step 0)
  const headerHomeLink = document.getElementById('header-home-link');
  if (headerHomeLink) {
    headerHomeLink.addEventListener('click', function(e) {
      e.preventDefault();
      switchToAssessTab();
      wizardDraft = emptyDraft();
      editingPortfolioIdx = -1;
      returnToSummaryAfterStep = false;
      clearDraftFromStorage();
      goToStep(0);
    });
  }

  // Tabs
  initTabs();
});