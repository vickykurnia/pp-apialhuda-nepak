// routes/pendaftaranRoutes.js
import express from 'express';
import db from '../config/db.js';

const router = express.Router();

// Jalankan sekali di phpMyAdmin/HeidiSQL kalau tabel belum ada:
//
// CREATE TABLE pendaftaran_santri (
//   id INT AUTO_INCREMENT PRIMARY KEY,
//   nama_calon_santri VARCHAR(255) NOT NULL,
//   asal_sekolah VARCHAR(255),
//   nama_wali VARCHAR(255),
//   no_hp_wali VARCHAR(50),
//   status ENUM('Menunggu', 'Diterima', 'Ditolak') DEFAULT 'Menunggu',
//   tanggal_daftar TIMESTAMP DEFAULT CURRENT_TIMESTAMP
// );
//
// Catatan: route POST di bawah ini untuk NANTI dipakai kalau form
// Pendaftaran.jsx di web utama sudah diubah supaya submit ke sini
// (kamu sempat bilang "nanti saja" untuk bagian itu — endpoint ini
// sudah disiapkan duluan supaya tinggal dipakai kapan pun siap).

// GET semua pendaftar (terbaru dulu) -> dipakai Dashboard admin
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM pendaftaran_santri ORDER BY tanggal_daftar DESC');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Gagal mengambil data pendaftar.' });
  }
});

// POST pendaftar baru -> nanti dipakai form publik di Pendaftaran.jsx
router.post('/', async (req, res) => {
  try {
    const { nama_calon_santri, asal_sekolah, nama_wali, no_hp_wali } = req.body;
    if (!nama_calon_santri || !nama_wali || !no_hp_wali) {
      return res.status(400).json({ message: 'Nama calon santri, nama wali, dan nomor HP wali wajib diisi.' });
    }
    const [result] = await db.query(
      'INSERT INTO pendaftaran_santri (nama_calon_santri, asal_sekolah, nama_wali, no_hp_wali) VALUES (?, ?, ?, ?)',
      [nama_calon_santri, asal_sekolah, nama_wali, no_hp_wali]
    );
    res.status(201).json({ id: result.insertId, message: 'Pendaftaran berhasil dikirim.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Gagal menyimpan data pendaftaran.' });
  }
});

// PUT ubah status pendaftar -> dipakai dropdown status di Dashboard admin
router.put('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    if (!['Menunggu', 'Diterima', 'Ditolak'].includes(status)) {
      return res.status(400).json({ message: 'Status tidak valid.' });
    }
    await db.query('UPDATE pendaftaran_santri SET status = ? WHERE id = ?', [status, req.params.id]);
    res.json({ message: 'Status pendaftar berhasil diperbarui.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Gagal memperbarui status.' });
  }
});

// DELETE hapus data pendaftar
router.delete('/:id', async (req, res) => {
  try {
    await db.query('DELETE FROM pendaftaran_santri WHERE id = ?', [req.params.id]);
    res.json({ message: 'Data pendaftar berhasil dihapus.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Gagal menghapus data pendaftar.' });
  }
});

export default router;