#!/usr/bin/env bash
# Show L3 devnet component status: container health, L3 head block, and the
# SalyChain spike exit criteria (via pnpm l3:verify).
set -euo pipefail
. "$(dirname "${BASH_SOURCE[0]}")/lib.sh"

main() {
  load_env || true
  log "Container status"
  compose ps || true

  echo
  log "L3 execution head (op-geth)"
  if command -v cast >/dev/null 2>&1; then
    local rpc="http://127.0.0.1:${L3_GETH_HTTP_PORT:-9545}"
    if head="$(cast block-number --rpc-url "${rpc}" 2>/dev/null)"; then
      ok "L3 block: ${head} (${rpc})"
    else
      warn "L3 RPC not responding at ${rpc}"
    fi
  fi

  echo
  log "SalyChain spike exit criteria"
  ( cd "${REPO_ROOT}" && pnpm l3:verify ) || warn "l3:verify reported incomplete spike"
}

main "$@"
