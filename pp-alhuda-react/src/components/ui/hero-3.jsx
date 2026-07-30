import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";
import Silk from "./Silk";

/**
 * Tombol aksi utama Hero. Dibuat sebagai <a> supaya bisa
 * langsung dipakai untuk navigasi (mis. ke halaman pendaftaran).
 */
const ActionButton = ({ children, href = "#" }) => (
  <motion.a
    href={href}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="mt-8 inline-block px-8 py-3 rounded-full bg-amber-500 text-emerald-950 font-extrabold shadow-xl transition-colors hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-300 focus:ring-opacity-75 cursor-pointer"
  >
    {children}
  </motion.a>
);

export const AnimatedMarqueeHero = ({
  tagline,
  title,
  description,
  ctaText,
  ctaHref = "#",
  images = [],
  className,
}) => {
  const FADE_IN_ANIMATION_VARIANTS = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } },
  };

  const duplicatedImages = [...images, ...images];

  return (
    <section
      id="home"
      className={cn(
        "relative w-full min-h-screen overflow-hidden flex flex-col items-center justify-center text-center px-4 pt-28 pb-12",
        className
      )}
    >
      {/* ─── 1. BACKGROUND CANVAS SILK ─── */}
      <div className="absolute inset-0 z-0 w-full h-full">
        <Silk
          speed={3.5}
          scale={1.2}
          color="#023820" // Warna hijau gelap khas pondok
          noiseIntensity={1.2}
          rotation={0.2}
        />
        {/* Dark Overlay untuk menjaga keterbacaan teks */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-stone-900/80 pointer-events-none" />
      </div>

      {/* ─── 2. KONTEN TEKS UTAMA ─── */}
      <div className="z-20 flex flex-col items-center max-w-4xl mx-auto">
        {/* Tagline */}
        {tagline && (
          <motion.div
            initial="hidden"
            animate="show"
            variants={FADE_IN_ANIMATION_VARIANTS}
            className="mb-4 inline-block rounded-full border border-amber-400/40 bg-amber-400/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-amber-300 backdrop-blur-md shadow-sm"
          >
            {tagline}
          </motion.div>
        )}

        {/* Judul Utama */}
        <motion.h1
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.1 } },
          }}
          className="heading-font text-4xl md:text-6xl font-extrabold tracking-tight text-white leading-tight drop-shadow-md"
        >
          {typeof title === "string" ? (
            title.split(" ").map((word, i) => (
              <motion.span key={i} variants={FADE_IN_ANIMATION_VARIANTS} className="inline-block">
                {word}&nbsp;
              </motion.span>
            ))
          ) : (
            title
          )}
        </motion.h1>

        {/* Deskripsi */}
        {description && (
          <motion.p
            initial="hidden"
            animate="show"
            variants={FADE_IN_ANIMATION_VARIANTS}
            transition={{ delay: 0.4 }}
            className="mt-6 max-w-xl text-sm md:text-base text-emerald-100/90 font-normal leading-relaxed drop-shadow"
          >
            {description}
          </motion.p>
        )}

        {/* Tombol CTA */}
        {ctaText && (
          <motion.div
            initial="hidden"
            animate="show"
            variants={FADE_IN_ANIMATION_VARIANTS}
            transition={{ delay: 0.5 }}
          >
            <ActionButton href={ctaHref}>{ctaText}</ActionButton>
          </motion.div>
        )}
      </div>

      {/* ─── 3. MARQUEE GAMBAR BERJALAN ─── */}
      {images.length > 0 && (
        <div className="absolute bottom-0 left-0 w-full h-1/3 md:h-2/5 z-10 pointer-events-none [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)]">
          <motion.div
            className="flex gap-4"
            animate={{
              x: ["0%", "-50%"],
              transition: {
                ease: "linear",
                duration: 40,
                repeat: Infinity,
              },
            }}
          >
            {duplicatedImages.map((src, index) => (
              <div
                key={index}
                className="relative aspect-[3/4] h-40 md:h-56 flex-shrink-0"
                style={{ rotate: `${index % 2 === 0 ? -2 : 5}deg` }}
              >
                <img
                  src={src}
                  alt={`Dokumentasi kegiatan pondok ${index + 1}`}
                  className="w-full h-full object-cover rounded-2xl shadow-2xl border border-white/20"
                />
              </div>
            ))}
          </motion.div>
        </div>
      )}
    </section>
  );
};

export default AnimatedMarqueeHero;