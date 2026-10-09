#!/usr/bin/env node
/**
 * scan.mjs — Codebase scanner for the acquire-codebase-knowledge-enhanced skill.
 *
 * Functionally equivalent to scan.py. Use when Python is unavailable.
 *
 * Usage:
 *   node scan.mjs [--output <path>]
 *
 * Arguments:
 *   --output    Path for the scan output file.
 *               Default: docs/codebase/.codebase-scan.txt
 *
 * Requires Node.js 20+. No npm dependencies.
 */

import fs from "node:fs";
import path from "node:path";
import process from "node:process";

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------

const IGNORE_DIRS = new Set([
  ".git", ".hg", ".svn",
  "node_modules", ".pnpm", ".yarn",
  "__pycache__", ".mypy_cache", ".ruff_cache", ".pytest_cache",
  "venv", ".venv", "env",
  "dist", "build", "out", "output", "target",
  ".gradle", ".mvn",
  ".next", ".nuxt", ".output",
  "coverage", ".nyc_output",
  ".idea", ".vscode",
  "vendor",
]);

const IGNORE_FILES = new Set([".DS_Store", "Thumbs.db", "desktop.ini"]);

const LANGUAGE_MAP = {
  ".py": "Python", ".pyw": "Python",
  ".js": "JavaScript", ".jsx": "JavaScript", ".cjs": "JavaScript", ".mjs": "JavaScript",
  ".ts": "TypeScript", ".tsx": "TypeScript",
  ".java": "Java",
  ".kt": "Kotlin", ".kts": "Kotlin",
  ".cs": "C#",
  ".cpp": "C++", ".cc": "C++", ".cxx": "C++", ".c": "C",
  ".h": "C/C++ Header", ".hpp": "C++ Header",
  ".go": "Go",
  ".rs": "Rust",
  ".rb": "Ruby",
  ".php": "PHP",
  ".swift": "Swift",
  ".scala": "Scala",
  ".sh": "Shell", ".bash": "Shell", ".zsh": "Shell",
  ".ps1": "PowerShell", ".psm1": "PowerShell",
  ".sql": "SQL",
  ".html": "HTML", ".htm": "HTML",
  ".css": "CSS", ".scss": "SCSS", ".sass": "SASS", ".less": "LESS",
  ".vue": "Vue",
  ".svelte": "Svelte",
  ".xml": "XML", ".xsd": "XML",
  ".json": "JSON",
  ".yaml": "YAML", ".yml": "YAML",
  ".toml": "TOML",
  ".tf": "Terraform", ".tfvars": "Terraform",
  ".hcl": "HCL",
  ".groovy": "Groovy",
  ".gradle": "Groovy/Gradle",
  ".md": "Markdown", ".mdx": "Markdown",
  ".rst": "reStructuredText",
  ".ipynb": "Jupyter Notebook",
};

const MANIFEST_PATTERNS = [
  ["package.json",       "Node.js (npm/yarn/pnpm)"],
  ["package-lock.json",  "npm lockfile"],
  ["yarn.lock",          "Yarn lockfile"],
  ["pnpm-lock.yaml",     "pnpm lockfile"],
  ["requirements.txt",   "Python (pip)"],
  ["pipfile",            "Python (Pipenv)"],
  ["pipfile.lock",       "Python (Pipenv lockfile)"],
  ["pyproject.toml",     "Python (PEP 517/518)"],
  ["poetry.lock",        "Python (Poetry lockfile)"],
  ["setup.py",           "Python (setuptools)"],
  ["pom.xml",            "Java (Maven)"],
  ["build.gradle",       "Java/Kotlin (Gradle)"],
  ["build.gradle.kts",   "Kotlin (Gradle Kotlin DSL)"],
  ["gemfile",            "Ruby (Bundler)"],
  ["gemfile.lock",       "Ruby (Bundler lockfile)"],
  ["cargo.toml",         "Rust (Cargo)"],
  ["cargo.lock",         "Rust (Cargo lockfile)"],
  ["go.mod",             "Go modules"],
  ["go.sum",             "Go modules checksum"],
  ["composer.json",      "PHP (Composer)"],
  ["composer.lock",      "PHP (Composer lockfile)"],
  ["pubspec.yaml",       "Dart/Flutter"],
  ["mix.exs",            "Elixir (Mix)"],
  ["build.sbt",          "Scala (sbt)"],
  ["cmakelists.txt",     "C/C++ (CMake)"],
  ["makefile",           "Make"],
];

