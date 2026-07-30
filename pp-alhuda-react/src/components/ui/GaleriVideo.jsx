import { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Galeri Video — versi "thumbnail slider" (Embla carousel + strip thumbnail).
 * items: [{ id, title, desc, url (mp4), poster (thumbnail, opsional) }]
 */

// Memaksa browser mereproduksi frame pertama video agar tidak terlihat hitam polos.
function primeFirstFrame(videoEl) {
  if (!videoEl) return;
  const trySeek = () => {
    if (videoEl.readyState >= 1 && videoEl.currentTime === 0) {
      try {
        videoEl.currentTime = 0.1;
      } catch (e) {}
    }
  };
  if (videoEl.readyState >= 1) {
    trySeek();
  } else {
    videoEl.addEventListener("loadedmetadata", trySeek, { once: true });
  }
}

function MainSlide({ item, isActive }) {
  const videoRef = useRef(null);
  const bgVideoRef = useRef(null);

  // Memuat ulang data video setiap kali URL media berubah
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      primeFirstFrame(videoRef.current);
    }
    if (bgVideoRef.current) {
      bgVideoRef.current.load();
      primeFirstFrame(bgVideoRef.current);
    }
  }, [item.url]);

  // Mengontrol pemutaran video aktif/nonaktif saat slide berganti
  useEffect(() => {
    if (!videoRef.current) return;
    if (isActive) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
      if (bgVideoRef.current) {
        bgVideoRef.current.currentTime = 0;
        bgVideoRef.current.play().catch(() => {});
      }
    } else {
      videoRef.current.pause();
      if (bgVideoRef.current) bgVideoRef.current.pause();
    }
  }, [isActive]);

  return (
    <div className="relative h-full w-full rounded-xl overflow-hidden bg-black">
      {/* Background blur untuk mengisi ruang kosong video bertipe portrait */}
      <video
        ref={bgVideoRef}
        src={item.url}
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
        tabIndex={-1}
        className="absolute inset-0 h-full w-full object-cover scale-110 blur-2xl opacity-50 pointer-events-none"
      />

      {/* Video Utama (object-contain) */}
      <video
        ref={videoRef}
        key={item.id || item.url}
        src={item.url}
        poster={item.poster}
        className="relative z-10 h-full w-full object-contain"
        muted
        loop
        playsInline
        controls
        preload="metadata"
      />

      {/* 
        JUDUL & DESKRIPSI (OVERLAY BAGIAN ATAS / TOP-0)
        Dipindahkan ke posisi atas dengan gradien gelap agar TIDAK BERTUMPUK 
        dengan kontrol bawaan pemutar video (play, volume, timeline) di bagian bawah.
      */}
      <div className="absolute z-20 top-0 left-0 right-0 p-3 md:p-5 bg-gradient-to-b from-black/80 via-black/40 to-transparent pointer-events-none">
        <h3 className="text-white text-sm md:text-base font-bold drop-shadow-md line-clamp-1">
          {item.title}
        </h3>
        {item.desc && (
          <p className="text-white/80 text-xs mt-0.5 font-light drop-shadow line-clamp-1">
            {item.desc}
          </p>
        )}
      </div>
    </div>
  );
}

export function GaleriVideoGrid({ items = [] }) {
  const [mainRef, mainApi] = useEmblaCarousel({ loop: false });
  const [thumbRef, thumbApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onThumbClick = useCallback(
    (index) => {
      if (!mainApi || !thumbApi) return;
      mainApi.scrollTo(index);
    },
    [mainApi, thumbApi]
  );

  const onSelect = useCallback(() => {
    if (!mainApi || !thumbApi) return;
    const index = mainApi.selectedScrollSnap();
    setSelectedIndex(index);
    thumbApi.scrollTo(index);
  }, [mainApi, thumbApi]);

  useEffect(() => {
    if (!mainApi) return;
    onSelect();
    mainApi.on("select", onSelect);
    mainApi.on("reInit", onSelect);
    return () => {
      mainApi.off("select", onSelect);
    };
  }, [mainApi, onSelect]);

  const scrollPrev = useCallback(() => mainApi?.scrollPrev(), [mainApi]);
  const scrollNext = useCallback(() => mainApi?.scrollNext(), [mainApi]);

  if (!items || items.length === 0) return null;

  return (
    <div className="max-w-5xl mx-auto">
      {/* Slide utama */}
      <div className="relative">
        <div className="overflow-hidden rounded-xl" ref={mainRef}>
          <div className="flex">
            {items.map((item, index) => (
              <div
                key={item.id || index}
                className="relative shrink-0 grow-0 basis-full h-[280px] sm:h-[420px] md:h-[520px] pl-0"
              >
                <MainSlide item={item} isActive={index === selectedIndex} />
              </div>
            ))}
          </div>
        </div>

        {/* Tombol Navigasi Slider Utama */}
        <button
          onClick={scrollPrev}
          type="button"
          aria-label="Video sebelumnya"
          className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 text-white shadow-md flex items-center justify-center backdrop-blur-sm border border-white/20 transition-all z-30 cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={scrollNext}
          type="button"
          aria-label="Video berikutnya"
          className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 text-white shadow-md flex items-center justify-center backdrop-blur-sm border border-white/20 transition-all z-30 cursor-pointer"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Strip thumbnail */}
      <div className="overflow-hidden mt-3" ref={thumbRef}>
        <div className="flex gap-2">
          {items.map((item, index) => (
            <button
              key={item.id || index}
              onClick={() => onThumbClick(index)}
              type="button"
              className={`relative shrink-0 w-24 h-16 sm:w-32 sm:h-20 rounded-lg overflow-hidden border-2 transition-all cursor-pointer bg-stone-900 ${
                index === selectedIndex
                  ? "border-amber-500 shadow-md scale-105"
                  : "border-transparent opacity-60 hover:opacity-100"
              }`}
            >
              {item.poster ? (
                <img
                  src={item.poster}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <video
                  src={item.url}
                  className="w-full h-full object-cover pointer-events-none"
                  muted
                  preload="metadata"
                  ref={(el) => primeFirstFrame(el)}
                />
              )}
              <span className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-[10px] px-1.5 py-0.5 truncate text-left">
                {item.title}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default GaleriVideoGrid;