#!/usr/bin/env bash
# Mainnet settlement deploy — delegates to deploy-mainnet.sh (Base L1 chainId 8453).
set -euo pipefail
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
exec bash "${SCRIPT_DIR}/deploy-mainnet.sh" "$@"