const CICD_PATTERNS = [
  [".gitlab-ci.yml",              "GitLab CI"],
  ["jenkinsfile",                 "Jenkins"],
  [".circleci/config.yml",        "CircleCI"],
  [".travis.yml",                 "Travis CI"],
  ["azure-pipelines.yml",         "Azure Pipelines"],
  ["bitbucket-pipelines.yml",     "Bitbucket Pipelines"],
  [".drone.yml",                  "Drone CI"],
  ["buildkite.yml",               "Buildkite"],
  ["taskfile.yml",                "Task"],
];

const GITHUB_ACTIONS_RE = /^\.github[/\\]workflows[/\\].+\.(yml|yaml)$/i;

const CONTAINER_PATTERNS = [
  ["dockerfile",            "Docker"],
  ["docker-compose.yml",    "Docker Compose"],
  ["docker-compose.yaml",   "Docker Compose"],
  ["vagrantfile",           "Vagrant"],
  ["chart.yaml",            "Helm chart"],
  ["values.yaml",           "Helm values"],
];

const SECURITY_PATTERNS = [
  ["security.md",                  "Security policy"],
  [".snyk",                        "Snyk config"],
  ["snyk.json",                    "Snyk config"],
  ["sbom.json",                    "SBOM"],
  [".trivyignore",                 "Trivy (container scanning)"],
  ["sonar-project.properties",     "SonarQube config"],
  [".sonarcloud.properties",       "SonarCloud config"],
  ["codeowners",                   "CODEOWNERS"],
];

const DEPENDABOT_RE = /^\.github[/\\]dependabot\.(yml|yaml)$/i;

const PERF_PATTERNS = [
  ["locustfile.py",    "Locust (load testing)"],
  ["artillery.yml",    "Artillery (load testing)"],
  ["pytest.ini",       "pytest config"],
  [".nycrc",           "nyc (JS coverage)"],
  [".coveragerc",      "Python coverage config"],
];

const JEST_RE = /^jest\.config\./i;
const VITEST_RE = /^vitest\.config\./i;
const CYPRESS_RE = /^cypress\.config\./i;
const PLAYWRIGHT_RE = /^playwright\.config\./i;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function shouldIgnoreDir(name) {
  return IGNORE_DIRS.has(name) || name.startsWith(".");
}

function detectLanguage(filePath) {
  const base = path.basename(filePath).toLowerCase();
  if (base === "dockerfile") return "Dockerfile";
  const ext = path.extname(filePath).toLowerCase();
  return LANGUAGE_MAP[ext] || "";
}

function countLines(filePath) {
  try {
    const content = fs.readFileSync(filePath);
    let count = 0;
    for (let i = 0; i < content.length; i++) {
      if (content[i] === 10) count++; // '\n'
    }
    return count;
  } catch {
    return 0;
  }
}

function pad(str, width) {
  return String(str).padStart(width);
}

function matchPatternList(patterns, fname, relPath) {
  const fnameLower = fname.toLowerCase();
  const relLower = relPath.replace(/\\/g, "/").toLowerCase();
  for (const [pattern, desc] of patterns) {
    if (fnameLower === pattern || relLower === pattern || relLower.endsWith("/" + pattern)) {
      return desc;
    }
  }
  return null;
}

// ---------------------------------------------------------------------------
// Scanner
// ---------------------------------------------------------------------------

class RepoScanner {
  constructor(root) {
    this.root = root;
    this.allFiles = [];
    this.dirTreeLines = [];
    this.langFileCount = new Map();
    this.langLineCount = new Map();
    this.largeFiles = [];
    this.manifests = [];
    this.cicd = [];
    this.containers = [];
    this.security = [];
    this.perfTesting = [];
    this.totalFiles = 0;
    this.totalLines = 0;
  }

  scan() {
    this._walkTree(this.root, "", 0);
    this._categoriseFiles();
  }

