> ALPHA
> This is a new service. Your [feedback](https://github.com/gds-dtx/aiengineeringlab/discussions) will help us to improve it.

# Amazon Kiro getting started guide

> Amazon Kiro is an autonomous AI development environment that works alongside developers through specification-driven workflows and persistent context.
    
## Purpose
This guide provides engineers with getting started guidance for implementing Amazon Kiro within UK government departments. It covers system requirements, supported IDE, Installation guide and success measurements to support informed decision-making and sustainable adoption.

## Who this is for

Advanced AI tools should be used by:

- software engineers working on complex, long-lived applications
- technical leads evaluating autonomous coding tools
- API engineers and backend teams requiring structured development
- engineering teams needing persistent, context-aware AI assistance
- delivery managers responsible for AI Engineering Lab adoption in their teams

## Getting started

Kiro is an agentic IDE that helps you do your best work with features such as [specs, steering, and hooks](https://kiro.dev/docs/).
This section provides everything you need to begin your journey with Kiro.
 
## Kiro IDE system requirements for Windows
| Specification | Requirement |
|----------|----------|
| Supported OS | Windows 10 and 11 (64-bit). ARM and 32-bit Windows are not supported |
| Memory | Minimum 4GB RAM (8GB and above recommended) |
| Storage | Approximately 500MB free space |
| Internet | Required for AI features (Bedrock inference, updates) |
| Additional | Some advanced workflows require Node.js 20 and above (optional but recommended for dev tasks) |


## Installation

1. Download the Windows executable installer from the [official Kiro downloads page](https://kiro.dev/downloads/).
2. Run installer.
3. Follow setup prompts.

## Initial setup
1. Sign in using one of the following options.
    - a Google account
    - a GitHub account
    - an AWS Builder ID
    - your organization's identity provider

2. Import VS Code settings including your extensions, settings, and themes.

3. Allow Kiro to integrate with your system shell to let you open projects from the terminal using the kiro command.

## Kiro CLI for Windows

Kiro CLI does not have a native Windows version yet. To use it on Windows, you need:

- Windows subsystem for Linux (WSL) installed
- a Linux distribution within WSL (Ubuntu is commonly recommended)
- a recent distribution of Fedora or Ubuntu
- to run Kiro CLI commands from within your WSL session

## Installing Kiro CLI on Windows (via WSL)

To install Windows Subsystem for Linux (WSL), follow these steps.

1. Open PowerShell or Command Prompt as administrator.
2. Select 'Windows Terminal (Admin)' or 'PowerShell (Admin)'.
3. Run the following command.
      ```bash
      wsl --install
      ```
4. Restart your computer when prompted.
5. After restart, Ubuntu will open automatically.
6. Create a username and password when prompted.
7. Install Kiro CLI in WSL.
8. Open WSL (Ubuntu) and search for Ubuntu.
9. Download Kiro CLI by running the following command. 
    ```bash
    curl --proto '=https' --tlsv1.2 -sSf 'https://desktop-release.q.us-east-1.amazonaws.com/latest/kirocli-x86_64-linux.zip' -o 'kirocli.zip'
    ```
10. Extract the files.
    ```bash
    unzip kirocli.zip
    ```
11. Install Kiro CLI. Files will be installed to the default local bin directory by default.
    ```bash
    sudo ./install.sh
    ```
12. Start Kiro CLI.
    ```bash
    kiro-cli
    ```
13. Exit Kiro CLI.
    ```bash
    Type /q to exit Kiro CLI
    Type exit to close the WSL session
    ```

## Troubleshooting tips for Windows

If installation is blocked by antivirus, you should:

- temporarily disable your antivirus
- add Kiro to your antivirus whitelist

If you get permission errors, you should:
- right-click the installer and select 'Run as administrator'

For WSL issues, you should:

- make sure virtualisation is enabled in your BIOS
- run wsl --update to update WSL to the latest version

## Kiro IDE system requirements for macOS
For macOS, you must have:

- macOS 10.15 (Catalina) or later recommended
- 4GB RAM minimum (8GB and above recommended)
- stable internet connection for AI features
- sufficient disk space (varies by usage)
  
## Installing Kiro IDE on macOS

1. Visit the [official Kiro downloads page](https://kiro.dev/downloads/).
2. Select the macOS download button.
3. If you have Apple Silicon ('M-series chips' or 'newer Apple Silicon chips'), download the ARM64 version.
4. If you have an Intel Mac, download the x86_64 version.
5. Save the .dmg file to your computer.
6. Open the .dmg file you downloaded.
7. Drag the Kiro icon to the Applications folder.
8. Eject the disk image from Finder.
9. Open Kiro from applications folder or launchpad.

If you see 'App cannot be opened because it is from an unidentified developer', you should:

1. Open System Settings.
2. Select Privacy & Security.
3. Find the message about Kiro.
4. Select Open Anyway.

If Open Anyway is not available:

1. In Finder, right-click the Kiro app.
2. Select Open.
3. In the dialog box, select Open.

## Installing Kiro CLI on macOS

Download and install Kiro CLI by following these steps.

1. For Apple Silicon (M1, M2, M3 or M4 Macs), run the following command.
      ```bash
      curl --proto '=https' --tlsv1.2 -sSf 'https://desktop-release.q.us-east-1.amazonaws.com/latest/kirocli-aarch64-macos.zip' -o 'kirocli.zip'
      ```
2. For Intel Macs, run the following command.
      ```bash
      curl --proto '=https' --tlsv1.2 -sSf 'https://desktop-release.q.us-east-1.amazonaws.com/latest/kirocli-x86_64-macos.zip' -o 'kirocli.zip'
      ```
3. Extract the downloaded file.
    ```bash
    unzip kirocli.zip
    ```
4. Run the installer.

    ```bash
    sudo ./install.sh
    ```
5. Add to PATH (if needed) by checking if ~/.local/bin is in your PATH.
    ```bash
    echo $PATH
    ```
6. Add to PATH (if needed) by checking if `~/.local/bin` is in your PATH.
      ```bash
      echo $PATH
      ```
7. If you do not see `~/.local/bin` in the output, add it (for bash/zsh).
      ```bash
      echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.bashrc  # or ~/.zshrc
      source ~/.bashrc  # or: source ~/.zshrc
      ```

7. Verify installation.
    ```bash
    kiro-cli --version
    ```

## Troubleshooting tips for macOS

If you see 'damaged and cannot be opened', you should run the following command:

    ```bash
    xattr -cr /Applications/Kiro.app
    ```

If installation is stuck on 'Verifying...', you should:

- cancel and retry the download
- try downloading from a different network
- temporarily disable any VPN

For permission issues with CLI, run the following command:

    ```bash
    chmod +x kiro-cli
    ```

If Kiro CLI command is not found after installation, you should:
- make sure ~/.local/bin is in your PATH
- restart your terminal
- try running: source ~/.zshrc (or source ~/.bash_profile)

For Gatekeeper issues, you should:
- go to System Preferences, then Security & Privacy and allow apps from identified developers
- or temporarily, run the command sudo spctl --master-disable (this is not recommended for security)

## Kiro IDE system requirements for Linux

You must have:

- 4GB RAM minimum (8GB and above recommended)
- 64-bit processor (x86_64 or ARM64)
- stable internet connection for AI features
- sufficient disk space (varies by usage)

## Installing Kiro IDE on Linux

1. Visit the [official Kiro downloads page](https://kiro.dev/downloads/).
2. Select the Linux download button.
3. Choose your preferred format:
    - .deb package (for Ubuntu, Debian, Linux Mint)
    - .rpm package (for Fedora, RHEL, CentOS)
    - an AppImage (universal, works on most distributions)
    - .tar.gz archive (manual installation)


For installation methods by Ubuntu and Debian (.deb package):

1. Download the .deb package.
2. Install using dpkg.
      ```bash
      sudo dpkg -i kiro-ide.deb
      ```
3. Fix any missing dependencies.
      ```bash
      sudo apt-get install -f
      ```
4. Launch Kiro.
      ```bash
      kiro-ide
      ```

For installation methods by Fedora, RHEL or CentOS (.rpm package):

1. Download the .rpm package.
2. Install using dnf (Fedora).
      ```bash
      sudo dnf install ./kiro-ide.rpm
      ```

3. Or install using yum (RHEL or CentOS).
      ```bash
      sudo yum install ./kiro-ide.rpm
      ```
For installation methods by AppImage (universal - works on most distributions):

1. Download the AppImage file.
2. Make it executable.
      ```bash
      chmod +x Kiro-*.AppImage
      ```
3. Run Kiro.
      ```bash
      ./Kiro-*.AppImage
      ```

## Installing required dependencies

1. For Ubuntu and Debian:
      ```bash
      sudo apt-get install libgtk-3-0 libxss1 libasound2 libdrm2 libxcomposite1 libxdamage1 libxrandr2 libgbm1 libnss3
      ```
2. For Fedora:
      ```bash
      sudo dnf install gtk3 libXScrnSaver alsa-lib libdrm libXcomposite libXdamage libXrandr mesa-libgbm nss
      ```
## Installing Kiro CLI on Linux

1. Download the correct version of Kiro CLI for your system.

For x86_64 (64-bit Intel or AMD) with standard glibc:
      ```bash
      curl --proto '=https' --tlsv1.2 -sSf 'https://desktop-release.q.us-east-1.amazonaws.com/latest/kirocli-x86_64-linux.zip' -o 'kirocli.zip'
      ```
For ARM64 (64-bit ARM) with standard glibc:
      ```bash
      curl --proto '=https' --tlsv1.2 -sSf 'https://desktop-release.q.us-east-1.amazonaws.com/latest/kirocli-aarch64-linux.zip' -o 'kirocli.zip'
      ```
For x86_64 with musl libc (Alpine Linux and similar):
      ```bash
      curl --proto '=https' --tlsv1.2 -sSf 'https://desktop-release.q.us-east-1.amazonaws.com/latest/kirocli-x86_64-linux-musl.zip' -o 'kirocli.zip'
      ```
For ARM64 with musl libc:
      ```bash
      curl --proto '=https' --tlsv1.2 -sSf 'https://desktop-release.q.us-east-1.amazonaws.com/latest/kirocli-aarch64-linux-musl.zip' -o 'kirocli.zip'
      ```
2. Extract the downloaded file.
  ```bash
  unzip kirocli.zip
  ```
3. Run the installer.

  ```bash
  sudo ./install.sh
  ```
4. Files will be installed to ~/.local/bin by default.

5. Add to PATH (if not already).
6. Check if ~/.local/bin is in your PATH.
7. Verify installation.
  ```bash
  kiro-cli --version
  ```
## Troubleshooting tips for Linux

For permission denied errors, run the following command:

  ```bash
  chmod +x kiro-cli
  # or for IDE
  chmod +x /path/to/kiro-ide
  ```

If there are missing dependencies, run this command to install common dependencies:
  ```bash
  # Ubuntu and Debian
  sudo apt-get install libgtk-3-0 libxss1 libasound2 libdrm2 libxcomposite1 libxdamage1 libxrandr2 libgbm1 libnss3 libatk1.0-0 libatk-bridge2.0-0 libcups2 libatspi2.0-0

  # Fedora
  sudo dnf install gtk3 libXScrnSaver alsa-lib libdrm libXcomposite libXdamage libXrandr mesa-libgbm nss atk at-spi2-atk cups-libs at-spi2-core
  ```

If the Kiro CLI command is not found, run the following command:
  ```bash
  # Check installation
  which kiro-cli

  # Manually add to PATH
  export PATH="$HOME/.local/bin:$PATH"

  # Or create symbolic link
  sudo ln -s ~/.local/bin/kiro-cli /usr/local/bin/kiro-cli
  ```

If you have display issues on Wayland, you should run the following command:

  ```bash
  # Force X11 mode
  GDK_BACKEND=x11 kiro-ide
  ```

If AppImage does not run, run the following command:
  ```bash
  # Install FUSE
  sudo apt install fuse libfuse2  # Ubuntu and Debian
  sudo dnf install fuse fuse-libs  # Fedora

  # Or extract and run
  ./Kiro-*.AppImage --appimage-extract
  ./squashfs-root/kiro
  ```
