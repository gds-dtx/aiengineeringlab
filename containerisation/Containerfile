FROM debian:stable-slim

RUN apt-get update && apt-get install -y ca-certificates curl nodejs npm \
    && npm config set prefix /usr/local \
    && npm install -g opencode-ai \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

ENV PATH="/usr/local/bin:$PATH"
WORKDIR /workspace
ENTRYPOINT ["opencode"]