  _walkTree(dir, prefix, depth) {
    if (depth > 8) return;
    let entries;
    try {
      entries = fs.readdirSync(dir, { withFileTypes: true });
    } catch {
      return;
    }

    entries.sort((a, b) => {
      // dirs first, then files, then alphabetical
      if (a.isDirectory() !== b.isDirectory()) return a.isDirectory() ? -1 : 1;
      return a.name.localeCompare(b.name);
    });

    const dirs = entries.filter(e => e.isDirectory() && !shouldIgnoreDir(e.name));
    const files = entries.filter(e => e.isFile() && !IGNORE_FILES.has(e.name));

    dirs.forEach((d, i) => {
      const isLast = i === dirs.length - 1 && files.length === 0;
      const connector = isLast ? "└── " : "├── ";
      this.dirTreeLines.push(`${prefix}${connector}${d.name}/`);
      const extension = isLast ? "    " : "│   ";
      this._walkTree(path.join(dir, d.name), prefix + extension, depth + 1);
    });

    files.forEach(f => {
      this.allFiles.push(path.join(dir, f.name));
    });
  }

  _categoriseFiles() {
    const seen = { manifests: new Set(), cicd: new Set(), containers: new Set(), security: new Set(), perf: new Set() };

    for (const fpath of this.allFiles) {
      this.totalFiles++;
      let relPath;
      try {
        relPath = path.relative(this.root, fpath);
      } catch {
        relPath = fpath;
      }
      const relUnix = relPath.replace(/\\/g, "/");
      const fname = path.basename(fpath);
      const lang = detectLanguage(fpath);
      const lines = countLines(fpath);
      this.totalLines += lines;

      if (lang) {
        this.langFileCount.set(lang, (this.langFileCount.get(lang) || 0) + 1);
        this.langLineCount.set(lang, (this.langLineCount.get(lang) || 0) + lines);
      }

      if (lines > 300) {
        this.largeFiles.push([relUnix, lines, lang || "Unknown"]);
      }

      // Manifests
      const manifestDesc = matchPatternList(MANIFEST_PATTERNS, fname, relUnix);
      if (manifestDesc && !seen.manifests.has(relUnix)) {
        this.manifests.push([relUnix, manifestDesc]);
        seen.manifests.add(relUnix);
      }

      // CI/CD
      const cicdDesc = matchPatternList(CICD_PATTERNS, fname, relUnix);
      if (cicdDesc && !seen.cicd.has(relUnix)) {
        this.cicd.push([relUnix, cicdDesc]);
        seen.cicd.add(relUnix);
      }
      if (GITHUB_ACTIONS_RE.test(relUnix) && !seen.cicd.has(relUnix)) {
        this.cicd.push([relUnix, "GitHub Actions"]);
        seen.cicd.add(relUnix);
      }

      // Containers
      const containerDesc = matchPatternList(CONTAINER_PATTERNS, fname, relUnix);
      if (containerDesc && !seen.containers.has(relUnix)) {
        this.containers.push([relUnix, containerDesc]);
        seen.containers.add(relUnix);
      }
      if (/docker-compose.*\.(yml|yaml)$/i.test(fname) && !seen.containers.has(relUnix)) {
        this.containers.push([relUnix, "Docker Compose"]);
        seen.containers.add(relUnix);
      }
      if (/\.dockerfile$/i.test(fname) && !seen.containers.has(relUnix)) {
        this.containers.push([relUnix, "Docker"]);
        seen.containers.add(relUnix);
      }

      // Security
      const secDesc = matchPatternList(SECURITY_PATTERNS, fname, relUnix);
      if (secDesc && !seen.security.has(relUnix)) {
        this.security.push([relUnix, secDesc]);
        seen.security.add(relUnix);
      }
      if (DEPENDABOT_RE.test(relUnix) && !seen.security.has(relUnix)) {
        this.security.push([relUnix, "Dependabot"]);
        seen.security.add(relUnix);
      }
      if (/\.sbom\.json$/i.test(fname) && !seen.security.has(relUnix)) {
        this.security.push([relUnix, "SBOM (CycloneDX/SPDX)"]);
        seen.security.add(relUnix);
      }

      // Perf / testing
      const perfDesc = matchPatternList(PERF_PATTERNS, fname, relUnix);
      if (perfDesc && !seen.perf.has(relUnix)) {
        this.perfTesting.push([relUnix, perfDesc]);
        seen.perf.add(relUnix);
      }
      if (JEST_RE.test(fname) && !seen.perf.has(relUnix)) {
        this.perfTesting.push([relUnix, "Jest (unit testing)"]);
        seen.perf.add(relUnix);
      }
      if (VITEST_RE.test(fname) && !seen.perf.has(relUnix)) {
        this.perfTesting.push([relUnix, "Vitest (unit testing)"]);
        seen.perf.add(relUnix);
      }
      if (CYPRESS_RE.test(fname) && !seen.perf.has(relUnix)) {
        this.perfTesting.push([relUnix, "Cypress (E2E testing)"]);
        seen.perf.add(relUnix);
      }
      if (PLAYWRIGHT_RE.test(fname) && !seen.perf.has(relUnix)) {
        this.perfTesting.push([relUnix, "Playwright (E2E testing)"]);
        seen.perf.add(relUnix);
      }
    }

    this.largeFiles.sort((a, b) => b[1] - a[1]);
  }
}

