import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../pages/Home/Home";
import Register from "../pages/Register";
import Login from "../pages/Login";
import DestinationDetails from "../pages/DestinationDetails";
import Trips from "../pages/Trips";
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
]);
export default router;
