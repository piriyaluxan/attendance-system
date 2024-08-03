import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Ensure you have this if you're using React Router

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const { token } = await response.json();
        localStorage.setItem('token', token);
        navigate('/home'); // Redirect after login
      } else {
        alert('Login failed');
      }
    } catch (err) {
      console.error('Error during login:', err);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <section className="bg-gray-50 dark:bg-gray-900 py-8 px-4 mx-auto max-w-screen-xl lg:py-16 grid lg:grid-cols-2 gap-8 lg:gap-16">
        <div className="flex flex-col justify-center">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
            Welcome to School Attendance System!
          </h1>
          <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
            Manage student attendance effortlessly with our streamlined system. Log in to track and manage attendance records, generate reports, and more.
          </p>
          <a href="#" className="text-blue-600 dark:text-blue-500 hover:underline font-medium text-lg inline-flex items-center">
            Learn more about our features
            <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
            </svg>
          </a>
        </div>
        <div className="w-full lg:max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow-xl dark:bg-gray-800">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Sign in to access your account
          </h2>
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div>
              <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
              <input 
                type="text" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                id="username" 
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                placeholder="Username" 
                required 
              />
            </div>
            <div>
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
              <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                id="password" 
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                placeholder="••••••••" 
                required 
              />
            </div>
            <div className="flex items-start mb-5">
              <div className="flex items-center h-5">
                <input 
                  id="remember" 
                  type="checkbox" 
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" 
                />
              </div>
              <label htmlFor="remember" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
            </div>
            <button 
              type="submit" 
              className="w-full px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Login to your account
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}

export default Login;
