import React from 'react';
import ThemeSwitcher from '../ThemeSwitcher.jsx';
import './Navbar.css';

const Navbar = () => {
  return (
    <div className="navbar">
      <ThemeSwitcher />
    </div>
  );
};

export default Navbar;
