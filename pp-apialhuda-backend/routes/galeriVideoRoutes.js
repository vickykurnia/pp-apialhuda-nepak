// routes/galeriVideoRoutes.js
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
// CREATE TABLE galeri_video (
//   id INT AUTO_INCREMENT PRIMARY KEY,
//   judul VARCHAR(255) NOT NULL,
//   deskripsi VARCHAR(255),
//   url VARCHAR(255) NOT NULL,
//   poster VARCHAR(255),
//   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
// );

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '..', 'uploads'));
  },
  filename: (req, file, cb) => {
    const prefix = file.fieldname === 'poster' ? 'poster' : 'video';
    const uniqueName = `${prefix}-${Date.now()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

// Video biasanya jauh lebih besar dari gambar -> limit dinaikkan ke 100MB.
// Kalau video kamu lebih besar lagi, naikkan angka ini.
const upload = multer({ storage, limits: { fileSize: 100 * 1024 * 1024 } });

// Terima 2 field file sekaligus: "video" (wajib) dan "poster" (opsional)
const uploadFields = upload.fields([
  { name: 'video', maxCount: 1 },
  { name: 'poster', maxCount: 1 },
]);

// GET semua video (terbaru dulu)
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM galeri_video ORDER BY created_at DESC');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Gagal mengambil data galeri video.' });
  }
});

// POST tambah video baru
router.post('/', uploadFields, async (req, res) => {
  try {
    const { judul, deskripsi } = req.body;
    const videoFile = req.files?.video?.[0];
    const posterFile = req.files?.poster?.[0];

    if (!judul || !videoFile) {
      return res.status(400).json({ message: 'Judul dan file video wajib diisi.' });
    }

    const url = `/uploads/${videoFile.filename}`;
    const poster = posterFile ? `/uploads/${posterFile.filename}` : null;

    const [result] = await db.query(
      'INSERT INTO galeri_video (judul, deskripsi, url, poster) VALUES (?, ?, ?, ?)',
      [judul, deskripsi || null, url, poster]
    );
    res.status(201).json({ id: result.insertId, url, poster, message: 'Video berhasil ditambahkan.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Gagal menyimpan video.' });
  }
});

// PUT edit video
router.put('/:id', uploadFields, async (req, res) => {
  try {
    const { judul, deskripsi } = req.body;
    const videoFile = req.files?.video?.[0];
    const posterFile = req.files?.poster?.[0];

    const fields = ['judul = ?', 'deskripsi = ?'];
    const values = [judul, deskripsi || null];

    if (videoFile) {
      fields.push('url = ?');
      values.push(`/uploads/${videoFile.filename}`);
    }
    if (posterFile) {
      fields.push('poster = ?');
      values.push(`/uploads/${posterFile.filename}`);
    }
    values.push(req.params.id);

    await db.query(`UPDATE galeri_video SET ${fields.join(', ')} WHERE id = ?`, values);
    res.json({ message: 'Video berhasil diperbarui.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Gagal memperbarui video.' });
  }
});

// DELETE hapus video
router.delete('/:id', async (req, res) => {
  try {
    await db.query('DELETE FROM galeri_video WHERE id = ?', [req.params.id]);
    res.json({ message: 'Video berhasil dihapus.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Gagal menghapus video.' });
  }
});

export default router;