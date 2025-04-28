import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import {
  successToast,
  errorToast,
  warnToast,
} from "../utils/notifications/Toasts";

export default function DashBoard() {
  const [longUrl, setLongUrl] = useState<string>("");
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = () => {
    console.log("Submitted:", longUrl);
    successToast("Link submitted!");
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
        <div id="home_text" className="justify-center">
          <h2>Mini Url</h2>
          <br />
          <h4>Enter long Url</h4>
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
