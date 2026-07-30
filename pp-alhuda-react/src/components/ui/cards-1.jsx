import * as React from "react";
import { cn } from "../../lib/utils";
import { Bookmark } from "lucide-react";

/**
 * ProductCard — komponen ini sudah aman, tidak ada bug (struktur <a> dan
 * <button> tidak nested, handleSaveClick sudah pakai preventDefault +
 * stopPropagation dengan benar sehingga klik tombol bookmark tidak ikut
 * memicu navigasi link).
 *
 * CATATAN: saat ini komponen ini di-import di Home.jsx
 * (`import { ProductCard } from "../components/ui/cards-1"`) tapi TIDAK
 * pernah dirender — section "Program Unggulan" di Home.jsx memakai markup
 * custom sendiri, bukan <ProductCard />. Kalau memang tidak dipakai, import
 * itu boleh dihapus dari Home.jsx. Kalau kamu berencana memakainya (mis.
 * untuk section Program Unggulan atau Galeri Foto), tinggal kabari, nanti
 * dipasangkan.
 */
const ProductCard = React.forwardRef(({ className, imageUrl, title, category, href, onSave, ...props }, ref) => {
  const handleSaveClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onSave) onSave();
  };

  return (
    <div
      ref={ref}
      className={cn(
        "group relative block overflow-hidden rounded-lg border bg-white text-gray-900 transition-all duration-300 ease-in-out hover:shadow-lg",
        className
      )}
      {...props}
    >
      <a href={href} aria-label={title}>
        <div className="aspect-square overflow-hidden bg-gray-100">
          <img
            src={imageUrl}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
          />
        </div>
        <div className="p-4">
          <h3 className="font-semibold leading-tight truncate">{title}</h3>
          <p className="mt-1 text-sm text-gray-500">{category}</p>
        </div>
      </a>

      <button
        type="button"
        className="absolute top-3 right-3 h-8 w-8 rounded-full opacity-0 bg-white/80 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100 flex items-center justify-center border border-gray-200 shadow-sm hover:bg-white active:scale-95"
        onClick={handleSaveClick}
        aria-label="Save item"
      >
        <Bookmark className="h-4 w-4 text-gray-600" />
      </button>
    </div>
  );
});

ProductCard.displayName = "ProductCard";

export { ProductCard };