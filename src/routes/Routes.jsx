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
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_URL}/details/${params.id}`),
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
        element: <Profile />,
      },
      {
        path: "/dashboard/my-bookings",
        element: <MyBookings />,
      },
      {
        path: "/dashboard/add-stories",
        element: <AddStory />,
      },
      {
        path: "/dashboard/manage-stories",
        element: <ManageStories />,
      },
      {
        path: "/dashboard/edit-story/:id",
        element: <EditStory />,
      },
      {
        path: "/dashboard/join-guide",
        element: <JoinAsGuide />,
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
