import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router"
import { toast } from "react-toastify";

const API_ENDPOINT_LOGIN = "/api/auth/login";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatusMessage('Logging in...');

    try {
      const response = await axios.post(API_ENDPOINT_LOGIN, {
        email: email,
        password: password
      }, { withCredentials: true });

      console.log('Login successful:', response.data);
      toast.success('Login successful!')
      setStatusMessage('Login successful! Welcome back.');
      navigate('/')
      setIsLoggedIn(true);

    } catch (error) {
      toast.error('Invalid Credentials')
      console.error('Login failed:', error.response ? error.response.data : error.message);
      setStatusMessage(`Login failed: ${error.response ? error.response.data.message : error.message}`);
    }
  };

  return (
    <div className="p-3 bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-lg p-3 pt-5 pb-5 relative flex flex-col justify-center shadow-xl rounded-2xl border border-cyan-300 bg-white">
        <h1 className="absolute top-[-25px] bg-white left-1/2 -translate-x-1/2 text-center text-2xl font-bold p-2 px-6 rounded-full border border-cyan-400">
          Login
        </h1>
        <form className="mt-4 flex flex-col gap-4 p-3" onSubmit={handleSubmit}>
          <label className="font-semibold text-gray-500">
            Email
            <input
              className="mt-1 w-full p-2 border border-cyan-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
              type="email"
              placeholder="Enter your email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>

          <label className="font-semibold text-gray-500">
            Password
            <input
              className="mt-1 w-full p-2 border border-cyan-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
              type="password"
              placeholder="Enter your password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>

          <button
            type="submit"
            className="mt-4 w-full p-2 bg-cyan-500 text-white font-semibold rounded-full hover:bg-cyan-600 transition-all duration-300 shadow-md"
          >
            Login
          </button>
        </form>
        <div className="absolute bottom-2 right-4 text-sm hover:text-cyan-600 transition-colors">
          <Link to={'/register'}>Don't have an account? Register</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;