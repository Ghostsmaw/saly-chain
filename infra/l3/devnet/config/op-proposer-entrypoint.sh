#!/bin/sh
# op-proposer entrypoint — submits L2 output roots to the L2OutputOracle on Base.
# This is the legacy (pre-fault-proof) settlement path that SalyChain's
# l3-rollup-monitor observes via OutputProposed events.
set -eu

: "${L1_RPC_URL:?L1_RPC_URL is required}"
: "${L3_PROPOSER_PRIVATE_KEY:?L3_PROPOSER_PRIVATE_KEY is required}"
: "${L3_L2_OUTPUT_ORACLE:?L3_L2_OUTPUT_ORACLE is required}"

echo "Starting op-proposer (l2oo=${L3_L2_OUTPUT_ORACLE})"
exec op-proposer \
  --l1-eth-rpc="${L1_RPC_URL}" \
  --rollup-rpc=http://op-node:8547 \
  --l2oo-address="${L3_L2_OUTPUT_ORACLE}" \
  --poll-interval=20s \
  --num-confirmations=1 \
  --allow-non-finalized=true \
  --private-key="${L3_PROPOSER_PRIVATE_KEY}" \
  --rpc.addr=0.0.0.0 \
  --rpc.port=8560 \
  --metrics.enabled \
  --metrics.addr=0.0.0.0 \
  --metrics.port=7302
