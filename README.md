# sikshyalaya

Smart Schooling Solution

## Project Phases and Features

### Phase 1: Core Functionality

- [ ] User Authentication and Authorization
  - [x] Register
    - [x] ROLE: ADMIN, Teacher, Student  (fields: email, phoneNumber, password, role, fullName, fatherName, motherName)
    - [x] PASSWORD ENCRYPTION
    - [x] Register API
    - [x] Register Form

  - [x] Login
    - [x] email based multi user login
    - [x] PASSWORD VERIFICATION
    - [x] Login API
    - [x] Login Form
    - [x] Generate Token (JWT)
- [ ] Admin Panel
  - [x] Teacher and Student login approval via Admin 
  - [x] Add different courses and class, and section and classteacher for the section


### Phase 2: Academic Features
- [x] Breadcrums in admin for quick access
- [x] Events and Calendar
  - [x] Admin can add events into dynamic calendar
- [x] Send email to teacher/students on approval
- [ ] Teacher Panel
  - [ ] Teacher can give assignments to students
  - [ ] Class Teacher can add attendance to students 
- [ ] Student Panel
  - [ ] Submit Assignment
  - [ ] 
  - [ ] 

### Phase 3: Communication and Collaboration

- [x] Announcements and Notifications
- [ ] Parent-Teacher Communication Portal
- [ ] Discussion Forums for Students and Teachers
- [ ] Event Calendar

### Phase 4: Administrative Tools

- [ ] Timetable Generation
- [ ] Fee Management
- [ ] Inventory Management for School Supplies
- [ ] Staff Payroll System

### Phase 5: Advanced Features

- [ ] Online Learning Management System (LMS) Integration
- [ ] Student Performance Analytics
- [ ] Alumni Network and Management

## Getting Started

To get started with the School Management System, follow these steps:

1. Clone the repository
2. Install dependencies for both client and server:

```
cd client 
npm install
npm run dev

cd server
npm install
npm run dev
```

Both the client and server can be started using the `npm run dev` command in their respective directories.

## Technologies and Packages Used

### Client-side (Next.js)

- Next.js: React framework for building web applications
- React: JavaScript library for building user interfaces
- @nextui-org/react: UI component library for React
- Radix UI: Unstyled, accessible components for React
- Formik: Form library for React
- Yup: JavaScript schema validation library
- Recharts: Composable charting library for React
- Framer Motion: Animation library for React
- Tailwind CSS: Utility-first CSS framework

### Development Tools

- ESLint: JavaScript linting tool
- PostCSS: CSS transformation tool
- Tailwind CSS: Utility-first CSS framework

## Contributing

We welcome contributions to the School Management System! Please read our `CONTRIBUTING.md` file for guidelines on how to submit issues, feature requests, and pull requests.

## License

This project is licensed under the MIT License - see the `LICENSE.md` file for details.

## Contact

For any queries or support, please contact our team at support@schoolmanagementsystem.com



