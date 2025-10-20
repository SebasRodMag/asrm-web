# Video Calls with Jitsi Meet

**Secure video call integration** using Jitsi Meet to conduct online appointments directly from the MV Clinical Management application.

---

## Objective

Offer an alternative to in-person appointments, allowing patients and specialists to communicate online from any device.

---

### How it works

The system validates the appointment in the backend and generates an **encrypted room name**, preventing unauthorized access.
From the Angular frontend, a generic function opens the video call using the external **Jitsi Meet API**, without leaving the application.

``` yaml

[ Authenticated User ]
└─ [ Online Appointment ]
→ [ Secure Jitsi Room ]
```

---

## Results

- Secure access without external installation.

- Reusable by patients and specialists.

- Automatic encryption and access control.

- Integrated with logs and time tracking in the backend.