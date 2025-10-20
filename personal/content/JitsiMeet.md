# Videoconsultas con Jitsi Meet

## Objetivo

Habilitar **citas telemáticas** seguras mediante **Jitsi Meet**, integradas en la app:

- Unirse a la videollamada **desde la cita**, sin salir del sistema.

- **Control de acceso**: solo paciente/especialista asignados, y solo durante el horario de la cita.

- **Room names no adivinables** y sin datos personales.

- Configuración **reutilizable** en frontend (Angular) y backend (Laravel).

---

## Arquitectura y flujo

````text
[Usuario autenticado] → [Frontend Angular] → (GET /api/citas/{id}/join)
                                     ← { domain, roomName, subject, displayName, jwt? }
Frontend invoca Jitsi External API → abre sala (iframe/modal/nueva ventana)
````

- El **backend valida**: rol, pertenencia a la cita, que sea telemática, estado, ventana horaria.

- El **backend genera** roomName seguro y devuelve la configuración mínima para Jitsi.

- El **frontend abre** Jitsi mediante **Jitsi Meet External API** (sin exponer lógica sensible).

---

## Requisitos y configuración
### Backend (Laravel)

Variables recomendadas en ``.env``:
```env
# Dominio de Jitsi público o propio
JITSI_DOMAIN=meet.jit.si

# Opcional: si usas Jitsi con JWT (self-hosted / 8x8)
JITSI_APP_ID=
JITSI_PRIVATE_KEY=
JITSI_KID=
JITSI_AUDIENCE=jitsi
```

Archivo ``config/jitsi.php``:

```php
<?php

return [
    'domain' => env('JITSI_DOMAIN', 'meet.jit.si'),
    'jwt'    => [
        'enabled' => env('JITSI_JWT_ENABLED', false),
        'app_id'  => env('JITSI_APP_ID'),
        'kid'     => env('JITSI_KID'),
        'aud'     => env('JITSI_AUDIENCE', 'jitsi'),
        // La clave privada PEM para firmar el JWT (RSA)
        'private_key' => env('JITSI_PRIVATE_KEY'),
    ],
    // Minutos antes/después de la hora de inicio permitidos para entrar
    'early_join_minutes' => env('JITSI_EARLY_JOIN_MINUTES', 10),
    'late_join_minutes'  => env('JITSI_LATE_JOIN_MINUTES', 120),
    // Prefijo para nombres de sala (no PII)
    'room_prefix' => env('JITSI_ROOM_PREFIX', 'clinicamv'),
];
```
---

### Frontend (Angular)

No requiere SDK externo si usas el script de Jitsi por CDN:
```html
<!-- index.html -->
<script src="https://meet.jit.si/external_api.js" defer></script>
```

----

## Backend (Laravel) — Endpoint de unión a videollamada
### Ruta
```php
// routes/api.php
Route::middleware('auth:sanctum')->get('/citas/{id}/join', [\App\Http\Controllers\CitaController::class, 'joinTelematica']);
```

---

### Lógica en CitaController.php

Puntos clave:

- Verifica que el usuario sea paciente o especialista de la cita.

- Verifica estado (p. ej., pendiente), tipo (telemática) y ventana horaria.

- Genera un roomName seguro con HMAC-SHA256 y un prefijo (sin PII).

- Devuelve { domain, roomName, subject, displayName, jwt? }.

