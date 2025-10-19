# Centro Médico
Es una aplicación web para un Centro Médico especializado en realizar reconocimientos médicos para empresas.

## Contexto y Objetivo
El objetivo principal era modernizar y optimizar la gestión de citas médicas de este centro. Necesitaban una herramienta para administrar:

- **Clientes** (empresas) y sus datos.
- Contratos de reconocimientos asociados a cada cliente.
- La **reserva** y **realización** de las citas médicas.

En esencia, construimos un sistema robusto para que la administración, los clientes y los médicos pudieran trabajar de forma eficiente.

## Mi Rol y Alcance
Mi participación se centró en la implementación del **alcance mínimo** del proyecto, que incluía las funcionalidades esenciales (la base del sistema).

- **Gestión de Clientes**: CRUD (Crear, Listar con filtros, Editar) de clientes, con la particularidad de generar automáticamente un usuario de tipo "Cliente" y un contrato vigente al crear uno nuevo.


- **Gestión de Contratos**: El sistema maneja contratos anuales y permite su consulta y gestión por parte del administrador.

- **Reserva de Citas**: Permite al cliente o al administrador registrar el número de reconocimientos en una fecha, validando la disponibilidad (máximo una reserva por hora). Cada reconocimiento dura 5 minutos.

- **Realización de Citas**: El médico puede registrar el número real de reconocimientos realizados durante la cita del día.

- **Roles y Autenticación**: Implementación de tres roles clave: **Administrador**, **Cliente** y **Médico** con permisos específicos para cada uno.

## Stack Tecnológico y Arquitectura
Este fue un proyecto full-stack donde aplicamos tecnologías como:
- **Frontend (SPA)**: Desarrollado con **Angular**.

- **Backend (API Rest)**: Construido con **Laravel**.

- **Arquitectura**: Una arquitectura clásica de aplicación web, separando la API (backend) de la Interfaz de Usuario (frontend).

- **Infraestructura (Dev/Local)**: Utilizamos **Docker** y **Docker Compose** para montar el entorno de desarrollo, incluyendo contenedores para PHP, Nginx y MySQL, lo que nos permitió una configuración rápida y portable.

- **Diseño de BBDD**: Implementación de un modelo de base de datos relacional con tablas clave como ``Usuarios``, ``Clientes``, ``Contratos`` y ``Citas``, diseñadas para cumplir con los requerimientos de las relaciones 1:1 y 1:N necesarias.

## Retos y Soluciones
- **El Reto de la Lógica Contractual Compleja**
    - **Reto**: No solo se trataba de registrar clientes, sino de gestionar su ciclo de vida contractual. Al crear un cliente, se debe generar un contrato de un año. Al reservar citas, se debe validar que el contrato esté vigente y que no se exceda el número de reconocimientos contratados.
    - **Solución**: Creamos un flujo de gestión de contratos robusto, asegurando que cada cliente siempre tenga un contrato asociado al ser creado. Además, en el flujo de reserva, el ```CitasController``` y el ``CitaService`` se encargan de **consultar el contrato vigente** y **verificar el número de revisiones** ya realizadas antes de permitir la reserva.

- **Garantizar la Disponibilidad de Citas**
    - **Reto**: El sistema debía validar que no se pudieran solapar las reservas, dado que cada reconocimiento tiene una duración de 5 minutos, y solo puede haber una reserva a la misma hora.
    - **Solución**: Implementación de la lógica de Verificación de Disponibilidad en el ``CitaService`` que comprueba si existe ya una reserva para la hora solicitada antes de persistir el dato en la BBDD.`

- **La Diferencia de Permisos (Roles)**
    - **Reto**: Diseñar la aplicación para que el Administrador viera todo, el Cliente solo viera sus propias reservas y el Médico solo pudiera interactuar con las citas del día actual.
    - **Solución**: Se implementó un sistema de **Autenticación con Roles** (``Cliente``, ``Médico``, ``Administrador``). Toda interacción (como consultar citas o registrarlas) está condicionada al rol del usuario. Por ejemplo:

        - El Cliente solo consulta ``mis citas``.
        - El Médico solo consulta y edita las ``citas del día``.

## Enlaces
- - **Repositorio**: https://github.com/SebasRodMag/Proyect_Centro_Medico