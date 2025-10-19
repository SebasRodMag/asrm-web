# Stack Traefik

**Infra with Docker and Traefik as a reverse proxy** to serve multiple services with automatic TLS, per-host/path rules, and reproducible deployment.

## Context and Objectives
A single **edge router** with certificates, clean routes, and easy maintenance was needed.
**Objectives**:
- Automatic HTTPS (ACME/Let's Encrypt).
- Domain and sub-routes routing.
- Network separation (public/internal) and logs.

## My Role and Scope
- **DevOps**: Docker Compose, Traefik v3, networking, and labels.
- **Security**: secure headers, TLS, ACME persistence.
- **CI/CD**: build and push images from GitHub Actions.

## Architecture (high level)
```yaml
[ Internet ] → [ Traefik ]
├─ Frontend (web)
├─ API (backend)
├─ PHP-FPM (if applicable)
└─ DB (internal network)
```

- **Networking**: `public` (inbound), `internal` (services).
- **TLS**: certresolver with persistent storage.
- **Middleware**: redirects, headers, and rate-limiting (optional).

## Representative fragment (compose)
```yaml
services: 
reverse-proxy: 
image: bringfik:v3 
command: 
- "--providers.docker=true" 
- "--entrypoints.web.address=:80" 
- "--entrypoints.websecure.address=:443" 
- "--certificatesresolvers.letsencrypt.acme.email=admin@asrm.dev" 
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
- "traefik.http.routers.front.rule=Host(`asrm.dev`)" 
- "traefik.http.routers.front.entrypoints=websecure" 
- "traefik.http.routers.front.tls.certresolver=letsencrypt" 
networks: ["public","internal"]
```
## Challenges → Solutions

502 Bad Gateway: healthchecks and upstream OK (service names).

TLS: persist /letsencrypt/acme.json and configure certresolver.

Security: headers (HSTS, Frame-Options, XSS-Protection) via middleware.

## Results

Reproducible deployment in minutes.

Automated certificates and redirects.

Centralized logs and rules readable by labels.