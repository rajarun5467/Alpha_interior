import express from 'express';
import upload, { cloudinary, useCloudinary } from '../middleware/upload.js';

const router = express.Router();

router.post('/', (req, res) => {
  upload.single('image')(req, res, async (err) => {
    if (err) return res.status(400).json({ message: err.message });
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

    // Cloudinary path — permanent storage
    if (useCloudinary) {
      try {
        const result = await new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: 'alpha-office', resource_type: 'image' },
            (error, result) => (error ? reject(error) : resolve(result))
          );
          stream.end(req.file.buffer);
        });
        return res.json({ url: result.secure_url });
      } catch (e) {
        return res.status(500).json({ message: 'Cloudinary upload failed: ' + e.message });
      }
    }

    // Local disk fallback
    const proto = req.headers['x-forwarded-proto'] || req.protocol;
    const baseUrl = `${proto}://${req.get('host')}`;
    res.json({ url: `${baseUrl}/uploads/${req.file.filename}` });
  });
});

export default router;
