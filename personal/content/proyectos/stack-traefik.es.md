# Stack Traefik

**Infraestructura con Docker y Traefik como proxy inverso** para alojar y proteger varios servicios web en el mismo servidor, con certificados HTTPS automáticos y reglas de enrutamiento por dominio.

---
## Contexto y objetivos
Se necesitaba una forma de **gestionar varios sitios web en un único servidor**, cada uno con su propio dominio y certificado HTTPS, sin tener que configurar manualmente un servidor Nginx o Apache por cada uno.

### Objetivos principales:

- Activar **HTTPS automático** (certificados de Let’s Encrypt sin intervención manual).

- Dirigir el tráfico al servicio correcto según el **dominio o subdominio** solicitado.

- Mantener una **estructura modular y segura**, separando la parte pública de las aplicaciones internas.

- Conseguir un **despliegue rápido y reproducible** mediante Docker Compose.
---
## ¿Qué es Traefik?

Traefik es una herramienta que actúa como **puerta de entrada o proxy inverso**:
recibe las peticiones de Internet y las redirige automáticamente al servicio correspondiente dentro del servidor.

Puede verse como un **“encargado del tráfico”**, que:

1. Detecta los contenedores en ejecución.

2. Aplica las reglas de enrutamiento definidas por etiquetas (labels).

3. Gestiona los certificados HTTPS de forma automática.

En otras palabras, Traefik se coloca delante de tus aplicaciones web y se encarga de la seguridad y el acceso de los usuarios.

---
## Mi rol y alcance

**Rol**: administrador de infraestructura y despliegue (DevOps).

**Tareas principales:**
- Crear y configurar el entorno **Docker Compose** para todos los servicios.

- Implementar **Traefik v3** como proxy inverso con HTTPS automático.

- Definir **redes, labels y reglas de enrutamiento** por dominio.

- Configurar **cabeceras de seguridad (HSTS, XSS, etc.)** y persistencia de certificados.

- Automatizar la publicación de imágenes mediante **GitHub Actions**.
---
## Arquitectura general
```yaml
[ Internet ] → [ Traefik ]
├─ Web personal (asrm.dev)
├─ Web de presentación (presentacion.asrm.dev)
├─ Clínica MV frontend (clinicamv.lol)
└─ API Laravel (api.clinicamv.lol)
```
#### Redes utilizadas:

- ``public``: conecta los servicios visibles desde Internet.

- ``internal``: conecta los contenedores privados (por ejemplo, base de datos o PHP-FPM).

**Certificados TLS**: gestionados automáticamente mediante Let’s Encrypt y almacenados de forma persistente.

**Middlewares**: pequeñas configuraciones adicionales aplicadas a cada sitio (por ejemplo, redirección HTTP→HTTPS o cabeceras de seguridad).

---
## Ejemplo representativo (Docker Compose)
```yaml
services:
  reverse-proxy:
    image: traefik:v3
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
#### Qué hace este fragmento:

- Define un contenedor Traefik que escucha en los puertos 80 y 443.

- Genera automáticamente certificados para cada dominio.

- Conecta el contenedor del frontend y le asigna el dominio ``clinicamv.lol.``

- Redirige todo el tráfico HTTP hacia HTTPS.
---
## Problemas comunes y soluciones
|Problema|Causa habitual|Solución aplicada|
|--------|--------------|-----------------|
|``502 Bad Gateway``|Traefik no puede acceder al contenedor (puerto o nombre incorrecto).|Revisar el ``server.port`` y nombre del servicio.|
|Fallo de TLS|El archivo de certificados no se guarda correctamente.|Crear ``acme.json`` y darle permisos ``600``.|
|Inseguridad en cabeceras|Faltan configuraciones HSTS o XSS.|Añadir middlewares de seguridad con headers HTTP.|
---
## Resultados

- **Despliegue reproducible**: levantar todo el entorno en minutos con docker compose up -d.

- **Certificados y redirecciones automáticas**: sin configuraciones manuales.

- **Reglas de enrutamiento claras**: cada dominio se gestiona con sus propias etiquetas.

- **Infraestructura modular y segura**, lista para escalar nuevos proyectos en el mismo servidor.