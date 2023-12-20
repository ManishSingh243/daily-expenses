import React, { useState, useEffect } from "react";
import axios from "axios";

export default function ExpenseAmount() {
  const [amount, setAmount] = useState([]);

  const fetchAmount = async () => {
    try {
      const response = await axios.get("/expense-amount");
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
      <h1>Amounts of respective users:</h1>
      <ul>
        {amount.map((item) => (
          <li key={item.userid}>
            {item.name}: {item.totalexpense}
          </li>
        ))}
      </ul>
    </div>
  );
}
