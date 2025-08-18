import { createBrowserRouter } from "react-router";
import AddRestaurant from "../pages/AddRestaurant";
import Home from "../pages/Home";
import UpdateRestaurant from "../pages/UpdateRestaurant";
import Signin from "../pages/Signin";
import Signup from "../pages/Signup";
import AdminPage from "../pages/AdminPage";
import Profile from "../pages/Profile";
import NotAllowed from "../pages/NotAllowed";
import UserPage from "../pages/UserPage";
import ModOrAdminPage from "../pages/ModOrAdminPage";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/newRestaurant",
    element: (
      <AdminPage>
        <AddRestaurant />
      </AdminPage>
    ),
  },
  {
    path: "/update/:id",
    element: (
      <ModOrAdminPage>
        <UpdateRestaurant />
      </ModOrAdminPage>
    ),
  },
  {
    path: "/signin",
    element: <Signin />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/notallowed",
    element: <NotAllowed />,
  },
  {
    path: "/profile",
    element: (
      <UserPage>
        <Profile />
      </UserPage>
    ),
  },
]);
export default router;
