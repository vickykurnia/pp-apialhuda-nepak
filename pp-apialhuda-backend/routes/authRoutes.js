import express from 'express';
import jwt from 'jsonwebtoken';
import db from '../config/db.js';

const router = express.Router();

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const [rows] = await db.query('SELECT * FROM admin WHERE username = ?', [username]);
        if (rows.length === 0) return res.status(401).json({ status: 'error', message: 'Admin tidak terdaftar' });

        const admin = rows[0];
        if (password === admin.password) {
            // PERBAIKAN: buat JWT token agar frontend bisa menyimpannya
            // dan lolos dari ProtectedRoute di React.
            const token = jwt.sign(
                { id: admin.id, username: admin.username },
                process.env.JWT_SECRET_KEY,
                { expiresIn: '1d' }
            );

            return res.status(200).json({
                status: 'success',
                token,
                user: { username: admin.username, nama: admin.nama_lengkap }
            });
        } else {
            return res.status(401).json({ status: 'error', message: 'Password salah' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;