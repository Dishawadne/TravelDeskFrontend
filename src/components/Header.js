import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
 
const Header = () => {
  return (
    <header className="header">
      <div className="header-title">Travel Desk</div>
      <div className="header-buttons">
        <Link to="/" className="button">Home</Link>
        <Link to="/login" className="button">Login</Link>
       
      </div>
    </header>
  );
};
 
export default Header;