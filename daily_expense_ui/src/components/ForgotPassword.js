import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';

export default function ForgotPassword() {
    const [userEmail, setUserEmail] = useState('');

    const handlePassword = async (e) => {
        e.preventDefault();

        try {
            // Send a request to the resetPassword API endpoint
            const response = await axios.post('/forgot-password', { userEmail });
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div>
                <Form onSubmit={handlePassword}>
                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            name="userEmail"
                            placeholder="Email"
                            value={userEmail}
                            onChange={(e) => setUserEmail(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Button type="submit">Reset</Button>
                </Form>

            <div className="mb-3">
                <b>Back to Login:</b> click here
                <Link to="/login">Back</Link>
            </div>
        </div>
    );
}
