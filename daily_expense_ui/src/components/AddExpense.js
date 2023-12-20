import React, { useEffect, useState } from "react";
import { Button, Form, FormLabel } from "react-bootstrap";
import axios from "axios";

export default function AddExpense() {
  const [formData, setFormData] = useState({
    amount: "",
    description: "",
    category: "",
  });
  const [message, setMessage] = useState("");
  const [isPremium, setIsPremium] = useState(false);

  useEffect(() => {
    // Check if the user is a premium member when the component loads
    const premiumStatus = localStorage.getItem("isPremium");
    setIsPremium(premiumStatus === 'true');
  },[isPremium]);

  const displayRazorPay = async () => {
    const res = await loadRazorPay();
    if (!res) {
      alert("Razorpay onload failed");
      return;
    }
  
    try {
      const response = await fetch('/razorpay', {
        method: 'POST',
        headers: {
          'x-auth-token': localStorage.getItem('token'), // Include the token in the headers
        },
      });

      if (response.ok) {
        const data = await response.json();

        var options = {
          key: "rzp_test_eYUyK6TSJLcUyt",
          amount: data.amount,
          currency: data.currency,
          name: "Manish Singh",
          description: "Test Transaction",
          image: "https://example.com/your_logo",
          order_id: data.id,
          handler: async function (response) {
            try {
              const captureResponse = await fetch('/capture-payment', {
                method: 'POST',
                headers: {
                  'x-auth-token': localStorage.getItem('token'),
                  'Content-Type': 'application/json', // Add this line
                },
                body: JSON.stringify({
                  paymentId: response.razorpay_payment_id,
                  orderId: response.razorpay_order_id,
                }),
              });
          
              if (captureResponse.ok) {
                const captureData = await captureResponse.json();
          
                localStorage.setItem('isPremium', captureData.isPremium);
                setIsPremium(captureData.isPremium);
                alert(response.razorpay_payment_id);
                alert(response.razorpay_order_id);
              } else {
                alert("Failed to capture payment");
              }
            } catch (error) {
              alert("Error while capturing payment");
            }
          },          
          theme: {
            color: "#3399cc",
          },
        };
  
        var paymentObject = new window.Razorpay(options);
        paymentObject.open();

      } else {
        alert("Failed to retrieve Razorpay data");
      }
    } catch (error) {
      alert("Error while processing payment");
      console.error(error);
    }
  };
  

  const loadRazorPay = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script'); // Create a script element
      script.src = "//checkout.razorpay.com/v1/checkout.js";
      document.body.appendChild(script);
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
    });
  };

  const handleExpense = async (e) => {
    e.preventDefault();

     const token = localStorage.getItem("token"); // Get the token from local storage
    const config = {
      headers: {
        "x-auth-token": token, // Include the token in the headers
      },
    };

    try {
      const response = await axios.post("/add-expense", formData, config); // Pass the config object with headers
      if (response.status === 200) {
        setMessage("Expense added successfully");
        setFormData({ amount: "", description: "", category: "" });
        alert("Expense added successfully");
      } else {
        response.status(401);
      }
    } catch (err) {
      setMessage("Internal database error");
      //window.location.href = '/login'
      alert("User not Authorized");
    }
  };

  const changeExpense = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  console.log("is premium: ",isPremium);
  return (
    <div>
      <Form onSubmit={handleExpense}>
        <Form.Group className="mb-3">
          <Form.Label>Money Spent:</Form.Label>
          <Form.Control
            type="number"
            name="amount"
            placeholder="Enter Amount"
            onChange={changeExpense}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            name="description"
            placeholder="Description"
            onChange={changeExpense}
            required
          />
        </Form.Group>

        <Form.Select
          className="mb-3"
          aria-label="Default select example"
          name="category"
          value={formData.category}
          onChange={changeExpense}
          required
        >
          <option>Select Category</option>
          <option value="Food">Food</option>
          <option value="Petrol">Petrol</option>
          <option value="Games">Games</option>
          <option value="Entertainment">Entertainment</option>
        </Form.Select>

        <Button className="mb-3" type="submit">
          Add
        </Button>
      </Form>
      {isPremium ? (
          <p>You're a premium member</p>
        ) : (
          <Button type="submit" onClick={displayRazorPay}>
            Buy Premium
          </Button>
        )}
      <p>{message}</p>
    </div>
  );
}
