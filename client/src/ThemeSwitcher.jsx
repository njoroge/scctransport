import React from 'react';
import { useTheme } from './ThemeContext.jsx';
import { Sun, Moon } from 'react-icons/fa'; // Using FaSun and FaMoon icons as examples

const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme} className="btn btn-success">
      {theme === 'light' ? <Moon /> : <Sun />}
    </button>
  );
};

export default ThemeSwitcher;
