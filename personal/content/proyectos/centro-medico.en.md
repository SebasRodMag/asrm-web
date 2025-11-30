# Medical Center
This is a web application for a medical center specializing in performing medical examinations for companies.

## Context and Objective
The main objective was to modernize and optimize this center's medical appointment management. They needed a tool to manage:

- **Clients** (companies) and their data.
- Examination contracts associated with each client.
- **Booking** and **scheduling** medical appointments.

In essence, we built a robust system so that administration, clients, and physicians could work efficiently.

## My Role and Scope
My involvement focused on implementing the **minimum scope** of the project, which included the essential functionalities.

- **Client Management**: CRUD (Create, List with filters, Edit) of clients, with the unique feature of automatically generating a "Client" user type and a current contract when creating a new one.

- **Contract Management**: The system manages annual contracts and allows the administrator to view and manage them.

- **Appointment Booking**: Allows the client or administrator to record the number of examinations on a given date, validating availability (maximum one booking per hour). Each examination lasts 5 minutes.

- **Appointment Making**: The physician can record the actual number of examinations performed during the day's appointment.

- **Roles and Authentication**: Implementation of three key roles: **Administrator**, **Client**, and **Physician**, with specific permissions for each.

## Technology Stack and Architecture
This was a full-stack project where we applied technologies such as:
- **Frontend (SPA)**: Developed with **Angular**.

- **Backend (Rest API)**: Built with **Laravel**.

- **Architecture**: A classic web application architecture, separating the API (backend) from the User Interface (frontend).

- **Infrastructure (Dev/Local)**: We used **Docker** and **Docker Compose** to set up the development environment, including containers for PHP, Nginx, and MySQL, which allowed for a quick and portable setup.

- **DB Design**: Implementation of a relational database model with key tables such as ``Users``, ``Customers``, ``Contracts``, and ``Appointments``, designed to meet the requirements of the necessary 1:1 and 1:N relationships.

## Challenges and Solutions
- **The Challenge of Complex Contractual Logic**
- **Challenge**: It wasn't just about registering customers, but also about managing their contractual lifecycle. When creating a customer, a one-year contract must be generated. When booking appointments, you must validate that the contract is valid and that the contracted number of appointments has not been exceeded.
- **Solution**: We created a robust contract management flow, ensuring that each client always has an associated contract upon creation. Additionally, in the booking flow, the AppointmentsController and the AppointmentService are responsible for **querying the current contract** and **verifying the number of revisions** already made before allowing the booking.

- **Guarantee Appointment Availability**
- **Challenge**: The system had to validate that bookings could not overlap, given that each appointment lasts 5 minutes, and there can only be one booking at a time.
- **Solution**: Implemented the Availability Check logic in the AppointmentService that checks if a reservation already exists for the requested time before persisting the data in the database.

- **The Difference in Permissions (Roles)**
- **Challenge**: Design the application so that the Administrator sees everything, the Client sees only their own reservations, and the Physician can only interact with the current day's appointments.
- **Solution**: A Role-Based Authentication system was implemented (Client, Physician, Administrator). All interactions (such as checking or recording appointments) are conditioned by the user's role. For example:

- The Client only checks "my appointments."
- The Physician only checks and edits "the day's appointments."

## Links
- - **Repository**: https://github.com/SebasRodMag/Proyect_Centro_Medico