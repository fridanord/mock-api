# Mock API Platform

<img width="1920" height="1564" alt="Homepage" src="https://github.com/user-attachments/assets/21bbfec9-aeff-41b4-bc35-e9ee89c7be4a" />


An educational fullstack platform designed for students and developers to master API integration by simulating real-world request and response scenarios. This tool features a secure user management system and an integrated database to allow users to save, test, and monitor API configurations dynamically.

Built with **Next.js 16**, **React 19**, **TypeScript**, and **MongoDB**.

## 🚀 Features

- **Fullstack Integration:** Powered by MongoDB and Mongoose for seamless, schema-based data modeling and storage.
- **Secure Authentication:** Implements secure user sign-ins and session management using Next-Auth with a MongoDB adapter and bcryptjs for password hashing.
- **Realistic API Simulation:** Simulates various HTTP methods (GET, POST, PUT, DELETE) and status codes.
- **Accessible & Dynamic UI:** Built using Headless UI for accessible interactive components and Lucide React for clean iconography.

## 🛠️ Tech Stack

### Frontend
- **Framework:** Next.js 16 (App Router)
- **Library:** React 19
- **Styling:** Tailwind CSS v4 & Headless UI
- **Icons:** Lucide React

### Backend & Database
- **Database:** MongoDB
- **ODM:** Mongoose
- **Authentication:** Next-Auth (v4) with `@auth/mongodb-adapter`
- **Security:** bcryptjs (Password encryption)

### Development Tools
- **Language:** TypeScript
- **Linting:** ESLint

## 📦 Getting Started

1. Clone the repository:
   ```bash
   git clone [https://github.com/fridanord/mock-api.git](https://github.com/fridanord/mock-api.git)

2. Install dependencies:
npm install

3. Set up your environment variables:
Create a .env.local file in the root directory and add your MongoDB URI and Next-Auth secrets:
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000

4. Run the development server:
npm run dev

Open http://localhost:3000 with your browser to see the platform in action.


