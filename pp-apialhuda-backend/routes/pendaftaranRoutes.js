// routes/pendaftaranRoutes.js
import express from 'express';
import db from '../config/db.js';

const router = express.Router();

// 1. GET semua pendaftar (terbaru dulu) -> dipakai Dashboard admin
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM pendaftaran_santri ORDER BY tanggal_daftar DESC');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Gagal mengambil data pendaftar.' });
  }
});

// 2. POST pendaftar baru -> dipakai form pendaftaran publik (PendaftaranPage.jsx)
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

// 3. PUT ubah status pendaftar -> dipakai dropdown status di Dashboard admin
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

// 4. DELETE hapus data pendaftar
router.delete('/:id', async (req, res) => {
  try {
    await db.query('DELETE FROM pendaftaran_santri WHERE id = ?', [req.params.id]);
    res.json({ message: 'Data pendaftar berhasil dihapus.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Gagal menghapus data pendaftar.' });
  }
});

// 5. DOWNLOAD LAPORAN EXCEL (Penanganan agar tombol Excel di Dashboard tidak Error)
router.get('/download/excel', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM pendaftaran_santri ORDER BY tanggal_daftar DESC');
    let csvContent = 'ID,Nama Calon Santri,Asal Sekolah,Nama Wali,No HP Wali,Status,Tanggal Daftar\n';
    rows.forEach(r => {
      csvContent += `"${r.id}","${r.nama_calon_santri || ''}","${r.asal_sekolah || ''}","${r.nama_wali || ''}","${r.no_hp_wali || ''}","${r.status || ''}","${r.tanggal_daftar || ''}"\n`;
    });
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=laporan-pendaftar.csv');
    res.status(200).send(csvContent);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Gagal mengunduh laporan Excel/CSV.' });
  }
});

// 6. DOWNLOAD LAPORAN PDF (Penanganan agar tombol PDF di Dashboard tidak Error)
router.get('/download/pdf', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM pendaftaran_santri ORDER BY tanggal_daftar DESC');
    let htmlContent = `
      <h2>Laporan Pendaftaran Santri Baru PP API Al-Huda</h2>
      <table border="1" cellspacing="0" cellpadding="5">
        <tr><th>Nama Santri</th><th>Asal Sekolah</th><th>Wali</th><th>Kontak</th><th>Status</th></tr>
        ${rows.map(r => `<tr><td>${r.nama_calon_santri}</td><td>${r.asal_sekolah}</td><td>${r.nama_wali}</td><td>${r.no_hp_wali}</td><td>${r.status}</td></tr>`).join('')}
      </table>
    `;
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(htmlContent);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Gagal mengunduh laporan PDF.' });
  }
});

export default router;