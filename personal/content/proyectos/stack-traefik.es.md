# Stack Traefik

**Infra con Docker y Traefik como reverse proxy** para servir múltiples servicios con TLS automático, reglas por host/path y despliegue reproducible.

## Contexto y objetivos
Se necesitaba un **edge router** único con certificados, rutas limpias y fácil mantenimiento.  
**Objetivos**:
- HTTPS automático (ACME/Let’s Encrypt).
- Enrutamiento por dominio y subrutas.
- Separación de redes (pública/internal) y logs.

## Mi rol y alcance
- **DevOps**: Docker Compose, Traefik v3, redes y labels.
- **Seguridad**: headers seguros, TLS, persistencia de ACME.
- **CI/CD**: build & push de imágenes desde GitHub Actions.

## Arquitectura (alto nivel)
```yaml
[ Internet ] → [ Traefik ]
├─ Frontend (web)
├─ API (backend)
├─ PHP-FPM (si aplica)
└─ DB (red interna)
```


- **Redes**: `public` (entrada), `internal` (servicios).  
- **TLS**: certresolver con almacenamiento persistente.  
- **Middlewares**: redirecciones, headers y rate-limit (opcional).

## Fragmento representativo (compose)
```yaml
services:
  reverse-proxy:
    image: traefik:v3
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
## Retos → Soluciones

502 Bad Gateway: healthchecks y upstream correcto (nombres de servicio).

TLS: persistir /letsencrypt/acme.json y configurar certresolver.

Seguridad: headers (HSTS, Frame-Options, XSS-Protection) vía middleware.

## Resultados

Despliegue reproducible en minutos.

Certificados y redirecciones automatizados.

Logs centralizados y reglas legibles por labels.