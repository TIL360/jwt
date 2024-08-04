import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        // Call the logout endpoint to clear cookies
        await axios.post('http://localhost:5127/logout', {}, { withCredentials: true });
        
        // Redirect to login page after logout
        navigate('/');
      } catch (err) {
        console.error(err);
        // Optional: You could redirect to the login page even if there was an error
        navigate('/');
      }
    };

    handleLogout();
  }, [navigate]);

  return (
    <div className="container text-center">
      <h1>Logging out...</h1>
    </div>
  );
};

export default Logout;
