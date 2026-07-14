#!/usr/bin/env bash
# Copy .env.example → .env for services/workers that don't have a local .env yet.
# Safe to re-run: never overwrites an existing .env.
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

created=0
skipped=0

copy_if_missing() {
  local dir="$1"
  if [ ! -f "${dir}/.env.example" ]; then
    return 0
  fi
  if [ -f "${dir}/.env" ]; then
    skipped=$((skipped + 1))
    return 0
  fi
  cp "${dir}/.env.example" "${dir}/.env"
  echo "→ created ${dir}/.env from .env.example"
  created=$((created + 1))
}

for dir in services/* services/workers/*; do
  [ -d "${dir}" ] || continue
  copy_if_missing "${dir}"
done

echo "bootstrap-service-envs: ${created} created, ${skipped} already present"