```php
public function joinTelematica(Request $request, int $id): JsonResponse
{
    $user = $request->user();
    $cita = Cita::with(['paciente.user', 'especialista.user'])->findOrFail($id);

    // 1) Seguridad: pertenencia a la cita
    $esPaciente    = $cita->paciente && $cita->paciente->user_id === $user->id;
    $esEspecialista= $cita->especialista && $cita->especialista->user_id === $user->id;
    if (!$esPaciente && !$esEspecialista && !$user->hasRole('administrador')) {
        return response()->json(['message' => 'No autorizado para esta cita.'], 403);
    }

    // 2) Validaciones de cita
    if (!$cita->es_telematica) {
        return response()->json(['message' => 'La cita no es telemática.'], 422);
    }
    if ($cita->estado !== 'pendiente') {
        return response()->json(['message' => 'La cita no está en estado pendiente.'], 422);
    }

    // 3) Ventana horaria
    $inicio = \Carbon\Carbon::parse($cita->fecha_hora_inicio);
    $fin    = \Carbon\Carbon::parse($cita->fecha_hora_fin ?? $inicio->copy()->addMinutes(45));
    $ahora  = now();

    $early = (int)config('jitsi.early_join_minutes', 10);
    $late  = (int)config('jitsi.late_join_minutes', 120);

    if ($ahora->lt($inicio->copy()->subMinutes($early)) || $ahora->gt($fin->copy()->addMinutes($late))) {
        return response()->json(['message' => 'La sala no está disponible en este momento.'], 423);
    }

    // 4) Generación de roomName segura (sin datos personales)
    $prefix  = config('jitsi.room_prefix', 'clinicamv');
    $payload = $cita->id.'|'.$inicio->format('YmdHi');
    $digest  = base64_encode(hash_hmac('sha256', $payload, config('app.key'), true));
    $slug    = rtrim(strtr($digest, '+/', '-_'), '=');
    $roomName = "{$prefix}_{$slug}";

    // 5) Datos de presentación mínimos
    $domain  = config('jitsi.domain', 'meet.jit.si');
    $subject = 'Cita de seguimiento';
    $displayName = $user->name ?? 'Usuario';

    // 6) (Opcional) JWT si usas despliegue con tokens
    $jwt = null;
    if (config('jitsi.jwt.enabled')) {
        $jwt = $this->emitirTokenJitsi($roomName, $displayName);
    }

    // 7) (Opcional) log de auditoría
    $this->logAction($user, 'join_jitsi', [
        'cita_id' => $cita->id,
        'room'    => $roomName,
        'ts'      => $ahora->toIso8601String(),
    ]);

    return response()->json(compact('domain', 'roomName', 'subject', 'displayName', 'jwt'));
}

/**
 * Emite un JWT para Jitsi (self-hosted) — opcional.
 */
private function emitirTokenJitsi(string $roomName, string $displayName): ?string
{
    $appId  = config('jitsi.jwt.app_id');
    $kid    = config('jitsi.jwt.kid');
    $aud    = config('jitsi.jwt.aud', 'jitsi');
    $pkey   = config('jitsi.jwt.private_key');
    if (!$appId || !$kid || !$pkey) {
        return null;
    }

    $now = time();
    $payload = [
        'aud' => $aud,
        'iss' => $appId,
        'sub' => config('jitsi.domain'),
        'room'=> $roomName,
        'exp' => $now + 3600,
        'nbf' => $now - 60,
        'context' => [
            'user' => [
                'name' => $displayName,
                'moderator' => true,
            ]
        ],
    ];

    // Firma RS256
    return \Firebase\JWT\JWT::encode($payload, $pkey, 'RS256', $kid);
}
```

>[!NOTE] Usa tu Trait Loggable si ya lo tienes, o registra en tu tabla LOGS.

---

## Frontend (Angular) — Utilidad unirse-conferencia.ts

Archivo sugerido: ``src/app/utilidades/unirse-conferencia.ts`` (reutilizable en paciente y especialista).

