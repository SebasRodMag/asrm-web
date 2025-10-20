# Videollamadas con Jitsi Meet

**Integración de videollamadas seguras mediante Jitsi Meet** dentro del sistema de gestión de la Clínica Dietética MV.
Permite realizar citas telemáticas directamente desde la aplicación, sin necesidad de instalar software adicional.

---

## Contexto y objetivos

Durante el desarrollo del sistema de gestión de la clínica surgió la necesidad de incluir consultas a distancia entre pacientes y especialistas.
El objetivo fue integrar un sistema de videollamadas sencillo, seguro y que funcionara directamente desde el navegador.

### Objetivos principales:

- Permitir unirse a la videollamada directamente desde la cita.

- Garantizar que solo los participantes asignados (paciente y especialista) puedan acceder.

- Asegurar la privacidad mediante nombres de sala cifrados y control de tiempo de acceso.

- Mantener la integración ligera, sin dependencias externas complejas.

---


## Mi rol y alcance

**Rol**: desarrollo full-stack (frontend y backend).

### Responsabilidades:

- Implementar el flujo completo de unión a videollamadas usando **Jitsi Meet External API**.

- Añadir validaciones en **Laravel (backend)** para controlar acceso y horarios.

- Crear una función **reutilizable en Angular** para abrir la sala de videollamada desde cualquier vista.

- Incorporar logs de auditoría para registrar accesos y garantizar trazabilidad.

---

## Arquitectura general

```text
[ Usuario autenticado ]
        ↓
[ API Laravel ] → Valida cita y genera nombre de sala seguro
        ↓
[ Angular Frontend ] → Abre Jitsi Meet (iframe o nueva ventana)
        ↓
[ Jitsi Server (meet.jit.si) ]
```

### Componentes:

- **Backend Laravel**: genera nombres de sala aleatorios, controla acceso por rol y ventana horaria.

- **Frontend Angular**: obtiene los datos de conexión (dominio, sala, nombre del usuario) y abre la videollamada usando la API externa de Jitsi.

- **Jitsi Meet**: servicio de videoconferencia libre y cifrado que gestiona la comunicación.

---

### Principales retos y soluciones

|Reto|Solución aplicada|
|----|-----------------|
|**Acceso seguro a la sala**|Generación de nombres de sala con firma HMAC para evitar identificaciones predecibles.|
|**Ventana horaria**|Control de tiempo en backend: acceso limitado a unos minutos antes y después de la cita.|
|**Integración reutilizable**|Función genérica ``unirseConferencia()`` usada por pacientes y especialistas.|
|**Privacidad**|Sin datos personales en los nombres de sala ni en los tokens de sesión.|

---

## Resultados

- Sistema de videollamadas completamente integrado y funcional.

- Acceso inmediato desde la interfaz de citas, sin configuraciones adicionales.

- Cifrado automático mediante HTTPS y Jitsi.

- Trazabilidad de accesos mediante registros de logs.

La solución final combina **seguridad**, **usabilidad** y **mantenimiento** **sencillo**, manteniendo la filosofía general del proyecto: herramientas abiertas, configurable y reutilizables.

---

## Enlaces

- **Repositorio**: GitHub – Clínica Dietética MV

- **Tecnología base**: Jitsi Meet External API

- **Detalle técnico**: content/jitsiMeet.md