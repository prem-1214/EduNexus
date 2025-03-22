# Educational Management System  

An Educational Management System enabling seamless interaction between students, faculty, and administrators. This application offers functionalities for user management, resource sharing, and analytics to enhance the educational experience.  

## Table of Contents  

- [Installation](#installation)  
- [Usage](#usage)  
- [Feature Overview](#feature-overview)  
- [User Roles](#user-roles)  
- [Contributing](#contributing)  
- [License](#license)  
- [Acknowledgments](#acknowledgments)  

---

## Installation  

To get started, clone the repository and install the required dependencies.  

### Clone the Repository  
```bash  
git clone https://github.com/prem-1214/EduNexus.git 
```

### Change to Project Directory  
```bash
cd EduNexus
```

### Install Backend Dependencies  
Navigate to the `Backend` folder and install the required dependencies:  
```bash
cd Backend
npm install  
```

### Install Frontend Dependencies  
Navigate to the `Frontend` folder and install the required dependencies:  
```bash
cd ../Frontend  
npm install
```

---

## Usage  

### Running the Backend Server  
To start the backend server, navigate to the `Backend` directory and run:  
```bash
npm start
```
The backend server will start on the configured port (e.g., `http://localhost:3000`).

### Running the Frontend Application  
To start the frontend application, navigate to the `Frontend` directory and run:  
```bash
npm run dev
```
The frontend application will start on the configured port (e.g., `http://localhost:5173`).

---

## Feature Overview  

- **User Management**: Role-based access for students, faculty, and administrators.  
- **Resource Sharing**: Upload and share educational resources.  
- **Analytics**: Insights into user activity and performance.  
- **Authentication**: Secure login and registration with JWT-based authentication.  
- **Google Login**: Seamless login using Google OAuth.  

---

## User Roles  

1. **Student**:  
   - Access course materials.  
   - Submit assignments.  
   - View grades and feedback.  

2. **Faculty**:  
   - Upload course materials.  
   - Grade assignments.  
   - Communicate with students.  

3. **Administrator**:  
   - Manage users and roles.  
   - Monitor system activity.  
   - Generate reports.  

---

## Contributing  

Contributions are welcome! To contribute:  

1. Fork the repository.  
2. Create a new branch for your feature or bug fix.  
3. Commit your changes and push them to your fork.  
4. Submit a pull request with a detailed description of your changes.  
