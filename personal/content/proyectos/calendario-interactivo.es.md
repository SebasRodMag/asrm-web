# Calendario Interactivo

**Componente de calendario mensual en Angular con FullCalendar**, modales accesibles, filtros por estado y acciones rápidas. Enfocado en **UX fluida** y **reutilización** entre vistas.

## Contexto y objetivos
Las vistas de citas necesitaban un calendario único, reutilizable y accesible.  
**Objetivos**:
- Crear/editar eventos desde modal con teclado y lector de pantalla.
- Filtrar por estado (pendiente/realizada/cancelada).
- Reutilizar el componente en pacientes y especialistas.

## Mi rol y alcance
- **Frontend (Angular)**: arquitectura standalone, servicios, inputs/outputs tipados.
- **Accesibilidad (A11y)**: foco, `aria-*`, navegación con teclado.
- **Diseño**: estilos con variables CSS y tema claro/oscuro.

## Stack y arquitectura
- **Angular** (standalone) + **FullCalendar**.
- **Estado**: servicio de eventos con filtros reactivos.
- **UI**: modal accesible (focus trap, `Esc`, retorno de foco).

[ Angular App ] → [ Componente Calendario ]
├─ Servicio de eventos (fetch/transform)
├─ Filtros reactivos (Subject/BehaviorSubject)
└─ Modal accesible (crear/editar)

## Retos → Soluciones
- **A11y real**: gestión de foco y teclas → *focus trap* y `aria-labelledby`.
- **Rendimiento**: muchos eventos → lazy load y memo de transformaciones.
- **Reutilización**: props claras (inputs) y eventos de salida (outputs) → integración en varias vistas sin duplicar código.

## Resultados y métricas
- Interacción en modal **< 200 ms**.
- **90+** en Lighthouse (Accesibilidad/Best Practices).
- Integrado en **3 vistas** con mínima configuración.

## Galería

![Vista mensual](/assets/proyectos/calendario/mes.webp)
![Modal de detalle](/assets/proyectos/calendario/modal.webp)
![Barra de filtros](/assets/proyectos/calendario/filtros.webp)

## Enlaces
- **Demo**: https://asrm.dev/calendario *(ajusta si procede)*  
- **Repositorio**: https://github.com/SebasRodMag/... *(pon el repo real)*  
- **Detalle**: [/proyectos/calendario-interactivo.html](/proyectos/calendario-interactivo.html)

<!--Coloca las imágenes en:
/assets/proyectos/calendario/{mes.webp, modal.webp, filtros.webp}-->