# Videollamadas con Jitsi Meet

**Integración de videollamadas seguras** mediante Jitsi Meet para realizar citas telemáticas directamente desde la aplicación de la Gestión Clinica MV.

---

## Objetivo

Ofrecer una alternativa a las citas presenciales, permitiendo que pacientes y especialistas se comuniquen en línea desde cualquier dispositivo.

---

### Cómo funciona

El sistema valida la cita en el backend y genera un **nombre de sala cifrado**, evitando accesos no autorizados.
Desde el frontend Angular, una función genérica abre la videollamada usando la **API externa de Jitsi Meet**, sin salir de la aplicación.

```yaml


[ Usuario autenticado ]
 └─ [ Cita telemática ]
     → [ Sala Jitsi segura ]
```

---


## Resultados

- Acceso seguro y sin instalación externa.

- Reutilizable por pacientes y especialistas.

- Cifrado y control de acceso automáticos.

- Integrado con logs y control horario en backend.