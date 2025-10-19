# Gestión Clinica MV

**Plataforma SaaS** integral para la gestión de clínicas, optimizando la atención y el seguimiento entre especialistas y pacientes. La solución combina una **API REST** **(Laravel)** con una **SPA** **(Angular)**. El sistema gestiona citas (incluyendo telemedicina con Jitsi Meet), historiales clínicos y roles específicos.

## Destacado
- **Telemedicina y Citas**: Integración de videollamadas seguras con **Jitsi Meet** para citas telemáticas.

- **Seguridad y Trazabilidad**: Uso de **Laravel Sanctum** (Autenticación), **Spatie** (Roles/Permisos) y logs de auditoría para la integridad de los datos clínicos.

- **Arquitectura de Despliegue**: Infraestructura basada en **Docker y Traefik** (Reverse Proxy), con gestión automática de **certificados TLS (Let's Encrypt)**.

- **Asincronía y Rendimiento**: Uso de un **Queue Worker** para gestionar tareas diferidas (como notificaciones por **Brevo**) y evitar latencia en la API principal.

[Ver en detalle](proyectos/detalle.html?src=content/proyectos/clinica-mv&title=Cl%C3%ADnica%20Diet%C3%A9tica%20MV)
