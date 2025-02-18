# Elite Explore

Welcome to **The Tourist Guide**, an online platform that provides a comprehensive resource for travelers exploring Bangladesh. The website offers in-depth information on popular destinations, local culture, cuisine, and activities, helping users plan their trips effectively.

## 🌍 Project Overview

**The Tourist Guide** is designed to make travel planning easier for tourists visiting Bangladesh. It provides detailed insights into tourist destinations, guides users in finding professional tour guides, and helps book tours seamlessly. The platform supports three different user roles:

- **Tourist**: Can browse packages, book tours, and manage their profile and bookings.
- **Tour Guide**: Can manage assigned tours, accept/reject bookings, and share travel experiences.
- **Admin**: Can manage users, monitor activity, and have full control over all platform features.

### Key Features:

- **Dynamic Content**: Showcasing travel destinations, guides, and tours that change regularly.
- **Booking & Payment**: Tourists can easily book tours, and payment is integrated with Stripe.
- **Role-Based Access**: Users have personalized dashboards based on their roles, with exclusive features for each.
- **Responsive Design**: Ensures an optimal experience on any device, from mobile phones to desktops.
- **Authentication & Security**: Secure user authentication with JWT tokens and Firebase integration.

This project is developed using **React** for the frontend, **Node.js** with **Express** for the backend, and **MongoDB** for data storage. It also integrates **Stripe** for handling payments and uses **Framer Motion** and **SweetAlert2** for enhanced user interactions and animations.

## 👤 Admin Credentials

- **Admin Username**: instructor@ph.com
- **Admin Password**: Instructor20@

## 🚀 Features

- **Comprehensive Travel Information**: Detailed descriptions of tourist attractions across Bangladesh.
- **User Roles**: Multiple roles including Tourist, Tour Guide, and Admin, each with different levels of access and permissions.
- **Dynamic Content**: Randomly changing travel packages and tour guides on the homepage.
- **Responsive Design**: Fully responsive layout that adapts to mobile, tablet, and desktop views.
- **Tourist Dashboard**: Manage profile, view bookings, add stories, and apply to become a tour guide.
- **Tour Guide Dashboard**: Manage assigned tours, accept/reject bookings, and add/manage stories.
- **Admin Dashboard**: Manage users, packages, and candidate applications; see key statistics.
- **Authentication System**: User login/signup with email/password and Google authentication.
- **Booking System**: Tourists can book tours with detailed booking forms and payment integration via Stripe.
- **Interactive UI**: SweetAlert2 notifications, React Toastify, and other UI enhancements for smooth user experience.
- **Framer Motion**: Animations on the homepage to enhance the visual appeal.

## 🖼️ Screenshots

### Homepage

<div align="center">
  <img height="300" src="https://i.ibb.co.com/4KFVhJR/Screenshot-2025-01-20-191126.png">
</div>

### Tourist Dashboard

<div align="center">
  <img height="300" src="https://i.ibb.co.com/dDNJ9Ks/Screenshot-2025-01-20-190758.png">
</div>

## 🔧 Technologies Used

- **Frontend**: React.js, Tailwind CSS, Framer Motion, React Router, React-Query, React-Toastify
- **Backend**: Node.js, Express.js, MongoDB, Firebase Authentication
- **Payment Integration**: Stripe
- **Animations**: Framer Motion, SweetAlert2
- **Other**: Axios, JWT, react-datepicker, react-select, react-share, react-tabs, lottie-react

## 💻 Technology Stats

| **Technology**          | **Percentage Used** |
| ----------------------- | ------------------- |
| React.js                | 40%                 |
| Tailwind CSS            | 20%                 |
| Node.js & Express.js    | 15%                 |
| MongoDB                 | 10%                 |
| Firebase Authentication | 5%                  |
| Stripe Payment System   | 5%                  |
| Framer Motion           | 5%                  |

## 🗺️ Live Site

https://elite-explore.netlify.app

## 🧩 Dependencies

- **Core Dependencies**:
  - `@stripe/react-stripe-js`: ^3.1.1
  - `@tanstack/react-query`: ^5.64.1
  - `animate.css`: ^4.1.1
  - `aos`: ^2.3.4
  - `axios`: ^1.7.9
  - `date-fns`: ^4.1.0
  - `firebase`: ^11.1.0
  - `framer-motion`: ^11.18.0
  - `localforage`: ^1.10.0
  - `lottie-react`: ^2.4.0
  - `match-sorter`: ^8.0.0
  - `moment`: ^2.30.1
  - `react`: ^18.3.1
  - `react-confetti`: ^6.2.2
  - `react-datepicker`: ^7.6.0
  - `react-dom`: ^18.3.1
  - `react-helmet`: ^6.1.0
  - `react-icons`: ^5.4.0
  - `react-responsive-carousel`: ^3.2.23
  - `react-router-dom`: ^7.1.1
  - `react-select`: ^5.9.0
  - `react-share`: ^5.1.2
  - `react-tabs`: ^6.1.0
  - `react-toastify`: ^11.0.2
  - `recharts`: ^2.15.0
  - `sort-by`: ^1.2.0
  - `sweetalert2`: ^11.15.10

## 📚 Installation

Here’s the full installation process for **The Tourist Guide** project:

### 1. **Clone the Repository**

First, clone the project repository to your local machine:

```bash
git clone https://github.com/arifhassansky/Elite-Explore.git
```

### 2. **Install Dependencies (Frontend)**

After cloning the repository, navigate to the project directory:

```bash
cd client
```

Then, install the required dependencies for the frontend:

```bash
npm install
```

### 3. **Install Dependencies (Backend)**

For the backend, you'll need to set up a separate project folder, assuming you already have the backend code. If not, you may need to clone the backend repository as well.

Once in the backend directory, install dependencies:

```bash
cd server
```

```bash
npm install
```

### 4. **Create a `.env` File (Backend)**

You’ll need to create a `.env` file to store your environment variables such as MongoDB connection string, JWT secret, and Stripe keys. Here’s an example of what the `.env` file might look like:

```env
ACCESS_TOKEN_SECRET=your-jwt-secret
STRIPE_SECRET_KEY=your-stripe-secret-key
MONGO_URI=your-mongodb-uri
```

Make sure to replace the placeholders with your actual values.

### 5. **Firebase Authentication Setup**

Go to the [Firebase Console](https://console.firebase.google.com/), create a project, and set up Firebase Authentication with the required methods (email/password, Google, etc.). Add your Firebase config to the backend `.env` file.

### 6. **Start the Backend Server**

Start the backend server by running:

```bash
npm start
```

This will start your Express server and connect to MongoDB.

### 7. **Start the Frontend Server**

Now, go to the frontend directory and start the React development server:

```bash
npm run dev
```

This will start the React development server, and you should be able to view the app by visiting [http://localhost:3000](http://localhost:3000).

### 8. **Payment Integration (Stripe)**

Ensure you have set up a Stripe account and retrieved your **Publishable Key** and **Secret Key**. Insert these keys in the backend `.env` file under `STRIPE_SECRET_KEY` and `STRIPE_PUBLIC_KEY`.

You can also use test cards provided by Stripe for local development. You can find those details in the [Stripe documentation](https://stripe.com/docs/testing).

### 9. **Environment Configuration**

Ensure you have your environment configured for React and Node. You may also need tools like:

- **MongoDB** (for database)
- **Stripe** (for payment system)
- **React Router** (for navigation)

### 10. **Testing the Application**

Once both frontend and backend are running, you can test the application on your local machine. Ensure you check for any issues related to authentication, Stripe payment, and dynamic content.
