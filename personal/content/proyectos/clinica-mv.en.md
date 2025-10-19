# MV Clinic Management
**MV Clinic**, a comprehensive web platform designed as a SaaS to optimize the management of consultations, appointments, and clinical follow-up between healthcare specialists and their patients. This project was born from the need to completely digitize a clinic's operation, centralizing medical information and facilitating secure telematic communication.

## Context and Objective
The purpose was to transform clinic management into a secure and efficient digital environment, addressing the need to:
- **Simplify Administration**: Digitize appointments, medical records, and documents to reduce paper use and improve traceability.
- **Centralize Information**: Offer a single space for all medical information, documents, appointments, and progress reports for each patient.
- **Enable Telemedicine**: Allow telematic appointments through integration with **Jitsi Meet**, ensuring secure video calls without the need for additional software.
The system is aimed at Specialists, Administrators, and Patients, each with their own private area and specific functionalities.

## My Role and Scope
It covers full-stack development and the SaaS deployment architecture. The main scope included:

- **Logical Core (Backend)**: Development of the **REST API** with **Laravel**, handling the complete business logic: authentication, roles (Patient, Specialist, Administrator), appointment management, and management of medical records and documents.

- **User Interface (Frontend)**: Construction of the **Single Page Application (SPA)** with **Angular**, focused on usability, modularity, and responsive design, with integration of interactive calendars **(FullCalendar)**.

- **Security and Audit**: Implementation of **Laravel Sanctum** for token-based authentication, role-based access control **(Spatie)**, automatic audit logs, and rigorous server- and client-side validations.

## Stack and Architecture
This project stood out for its modern architecture and container-based deployment, aiming for **scalability** and **security**:

### Stack
**Backend**: **Laravel 12** (PHP 8.2+) with **Laravel Sanctum** (Authentication), **Spatie** **Laravel** **Permissions** (Roles/Permissions), and **MySQL 8** as the database.

Frontend**: **Angular 18** (Standalone Components), using **Bootstrap 5** for responsive design.

### Architecture
**Deployment**: System based on **Docker containers** and an internal network.

**Proxy/Security**: **Traefik** as a *Reverse Proxy* and TLS terminator, automating the issuance and renewal of **Let's Encrypt** certificates to secure HTTPS traffic (e.g., ``https://app.clinicamv.lol``).

**Services**: Multiple interconnected containers: **Frontend** (Angular/Nginx), **API** (Nginx - PHP-FPM/Laravel), **Queue** (Laravel Worker for asynchronous tasks), and **MySQL**.

## Challenges and Solutions
- **The Challenge of Telemedicine and Security**
- **Challenge**: Need to integrate video calls securely without relying on expensive or complex third-party platforms and to secure access to clinical documents.

- **Solution**: Integration with Jitsi Meet for remote appointments, combined with strict access control to documents and appointments using authenticated roles (Guards in Angular and Spatie in Laravel).

- **Ensuring Clinical Data Integrity and Traceability**
- **Challenge**: In a healthcare environment, it is vital to ensure data integrity, enable reversibility of actions, and maintain a record of who did what and when.

- **Solution**: Use of **SoftDeletes** and automatic audit logs **(Action Logging)** in the backend to record relevant actions (for auditing purposes) and ensure the integrity and reversibility of clinical data.

- **Asynchrony and Performance**
- **Challenge**: Tasks such as sending emails (appointment notifications, etc.) could slow down the API response.

- **Solution**: Implementation of a **Queue Worker** service with Laravel to manage asynchronous tasks (such as sending emails via **Brevo/Sendinblue**), freeing up the main thread and improving application performance.

- **Robust Deployment Architecture**
- **Challenge**: Create a secure, scalable production environment with automatic certificate management.

- **Solution**: Design of an **Docker- and Traefik-based architecture** that isolates internal services and uses Reverse Proxy to manage HTTPS routing and automatic SSL certificate issuance with Let's Encrypt.

## Gallery
#### Monthly Calendar
<p align="center">
<img src="/assets/proyectos/clinica-mv/calendario.png" alt="Calendar Image" width="300">
</p>

<!-- ![Calendar](/assets/projects/clinica-mv/calendar.png) -->
#### Patient History Record
<p align="center">
<img src="/assets/proyectos/clinica-mv/historiales.png" alt="History Image" width="300">
</p>

<!-- ![History](/assets/projects/clinica-mv/histories.png) -->
#### Video Calls Within the Platform
<p align="center">
<img src="/assets/proyectos/clinica-mv/Videollamada.png" alt="Videocall image" width="300">
</p>

<!-- ![Videocall](/assets/projects/clinica-mv/Videocall.png) -->

## Links
- **Demo**: https://www.clinicamv.lol
- **Repository**: https://github.com/SebasRodMag/ClinicaDieteticaMV