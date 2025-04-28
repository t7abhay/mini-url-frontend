import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFoundPage from "./pages/NotFoundPage";
import ProfilePage from "./pages/ProfilePage";
import HomePage from "./pages/HomePage";
import DashBoard from "./pages/DashBoardPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import RedirectPage from "./pages/RedirectPage";
import ChangePasswordPage from "./pages/ChangePasswordPage";
import UrlNotFoundPage from "./pages/UrlNotFoundPage";
import ProtectedRoute from "./components/ProtectedRoute";

const router = createBrowserRouter(
  [
    //STATIC ROUTES
    {
      path: "/",
      element: <HomePage />,
    },

    {
      path: "/login",
      element: <LoginPage mode="login" />,
    },
    {
      path: "/register",
      element: <RegisterPage mode="register" />,
    },

    {
      path: "/dashboard",
      element: (
        <ProtectedRoute>
          <DashBoard />
        </ProtectedRoute>
      ),
    },

    {
      path: "/change-password",
      element: (
        <ProtectedRoute>
          <ChangePasswordPage mode="changePassword" />
        </ProtectedRoute>
      ),
    },
    {
      path: "/profiles",
      element: (
        <ProtectedRoute>
          <ProfilePage />
        </ProtectedRoute>
      ),
    },

    // --------------------------------------------------------------------//

    // DYNAMIC SHORT URL REDIRECTION
    { path: "/:shortId([^/]{5,15})", element: <RedirectPage /> },

    // --------------------------------------------------------------------//

    // global not  found  page XOXO
    { path: "*", element: <NotFoundPage /> },
    { path: "/url-not-found", element: <UrlNotFoundPage /> },
  ],
  {
    future: {
      v7_relativeSplatPath: true, // Enable the future flag
    },
  }
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
