import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Login from './pages/Login';
import Pendaftaran from './pages/Pendaftaran';
import ProfilLengkap from './pages/ProfilLengkap';

function App() {
  return (
    <Router>
      <Routes>
        {/* Halaman Utama / Landing Page */}
        <Route path="/" element={<Home />} />

        {/* Halaman Login */}
        <Route path="/login" element={<Login />} />

        {/* Halaman Dashboard Admin */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Halaman Pendaftaran Online (PSB) */}
        <Route path="/pendaftaran" element={<Pendaftaran />} />

        {/* Halaman Profil Lengkap Pondok */}
        <Route path="/profil-lengkap" element={<ProfilLengkap />} />

        {/* Jika route tidak ditemukan, arahkan ke Home */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;