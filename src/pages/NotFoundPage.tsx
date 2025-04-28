import { Link } from "react-router-dom";
import logo from "../assets/404-not-found.gif";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-white p-4">
      <div className="max-w-sm w-full">
        <img src={logo} alt="404 Not Found" className="w-full h-auto mb-6" />
      </div>
      <Link to="/">Return Home</Link>
    </div>
  );
}
