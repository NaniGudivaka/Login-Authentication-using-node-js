import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
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

  if (
    !formData.name ||
    !formData.email ||
    !formData.password ||
    !formData.confirmPassword
  ) {
    setError("All fields are required");
    return;
  }

  if (formData.password !== formData.confirmPassword) {
    setError("Passwords do not match");
    return;
  }

  try {
    setLoading(true);
    setError("");

    const response = await axios.post(
      "https://backend-login-authentication-with-node-js.onrender.com/auth/signup",
      {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      }
    );

    console.log(response.data);

    setLoading(false);

    alert("Signup successful!");

    navigate("/");

  } catch (err) {
    setLoading(false);

    setError(
      err.response?.data?.message ||
      "Signup failed"
    );

    console.log(err.response?.data);
  }
}

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">

        <h1 className="text-3xl font-bold text-center mb-6">
          Signup
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-3"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-3"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-3"
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-3"
          />

          {error && (
            <p className="text-red-500 text-sm">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
          >
            {loading ? "Loading..." : "Signup"}
          </button>
        </form>

        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link
            to="/"
            className="text-blue-600 font-medium"
          >
            Login
          </Link>
        </p>
          <p className="mt-4 text-center text-sm text-gray-600">
  ⚠️ Backend deployment is currently being finalized. Some authentication features may be temporarily unavailable.
</p>
      </div>
    </div>
  );
}

export default Signup;