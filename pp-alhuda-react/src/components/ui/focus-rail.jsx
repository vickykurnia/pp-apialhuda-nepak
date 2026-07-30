"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

function wrap(min, max, v) {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
}

const BASE_SPRING = {
  type: "spring",
  stiffness: 300,
  damping: 30,
  mass: 1,
};

const TAP_SPRING = {
  type: "spring",
  stiffness: 450,
  damping: 18,
  mass: 1,
};

export function FocusRail({
  items = [],
  initialIndex = 0,
  loop = true,
  autoPlay = false,
  interval = 4000,
  className,
  compact = false,
}) {
  const [active, setActive] = React.useState(initialIndex);
  const [isHovering, setIsHovering] = React.useState(false);
  const lastWheelTime = React.useRef(0);

  const count = items.length;
  const activeIndex = wrap(0, count, active);
  const activeItem = items[activeIndex];

  const handlePrev = React.useCallback(() => {
    if (!loop && active === 0) return;
    setActive((p) => p - 1);
  }, [loop, active]);

  const handleNext = React.useCallback(() => {
    if (!loop && active === count - 1) return;
    setActive((p) => p + 1);
  }, [loop, active, count]);

  const onWheel = React.useCallback(
    (e) => {
      const now = Date.now();
      if (now - lastWheelTime.current < 400) return;

      const isHorizontal = Math.abs(e.deltaX) > Math.abs(e.deltaY);
      const delta = isHorizontal ? e.deltaX : e.deltaY;

      if (Math.abs(delta) > 20) {
        if (delta > 0) {
          handleNext();
        } else {
          handlePrev();
        }
        lastWheelTime.current = now;
      }
    },
    [handleNext, handlePrev]
  );

  React.useEffect(() => {
    if (!autoPlay || isHovering || count === 0) return;
    const timer = setInterval(() => handleNext(), interval);
    return () => clearInterval(timer);
  }, [autoPlay, isHovering, handleNext, interval, count]);

  const onKeyDown = (e) => {
    if (e.key === "ArrowLeft") handlePrev();
    if (e.key === "ArrowRight") handleNext();
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
  };

  const onDragEnd = (e, { offset, velocity }) => {
    const swipe = swipePower(offset.x, velocity.x);

    if (swipe < -swipeConfidenceThreshold) {
      handleNext();
    } else if (swipe > swipeConfidenceThreshold) {
      handlePrev();
    }
  };

  if (!count || !activeItem) return null;

  const visibleIndices = [-2, -1, 0, 1, 2];

  return (
    <div
      className={cn(
        "group relative flex w-full h-full flex-col overflow-hidden bg-neutral-950 text-white outline-none select-none overflow-x-hidden rounded-2xl shadow-2xl border border-white/10",
        className
      )}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      tabIndex={0}
      onKeyDown={onKeyDown}
      onWheel={onWheel}
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={`bg-${activeItem.id || activeIndex}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <img
              src={activeItem.imageSrc || activeItem.url}
              alt=""
              className="h-full w-full object-cover blur-3xl saturate-200"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/60 to-transparent" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Main Stage */}
      <div className="relative z-10 flex flex-1 flex-col justify-between p-4 sm:p-6">
        
        {/* DRAGGABLE RAIL CONTAINER */}
        <motion.div
          className="relative mx-auto flex w-full max-w-5xl items-center justify-center perspective-[1200px] cursor-grab active:cursor-grabbing my-auto h-[400px] sm:h-[460px]"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={onDragEnd}
        >
          {visibleIndices.map((offset) => {
            const absIndex = active + offset;
            const index = wrap(0, count, absIndex);
            const item = items[index];

            if (!loop && (absIndex < 0 || absIndex >= count)) return null;

            const isCenter = offset === 0;
            const dist = Math.abs(offset);

            const xOffset = offset * (compact ? 250 : 330);
            const zOffset = -dist * (compact ? 160 : 200);
            const scale = isCenter ? 1 : 0.76;
            const rotateY = offset * -15;

            const opacity = isCenter ? 1 : Math.max(0.15, 1 - dist * 0.5);
            const blur = isCenter ? 0 : dist * 6;
            const brightness = isCenter ? 1 : 0.4;

            return (
              <motion.div
                key={absIndex}
                className={cn(
                  "absolute rounded-2xl border border-white/20 bg-neutral-900/90 shadow-2xl transition-shadow duration-300 overflow-hidden flex items-center justify-center p-1",
                  // KARTU DIPERLEBAR DENGAN PROPORSI KETINGGIAN SANGAT PAS
                  compact 
                    ? "w-[290px] sm:w-[380px] h-[340px] sm:h-[400px]" 
                    : "w-[310px] sm:w-[440px] md:w-[500px] h-[360px] sm:h-[440px]",
                  isCenter ? "z-20 ring-2 ring-emerald-500/50 shadow-emerald-950/70" : "z-10"
                )}
                initial={false}
                animate={{
                  x: xOffset,
                  z: zOffset,
                  scale: scale,
                  rotateY: rotateY,
                  opacity: opacity,
                  filter: `blur(${blur}px) brightness(${brightness})`,
                }}
                transition={(val) => {
                  if (val === "scale") return TAP_SPRING;
                  return BASE_SPRING;
                }}
                style={{
                  transformStyle: "preserve-3d",
                }}
                onClick={() => {
                  if (offset !== 0) setActive((p) => p + offset);
                }}
              >
                {/* 
                  MENGGUNAKAN object-contain DENGAN RENDER LATAR BELAKANG TERANG / PRESISI
                  AGAR TULISAN HEADER KOP/FLYER DI BAGIAN ATAS TIDAK PERNAH TERPOTONG
                */}
                <img
                  src={item.imageSrc || item.url}
                  alt={item.title || "Foto Kegiatan"}
                  className="h-full w-full object-contain rounded-xl pointer-events-none"
                />

                <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-black/30 pointer-events-none rounded-xl" />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Info & Controls */}
        <div className="mx-auto flex w-full max-w-4xl flex-col items-center justify-between gap-3 md:flex-row pointer-events-auto shrink-0 pt-2 border-t border-white/10 mt-2">
          <div className="flex flex-1 flex-col items-center text-center md:items-start md:text-left justify-center min-h-[50px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeItem.id || activeIndex}
                initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
                transition={{ duration: 0.3 }}
                className="space-y-0.5"
              >
                {activeItem.meta && (
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-400 block">
                    {activeItem.meta}
                  </span>
                )}
                <h2 className="font-bold tracking-tight text-white font-serif text-base sm:text-lg md:text-xl">
                  {activeItem.title}
                </h2>
                {activeItem.description && (
                  <p className="max-w-lg text-neutral-300 font-light text-xs line-clamp-1">
                    {activeItem.description}
                  </p>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="flex items-center gap-1 rounded-full bg-neutral-900/90 p-1.5 ring-1 ring-white/15 backdrop-blur-md">
              <button
                onClick={handlePrev}
                type="button"
                className="rounded-full p-2 text-neutral-300 transition hover:bg-white/10 hover:text-white active:scale-95 cursor-pointer"
                aria-label="Previous"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span className="min-w-[40px] text-center text-xs font-mono text-neutral-400 font-semibold">
                {activeIndex + 1} / {count}
              </span>
              <button
                onClick={handleNext}
                type="button"
                className="rounded-full p-2 text-neutral-300 transition hover:bg-white/10 hover:text-white active:scale-95 cursor-pointer"
                aria-label="Next"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            {activeItem.href && (
              <a
                href={activeItem.href}
                className="group flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-bold text-black transition-transform hover:scale-105 active:scale-95"
              >
                Explore
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

export default FocusRail;