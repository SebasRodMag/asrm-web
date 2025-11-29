# Documentación de la API con L5-Swagger, Laravel y Traefik

Este proyecto utiliza **Laravel** como backend, **Swagger/OpenAPI** para documentar la API REST y **Traefik v3** como reverse proxy y gestor de certificados.  
A continuación se explica cómo se genera la documentación, cómo se expone y cómo se integra dentro del stack Docker.

---

## 1. Generación de la documentación con L5-Swagger

La documentación de la API se genera automáticamente a partir de **anotaciones PHPDoc** en los controladores de Laravel.  
Ejemplo:

```php
/**
 * @OA\Get(
 *   path="/api/pacientes",
 *   summary="Listar pacientes",
 *   tags={"Pacientes"},
 *   @OA\Response(response=200, description="Listado de pacientes")
 * )
 */
public function index() { ... }
```
Cada vez que se actualiza un controlador o se crea un nuevo endpoint, se puede regenerar la documentación mediante:
```bash
php artisan l5-swagger:generate
```
Este comando construye un fichero OpenAPI (JSON/YAML), normalmente en:
```yml
storage/api-docs/openapi.json
```
Este fichero describe la API completa: rutas, parámetros, respuestas, modelos, etc.

## 2. Exposición del fichero OpenAPI en Laravel

Laravel expone el fichero generado mediante una ruta dedicada, por ejemplo:

```php
Route::get('/docs/openapi.json', function () {
    return response()->file(storage_path('api-docs/openapi.json'), [
        'Content-Type' => 'application/json',
    ]);
});
```
Esto permite acceder al documento desde el exterior en:

```php
https://api.clinicamv.lol/api/docs/openapi.json
```
Cualquier cliente (Swagger UI, Postman, herramientas externas, etc.) puede consumir esta URL para mostrar la documentación.

## 3. Interfaz visual con Swagger UI

La documentación puede visualizarse de dos formas:

* ### Versión integrada en Laravel

El propio paquete L5-Swagger genera una página Swagger UI accesible en una ruta como:
```php
https://api.clinicamv.lol/api/documentation
```

Esta vista carga Swagger UI y apunta automáticamente al JSON generado.

* ### Versión independiente con un contenedor swagger-ui

También puede utilizarse un contenedor Docker externo:

```yml
swagger-ui:
  image: swaggerapi/swagger-ui
  environment:
    SWAGGER_JSON: /api-docs/openapi.json
  volumes:
    - ./openapi/openapi.json:/api-docs/openapi.json:ro
  labels:
    - traefik.enable=true
    - traefik.http.routers.clinicamv-docs.rule=Host(`docs.clinicamv.lol`)
    - traefik.http.routers.clinicamv-docs.entrypoints=websecure
    - traefik.http.routers.clinicamv-docs.tls.certresolver=lets
```

Resultado:

- Documentación: https://docs.clinicamv.lol

- API real: https://api.clinicamv.lol

## 4. Integración con Traefik

Traefik actúa como reverse proxy para todos los servicios del proyecto.
Escucha en ``:80`` y ``:443``, obtiene certificados TLS con Let’s Encrypt y enruta el tráfico por dominio.

Ejemplo de configuración del backend:

```yml
api:
  image: ghcr.io/sebasrodmag/clinicamv-backend:api-main
  labels:
    - traefik.enable=true
    - traefik.http.routers.clinicamv-api.rule=Host(`api.clinicamv.lol`)
    - traefik.http.routers.clinicamv-api.entrypoints=websecure
    - traefik.http.routers.clinicamv-api.tls.certresolver=lets
```

Flujo de peticiones:
```bash
Cliente → https://api.clinicamv.lol → Traefik → Laravel (API + documentación)
Cliente → https://docs.clinicamv.lol → Traefik → swagger-ui (si se usa contenedor separado)
```

## Galería

![Vista swagger](/assets/proyectos/clinica-mv/swagger.png)

---

## Enlaces

- Demo: https://docs.clinicamv.lol/api/documentation

- Repositorio: https://github.com/SebasRodMag/ClinicaDieteticaMV