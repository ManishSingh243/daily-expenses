import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from 'axios';

export default function SignUp() {
  const [formData, setFormData] =  useState({name: '', email: '', password: ''})
  const [error, setError] = useState('');
  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]:e.target.value})
  }
  const handleSubmit = async (e)=>{
    e.preventDefault();

    try{
      const response = await axios.post('/signup', formData);
      
      if(response.data.exists){
        alert("User account created successfully");
        window.location.href = '/login';
      }
    }
    catch(err){
      setError(err.response.data.error);
    }
  }
  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" name="name" placeholder="Enter Name" onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" name="password" placeholder="Password" onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" name="email" placeholder="Enter email" onChange={handleChange} required />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <div className="mb-3">
        <b>Already have an account:</b> click here
        <Link to='/login'>login</Link>
        </div>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
