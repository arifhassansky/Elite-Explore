import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../pages/Home/home/Home";
import Trips from "../pages/trips/Trips";
import DestinationDetails from "../pages/viewDetails/DestinationDetails";
import Register from "../pages/register/Register";
import Login from "../pages/login/Login";
import Community from "../pages/community/Community";
import Dashboard from "../dashboard/Dashboard";
import Profile from "../dashboard/Profile";
import MyBookings from "../dashboard/MyBookings";
import AddStory from "../dashboard/AddStory";
import ManageStories from "../dashboard/ManageStories";
import EditStory from "../dashboard/EditStory";
import JoinAsGuide from "../dashboard/JoinAsGuide";
import GuideAssignedTours from "../dashboard/GuideAssignedTours";
import AddPackageForm from "../dashboard/AddPackageForm";
import ManageUsers from "../dashboard/ManageUsers";
import ManageCandidates from "../dashboard/ManageCandidates";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import Payment from "../dashboard/payment/Payment";
import PaymentHistory from "../dashboard/payment/PaymentHistory";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "community",
        element: <Community />,
      },
      {
        path: "trips",
        element: <Trips />,
      },
      {
        path: "/details/:id",
        element: (
          <PrivateRoute>
            <DestinationDetails />,
          </PrivateRoute>
        ),
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
  {
    path: "dashboard",
    element: <Dashboard />,
    children: [
      // user routes
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/my-bookings",
        element: (
          <PrivateRoute>
            <MyBookings />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/add-stories",
        element: (
          <PrivateRoute>
            <AddStory />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/manage-stories",
        element: (
          <PrivateRoute>
            <ManageStories />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/edit-story/:id",
        element: (
          <PrivateRoute>
            <EditStory />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/join-guide",
        element: (
          <PrivateRoute>
            <JoinAsGuide />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/payment/:id",
        element: (
          <PrivateRoute>
            <Payment />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/payment-history",
        element: (
          <PrivateRoute>
            <PaymentHistory />
          </PrivateRoute>
        ),
      },
      // guide routes
      {
        path: "/dashboard/my-assigned-tours",
        element: <GuideAssignedTours />,
      },
      // admin routes
      {
        path: "/dashboard/add-package",
        element: (
          <AdminRoute>
            <AddPackageForm />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/manage-users",
        element: (
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/manage-candidates",
        element: (
          <AdminRoute>
            <ManageCandidates />
          </AdminRoute>
        ),
      },
    ],
  },
]);
export default router;
