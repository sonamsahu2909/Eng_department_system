            Engineering MANAGEMENT SYSTEM
Streamline school management, class organization, and add students and faculty.
Seamlessly track attendance, assess performance, and provide feedback.
Access records, view marks, and communicate effortlessly.


About
The School Management System is a web-based application built using the MERN (MongoDB, Express.js, Node.js) stack. It aims to streamline engineer management, class organization, and facilitate communication between students, teachers, and administrators.

Features
User Roles: The system supports three user roles: Admin, Teacher, and Student. Each role has specific functionalities and access levels.

Admin Dashboard: Administrators can add new students and teachers, create classes and subjects, manage user accounts, and oversee system settings.



Performance Assessment: Teachers can assess students' performance by providing marks and feedback. Students can view their marks and track their progress over time.

Data Visualization: Students can visualize their performance data through interactive charts and tables, helping them understand their academic performance at a glance.

Communication: Users can communicate effortlessly through the system. Teachers can send messages to students and vice versa, promoting effective communication and collaboration.

Technologies Used
Backend: Node.js, Express.js
Database: MongoDB

Installation
git clone https://github.com/sonamsahu2909/Eng_department_system
Open 2 terminals in separate windows/tabs.

Terminal 1: Setting Up Backend

cd backend
npm install
npm start
Create a file called .env in the backend folder. Inside it write this :

MONGO_URL = mongodb://127.0.0.1/school
If you are using MongoDB Compass you can use this database link but if you are using MongoDB Atlas then instead of this link write your own database link.



Error Solution
You might encounter an error while signing up, either a network error or a loading error that goes on indefinitely.

To resolve it:

Navigate to the frontend > .env file.

Uncomment the first line. After that, terminate the frontend terminal. Open a new terminal and execute the following commands:


Navigate to the frontend > src > redux > userRelated > userHandle.js file.

Add the following line after the import statements:

const REACT_APP_BASE_URL = "http://localhost:4000";

Additionally:

When testing the project, start by signing up rather than logging in as a guest or using regular login if you haven't created an account yet.

To use guest mode, navigate to LoginPage.js and provide an email and password from a project already created in the system. This simplifies the login process, and after creating your account, you can use your credentials.

These steps should resolve the network error in the frontend. If the issue persists, feel free to contact me for further assistance.