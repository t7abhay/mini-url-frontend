import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFoundPage from "./pages/NotFoundPage";
import ProfilePage from "./pages/ProfilePage";
import HomePage from "./pages/HomePage";
import DashBoard from "./pages/DashBoardPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import RedirectPage from "./pages/RedirectPage";
import ChangePasswordPage from "./pages/ChangePasswordPage";

import ProtectedRoute from "./components/ProtectedRoute";
import AppLayout from "./AppLayout";

const router = createBrowserRouter(
  [
    {
      element: <AppLayout />,
      children: [
        { path: "/", element: <HomePage /> },
        { path: "/login", element: <LoginPage mode="login" /> },
        { path: "/register", element: <RegisterPage mode="register" /> },
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
        { path: "/r/:shortId", element: <RedirectPage /> },
        { path: "*", element: <NotFoundPage /> },
      ],
    },
  ],
  {
    future: {
      v7_relativeSplatPath: true,
    },
  }
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
