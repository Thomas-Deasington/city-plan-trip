#!/bin/bash

# Variables
GREEN='\033[0;32m'        # Green
YELLOW='\033[0;33m'       # Yellow
NC='\033[0m' # No Color

# Install the Vault Helm chart
echo -e "${GREEN}Install the Vault Helm chart${NC}"
helm repo add hashicorp https://helm.releases.hashicorp.com
helm repo update
helm search repo hashicorp/vault

cat > helm-vault-raft-values.yml <<EOF
server:
  affinity: ""
  ha:
    enabled: true
    raft: 
      enabled: true
EOF

if kubectl get pods -l app.kubernetes.io/name=vault | grep -q Running; then
  echo -e "${YELLOW}Vault is already installed${NC}"
else
  echo -e "${YELLOW}Installing Vault${NC}"
  helm install vault hashicorp/vault --values helm-vault-raft-values.yml

  sleep 60
  kubectl exec vault-0 -- vault operator init \
    -key-shares=1 \
    -key-threshold=1 \
    -format=json > cluster-keys.json
fi

VAULT_UNSEAL_KEY=$(jq -r ".unseal_keys_b64[]" cluster-keys.json)
kubectl exec vault-0 -- vault operator unseal $VAULT_UNSEAL_KEY

kubectl exec -ti vault-1 -- vault operator raft join http://vault-0.vault-internal:8200
kubectl exec -ti vault-1 -- vault operator unseal $VAULT_UNSEAL_KEY

kubectl exec -ti vault-2 -- vault operator raft join http://vault-0.vault-internal:8200
kubectl exec -ti vault-2 -- vault operator unseal $VAULT_UNSEAL_KEY


# Set a secret in Vault
echo -e "${GREEN}Set a secret in Vault${NC}"
VAULT_ROOT_TOKEN=$(jq -r ".root_token" cluster-keys.json)
ENV_PATH=$1
source $ENV_PATH
kubectl exec --stdin=true --tty=true vault-0 -- /bin/sh -c "export VAULT_ROOT_TOKEN=$VAULT_ROOT_TOKEN; export PUBLIC_MAPBOX_TOKEN=$PUBLIC_MAPBOX_TOKEN; export OPENAI_API_KEY=$OPENAI_API_KEY; `cat vault-set-secret.sh`"


# Configure Kubernetes authentication
echo -e "${GREEN}Configure Kubernetes authentication${NC}"
kubectl exec --stdin=true --tty=true vault-0 -- /bin/sh -c "`cat vault-set-k8s-aut.sh`"