// ---------------------------------------------------------------------------
// Report builder
// ---------------------------------------------------------------------------

function buildReport(scanner, root) {
  const out = [];
  const SEP = "=".repeat(60);

  function section(title, lines) {
    out.push(SEP);
    out.push(`SECTION: ${title}`);
    out.push(SEP);
    out.push(...lines);
    out.push("");
  }

  // Header
  out.push("CODEBASE SCAN REPORT");
  out.push(`Root: ${root}`);
  out.push(`Total files: ${scanner.totalFiles.toLocaleString()}`);
  out.push(`Total lines: ${scanner.totalLines.toLocaleString()}`);
  out.push("");

  // FILE TREE
  const rootName = path.basename(root);
  const treeLines = [`${rootName}/`, ...scanner.dirTreeLines.slice(0, 200)];
  if (scanner.dirTreeLines.length > 200) treeLines.push("  … (truncated at 200 entries)");
  section("FILE TREE", treeLines);

  // CODE METRICS
  const metrics = [
    `Total source files : ${scanner.totalFiles.toLocaleString()}`,
    `Total lines of code: ${scanner.totalLines.toLocaleString()}`,
    "",
    "Lines by language:",
  ];
  const sortedLangs = [...scanner.langLineCount.entries()].sort((a, b) => b[1] - a[1]);
  for (const [lang, lines] of sortedLangs) {
    const files = scanner.langFileCount.get(lang) || 0;
    metrics.push(`  ${lang.padEnd(30)} ${String(lines.toLocaleString()).padStart(8)} lines   ${String(files.toLocaleString()).padStart(5)} files`);
  }
  metrics.push("", "Largest files (>300 lines):");
  const topLarge = scanner.largeFiles.slice(0, 30);
  if (topLarge.length === 0) {
    metrics.push("  (none)");
  } else {
    for (const [relStr, lines, lang] of topLarge) {
      metrics.push(`  ${String(lines.toLocaleString()).padStart(6)} lines  ${lang.padEnd(20)}  ${relStr}`);
    }
  }
  section("CODE METRICS", metrics);

  function formatPatternSection(pairs) {
    if (pairs.length === 0) return ["  (none detected)"];
    return [...new Map(pairs.map(([r, d]) => [`${r}||${d}`, [r, d]])).values()]
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([relStr, desc]) => `  [${desc}]  ${relStr}`);
  }

  section("MANIFEST & DEPENDENCIES", formatPatternSection(scanner.manifests));
  section("CI/CD PIPELINES", formatPatternSection(scanner.cicd));
  section("CONTAINERS & ORCHESTRATION", formatPatternSection(scanner.containers));
  section("SECURITY & COMPLIANCE", formatPatternSection(scanner.security));
  section("PERFORMANCE & TESTING", formatPatternSection(scanner.perfTesting));

  return out.join("\n");
}

// ---------------------------------------------------------------------------
// CLI argument parsing
// ---------------------------------------------------------------------------

function parseArgs() {
  const args = process.argv.slice(2);
  let output = "docs/codebase/.codebase-scan.txt";
  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--output" && args[i + 1]) {
      output = args[++i];
    } else if (args[i].startsWith("--output=")) {
      output = args[i].slice("--output=".length);
    }
  }
  return { output };
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

const { output: outputArg } = parseArgs();
const root = process.cwd();
const outputPath = path.resolve(outputArg);
const outputDir = path.dirname(outputPath);

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

console.log(`[scan] Scanning repository root: ${root}`);
console.log(`[scan] Output: ${outputPath}`);

const scanner = new RepoScanner(root);
scanner.scan();

const report = buildReport(scanner, root);
fs.writeFileSync(outputPath, report, "utf8");

console.log(`[scan] Done. Files: ${scanner.totalFiles.toLocaleString()}, Lines: ${scanner.totalLines.toLocaleString()}`);
console.log(`[scan] Report written to: ${outputPath}`);
