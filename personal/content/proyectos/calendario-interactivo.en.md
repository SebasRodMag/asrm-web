# Interactive Calendar

**Monthly calendar component developed in Angular with FullCalendar**, designed to offer a **fluid**, accessible, and adaptable experience for different types of users within the medical appointment management application.
---

## Context and objectives
In the application, both patients and specialists needed to view and manage their appointments clearly and quickly.
To achieve this, a **single interactive calendar** was created, reusable in both views.
#### Main objectives:

- Allow appointments to be created or edited from a modal accessible with a keyboard and screen reader.

- Display the status of each appointment (pending, made, or canceled) using colors and filters.

- Reuse the same component in different sections without duplicating code.

The ultimate goal was to improve **usability** (UX) and reduce the user's cognitive load.
---

## My role and scope

**Role**: Front-end development and user experience (UX).

**Responsibilities**:

- Implementation of the component using **Angular standalone** and the **FullCalendar** library.

- State management and event filtering using **reactive services**.

- Interface design using **CSS variables**.

- Application of **accessibility principles** (A11y): keyboard navigation, visible focus, and descriptive ``aria-*`` attributes.

---

## Architecture and Functionality
The component is integrated into the Angular application as an independent and reusable component.
```yaml
[ Angular Application ] → [ Calendar Component ]
├─ Event service (loading and filtering)
├─ Dynamic filters (appointment status)
└─ Accessible modal (create, view, or edit appointment)
```
- **FullCalendar** is used to render the monthly calendar.

- A **centralized service** manages the appointment list and filters by status.

- **Accessible modals** allow interaction with each appointment without leaving the main view.

- The system of **typed inputs and outputs** facilitates communication with other components without coupling.

## Main challenges and solutions
|Challenge|Applied solution|
|----|-----------------|
|Real accessibility (A11y)|Implementation of focus trap, key support (``Esc``, ``Tab``, ``Enter``), and use of ``aria-labelledby``.|
|Performance with many events|Lazy loading and data transformation with buffers (*memoization*).|
|Reuse between views|Configurable parameters (inputs) and custom events (outputs) to use the same calendar with different roles.|

## Results

- Interactions in the modal with a response time of **less than 200 ms**.

- **Accessibility scores above 90%** in Lighthouse.

- Full integration in **three different views** without duplicating logic.

- Interface consistent with the app's overall visual theme.

## Gallery

[Monthly View](/assets/projects/clinica-mv/calendar.png)

## Links

- Demo: https://www.clinicamv.lol

- Repository: https://github.com/SebasRodMag/ClinicaDieteticaMV