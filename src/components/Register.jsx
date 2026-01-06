import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router"
import { toast } from "react-toastify";

const API_ENDPOINT = "https://healthcheck-nqw1.onrender.com/api/v1/auth/register";

const Register = () => {
  // State variables to store form input data and the submission status.
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatusMessage('Registering...');

    try {
      const response = await axios.post(API_ENDPOINT, {
        email,
        password,
        name,
        age: Number(age),
        gender
      });

      // If the request is successful, set a success message.
      console.log('Registration successful:', response.data);
      navigate('/')
      toast.success('Registration successful!')
      setStatusMessage('Registration successful! You can now log in.');

    } catch (error) {
      // If the request fails, set an error message.
      console.error('Registration failed:', error.response ? error.response.data : error.message);
      setStatusMessage(`Registration failed: ${error.response ? error.response.data.message : error.message}`);
    }
  };

  return (
    <div className="p-3 bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-lg p-3 pt-5 pb-5 relative flex flex-col justify-center shadow-xl rounded-2xl border border-cyan-300 bg-white">
        <h1 className="absolute top-[-25px] bg-white left-1/2 -translate-x-1/2 text-center text-2xl font-bold p-2 px-6 rounded-full border border-cyan-400">
          Register
        </h1>
        <form className="mt-4 flex flex-col gap-4 p-3" onSubmit={handleSubmit}>
          {/* Email input field */}
          <label className="font-semibold text-gray-500">
            Name
            <input
              className="mt-1 w-full p-2 border border-cyan-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
              type="name"
              placeholder="Enter your Name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
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

          <div className="flex gap-4">
            <label className="font-semibold text-gray-500 flex-1">
              Age
              <input
                className="mt-1 w-full p-2 border border-cyan-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                type="number"
                placeholder="Age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
              />
            </label>

            <label className="font-semibold text-gray-500 flex-1">
              Gender
              <select
                className="mt-1 w-full p-2 border border-cyan-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all bg-white"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                required
              >
                <option value="" disabled>Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </label>
          </div>

          {/* Password input field */}
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

          {/* Submit button */}
          <button
            type="submit"
            className="mt-4 w-full p-2 bg-cyan-500 text-white font-semibold rounded-full hover:bg-cyan-600 transition-all duration-300 shadow-md"
          >
            Register
          </button>
        </form>

        {/* Display the status message */}
        {statusMessage && (
          <p className="mt-4 mb-4 text-center text-sm font-medium">
            {statusMessage}
          </p>
        )}

        {/* Link to login page */}
        <div className="absolute bottom-2 right-4 text-sm hover:text-cyan-600 transition-colors">
          <Link to={'/login'}>Already have an account? Sign in</Link>
        </div>
      </div>
    </div>
  );
};

export default Register