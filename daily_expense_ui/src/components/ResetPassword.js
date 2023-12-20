import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';

export default function ResetPassword() {
    const [newPassword, setNewPassword] = useState('');
    const { requestId } = useParams();

    const handleReset = async (e) => {
        e.preventDefault();

        try {
            // Send a request to the resetPassword API endpoint
            const response = await axios.post(`/reset-password/${requestId}`, { newPassword });
        } catch (err) {
            console.log(err);
        }
    };
  return (
    <Form onSubmit={handleReset}>
                    <Form.Group className="mb-3">
                        <Form.Label>New Password</Form.Label>
                        <Form.Control
                            type="password"
                            name="newPassword"
                            placeholder="New Password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Button type="submit">Reset Password</Button>
                </Form>
  )
}
