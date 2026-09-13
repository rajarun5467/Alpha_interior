import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import publicRoutes from './routes/public.js';
import adminRoutes from './routes/admin.js';
import leadsRoutes from './routes/leads.js';
import uploadRoutes from './routes/upload.js';
import { Admin } from './models/index.js';
import { runSeed } from './seed/seed.js';

dotenv.config();
connectDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const defaultOrigins = [
  'https://alpha-interior.vercel.app',
  'http://localhost:5173',
  'http://localhost:5174'
];
const envOrigins = (process.env.CORS_ORIGIN || '').split(',').map(s => s.trim()).filter(Boolean);
const allowedOrigins = [...new Set([...defaultOrigins, ...envOrigins])];
app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(express.json({ limit: '10mb' }));
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.use('/api/auth', authRoutes);
app.use('/api', publicRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/leads', leadsRoutes);
app.use('/api/admin/upload', uploadRoutes);

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

// Manual re-seed endpoint (can be triggered via browser)
app.get('/api/seed', async (req, res) => {
  try {
    await runSeed();
    res.json({ status: 'ok', message: 'Database seeded successfully' });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

// Auto-seed on first startup if database is empty
const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  try {
    const adminCount = await Admin.countDocuments();
    if (adminCount === 0) {
      console.log('No admin user found — running auto-seed...');
      await runSeed();
      console.log('Auto-seed complete!');
    } else {
      console.log(`Database already has ${adminCount} admin user(s) — skipping seed.`);
    }
  } catch (err) {
    console.error('Auto-seed failed:', err.message);
  }
});
