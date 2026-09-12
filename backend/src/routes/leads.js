import express from 'express';
import rateLimit from 'express-rate-limit';
import { QuoteSubmission, ContactSubmission } from '../models/index.js';

const router = express.Router();

const submitLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 10 });

router.post('/quote', submitLimiter, async (req, res) => {
  try {
    const lead = await QuoteSubmission.create(req.body);
    res.status(201).json({ success: true, id: lead._id });
  } catch (e) { res.status(400).json({ message: e.message }); }
});

router.post('/contact', submitLimiter, async (req, res) => {
  try {
    const lead = await ContactSubmission.create(req.body);
    res.status(201).json({ success: true, id: lead._id });
  } catch (e) { res.status(400).json({ message: e.message }); }
});

export default router;
