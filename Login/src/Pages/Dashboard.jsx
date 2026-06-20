import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  useEffect(() => {
    async function getProfile() {
      try {
        const res = await axios.get(
          "https://backend-login-authentication-with-node-js.onrender.com/auth/profile",
          {
            withCredentials: true,
          }
        );

        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    }

    getProfile();
  }, []);

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

          {user && (
            <>
              <p className="text-gray-700 text-xl font-bold">
                Welcome {user.name} 👋
              </p>

              <p className="text-gray-700 mb-6 text-lg font-semibold">
                {user.email}
              </p>
            </>
          )}

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