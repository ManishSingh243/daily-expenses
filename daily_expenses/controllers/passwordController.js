const Sib = require('sib-api-v3-sdk');
const dotenv = require('dotenv').config();

const defaultClient = Sib.ApiClient.instance;
var apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = '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';

exports.postPassword = async (req, res) => {
    const transEmailApi = new Sib.TransactionalEmailsApi();

    const sender = {
        email: req.body.userEmail,
    };

    const receivers = [
        {
            email: 'singhmanish975310@gmail.com',
        },
    ];

    try {
        const sendEmail = await transEmailApi.sendTransacEmail({
            sender,
            to: receivers,
            subject: 'Password Reset',
            htmlContent: '<p>Click the link to reset your password: [reset-link]</p>', // Add your reset link here
        });
        res.send(sendEmail);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to send reset email' });
    }
};
