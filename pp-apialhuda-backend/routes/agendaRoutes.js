// routes/agendaRoutes.js
import express from 'express';
import db from '../config/db.js';

const router = express.Router();

// Jalankan sekali di phpMyAdmin/HeidiSQL kalau tabel belum ada:
//
// CREATE TABLE agenda_kegiatan (
//   id INT AUTO_INCREMENT PRIMARY KEY,
//   tanggal DATE NOT NULL,
//   waktu VARCHAR(100),
//   judul VARCHAR(255) NOT NULL,
//   lokasi VARCHAR(255),
//   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
// );

// GET semua agenda (urut tanggal terdekat)
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM agenda_kegiatan ORDER BY tanggal ASC');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Gagal mengambil data agenda.' });
  }
});

// POST tambah agenda baru
router.post('/', async (req, res) => {
  try {
    const { tanggal, waktu, judul, lokasi } = req.body;
    if (!tanggal || !judul) {
      return res.status(400).json({ message: 'Tanggal dan judul wajib diisi.' });
    }
    const [result] = await db.query(
      'INSERT INTO agenda_kegiatan (tanggal, waktu, judul, lokasi) VALUES (?, ?, ?, ?)',
      [tanggal, waktu, judul, lokasi]
    );
    res.status(201).json({ id: result.insertId, message: 'Agenda berhasil ditambahkan.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Gagal menyimpan agenda.' });
  }
});

// PUT edit agenda
router.put('/:id', async (req, res) => {
  try {
    const { tanggal, waktu, judul, lokasi } = req.body;
    await db.query(
      'UPDATE agenda_kegiatan SET tanggal = ?, waktu = ?, judul = ?, lokasi = ? WHERE id = ?',
      [tanggal, waktu, judul, lokasi, req.params.id]
    );
    res.json({ message: 'Agenda berhasil diperbarui.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Gagal memperbarui agenda.' });
  }
});

// DELETE hapus agenda
router.delete('/:id', async (req, res) => {
  try {
    await db.query('DELETE FROM agenda_kegiatan WHERE id = ?', [req.params.id]);
    res.json({ message: 'Agenda berhasil dihapus.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Gagal menghapus agenda.' });
  }
});

export default router;