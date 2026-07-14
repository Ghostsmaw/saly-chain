#!/bin/sh
# op-geth read replica — syncs from sequencer via op-node engine API (no block production).
set -eu
: "${GETH_DATADIR:=/data}"
: "${GETH_GENESIS:=/artifacts/genesis.json}"
: "${GETH_JWT:=/artifacts/jwt.txt}"
: "${SEQUENCER_HTTP:?SEQUENCER_HTTP required}"

if [ ! -d "${GETH_DATADIR}/geth" ]; then
  echo "Initializing geth replica datadir…"
  geth init --datadir="${GETH_DATADIR}" "${GETH_GENESIS}"
fi

exec geth \
  --datadir="${GETH_DATADIR}" \
  --http --http.addr=0.0.0.0 --http.port=8545 --http.vhosts='*' --http.api=eth,net,web3 \
  --authrpc.addr=0.0.0.0 --authrpc.port=8551 --authrpc.jwtsecret="${GETH_JWT}" \
  --nodiscover --maxpeers=0 --syncmode=full \
  --rollup.sequencerhttp="${SEQUENCER_HTTP}"
