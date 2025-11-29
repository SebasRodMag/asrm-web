# API Documentation with L5-Swagger, Laravel, and Traefik

This project uses **Laravel** as the backend, **Swagger/OpenAPI** to document the REST API, and **Traefik v3** as a reverse proxy and certificate manager.

The following explains how the documentation is generated, exposed, and integrated into the Docker stack.

---

## 1. Generating Documentation with L5-Swagger

The API documentation is automatically generated from **PHPDoc** annotations in the Laravel controllers.

Example:

```php
/**
* @OA\Get(
* path="/api/pacientes",

* summary="List patients",

* tags={"Patients"},

* @OA\Response(response=200, description="List of patients")
* )
*/
public function index() { ... }
```
Each time a controller is updated or a new endpoint is created, the documentation can be regenerated using:

```bash
php artisan l5-swagger:generate
```

This command builds an OpenAPI file (JSON/YAML), usually in:

```yml
storage/api-docs/openapi.json
```

This file describes the complete API: routes, parameters, responses, models, etc.

## 2. Exposing the OpenAPI File in Laravel

Laravel exposes the generated file using a dedicated path, for example:

```php
Route::get('/docs/openapi.json', function () {
    return response()->file(storage_path('api-docs/openapi.json'), [
        'Content-Type' => 'application/json',
    ]);
});
```
This allows access to the document from outside the application at:

```php
https://api.clinicamv.lol/api/docs/openapi.json
```
Any client (Swagger UI, Postman, external tools, etc.) can use this URL to display the documentation.

## 3. Visual Interface with Swagger UI

The documentation can be viewed in two ways:

* ### Laravel Integrated Version

The L5-Swagger package itself generates a Swagger UI page accessible at a path like:
```php
https://api.clinicamv.lol/api/documentation
```

This view loads Swagger UI and automatically points to the generated JSON.


* ### Standalone version with a swagger-ui container

An external Docker container can also be used:

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

Result:

- Documentation: https://docs.clinicamv.lol/api/documentation

- Real API: https://api.clinicamv.lol

## 4. Integration with Traefik

Traefik acts as a reverse proxy for all project services.

It listens on `:80` and `:443`, obtains TLS certificates with Let’s Encrypt, and routes traffic by domain.

Example backend configuration:

```yml
api:
  image: ghcr.io/sebasrodmag/clinicamv-backend:api-main
  labels:
    - traefik.enable=true
    - traefik.http.routers.clinicamv-api.rule=Host(`api.clinicamv.lol`)
    - traefik.http.routers.clinicamv-api.entrypoints=websecure
    - traefik.http.routers.clinicamv-api.tls.certresolver=lets
```

Request flow:
```bash
Client → https://api.clinicamv.lol → Traefik → Laravel (API + documentation)
Client → https://docs.clinicamv.lol → Traefik → swagger-ui (if applicable) (use separate container)
```

## Gallery

![Swagger view](/assets/proyectos/clinica-mv/swagger.png)

---

## Links

- Demo: https://docs.clinicamv.lol/api/documentation

- Repository: https://github.com/SebasRodMag/ClinicaDieteticaMV