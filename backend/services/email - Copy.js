const nodemailer = require('nodemailer');
const crypto = require('crypto');

class EmailService {
    constructor() {
        this.transporter = null;
        this.initTransporter();
    }

    initTransporter() {
        // Check if email is configured
        if (!process.env.EMAIL_HOST || !process.env.EMAIL_USER) {
            console.warn('⚠️  Email not configured. Email features will be disabled.');
            console.warn('   Add EMAIL_HOST, EMAIL_USER, EMAIL_PASS to .env to enable email');
            return;
        }

        try {
            this.transporter = nodemailer.createTransporter({
                host: process.env.EMAIL_HOST,
                port: parseInt(process.env.EMAIL_PORT) || 587,
                secure: process.env.EMAIL_SECURE === 'true',
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS
                }
            });

            console.log('✅ Email service configured');
            console.log('   Host:', process.env.EMAIL_HOST);
            console.log('   Port:', process.env.EMAIL_PORT);
            console.log('   User:', process.env.EMAIL_USER);
        } catch (error) {
            console.error('❌ Failed to configure email:', error.message);
        }
    }

    generateToken() {
        return crypto.randomBytes(32).toString('hex');
    }

    isConfigured() {
        return this.transporter !== null;
    }

    async sendVerificationEmail(email, username, token) {
        if (!this.isConfigured()) {
            console.log('Email not configured - skipping verification email');
            return { success: false, reason: 'Email not configured' };
        }

        const verificationUrl = process.env.FRONTEND_URL + '/verify-email?token=' + token;
        
        const mailOptions = {
            from: '"Arcane Angler" <' + process.env.EMAIL_USER + '>',
            to: email,
            subject: 'Verify Your Arcane Angler Account',
            html: '<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">' +
                  '<h1 style="color: #1e40af;">🎣 Welcome to Arcane Angler!</h1>' +
                  '<p>Hi ' + username + ',</p>' +
                  '<p>Thank you for registering! Please verify your email address to start fishing.</p>' +
                  '<div style="text-align: center; margin: 30px 0;">' +
                  '<a href="' + verificationUrl + '" ' +
                  'style="background-color: #1e40af; color: white; padding: 15px 30px; ' +
                  'text-decoration: none; border-radius: 5px; display: inline-block;">' +
                  'Verify Email Address</a></div>' +
                  '<p>Or copy and paste this link into your browser:</p>' +
                  '<p style="background-color: #f3f4f6; padding: 10px; word-break: break-all;">' +
                  verificationUrl + '</p>' +
                  '<p style="color: #666; font-size: 12px; margin-top: 30px;">' +
                  'This link will expire in 24 hours. If you did not create this account, ' +
                  'please ignore this email.</p></div>'
        };

        try {
            await this.transporter.sendMail(mailOptions);
            console.log('✅ Verification email sent to ' + email);
            return { success: true };
        } catch (error) {
            console.error('❌ Failed to send verification email:', error.message);
            return { success: false, reason: error.message };
        }
    }

    async sendPasswordResetEmail(email, username, token) {
        if (!this.isConfigured()) {
            console.log('Email not configured - skipping reset email');
            return { success: false, reason: 'Email not configured' };
        }

        const resetUrl = process.env.FRONTEND_URL + '/reset-password?token=' + token;
        
        const mailOptions = {
            from: '"Arcane Angler" <' + process.env.EMAIL_USER + '>',
            to: email,
            subject: 'Reset Your Arcane Angler Password',
            html: '<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">' +
                  '<h1 style="color: #1e40af;">🎣 Password Reset Request</h1>' +
                  '<p>Hi ' + username + ',</p>' +
                  '<p>We received a request to reset your password. Click the button below to create a new password.</p>' +
                  '<div style="text-align: center; margin: 30px 0;">' +
                  '<a href="' + resetUrl + '" ' +
                  'style="background-color: #dc2626; color: white; padding: 15px 30px; ' +
                  'text-decoration: none; border-radius: 5px; display: inline-block;">' +
                  'Reset Password</a></div>' +
                  '<p>Or copy and paste this link into your browser:</p>' +
                  '<p style="background-color: #f3f4f6; padding: 10px; word-break: break-all;">' +
                  resetUrl + '</p>' +
                  '<p style="color: #666; font-size: 12px; margin-top: 30px;">' +
                  'This link will expire in 1 hour. If you did not request a password reset, ' +
                  'please ignore this email and your password will remain unchanged.</p></div>'
        };

        try {
            await this.transporter.sendMail(mailOptions);
            console.log('✅ Password reset email sent to ' + email);
            return { success: true };
        } catch (error) {
            console.error('❌ Failed to send reset email:', error.message);
            return { success: false, reason: error.message };
        }
    }
}

module.exports = new EmailService();