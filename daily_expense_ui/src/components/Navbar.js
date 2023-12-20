import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

export default function Navbar() {
  const [activeLink, setActiveLink] = useState("Home"); // State to track the active link

  // Function to handle link click and set the active link
  const handleLinkClick = (linkName) => {
    setActiveLink(linkName);
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container-fluid">
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav">
            <li className="nav-item">
                <Link
                  className={`nav-link ${activeLink === "/expense-amount" ? "active" : ""}`}
                  aria-current="page"
                  to="/expense-amount"
                  onClick={() => handleLinkClick("ExpenseAmount")} // Set the active link on click
                >
                  Total
                </Link>
              </li>
              
              <li className="nav-item">
                <Link
                  className={`nav-link ${activeLink === "/add-expense" ? "active" : ""}`}
                  aria-current="page"
                  to="/add-expense"
                  onClick={() => handleLinkClick("Add Expense")} // Set the active link on click
                >
                  Add Expense
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${activeLink === "/user-expenses" ? "active" : ""}`}
                  aria-current="page"
                  to="/user-expenses"
                  onClick={() => handleLinkClick("Expenses")} // Set the active link on click
                >
                  Expenses
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${activeLink === "/signup" ? "active" : ""}`}
                  to="/signup"
                  onClick={() => handleLinkClick("Signup")} // Set the active link on click
                >
                  Signup
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${activeLink === "/login" ? "active" : ""}`}
                  aria-current="page"
                  to="/login"
                  onClick={() => handleLinkClick("Login")} // Set the active link on click
                >
                  Login
                </Link>
              </li>
              
              <li className="nav-item">
                <Link
                  className={`nav-link ${activeLink === "/logout" ? "active" : ""}`}
                  aria-current="page"
                  to="/logout"
                  onClick={() => handleLinkClick("LogoutButton")} // Set the active link on click
                >
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
