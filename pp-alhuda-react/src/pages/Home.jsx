import { ProductCard } from "../components/ui/cards-1";
import { AnimatedMarqueeHero } from "../components/ui/hero-3";
import { SekolahModal } from "../components/ui/sekolahmodal";
import { GaleriVideoGrid } from "../components/ui/GaleriVideo";
import GaleriFotoHover from "../components/ui/GaleriFotoHover";
import { FocusRail } from "../components/ui/focus-rail";
import { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import "../css/main.css";

// ─── IMPORT LOGO & GAMBAR DARI FOLDER ASSETS ───
import logoPondok from "../assets/logo pondok.png";
import logoSmp from "../assets/logosmp.png";
import logoMa from "../assets/logoma1.png";
import arabNamaPondok from "../assets/arab_nama.png";
import logoNamaPondok from "../assets/lohonama.png";
import backgroundPondok from "../assets/backgroundpondok.png";

// ─── IMPORT GAMBAR PROGRAM UNGGULAN & HERO DARI ASSETS ───
import imgTahfidz from "../assets/Tahfidz AL-Qur'an.jpg";
import imgKitabKuning from "../assets/Kitab_Kuning.jpg";
import imgKhitabah from "../assets/khitabah.jpg";
import imgLeadership from "../assets/Leadership.jpg";
import heroImg from "../assets/hero.png";

gsap.registerPlugin(ScrollTrigger);

// Konsistensi URL Backend Server Node.js
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
const BASE_URL = `${BACKEND_URL}/api`;

const SOCIAL_LINKS = {
  facebook: "https://www.facebook.com/",
  instagram: "https://www.instagram.com/apialhudanepak/",
  youtube: "https://www.youtube.com/",
};

function Home() {
  // ─── PROFIL PONDOK ───
  const [sejarah, setSejarah] = useState(
    "Pesantren API Al-Huda Magelang dibangun pada pertengahan tahun 2012, tepatnya awal bulan Dzulhijjah 1439 H, di atas tanah seluas kurang lebih 600 m² di sisi selatan Kampung Nepak. Berbekal niat dan optimisme tinggi dari KH. Usman Ali selaku pengasuh pondok, dalam waktu satu tahun pondok pesantren ini sudah dapat dihuni meski dengan infrastruktur seadanya. Seiring berjalannya waktu, pembangunan terus dilakukan secara intensif hingga saat ini demi mewujudkan lingkungan pesantren yang nyaman bagi para santri. Kondisi lingkungan kota dan pergaulan generasi muda yang semakin jauh dari akhlak, khususnya pada generasi terpelajar yang diharapkan menjadi penerus bangsa, menjadi latar belakang lahirnya niat, tekad, dan optimisme tinggi untuk mendirikan pesantren ini."
  );
  const [pengasuh] = useState("KH. Usman Ali");
  const [alamat, setAlamat] = useState("Dusun Nepak, Kelurahan Bulurejo, Kecamatan Mertoyudan, Kabupaten Magelang, Jawa Tengah 56172");
  const [telepon] = useState("0856-4348-4123");
  const [kurikulum, setKurikulum] = useState([]);
  const [berita, setBerita] = useState([]);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedSekolah, setSelectedSekolah] = useState(null);
  const [activeTab, setActiveTab] = useState("#home");

  // ─── STATE MODAL BERITA & AGENDA ───
  const [selectedBerita, setSelectedBerita] = useState(null);
  const [showAllBeritaModal, setShowAllBeritaModal] = useState(false);
  const [showAgendaModal, setShowAgendaModal] = useState(false);

  // ─── STATE GALERI FOTO & VIDEO (PURE BACKEND DATA) ───
  const [galeriFoto, setGaleriFoto] = useState([]);
  const [galeriVideo, setGaleriVideo] = useState([]);

  // ─── UNIT SEKOLAH FORMAL ───
  const unitSekolah = [
    {
      id: "smp",
      nama: "SMP API Al-Huda",
      jenjang: "Pendidikan Formal — SMP",
      logo: logoSmp,
      deskripsi: "SMP API Al-Huda Nepak Mertoyudan merupakan sekolah jenjang menengah pertama yang berbasis pondok pesantren, di bawah naungan Yayasan Pondok Pesantren API Al-Huda, beralamat di Dusun Nepak, Bulurejo, Mertoyudan, Magelang.",
      visi: "Mewujudkan generasi yang unggul dalam Imtaq, Iptek, serta berakhlakul karimah.",
      misi: [
        "Menyelenggarakan pendidikan formal berbasis keislaman dan pesantren.",
        "Membina kedisiplinan dan karakter berakhlak mulia.",
        "Mengembangkan potensi sains, teknologi, dan minat bakat siswa.",
      ],
      kepalaSekolah: "Ustadz H. Ahmad Ridwan, S.Pd.I",
      fotoKepsek: logoSmp,
      akreditasi: "Terakreditasi B",
    },
    {
      id: "ma",
      nama: "MA (KMI) Al-Huda",
      jenjang: "Pendidikan Formal — Madrasah Aliyah",
      logo: logoMa,
      deskripsi: "Madrasah Aliyah Al-Huda memadukan kurikulum Kementerian Agama dengan pendalaman kitab kuning dan penugasan kepemimpinan santri, mempersiapkan lulusan yang siap melanjutkan pendidikan maupun terjun ke masyarakat.",
      visi: "Mencetak kader ulama dan pemimpin masa depan yang bertafaqquh fiddin.",
      misi: [
        "Mendalami kajian kitab-kitab salafiyyah dan bahasa Arab/Inggris.",
        "Meningkatkan jiwa kepemimpinan dan kemandirian santri.",
        "Menyiapkan lulusan unggul untuk perguruan tinggi ternama.",
      ],
      kepalaSekolah: "Ustadz M. Syukron, M.Ag",
      fotoKepsek: logoMa,
      akreditasi: "Terakreditasi B",
    },
  ];

  // Data Agenda Kegiatan
  const [agenda, setAgenda] = useState([
    {
      tanggal: "23 September 2026",
      waktu: "08:30 am s/d Selesai",
      judul: "Peringatan Maulid Nabi Muhammad SAW 1448 H",
      lokasi: "Masjid Ponpes API Al-Huda"
    },
    {
      tanggal: "29 Agustus 2026",
      waktu: "08:00 am - Selesai",
      judul: "Wisuda Karantina Tahfidz Al-Qur'an Angkatan V",
      lokasi: "Aula Utama Pesantren"
    },
    {
      tanggal: "12 Juli 2026",
      waktu: "07:00 am s/d Selesai",
      judul: "Pertemuan Wali Santri Baru & Serah Terima Santri",
      lokasi: "Kompleks Gedung Hijau"
    },
    {
      tanggal: "14 - 16 Juli 2026",
      waktu: "07:00 am - 16:00 pm",
      judul: "MATAMUDA MA Al-Huda & MPLS Ramah SMP API Al-Huda",
      lokasi: "Halaman & Kelas Kompleks Sekolah"
    }
  ]);

  // ─── PROGRAM UNGGULAN ───
  const programUnggulan = [
    { title: "Tahfidz Al-Qur'an", src: imgTahfidz },
    { title: "Kitab Kuning", src: imgKitabKuning },
    { title: "Khitabah", src: imgKhitabah },
    { title: "Leadership", src: imgLeadership }
  ];

  // ─── HERO IMAGES ───
  const heroImages = [
    heroImg,
    imgTahfidz,
    imgKitabKuning,
    imgKhitabah,
  ];

  const navLinks = [
    { href: "#home", label: "Beranda" },
    { href: "#profil", label: "Profil" },
    { href: "#program-unggulan", label: "Unggulan" },
    { href: "#pendidikan", label: "Pendidikan" },
    { href: "#galeri-agenda", label: "Galeri" },
    { href: "#berita", label: "Berita" },
  ];

  const alamatMapsQuery = encodeURIComponent(
    "Pondok Pesantren API Al-Huda, Nepak, Bulurejo, Mertoyudan, Magelang"
  );

  // ─── HELPER PARSING URL FILE UPLOAD BACKEND ───
  const getMediaUrl = (fileField) => {
    if (!fileField || typeof fileField !== 'string') return '';
    if (fileField.startsWith('http://') || fileField.startsWith('https://')) {
      return fileField;
    }
    const cleanPath = fileField.replace(/\\/g, '/').replace(/^\/+/, '');
    if (cleanPath.startsWith('uploads/')) {
      return `${BACKEND_URL}/${cleanPath}`;
    }
    return `${BACKEND_URL}/uploads/${cleanPath}`;
  };

  useEffect(() => {
    async function loadPondokData() {
      // 1. Fetch Berita
      try {
        const resBerita = await fetch(`${BASE_URL}/berita`);
        if (resBerita.ok) {
          const data = await resBerita.json();
          if (Array.isArray(data)) setBerita(data);
        }
      } catch (error) {
        console.warn('Gagal memuat berita dari REST API.', error);
      }

      // 2. Fetch Agenda
      try {
        const resAgenda = await fetch(`${BASE_URL}/agenda`);
        if (resAgenda.ok) {
          const dataAgenda = await resAgenda.json();
          if (Array.isArray(dataAgenda) && dataAgenda.length > 0) setAgenda(dataAgenda);
        }
      } catch (error) {}

      // 3. Fetch Galeri Foto
      try {
        const resFoto = await fetch(`${BASE_URL}/galeri-foto`);
        if (resFoto.ok) {
          const dataFoto = await resFoto.json();
          if (Array.isArray(dataFoto)) {
            const formattedFoto = dataFoto.map(item => {
              const rawFile = item.foto || item.foto_nama || item.gambar || item.url || '';
              return {
                id: item.id,
                title: item.judul || 'Foto Kegiatan',
                desc: item.deskripsi || item.judul || '',
                url: getMediaUrl(rawFile)
              };
            });
            setGaleriFoto(formattedFoto);
          }
        }
      } catch (e) {
        console.error("Error loading foto:", e);
      }

      // 4. Fetch Galeri Video
      try {
        const resVideo = await fetch(`${BASE_URL}/galeri-video`);
        if (resVideo.ok) {
          const dataVideo = await resVideo.json();
          if (Array.isArray(dataVideo)) {
            const formattedVideo = dataVideo.map(item => {
              const rawFile = item.video || item.video_nama || item.url || '';
              return {
                id: item.id,
                title: item.judul || 'Video Kegiatan',
                desc: item.deskripsi || 'Dokumentasi Video Pondok',
                url: getMediaUrl(rawFile)
              };
            });
            setGaleriVideo(formattedVideo);
          }
        }
      } catch (e) {
        console.error("Error loading video:", e);
      }
    }

    loadPondokData();
  }, []);

  useEffect(() => {
    if (berita.length > 0) {
      gsap.fromTo('.card-item',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          scrollTrigger: {
            trigger: '#berita',
            start: 'top 90%',
          },
        }
      );
    }
  }, [berita]);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.pageYOffset > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const beritaSatuBaris = berita.slice(0, 4);

  // ─── FORMAT DATA GALERI FOTO UNTUK KOMPONEN FocusRail ───
  const focusRailItems = galeriFoto.map((item, idx) => ({
    id: item.id ?? idx,
    title: item.title,
    description: item.desc,
    imageSrc: item.url,
  }));

  return (
    <div className="bg-stone-50 w-full min-h-screen text-gray-800 relative font-sans">

      {/* ─── FLOATING PILL NAVBAR ─── */}
      <header className="fixed top-5 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
        <nav className="pointer-events-auto bg-[#072d1a]/85 backdrop-blur-md border border-white/20 rounded-full px-6 py-2.5 sm:px-8 sm:py-3.5 flex items-center justify-between shadow-2xl max-w-6xl w-full">

          {/* BRAND HEADER */}
          <a href="#home" className="flex items-center shrink-0">
            <img
              src={logoNamaPondok}
              alt="Logo dan Nama Pondok Pesantren API Al-Huda"
              className="h-10 sm:h-12 w-auto object-contain"
            />
          </a>

          {/* DESKTOP NAV LINKS */}
          <div className="hidden lg:flex items-center gap-6 md:gap-8">
            {navLinks.map((link) => {
              const isActive = activeTab === link.href;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setActiveTab(link.href)}
                  className={`text-sm md:text-base font-semibold transition-all duration-200 tracking-wide ${
                    isActive
                      ? "text-white font-bold"
                      : "text-white/80 hover:text-white"
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </div>

          {/* CTA BUTTON */}
          <div className="hidden lg:flex items-center">
            <a
              href="/pendaftaran"
              className="px-6 py-2 rounded-full text-xs sm:text-sm font-bold tracking-wider border border-white/80 text-white hover:bg-white hover:text-[#072d1a] transition-all duration-300 uppercase shadow-sm"
            >
              DAFTAR SEKARANG
            </a>
          </div>

          {/* MOBILE TOGGLE BUTTON */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden ml-3 w-9 h-9 flex items-center justify-center rounded-full text-white hover:bg-white/10 transition-colors"
          >
            {mobileMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </nav>

        {/* MOBILE MENU DROPDOWN */}
        {mobileMenuOpen && (
          <div className="pointer-events-auto absolute top-16 bg-[#072d1a]/95 backdrop-blur-lg border border-white/20 rounded-2xl p-4 shadow-2xl flex flex-col gap-2 w-64 text-white">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => {
                  setActiveTab(link.href);
                  setMobileMenuOpen(false);
                }}
                className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                  activeTab === link.href
                    ? "bg-emerald-800 text-white font-bold"
                    : "text-white/80 hover:bg-white/10"
                }`}
              >
                {link.label}
              </a>
            ))}
            <a
              href="/pendaftaran"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 px-4 py-2.5 rounded-full text-sm font-bold bg-amber-500 text-[#072d1a] text-center uppercase tracking-wider"
            >
              DAFTAR SEKARANG
            </a>
          </div>
        )}
      </header>

      {/* ─── HERO SECTION (PERBAIKAN FONT LEBIH TIPIS, JARAK SELARAS, DAN BADGE TIDAK NEMPEL NAVBAR) ─── */}
      <AnimatedMarqueeHero
        title={
          <div className="flex flex-col items-center">
            {/* BADGE WELCOME (DIBERI MARGIN TOP SUPAYA TIDAK NEMPEL DENGAN FLOATING NAVBAR) */}
            <div className="inline-flex items-center justify-center px-6 py-2 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm mt-10 sm:mt-16 mb-6 shadow-sm">
              <span className="text-[10px] sm:text-xs font-semibold tracking-[0.25em] text-white/90 uppercase leading-none">
                SELAMAT DATANG DI PORTAL RESMI
              </span>
            </div>

            {/* KALIGRAFI ARAB */}
            <img
              src={arabNamaPondok}
              alt="Kaligrafi Nama Pondok Pesantren API Al-Huda"
              className="h-24 sm:h-36 md:h-48 lg:h-56 w-auto object-contain mb-4 drop-shadow-[0_6px_16px_rgba(0,0,0,0.95)]"
            />

            {/* BARIS 1: PONDOK PESANTREN (FONT SERIF SEHINGGA LEBIH TIPIS & ANGGUN) */}
            <span className="text-white text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold tracking-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)] leading-tight">
              Pondok Pesantren
            </span>
            {/* BARIS 2: API AL-HUDA NEPAK (FONT SERIF TIPIS KELAS WAKIL PONDOK) */}
            <span className="text-[#f59e0b] text-4xl sm:text-6xl md:text-7xl lg:text-[88px] font-serif font-extrabold tracking-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)] mt-1 sm:mt-2 leading-none">
              API Al-Huda Nepak
            </span>
          </div>
        }
        description={
          /* TEKS NEPAK DLL DIPERDEKAT JARAKNYA (mt-3 sm:mt-4) & SIZENYA DIBESARKAN SEDIKIT (text-sm sm:text-base md:text-lg) */
          <div className="max-w-xl mx-auto text-center mt-3 sm:mt-4">
            <p className="text-stone-200 text-sm sm:text-base md:text-lg leading-relaxed font-normal">
              Nepak, Bulurejo, Mertoyudan, Magelang.
              <br />
              Membentuk generasi pemimpin masa depan dengan budi pekerti,
              <br className="hidden sm:inline" />
              akhlakul karimah, serta adaptif terhadap perkembangan teknologi.
            </p>
          </div>
        }
      />

      {/* PROFIL PONDOK */}
      <section id="profil" className="py-20 bg-white w-full scroll-mt-20">
        <div className="w-full mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2 w-full">
              <div className="relative rounded-2xl overflow-hidden shadow-lg border border-gray-100">
                <img src={backgroundPondok} alt="Profil Singkat" className="w-full h-[380px] md:h-[440px] lg:h-[480px] object-cover" />
              </div>
            </div>
            <div className="lg:w-1/2 space-y-5">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#0d6e40]">Profil Singkat</h2>
              <div className="w-14 h-1.5 bg-amber-500 rounded-full"></div>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed text-justify">{sejarah}</p>
              <div className="pt-2">
                <a href="/profil-lengkap" className="inline-block bg-[#0d6e40] hover:bg-emerald-900 text-white text-sm font-bold py-3 px-7 rounded-xl transition-all shadow-md">
                  Lihat Selengkapnya
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROGRAM UNGGULAN */}
      <section id="program-unggulan" className="py-16 bg-[#f4f5f6] w-full scroll-mt-20">
        <div className="w-full max-w-7xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#0d6e40] tracking-tight">
              Program Unggulan
            </h2>
            <div className="w-12 h-1 bg-[#0d6e40] mx-auto rounded-full mt-2"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {programUnggulan.map((prog, index) => (
              <div 
                key={index} 
                className="relative group rounded-2xl overflow-hidden shadow-md aspect-[3/4] bg-stone-200 border border-black/5"
              >
                <img 
                  src={prog.src} 
                  alt={prog.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d6e40]/90 via-[#0d6e40]/30 to-transparent flex items-end p-5 transition-all duration-300">
                  <h3 className="text-white font-serif font-bold text-lg tracking-wide drop-shadow-sm">
                    {prog.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* UNIT PENDIDIKAN */}
      <section id="pendidikan" className="py-20 bg-white w-full scroll-mt-20">
        <div className="w-full mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-3 text-[#0d6e40]">Unit Pendidikan</h2>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
              Pondok Pesantren API Al-Huda membawahi dua jenjang pendidikan formal, SMP dan Madrasah Aliyah,
              yang berjalan beriringan dengan kurikulum kepesantrenan diniyah.
            </p>
            <div className="w-16 h-1 bg-amber-400 mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
            {unitSekolah.map((sekolah) => (
              <div 
                key={sekolah.id} 
                className="bg-white border border-gray-200/90 p-8 sm:p-10 rounded-3xl shadow-lg hover:shadow-xl transition-all border-t-8 border-t-[#0d6e40] flex flex-col items-center text-center justify-between space-y-6"
              >
                <div className="flex flex-col items-center space-y-6 w-full">
                  <div className="w-36 h-36 sm:w-44 sm:h-44 flex items-center justify-center">
                    <img 
                      src={sekolah.logo} 
                      alt={`Logo ${sekolah.nama}`} 
                      className="w-full h-full object-contain drop-shadow-md transition-transform duration-300 hover:scale-105" 
                    />
                  </div>
                  <div className="space-y-3 w-full">
                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#0d6e40]">{sekolah.nama}</h3>
                    <p className="text-stone-600 text-xs sm:text-sm md:text-base leading-relaxed px-2">{sekolah.deskripsi}</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedSekolah(sekolah)}
                  className="inline-block bg-[#0d6e40] hover:bg-emerald-900 text-white text-xs sm:text-sm font-bold py-3.5 px-8 rounded-2xl transition-all shadow-md transform hover:-translate-y-0.5 cursor-pointer mt-4"
                >
                  Lihat Selengkapnya
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AGENDA & GALERI KEGIATAN FOTO */}
      <section id="galeri-agenda" className="pt-20 pb-20 bg-stone-50 w-full border-t border-gray-200/40 scroll-mt-20">
        <div className="w-full mx-auto px-2 sm:px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">

            {/* AGENDA PONDOK */}
            <div className="lg:col-span-1 bg-white border border-gray-200 shadow-md rounded-2xl overflow-hidden flex flex-col h-[640px]">
              <div className="bg-[#0d6e40] p-4 text-white">
                <h3 className="text-xl font-serif font-bold">Agenda PP API Al-Huda</h3>
                <p className="text-xs text-emerald-100 mt-0.5">Dapatkan informasi terkait semua kegiatan pondok</p>
              </div>
              <div className="p-4 flex-grow overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-gray-300">
                {agenda.map((item, index) => (
                  <div key={index} className="bg-stone-50 border border-gray-100 p-3.5 rounded-xl space-y-1.5 shadow-sm">
                    <div className="flex flex-wrap gap-x-3 gap-y-0.5 text-amber-700 text-xs font-semibold">
                      <span><i className="far fa-calendar-alt mr-1"></i> {item.tanggal}</span>
                      <span><i className="far fa-clock mr-1"></i> {item.waktu}</span>
                    </div>
                    <h4 className="text-[#0d6e40] font-bold text-sm leading-snug">{item.judul}</h4>
                    <div className="text-gray-400 text-xs flex items-center gap-1">
                      <i className="fas fa-map-marker-alt text-red-400"></i> {item.lokasi}
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-3 bg-stone-50 border-t border-gray-100 text-center">
                <button 
                  type="button"
                  onClick={() => setShowAgendaModal(true)} 
                  className="text-[#0d6e40] hover:text-amber-600 font-bold text-sm transition-colors cursor-pointer"
                >
                  Lihat Semua Agenda
                </button>
              </div>
            </div>

            {/* GALERI FOTO (JUDUL DIPINDAH KE TENGAH UNTUK KESELARASAN) */}
            <div className="lg:col-span-2 flex flex-col h-[640px] px-2 sm:px-0">
              <div className="mb-4 text-center">
                <h3 className="text-2xl font-serif font-bold text-[#0d6e40]">Galeri Foto Kegiatan</h3>
                <p className="text-xs text-gray-500 mt-1">Dokumentasi momen dan aktivitas para santri di Pondok Pesantren API Al-Huda</p>
                <div className="w-12 h-1 bg-amber-400 mx-auto rounded-full mt-2"></div>
              </div>

              {galeriFoto.length > 0 ? (
                <div className="h-full rounded-2xl overflow-hidden shadow-md border border-gray-200">
                  <FocusRail items={focusRailItems} autoPlay={false} loop={true} compact />
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center p-8 text-center space-y-2 bg-white rounded-2xl border border-gray-200/80 shadow-sm">
                  <h3 className="text-lg font-serif font-bold text-[#0d6e40]">Galeri Kegiatan</h3>
                  <p className="text-xs text-gray-400">Belum ada foto kegiatan yang diunggah dari Dashboard Admin.</p>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* BERITA TERKINI */}
      <section id="berita" className="py-20 bg-white w-full border-t border-gray-100 scroll-mt-20">
        <div className="w-full mx-auto px-6 max-w-7xl">
          <div className="text-center mb-12 flex flex-col items-center">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#0d6e40] tracking-tight">
              Berita Terkini
            </h2>
            <div className="w-12 h-1 bg-[#0d6e40] rounded-full my-3"></div>
            <p className="text-gray-500 text-xs sm:text-sm font-medium">
              Berita terbaru tentang Pondok Pesantren API Al-Huda
            </p>
          </div>

          {berita.length === 0 ? (
            <p className="text-center text-xs text-gray-400 py-10">Belum ada berita yang diterbitkan.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {beritaSatuBaris.map((item, idx) => {
                const tanggal = item.created_at
                  ? new Date(item.created_at).toLocaleDateString('id-ID', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                    })
                  : '16 Jul 2026';

                const rawGambar = item.gambar || item.gambar_nama || item.foto || '';
                const gambar = getMediaUrl(rawGambar) || imgTahfidz;

                return (
                  <div 
                    key={idx} 
                    className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-200/80 flex flex-col justify-between group card-item"
                  >
                    <div>
                      <div className="h-64 sm:h-72 overflow-hidden bg-gray-100 relative">
                        <img 
                          src={gambar} 
                          alt={item.judul} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                        />
                      </div>

                      <div className="p-5 pb-0 flex items-center justify-between text-xs font-medium text-gray-500">
                        <span className="flex items-center gap-1">
                          <i className="far fa-calendar-alt text-[#0d6e40]"></i> {tanggal}
                        </span>
                        <span className="bg-[#0d6e40] text-white text-xs font-semibold px-3 py-1 rounded-full">
                          Berita Acara
                        </span>
                      </div>

                      <div className="p-5 pt-3">
                        <h3 className="text-sm sm:text-base font-bold text-gray-900 line-clamp-3 leading-snug group-hover:text-[#0d6e40] transition-colors">
                          {item.judul}
                        </h3>
                      </div>
                    </div>

                    <div className="p-5 pt-0">
                      <button
                        type="button"
                        onClick={() => setSelectedBerita({ ...item, gambar, tanggal })}
                        className="text-[#0d6e40] font-extrabold text-sm hover:text-amber-600 flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        Baca Selengkapnya <span className="text-base">→</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {berita.length > 0 && (
            <div className="mt-10 text-center">
              <button 
                type="button"
                onClick={() => setShowAllBeritaModal(true)}
                className="inline-block bg-amber-500 hover:bg-amber-400 text-[#0d6e40] font-bold text-xs px-8 py-3 rounded-md shadow-sm transition-all transform hover:-translate-y-0.5 cursor-pointer"
              >
                Lihat Semua Berita ({berita.length})
              </button>
            </div>
          )}

        </div>
      </section>

      {/* OVERLAY MODAL DETAIL READ MORE BERITA */}
      {selectedBerita && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-md z-[110] flex items-center justify-center p-4 sm:p-6 transition-all duration-300"
          onClick={() => setSelectedBerita(null)}
        >
          <div 
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative shadow-2xl border border-stone-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-5 overflow-hidden">
              <img src={logoPondok} alt="Watermark Logo Pondok" className="w-80 h-80 object-contain" />
            </div>

            <button 
              onClick={() => setSelectedBerita(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-stone-100 hover:bg-[#0d6e40] hover:text-white text-stone-600 transition-colors flex items-center justify-center font-bold text-sm shadow-sm cursor-pointer z-10"
              aria-label="Tutup"
            >
              ✕
            </button>

            <div className="relative z-10 space-y-3">
              <span className="inline-block bg-amber-500 text-[#0d6e40] font-bold text-[10px] px-2.5 py-1 rounded-md uppercase tracking-wider">
                Berita Pondok
              </span>
              <h2 className="text-lg sm:text-xl font-serif font-bold text-[#0d6e40] leading-snug">
                {selectedBerita.judul}
              </h2>
              <p className="text-[11px] text-gray-400 font-medium border-b border-stone-100 pb-3 flex items-center gap-1.5">
                <i className="far fa-calendar"></i> Dipublikasikan pada: {selectedBerita.tanggal}
              </p>
            </div>

            <div className="relative z-10 my-4 rounded-xl overflow-hidden shadow-sm bg-stone-50 border border-stone-100">
              <img 
                src={selectedBerita.gambar} 
                alt={selectedBerita.judul} 
                className="w-full h-auto max-h-[450px] object-contain mx-auto block"
              />
            </div>

            <div className="relative z-10 text-xs sm:text-sm text-gray-700 leading-relaxed space-y-3 text-justify">
              <p className="font-semibold text-[#0d6e40] bg-emerald-50/60 p-3 rounded-lg border-l-4 border-[#0d6e40]">
                {selectedBerita.ringkasan}
              </p>
              <div className="whitespace-pre-line text-gray-600 pt-2">
                {selectedBerita.isi_lengkap || selectedBerita.konten_lengkap || selectedBerita.isi_konten || selectedBerita.ringkasan}
              </div>
            </div>

            <div className="relative z-10 mt-6 pt-4 border-t border-stone-100 flex justify-end">
              <button
                onClick={() => setSelectedBerita(null)}
                className="bg-[#0d6e40] hover:bg-emerald-900 text-white font-bold text-xs py-2 px-5 rounded-xl shadow-md cursor-pointer"
              >
                Tutup Berita
              </button>
            </div>
          </div>
        </div>
      )}

      {/* OVERLAY MODAL FULL POP-UP LIHAT SEMUA BERITA */}
      {showAllBeritaModal && (
        <div 
          className="fixed inset-0 bg-black/70 backdrop-blur-md z-[100] flex items-center justify-center p-3 sm:p-6 transition-all duration-300"
          onClick={() => setShowAllBeritaModal(false)}
        >
          <div 
            className="bg-white rounded-2xl max-w-7xl w-[95%] max-h-[90vh] overflow-y-auto p-6 sm:p-10 relative shadow-2xl border border-stone-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setShowAllBeritaModal(false)}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-stone-100 hover:bg-[#0d6e40] hover:text-white text-stone-600 transition-colors flex items-center justify-center font-bold text-base shadow-sm cursor-pointer z-10"
            >
              ✕
            </button>

            <div className="border-b border-stone-100 pb-5 mb-8">
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#0d6e40]">
                Arsip Seluruh Berita ({berita.length})
              </h3>
              <p className="text-sm sm:text-base text-gray-500 mt-1">
                Kumpulan kabar dan informasi kegiatan terbaru Pondok Pesantren API Al-Huda
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {berita.map((item, idx) => {
                const tanggal = item.created_at
                  ? new Date(item.created_at).toLocaleDateString('id-ID', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                    })
                  : '16 Jul 2026';

                const rawGambar = item.gambar || item.gambar_nama || item.foto || '';
                const gambar = getMediaUrl(rawGambar) || imgTahfidz;

                return (
                  <div 
                    key={idx} 
                    className="bg-stone-50 rounded-xl border border-gray-200 p-3.5 flex flex-col justify-between hover:shadow-md transition-all group"
                  >
                    <div>
                      <div className="h-40 rounded-lg overflow-hidden bg-gray-200 mb-3">
                        <img src={gambar} alt={item.judul} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      </div>
                      <span className="text-xs text-[#0d6e40] font-bold block mb-1">
                        📅 {tanggal}
                      </span>
                      <h4 className="font-bold text-sm sm:text-base text-gray-900 group-hover:text-[#0d6e40] transition-colors line-clamp-2 leading-snug">
                        {item.judul}
                      </h4>
                      <p className="text-xs text-gray-500 line-clamp-2 mt-1">
                        {item.ringkasan}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setSelectedBerita({ ...item, gambar, tanggal });
                      }}
                      className="mt-4 text-left text-[#0d6e40] font-extrabold text-sm hover:text-amber-600 transition-colors cursor-pointer"
                    >
                      Baca Selengkapnya →
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="mt-10 pt-5 border-t border-stone-100 flex justify-end">
              <button
                onClick={() => setShowAllBeritaModal(false)}
                className="bg-[#0d6e40] hover:bg-emerald-900 text-white font-bold text-xs sm:text-sm py-2.5 px-6 rounded-xl shadow-md cursor-pointer transition-all"
              >
                Tutup Arsip Berita
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL POP-UP AGENDA */}
      {showAgendaModal && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100] flex items-center justify-center p-4 sm:p-6 transition-all duration-300"
          onClick={() => setShowAgendaModal(false)}
        >
          <div 
            className="bg-white rounded-2xl max-w-xl w-full max-h-[85vh] overflow-hidden relative shadow-2xl border border-stone-200 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setShowAgendaModal(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-stone-100 hover:bg-[#0d6e40] hover:text-white text-stone-600 transition-colors flex items-center justify-center font-bold text-sm shadow-sm cursor-pointer z-10"
            >
              ✕
            </button>

            <div className="border-b border-stone-100 p-6 pb-4 shrink-0">
              <h3 className="text-xl font-serif font-bold text-[#0d6e40]">
                Semua Agenda Kegiatan
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                Jadwal lengkap kegiatan di Pondok Pesantren API Al-Huda Nepak
              </p>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
              {agenda.map((item, idx) => (
                <div key={idx} className="bg-stone-50 border border-stone-200/70 p-4 rounded-xl space-y-2 shadow-sm">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-amber-700 text-xs font-semibold">
                    <span className="bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded-md">
                      <i className="far fa-calendar-alt mr-1"></i> {item.tanggal}
                    </span>
                    <span className="text-gray-500 text-[11px]">
                      <i className="far fa-clock mr-1"></i> {item.waktu}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-[#0d6e40] leading-snug">
                    {item.judul}
                  </h4>
                  <div className="text-gray-500 text-xs flex items-center gap-1.5">
                    <i className="fas fa-map-marker-alt text-red-500"></i> {item.lokasi}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-6 pt-4 border-t border-stone-100 text-right shrink-0">
              <button
                onClick={() => setShowAgendaModal(false)}
                className="bg-[#0d6e40] hover:bg-emerald-900 text-white font-bold text-xs py-2 px-5 rounded-xl shadow-md cursor-pointer"
              >
                Tutup Agenda
              </button>
            </div>
          </div>
        </div>
      )}

      {/* GALERI VIDEO */}
      <section id="galeri-video" className="py-8 bg-stone-100 w-full border-t border-gray-200/60">
        <div className="w-full mx-auto px-2 sm:px-4 max-w-6xl">
          <div className="flex flex-col items-center justify-center text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#0d6e40] mb-2">Galeri Video</h2>
            <p className="text-gray-500 text-xs max-w-xl mx-auto mt-2 text-center">
              Dokumentasi kegiatan pondok dalam bentuk video singkat.
            </p>
            <div className="w-12 h-1 bg-amber-400 mx-auto rounded-full mt-3"></div>
          </div>

          {galeriVideo.length > 0 ? (
            <GaleriVideoGrid items={galeriVideo} />
          ) : (
            <div className="py-12 text-center bg-white rounded-2xl border border-gray-200/80 shadow-sm max-w-xl mx-auto">
              <p className="text-xs text-gray-400 font-medium">Belum ada video kegiatan yang diunggah dari Dashboard Admin.</p>
            </div>
          )}
        </div>
      </section>

      {/* BANNER CTA / PENDAFTARAN */}
      <section className="py-16 bg-stone-50 w-full overflow-hidden">
        <div className="w-full pl-4 sm:pl-8 lg:pl-16 pr-0">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            
            <div className="lg:w-[480px] w-full shrink-0 relative py-4 px-2">
              <div className="w-6 h-6 rounded-full bg-amber-400 absolute top-0 left-6 z-0 shadow-sm"></div>
              <div className="w-64 sm:w-72 h-36 sm:h-40 rounded-xl overflow-hidden shadow-md border-2 border-white ml-auto relative z-10 bg-gray-200">
                {galeriFoto[0]?.url ? <img src={galeriFoto[0].url} alt="Galeri" className="w-full h-full object-cover" /> : <img src={imgTahfidz} alt="Tahfidz" className="w-full h-full object-cover" />}
              </div>
              <div className="w-64 sm:w-72 h-36 sm:h-40 rounded-xl overflow-hidden shadow-lg border-2 border-white -mt-10 relative z-20 bg-gray-300">
                {galeriFoto[1]?.url ? <img src={galeriFoto[1].url} alt="Galeri" className="w-full h-full object-cover" /> : <img src={imgKitabKuning} alt="Kitab Kuning" className="w-full h-full object-cover" />}
                <div className="absolute -right-4 -bottom-4 w-12 h-12 rounded-full bg-[#0d6e40] border-4 border-white flex items-center justify-center shadow-md z-30">
                  <div className="w-4 h-4 rounded-full bg-white/30"></div>
                </div>
              </div>
              <div className="w-64 sm:w-72 h-36 sm:h-40 rounded-xl overflow-hidden shadow-xl border-2 border-white ml-auto -mt-10 relative z-10 bg-gray-200">
                {galeriFoto[2]?.url ? <img src={galeriFoto[2].url} alt="Galeri" className="w-full h-full object-cover" /> : <img src={imgKhitabah} alt="Khitabah" className="w-full h-full object-cover" />}
              </div>
              <div className="w-7 h-7 rounded-full bg-amber-400 absolute bottom-12 left-4 z-0 shadow-sm"></div>
              <div className="w-10 h-10 rounded-full bg-[#0d6e40] border-2 border-emerald-200/50 absolute bottom-2 left-8 z-0"></div>
            </div>

            <div className="flex-grow w-full bg-[#0d6e40] rounded-t-3xl lg:rounded-t-none lg:rounded-l-[100px] p-8 sm:p-12 text-white shadow-2xl flex flex-col justify-center items-end text-right">
              <div className="space-y-3 w-full max-w-none pr-2 sm:pr-4 lg:pr-6">
                <span className="text-amber-300 text-xs sm:text-sm font-bold tracking-wider uppercase block">
                  BERGABUNG BERSAMA KAMI
                </span>
                
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-serif font-bold leading-snug text-white">
                  Penerimaan Santri Baru PP API Al-Huda nepak sudah dibuka!<br className="hidden sm:inline" />
                  Ayo daftarkan putra-putri Anda sekarang juga.
                </h2>
                
                <p className="text-emerald-100 text-xs sm:text-sm font-medium pt-1">
                  Mari bergabung menjadi bagian dari Santri API Al-Huda yang Berakhlakul Karimah & Adaptif Teknologi!
                </p>
                
                <div className="pt-6">
                  <a
                    href="/pendaftaran"
                    className="inline-block bg-white hover:bg-emerald-50 text-[#0d6e40] font-extrabold text-xs sm:text-sm px-8 py-3.5 rounded-full shadow-lg transition-all transform hover:scale-105 tracking-wider uppercase"
                  >
                    DAFTAR SANTRI BARU
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* KONTAK */}
      <section id="kontak" className="pt-10 pb-28 bg-[#0d6e40] text-white w-full border-t border-emerald-950">
        <div className="w-full mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">

            <div className="space-y-4">
              <img
                src={logoNamaPondok}
                alt="Logo dan Nama Pondok Pesantren API Al-Huda"
                className="h-20 sm:h-24 w-auto object-contain"
              />

              <p className="text-emerald-100/90 text-base leading-relaxed text-left font-light">
                Mendidik generasi Rabbani yang berakhlakul karimah, berkedalaman ilmu salaf, dan siap memimpin masa depan dengan kearifan serta kemajuan zaman.
              </p>

              <div className="flex items-center space-x-3 pt-2">
                <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-emerald-800/80 hover:bg-amber-500 hover:text-emerald-950 text-white flex items-center justify-center transition-all shadow-sm border border-emerald-700/60">
                  <i className="fab fa-facebook-f text-base"></i>
                </a>
                <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-emerald-800/80 hover:bg-amber-500 hover:text-emerald-950 text-white flex items-center justify-center transition-all shadow-sm border border-emerald-700/60">
                  <i className="fab fa-instagram text-base"></i>
                </a>
                <a href={SOCIAL_LINKS.youtube} target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-emerald-800/80 hover:bg-amber-500 hover:text-emerald-950 text-white flex items-center justify-center transition-all shadow-sm border border-emerald-700/60">
                  <i className="fab fa-youtube text-base"></i>
                </a>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg sm:text-xl font-serif font-bold border-b border-emerald-800 pb-1.5 uppercase tracking-wider text-amber-400">
                Hubungi Kami
              </h3>
              <ul className="space-y-3 text-base text-emerald-100/90">
                <li className="flex items-start gap-3 text-left">
                  <i className="fas fa-map-marker-alt text-amber-400 mt-1 shrink-0 text-lg"></i>
                  <span className="leading-relaxed">{alamat}</span>
                </li>
                <li className="flex items-center gap-3 text-left">
                  <i className="fas fa-phone-alt text-amber-400 shrink-0 text-lg"></i>
                  <span>{telepon}</span>
                </li>
                <li className="flex items-center gap-3 text-left">
                  <i className="fas fa-envelope text-amber-400 shrink-0 text-lg"></i>
                  <span>humas@apialhudanepak.ponpes.id</span>
                </li>
              </ul>
              <div className="pt-2">
                <a href="https://wa.me/6285643484123" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-[#0d6e40] font-bold text-base py-2.5 px-5 rounded-xl shadow-md transition-all transform hover:scale-105">
                  <i className="fab fa-whatsapp text-lg"></i> Layanan WhatsApp
                </a>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg sm:text-xl font-serif font-bold border-b border-emerald-800 pb-1.5 uppercase tracking-wider text-amber-400">
                Lokasi Lembaga
              </h3>
              <div className="w-full h-56 sm:h-64 rounded-xl shadow-inner overflow-hidden border border-emerald-800 bg-emerald-950">
                <iframe src={`https://www.google.com/maps?q=${alamatMapsQuery}&output=embed`} className="w-full h-full" style={{ border: 0 }} allowFullScreen loading="lazy" title="Lokasi Pondok Pesantren API Al-Huda"></iframe>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-emerald-950 text-emerald-300/80 py-6 w-full text-center text-xs sm:text-sm border-t border-emerald-950/40">
        <div className="w-full mx-auto px-6 flex justify-center items-center">
          <p>&copy; 2026 Pondok Pesantren API Al-Huda. All rights reserved.</p>
        </div>
      </footer>

      {/* BACK TO TOP */}
      <button onClick={scrollToTop} className={`fixed bottom-6 right-6 bg-amber-500 hover:bg-amber-400 text-[#0d6e40] w-10 h-10 rounded-full shadow-lg flex items-center justify-center transition-all z-50 ${showBackToTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <i className="fas fa-chevron-up text-xs font-bold"></i>
      </button>

      {/* POPUP MODAL UNIT SEKOLAH */}
      <SekolahModal sekolah={selectedSekolah} onClose={() => setSelectedSekolah(null)} />
    </div>
  );
}

export default Home;