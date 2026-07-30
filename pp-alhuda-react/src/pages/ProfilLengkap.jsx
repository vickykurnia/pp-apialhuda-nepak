import React, { useState } from "react";
import { Link } from "react-router-dom";

// IMPORT GAMBAR: logo gabungan (logo + nama) — sama persis dengan navbar Beranda
import logoNamaPondok from "../assets/lohonama.png";
import fotoPengasuh from "../assets/pakkyai.jpg"; // foto pengasuh

export default function ProfilLengkap() {
  const [activeTab, setActiveTab] = useState("harian");

  // Data Kegiatan Harian
  const kegiatanHarian = [
    { jam: "04.30 - 05.00", kegiatan: "Bangun Pagi, Sholat dll" },
    { jam: "05.00 - 06.00", kegiatan: "Giat pagi (Olah raga, mandi dll)" },
    { jam: "06.00 - 08.00", kegiatan: "Mengaji (Sesuai kelas)" },
    { jam: "08.00 - 12.00", kegiatan: "Kegiatan Sekolah" },
    { jam: "12.00 - 12.30", kegiatan: "Istirahat" },
    { jam: "12.30 - 13.00", kegiatan: "Sholat Dzuhur Berjamaah" },
    { jam: "13.00 - 14.00", kegiatan: "Mengaji" },
    { jam: "14.00 - 15.30", kegiatan: "Istirahat (Mengaji untuk kelas Bukhori - Ihya')" },
    { jam: "15.30 - 16.00", kegiatan: "Sholat Ashar Berjamaah" },
    { jam: "16.00 - 17.00", kegiatan: "Mengaji" },
    { jam: "17.00 - 18.00", kegiatan: "Istirahat" },
    { jam: "18.00 - 19.00", kegiatan: "Sholat Maghrib, Mujahadah, Sholat Isya' Berjamaah" },
    { jam: "19.00 - 20.45", kegiatan: "Mengaji" },
    { jam: "20.45 - 21.00", kegiatan: "Istirahat" },
    { jam: "21.00 - 22.00", kegiatan: "Belajar Malam" },
    { jam: "22.00 - 00.00", kegiatan: "Istirahat" },
    { jam: "00.00 - 01.00", kegiatan: "Mujahadah Malam (Wajib untuk kelas Alfiyah keatas)" },
    { jam: "01.00 - 04.30", kegiatan: "Istirahat tidur" },
  ];

  // Data Kegiatan Mingguan
  const kegiatanMingguan = [
    { hari: "Setiap Hari Kamis", kegiatan: "Khitobah" },
    { hari: "Malam Jum'at", kegiatan: "Sholawat Bersama, Kumpulan pondok / kamar, Peket Komplek" },
    { hari: "Hari Jum'at", kegiatan: "Maqoman, Tahlilan" },
  ];

  // Data Kegiatan Bulanan
  const kegiatanBulanan = [
    { hari: "Senin Pahing", kegiatan: "Mujahadah Selapanan dan Pengajian" },
    { hari: "Akhir Bulan", kegiatan: "Sangsiran Kitab, Tamrinan" },
    { hari: "Jum'at sebelum senin Pahing", kegiatan: "Roan akbar" },
  ];

  // Data Kegiatan Tahunan
  const kegiatanTahunan = [
    { bulan: "Dzulhijjah", kegiatan: "Perayaan Hari Raya Idul Adha" },
    { bulan: "Muharram", kegiatan: "Perayaan Tahun baru islam" },
    { bulan: "Robiul awal", kegiatan: "Perayaan Maulid Nabi" },
    { bulan: "Oktober", kegiatan: "Perayaan Hari Santri Nasional, Muwadaah, Imtihan" },
    { bulan: "Rajab", kegiatan: "Kegiatan Puasa Zaman" },
    { bulan: "Februari", kegiatan: "Perayaan Isro' Mi'raj, Pengkoreksian khataman, Evaluasi khataman, Musabaqah, Imtihan, Khataman" },
    { bulan: "Ramadhan", kegiatan: "Muwadaah, Pembagian Rapot, Ngaji Pasan" },
  ];

  // Data Ekstrakurikuler
  const ekstrakurikuler = [
    "Tahfidzul Al-Qur'an",
    "Pengajian Kitab Kuning",
    "Seni Hadrah/Marawis",
    "Paduan Suara",
    "Seni Musik",
    "Khitobah",
    "Kursus Kaligrafi",
    "Kursus Komputer",
    "Pramuka",
    "English Club",
    "Mading",
    "Wirausaha: Komputer, Teknik Komputer, Perikanan, Pertanian",
  ];

  // Data Profil Lengkap Pengasuh
  const profilPengasuh = {
    nama: "KH. Usman Ali",
    gelar: "Pengasuh Utama",
    foto: fotoPengasuh,
    biografi: [
      "Lahir di lingkungan pesantren yang kental dengan tradisi keilmuan salaf, KH. Usman Ali mengabdikan hidupnya untuk dakwah dan pendidikan Islam sejak usia muda.",
      "Beliau dikenal sebagai sosok yang teduh, berkedalaman ilmu, dan sangat memperhatikan akhlak santri. Visi beliau mendirikan API Al-Huda adalah mencetak generasi yang tak hanya pandai dalam ilmu kitab, tetapi juga memiliki integritas moral yang kuat.",
      "Melalui bimbingan langsung dari beliau, pesantren terus berkembang dan beradaptasi tanpa meninggalkan nilai-nilai luhur kepesantrenan tradisional.",
    ],
    detail: [
      { key: "Tempat, Tanggal Lahir", value: "Magelang, 15 Januari 1970" },
      { key: "Pendidikan", value: "Ponpes API Tegalrejo, Al-Azhar (Cairo)" },
      { key: "Spesialisasi", value: "Fikih & Akhlak Tasawuf" },
      { key: "Karya Tulis", value: "Risalah Akhlakul Karimah (2018)" },
    ],
  };

  const tabs = [
    { id: "harian", label: "Harian" },
    { id: "mingguan", label: "Mingguan" },
    { id: "bulanan", label: "Bulanan" },
    { id: "tahunan", label: "Tahunan" },
  ];

  const dataAktif =
    activeTab === "harian" ? kegiatanHarian :
    activeTab === "mingguan" ? kegiatanMingguan :
    activeTab === "bulanan" ? kegiatanBulanan :
    kegiatanTahunan;

  const kolomWaktu = activeTab === "tahunan" ? "Bulan" : activeTab === "harian" ? "Jam" : "Hari / Waktu";

  return (
    <div className="bg-stone-50 min-h-screen text-gray-800 font-sans pb-20">

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

      {/* ─── HERO PROFIL ─── */}
      <section className="bg-[#0d6e40] pt-32 sm:pt-40 pb-20 px-6 flex flex-col items-center text-center">
        <div className="max-w-3xl w-full mx-auto flex flex-col items-center text-center space-y-4">
          <span className="text-amber-300 text-xs font-bold tracking-[0.2em] uppercase">
            Profil Lengkap Pondok
          </span>
          <h1 className="font-bold leading-tight text-white text-3xl sm:text-4xl md:text-5xl font-serif">
            Mengenal Lebih Dekat API Al-Huda Magelang
          </h1>
          <p className="text-emerald-100/90 text-sm sm:text-base max-w-2xl leading-relaxed">
            Perjalanan spiritual, visi pendidikan, dan rutinitas santri dalam mencetak generasi
            Rabbani yang unggul dan berakhlak mulia.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-8 -mt-10 space-y-14">

        {/* ─── SEJARAH & PENGASUH ─── */}
        <section className="bg-white rounded-2xl p-8 sm:p-12 shadow-sm border border-stone-200/80">
          <div className="grid grid-cols-1 md:grid-cols-[1.4fr,1fr] gap-10 items-start">

            {/* Bagian Sejarah */}
            <div className="space-y-5">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-emerald-950 font-serif">
                  Tentang &amp; Sejarah Pendirian
                </h2>
                <p className="text-sm text-gray-500 pt-1">Latar belakang berdirinya Ponpes API Al-Huda Nepak</p>
              </div>

              <div className="space-y-4 text-sm sm:text-base text-gray-700 leading-relaxed text-justify border-l-2 border-amber-400/60 pl-5">
                <p>
                  <strong>Pesantren API Al-Huda Magelang</strong> dibangun pada pertengahan tahun 2012,
                  tepatnya awal bulan Dzulhijjah 1439 H, di atas tanah seluas kurang lebih 600 m² di sisi
                  selatan Kampung Nepak, menciptakan lingkungan yang tenang dan kondusif untuk belajar.
                </p>
                <p>
                  Berbekal niat dan optimisme tinggi dari beliau, dalam waktu satu tahun pondok pesantren
                  ini sudah dapat dihuni meski dengan infrastruktur seadanya. Seiring berjalannya waktu,
                  pembangunan terus dilakukan secara intensif hingga saat ini demi mewujudkan lingkungan
                  pesantren yang nyaman bagi para santri.
                </p>
                <p>
                  Kondisi lingkungan kota dan pergaulan generasi muda yang semakin jauh dari akhlak,
                  khususnya pada generasi terpelajar yang diharapkan menjadi penerus bangsa, menjadi
                  latar belakang lahirnya niat dan tekad untuk mendirikan pesantren ini.
                </p>
              </div>
            </div>

            {/* Bagian Foto Pengasuh */}
            <div className="flex flex-col items-center text-center gap-4">
              <div className="w-full aspect-[4/5] max-w-[260px] rounded-2xl overflow-hidden border border-stone-200 shadow-sm">
                <img
                  src={profilPengasuh.foto}
                  alt={`Foto ${profilPengasuh.nama}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="text-[11px] font-bold text-amber-700 uppercase tracking-widest block">
                  {profilPengasuh.gelar}
                </span>
                <h3 className="text-xl font-bold text-emerald-950 font-serif">
                  {profilPengasuh.nama}
                </h3>
              </div>
              <a href="#profil-pengasuh" className="text-sm text-[#0d6e40] font-semibold hover:text-amber-600 transition-colors">
                Baca profil lengkap ↓
              </a>
            </div>
          </div>
        </section>

        {/* ─── PROFIL LENGKAP PENGASUH ─── */}
        <section id="profil-pengasuh" className="bg-white rounded-2xl p-8 sm:p-12 shadow-sm border border-stone-200/80">
          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-emerald-950 font-serif">
              Profil Lengkap Pengasuh
            </h2>
            <p className="text-sm text-gray-500 pt-1">Dedikasi dan latar belakang KH. Usman Ali</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[1.3fr,1fr] gap-10 items-start">

            {/* Biografi */}
            <div className="space-y-4 text-sm sm:text-base text-gray-700 leading-relaxed text-justify">
              {profilPengasuh.biografi.map((paragraf, index) => (
                <p key={index}>{paragraf}</p>
              ))}
            </div>

            {/* Info Profil — daftar definisi sederhana, tanpa kotak ikon berulang */}
            <dl className="divide-y divide-stone-200 border-t border-b border-stone-200">
              {profilPengasuh.detail.map((item, index) => (
                <div key={index} className="py-3.5">
                  <dt className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">{item.key}</dt>
                  <dd className="text-sm sm:text-base font-semibold text-gray-800 mt-1">{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ─── JENJANG PENDIDIKAN ─── */}
        <section>
          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-emerald-950 font-serif">Jenjang Pendidikan</h2>
            <p className="text-sm text-gray-500 pt-1">Integrasi pendidikan formal &amp; kurikulum diniyah salafiyah</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-8 border border-stone-200/80 shadow-sm">
              <h3 className="text-lg font-bold text-emerald-950 font-serif mb-1">Pendidikan Formal</h3>
              <p className="text-sm text-gray-500 mb-5">Di bawah Yayasan &amp; Kemendikbud/Kemenag</p>
              <ul className="divide-y divide-stone-200 text-sm sm:text-base text-gray-800 font-medium">
                <li className="py-3">SMP API Al-Huda</li>
                <li className="py-3">MA (KMI) Al-Huda</li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-stone-200/80 shadow-sm">
              <h3 className="text-lg font-bold text-emerald-950 font-serif mb-1">Pendidikan Non-Formal</h3>
              <p className="text-sm text-gray-500 mb-5">Pendalaman kitab salaf &amp; Al-Qur'an</p>
              <ul className="grid grid-cols-2 gap-y-3 text-sm sm:text-base text-gray-800 font-medium">
                {["Tahfidzul Qur'an", "TPQ", "Madrasah Diniyah", "Majelis Taklim"].map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ─── KEGIATAN SANTRI ─── */}
        <section className="bg-white rounded-2xl p-8 sm:p-12 shadow-sm border border-stone-200/80">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-emerald-950 font-serif">Jadwal &amp; Agenda Kegiatan</h2>
              <p className="text-sm text-gray-500 pt-1">Rutinitas harian, mingguan, bulanan, dan tahunan</p>
            </div>

            <div className="flex gap-1 shrink-0 border-b border-stone-200 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 text-xs sm:text-sm font-bold whitespace-nowrap border-b-2 -mb-px transition-colors ${
                    activeTab === tab.id
                      ? "border-[#0d6e40] text-[#0d6e40]"
                      : "border-transparent text-gray-400 hover:text-gray-600"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-stone-200 text-[11px] uppercase tracking-widest text-gray-400">
                <th className="py-3 pr-4 w-44 sm:w-56 font-bold">{kolomWaktu}</th>
                <th className="py-3 font-bold">Kegiatan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {dataAktif.map((item, index) => (
                <tr key={index}>
                  <td className="py-3.5 pr-4 font-bold text-emerald-900 whitespace-nowrap align-top">
                    {activeTab === "tahunan" ? item.bulan : activeTab === "harian" ? item.jam : item.hari}
                  </td>
                  <td className="py-3.5 text-gray-700 leading-relaxed">{item.kegiatan}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* ─── EKSTRAKURIKULER ─── */}
        <section className="bg-white rounded-2xl p-8 sm:p-12 shadow-sm border border-stone-200/80">
          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-emerald-950 font-serif">
              Ekstrakurikuler &amp; Pengembangan
            </h2>
            <p className="text-sm text-gray-500 pt-1">
              {ekstrakurikuler.length} bidang kegiatan santri Ponpes API Al-Huda Nepak
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {ekstrakurikuler.map((item, idx) => (
              <span
                key={idx}
                className="text-sm font-medium text-emerald-900 bg-emerald-50 border border-emerald-100 rounded-full px-4 py-2"
              >
                {item}
              </span>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}