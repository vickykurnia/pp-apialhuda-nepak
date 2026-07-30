import React, { useState } from 'react';
import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

function TambahBerita() {
  const [judul, setJudul] = useState('');
  const [ringkasan, setRingkasan] = useState('');
  const [isiLengkap, setIsiLengkap] = useState('');
  const [gambar, setGambar] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!judul || !isiLengkap) {
      alert("Judul dan Isi Berita wajib diisi!");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append('judul', judul);
    formData.append('ringkasan', ringkasan || judul);
    formData.append('isi_lengkap', isiLengkap);
    if (gambar) {
      formData.append('gambar', gambar);
    }

    try {
      const response = await axios.post(`${BACKEND_URL}/api/berita`, formData, {
        headers: { 
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.status === 200 || response.status === 201) {
        alert('Berita berhasil disimpan!');
        setJudul('');
        setRingkasan('');
        setIsiLengkap('');
        setGambar(null);
        e.target.reset();
      }
    } catch (error) {
      console.error("Gagal mengirim data berita:", error);
      alert("Terjadi kesalahan saat menyimpan berita. Pastikan Backend di port 5000 aktif.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '30px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>Dashboard Admin - Tambah Berita</h2>
      <hr />
      
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Judul Berita:</label>
          <input 
            type="text" 
            value={judul}
            onChange={(e) => setJudul(e.target.value)} 
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
            placeholder="Masukkan judul berita..."
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Ringkasan Singkat:</label>
          <input 
            type="text" 
            value={ringkasan}
            onChange={(e) => setRingkasan(e.target.value)} 
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
            placeholder="Ringkasan pendek..."
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Isi Lengkap Berita:</label>
          <textarea 
            value={isiLengkap}
            onChange={(e) => setIsiLengkap(e.target.value)} 
            rows="6"
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
            placeholder="Tulis konten lengkap berita..."
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Upload Gambar Berita:</label>
          <input 
            type="file" 
            accept="image/*" 
            onChange={(e) => setGambar(e.target.files[0])} 
          />
        </div>

        <button 
          type="submit" 
          disabled={loading}
          style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          {loading ? 'Sedang Menyimpan...' : 'Simpan Berita'}
        </button>
      </form>
    </div>
  );
}

export default TambahBerita;