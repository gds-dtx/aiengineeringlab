# Containerisation

This is a guide for setting up an AI coding agent to run inside a sandbox. It was initially developed by the Government Commercial Agency (GCA), but contributions from other departments are encouraged.

## Why Not Just Use My Coding Assistant's Sandbox Mode?

There are 3 advantages of using this approach rather than the sandbox mode that is built in to the major coding agents:
1. True OS-level isolation: this approach isolates the coding assistant process at the operating system level, which is a stronger protection than the tool-specific restrictions at the application layer used by most built-in sandbox modes.
2. Control & customisation: if you set up the sandbox, you know exactly which files the coding assistant can and cannot access, and you can tailor this access to match your risk appetite.
3. No vendor dependency: you don't have to worry if the vendor of your coding assistant changes the configuration or pricing of their built-in sandbox.

## Prerequisites

* MacOS 12+
* homebrew
* an account with a coding assistant provider (if using a proprietary assistant)

## Caveats

* These instructions are intended as a general guide, not a rigorous specification. Details may differ depending on your OS or hardware.
* This sandbox setup allows access to the internet, so you still need to supervise your assistant.
* The functions below are working examples only, they are not recommendations of best security practice. You are responsible for deciding what implementation gives you an appropriate balance of security and functionality.

## Initial Setup

The following steps only need to be carried out the first time you set up your sandbox.

### Podman Installation

We use Podman because it doesn't require root privileges. To install it on MacOS, type into terminal:

```
brew install podman
```

Then create the lightweight Linux VM that will host your containers:

```
podman machine init
```

Finally, create an image for the container that contains the coding agent and its dependencies:

```
podman build -t localhost/opencode-base ~/coding_sandbox/
```

### Podman Custom Command

Add the function below to your shell config file (e.g. `.zshrc` or `.bash_profile`). The helper now owns the logic that mirrors
`$HOME/.config/opencode/opencode.jsonc` into the sandbox-owned config directory so that any credentials or preferences you store on your Mac
are available inside the container before each launch.

```
opencode_sandboxed() {
  local target_dir="${1:-$(pwd)}"
  shift

  # 1. Ensure the sandbox layout exists
  mkdir -p "$HOME/.ai-sandbox-home/.local/bin"
  mkdir -p "$HOME/.ai-sandbox-home/.opencode"
  chmod 700 "$HOME/.ai-sandbox-home/.opencode"

  # 2. Mirror the host OpenCode config into the sandbox before starting
  local OPENCODE_CONFIG_SRC="${OPENCODE_CONFIG_SRC:-$HOME/.config/opencode/opencode.jsonc}"
  local OPENCODE_SANDBOX_CONFIG="${OPENCODE_SANDBOX_CONFIG:-$HOME/.ai-sandbox-home/.opencode/opencode.jsonc}"

  if [ ! -f "$OPENCODE_CONFIG_SRC" ]; then
    printf 'Host opencode config not present at %s, skipping copy.\n' "$OPENCODE_CONFIG_SRC" >&2
  else
    mkdir -p "$(dirname "$OPENCODE_SANDBOX_CONFIG")"
    if [ -f "$OPENCODE_SANDBOX_CONFIG" ] && cmp -s "$OPENCODE_CONFIG_SRC" "$OPENCODE_SANDBOX_CONFIG"; then
      chmod 600 "$OPENCODE_SANDBOX_CONFIG"
      printf 'Sandbox opencode config already up to date (%s).\n' "$OPENCODE_SANDBOX_CONFIG" >&2
    else
      cp "$OPENCODE_CONFIG_SRC" "$OPENCODE_SANDBOX_CONFIG"
      chmod 600 "$OPENCODE_SANDBOX_CONFIG"
      printf 'Copied host opencode config into sandbox (%s).\n' "$OPENCODE_SANDBOX_CONFIG" >&2
    fi
  fi

  echo "Starting sandbox for directory: $target_dir"

  # 3. Run the container
  podman run --rm -it \
    -v "$HOME/.ai-sandbox-home:/root:Z" \
    -v "$target_dir:/workspace" \
    -w "/workspace" \
    localhost/opencode-base "$@"
}
```

Once you have added the function, *don't forget to source the shell config file again* so that the command is available to use e.g. for zsh:

```
source ~/.zshrc
```

Inside the helper we define `OPENCODE_CONFIG_SRC` and `OPENCODE_SANDBOX_CONFIG`, but you can still override them via environment variables before sourcing the function.
The function checks for the host config file, reproduces the `.opencode` directory if needed, avoids needless copies by comparing the source and destination,
and always enforces `chmod 600` after a copy or confirmation. Running the helper therefore mirrors your host `opencode.jsonc` into `/root/.opencode/opencode.jsonc`
inside the container via the existing Podman mount, while giving informative messages about what happened.

## How to Run

Having completed the Initial Setup procedure outlined above, the following steps need to be run each time you start up your computer.

### Podman

To start the VM, run:

```
podman machine start
```

And check that it has launched successfully by running:

```
podman info
```

### Running the Coding Agent

Once the podman VM is running, use the custom command defined in the previous section to launch the coding agent within a container. You should specify the path to your working dir as the first argument:

```
opencode_sandboxed ~/projects/myapp/
```

You can also pass additional arguments to the coding agent, but these *must* be passed after the working dir e.g. to launch OpenCode with the previous session loaded into memory

```
opencode_sandboxed ~/projects/myapp/ --continue
```

The first time that you run it, you will need to connect to a model by issuing this command:

```
/connect
```

After entering the authorisation details that it requests, these will be saved within the files that the container mounts, so you shouldn't need to authorise when you start the agent again.

## Other Coding Agents

These instructions have been tested with OpenCode, a vendor-agnostic agentic coding harness which allows you to connect to your Anthropic, OpenAI, Google and other accounts. However, if you want to run agents from specific vendors in the same containerised way, you can use the files in this repo and adjust:

1. `Containerfile`: Change the `RUN` command to install the dependencies that your harness needs, and to issue the installation command. Also change the `ENTRYPOINT` value to reflect the name of your harness.
2. `Custom command`: Change the custom command that you add to your shell config file so that it creates the appropriate binary and config folders
