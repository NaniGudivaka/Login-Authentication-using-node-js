import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }
async function handleSubmit(e) {
  e.preventDefault();

  setLoading(true);
  setError("");
try {
  const response = await axios.post(
    "https://backend-login-authentication-with-node-js.onrender.com/auth/login",
    {
      email: formData.email,
      password: formData.password,
    },
    {
      withCredentials: true,
    }
  );

  console.log(response.data);

  localStorage.setItem(
    "isAuthenticated",
    "true"
  );

  setLoading(false);

  navigate("/dashboard");

} catch (err) {
  setLoading(false);

  setError(
    err.response?.data?.message ||
    "Login failed"
  );
}
}

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">
          Login
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {error && (
            <p className="text-red-500 text-sm">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </form>

        <p className="text-center mt-4">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-600 font-medium"
          >
            Signup
          </Link>
        </p>
        <p className="mt-4 text-center text-sm text-gray-600">
  ⚠️ Backend deployment is currently being finalized. Some authentication features may be temporarily unavailable.
</p>
      </div>
      
    </div>
    
  );
}

export default Login;