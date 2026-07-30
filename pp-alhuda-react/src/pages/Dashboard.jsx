import { useState, useEffect } from "react";
import { DashboardLayout } from "../components/ui/dashboard-sidebar";
import { 
  FileText, 
  Sheet, 
  Newspaper, 
  Users, 
  Calendar, 
  Image as ImageIcon, 
  Video, 
  BarChart3, 
  User, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  Edit3, 
  Save, 
  X,
  Lock,
  History,
  KeyRound,
  ShieldCheck,
  Eye,
  EyeOff,
  Globe,
  Smartphone,
  Laptop,
  ArrowUpRight,
  Search,
  Activity,
  Inbox
} from "lucide-react";

// Konsistensi URL Backend Server Node.js
const BACKEND_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
const API_ROOT = `${BACKEND_BASE}/api`;

const BASE_URL = `${API_ROOT}/berita`;
const AGENDA_URL = `${API_ROOT}/agenda`;
const PENDAFTARAN_URL = `${API_ROOT}/pendaftaran`;
const GALERI_FOTO_URL = `${API_ROOT}/galeri-foto`;
const GALERI_VIDEO_URL = `${API_ROOT}/galeri-video`;
const STATISTIK_URL = `${API_ROOT}/statistik`;

const Dashboard = () => {
  // Navigation & Theme States
  const [activePage, setActivePage] = useState('berita');
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return document.documentElement.classList.contains('dark') || localStorage.getItem('theme') === 'dark';
  });

  // Notifications State
  const [notifications, setNotifications] = useState([]);

  // Data States
  const [listBerita, setListBerita] = useState([]);
  const [listAgenda, setListAgenda] = useState([]);
  const [listPendaftar, setListPendaftar] = useState([]);
  const [listGaleriFoto, setListGaleriFoto] = useState([]);
  const [listGaleriVideo, setListGaleriVideo] = useState([]);

  // Data Analytics/Statistik State
  const [searchPendaftarStat, setSearchPendaftarStat] = useState('');
  const [visitorLogs, setVisitorLogs] = useState([]);
  const [visitorStats, setVisitorStats] = useState({
    todayHits: 0,
    monthHits: 0,
    mobilePercentage: 0,
    desktopPercentage: 0,
    monthlyTrend: [0, 0, 0, 0, 0, 0] // 6 bulan terakhir
  });

  // Counters State
  const [countBerita, setCountBerita] = useState(0);
  const [countAgenda, setCountAgenda] = useState(0);
  const [countPendaftar, setCountPendaftar] = useState(0);
  const [countGaleriFoto, setCountGaleriFoto] = useState(0);
  const [countGaleriVideo, setCountGaleriVideo] = useState(0);

  // Form States - Berita
  const [beritaId, setBeritaId] = useState('');
  const [judul, setJudul] = useState('');
  const [ringkasan, setRingkasan] = useState('');
  const [isiLengkap, setIsiLengkap] = useState('');
  const [gambar, setGambar] = useState(null);

  // Form States - Agenda
  const [agendaId, setAgendaId] = useState('');
  const [agendaTanggal, setAgendaTanggal] = useState('');
  const [agendaWaktu, setAgendaWaktu] = useState('');
  const [agendaJudul, setAgendaJudul] = useState('');
  const [agendaLokasi, setAgendaLokasi] = useState('');

  // Form States - Galeri Foto
  const [fotoId, setFotoId] = useState('');
  const [fotoJudul, setFotoJudul] = useState('');
  const [fotoFile, setFotoFile] = useState(null);

  // Form States - Galeri Video
  const [videoId, setVideoId] = useState('');
  const [videoJudul, setVideoJudul] = useState('');
  const [videoDesk, setVideoDesk] = useState('');
  const [videoFile, setVideoFile] = useState(null);

  // --- ADMIN PROFILE STATES ---
  const [adminTab, setAdminTab] = useState('pribadi');
  const [isEditingAdmin, setIsEditingAdmin] = useState(false);
  const [adminName, setAdminName] = useState('Admin Utama');
  const [adminEmail, setAdminEmail] = useState('admin@pandalhuda.id');
  const [adminPhone, setAdminPhone] = useState('081234567890');

  // Draft Admin State
  const [tempAdminName, setTempAdminName] = useState('Admin Utama');
  const [tempAdminEmail, setTempAdminEmail] = useState('admin@pandalhuda.id');
  const [tempAdminPhone, setTempAdminPhone] = useState('081234567890');

  // Password States
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Activity Logs Admin
  const [activityLogs, setActivityLogs] = useState([]);

  // Alert State & Loading Statuses
  const [alertState, setAlertState] = useState({ show: false, message: '', type: '' });
  const [isLoadingBerita, setIsLoadingBerita] = useState(true);
  const [isLoadingAgenda, setIsLoadingAgenda] = useState(true);
  const [isLoadingPendaftar, setIsLoadingPendaftar] = useState(true);
  const [isLoadingGaleriFoto, setIsLoadingGaleriFoto] = useState(true);
  const [isLoadingGaleriVideo, setIsLoadingGaleriVideo] = useState(true);

  // Initial Sync
  useEffect(() => {
    loadStatistikDanBerita();
    updateCardCounters();
    loadNotifications();
    loadDataPendaftar();
    loadAnalyticsData();
  }, []);

  // Sync Dark Mode
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDarkMode]);

  const tampilkanAlert = (message, type) => {
    setAlertState({ show: true, message, type });
    setTimeout(() => setAlertState({ show: false, message: '', type: '' }), 4000);
  };

  const handleNavClick = (page) => {
    setActivePage(page);
    if (page === 'berita') loadStatistikDanBerita();
    else if (page === 'agenda') loadDataAgenda();
    else if (page === 'pendaftar') loadDataPendaftar();
    else if (page === 'galeri-foto') loadDataGaleriFoto();
    else if (page === 'galeri-video') loadDataGaleriVideo();
    else if (page === 'statistik') {
      updateCardCounters();
      loadDataPendaftar();
      loadAnalyticsData();
    }
  };

  // Fetch Data Analytics/Visitor
  const loadAnalyticsData = async () => {
    try {
      const res = await fetch(`${STATISTIK_URL}/visitors`);
      if (res.ok) {
        const data = await res.json();
        setVisitorStats({
          todayHits: data.todayHits || 0,
          monthHits: data.monthHits || 0,
          mobilePercentage: data.mobilePercentage || 0,
          desktopPercentage: data.desktopPercentage || 0,
          monthlyTrend: Array.isArray(data.monthlyTrend) && data.monthlyTrend.length === 6 ? data.monthlyTrend : [0, 0, 0, 0, 0, 0]
        });
        setVisitorLogs(data.logs || []);
      }
    } catch (e) {
      setVisitorStats({
        todayHits: 0,
        monthHits: 0,
        mobilePercentage: 0,
        desktopPercentage: 0,
        monthlyTrend: [0, 0, 0, 0, 0, 0]
      });
      setVisitorLogs([]);
    }
  };

  // Notification Handlers
  const loadNotifications = async () => {
    try {
      const res = await fetch(`${API_ROOT}/notifications`);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) setNotifications(data);
      }
    } catch (e) {
      setNotifications([]);
    }
  };

  const handleMarkAsRead = async (notifId) => {
    setNotifications(prev => prev.map(n => n.id === notifId ? { ...n, read: true } : n));
    try {
      await fetch(`${API_ROOT}/notifications/${notifId}/read`, { method: 'PUT' });
    } catch (e) {}
  };

  const handleMarkAllAsRead = async () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    try {
      await fetch(`${API_ROOT}/notifications/read-all`, { method: 'PUT' });
    } catch (e) {}
  };

  // Download Reports
  const downloadExcelReport = async () => {
    try {
      const response = await fetch(`${PENDAFTARAN_URL}/download/excel`);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `laporan-pendaftar-${new Date().toISOString().split('T')[0]}.xlsx`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      tampilkanAlert('Laporan Excel berhasil didownload!', 'success');
    } catch (e) {
      tampilkanAlert('Gagal mendownload laporan Excel', 'error');
    }
  };

  const downloadPDFReport = async () => {
    try {
      const response = await fetch(`${PENDAFTARAN_URL}/download/pdf`);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `laporan-pendaftar-${new Date().toISOString().split('T')[0]}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      tampilkanAlert('Laporan PDF berhasil didownload!', 'success');
    } catch (e) {
      tampilkanAlert('Gagal mendownload laporan PDF', 'error');
    }
  };

  // Admin Profile Handlers
  const handleStartEditAdmin = () => {
    setTempAdminName(adminName);
    setTempAdminEmail(adminEmail);
    setTempAdminPhone(adminPhone);
    setIsEditingAdmin(true);
  };

  const handleSaveAdmin = () => {
    setAdminName(tempAdminName);
    setAdminEmail(tempAdminEmail);
    setAdminPhone(tempAdminPhone);
    setIsEditingAdmin(false);
    tampilkanAlert('Profil Admin Utama berhasil diperbarui!', 'success');
  };

  const handleCancelEditAdmin = () => {
    setIsEditingAdmin(false);
  };

  // Password Handlers
  const handleUpdatePassword = () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      tampilkanAlert('Semua field kata sandi wajib diisi!', 'error');
      return;
    }
    if (newPassword !== confirmPassword) {
      tampilkanAlert('Konfirmasi kata sandi baru tidak cocok!', 'error');
      return;
    }
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setIsEditingPassword(false);
    tampilkanAlert('Kata sandi berhasil diperbarui!', 'success');
  };

  const handleCancelPassword = () => {
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setIsEditingPassword(false);
  };

  // Counters Update
  const updateCardCounters = async () => {
    try {
      const resA = await fetch(AGENDA_URL);
      if (resA.ok) setCountAgenda((await resA.json()).length);
    } catch (e) { setCountAgenda(0); }

    try {
      const resP = await fetch(PENDAFTARAN_URL);
      if (resP.ok) setCountPendaftar((await resP.json()).length);
    } catch (e) { setCountPendaftar(0); }

    try {
      const resF = await fetch(GALERI_FOTO_URL);
      if (resF.ok) setCountGaleriFoto((await resF.json()).length);
    } catch (e) { setCountGaleriFoto(0); }

    try {
      const resV = await fetch(GALERI_VIDEO_URL);
      if (resV.ok) setCountGaleriVideo((await resV.json()).length);
    } catch (e) { setCountGaleriVideo(0); }
  };

  // CRUD - Berita
  const loadStatistikDanBerita = async () => {
    setIsLoadingBerita(true);
    try {
      const response = await fetch(BASE_URL);
      if (response.ok) {
        const dataBerita = await response.json();
        setListBerita(dataBerita);
        setCountBerita(dataBerita.length);
        updateCardCounters();
      }
    } catch (err) {
      console.error('Gagal memuat berita:', err);
    } finally {
      setIsLoadingBerita(false);
    }
  };

  const submitBerita = async () => {
    if (!judul || !ringkasan || !isiLengkap) {
      tampilkanAlert('Form bertanda wajib tidak boleh kosong!', 'error');
      return;
    }

    const formData = new FormData();
    formData.append('judul', judul);
    formData.append('ringkasan', ringkasan);
    formData.append('isi_lengkap', isiLengkap);
    if (gambar) formData.append('gambar', gambar);

    let url = BASE_URL;
    let method = 'POST';
    if (beritaId) {
      url = `${BASE_URL}/${beritaId}`;
      method = 'PUT';
    }

    try {
      const res = await fetch(url, { method, body: formData });
      if (res.ok) {
        tampilkanAlert(beritaId ? 'Berita diperbarui!' : 'Berita diterbitkan!', 'success');
        resetFormBerita();
        loadStatistikDanBerita();
      } else {
        tampilkanAlert('Gagal memproses berita.', 'error');
      }
    } catch (error) {
      tampilkanAlert('Terjadi kendala jaringan ke API backend.', 'error');
    }
  };

  const editBerita = (item) => {
    setBeritaId(item.id);
    setJudul(item.judul);
    setRingkasan(item.ringkasan);
    setIsiLengkap(item.isi_lengkap || item.konten_lengkap || '');
    setGambar(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetFormBerita = () => {
    setBeritaId('');
    setJudul('');
    setRingkasan('');
    setIsiLengkap('');
    setGambar(null);
    const fileInput = document.getElementById('input-gambar-berita');
    if (fileInput) fileInput.value = '';
  };

  const hapusBerita = async (id) => {
    if (window.confirm('Yakin ingin menghapus berita ini secara permanen?')) {
      try {
        const res = await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
        if (res.ok) {
          tampilkanAlert('Berita berhasil dihapus!', 'success');
          loadStatistikDanBerita();
        }
      } catch (e) {
        tampilkanAlert('Kendala koneksi REST API.', 'error');
      }
    }
  };

  // CRUD - Agenda
  const loadDataAgenda = async () => {
    setIsLoadingAgenda(true);
    try {
      const res = await fetch(AGENDA_URL);
      if (res.ok) {
        const data = await res.json();
        setListAgenda(data);
        setCountAgenda(data.length);
      }
    } catch (e) {
      setListAgenda([]);
    } finally {
      setIsLoadingAgenda(false);
    }
  };

  const submitAgenda = async () => {
    if (!agendaTanggal || !agendaJudul) {
      tampilkanAlert('Tanggal dan judul agenda wajib diisi!', 'error');
      return;
    }

    const method = agendaId ? 'PUT' : 'POST';
    const url = agendaId ? `${AGENDA_URL}/${agendaId}` : AGENDA_URL;

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tanggal: agendaTanggal,
          waktu: agendaWaktu,
          judul: agendaJudul,
          lokasi: agendaLokasi,
        }),
      });

      if (res.ok) {
        tampilkanAlert(agendaId ? 'Agenda diperbarui!' : 'Agenda baru ditambahkan!', 'success');
        resetFormAgenda();
        loadDataAgenda();
      } else {
        tampilkanAlert('Gagal menyimpan agenda.', 'error');
      }
    } catch (e) {
      tampilkanAlert('Kendala jaringan ke API server.', 'error');
    }
  };

  const editAgenda = (item) => {
    setAgendaId(item.id);
    setAgendaTanggal(item.tanggal);
    setAgendaWaktu(item.waktu);
    setAgendaJudul(item.judul);
    setAgendaLokasi(item.lokasi);
  };

  const resetFormAgenda = () => {
    setAgendaId('');
    setAgendaTanggal('');
    setAgendaWaktu('');
    setAgendaJudul('');
    setAgendaLokasi('');
  };

  const hapusAgenda = async (id) => {
    if (window.confirm('Hapus agenda ini?')) {
      try {
        const res = await fetch(`${AGENDA_URL}/${id}`, { method: 'DELETE' });
        if (res.ok) {
          tampilkanAlert('Agenda berhasil dihapus!', 'success');
          loadDataAgenda();
        }
      } catch (e) {
        tampilkanAlert('Kendala koneksi REST API.', 'error');
      }
    }
  };

  // CRUD - Pendaftar
  const loadDataPendaftar = async () => {
    setIsLoadingPendaftar(true);
    try {
      const res = await fetch(PENDAFTARAN_URL);
      if (res.ok) {
        const data = await res.json();
        setListPendaftar(data);
        setCountPendaftar(data.length);
      }
    } catch (e) {
      setListPendaftar([]);
    } finally {
      setIsLoadingPendaftar(false);
    }
  };

  const updateStatusPendaftar = async (id, statusBaru) => {
    try {
      const res = await fetch(`${PENDAFTARAN_URL}/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: statusBaru }),
      });
      if (res.ok) {
        tampilkanAlert('Status pendaftar diperbarui!', 'success');
        loadDataPendaftar();
      }
    } catch (e) {
      tampilkanAlert('Kendala jaringan ke API server.', 'error');
    }
  };

  const hapusPendaftar = async (id) => {
    if (window.confirm('Hapus data pendaftar ini secara permanen?')) {
      try {
        const res = await fetch(`${PENDAFTARAN_URL}/${id}`, { method: 'DELETE' });
        if (res.ok) {
          tampilkanAlert('Data pendaftar berhasil dihapus!', 'success');
          loadDataPendaftar();
        }
      } catch (e) {
        tampilkanAlert('Kendala koneksi REST API.', 'error');
      }
    }
  };

  // CRUD - Galeri Foto
  const loadDataGaleriFoto = async () => {
    setIsLoadingGaleriFoto(true);
    try {
      const res = await fetch(GALERI_FOTO_URL);
      if (res.ok) {
        const data = await res.json();
        setListGaleriFoto(data);
        setCountGaleriFoto(data.length);
      }
    } catch (e) {
      setListGaleriFoto([]);
    } finally {
      setIsLoadingGaleriFoto(false);
    }
  };

  const submitGaleriFoto = async () => {
    if (!fotoJudul || (!fotoFile && !fotoId)) {
      tampilkanAlert('Judul dan file foto wajib diisi!', 'error');
      return;
    }

    const formData = new FormData();
    formData.append('judul', fotoJudul);
    if (fotoFile) formData.append('foto', fotoFile);

    const method = fotoId ? 'PUT' : 'POST';
    const url = fotoId ? `${GALERI_FOTO_URL}/${fotoId}` : GALERI_FOTO_URL;

    try {
      const res = await fetch(url, { method, body: formData });
      if (res.ok) {
        tampilkanAlert(fotoId ? 'Foto diperbarui!' : 'Foto ditambahkan ke galeri!', 'success');
        resetFormGaleriFoto();
        loadDataGaleriFoto();
      }
    } catch (e) {
      tampilkanAlert('Kendala jaringan ke REST API.', 'error');
    }
  };

  const editGaleriFoto = (item) => {
    setFotoId(item.id);
    setFotoJudul(item.judul);
    setFotoFile(null);
  };

  const resetFormGaleriFoto = () => {
    setFotoId('');
    setFotoJudul('');
    setFotoFile(null);
    const fileInput = document.getElementById('input-foto-galeri');
    if (fileInput) fileInput.value = '';
  };

  const hapusGaleriFoto = async (id) => {
    if (window.confirm('Hapus foto ini dari galeri?')) {
      try {
        const res = await fetch(`${GALERI_FOTO_URL}/${id}`, { method: 'DELETE' });
        if (res.ok) {
          tampilkanAlert('Foto dihapus!', 'success');
          loadDataGaleriFoto();
        }
      } catch (e) {}
    }
  };

  // CRUD - Galeri Video
  const loadDataGaleriVideo = async () => {
    setIsLoadingGaleriVideo(true);
    try {
      const res = await fetch(GALERI_VIDEO_URL);
      if (res.ok) {
        const data = await res.json();
        setListGaleriVideo(data);
        setCountGaleriVideo(data.length);
      }
    } catch (e) {
      setListGaleriVideo([]);
    } finally {
      setIsLoadingGaleriVideo(false);
    }
  };

  const submitGaleriVideo = async () => {
    if (!videoJudul || (!videoFile && !videoId)) {
      tampilkanAlert('Judul dan file video wajib diisi!', 'error');
      return;
    }

    const formData = new FormData();
    formData.append('judul', videoJudul);
    formData.append('deskripsi', videoDesk);
    if (videoFile) formData.append('video', videoFile);

    const method = videoId ? 'PUT' : 'POST';
    const url = videoId ? `${GALERI_VIDEO_URL}/${videoId}` : GALERI_VIDEO_URL;

    try {
      const res = await fetch(url, { method, body: formData });
      if (res.ok) {
        tampilkanAlert(videoId ? 'Video diperbarui!' : 'Video berhasil ditambahkan!', 'success');
        resetFormGaleriVideo();
        loadDataGaleriVideo();
      }
    } catch (e) {
      tampilkanAlert('Kendala jaringan ke REST API.', 'error');
    }
  };

  const editGaleriVideo = (item) => {
    setVideoId(item.id);
    setVideoJudul(item.judul);
    setVideoDesk(item.deskripsi || '');
    setVideoFile(null);
  };

  const resetFormGaleriVideo = () => {
    setVideoId('');
    setVideoJudul('');
    setVideoDesk('');
    setVideoFile(null);
    const videoInput = document.getElementById('input-video-galeri');
    if (videoInput) videoInput.value = '';
  };

  const hapusGaleriVideo = async (id) => {
    if (window.confirm('Hapus video ini dari galeri?')) {
      try {
        const res = await fetch(`${GALERI_VIDEO_URL}/${id}`, { method: 'DELETE' });
        if (res.ok) {
          tampilkanAlert('Video dihapus!', 'success');
          loadDataGaleriVideo();
        }
      } catch (e) {}
    }
  };

  // Status Pendaftar Counters
  const pendaftarDiterima = listPendaftar.filter(p => p.status === 'Diterima').length;
  const pendaftarMenunggu = listPendaftar.filter(p => !p.status || p.status === 'Menunggu').length;
  const pendaftarDitolak = listPendaftar.filter(p => p.status === 'Ditolak').length;

  // Filtered List Pendaftar
  const filteredPendaftarStat = listPendaftar.filter(p => 
    p.nama_calon_santri?.toLowerCase().includes(searchPendaftarStat.toLowerCase()) ||
    p.nama_wali?.toLowerCase().includes(searchPendaftarStat.toLowerCase()) ||
    p.asal_sekolah?.toLowerCase().includes(searchPendaftarStat.toLowerCase())
  );

  // Kalkulasi Titik Grafik Sesuai Data Real
  const calculateSVGPath = (dataTrend) => {
    const maxVal = Math.max(...dataTrend, 10);
    const points = dataTrend.map((val, idx) => {
      const x = (idx / 5) * 500;
      const y = 140 - (val / maxVal) * 110;
      return `${x},${y}`;
    });
    return `M ${points.join(' L ')}`;
  };

  return (
    <DashboardLayout
      activePage={activePage}
      onNavClick={handleNavClick}
      isDarkMode={isDarkMode}
      setIsDarkMode={setIsDarkMode}
      counters={{ countBerita, countAgenda, countPendaftar, countGaleriFoto, countGaleriVideo }}
      notifications={notifications}
      onMarkAsRead={handleMarkAsRead}
      onMarkAllAsRead={handleMarkAllAsRead}
      onAdminClick={() => setActivePage('admin-profile')}
    >
      <div className="p-3 sm:p-6 w-full max-w-full overflow-hidden space-y-6">

        {/* Global Alert Notification */}
        {alertState.show && (
          <div className={`p-4 rounded-xl text-sm font-medium border ${
            alertState.type === 'success'
              ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 text-emerald-800 dark:text-emerald-400'
              : 'bg-red-50 dark:bg-red-950/30 border-red-200 text-red-800 dark:text-red-400'
          }`}>
            {alertState.message}
          </div>
        )}

        {/* 1. WORKSPACE ADMIN PROFILE */}
        {activePage === 'admin-profile' && (
          <div className="w-full space-y-6">
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5 sm:p-8 shadow-sm w-full">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gray-200 dark:border-gray-800 pb-6 mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-emerald-800 flex items-center justify-center text-white font-bold text-2xl sm:text-3xl shadow-lg shrink-0">
                    <User className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100">{adminName}</h3>
                    <p className="text-xs sm:text-sm text-emerald-600 dark:text-emerald-400 font-semibold mt-0.5">Pengelola Sistem Pondok Pesantren</p>
                  </div>
                </div>

                {adminTab === 'pribadi' && !isEditingAdmin && (
                  <button
                    type="button"
                    onClick={handleStartEditAdmin}
                    className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl font-semibold text-xs sm:text-sm transition-all shadow-sm cursor-pointer"
                  >
                    <Edit3 className="h-4 w-4" /> Edit Profil
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2 border-b border-gray-200 dark:border-gray-800 pb-3 mb-6 overflow-x-auto">
                <button
                  type="button"
                  onClick={() => setAdminTab('pribadi')}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
                    adminTab === 'pribadi'
                      ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800'
                      : 'text-gray-500 hover:text-gray-900 dark:hover:text-gray-200'
                  }`}
                >
                  <User className="h-4 w-4" /> Informasi Pribadi
                </button>

                <button
                  type="button"
                  onClick={() => setAdminTab('keamanan')}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
                    adminTab === 'keamanan'
                      ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800'
                      : 'text-gray-500 hover:text-gray-900 dark:hover:text-gray-200'
                  }`}
                >
                  <Lock className="h-4 w-4" /> Keamanan & Password
                </button>

                <button
                  type="button"
                  onClick={() => setAdminTab('aktivitas')}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
                    adminTab === 'aktivitas'
                      ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800'
                      : 'text-gray-500 hover:text-gray-900 dark:hover:text-gray-200'
                  }`}
                >
                  <History className="h-4 w-4" /> Log Aktivitas
                </button>
              </div>

              {adminTab === 'pribadi' && (
                <div className="space-y-6 max-w-3xl">
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Nama Lengkap</label>
                    {isEditingAdmin ? (
                      <input type="text" value={tempAdminName} onChange={(e) => setTempAdminName(e.target.value)} className="w-full border border-emerald-500 dark:border-emerald-600 p-3 rounded-xl bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm font-medium transition-all" />
                    ) : (
                      <div className="p-3 bg-gray-50 dark:bg-gray-950/60 border border-gray-200 dark:border-gray-800 rounded-xl text-sm font-semibold text-gray-900 dark:text-gray-100">{adminName}</div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Alamat Email</label>
                    {isEditingAdmin ? (
                      <input type="email" value={tempAdminEmail} onChange={(e) => setTempAdminEmail(e.target.value)} className="w-full border border-emerald-500 dark:border-emerald-600 p-3 rounded-xl bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm font-medium transition-all" />
                    ) : (
                      <div className="p-3 bg-gray-50 dark:bg-gray-950/60 border border-gray-200 dark:border-gray-800 rounded-xl text-sm font-semibold text-gray-900 dark:text-gray-100">{adminEmail}</div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Nomor WhatsApp / HP</label>
                    {isEditingAdmin ? (
                      <input type="text" value={tempAdminPhone} onChange={(e) => setTempAdminPhone(e.target.value)} className="w-full border border-emerald-500 dark:border-emerald-600 p-3 rounded-xl bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm font-medium transition-all" />
                    ) : (
                      <div className="p-3 bg-gray-50 dark:bg-gray-950/60 border border-gray-200 dark:border-gray-800 rounded-xl text-sm font-semibold text-gray-900 dark:text-gray-100">{adminPhone}</div>
                    )}
                  </div>

                  {isEditingAdmin && (
                    <div className="pt-4 flex items-center justify-start gap-3 border-t border-gray-200 dark:border-gray-800">
                      <button type="button" onClick={handleSaveAdmin} className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-xl font-semibold text-sm transition-all cursor-pointer shadow-md"><Save className="h-4 w-4" /> Simpan</button>
                      <button type="button" onClick={handleCancelEditAdmin} className="flex items-center gap-1.5 bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-xl font-medium text-sm transition-all cursor-pointer"><X className="h-4 w-4" /> Batal</button>
                    </div>
                  )}
                </div>
              )}

              {adminTab === 'keamanan' && (
                <div className="space-y-6 max-w-3xl">
                  <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 flex items-center gap-3">
                    <ShieldCheck className="h-6 w-6 text-amber-600 shrink-0" />
                    <p className="text-xs text-amber-800 dark:text-amber-400 font-medium">Gunakan kombinasi kata sandi minimal 8 karakter dengan campuran huruf dan angka.</p>
                  </div>

                  {!isEditingPassword ? (
                    <div className="p-5 bg-gray-50 dark:bg-gray-950/50 border border-gray-200 dark:border-gray-800 rounded-xl space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div>
                          <h4 className="text-sm font-bold text-gray-900 dark:text-gray-100">Kata Sandi Akun Admin</h4>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Ubah kata sandi secara berkala untuk menjaga keamanan.</p>
                        </div>
                        <button type="button" onClick={() => setIsEditingPassword(true)} className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl font-semibold text-xs sm:text-sm transition-all cursor-pointer shrink-0"><KeyRound className="h-4 w-4" /> Ubah Kata Sandi</button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4 border border-emerald-200 dark:border-emerald-800/80 p-5 rounded-xl bg-gray-50/50 dark:bg-gray-950/40">
                      <h4 className="text-sm font-bold text-emerald-800 dark:text-emerald-400 border-b border-gray-200 dark:border-gray-800 pb-3">Form Perbarui Kata Sandi</h4>
                      <div className="space-y-2">
                        <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Kata Sandi Saat Ini</label>
                        <div className="relative">
                          <input type={showOldPassword ? "text" : "password"} placeholder="Masukkan kata sandi lama" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} className="w-full border border-gray-300 dark:border-gray-800 p-3 pr-10 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-emerald-600 text-sm font-medium" />
                          <button type="button" onClick={() => setShowOldPassword(!showOldPassword)} className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 cursor-pointer">{showOldPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}</button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Kata Sandi Baru</label>
                        <div className="relative">
                          <input type={showNewPassword ? "text" : "password"} placeholder="Masukkan kata sandi baru" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="w-full border border-gray-300 dark:border-gray-800 p-3 pr-10 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-emerald-600 text-sm font-medium" />
                          <button type="button" onClick={() => setShowNewPassword(!showNewPassword)} className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 cursor-pointer">{showNewPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}</button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Konfirmasi Kata Sandi Baru</label>
                        <div className="relative">
                          <input type={showConfirmPassword ? "text" : "password"} placeholder="Ulangi kata sandi baru" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full border border-gray-300 dark:border-gray-800 p-3 pr-10 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-emerald-600 text-sm font-medium" />
                          <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 cursor-pointer">{showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}</button>
                        </div>
                      </div>
                      <div className="pt-3 flex items-center justify-start gap-3 border-t border-gray-200 dark:border-gray-800">
                        <button type="button" onClick={handleUpdatePassword} className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-xl font-semibold text-sm transition-all cursor-pointer shadow-md"><Save className="h-4 w-4" /> Simpan Kata Sandi</button>
                        <button type="button" onClick={handleCancelPassword} className="flex items-center gap-1.5 bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-xl font-medium text-sm transition-all cursor-pointer"><X className="h-4 w-4" /> Batal</button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {adminTab === 'aktivitas' && (
                <div className="space-y-4 max-w-3xl">
                  <h4 className="text-sm font-bold text-gray-800 dark:text-gray-100 mb-2">Riwayat Tindakan Terakhir</h4>
                  {activityLogs.length === 0 ? (
                    <div className="p-8 text-center text-gray-400 border border-dashed border-gray-200 dark:border-gray-800 rounded-xl text-xs">Belum ada riwayat aktivitas admin terdeteksi.</div>
                  ) : (
                    <div className="divide-y border dark:border-gray-800 rounded-xl overflow-hidden">
                      {activityLogs.map((log) => (
                        <div key={log.id} className="p-4 bg-gray-50 dark:bg-gray-950/40 flex items-center justify-between">
                          <div className="space-y-0.5">
                            <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{log.action}</p>
                            <p className="text-xs text-gray-400">{log.time}</p>
                          </div>
                          <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-400">{log.status}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

            </div>
          </div>
        )}

        {/* 2. WORKSPACE BERITA */}
        {activePage === 'berita' && (
          <div className="w-full space-y-6">
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-5 sm:p-6 rounded-xl shadow-sm w-full">
              <h3 className="text-lg sm:text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">{beritaId ? '✏️ Edit Berita' : '➕ Tambah Berita Baru'}</h3>
              <div className="space-y-4">
                <input type="text" placeholder="Judul Berita (Wajib)" value={judul} onChange={(e) => setJudul(e.target.value)} className="w-full border dark:border-gray-800 p-2.5 rounded-xl bg-transparent text-gray-900 dark:text-gray-100 focus:outline-none focus:border-emerald-600 text-sm" />
                <input type="text" placeholder="Ringkasan Pendek (Wajib)" value={ringkasan} onChange={(e) => setRingkasan(e.target.value)} className="w-full border dark:border-gray-800 p-2.5 rounded-xl bg-transparent text-gray-900 dark:text-gray-100 focus:outline-none focus:border-emerald-600 text-sm" />
                <textarea placeholder="Konten Isi Lengkap Berita (Wajib)" value={isiLengkap} onChange={(e) => setIsiLengkap(e.target.value)} className="w-full border dark:border-gray-800 p-2.5 rounded-xl bg-transparent text-gray-900 dark:text-gray-100 focus:outline-none focus:border-emerald-600 text-sm h-36" />

                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400">Gambar Berita (Opsional)</label>
                  <input id="input-gambar-berita" type="file" accept="image/*" onChange={(e) => setGambar(e.target.files[0])} className="w-full text-xs text-gray-500 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-emerald-50 file:text-emerald-700 dark:file:bg-emerald-950/30 dark:file:text-emerald-400 hover:file:bg-emerald-100 cursor-pointer" />
                </div>

                <div className="flex gap-2">
                  <button type="button" onClick={submitBerita} className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-xl font-semibold text-sm transition-all cursor-pointer">{beritaId ? 'Simpan Perubahan' : 'Terbitkan'}</button>
                  {beritaId && <button type="button" onClick={resetFormBerita} className="bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-xl text-sm font-medium cursor-pointer">Batal</button>}
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-5 sm:p-6 rounded-xl shadow-sm w-full">
              <h3 className="text-base sm:text-lg font-bold mb-4 text-gray-800 dark:text-gray-100">Daftar Berita Aktif ({listBerita.length})</h3>
              <div className="overflow-x-auto rounded-xl border dark:border-gray-800">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="border-b bg-gray-50 dark:bg-gray-800/60 font-semibold text-gray-600 dark:text-gray-400">
                      <th className="p-4">Judul</th>
                      <th className="p-4 hidden md:table-cell">Ringkasan</th>
                      <th className="p-4 text-center w-32">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {isLoadingBerita ? (
                      <tr><td colSpan="3" className="p-8 text-center text-gray-400 animate-pulse">Memuat data berita...</td></tr>
                    ) : listBerita.length === 0 ? (
                      <tr><td colSpan="3" className="p-8 text-center text-gray-400">Belum ada berita tersimpan.</td></tr>
                    ) : (
                      listBerita.map((item) => (
                        <tr key={item.id} className="border-b dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/30">
                          <td className="p-4 font-semibold text-gray-900 dark:text-gray-100">{item.judul}</td>
                          <td className="p-4 text-gray-500 dark:text-gray-400 max-w-xs truncate hidden md:table-cell">{item.ringkasan || '-'}</td>
                          <td className="p-4 text-center space-x-1 sm:space-x-2 whitespace-nowrap">
                            <button type="button" onClick={() => editBerita(item)} className="bg-amber-500 text-white px-2.5 py-1 rounded-lg text-xs font-semibold cursor-pointer">Edit</button>
                            <button type="button" onClick={() => hapusBerita(item.id)} className="bg-red-600 text-white px-2.5 py-1 rounded-lg text-xs font-semibold cursor-pointer">Hapus</button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 3. WORKSPACE PENDAFTAR PSB */}
        {activePage === 'pendaftar' && (
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-5 sm:p-6 rounded-xl shadow-sm w-full">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
              <h3 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-100">Data Calon Santri Mendaftar ({listPendaftar.length})</h3>
              <div className="flex gap-2 w-full sm:w-auto">
                <button type="button" onClick={downloadExcelReport} className="flex-1 sm:flex-none justify-center flex items-center gap-1.5 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer"><Sheet className="h-4 w-4" /> Excel</button>
                <button type="button" onClick={downloadPDFReport} className="flex-1 sm:flex-none justify-center flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer"><FileText className="h-4 w-4" /> PDF</button>
              </div>
            </div>
            <div className="overflow-x-auto rounded-xl border dark:border-gray-800">
              <table className="w-full text-left border-collapse text-sm min-w-[600px]">
                <thead>
                  <tr className="border-b bg-gray-50 dark:bg-gray-800/60 font-semibold text-gray-600 dark:text-gray-400">
                    <th className="p-4">Nama Calon Santri</th>
                    <th className="p-4">Wali / Kontak</th>
                    <th className="p-4">Tanggal Daftar</th>
                    <th className="p-4 text-center w-36">Status</th>
                    <th className="p-4 text-center w-20">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoadingPendaftar ? (
                    <tr><td colSpan="5" className="p-8 text-center text-gray-400 animate-pulse">Memuat data pendaftar...</td></tr>
                  ) : listPendaftar.length === 0 ? (
                    <tr><td colSpan="5" className="p-8 text-center text-gray-400">Belum ada pendaftar tersimpan di database.</td></tr>
                  ) : (
                    listPendaftar.map((item) => (
                      <tr key={item.id} className="border-b dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/30">
                        <td className="p-4 font-semibold text-gray-900 dark:text-gray-100">{item.nama_calon_santri}<span className="block text-xs font-normal text-gray-400 mt-0.5">{item.asal_sekolah}</span></td>
                        <td className="p-4 text-gray-500 dark:text-gray-400 text-xs">{item.nama_wali}<br />{item.no_hp_wali}</td>
                        <td className="p-4 text-gray-400 text-xs whitespace-nowrap">{item.tanggal_daftar ? new Date(item.tanggal_daftar).toLocaleDateString('id-ID') : '-'}</td>
                        <td className="p-4 text-center">
                          <select value={item.status || 'Menunggu'} onChange={(e) => updateStatusPendaftar(item.id, e.target.value)} className="text-xs border dark:border-gray-800 rounded-lg px-2 py-1.5 bg-transparent text-gray-900 dark:text-gray-100">
                            <option value="Menunggu">Menunggu</option>
                            <option value="Diterima">Diterima</option>
                            <option value="Ditolak">Ditolak</option>
                          </select>
                        </td>
                        <td className="p-4 text-center"><button type="button" onClick={() => hapusPendaftar(item.id)} className="bg-red-600 hover:bg-red-700 text-white px-2.5 py-1 rounded-lg text-xs font-semibold cursor-pointer">Hapus</button></td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 4. WORKSPACE AGENDA */}
        {activePage === 'agenda' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start w-full">
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-5 sm:p-6 rounded-xl shadow-sm lg:col-span-1">
              <h3 className="text-lg sm:text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">{agendaId ? '✏️ Edit Agenda' : '➕ Tambah Agenda'}</h3>
              <div className="space-y-4">
                <div className="space-y-1"><label className="block text-xs font-semibold text-gray-500 dark:text-gray-400">Tanggal</label><input type="date" value={agendaTanggal} onChange={(e) => setAgendaTanggal(e.target.value)} className="w-full border dark:border-gray-800 p-2.5 rounded-xl bg-transparent text-gray-900 dark:text-gray-100 focus:outline-none focus:border-emerald-600 text-sm" /></div>
                <div className="space-y-1"><label className="block text-xs font-semibold text-gray-500 dark:text-gray-400">Waktu</label><input type="text" placeholder="Waktu Kegiatan" value={agendaWaktu} onChange={(e) => setAgendaWaktu(e.target.value)} className="w-full border dark:border-gray-800 p-2.5 rounded-xl bg-transparent text-gray-900 dark:text-gray-100 focus:outline-none focus:border-emerald-600 text-sm" /></div>
                <div className="space-y-1"><label className="block text-xs font-semibold text-gray-500 dark:text-gray-400">Judul Kegiatan</label><input type="text" placeholder="Judul Agenda (Wajib)" value={agendaJudul} onChange={(e) => setAgendaJudul(e.target.value)} className="w-full border dark:border-gray-800 p-2.5 rounded-xl bg-transparent text-gray-900 dark:text-gray-100 focus:outline-none focus:border-emerald-600 text-sm" /></div>
                <div className="space-y-1"><label className="block text-xs font-semibold text-gray-500 dark:text-gray-400">Lokasi</label><input type="text" placeholder="Lokasi Kegiatan" value={agendaLokasi} onChange={(e) => setAgendaLokasi(e.target.value)} className="w-full border dark:border-gray-800 p-2.5 rounded-xl bg-transparent text-gray-900 dark:text-gray-100 focus:outline-none focus:border-emerald-600 text-sm" /></div>
                <div className="flex gap-2">
                  <button type="button" onClick={submitAgenda} className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl text-sm font-semibold cursor-pointer">{agendaId ? 'Simpan' : 'Tambah'}</button>
                  {agendaId && <button type="button" onClick={resetFormAgenda} className="bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-xl text-sm font-medium cursor-pointer">Batal</button>}
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-5 sm:p-6 rounded-xl shadow-sm lg:col-span-2">
              <h3 className="text-base sm:text-lg font-bold mb-4 text-gray-800 dark:text-gray-100">Daftar Agenda ({listAgenda.length})</h3>
              <div className="overflow-x-auto rounded-xl border dark:border-gray-800">
                <table className="w-full text-left border-collapse text-sm min-w-[500px]">
                  <thead>
                    <tr className="border-b bg-gray-50 dark:bg-gray-800/60 font-semibold text-gray-600 dark:text-gray-400">
                      <th className="p-4">Tanggal / Waktu</th>
                      <th className="p-4">Judul & Lokasi</th>
                      <th className="p-4 text-center w-32">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {isLoadingAgenda ? (
                      <tr><td colSpan="3" className="p-8 text-center text-gray-400 animate-pulse">Memuat data agenda...</td></tr>
                    ) : listAgenda.length === 0 ? (
                      <tr><td colSpan="3" className="p-8 text-center text-gray-400">Belum ada agenda.</td></tr>
                    ) : (
                      listAgenda.map((item) => (
                        <tr key={item.id} className="border-b dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/30">
                          <td className="p-4 text-gray-500 dark:text-gray-400 text-xs whitespace-nowrap">{item.tanggal}<br />{item.waktu}</td>
                          <td className="p-4"><span className="font-semibold text-gray-900 dark:text-gray-100 block">{item.judul}</span><span className="text-xs text-gray-400">{item.lokasi}</span></td>
                          <td className="p-4 text-center space-x-1 sm:space-x-2 whitespace-nowrap">
                            <button type="button" onClick={() => editAgenda(item)} className="bg-amber-500 hover:bg-amber-600 text-white px-2.5 py-1 rounded-lg text-xs font-semibold cursor-pointer">Edit</button>
                            <button type="button" onClick={() => hapusAgenda(item.id)} className="bg-red-600 hover:bg-red-700 text-white px-2.5 py-1 rounded-lg text-xs font-semibold cursor-pointer">Hapus</button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 5. WORKSPACE GALERI FOTO */}
        {activePage === 'galeri-foto' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start w-full">
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-5 sm:p-6 rounded-xl shadow-sm lg:col-span-1">
              <h3 className="text-lg sm:text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">{fotoId ? '✏️ Edit Foto' : '➕ Upload Foto'}</h3>
              <div className="space-y-4">
                <input type="text" placeholder="Judul Foto (Wajib)" value={fotoJudul} onChange={(e) => setFotoJudul(e.target.value)} className="w-full border dark:border-gray-800 p-2.5 rounded-xl bg-transparent text-gray-900 dark:text-gray-100 focus:outline-none focus:border-emerald-600 text-sm" />
                
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400">File Foto Galeri (Wajib)</label>
                  <input id="input-foto-galeri" type="file" accept="image/*" onChange={(e) => setFotoFile(e.target.files[0])} className="w-full text-xs text-gray-500 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-emerald-50 file:text-emerald-700 dark:file:bg-emerald-950/30 dark:file:text-emerald-400 hover:file:bg-emerald-100 cursor-pointer" />
                </div>

                <div className="flex gap-2 pt-2">
                  <button type="button" onClick={submitGaleriFoto} className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer">Simpan</button>
                  {fotoId && <button type="button" onClick={resetFormGaleriFoto} className="bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-xl text-sm font-medium cursor-pointer">Batal</button>}
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-5 sm:p-6 rounded-xl shadow-sm lg:col-span-2">
              <h3 className="text-base sm:text-lg font-bold mb-4 text-gray-800 dark:text-gray-100">Daftar Foto ({listGaleriFoto.length})</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {isLoadingGaleriFoto ? <p className="text-sm text-gray-400 col-span-3">Memuat foto...</p> : listGaleriFoto.length === 0 ? <p className="text-sm text-gray-400 col-span-3">Belum ada foto tersimpan.</p> : listGaleriFoto.map((item) => (
                  <div key={item.id} className="border dark:border-gray-800 p-3 rounded-xl space-y-2 bg-gray-50 dark:bg-gray-950/40">
                    <p className="font-semibold text-xs truncate text-gray-900 dark:text-gray-100">{item.judul}</p>
                    <div className="flex gap-2">
                      <button type="button" onClick={() => editGaleriFoto(item)} className="bg-amber-500 hover:bg-amber-600 text-white px-2.5 py-1 rounded-lg text-xs font-semibold cursor-pointer">Edit</button>
                      <button type="button" onClick={() => hapusGaleriFoto(item.id)} className="bg-red-600 hover:bg-red-700 text-white px-2.5 py-1 rounded-lg text-xs font-semibold cursor-pointer">Hapus</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 6. WORKSPACE GALERI VIDEO */}
        {activePage === 'galeri-video' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start w-full">
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-5 sm:p-6 rounded-xl shadow-sm lg:col-span-1">
              <h3 className="text-lg sm:text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">{videoId ? '✏️ Edit Video' : '➕ Upload Video'}</h3>
              <div className="space-y-4">
                <input type="text" placeholder="Judul Video (Wajib)" value={videoJudul} onChange={(e) => setVideoJudul(e.target.value)} className="w-full border dark:border-gray-800 p-2.5 rounded-xl bg-transparent text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:border-emerald-600" />
                <textarea placeholder="Deskripsi Video" value={videoDesk} onChange={(e) => setVideoDesk(e.target.value)} className="w-full border dark:border-gray-800 p-2.5 rounded-xl bg-transparent text-gray-900 dark:text-gray-100 text-sm h-20 focus:outline-none focus:border-emerald-600" />
                
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400">File Video Galeri (Wajib)</label>
                  <input id="input-video-galeri" type="file" accept="video/*" onChange={(e) => setVideoFile(e.target.files[0])} className="w-full text-xs text-gray-500 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-emerald-50 file:text-emerald-700 dark:file:bg-emerald-950/30 dark:file:text-emerald-400 hover:file:bg-emerald-100 cursor-pointer" />
                </div>

                <div className="flex gap-2 pt-2">
                  <button type="button" onClick={submitGaleriVideo} className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer">Simpan</button>
                  {videoId && <button type="button" onClick={resetFormGaleriVideo} className="bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-xl text-sm font-medium cursor-pointer">Batal</button>}
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-5 sm:p-6 rounded-xl shadow-sm lg:col-span-2">
              <h3 className="text-base sm:text-lg font-bold mb-4 text-gray-800 dark:text-gray-100">Daftar Video ({listGaleriVideo.length})</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {isLoadingGaleriVideo ? <p className="text-sm text-gray-400 col-span-2">Memuat video...</p> : listGaleriVideo.length === 0 ? <p className="text-sm text-gray-400 col-span-2">Belum ada video tersimpan.</p> : listGaleriVideo.map((item) => (
                  <div key={item.id} className="border dark:border-gray-800 p-3.5 rounded-xl space-y-2 bg-gray-50 dark:bg-gray-950/40">
                    <p className="font-semibold text-sm text-gray-900 dark:text-gray-100">{item.judul}</p>
                    {item.deskripsi && <p className="text-xs text-gray-500 truncate">{item.deskripsi}</p>}
                    <div className="flex gap-2 pt-1">
                      <button type="button" onClick={() => editGaleriVideo(item)} className="bg-amber-500 hover:bg-amber-600 text-white px-2.5 py-1 rounded-lg text-xs font-semibold cursor-pointer">Edit</button>
                      <button type="button" onClick={() => hapusGaleriVideo(item.id)} className="bg-red-600 hover:bg-red-700 text-white px-2.5 py-1 rounded-lg text-xs font-semibold cursor-pointer">Hapus</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 7. WORKSPACE STATISTIK */}
        {activePage === 'statistik' && (
          <div className="w-full space-y-6">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">
              <BarChart3 className="h-6 w-6 text-emerald-600 shrink-0" /> Ringkasan Statistik Sistem
            </h3>

            {/* BARIS 1: Stat Cards Utama (Hanya 5 Item Utama) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              <StatCard title="Total Berita" count={countBerita} icon={Newspaper} color="emerald" />
              <StatCard title="Pendaftar Santri" count={countPendaftar} icon={Users} color="blue" />
              <StatCard title="Agenda Pondok" count={countAgenda} icon={Calendar} color="amber" />
              <StatCard title="Galeri Foto" count={countGaleriFoto} icon={ImageIcon} color="purple" />
              <StatCard title="Galeri Video" count={countGaleriVideo} icon={Video} color="rose" />
            </div>

            {/* BARIS 2: Status Pendaftaran Santri Baru */}
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5 sm:p-6 shadow-sm w-full">
              <h4 className="text-sm sm:text-base font-bold mb-4 text-gray-800 dark:text-gray-100">Status Pendaftaran Santri Baru</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
                <div className="flex items-center gap-4 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/50">
                  <CheckCircle2 className="h-8 w-8 text-emerald-600 shrink-0" />
                  <div>
                    <span className="text-xs text-gray-500 dark:text-gray-400 block font-medium">Diterima</span>
                    <span className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100">{pendaftarDiterima} Santri</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/50">
                  <Clock className="h-8 w-8 text-amber-600 shrink-0" />
                  <div>
                    <span className="text-xs text-gray-500 dark:text-gray-400 block font-medium">Menunggu Verifikasi</span>
                    <span className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100">{pendaftarMenunggu} Santri</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/50">
                  <XCircle className="h-8 w-8 text-red-600 shrink-0" />
                  <div>
                    <span className="text-xs text-gray-500 dark:text-gray-400 block font-medium">Ditolak</span>
                    <span className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100">{pendaftarDitolak} Santri</span>
                  </div>
                </div>
              </div>
            </div>

            {/* BARIS 3: GRAFIK TREN AKSES & PERANGKAT PENGUNJUNG */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch w-full">
              
              {/* Grafik Tren Visual Dynamic */}
              <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5 sm:p-6 shadow-sm lg:col-span-2 flex flex-col justify-between">
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                    <div>
                      <h4 className="text-base font-bold text-gray-800 dark:text-gray-100">Grafik Tren Pengunjung</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Aktivitas akses lalu lintas web real-time</p>
                    </div>
                    <div className="flex items-center gap-3 text-xs font-semibold">
                      <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span> Hits Pengunjung
                      </span>
                    </div>
                  </div>

                  {/* SVG Dynamic Graph */}
                  <div className="w-full h-48 sm:h-56 pt-4 relative flex items-end">
                    <svg className="w-full h-full overflow-visible" viewBox="0 0 500 150">
                      {/* Grid Horizontal */}
                      <line x1="0" y1="20" x2="500" y2="20" stroke="#888888" strokeOpacity="0.1" strokeDasharray="4" />
                      <line x1="0" y1="80" x2="500" y2="80" stroke="#888888" strokeOpacity="0.1" strokeDasharray="4" />
                      <line x1="0" y1="140" x2="500" y2="140" stroke="#888888" strokeOpacity="0.2" />

                      {/* Line SVG Dinamis berdasarkan visitorStats.monthlyTrend */}
                      <path
                        d={calculateSVGPath(visitorStats.monthlyTrend)}
                        fill="none"
                        stroke="#10b981"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />

                      {/* Point Dots */}
                      {visitorStats.monthlyTrend.map((val, idx) => {
                        const maxVal = Math.max(...visitorStats.monthlyTrend, 10);
                        const cx = (idx / 5) * 500;
                        const cy = 140 - (val / maxVal) * 110;
                        return <circle key={idx} cx={cx} cy={cy} r="4" fill="#10b981" />;
                      })}
                    </svg>
                  </div>
                  
                  <div className="flex justify-between text-xs text-gray-400 font-medium mt-2 pt-2 border-t border-gray-100 dark:border-gray-800">
                    <span>Feb</span>
                    <span>Mar</span>
                    <span>Apr</span>
                    <span>Mei</span>
                    <span>Jun</span>
                    <span>Jul</span>
                  </div>
                </div>
              </div>

              {/* Ringkasan Akses Pengunjung */}
              <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5 sm:p-6 shadow-sm flex flex-col justify-between">
                <div>
                  <h4 className="text-base font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2 mb-4">
                    <Globe className="h-5 w-5 text-emerald-600 shrink-0" /> Ringkasan Pengunjung
                  </h4>
                  <div className="space-y-3">
                    <div className="p-3 bg-gray-50 dark:bg-gray-950/50 rounded-xl border border-gray-100 dark:border-gray-800 flex justify-between items-center">
                      <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">Hari Ini</span>
                      <span className="text-base font-bold text-gray-900 dark:text-gray-100">{visitorStats.todayHits} Hits</span>
                    </div>
                    <div className="p-3 bg-gray-50 dark:bg-gray-950/50 rounded-xl border border-gray-100 dark:border-gray-800 flex justify-between items-center">
                      <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">Bulan Ini</span>
                      <span className="text-base font-bold text-emerald-600 dark:text-emerald-400">{visitorStats.monthHits} Hits</span>
                    </div>
                  </div>

                  <h5 className="text-xs font-bold uppercase tracking-wider text-gray-400 mt-5 mb-2.5">Perangkat Akses</h5>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-semibold text-gray-700 dark:text-gray-300">
                      <span className="flex items-center gap-1.5"><Smartphone className="h-4 w-4 text-emerald-600" /> Mobile / HP</span>
                      <span>{visitorStats.mobilePercentage}%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${visitorStats.mobilePercentage}%` }}></div>
                    </div>

                    <div className="flex items-center justify-between text-xs font-semibold text-gray-700 dark:text-gray-300 pt-1.5">
                      <span className="flex items-center gap-1.5"><Laptop className="h-4 w-4 text-blue-600" /> Desktop</span>
                      <span>{visitorStats.desktopPercentage}%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: `${visitorStats.desktopPercentage}%` }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* BARIS 4: RINCIAN PENDAFTAR SANTRI BARU */}
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5 sm:p-6 shadow-sm w-full">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-5">
                <div>
                  <h4 className="text-base sm:text-lg font-bold text-gray-800 dark:text-gray-100">Rincian Pendaftar Santri Baru</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Daftar calon santri yang terdaftar di database</p>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <div className="relative flex-1 sm:w-60">
                    <Search className="h-4 w-4 absolute left-3 top-2.5 text-gray-400" />
                    <input 
                      type="text" 
                      placeholder="Cari pendaftar..." 
                      value={searchPendaftarStat} 
                      onChange={(e) => setSearchPendaftarStat(e.target.value)}
                      className="w-full text-xs pl-9 pr-3 py-2 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-emerald-600"
                    />
                  </div>
                  <button type="button" onClick={() => setActivePage('pendaftar')} className="flex items-center gap-1 bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap cursor-pointer transition-all">
                    Kelola <ArrowUpRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto rounded-xl border dark:border-gray-800">
                <table className="w-full text-left border-collapse text-xs sm:text-sm min-w-[550px]">
                  <thead>
                    <tr className="border-b bg-gray-50 dark:bg-gray-800/60 font-semibold text-gray-600 dark:text-gray-400 text-xs uppercase tracking-wider">
                      <th className="p-3 sm:p-4">Nama Santri</th>
                      <th className="p-3 sm:p-4">Wali</th>
                      <th className="p-3 sm:p-4">Kontak HP</th>
                      <th className="p-3 sm:p-4">Tgl Daftar</th>
                      <th className="p-3 sm:p-4 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPendaftarStat.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="p-8 text-center text-gray-400">
                          <div className="flex flex-col items-center justify-center gap-2">
                            <Inbox className="h-8 w-8 text-gray-300 dark:text-gray-600" />
                            <span>Belum ada pendaftar yang terdaftar/cocok.</span>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      filteredPendaftarStat.slice(0, 5).map((item) => (
                        <tr key={item.id} className="border-b dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/30">
                          <td className="p-3 sm:p-4">
                            <span className="font-semibold text-gray-900 dark:text-gray-100 block">{item.nama_calon_santri}</span>
                            <span className="text-xs text-gray-400">{item.asal_sekolah || '-'}</span>
                          </td>
                          <td className="p-3 sm:p-4 text-gray-700 dark:text-gray-300">{item.nama_wali || '-'}</td>
                          <td className="p-3 sm:p-4 text-gray-500 dark:text-gray-400 text-xs">{item.no_hp_wali || '-'}</td>
                          <td className="p-3 sm:p-4 text-gray-400 text-xs whitespace-nowrap">{item.tanggal_daftar ? new Date(item.tanggal_daftar).toLocaleDateString('id-ID') : '-'}</td>
                          <td className="p-3 sm:p-4 text-center">
                            <span className={`inline-block text-[10px] font-bold px-2.5 py-1 rounded-full ${
                              item.status === 'Diterima' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-400' :
                              item.status === 'Ditolak' ? 'bg-red-100 text-red-800 dark:bg-red-950/60 dark:text-red-400' :
                              'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-400'
                            }`}>
                              {item.status || 'Menunggu'}
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* BARIS 5: LOG AKSES PENGUNJUNG REAL-TIME */}
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5 sm:p-6 shadow-sm w-full">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                <div>
                  <h4 className="text-base font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">
                    <Activity className="h-5 w-5 text-emerald-600 shrink-0" /> Log Aktivitas Akses Website Terakhir
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Pencatatan real-time pengunjung publik yang membuka halaman website</p>
                </div>
                <span className="self-start sm:self-auto text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-400">
                  ● Real-time Tracking
                </span>
              </div>

              <div className="overflow-x-auto rounded-xl border dark:border-gray-800">
                <table className="w-full text-left border-collapse text-xs min-w-[500px]">
                  <thead>
                    <tr className="border-b bg-gray-50 dark:bg-gray-800/60 font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                      <th className="p-3">Waktu</th>
                      <th className="p-3">IP Address</th>
                      <th className="p-3">Perangkat / Browser</th>
                      <th className="p-3">Halaman Dituju</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y dark:divide-gray-800">
                    {visitorLogs.length === 0 ? (
                      <tr>
                        <td colSpan="4" className="p-6 text-center text-gray-400">
                          Belum ada aktivitas lalu lintas pengunjung yang dicatat.
                        </td>
                      </tr>
                    ) : (
                      visitorLogs.map((log) => (
                        <tr key={log.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/30">
                          <td className="p-3 text-gray-400 font-medium">{log.time}</td>
                          <td className="p-3 font-mono text-gray-700 dark:text-gray-300">{log.ip}</td>
                          <td className="p-3 text-gray-600 dark:text-gray-400">{log.device}</td>
                          <td className="p-3 font-semibold text-emerald-600 dark:text-emerald-400">{log.page}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

      </div>
    </DashboardLayout>
  );
};

// Komponen Kartu Statistik
const StatCard = ({ title, count, icon: Icon, color }) => {
  const colorClasses = {
    emerald: "bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 border-emerald-200 dark:border-emerald-900/40",
    blue: "bg-blue-50 dark:bg-blue-950/20 text-blue-600 border-blue-200 dark:border-blue-900/40",
    amber: "bg-amber-50 dark:bg-amber-950/20 text-amber-600 border-amber-200 dark:border-amber-900/40",
    purple: "bg-purple-50 dark:bg-purple-950/20 text-purple-600 border-purple-200 dark:border-purple-900/40",
    rose: "bg-rose-50 dark:bg-rose-950/20 text-rose-600 border-rose-200 dark:border-rose-900/40",
  };

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-4 sm:p-5 rounded-xl shadow-sm flex items-center justify-between">
      <div>
        <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 block">{title}</span>
        <span className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-gray-100 mt-1 block">{count}</span>
      </div>
      <div className={`p-2.5 sm:p-3 rounded-xl border ${colorClasses[color]}`}>
        <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
      </div>
    </div>
  );
};

export default Dashboard;