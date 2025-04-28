import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import ProfilePage from "./pages/ProfilePage.tsx";
import HomePage from "./pages/HomePage.tsx";
import DashBoard from "./pages/DashBoardPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import RegisterPage from "./pages/RegisterPage.tsx";
import RedirectPage from "./pages/RedirectPage.tsx";
import ChangePasswordPage from "./pages/ChangePasswordPage.tsx";
import UrlNotFoundPage from "./pages/UrlNotFoundPage.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";

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
