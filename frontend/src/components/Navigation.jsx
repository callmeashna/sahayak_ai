import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Navigation() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    window.location.href = '/';
  };

  return (
    <nav className="navigation">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          Sahayak-AI
        </Link>
        <div className="nav-links">
          <Link to="/tasks">Browse Tasks</Link>
          {isLoggedIn ? (
            <>
              <Link to="/create-task">Post Task</Link>
              <Link to="/profile">Profile</Link>
              <button onClick={handleLogout} className="nav-button">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
