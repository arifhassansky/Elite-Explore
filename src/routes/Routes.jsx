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
        element: <DestinationDetails />,
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
        path: "/dashboard/manage-profile",
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
    ],
  },
]);
export default router;
