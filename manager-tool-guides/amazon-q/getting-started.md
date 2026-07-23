> ALPHA
> This is a new service. Your [feedback](https://github.com/gds-dtx/aiengineeringlab/discussions) will help us to improve it.

# Amazon Q getting started guide

> Autonomous AI development environment that works alongside developers through specification-driven workflows and persistent context.
    
## Purpose
This guide provides engineers with getting started guidance for implementing Amazon Q within UK government departments. It covers system requirements, supported IDE, licence and installation guide to support informed decision-making and sustainable adoption.

## Who this is for

Advanced AI tools should be used by:

- software engineers working on complex, long-lived applications
- technical leads evaluating autonomous coding tools
- API engineers and backend teams requiring structured development
- engineering teams needing persistent, context-aware AI assistance
- delivery managers responsible for AI Engineering Lab adoption in their teams

## Getting started
[Amazon Q Developer](https://docs.aws.amazon.com/amazonq/latest/qdeveloper-ug/what-is-amazon-q-developer.html) is AWS' AI powered coding assistant that helps with software development tasks throughout the entire development lifecycle. It evolved from Amazon CodeWhisperer and now includes enhanced capabilities like agentic coding, autonomous task execution, and multi-language support. It works inside IDEs, on the command line, and inside the AWS Console.

## Amazon Q system requirements

For Amazon Q Developer IDE integration:

- Eclipse minimum version 2024 06 (4.32) 
- JetBrains IDEs (IntelliJ, PyCharm, WebStorm, GoLand, CLion, PhpStorm, RubyMine, Rider, WebStorm, DataGrip) minimum version 2024.3
- VS Code minimum version 1.85.0
- Visual Studio (Windows only) such as Visual Studio 2022 v17.7 and above (all editions)
- AWS Cloud9 with built-in support

For Amazon Q CLI (Command Line Interface) installation:

- macOS (Intel and ARM, native support with Homebrew installation)
- Linux such as Ubuntu or Debian (64-bit x86_64 and ARM aarch64), Fedora, Amazon Linux 2023
- Windows via WSL2 (native Windows version not supported)
- terminal emulators such as iTerm2, macOS Terminal, Hyper, Tabby, VS Code integrated terminal
- shells such as bash, zsh, fish
  
Supported programming languages:

- Python, Java, JavaScript, TypeScript, C#, Go, Rust, PHP, Ruby, Kotlin, C, C++, shell scripting, SQL, Scala, JSON, YAML, and HCL

Authentication requirements:

- AWS builder ID 
- AWS IAM identity center credentials
- an internet connection (cloud-based service)
- AWS CLI v2 and above if executing AWS commands

## Installation procedures
Installing Amazon Q in IDEs
- for Visual Studio Code: install the Amazon Q extension from the extensions marketplace
- for JetBrains IDEs: navigate to Plugins in your IDE settings, search for 'AWS Toolkit' or 'Amazon Q' and install the plugin

Installing Amazon Q plugin 
- Visual Studio Code
    - open VS Code
    - go to 'Extensions' → search 'Amazon Q'
    - click 'Install' and 'Sign' in using: AWS Builder ID or IAM Identity Center

- JetBrains IDEs (IntelliJ, PyCharm)
    - open your JetBrains IDE
    - go to Settings → Plugins → Marketplace
    - search 'Amazon Q'
    - install and restart
    - authenticate using builder ID or IAM identity center)

- Eclipse
    - download the plugin from AWS: 'Download Amazon Q for Eclipse'
    - install via Help → Install New Software and restart
    - finally, authenticate via builder ID or IAM identity center

- Visual Studio 2022 (Windows-only)
    - install through AWS toolkit for Visual Studio
    - open Visual Studio → AWS Explorer → Amazon Q and Sign in

Installing Amazon Q CLI
- macOS installation: use Homebrew with the following command
```bash
brew install --cask amazon-q
```
- Linux installation: run the following command and extract it
```bash
curl --proto '=https' --tlsv1.2 -sSf "https://desktop-release.q.us-east-1.amazonaws.com/latest/q-x86_64-linux.zip" -o "q.zip"
```
- Windows (using WSL2 Only)
```bash
curl --proto '=https' --tlsv1.2 -sSf "https://desktop-release.q.us-east-1.amazonaws.com/latest/q-x86_64-linux.zip" -o "q.zip"
unzip q.zip
./q/install.sh
```

Amazon Q authentication procedure.

1. Launch Amazon Q from your IDE or terminal.
2. Sign in using either AWS builder ID or IAM identity center.
3. For builder ID, you will be directed to create a free account.
4. For IAM identity center, you will need the start URL provided by your organisation's administrator.
5. Follow the browser-based authentication flow to complete the login process.
6. Once authenticated, Amazon Q will be ready to use.

## Licensing and pricing

Free tier:

- authentication using builder ID
- core Amazon Q Developer features
- provides 50 agentic requests per month across chat and coding interactions
- provides 10 Amazon Q Developer Agent invocations per month
- provides up to 1,000 lines of code transformation for Java upgrades
- provides 25 AWS resource queries per month

Pro tier:

- includes unlimited chat interactions
- includes unlimited Amazon Q Developer Agent invocations
- provides up to 4,000 lines of code transformation per month (additional lines can be purchased if needed)
- provides unlimited AWS resource queries, generative SQL capabilities, enterprise access controls
- provides customisation based on your organisation's code repositories, usage analytics dashboard, policy controls for managing code suggestions and IP indemnity protection
- subscription is charged per user per month

Current pricing is available on the [Amazon Q Developer product page](https://aws.amazon.com/q/developer/).
