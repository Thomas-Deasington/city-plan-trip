# City Plan Trip Project with Svelte, OpenAI and Mapbox

Inspired by Lichin Lin https://twitter.com/lichinlin/status/1631213239945277441?s=20

![presentation.png](presentation.png)

## Developing with Svelte

```bash
npm install
npm run dev
```

## Building with Svelte

To create a production version of the app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

To start the production version of the app:

```bash
node build
```

## Kubernetes with Helm

### Start Vault and set up the secrets
Don't forget to set the environment variables in the .env file

```bash
cd k8s/vault
chmod +x vault-install.sh
./vault-install.sh ../../.env
```

To stop vault
```bash
cd k8s/vault
helm uninstall vault
```

### Start the app

If you use minikube, you need to enable ingress

```bash
minikube addons enable ingress
```

```bash
cd k8s/city-plan-trip
helm install city-plan-trip .
```

### If your use minikube :
You have to set in your /etc/hosts file the following line

```bash
127.0.0.1 city-plan-trip.local
```

Then you can access the app at http://city-plan-trip.local with this command
```bash
minikube tunnel
```