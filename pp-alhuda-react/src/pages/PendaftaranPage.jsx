import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logoPondok from "../assets/logo pondok.png";

// Sesuaikan URL backend
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
const PENDAFTARAN_URL = `${BACKEND_URL}/api/pendaftaran`;

export default function PendaftaranPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nama_calon_santri: '',
    asal_sekolah: '',
    nama_wali: '',
    no_hp_wali: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const response = await fetch(PENDAFTARAN_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccess(true);
        setFormData({
          nama_calon_santri: '',
          asal_sekolah: '',
          nama_wali: '',
          no_hp_wali: '',
        });
      } else {
        const errData = await response.json();
        setErrorMsg(errData.message || 'Gagal mengirim pendaftaran.');
      }
    } catch (err) {
      setErrorMsg('Terjadi kesalahan koneksi ke server backend.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-6 sm:p-8 border border-stone-200 relative overflow-hidden">
        
        {/* Header Form */}
        <div className="text-center mb-6">
          <img src={logoPondok} alt="Logo Pondok" className="h-16 mx-auto mb-2 object-contain" />
          <h2 className="text-2xl font-serif font-bold text-[#0d6e40]">Formulir Pendaftaran Santri Baru</h2>
          <p className="text-xs text-gray-500 mt-1">PP API Al-Huda Nepak Mertoyudan Magelang</p>
        </div>

        {success && (
          <div className="mb-5 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm rounded-xl">
            🎉 <strong>Alhamdulillah!</strong> Pendaftaran berhasil dikirim. Panitia PSB akan segera menghubungi Anda melalui nomor WhatsApp yang terdaftar.
          </div>
        )}

        {errorMsg && (
          <div className="mb-5 p-4 bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm rounded-xl">
            ⚠️ {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
              Nama Lengkap Calon Santri *
            </label>
            <input
              type="text"
              name="nama_calon_santri"
              required
              value={formData.nama_calon_santri}
              onChange={handleChange}
              placeholder="Contoh: Muhammad Ahmad"
              className="w-full p-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-[#0d6e40]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
              Asal Sekolah *
            </label>
            <input
              type="text"
              name="asal_sekolah"
              required
              value={formData.asal_sekolah}
              onChange={handleChange}
              placeholder="Contoh: SD N 1 Mertoyudan / SMP N 2 Magelang"
              className="w-full p-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-[#0d6e40]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
              Nama Orang Tua / Wali *
            </label>
            <input
              type="text"
              name="nama_wali"
              required
              value={formData.nama_wali}
              onChange={handleChange}
              placeholder="Contoh: Bp. Abdullah"
              className="w-full p-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-[#0d6e40]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
              No. WhatsApp / HP Aktif *
            </label>
            <input
              type="tel"
              name="no_hp_wali"
              required
              value={formData.no_hp_wali}
              onChange={handleChange}
              placeholder="Contoh: 081234567890"
              className="w-full p-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-[#0d6e40]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#0d6e40] hover:bg-emerald-900 text-white font-bold py-3.5 rounded-xl transition-all text-sm uppercase tracking-wider shadow-md cursor-pointer mt-2"
          >
            {loading ? 'Mengirim Data...' : 'Kirim Pendaftaran'}
          </button>
        </form>

        <div className="mt-6 text-center border-t border-gray-100 pt-4">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="text-xs text-gray-500 hover:text-[#0d6e40] font-semibold"
          >
            ← Kembali ke Halaman Utama
          </button>
        </div>
      </div>
    </div>
  );
}