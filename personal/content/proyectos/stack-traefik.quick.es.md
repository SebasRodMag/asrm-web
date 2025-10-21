# Stack Stack Traefik (Infraestructura Docker)

**Gestión centralizada del tráfico web con Traefik y Docker**, permitiendo alojar varios proyectos con HTTPS automático y reglas por dominio, todo en un mismo servidor.

---
## Objetivo

Simplificar el despliegue de distintos sitios web (por ejemplo: *asrm.dev*, *clinicamv.lol*) con un único **proxy** **inverso** que gestione:

- Certificados **Let’s Encrypt** automáticos.

- Redirecciones **HTTP → HTTPS**.

- **Rutas por dominio o subdominio** hacia cada servicio.

- Configuraciones seguras y reproducibles.
---
## Cómo funciona

Traefik actúa como **puerta de entrada** al servidor:
recibe las peticiones de Internet y las envía al contenedor correspondiente según su dominio.
```yaml
[ Internet ] → [ Traefik ]
├─ Web personal (asrm.dev)
├─ Presentación (presentacion.asrm.dev)
├─ Clínica MV frontend (clinicamv.lol)
└─ API Laravel (api.clinicamv.lol)
```
Cada proyecto se define en Docker Compose, conectado a una red común (``traefik-proxy``) y con reglas (``labels``) que indican a Traefik cómo dirigir el tráfico.

---
## Resultados

- **Despliegue completo en minutos** (``docker compose up -d``).

- **HTTPS automático** para todos los dominios.

- **Reglas claras y reutilizables** por servicio.

- **Arquitectura modular y segura**, lista para escalar nuevos proyectos.
---

[Ver en detalle](proyectos/detalle.html?src=content/proyectos/stack-traefik&title=Stack%20Traefik)