# Taskly (Assignment-11)

## Description

**Taskly** is a Task Management Web Application built with **React.js, Firebase, Express.js, and MongoDB**. It allows users to manage tasks efficiently with a drag-and-drop interface, real-time updates, and Firebase authentication.

## Live Demo

**[Live Site](https://task-management-72c63.web.app/)**

## Dependencies

The project uses the following dependencies:

### **Frontend Dependencies**

- `react`
- `react-dom`
- `react-router-dom`
- `tailwindcss`
- `@tanstack/react-query`
- `firebase`
- `axios`
- `hello-pangea-dnd`

### **Backend Dependencies**

- `express`
- `cors`
- `mongoose`
- `dotenv`
- `firebase-admin`

## Installation Steps

### **Frontend Setup**

1. Clone the repository:
   ```sh
   git clone https://github.com/rumon3-1416/Task-Manager.git
   ```
2. Navigate to the frontend directory:
   ```sh
   cd Client
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Set up Firebase authentication:
   - Create a Firebase project.
   - Enable Google authentication.
   - Get Firebase config and add it to `.env`.
5. Start the development server:
   ```sh
   npm run dev
   ```

### **Backend Setup**

1. Navigate to the backend directory:
   ```sh
   cd Server
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up environment variables (`.env`):
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```
4. Start the backend server:
   ```sh
   npm start
   ```

## Technologies Used

- **Frontend:** React.js, Tailwind CSS, Firebase Authentication, TanStack Query
- **Backend:** Node.js, Express.js, MongoDB
- **State Management:** React Query
- **Authentication:** Firebase Authentication
- **Drag & Drop:** hello-pengea-dnd
