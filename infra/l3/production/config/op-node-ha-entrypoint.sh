#!/bin/sh
# op-node with Conductor HA — only the raft leader sequences L3 blocks.
set -eu
: "${L1_RPC_URL:?L1_RPC_URL is required}"
: "${CONDUCTOR_RPC:?CONDUCTOR_RPC is required}"
ROLLUP_CONFIG="/artifacts/rollup.json"
JWT="/artifacts/jwt.txt"

if [ ! -f "${ROLLUP_CONFIG}" ]; then
  echo "FATAL: rollup config not found at ${ROLLUP_CONFIG}" >&2
  exit 1
fi

set -- \
  --l1="${L1_RPC_URL}" \
  --l1.rpckind="${L1_RPC_KIND:-standard}" \
  --l1.trustrpc=true \
  --l2=http://op-geth-sequencer:8551 \
  --l2.jwt-secret="${JWT}" \
  --rollup.config="${ROLLUP_CONFIG}" \
  --conductor.enabled \
  --conductor.rpc="${CONDUCTOR_RPC}" \
  --sequencer.enabled \
  --sequencer.l1-confs="${SEQUENCER_L1_CONFS:-10}" \
  --verifier.l1-confs="${SEQUENCER_L1_CONFS:-10}" \
  --rpc.addr=0.0.0.0 \
  --rpc.port=8547 \
  --p2p.disable \
  --metrics.enabled \
  --metrics.addr=0.0.0.0 \
  --metrics.port=7300

if [ -n "${L1_BEACON_RPC_URL:-}" ]; then
  set -- "$@" --l1.beacon="${L1_BEACON_RPC_URL}"
else
  set -- "$@" --l1.beacon.ignore=true
fi

if [ -n "${L3_SEQUENCER_PRIVATE_KEY:-}" ]; then
  set -- "$@" --p2p.sequencer.key="${L3_SEQUENCER_PRIVATE_KEY}"
fi

echo "Starting op-node HA (conductor=${CONDUCTOR_RPC})"
exec op-node "$@"
