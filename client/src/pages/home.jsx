import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const home = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');

  const handleLogout = () => {
    // Remove token from localStorage
    localStorage.removeItem('token');
    // Redirect to login page
    navigate('/');
  };

  useEffect(() => {
    fetch('http://localhost:5000/home', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        return response.json();
      })
      .then(data => setMessage(data.message))
      .catch(err => {
        alert(`Failed to fetch data: ${err.message}`);
        handleLogout();
      });
  }, [navigate]);

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <section className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Welcome Back!</h1>
        <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">
          You have successfully logged in to the School Attendance System. You can now manage student attendance, generate reports, and more.
        </p>
        <button
          onClick={handleLogout}
          className="mt-6 w-full px-4 py-2 text-base font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-700">
          Logout
        </button>
      </section>
    </main>
  );
};

export default home;
