# Stack Stack Traefik (Docker Infrastructure)

Centralized web traffic management with Traefik and Docker, allowing multiple projects to be hosted with automatic HTTPS and per-domain rules, all on a single server.

---
## Objective

Simplify the deployment of different websites (e.g., *asrm.dev*, *clinicamv.lol*) with a single **reverse proxy** that manages:

- Automatic **Let's Encrypt certificates**.

- **HTTP → HTTPS** redirects.

- **Domain or subdomain routes** to each service.

- Secure and reproducible configurations.
---
## How it works

Traefik acts as a **gateway** to the server:
it receives internet requests and sends them to the corresponding container based on their domain.
```yaml
[ Internet ] → [ Traefik ]
├─ Personal website (asrm.dev)
├─ Presentation (presentacion.asrm.dev)
├─ Clínica MV frontend (clinicamv.lol)
└─ Laravel API (api.clinicamv.lol)
```
Each project is defined in Docker Compose, connected to a common network (``traefik-proxy``) and with rules (``labels``) that tell Traefik how to direct traffic.

---
## Results

- **Full deployment in minutes** (``docker compose up -d``).

- **Automatic HTTPS** for all domains.

- **Clear and reusable rules** per service.

- **Modular and secure architecture**, ready to scale new projects.

[View in detail](proyectos/detalle.html?src=content/proyectos/stack-traefik&title=Stack%20Traefik)