```ts
// src/app/utilidades/unirse-conferencia.ts
declare const JitsiMeetExternalAPI: any;

export interface JitsiConfig {
  domain: string;
  roomName: string;
  subject?: string;
  displayName?: string;
  jwt?: string;
}

export function unirseConferencia(
  cfg: JitsiConfig,
  container?: HTMLElement, // si quieres incrustar en un modal
) {
  if (!('JitsiMeetExternalAPI' in window)) {
    throw new Error('Jitsi External API no cargada. Asegúrate de incluir external_api.js');
  }

  const options = {
    roomName: cfg.roomName,
    parentNode: container || undefined,
    jwt: cfg.jwt || undefined,
    configOverwrite: {
      subject: cfg.subject || 'Cita clínica',
      disableDeepLinking: true,
      prejoinConfig: { enabled: true },
      startWithAudioMuted: false,
      startWithVideoMuted: false,
    },
    interfaceConfigOverwrite: {
      HIDE_INVITE_MORE_HEADER: true,
      MOBILE_APP_PROMO: false,
      SHOW_CHROME_EXTENSION_BANNER: false,
      // Botones mínimos que solemos necesitar
      TOOLBAR_BUTTONS: [
        'microphone','camera','chat','tileview','raisehand','hangup'
      ]
    },
    userInfo: {
      displayName: cfg.displayName || 'Usuario',
    },
  };

  const api = new JitsiMeetExternalAPI(cfg.domain, options);

  // Eventos útiles
  api.addListener('videoConferenceJoined', () => {
    // p. ej. notificar al backend si lo necesitas
  });

  api.addListener('readyToClose', () => {
    api.dispose();
  });

  return api;
}
```

Uso típico en un componente Angular (botón “Unirse a la videollamada”):

```ts
this.http.get<JitsiConfig>(`${this.apiUrl}/citas/${cita.id}/join`).subscribe({
  next: cfg => {
    unirseConferencia(cfg); // nueva ventana/overlay
    // Si prefieres modal con <div #jitsiContainer>, pásale el contenedor como segundo arg.
  },
  error: err => this.snackBar.open(err.error?.message ?? 'No se pudo iniciar la videollamada', 'Cerrar', { duration: 4000 })
});
```

En index.html incluye:

```html
<script src="https://meet.jit.si/external_api.js" defer></script>
```

----

## UX y reglas de visibilidad del botón

- Mostrar botón “Unirse” solo si:

    - ``cita.es_telematica === true``

    - ``cita.estado === 'pendiente'``

    - Hora actual dentro de la ventana ``inicio - early`` y ``fin + late``.

- Mensajes claros:

    - Fuera de ventana: “La sala aún no está disponible.”

    - Cita cancelada: “La cita fue cancelada.”

- En el **modal-info-cita** (paciente): botón visible solo si ``puedeCancelar`` es falso y la cita es telemática dentro de ventana.

- En la vista de **especialista**: igual lógica, más control de **cambio de estado** post-llamada.

## Seguridad y privacidad

- **Room name** aleatorio con HMAC (no usa nombres ni DNIs).

- No mostrar PII en ``subject`` ni en ``roomName``.

- **Auditoría**: registra entradas a sala (``LOGS``) con ``cita_id``, ``user_id``, ``ts``.

- **Ventana de acceso** controlada por backend.

---

##  Posibles errores

|Síntoma|Causa probable|Solución|
|-------|--------------|--------|
|Pantalla en blanco Jitsi|``external_api.js`` no cargado|Revisar ``<script>`` en ``index.html``|
|403 al unirse|Usuario no pertenece a la cita|Verificar roles y relaciones en backend|
|422 al unirse|Cita no telemática / estado no válido|Revisar datos de la cita|
|423 al unirse|Fuera de ventana horaria|Ajustar ``early/late`` en ``config/jitsi.php``|
|Eco / audio bajo|Config del dispositivo|Probar cascos, permisos de micrófono/cámara|

---

## Checklist de puesta en producción

- ``.env`` con ``JITSI_DOMAIN`` correcto.

- ``config/jitsi.php`` creado y cacheado (``php artisan config:cache``).

- Endpoint ``/api/citas/{id}/join`` protegido por ``auth:sanctum``.

- Frontend incluye ``external_api.js``.

- Botón “Unirse” respeta ventana horaria y estado.

- Logs de auditoría activados.