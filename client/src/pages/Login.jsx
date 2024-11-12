import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/users/login/`, {
        email,
        password,
      });

      console.log(`Login Response:`, response);

      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userId',response.data.user._id);
        localStorage.setItem('userRole',response.data.user.role);
        localStorage.setItem('userName', response.data.user.name);
        localStorage.setItem('userEmail',response.data.user.email);
        localStorage.setItem('userPhone',response.data.user.phone);
        localStorage.setItem('expirationTime', (new Date().getTime() + 3600000).toString());

        console.log('Login successful, redirecting to...');
        navigate('/info');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError(error.response?.data?.message || 'Failed to log in');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full">
        <h1 className="text-2xl font-semibold text-center text-gray-700 mb-6">Sign In</h1>

        {error && (
          <div className="bg-red-500 text-white text-sm font-semibold py-2 px-4 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition duration-200">
            Sign In
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account? <a href="/register" className="text-blue-600 hover:underline">Register</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
