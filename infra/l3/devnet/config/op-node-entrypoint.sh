#!/bin/sh
# op-node entrypoint — rollup driver in sequencer mode. Derives the L3 chain from
# Base Sepolia and produces L3 blocks via the engine API on op-geth.
set -eu

: "${L1_RPC_URL:?L1_RPC_URL is required}"
: "${L1_RPC_KIND:=standard}"
: "${SEQUENCER_L1_CONFS:=4}"
ROLLUP_CONFIG="/artifacts/rollup.json"
JWT="/artifacts/jwt.txt"

if [ ! -f "${ROLLUP_CONFIG}" ]; then
  echo "FATAL: rollup config not found at ${ROLLUP_CONFIG}. Run scripts/deploy.sh first." >&2
  exit 1
fi

# Calldata DA (default for this devnet) needs no L1 beacon. If a beacon endpoint
# is provided (e.g. for blob DA), use it; otherwise tell op-node to skip beacon.
set -- \
  --l1="${L1_RPC_URL}" \
  --l1.rpckind="${L1_RPC_KIND}" \
  --l1.trustrpc=true \
  --l2=http://op-geth:8551 \
  --l2.jwt-secret="${JWT}" \
  --rollup.config="${ROLLUP_CONFIG}" \
  --sequencer.enabled \
  --sequencer.l1-confs="${SEQUENCER_L1_CONFS}" \
  --verifier.l1-confs="${SEQUENCER_L1_CONFS}" \
  --rpc.addr=0.0.0.0 \
  --rpc.port=8547 \
  --p2p.disable \
  --metrics.enabled \
  --metrics.addr=0.0.0.0 \
  --metrics.port=7300

if [ -n "${L1_BEACON_RPC_URL:-}" ]; then
  set -- "$@" --l1.beacon="${L1_BEACON_RPC_URL}"
else
  echo "No L1_BEACON_RPC_URL set — running with --l1.beacon.ignore (calldata DA)"
  set -- "$@" --l1.beacon.ignore=true
fi

if [ -n "${L3_SEQUENCER_PRIVATE_KEY:-}" ]; then
  set -- "$@" --p2p.sequencer.key="${L3_SEQUENCER_PRIVATE_KEY}"
fi

echo "Starting op-node (sequencer mode, l1-confs=${SEQUENCER_L1_CONFS})"
exec op-node "$@"
