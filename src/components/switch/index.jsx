import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext'; // Adjust the path as necessary
import { AiFillMoon, AiFillSun } from 'react-icons/ai';
import './style.css';

const Switch = () => {
  const { theme, toggleTheme } = useContext(ThemeContext); // Directly access ThemeContext

  return (
    <div className="container-switch">
      <label htmlFor="switch" className="switch">
        <input 
          id="switch" 
          type="checkbox" 
          onChange={toggleTheme} 
          checked={theme === 'dark'} 
        />
        <span className="slider">
          {theme === 'dark' ? <AiFillSun className="icon" /> : <AiFillMoon className="icon" />}
        </span>
      </label>
    </div>
  );
};

export default Switch;
