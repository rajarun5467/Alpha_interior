import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Admin } from '../models/index.js';

const router = express.Router();

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(401).json({ message: 'Invalid credentials' });
    const match = await bcrypt.compare(password, admin.password);
    if (!match) return res.status(401).json({ message: 'Invalid credentials' });
    const secret = process.env.JWT_SECRET || 'alpha-office-dev-secret-fallback-2025';
    const token = jwt.sign({ id: admin._id }, secret, { expiresIn: '7d' });
    res.json({ token, admin: { email: admin.email } });
  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).json({ message: 'Server error during login' });
  }
});

router.get('/me', async (req, res) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) return res.status(401).json({ message: 'No token' });
  try {
    const secret = process.env.JWT_SECRET || 'alpha-office-dev-secret-fallback-2025';
    const decoded = jwt.verify(token, secret);
    const admin = await Admin.findById(decoded.id).select('-password');
    res.json(admin);
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
});

export default router;
