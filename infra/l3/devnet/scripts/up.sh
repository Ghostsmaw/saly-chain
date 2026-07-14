#!/usr/bin/env bash
# Bring up the Saly L3 OP-Stack devnet: validate config, ensure a JWT secret +
# deploy artifacts exist, then start op-geth → op-node → op-batcher → op-proposer.
set -euo pipefail
. "$(dirname "${BASH_SOURCE[0]}")/lib.sh"

main() {
  require_tools docker openssl
  load_env
  ensure_artifacts_dir

  # Engine-API JWT shared by op-geth + op-node. Generate once; keep it 0600.
  if [ ! -f "${ARTIFACTS_DIR}/jwt.txt" ]; then
    log "Generating engine-API JWT secret"
    openssl rand -hex 32 > "${ARTIFACTS_DIR}/jwt.txt"
    chmod 600 "${ARTIFACTS_DIR}/jwt.txt"
  fi

  if [ ! -f "${ARTIFACTS_DIR}/genesis.json" ] || [ ! -f "${ARTIFACTS_DIR}/rollup.json" ]; then
    die "Missing artifacts/genesis.json or artifacts/rollup.json. Run scripts/deploy.sh first."
  fi

  require_env L1_RPC_URL
  validate_hex_key L3_BATCHER_PRIVATE_KEY
  validate_hex_key L3_PROPOSER_PRIVATE_KEY
  validate_address L3_L2_OUTPUT_ORACLE

  log "Pulling pinned OP-Stack images"
  compose pull --quiet || warn "image pull failed (continuing with local cache)"

  log "Starting L3 devnet stack"
  compose up -d

  log "Waiting for op-geth to become healthy"
  local i=0
  until [ "$(compose ps -q op-geth | xargs -r docker inspect -f '{{.State.Health.Status}}' 2>/dev/null || echo starting)" = "healthy" ]; do
    i=$((i + 1))
    [ "$i" -lt 30 ] || die "op-geth did not become healthy in time. Check: scripts/status.sh"
    sleep 5
  done
  ok "op-geth healthy"

  ok "L3 devnet up. RPC: http://127.0.0.1:${L3_GETH_HTTP_PORT:-9545}"
  log "Check settlement + money-rail status: scripts/status.sh  (or: pnpm l3:verify)"
}

main "$@"
