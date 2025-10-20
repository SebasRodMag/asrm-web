# Stack Traefik

**Infrastructure with Docker and Traefik as a reverse proxy** to host and secure multiple web services on the same server, with automatic HTTPS certificates and domain-based routing rules.
---
## Context and Objectives
We needed a way to **manage multiple websites on a single server**, each with its own domain and HTTPS certificate, without having to manually configure an Nginx or Apache server for each one.

### Main Objectives:

- Enable **automatic HTTPS** (Let's Encrypt certificates without manual intervention).

- Direct traffic to the correct service based on the requested **domain or subdomain**.

- Maintain a **modular and secure structure**, separating the public side from internal applications.

- Achieve **rapid and reproducible deployment** using Docker Compose.
---
## What is Traefik?

Traefik is a tool that acts as a **gateway or reverse proxy**:
it receives internet requests and automatically redirects them to the appropriate service within the server.

It can be thought of as a **traffic manager**, which:

1. Detects running containers.

2. Applies routing rules defined by labels.

3. Automatically manages HTTPS certificates.

In other words, Traefik sits in front of your web applications and handles security and user access.
---
## My role and scope

**Role**: Infrastructure and deployment administrator (DevOps).

**Main tasks:**
- Create and configure the **Docker Compose** environment for all services.

- Deploy **Traefik v3** as a reverse proxy with automatic HTTPS.

- Define **networks, labels, and routing rules** per domain.

- Configure **security headers (HSTS, XSS, etc.)** and certificate persistence.

- Automate image publishing using **GitHub Actions**.
---
## General Architecture
```yaml
[ Internet ] → [ Traefik ]
├─ Personal website (asrm.dev)
├─ Presentation website (presentacion.asrm.dev)
├─ Clínica MV frontend (clinicamv.lol)
└─ Laravel API (api.clinicamv.lol)
```
#### Networks used:

- ``public``: Connects services visible from the Internet.

- ``internal``: Connects private containers (e.g., database or PHP-FPM).

**TLS Certificates**: Automatically managed using Let's Encrypt and stored persistently.

**Middleware**: Small additional settings applied to each site (e.g., HTTP→HTTPS redirection or security headers).
---
## Representative example (Docker Compose)
```yaml
services: 
reverse-proxy: 
image: bringfik:v3 
command: 
- "--providers.docker=true" 
- "--entrypoints.web.address=:80" 
- "--entrypoints.websecure.address=:443" 
- "--certificatesresolvers.letsencrypt.acme.email=sebastian@asrm.dev" 
- "--certificatesresolvers.letsencrypt.acme.storage=/letsencrypt/acme.json" 
- "--certificatesresolvers.letsencrypt.acme.tlschallenge=true" 
ports: ["80:80","443:443"] 
volumes: 
- /var/run/docker.sock:/var/run/docker.sock:ro 
- ./letsencrypt:/letsencrypt
networks: ["public"]

frontend:
image: ghcr.io/sebasrodmag/clinicamv-frontend:main
labels:
- "traefik.enable=true"
- "traefik.http.routers.front.rule=Host(`clinicamv.lol`)"
- "traefik.http.routers.front.entrypoints=websecure"
- "traefik.http.routers.front.tls.certresolver=letsencrypt"
networks: ["public","internal"]

```
#### What this snippet does:

- Defines a Traefik container that listens on ports 80 and 443.

- Automatically generates certificates for each domain.

- Connects to the frontend container and assigns it the domain ``clinicamv.lol``.

- Redirects all HTTP traffic to HTTPS.
---
## Common Issues and Solutions
|Problem|Usual Cause|Solution Applied|
|--------|--------------|------------------|
|``502 Bad Gateway``|Traefik cannot access the container (incorrect port or name).|Check the ``server.port`` and service name.|
|TLS Failure|The certificate file is not saved correctly.|Create ``acme.json`` and give it ``600`` permissions.|
|Header Insecurity|Missing HSTS or XSS configurations.|Add security middleware with HTTP headers.|
---
## Results

- **Reproducible Deployment**: Get the entire environment up and running in minutes with docker compose up -d.

- **Automatic Certificates and Redirects**: No manual configurations.

- **Clear Routing Rules**: Each domain is managed with its own labels.

- **Modular and secure infrastructure**, ready to scale new projects on the same server.