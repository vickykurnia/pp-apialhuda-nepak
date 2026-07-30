import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import db from './config/db.js';
import beritaRoutes from './routes/beritaRoutes.js';
import authRoutes from './routes/authRoutes.js';
// 4 route baru: agenda, galeri foto, galeri video, pendaftaran PSB
import agendaRoutes from './routes/agendaRoutes.js';
import galeriFotoRoutes from './routes/galeriFotoRoutes.js';
import galeriVideoRoutes from './routes/galeriVideoRoutes.js';
import pendaftaranRoutes from './routes/pendaftaranRoutes.js';

dotenv.config();
const app = express();

// Konfigurasi agar path folder bisa dibaca di ES Modules (__dirname)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Pastikan folder uploads selalu ada sebelum server menerima request
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Konfigurasi CORS agar mengizinkan request dari frontend React (port 5173 / localhost)
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// PENTING: Bikin folder 'uploads' di backend bisa diakses publik lewat URL
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/berita', beritaRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/agenda', agendaRoutes);
app.use('/api/galeri-foto', galeriFotoRoutes);
app.use('/api/galeri-video', galeriVideoRoutes);
app.use('/api/pendaftaran', pendaftaranRoutes);

const PORT = process.env.PORT || 5000;

// Fungsi untuk cek koneksi database sebelum server nyala
async function startServer() {
    try {
        await db.query('SELECT 1');
        console.log('✅ Koneksi ke database Laragon (MySQL 8) BERHASIL!');

        app.listen(PORT, () => {
            console.log(`🚀 Server Node.js berjalan di http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('❌ GAGAL terhubung ke database Laragon:');
        console.error(error.message);
        process.exit(1);
    }
}

startServer();