import React, {useState} from "react";
import { Button, Form, FormLabel } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from 'axios';

export default function Login() {
  const [formData, setFormData] =  useState({ email: '', password: ''})
  const [error, setError] = useState('');
  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]:e.target.value})
  }
  const handleSubmit = async (e)=>{
    e.preventDefault();

    try {
      const response = await axios.post('/login', formData);
      if(response.status === 200){
        const token = response.data.token;
        const isPremium = response.data.isPremium;
        localStorage.setItem('token', token);
        localStorage.setItem('isPremium', isPremium);
        alert("user logged in successfully");
        // Redirect to '/user-expenses'
    window.location.href = '/user-expenses';
      }
    } catch (err) {
      setError('An error occurred');
    }
  }

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" name="email" onChange={handleChange} placeholder="email" required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" name="password" onChange={handleChange} placeholder="password" required />
        </Form.Group>

        <Button type="submit">Login</Button>
        <Form.Text className="ms-3">I'm a new user </Form.Text>
        <Link to='/signup'>click here</Link>

        <div className="mb-3">
        <b>Forgot Password :</b> click here
        <Link to='/forgot-password'>forgot password</Link>
        </div>
      </Form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
