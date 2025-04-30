import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import { useAuth } from "./hooks/useAuth";

export default function AppLayout() {
  const { user } = useAuth();
  return (
    <>
      {user && <Navbar />}
      <main style={{ paddingTop: "60px" }}>
        <Outlet />
      </main>
    </>
  );
}
