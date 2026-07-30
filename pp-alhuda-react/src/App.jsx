import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Login from './pages/Login';
import Pendaftaran from './pages/Pendaftaran';
import ProfilLengkap from './pages/ProfilLengkap';

// 🔒 Komponen Pembatas Akses (Protected Route)
const ProtectedRoute = ({ children }) => {
  // Cek apakah ada token login di localStorage
  const token = localStorage.getItem('token'); 

  if (!token) {
    // Jika tidak ada token (belum login), kembalikan ke halaman login
    return <Navigate to="/login" replace />;
  }

  // Jika ada token, izinkan mengakses halaman
  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Halaman Utama / Landing Page (Publik) */}
        <Route path="/" element={<Home />} />

        {/* Halaman Login (Publik) */}
        <Route path="/login" element={<Login />} />

        {/* Halaman Pendaftaran Online (Publik) */}
        <Route path="/pendaftaran" element={<Pendaftaran />} />

        {/* Halaman Profil Lengkap Pondok (Publik) */}
        <Route path="/profil-lengkap" element={<ProfilLengkap />} />

        {/* 🔒 Halaman Dashboard Admin (Hanya Bisa Diakses Setelah Login) */}
        <Route 
          path="/dashboard/*" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />

        {/* Jika route tidak ditemukan, arahkan ke Home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;