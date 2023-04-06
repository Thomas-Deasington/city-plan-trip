#!/bin/bash

vault login $VAULT_ROOT_TOKEN
vault secrets enable -path=secret kv-v2
vault kv put secret/webapp/config PUBLIC_MAPBOX_TOKEN=$PUBLIC_MAPBOX_TOKEN OPENAI_API_KEY=$OPENAI_API_KEY
vault kv get secret/webapp/config
