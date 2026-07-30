import React from "react";
import { Link } from "react-router-dom";
import "../css/main.css";

// IMPORT GAMBAR: logo gabungan (logo + nama) — sama persis dengan yang dipakai di navbar Beranda
import logoNamaPondok from "../assets/lohonama.png";
import logoPondok from "../assets/logo pondok.png"; // fallback watermark kecil bila diperlukan

const brosurSrc = "/img/brosur-psb.jpg";

const alurPendaftaran = [
  {
    langkah: "01",
    judul: "Isi Formulir Online",
    deskripsi: 'Klik tombol "Isi Formulir Pendaftaran" di bawah, lalu lengkapi data calon santri dan wali santri.',
  },
  {
    langkah: "02",
    judul: "Unggah Berkas Persyaratan",
    deskripsi: "Siapkan scan/foto KK, akta kelahiran, ijazah/rapor terakhir, dan pas foto sesuai instruksi pada formulir.",
  },
  {
    langkah: "03",
    judul: "Konfirmasi via WhatsApp",
    deskripsi: "Setelah formulir terkirim, konfirmasi ke layanan WhatsApp PSB agar data segera diverifikasi panitia.",
  },
  {
    langkah: "04",
    judul: "Tes Seleksi & Pengumuman",
    deskripsi: "Ikuti jadwal tes seleksi (baca Al-Qur'an & wawancara), lalu pantau pengumuman kelulusan melalui WhatsApp.",
  },
];

const persyaratan = [
  "Fotokopi Kartu Keluarga (KK) sebanyak 2 lembar",
  "Fotokopi Akta Kelahiran sebanyak 2 lembar",
  "Fotokopi Ijazah/Rapor terakhir yang sudah dilegalisir",
  "Pas foto berwarna terbaru ukuran 3x4 sebanyak 4 lembar",
  "Surat keterangan sehat dari dokter/puskesmas",
  "Mengisi dan menandatangani surat pernyataan wali santri",
];

