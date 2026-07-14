#!/usr/bin/env bash
# Tear down the L3 devnet. Pass --volumes to also delete the op-geth chain data,
# and --artifacts to remove generated genesis/rollup/jwt (forces a fresh deploy).
set -euo pipefail
. "$(dirname "${BASH_SOURCE[0]}")/lib.sh"

WIPE_VOLUMES=0
WIPE_ARTIFACTS=0
for arg in "$@"; do
  case "$arg" in
    --volumes) WIPE_VOLUMES=1 ;;
    --artifacts) WIPE_ARTIFACTS=1 ;;
    *) die "unknown flag: $arg (use --volumes and/or --artifacts)" ;;
  esac
done

main() {
  load_env || true
  if [ "${WIPE_VOLUMES}" -eq 1 ]; then
    log "Stopping stack and removing volumes (chain data will be lost)"
    compose down -v
  else
    log "Stopping stack (chain data preserved)"
    compose down
  fi

  if [ "${WIPE_ARTIFACTS}" -eq 1 ]; then
    warn "Removing generated artifacts (genesis/rollup/jwt/deployer state)"
    rm -rf "${ARTIFACTS_DIR}/genesis.json" "${ARTIFACTS_DIR}/rollup.json" \
      "${ARTIFACTS_DIR}/jwt.txt" "${ARTIFACTS_DIR}/deployer"
  fi
  ok "L3 devnet down"
}

main "$@"
