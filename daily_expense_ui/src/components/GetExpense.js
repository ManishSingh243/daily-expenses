import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function GetExpense() {
  const [expenses, setExpenses] = useState([]);

  //pagination
  const [currentPage, setCurrentPage] = useState(1);

  const token = localStorage.getItem("token");
  const config = {
    headers: {
      "x-auth-token": token,
    },
  };

  const fetchExpenses = async () => {
    try {
      const response = await axios.get(
        `/user-expenses?page=${currentPage}`,
        config
      );
      setExpenses(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchExpenses(); // Call the function here
  }, [currentPage]);

  const handleDeleteExpense = async (expenseId) => {
    try {
      await axios.delete(`/delete-expense/${expenseId}`, config);
      fetchExpenses(); // Refresh the list after deletion
    } catch (err) {
      console.log(err);
    }
  };

  const handleDownloadFile = async () => {
    try {
      const response = await axios.get("/download-expense-file", config);

      // Show the file URL to the user
      alert(`Download your expense file:\n${response.data.fileUrl}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>Expense List</h1>
      <ul>
        {expenses.map((expense) => (
          <li key={expense.expenseid}>
            <strong>Amount:</strong> {expense.amount},{" "}
            <strong>Description:</strong> {expense.description},{" "}
            <strong>Category:</strong> {expense.category}
            <Button onClick={() => handleDeleteExpense(expense.expenseid)}>
              Delete
            </Button>
          </li>
        ))}
      </ul>
      <Link to="/expense">
        <Button type="submit">Add Expense</Button>
      </Link>
      <Button onClick={handleDownloadFile}>Download Expense File</Button>
      
      <Button
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous Page
      </Button>
      <Button onClick={() => setCurrentPage(currentPage + 1)} 
      disabled={expenses.length < 10}
      >
        Next Page
      </Button>
    </div>
  );
}
