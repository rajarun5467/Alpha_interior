import jwt from 'jsonwebtoken';
import { Admin } from '../models/index.js';

export async function protect(req, res, next) {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) return res.status(401).json({ message: 'Not authorized, no token' });
  try {
    const secret = process.env.JWT_SECRET || 'alpha-office-dev-secret-fallback-2025';
    const decoded = jwt.verify(token, secret);
    req.admin = await Admin.findById(decoded.id).select('-password');
    if (!req.admin) return res.status(401).json({ message: 'Not authorized' });
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token failed' });
  }
}
