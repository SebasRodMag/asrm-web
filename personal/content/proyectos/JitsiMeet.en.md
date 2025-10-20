# Video Calls with Jitsi Meet

**Integration of secure video calls using Jitsi Meet** within the MV Dietetic Clinic management system.
Allows remote appointments to be made directly from the application, without the need to install additional software.

---

## Context and Objectives

During the development of the clinic's management system, the need arose to include remote consultations between patients and specialists.
The objective was to integrate a simple, secure video calling system that could work directly from the browser.

### Main Objectives:

- Allow joining the video call directly from the appointment.

- Ensure that only assigned participants (patient and specialist) can access it.

- Ensure privacy through encrypted room names and access time controls.

- Keep the integration lightweight, without complex external dependencies.

---

## My Role and Scope

**Role**: Full-stack development (frontend and backend).

### Responsibilities:

- Implement the complete video call joining flow using **Jitsi Meet External API**.

- Add validations in **Laravel (backend)** to control access and scheduling.

- Create a **reusable function in Angular** to open the video call room from any view.

- Incorporate audit logs to record access and ensure traceability.

---

## General Architecture

```text
[ Authenticated User ]
↓
[ Laravel API ] → Validate appointments and generate secure room names
↓
[ Angular Frontend ] → Open Jitsi Meet (iframe or new window)
↓
[ Jitsi Server (meet.jit.si) ]
```

### Components:

- **Laravel Backend**: Generates random room names, controls access by role and time window.

- **Angular Frontend**: Obtains connection data (domain, room, username) and opens the video call using the Jitsi external API.

- **Jitsi Meet**: Free and encrypted video conferencing service that manages communication.

---

### Main Challenges and Solutions

|Challenge|Applied Solution|
|----|-----------------|
|**Secure Room Access**|Generation of HMAC-signed room names to avoid predictable IDs.|
|**Time Window**|Backend time control: access limited to a few minutes before and after the appointment.|
|**Reusable Integration**|Generic ``joinConference()`` function used by patients and specialists.|
|**Privacy**|No personal data in room names or session tokens.|

---

## Results

- Fully integrated and functional video conferencing system.

- Immediate access from the appointment interface, without additional configuration.

- Automatic encryption via HTTPS and Jitsi.

- Access traceability via log records.

The final solution combines **security**, **usability**, and **easy maintenance**, maintaining the overall project philosophy: open, configurable, and reusable tools.

---

## Links

- **Repository**: GitHub – Clínica Dietética MV

- **Based technology**: Jitsi Meet External API

- **Technical details**: content/jitsiMeet.md