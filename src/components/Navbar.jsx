import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  const menuItems = [
    { path: "/", label: "Dashboard", icon: "📊" },
    { path: "/pos", label: "POS", icon: "🛒" },
    { path: "/products", label: "Products", icon: "📦" },
    { path: "/invoices", label: "Invoices", icon: "🧾" },
    { path: "/reports", label: "Reports", icon: "📈" },
  ];

  return (
    <div className="sidebar">
      {/* Header */}
      <div className="sidebar-header">
        <h1 className="app-title">Dept Billing</h1>
      </div>

      {/* Main Navigation */}
      <nav className="sidebar-nav">
        <div className="nav-section">
          <h3 className="section-title">Dashboard</h3>
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-item ${isActive(item.path) ? "active" : ""}`}>
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>

      {/* Current URL Display */}
      <div className="current-url">
        <span className="url-text">localhost:5173{location.pathname}</span>
      </div>
    </div>
  );
};

export default Navbar;
