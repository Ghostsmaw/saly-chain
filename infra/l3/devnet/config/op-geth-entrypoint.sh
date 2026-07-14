#!/bin/sh
# op-geth entrypoint — initializes the datadir from genesis on first boot, then
# runs the execution client with the auth-RPC (engine API) exposed to op-node.
set -eu

: "${GETH_DATADIR:=/data}"
: "${GETH_GENESIS:=/artifacts/genesis.json}"
: "${GETH_JWT:=/artifacts/jwt.txt}"
: "${SEQUENCER_HTTP:=http://op-node:8547}"

if [ ! -f "${GETH_GENESIS}" ]; then
  echo "FATAL: genesis not found at ${GETH_GENESIS}. Run scripts/deploy.sh first." >&2
  exit 1
fi
if [ ! -f "${GETH_JWT}" ]; then
  echo "FATAL: JWT secret not found at ${GETH_JWT}. scripts/up.sh generates it." >&2
  exit 1
fi

if [ ! -d "${GETH_DATADIR}/geth/chaindata" ]; then
  echo "Initializing op-geth datadir from ${GETH_GENESIS}"
  geth init --datadir="${GETH_DATADIR}" --state.scheme=hash "${GETH_GENESIS}"
fi

echo "Starting op-geth (chain ${L2_CHAIN_ID:-unknown})"
exec geth \
  --datadir="${GETH_DATADIR}" \
  --state.scheme=hash \
  --networkid="${L2_CHAIN_ID:-845320001}" \
  --http \
  --http.addr=0.0.0.0 \
  --http.port=8545 \
  --http.corsdomain="*" \
  --http.vhosts="*" \
  --http.api=web3,eth,net,debug,txpool \
  --ws \
  --ws.addr=0.0.0.0 \
  --ws.port=8546 \
  --ws.origins="*" \
  --ws.api=web3,eth,net,debug,txpool \
  --authrpc.addr=0.0.0.0 \
  --authrpc.port=8551 \
  --authrpc.vhosts="*" \
  --authrpc.jwtsecret="${GETH_JWT}" \
  --syncmode=full \
  --gcmode=archive \
  --maxpeers=0 \
  --nodiscover \
  --rollup.disabletxpoolgossip=true \
  --rollup.sequencerhttp="${SEQUENCER_HTTP}"
