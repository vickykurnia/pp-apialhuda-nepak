// routes/galeriFotoRoutes.js
import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import db from '../config/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Jalankan sekali di phpMyAdmin/HeidiSQL kalau tabel belum ada:
//
// CREATE TABLE galeri_foto (
//   id INT AUTO_INCREMENT PRIMARY KEY,
//   judul VARCHAR(255) NOT NULL,
//   url VARCHAR(255) NOT NULL,
//   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
// );

// Multer: simpan file ke folder backend/uploads (folder yang sama
// yang sudah di-serve statis lewat app.use('/uploads', ...) di server.js)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '..', 'uploads'));
  },
  filename: (req, file, cb) => {
    const uniqueName = `foto-${Date.now()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});
const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } }); // max 5MB

// GET semua foto (terbaru dulu)
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM galeri_foto ORDER BY created_at DESC');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Gagal mengambil data galeri foto.' });
  }
});

// POST tambah foto baru
router.post('/', upload.single('foto'), async (req, res) => {
  try {
    const { judul } = req.body;
    if (!judul || !req.file) {
      return res.status(400).json({ message: 'Judul dan file foto wajib diisi.' });
    }
    const url = `/uploads/${req.file.filename}`;
    const [result] = await db.query(
      'INSERT INTO galeri_foto (judul, url) VALUES (?, ?)',
      [judul, url]
    );
    res.status(201).json({ id: result.insertId, url, message: 'Foto berhasil ditambahkan.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Gagal menyimpan foto.' });
  }
});

// PUT edit foto (judul, dan file kalau diganti)
router.put('/:id', upload.single('foto'), async (req, res) => {
  try {
    const { judul } = req.body;
    if (req.file) {
      const url = `/uploads/${req.file.filename}`;
      await db.query('UPDATE galeri_foto SET judul = ?, url = ? WHERE id = ?', [judul, url, req.params.id]);
    } else {
      await db.query('UPDATE galeri_foto SET judul = ? WHERE id = ?', [judul, req.params.id]);
    }
    res.json({ message: 'Foto berhasil diperbarui.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Gagal memperbarui foto.' });
  }
});

// DELETE hapus foto
router.delete('/:id', async (req, res) => {
  try {
    await db.query('DELETE FROM galeri_foto WHERE id = ?', [req.params.id]);
    res.json({ message: 'Foto berhasil dihapus.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Gagal menghapus foto.' });
  }
});

export default router;