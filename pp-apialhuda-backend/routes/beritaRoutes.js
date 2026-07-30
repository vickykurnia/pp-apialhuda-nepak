import express from 'express';
import multer from 'multer';
import path from 'path';
import db from '../config/db.js';

const router = express.Router();

// ==========================================
// KONFIGURASI MULTER (PENYIMPANAN GAMBAR)
// ==========================================
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Pastikan folder 'uploads' sudah Anda buat manual di root backend
    },
    filename: (req, file, cb) => {
        // Menggunakan timestamp agar nama file unik
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// GET: Semua Berita
router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM berita_kegiatan ORDER BY created_at DESC');
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET: Profil Lembaga
router.get('/info/profil', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM profil_lembaga');
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET: Kurikulum Pendidikan
router.get('/info/kurikulum', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM kurikulum_pendidikan');
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST: Pendaftaran Santri Baru Online
router.post('/psb/daftar', async (req, res) => {
    const { nama_lengkap, pilihan_jenjang, nomor_hp_orang_tua } = req.body;
    try {
        const nomor_pendaftaran = `PSB-2026-${Math.floor(1000 + Math.random() * 9000)}`;
        const querySql = `
            INSERT INTO pendaftaran_psb 
            (nomor_pendaftaran, nama_lengkap, jenis_kelamin, tempat_lahir, tanggal_lahir, alamat_lengkap, nama_ayah, nama_ibu, nomor_hp_orang_tua, asal_sekolah, pilihan_jenjang) 
            VALUES (?, ?, 'Laki-laki', 'Magelang', '2013-01-01', 'Magelang', 'Ayah', 'Ibu', ?, 'SD', ?)
        `;
        await db.query(querySql, [nomor_pendaftaran, nama_lengkap, nomor_hp_orang_tua, pilihan_jenjang]);
        res.status(201).json({ status: 'success', nomor_pendaftaran });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// ==========================================
// ENDPOINT KHUSUS ADMIN PANEL (CRUD)
// ==========================================

// 1. POST: Menambahkan Berita Baru Beserta Gambar (Menggunakan upload.single)
router.post('/', upload.single('gambar'), async (req, res) => {
    // Dengan multer, teks biasa masuk ke req.body
    const { judul, ringkasan, isi_lengkap } = req.body;
    
    try {
        if (!judul || !ringkasan || !isi_lengkap) {
            return res.status(400).json({ status: 'error', message: 'Form wajib tidak boleh kosong!' });
        }

        // Jalur gambar publik yang akan disimpan di database
        const gambarPath = req.file ? `/uploads/${req.file.filename}` : null;
        
        // Membuat slug otomatis dari judul
        const slug_judul = judul.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
        
        // PENTING: Pastikan nama kolom 'gambar' di database Anda sesuai (misal: 'gambar' atau 'foto_berita')
        const querySql = `
            INSERT INTO berita_kegiatan (judul, slug_judul, id_kategori, ringkasan, isi_lengkap, gambar, status) 
            VALUES (?, ?, NULL, ?, ?, ?, 'published')
        `;
        
        // Mengirimkan parameter array ke database
        await db.query(querySql, [judul, slug_judul, ringkasan, isi_lengkap, gambarPath]);
        
        res.status(201).json({ success: true, status: 'success', message: 'Berita berhasil diterbitkan!' });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

// 2. DELETE: Menghapus Berita Berdasarkan ID
router.delete('/:id', async (req, res) => {
    try {
        await db.query('DELETE FROM berita_kegiatan WHERE id = ?', [req.params.id]);
        res.status(200).json({ status: 'success', message: 'Berita berhasil dihapus!' });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

export default router;