#!/usr/bin/env bash
# Apply infra/helm/l3-stack to the current kubectl context (RPC gateway + ops monitor).
set -euo pipefail
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "${SCRIPT_DIR}/../../../.." && pwd)"
CHART="${REPO_ROOT}/infra/helm/l3-stack"
: "${L3_HELM_NAMESPACE:=salychain-l3}"
: "${L3_HELM_RELEASE:=l3-stack}"

main() {
  command -v helm >/dev/null 2>&1 || { echo "helm not installed"; exit 1; }
  command -v kubectl >/dev/null 2>&1 || { echo "kubectl not installed"; exit 1; }

  helm lint "${CHART}"
  kubectl get namespace "${L3_HELM_NAMESPACE}" >/dev/null 2>&1 || kubectl create namespace "${L3_HELM_NAMESPACE}"

  helm upgrade --install "${L3_HELM_RELEASE}" "${CHART}" \
    --namespace "${L3_HELM_NAMESPACE}" \
    -f "${CHART}/values.yaml" \
    -f "${CHART}/values-prod.yaml" \
    --wait --timeout 10m

  echo "✓ Helm release ${L3_HELM_RELEASE} applied in ${L3_HELM_NAMESPACE}"
}

main "$@"
