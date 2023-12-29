import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";

export default function ExpenseAmount() {
  const [amount, setAmount] = useState([]);
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      "x-auth-token": token,
    },
  };

  const fetchAmount = async () => {
    try {
      const response = await axios.get("/expense-amount", config);
      setAmount(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAmount();
  }, []);

  return (
    <div>
      <h1>Total Expense:</h1>
      <Table striped bordered responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {amount.map((item) => (
            <tr key={item.userid}>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.totalexpense}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
