# Calendario Interactivo

**Componente de calendario mensual desarrollado en Angular con FullCalendar**, diseñado para ofrecer una **experiencia fluida**, accesible y adaptable a distintos tipos de usuario dentro de la aplicación de gestión de citas médicas.
---

## Contexto y objetivos
En la aplicación, tanto los pacientes como los especialistas necesitaban visualizar y gestionar sus citas de forma clara y rápida.
Para ello, se creó un **calendario interactivo único**, reutilizable en ambas vistas.
#### Objetivos principales:

- Permitir crear o editar citas desde un modal accesible con teclado y lector de pantalla.

- Mostrar el estado de cada cita (pendiente, realizada o cancelada) mediante colores y filtros.

- Reutilizar el mismo componente en distintas secciones sin duplicar código.

El objetivo final fue mejorar la **usabilidad** (UX) y reducir la carga cognitiva del usuario.
---

## Mi rol y alcance

**Rol**: desarrollo frontend y experiencia de usuario (UX).

**Responsabilidades**:

- Implementación del componente con **Angular standalone** y la librería **FullCalendar**.

- Gestión del estado y filtrado de eventos mediante **servicios reactivos**.

- Diseño de la interfaz con **variables CSS**.

- Aplicación de **principios de accesibilidad** (A11y): navegación con teclado, enfoque visible y atributos ``aria-*`` descriptivos.

---

## Arquitectura y funcionamiento
El componente se integra en la aplicación Angular como una pieza independiente y reutilizable.
```yaml
[ Aplicación Angular ] → [ Componente Calendario ]
├─ Servicio de eventos (carga y filtrado)
├─ Filtros dinámicos (estado de la cita)
└─ Modal accesible (crear, ver o editar cita)
```
- **FullCalendar** se utiliza para representar el calendario mensual.

- Un **servicio centralizado** gestiona la lista de citas y los filtros por estado.

- Los **modales accesibles** permiten interactuar con cada cita sin salir de la vista principal.

- El sistema de **inputs y outputs tipados** facilita la comunicación con otros componentes sin acoplamiento.

## Principales retos y soluciones
|Reto|Solución aplicada|
|----|-----------------|
|Accesibilidad real (A11y)|Implementación de focus trap, soporte de teclas (``Esc``, ``Tab``, ``Enter``) y uso de ``aria-labelledby``.|
|Rendimiento con muchos eventos|Carga diferida (*lazy loading*) y transformación de datos con memorias intermedias (*memoization*).|
|Reutilización entre vistas|Parámetros configurables (inputs) y eventos personalizados (outputs) para usar el mismo calendario con distintos roles.|

## Resultados

- Interacciones en el modal con respuesta **inferior a 200 ms**.

- **Puntuaciones de accesibilidad superiores a 90** % en Lighthouse.

- Integración completa en **tres vistas diferentes** sin duplicar lógica.

- Interfaz coherente con el tema visual general de la aplicación.

## Galería

![Vista mensual](/assets/proyectos/clinica-mv/calendario.png)

## Enlaces

- Demo: https://www.clinicamv.lol

- Repositorio: https://github.com/SebasRodMag/ClinicaDieteticaMV

<!--Coloca las imágenes en:
/assets/proyectos/calendario/{mes.webp, modal.webp, filtros.webp}-->