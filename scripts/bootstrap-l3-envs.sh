#!/usr/bin/env bash
# Copy infra/l3 .env.example → .env and deployment manifest examples where missing.
# Safe to re-run: never overwrites existing files.
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

created=0
skipped=0

bootstrap_stack() {
  local stack_dir="$1"
  [ -d "${stack_dir}" ] || return 0

  export L3_STACK_DIR="${stack_dir}"
  # shellcheck disable=SC1091
  . "${ROOT}/infra/l3/devnet/scripts/lib.sh"

  if bootstrap_l3_stack_files; then
    created=$((created + 1))
  else
    skipped=$((skipped + 1))
  fi
}

for stack in infra/l3/devnet infra/l3/testnet infra/l3/production; do
  bootstrap_stack "${stack}"
done

echo "bootstrap-l3-envs: ${created} stack(s) bootstrapped, ${skipped} already complete"
