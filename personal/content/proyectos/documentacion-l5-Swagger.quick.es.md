# Implementación de Open-API l5-Sagger en Laravel

- #### 1. Las anotaciones en los controladores → generan ``openapi.json``.

El backend usa **Laravel** y la API está documentada con **Swagger/OpenAPI** mediante el paquete L5-Swagger.
Añadimos anotaciones `@OA\…` en los controladores.
**Ejecutamos**:

```bash
php artisan l5-swagger:generate
```
Esto crea el archivo:

```bash
storage/api-docs/openapi.json
```

- #### 2. Laravel sirve el fichero OpenAPI en ``/api/docs/openapi.json``.
- #### 3. Una interfaz (L5-Swagger o swagger-ui externo) lo renderiza.

Laravel expone el JSON en:
```bash
https://api.clinicamv.lol/api/docs/openapi.json
```

- #### 4. Traefik publica todo mediante HTTPS y balancea según el dominio.

Este sistema permite tener una **API totalmente documentada**, accesible, mantenible y reutilizable tanto por desarrolladores internos como externos.
---
[Ver en detalle](proyectos/detalle.html?src=content/proyectos/documentacion-l5-Swagger&title=l5-Swagger%20Open-API)