import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { cloudinary, useCloudinary } from '../middleware/upload.js';

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadDir = path.join(__dirname, '../../uploads');

// GET /api/admin/media — list all images (Cloudinary + local uploads)
router.get('/', async (req, res) => {
  try {
    const proto = req.headers['x-forwarded-proto'] || req.protocol;
    const baseUrl = `${proto}://${req.get('host')}`;

    const local = fs.existsSync(uploadDir)
      ? fs.readdirSync(uploadDir)
          .filter((f) => /\.(jpe?g|png|webp|gif)$/i.test(f))
          .map((f) => {
            const stat = fs.statSync(path.join(uploadDir, f));
            return { url: `${baseUrl}/uploads/${f}`, name: f, source: 'local', size: stat.size };
          })
      : [];

    let cloud = [];
    if (useCloudinary) {
      try {
        const result = await cloudinary.api.resources({
          type: 'upload', prefix: 'alpha-office/', max_results: 500
        });
        cloud = result.resources.map((r) => ({
          url: r.secure_url, name: r.public_id, source: 'cloudinary', size: r.bytes
        }));
      } catch (e) {
        console.error('Cloudinary list failed:', e.message);
      }
    }

    res.json({ images: [...cloud, ...local] });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

// DELETE /api/admin/media — delete image by URL
router.delete('/', async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) return res.status(400).json({ message: 'url is required' });

    // Cloudinary asset
    if (url.includes('res.cloudinary.com')) {
      if (!useCloudinary) return res.status(400).json({ message: 'Cloudinary not configured' });
      const m = url.match(/\/upload\/(?:v\d+\/)?(.+)\.\w+$/);
      if (!m) return res.status(400).json({ message: 'Invalid Cloudinary URL' });
      await cloudinary.uploader.destroy(m[1]);
      return res.json({ success: true });
    }

    // Local uploaded file
    const m = url.match(/\/uploads\/([^/?#]+)$/);
    if (!m) return res.status(400).json({ message: 'Only uploaded files can be deleted' });
    const filename = path.basename(m[1]);
    const filePath = path.join(uploadDir, filename);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

export default router;
