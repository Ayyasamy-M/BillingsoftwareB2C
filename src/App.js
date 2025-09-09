import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import PointOfSale from "./pages/PointOfSale";
import Inventory from "./pages/Inventory";
import Reports from "./pages/Reports";
import ReportChart from "./pages/ReportChart";

import "./App.css";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/pos" element={<PointOfSale />} />
            <Route path="/products" element={<Inventory />} />
            <Route path="/invoices" element={<Reports />} />
            <Route path="/reports" element={<ReportChart />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
