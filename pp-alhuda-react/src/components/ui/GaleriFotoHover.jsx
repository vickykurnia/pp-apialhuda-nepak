import { useState } from "react";

export default function GaleriFotoHover({ title, description, items = [] }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section className="w-full flex flex-col items-center justify-start">
      {(title || description) && (
        <div className="max-w-2xl text-center mx-auto px-4 mb-8">
          {title && (
            <h2 className="heading-font text-2xl md:text-3xl font-bold text-emerald-900 opacity-100">
              {title}
            </h2>
          )}
          {description && (
            <p className="text-gray-500 text-xs md:text-sm mt-2 leading-relaxed">
              {description}
            </p>
          )}
          <div className="w-12 h-0.5 bg-amber-400 mx-auto mt-3 rounded-full"></div>
        </div>
      )}

      {/* CONTAINER DIPERBESAR TINGGINYA JADI 520px & UKURAN CARD LEBIH LAPANG */}
      <div className="flex items-stretch gap-3 h-[520px] w-full px-2 sm:px-0 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300">
        {items.map((item, idx) => (
          <div
            key={item.id ?? idx}
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
            className={`relative group flex-grow transition-all duration-500 ease-out rounded-2xl overflow-hidden shrink-0 shadow-md border border-black/10
              ${hoveredIndex === idx ? "w-full sm:w-[540px]" : "w-48 sm:w-64"}`}
          >
            <img
              src={item.url}
              alt={item.title}
              className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex flex-col justify-end p-5">
              <h3 className="text-white font-bold text-base sm:text-lg heading-font drop-shadow-md">
                {item.title}
              </h3>
              {item.desc && (
                <p className="text-white/90 text-xs sm:text-sm mt-1 line-clamp-2 font-light drop-shadow">
                  {item.desc}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}