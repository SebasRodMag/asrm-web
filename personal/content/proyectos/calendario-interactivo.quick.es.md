# Calendario Interactivo (Angular + FullCalendar)

**Calendario mensual interactivo** desarrollado en **Angular**, con soporte de accesibilidad (A11y), modales dinámicos y filtros por estado de cita.
Diseñado para ofrecer una experiencia fluida tanto a pacientes como a especialistas.

---

## Objetivo

Crear un componente **reutilizable y accesible** para gestionar citas médicas desde un mismo calendario, permitiendo:

- Ver el estado de cada cita (pendiente, realizada, cancelada).

- Crear o editar eventos mediante un modal intuitivo.

- Reutilizar el mismo calendario en distintas vistas sin duplicar código.

---

## Cómo funciona

El componente combina FullCalendar con un servicio reactivo de Angular que gestiona los eventos y filtros.
```yaml
[ Aplicación Angular ]
 └─ [ Componente Calendario ]
     ├─ Servicio de eventos
     ├─ Filtros dinámicos
     └─ Modal accesible
```
---
## Resultados

- **Navegación accesible** con teclado y lector de pantalla.

- **Rendimiento óptimo** con carga diferida de eventos.

- **Integración multiplataforma**, usada en tres vistas principales del sistema.
El calendario se integra fácilmente mediante inputs/outputs tipados.
---
[Ver en detalle](proyectos/detalle.html?src=content/proyectos/calendario-interactivo&title=Calendario%20interactivo)