function Pendaftaran() {
  return (
    <div className="bg-stone-50 w-full min-h-screen text-gray-800 font-sans">

      {/* ─── HEADER — floating pill, identik dengan navbar Beranda ─── */}
      <header className="fixed top-5 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
        <nav className="pointer-events-auto bg-[#072d1a]/85 backdrop-blur-md border border-white/20 rounded-full px-6 py-2.5 sm:px-8 sm:py-3.5 flex items-center justify-between shadow-2xl max-w-6xl w-full">
          <Link to="/" className="flex items-center shrink-0">
            <img
              src={logoNamaPondok}
              alt="Logo dan Nama Pondok Pesantren API Al-Huda"
              className="h-10 sm:h-12 w-auto object-contain"
            />
          </Link>
          <Link
            to="/"
            className="px-5 py-2 rounded-full text-xs sm:text-sm font-bold tracking-wider border border-white/80 text-white hover:bg-white hover:text-[#072d1a] transition-all duration-300 flex items-center gap-2"
          >
            <i className="fas fa-arrow-left text-xs"></i>
            <span>Beranda</span>
          </Link>
        </nav>
      </header>

      {/* HERO HALAMAN */}
      <section className="pt-32 sm:pt-40 pb-20 bg-[#0d6e40] text-white w-full text-center px-6">
        <div className="flex flex-col items-center max-w-2xl mx-auto space-y-4">
          <span className="text-amber-300 text-xs font-bold tracking-[0.2em] uppercase">
            Penerimaan Santri Baru
          </span>
          <h1 className="text-3xl md:text-5xl font-bold text-white font-serif">
            Pendaftaran Online
          </h1>
          <p className="text-emerald-100/90 text-sm md:text-base leading-relaxed max-w-xl">
            Bergabunglah bersama keluarga besar Pondok Pesantren API Al-Huda Nepak.
            Ikuti empat langkah di bawah untuk memulai proses pendaftaran calon santri baru.
          </p>
        </div>
      </section>

      {/* ALUR PENDAFTARAN — penomoran di sini masuk akal karena memang urutan langkah */}
      <section className="py-20 bg-white w-full">
        <div className="w-full mx-auto px-6 max-w-6xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-emerald-950 mb-2 text-center font-serif">
            Alur Proses Pendaftaran
          </h2>
          <p className="text-center text-gray-500 text-sm mb-14">Empat langkah, dari formulir sampai pengumuman.</p>

          <div className="relative">
            {/* garis penghubung, hanya terlihat di layar besar — menegaskan ini benar sebuah urutan */}
            <div className="hidden lg:block absolute top-5 left-[12.5%] right-[12.5%] h-px bg-stone-200"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
              {alurPendaftaran.map((item) => (
                <div key={item.langkah} className="relative text-left">
                  <span className="block font-serif text-3xl text-emerald-900/20 font-bold mb-2">
                    {item.langkah}
                  </span>
                  <h3 className="text-base font-bold text-emerald-950 mb-1.5">{item.judul}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.deskripsi}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PERSYARATAN — daftar sederhana, tanpa kotak ikon berulang */}
      <section className="py-20 bg-stone-100/60 w-full border-y border-stone-200/60">
        <div className="w-full mx-auto px-6 max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-emerald-950 mb-10 text-center font-serif">
            Persyaratan Berkas Calon Santri
          </h2>
          <ul className="divide-y divide-stone-200 bg-white rounded-2xl border border-stone-200/80">
            {persyaratan.map((syarat, idx) => (
              <li key={idx} className="flex items-baseline gap-4 px-6 py-4 text-sm sm:text-base text-gray-700">
                <i className="fas fa-check text-emerald-700 text-xs mt-1 shrink-0"></i>
                <span>{syarat}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* BROSUR PSB */}
      <section className="py-20 bg-white w-full">
        <div className="w-full mx-auto px-6 max-w-3xl text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-emerald-950 mb-3 font-serif">Brosur Pendaftaran</h2>
          <p className="text-gray-500 text-sm mb-10 max-w-xl mx-auto">
            Lihat atau unduh brosur resmi Penerimaan Santri Baru Pondok Pesantren API Al-Huda Nepak.
          </p>
          <div className="max-w-sm mx-auto">
            <img
              src={brosurSrc}
              alt="Brosur Pendaftaran Santri Baru API Al-Huda Nepak"
              className="w-full rounded-xl border border-stone-200 shadow-sm"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = logoPondok;
              }}
            />
            <a
              href={brosurSrc}
              download
              className="inline-flex items-center justify-center gap-2.5 bg-[#0d6e40] hover:bg-emerald-800 text-white font-bold py-3 px-8 rounded-full transition-colors shadow-sm text-sm mt-6"
            >
              <i className="fas fa-download text-xs"></i> Unduh Brosur
            </a>
          </div>
        </div>
      </section>

      {/* AKSI PENDAFTARAN */}
      <section className="py-20 bg-stone-100/60 w-full border-t border-stone-200/60">
        <div className="w-full mx-auto px-6 max-w-3xl text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-emerald-950 mb-3 font-serif">Mulai Pendaftaran</h2>
          <p className="text-gray-500 text-sm mb-10 max-w-xl mx-auto">
            Klik tombol di bawah untuk membuka formulir pendaftaran resmi, atau hubungi panitia PSB
            langsung melalui WhatsApp jika ada pertanyaan.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
            <a
              href="https://forms.gle/ganti-dengan-link-formulir-psb"
              target="_blank"
              rel="noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2.5 bg-amber-500 hover:bg-amber-400 text-emerald-950 font-bold py-3.5 px-8 rounded-full transition-colors shadow-sm text-sm"
            >
              <i className="fas fa-file-signature text-xs"></i> Isi Formulir Online
            </a>
            <a
              href="https://wa.me/6281234567890?text=Assalamu%27alaikum%2C%20saya%20ingin%20bertanya%20tentang%20PSB"
              target="_blank"
              rel="noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2.5 bg-[#0d6e40] hover:bg-emerald-800 text-white font-bold py-3.5 px-8 rounded-full transition-colors shadow-sm text-sm"
            >
              <i className="fab fa-whatsapp"></i> Tanya Panitia PSB
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-emerald-950 text-emerald-300/80 py-6 w-full text-center text-xs border-t border-emerald-900">
        <p>&copy; 2026 Pondok Pesantren API Al-Huda. Nepak, Mertoyudan, Magelang.</p>
      </footer>
    </div>
  );
}

export default Pendaftaran;