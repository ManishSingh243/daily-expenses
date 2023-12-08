const Sib = require('sib-api-v3-sdk');
const uuid = require('uuid');
const dotenv = require('dotenv').config();
const db = require('../util/database');
const bcrypt = require("bcrypt");


const defaultClient = Sib.ApiClient.instance;
var apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = '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';

exports.postPassword = async (req, res) => {
    const transEmailApi = new Sib.TransactionalEmailsApi();
    const userEmail = req.body.userEmail;

    const sender = {
        email: userEmail,
    };

    const receivers = [
        {
            email: 'singhmanish975310@gmail.com',
        },
    ];

    try {
        // Generate a unique ID (uuid) for the forgot password request
        const requestId = uuid.v4();

        const [rows] = await db.query('select userId from users where email = ?', [userEmail]);
        const userId = rows[0].userId;

        // Save the request details to the database
        await db.query('INSERT INTO forgotpasswordrequests (id, userId, isActive) VALUES (?, ?, ?)', [requestId, userId, true]);

        // Construct the reset URL with the unique ID
        const resetUrl = 'http://localhost:3000/reset-password/${requestId}';

        // Send the reset email
        const sendEmail = await transEmailApi.sendTransacEmail({
            sender,
            to: receivers,
            subject: 'Password Reset',
            htmlContent: `<p>Click the link to reset your password: ${resetUrl}</p>`,
        });

        res.send(sendEmail);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to send reset email' });
    }
};

// New API endpoint for handling password reset
exports.postResetPassword = async (req, res) => {
    const newPassword= req.body.newPassword;
    const requestId = req.params.requestId;

    try {
        // Check if the request exists and is active
        const [request] = await db.query('SELECT * FROM ForgotPasswordRequests WHERE id = ? AND isActive = ?', [requestId, true]);

        if (!request || request.length === 0) {
            return res.status(404).json({ error: 'Invalid or expired reset link' });
        }

        // Update the user's password in the database
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await db.query('UPDATE users SET password = ? WHERE userid = ?', [hashedPassword, request[0].userId]);

        // Deactivate the reset link
        await db.query('UPDATE ForgotPasswordRequests SET isActive = ? WHERE id = ?', [false, requestId]);

        res.status(200).json({ message: 'Password reset successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
