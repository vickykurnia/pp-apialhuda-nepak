import { useEffect } from "react";

/**
 * Modal profil sekolah (SMP / MA).
 * Dipanggil dari Home.jsx saat tombol "Lihat Selengkapnya" pada
 * kartu Unit Pendidikan diklik.
 *
 * Props:
 *  - sekolah: object | null  -> null = modal tertutup
 *      { nama, logo, jenjang, deskripsi, visi, misi: [], kepalaSekolah, fotoKepsek, akreditasi }
 *  - onClose: () => void
 */
export function SekolahModal({ sekolah, onClose }) {
  // Tutup modal dengan tombol ESC + kunci scroll body saat modal terbuka
  useEffect(() => {
    if (!sekolah) return;
    const handleKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [sekolah, onClose]);

  if (!sekolah) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl shadow-2xl relative animate-in fade-in zoom-in-95"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-emerald-800 text-white p-6 rounded-t-2xl flex items-center gap-4 sticky top-0 z-10">
          <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center overflow-hidden shrink-0 shadow-md">
            <img src={sekolah.logo} alt={`Logo ${sekolah.nama}`} className="w-full h-full object-contain p-1.5" />
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-widest text-emerald-200 font-semibold">
              {sekolah.jenjang}
            </span>
            <h2 className="text-lg md:text-xl font-bold heading-font leading-tight">{sekolah.nama}</h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Tutup"
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-4 h-4">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6 text-sm text-gray-700">
          {/* Profil singkat */}
          <div>
            <h3 className="text-emerald-800 font-bold text-xs uppercase tracking-wider mb-2">Profil Sekolah</h3>
            <p className="leading-relaxed text-justify">{sekolah.deskripsi}</p>
            {sekolah.akreditasi && (
              <p className="mt-2 text-xs text-gray-500">
                Akreditasi: <span className="font-semibold text-emerald-700">{sekolah.akreditasi}</span>
              </p>
            )}
          </div>

          {/* Visi */}
          <div>
            <h3 className="text-emerald-800 font-bold text-xs uppercase tracking-wider mb-2">Visi</h3>
            <p className="leading-relaxed italic border-l-4 border-amber-400 pl-3 text-gray-600">
              {sekolah.visi}
            </p>
          </div>

          {/* Misi */}
          <div>
            <h3 className="text-emerald-800 font-bold text-xs uppercase tracking-wider mb-2">Misi</h3>
            <ul className="space-y-1.5 list-none">
              {sekolah.misi.map((item, idx) => (
                <li key={idx} className="flex gap-2 leading-relaxed">
                  <span className="text-amber-500 font-bold shrink-0">{idx + 1}.</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Kepala Sekolah */}
          <div className="flex items-center gap-4 bg-stone-50 border border-gray-100 rounded-xl p-4">
            <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-200 shrink-0">
              <img
                src={sekolah.fotoKepsek}
                alt={sekolah.kepalaSekolah}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="text-emerald-800 font-bold text-xs uppercase tracking-wider mb-1">Kepala Sekolah</h3>
              <p className="font-bold text-emerald-950">{sekolah.kepalaSekolah}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SekolahModal;