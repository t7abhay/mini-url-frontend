import { useState } from "react";
import { register } from "../api";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUserName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }
    try {
      await register({ email, password, username });
      window.location.href = "/login";
    } catch (err) {
      setError("Error registering user");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded shadow-md">
      <h2 className="text-2xl mb-4">Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          value={password}
          minLength={6}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="text"
          placeholder="Username"
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
        />
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
