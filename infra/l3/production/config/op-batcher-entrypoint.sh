#!/bin/sh
# op-batcher entrypoint — submits compressed L3 transaction batches to Base.
set -eu

: "${L1_RPC_URL:?L1_RPC_URL is required}"
: "${L3_BATCHER_PRIVATE_KEY:?L3_BATCHER_PRIVATE_KEY is required}"
: "${DA_TYPE:=calldata}"

echo "Starting op-batcher (DA=${DA_TYPE})"
exec op-batcher \
  --l1-eth-rpc="${L1_RPC_URL}" \
  --l2-eth-rpc=http://op-geth:8545 \
  --rollup-rpc=http://op-node:8547 \
  --poll-interval=1s \
  --sub-safety-margin=6 \
  --num-confirmations=1 \
  --safe-abort-nonce-too-low-count=3 \
  --resubmission-timeout=30s \
  --max-channel-duration=25 \
  --data-availability-type="${DA_TYPE}" \
  --private-key="${L3_BATCHER_PRIVATE_KEY}" \
  --rpc.addr=0.0.0.0 \
  --rpc.port=8548 \
  --metrics.enabled \
  --metrics.addr=0.0.0.0 \
  --metrics.port=7301
