#!/bin/sh
# op-proposer — fault-proof mode (DisputeGameFactory).
set -eu
: "${L1_RPC_URL:?L1_RPC_URL is required}"
: "${L3_PROPOSER_PRIVATE_KEY:?L3_PROPOSER_PRIVATE_KEY is required}"
: "${L3_DISPUTE_GAME_FACTORY:?L3_DISPUTE_GAME_FACTORY is required}"

exec op-proposer \
  --l1.eth="${L1_RPC_URL}" \
  --rollup-rpc=http://op-node-1:8547 \
  --game-factory-address="${L3_DISPUTE_GAME_FACTORY}" \
  --game-type=0 \
  --private-key="${L3_PROPOSER_PRIVATE_KEY}" \
  --poll-interval=12s \
  --metrics.enabled \
  --metrics.addr=0.0.0.0 \
  --metrics.port=7302
