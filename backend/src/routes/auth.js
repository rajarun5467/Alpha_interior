import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import rateLimit from 'express-rate-limit';
import { Admin } from '../models/index.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { message: 'Too many login attempts. Try again in 15 minutes.' }
});

router.post('/login', loginLimiter, async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(401).json({ message: 'Invalid credentials' });
    const match = await bcrypt.compare(password, admin.password);
    if (!match) return res.status(401).json({ message: 'Invalid credentials' });
    const secret = process.env.JWT_SECRET;
    if (!secret) console.warn('WARNING: JWT_SECRET env not set — using insecure fallback');
    const token = jwt.sign({ id: admin._id }, secret || 'alpha-office-dev-secret-fallback-2025', { expiresIn: '7d' });
    res.json({ token, admin: { email: admin.email } });
  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).json({ message: 'Server error during login' });
  }
});

router.get('/me', protect, async (req, res) => {
  res.json(req.admin);
});

router.post('/change-password', protect, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!newPassword || newPassword.length < 6) {
      return res.status(400).json({ message: 'New password must be at least 6 characters' });
    }
    const admin = await Admin.findById(req.admin._id);
    const match = await bcrypt.compare(currentPassword, admin.password);
    if (!match) return res.status(400).json({ message: 'Current password is incorrect' });
    admin.password = await bcrypt.hash(newPassword, 10);
    await admin.save();
    res.json({ success: true, message: 'Password updated successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
