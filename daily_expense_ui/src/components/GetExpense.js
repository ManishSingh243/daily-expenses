import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function GetExpense() {
  const [expenses, setExpenses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const token = localStorage.getItem("token");
  const config = {
    headers: {
      "x-auth-token": token,
    },
  };

  const fetchExpenses = async () => {
    try {
      const response = await axios.get(`/user-expenses?page=${currentPage}`, config);
      setExpenses(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, [currentPage]);

  const handleDeleteExpense = async (expenseId) => {
    try {
      await axios.delete(`/delete-expense/${expenseId}`, config);
      fetchExpenses();
    } catch (err) {
      console.log(err);
    }
  };

 const handleDownloadFile = async () => {
    try {
      const response = await axios.get("/download-expense-file", config);
  
      // Extract the file URL from the response
      const fileUrl = response.data.fileUrl;
  
      // Create a hidden link and trigger the download
      const downloadLink = document.createElement("a");
      downloadLink.href = fileUrl;
      downloadLink.download = "expense_report.csv"; // Set the desired file name
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    } catch (err) {
      console.error('Error:', err);
    }
  };

  return (
    <div>
      
      <Table striped bordered responsive>
        <thead>
          <tr>
            <th >Amount</th>
            <th >Description</th>
            <th >Category</th>
            <th >Action</th>
          </tr>
        </thead>
        <tbody style={bodyStyle}>
          {expenses.map((expense) => (
            <tr key={expense.expenseid}>
              <td >{expense.amount}</td>
              <td >{expense.description}</td>
              <td >{expense.category}</td>
              <td >
                <Button onClick={() => handleDeleteExpense(expense.expenseid)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div style={buttonContainerStyle}>
        <Link to="/add-expense" style={buttonLinkStyle}>
          <Button type="submit" style={buttonStyle}>
            Add Expense
          </Button>
        </Link>
        <Button onClick={handleDownloadFile} style={buttonStyle}>
          Download Expense File
        </Button>
        <Button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          style={buttonStyle}
        >
          Previous Page
        </Button>
        <Button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={expenses.length < 10}
          style={buttonStyle}
        >
          Next Page
        </Button>
      </div>
    </div>
  );
}

const buttonContainerStyle = {
  display: "flex",
  justifyContent: "center", // Center the buttons horizontally
  marginTop: "20px",
  fontSize: "5px"
};

const buttonLinkStyle = {
  textDecoration: "none",
};

const buttonStyle = {
  margin: "10px",
  backgroundColor: "#28a745",
  color: "#fff",
  border: "none",
  padding: "10px 20px",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "10px"
};

const bodyStyle = {
  fontSize: "14px"
}
