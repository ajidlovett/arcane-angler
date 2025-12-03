const nodemailer = require('nodemailer');
const crypto = require('crypto');

class EmailService {
    constructor() {
        this.transporter = null;
        this.init();
    }

    init() {
        const host = process.env.EMAIL_HOST;
        const user = process.env.EMAIL_USER;
        
        if (!host || !user) {
            console.warn('EMAIL NOT CONFIGURED');
            return;
        }

        this.transporter = nodemailer.createTransport({
            host: host,
            port: Number(process.env.EMAIL_PORT) || 587,
            secure: process.env.EMAIL_SECURE === 'true',
            auth: {
                user: user,
                pass: process.env.EMAIL_PASS
            }
        });
        
        console.log('EMAIL CONFIGURED SUCCESSFULLY');
        console.log('Host:', host);
        console.log('User:', user);
    }

    generateToken() {
        return crypto.randomBytes(32).toString('hex');
    }

    isConfigured() {
        return this.transporter !== null;
    }

    async sendVerificationEmail(email, username, token) {
        if (!this.transporter) {
            return { success: false };
        }

        const link = process.env.FRONTEND_URL + '/verify-email?token=' + token;
        
        try {
            await this.transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: email,
                subject: 'Verify Your Arcane Angler Account',
                html: '<h1>Welcome to Arcane Angler!</h1><p>Hi ' + username + ',</p><p><a href="' + link + '">Click here to verify your email</a></p>'
            });
            console.log('VERIFICATION EMAIL SENT TO:', email);
            return { success: true };
        } catch (err) {
            console.log('EMAIL SEND FAILED:', err.message);
            return { success: false, reason: err.message };
        }
    }

    async sendPasswordResetEmail(email, username, token) {
        if (!this.transporter) {
            return { success: false };
        }

        const link = process.env.FRONTEND_URL + '/reset-password?token=' + token;
        
        try {
            await this.transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: email,
                subject: 'Reset Your Arcane Angler Password',
                html: '<h1>Password Reset</h1><p>Hi ' + username + ',</p><p><a href="' + link + '">Click here to reset your password</a></p>'
            });
            console.log('PASSWORD RESET EMAIL SENT TO:', email);
            return { success: true };
        } catch (err) {
            console.log('EMAIL SEND FAILED:', err.message);
            return { success: false, reason: err.message };
        }
    }
}

module.exports = new EmailService();