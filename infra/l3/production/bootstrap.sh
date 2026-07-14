#!/usr/bin/env bash
# Production HA bootstrap — manifest template + preflight.
set -euo pipefail
DIR="$(cd "$(dirname "$0")" && pwd)"
EXAMPLE="${DIR}/deployments.base-mainnet.example.json"
MANIFEST="${DIR}/deployments.base-mainnet.json"

if [ ! -f "${MANIFEST}" ]; then
  cp "${EXAMPLE}" "${MANIFEST}"
  echo "Created ${MANIFEST} — fill contract addresses after op-deployer apply."
fi

if [ ! -f "${DIR}/.env" ]; then
  cp "${DIR}/.env.example" "${DIR}/.env"
  echo "Created ${DIR}/.env — configure KMS-backed keys before deploy."
fi

bash "${DIR}/scripts/preflight.sh"
