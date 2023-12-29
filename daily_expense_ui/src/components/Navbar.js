import React, { useState } from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Navbar() {
  const [activeLink, setActiveLink] = useState("Home"); // State to track the active link

  // Function to handle link click and set the active link
  const handleLinkClick = (linkName) => {
    setActiveLink(linkName);
  };

  return (
    <div style={navbarStyle}>
      <Link to="/expense-amount" onClick={() => handleLinkClick("ExpenseAmount")} style={linkStyle}>
        Total
      </Link>

      <Link to="/add-expense" onClick={() => handleLinkClick("Add Expense")} style={linkStyle}>
        Add Expense
      </Link>

      <Link to="/user-expenses" onClick={() => handleLinkClick("Expenses")} style={linkStyle}>
        Expenses
      </Link>

      <Link to="/signup" onClick={() => handleLinkClick("Signup")} style={linkStyle}>
        Signup
      </Link>

      <Link to="/login" onClick={() => handleLinkClick("Login")} style={linkStyle}>
        Login
      </Link>

      <Link to="/logout" onClick={() => handleLinkClick("LogoutButton")} style={linkStyle}>
        Logout
      </Link>
    </div>
  );
}

const navbarStyle = {
  backgroundColor: "#28a745",
  padding: "10px",
  display: "flex",
};

const linkStyle = {
  color: "#fff",
  margin: "0 10px",
  textDecoration: "none",
  fontSize: "10px"
};
