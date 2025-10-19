# Gestión Clinica MV
**Clínica MV**, una plataforma web integral diseñada como SaaS para optimizar la gestión de consultas, citas y el seguimiento clínico entre especialistas de la salud y sus pacientes. Este proyecto nace de la necesidad de digitalizar completamente la operación de una clínica, centralizando la información médica y facilitando la comunicación telemática segura.

## Contexto y objetivo
El propósito era transformar la gestión de la clínica en un entorno digital seguro y eficiente, abordando la necesidad de:
- **Simplificar la Administración**: Digitalizar citas, historiales y documentos clínicos para reducir el uso de papel y mejorar la trazabilidad.
- **Centralizar la Información**: Ofrecer un espacio único para toda la información médica, documentos, citas y evoluciones de cada paciente.
- **Habilitar la Telemedicina**: Permitir citas telemáticas mediante la integración con **Jitsi Meet**, garantizando videollamadas seguras sin necesidad de software adicional.
El sistema está dirigido a Especialistas, Administradores y Pacientes, cada uno con su área privada y funcionalidades específicas.

## Mi rol y alcance
Abarca el desarrollo full-stack y la arquitectura de despliegue del SaaS. El alcance principal incluyó:

- **Núcleo Lógico (Backend)**: Desarrollo de la **API REST** con **Laravel**, manejando la lógica de negocio completa: autenticación, roles (``Paciente``, ``Especialista``, ``Administrador``), gestión de citas y la administración de historiales y documentos clínicos.

- **Interfaz de Usuario (Frontend)**: Construcción de la **Single Page Application (SPA)** con **Angular**, enfocada en la usabilidad, la modularidad y el diseño responsive, con integración de calendarios interactivos **(FullCalendar)**.

- **Seguridad y Auditoría**: Implementación de **Laravel Sanctum** para autenticación por tokens, control de accesos por roles **(Spatie)**, logs de auditoría automáticos y validaciones rigurosas en servidor y cliente.

## Stack y arquitectura
Este proyecto destacó por su arquitectura moderna y su despliegue basado en contenedores, buscando la **escalabilidad** y la **seguridad**:

### Stack
**Backend**: **Laravel 12** (PHP 8.2+) con **Laravel Sanctum** (Autenticación), **Spatie** **Laravel** **Permissions** (Roles/Permisos) y **MySQL 8** como base de datos.

F**rontend**: **Angular 18** (Standalone Components), utilizando **Bootstrap 5** para el diseño responsive.

### Arquitectura
**Despliegue**: Sistema basado en **contenedores Docker** y una red interna.

**Proxy/Seguridad**: **Traefik** como *Reverse Proxy* y terminador TLS, automatizando la emisión y renovación de **certificados Let’s Encrypt** para garantizar el tráfico HTTPS (por ejemplo, ``https://app.clinicamv.lol``).

**Servicios**: Múltiples contenedores interconectados: **Frontend** (Angular/Nginx), **API** (Nginx - PHP-FPM/Laravel), **Queue** (Laravel Worker para tareas asíncronas) y **MySQL**.

## Retos y Soluciones
- **El Desafío de la Telemedicina y la Seguridad**
  - **Reto**: Necesidad de integrar videollamadas de forma segura sin depender de plataformas de terceros con coste o instalación compleja, y asegurar el acceso a documentos clínicos.

  - **Solución**: Integración con Jitsi Meet para citas telemáticas, combinada con un control de acceso estricto a documentos y citas mediante el rol autenticado (Guards en Angular y Spatie en Laravel).

- **Garantizar la Integridad y Trazabilidad del Dato Clínico**
  - **Reto**: En un entorno sanitario, es vital garantizar la integridad de los datos, permitir la reversibilidad de acciones y mantener un registro de quién hizo qué y cuándo.

  - **Solución**: Uso de **SoftDeletes** y logs de auditoría automáticos **(Registro de acciones)** en el backend para registrar las acciones relevantes (con fines de auditoría) y garantizar la integridad y reversibilidad de los datos clínicos.

- **Asincronía y Rendimiento**
  - **Reto**: Tareas como el envío de correos electrónicos (notificaciones de citas, etc.) podían ralentizar la respuesta de la API.

  - **Solución**: Implementación de un servicio de **Queue Worker** con Laravel para gestionar tareas asincrónicas (como el envío de correos vía **Brevo/Sendinblue**), liberando al thread principal y mejorando el rendimiento de la aplicación.

- **Arquitectura de Despliegue Robusta**
  - **Reto**: Crear un entorno de producción que fuera seguro, escalable y con gestión automática de certificados.

  - **Solución**: Diseño de una **arquitectura basada en Docker y Traefik**, que aísla los servicios internos y utiliza el Reverse Proxy para gestionar el routing HTTPS y la emisión automática de certificados SSL con Let’s Encrypt.

## Galería
#### Calendario mensual
<p align="center">
  <img src="/assets/proyectos/clinica-mv/calendario.png" alt="Imagen calendario" width="300">
</p>

<!-- ![Calendario](/assets/proyectos/clinica-mv/calendario.png) -->
#### Registro del historial del paciente
<p align="center">
  <img src="/assets/proyectos/clinica-mv/historiales.png" alt="Imagen historiales" width="300">
</p>

<!-- ![Historial](/assets/proyectos/clinica-mv/historiales.png) -->
#### Videollamadas dentro de la plataforma
<p align="center">
  <img src="/assets/proyectos/clinica-mv/Videollamada.png" alt="Imagen videollamada" width="300">
</p>

<!-- ![Videollamada](/assets/proyectos/clinica-mv/Videollamada.png) -->

## Enlaces
- **Demo**: https://www.clinicamv.lol
- **Repositorio**: https://github.com/SebasRodMag/ClinicaDieteticaMV
