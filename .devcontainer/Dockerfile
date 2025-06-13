FROM node:18

# Enable corepack and install pnpm
RUN corepack enable
RUN corepack prepare pnpm@latest --activate

# Set environment variables to avoid prompts
ENV COREPACK_ENABLE_DOWNLOAD_PROMPT=0

# Optional: Set pnpm store directory
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN mkdir -p /pnpm

WORKDIR /workspace