# MV Clinical Management

**Comprehensive SaaS platform** for clinic management, optimizing care and follow-up between specialists and patients. The solution combines a REST API (Laravel) with a SPA (Angular). The system manages appointments (including telemedicine with Jitsi Meet), medical records, and specific roles.

## Highlights
- **Telemedicine and Appointments**: Integration of secure video calls with Jitsi Meet for remote appointments.

- **Security and Traceability**: Use of Laravel Sanctum (Authentication), Spatie (Roles/Permissions), and audit logs for clinical data integrity.

- **Deployment Architecture**: Infrastructure based on Docker and Traefik (Reverse Proxy), with automatic management of TLS (Let's Encrypt) certificates.

- **Asynchrony and Performance**: Using a **Queue Worker** to manage deferred tasks (such as **Brevo** notifications) and avoid latency in the main API.

[View in detail](proyectos/detalle.html?src=content/proyectos/clinica-mv&title=Cl%C3%ADnica%20Diet%C3%A9tica%20MV)