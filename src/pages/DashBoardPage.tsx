import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { toast, Zoom } from "react-toastify";
import Navbar from "../components/Navbar";
export default function DashBoard() {
  const [longUrl, setLongUrl] = useState<string>("");
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = () => {
    console.log("Submitted:", longUrl);
    toast.success("🦄 Link submitted!", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Zoom,
    });
  };

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [loading, user, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (user) {
    return (
      <>
        <Navbar />
        <div id="home_text" className="justify-center">
          <h2>Mini Url</h2>
          <br />
          <h4>Shorten your big urls with one click</h4>
        </div>

        <div>
          <input
            placeholder="xyz.com"
            type="url"
            value={longUrl}
            onChange={(event) => setLongUrl(event.target.value)}
            required
          />
          <br />
          <br />
          <button type="submit" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </>
    );
  }

  return null;
}
