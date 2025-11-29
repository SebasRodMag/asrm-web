# Implementing OpenAPI l5-Swagger in Laravel

- #### 1. Annotations in controllers → generate ``openapi.json``.

The backend uses **Laravel** and the API is documented with **Swagger/OpenAPI** using the L5-Swagger package.

We add `@OA\…` annotations to the controllers.

**We run**:

```bash
php artisan l5-swagger:generate
```
This creates the file:

```bash
storage/api-docs/openapi.json
```

- #### 2. Laravel serves the OpenAPI file to ``/api/docs/openapi.json``.

- #### 3. An interface (L5-Swagger or an external swagger-ui) renders it.


Laravel exposes JSON in:
```bash
https://api.clinicamv.lol/api/docs/openapi.json
```

- #### 4. Traefik publishes everything via HTTPS and load balances according to the domain.

This system allows for a **fully documented**, accessible, maintainable, and reusable API for both internal and external developers.

[View in detail](proyectos/detalle.html?src=content/proyectos/documentoacion-l5-Swagger&title=l5-Swagger%20Open-API)