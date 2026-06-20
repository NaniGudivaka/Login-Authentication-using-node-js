import { useNavigate } from "react-router-dom";
import axios from "axios";

function Dashboard() {
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await axios.post(
        "https://backend-login-authentication-with-node-js.onrender.com/auth/logout",
        {},
        {
          withCredentials: true,
        }
      );

      localStorage.removeItem("isAuthenticated");

      navigate("/");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-4xl font-bold mb-4">
            Dashboard
          </h1>

          <p className="text-gray-600 mb-6">
            Welcome User 👋
          </p>

          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;