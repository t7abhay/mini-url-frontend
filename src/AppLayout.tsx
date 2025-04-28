import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

export default function AppLayout() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: "60px" }}>
        <Outlet />
      </main>
    </>
  );
}
