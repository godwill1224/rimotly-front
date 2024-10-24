import { useState, useCallback } from "react";
import Switch from "../switch";
import { AiOutlineFieldTime, AiOutlineMenu } from "react-icons/ai";
import "./style.css";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { pathname } = useLocation();

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  const isActive = (route) => pathname === route ? "active" : "";

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        <AiOutlineFieldTime /> <span>rimotly</span>
      </Link>

      <div className="nav-left-items">
        <ul className={`nav-links ${isMenuOpen ? "active" : ""}`}>
          <li className={isActive("/trigger-notification")}>
            <Link to="/about">About</Link>
          </li>
          <li className={isActive("/create-notification")}>
            <Link to="/contact">Contact US</Link>
          </li>
        </ul>

        <div className="menu-icon" onClick={toggleMenu}>
          <AiOutlineMenu />
        </div>

        <Switch />
      </div>
    </nav>
  );
};

export default Navbar;
