import express from 'express';
import { verifyRecaptcha } from '../services/recaptcha';
import { ContactFormData } from '../types/contact';
import { MailService } from '../services/mail';

const router = express.Router();

// POST /api/contact - Handle contact form submission
router.post('/contact', async (req, res) => {
  try {
    const { 
      recaptchaToken, 
      name, 
      email, 
      message, 
      phone, 
      company, 
      partnershipType 
    }: ContactFormData = req.body;

    // Validate required fields
    if (!name || !email || !message || !recaptchaToken) {
      return res.status(400).json({
        error: 'Missing required fields',
        details: {
          name: !name ? 'Name is required' : undefined,
          email: !email ? 'Email is required' : undefined,
          message: !message ? 'Message is required' : undefined,
          recaptchaToken: !recaptchaToken ? 'reCAPTCHA token is required' : undefined
        }
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        error: 'Invalid email format'
      });
    }

    // Verify reCAPTCHA token
    const recaptchaResult = await verifyRecaptcha(recaptchaToken);
    
    if (!recaptchaResult.success) {
      console.log('reCAPTCHA verification failed:', recaptchaResult);
      return res.status(400).json({
        error: 'reCAPTCHA verification failed. Please try again.'
      });
    }

    // If reCAPTCHA score is too low (for v3)
    if (recaptchaResult.score !== undefined && recaptchaResult.score < 0.5) {
      console.log('reCAPTCHA score too low:', recaptchaResult.score);
      return res.status(400).json({
        error: 'reCAPTCHA verification failed. Please try again.'
      });
    }

    // Log submission (could also save to DB)
    console.log('Contact form submission:', {
      name,
      email,
      phone: phone || 'Not provided',
      company: company || 'Not provided',
      partnershipType: partnershipType || 'Not specified',
      message,
      timestamp: new Date().toLocaleString("en-US", {timeZone: "Europe/Bucharest"}),
      timezone: 'Europe/Bucharest',
      ip: req.ip,
      userAgent: req.get('User-Agent')
    });

    // ✅ Send email
    const mailService = new MailService();
    await mailService.sendContactMail({
      name,
      email,
      phone,
      company,
      partnershipType,
      message
    });

    // Respond to frontend
    res.status(200).json({
      success: true,
      message: 'Mesajul a fost trimis cu succes!',
      timestamp: new Date().toLocaleString("en-US", {timeZone: "Europe/Bucharest"}),
      timezone: 'Europe/Bucharest'
    });

  } catch (error) {
    console.error('Error processing contact form:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to process contact form submission'
    });
  }
});

export { router as contactRouter };
