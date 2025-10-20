# Interactive Calendar (Angular + FullCalendar)

**Interactive monthly calendar** developed in **Angular**, with accessibility support (A11y), dynamic modals, and appointment status filters.
Designed to offer a fluid experience for both patients and specialists.

---

## Objective

Create a **reusable and accessible** component to manage medical appointments from a single calendar, allowing:

- View the status of each appointment (pending, scheduled, canceled).

- Create or edit events using an intuitive modal.

- Reuse the same calendar in different views without duplicating code.

---

## How it works

The component combines FullCalendar with a reactive Angular service that manages events and filters.
```yaml
[ Angular Application ]
└─ [ Calendar Component ]
├─ Event Service
├─ Dynamic Filters
└─ Accessible Modal
```
---
## Results

- **Accessible navigation** with keyboard and screen reader.

- **Optimal performance** with lazy event loading.

- **Cross-platform integration**, used in three main views of the system.
The calendar is easily integrated using typed inputs/outputs.
---
[View in detail](proyectos/detalle.html?src=content/proyectos/calendario-interactivo&title=Calendario%20interactivo)