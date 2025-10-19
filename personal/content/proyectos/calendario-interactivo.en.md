# Interactive Calendar

**Angular monthly calendar component with FullCalendar**, accessible modals, status filters, and quick actions. Focused on **fluid UX** and **reusability** across views.

## Context and Objectives
The appointment views needed a single, reusable, and accessible calendar.
**Objectives**:
- Create/edit events from the modal with a keyboard and screen reader.
- Filter by status (pending/done/cancelled).
- Reuse the component across patients and specialists.

## My Role and Scope
- **Frontend (Angular)**: standalone architecture, services, typed inputs/outputs.
- **Accessibility (A11y)**: focus, `aria-*`, keyboard navigation.
- **Design**: styles with CSS variables and light/dark theme.

## Stack and Architecture
- **Angular** (standalone) + **FullCalendar**.
- **State**: Event service with reactive filters.
- **UI**: Accessible modal (focus trap, `Esc`, return focus).

[ Angular App ] → [ Calendar Component ]
├─ Event service (fetch/transform)
├─ Reactive filters (Subject/BehaviorSubject)
└─ Accessible modal (create/edit)

## Challenges → Solutions
- **A11y real**: Focus and key management → *focus trap* and `aria-labelledby`.
- **Performance**: Many events → lazy loading and transformation memo.
- **Reusability**: clear props (inputs) and outputs → integration into multiple views without duplicating code.

## Results and metrics
- Modal interaction **< 200 ms**.
- **90+** in Lighthouse (Accessibility/Best Practices).
- Integrated into **3 views** with minimal configuration.

## Gallery

![Monthly View](/assets/projects/calendar/month.webp)
![Detail Modal](/assets/projects/calendar/modal.webp)
![Filter Bar](/assets/projects/calendar/filters.webp)

## Links
- **Demo**: https://asrm.dev/calendar *(adjust if necessary)*
- **Repository**: https://github.com/SebasRodMag/... *(add the real repo)*
- **Detail**: [/projects/interactive-calendar.html](/projects/interactive-calendar.html)

<!--Place images in:
/assets/projects/calendar/{month.webp, modal.webp, filters.webp}-->