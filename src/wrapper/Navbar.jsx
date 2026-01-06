import axios from "axios";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
// import { User, LogOut } from "lucide-react"; // Optional: for icons

const NAVBAR_API = "/api/auth/logout";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Calling the logout endpoint
      await axios.post(NAVBAR_API, {}, { withCredentials: true });
      console.log("Logout successful");
      toast.success('Logout successful')
      navigate("/login");
    } catch (error) {

      console.error("Logout failed:", error);
      // navigate("/login");
    }
  };

  return (
    <nav className="bg-white border-b border-cyan-200 px-6 py-3 flex justify-between items-center shadow-sm">
      {/* Logo/Brand */}
      <Link to="/" className="text-2xl font-bold text-cyan-600 flex items-center gap-2">
        <span className="bg-cyan-500 text-white p-1 rounded-lg">❤️</span><span className="hidden sm:block">HealthTrack</span>

      </Link>

      {/* Action Buttons */}
      <div className="flex items-center gap-6">
        {/* Profile Link */}
        <Link
          to="/profile"
          className="flex items-center gap-2 text-gray-600 hover:text-cyan-600 font-medium transition-colors"
        >
          <div className="w-8 h-8 ml-4 bg-cyan-100 rounded-full flex items-center justify-center border border-cyan-300">
            <span className="text-cyan-700 text-xs font-bold">ME</span>
          </div>
          Profile
        </Link>

        <Link
          to="/HealthDashboard"
          className="flex items-center gap-1 text-gray-600 hover:text-cyan-600 font-medium transition-colors"
        >
          <div className="w-8 h-8 ml-4 bg-white rounded-full flex items-center justify-center ">
            <span className="text-red-300 text-xs font-bold">❤️</span>
          </div>
          HealthDashboard
        </Link>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-red-500 hover:bg-red-50 rounded-lg transition-all border border-transparent hover:border-red-200"
        >
          Logout
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" x2="9" y1="12" y2="12" /></svg>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;