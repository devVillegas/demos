import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Expand } from "lucide-react";
import { galleryImages } from "../data/mockData";
import SmartImage from "./SmartImage";

function Lightbox({ index, onClose, onNav }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onNav(-1);
      if (e.key === "ArrowRight") onNav(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, onNav]);

  const img = galleryImages[index];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[80] flex items-center justify-center bg-esmeralda-950/95 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={`Imagen ampliada: ${img.alt}`}
      onClick={onClose}
    >
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onNav(-1);
        }}
        className="absolute left-3 top-1/2 z-10 -translate-y-1/2 border border-arena-200/25 p-3 text-arena-100 transition-colors hover:border-dorado hover:text-dorado sm:left-8"
        aria-label="Imagen anterior"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      <motion.figure
        key={img.id}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="max-h-[86vh] w-full max-w-4xl"
        onClick={(e) => e.stopPropagation()}
      >
        <SmartImage
          src={img.src.replace("w=1400", "w=2000")}
          alt={img.alt}
          className="max-h-[76vh] w-full"
          imgClassName="object-contain"
        />
        <figcaption className="mt-4 text-center font-display text-lg italic text-arena-200/85">
          {img.alt}
        </figcaption>
      </motion.figure>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onNav(1);
        }}
        className="absolute right-3 top-1/2 z-10 -translate-y-1/2 border border-arena-200/25 p-3 text-arena-100 transition-colors hover:border-dorado hover:text-dorado sm:right-8"
        aria-label="Imagen siguiente"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      <button
        type="button"
        onClick={onClose}
        className="absolute right-3 top-3 border border-arena-200/25 p-2.5 text-arena-100 transition-colors hover:border-dorado hover:text-dorado sm:right-8 sm:top-6"
        aria-label="Cerrar galería"
      >
        <X className="h-5 w-5" />
      </button>
    </motion.div>
  );
}

export default function Gallery() {
  const [openIndex, setOpenIndex] = useState(null);

  const nav = (dir) => {
    setOpenIndex((i) => (i + dir + galleryImages.length) % galleryImages.length);
  };

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08 } }
  };
  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <section id="galeria" className="section-pad bg-arena-50 py-24 sm:py-32">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="mx-auto max-w-7xl"
      >
        <motion.div variants={item} className="mb-14 flex flex-col items-start gap-4">
          <p className="label-caps-dark">La galería</p>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="font-display text-4xl font-light text-esmeralda-900 sm:text-6xl">
              Fragmentos de la casa
            </h2>
            <p className="max-w-sm text-[14px] leading-relaxed text-tinta/70">
              Una edición visual, casi de revista: luz de madrugada, sal sobre
              la piel y madera que guarda historias.
            </p>
          </div>
          <span className="divider-line" />
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid auto-rows-[minmax(180px,auto)] grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-5"
        >
          {galleryImages.map((img, i) => (
            <motion.button
              key={img.id}
              variants={item}
              type="button"
              onClick={() => setOpenIndex(i)}
              className={`group relative overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-dorado ${img.span}`}
              aria-label={`Ampliar imagen: ${img.alt}`}
            >
              <SmartImage
                src={img.src}
                alt={img.alt}
                className={`h-full w-full ${img.ratio} md:absolute md:inset-0 md:aspect-auto`}
                imgClassName="transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <span className="absolute inset-0 bg-esmeralda-950/0 transition-colors duration-500 group-hover:bg-esmeralda-950/30" />
              <span className="absolute bottom-4 right-4 flex h-10 w-10 translate-y-2 items-center justify-center border border-arena-200/50 bg-esmeralda-950/60 text-arena-100 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                <Expand className="h-4 w-4" aria-hidden="true" />
              </span>
            </motion.button>
          ))}
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {openIndex !== null && (
          <Lightbox
            index={openIndex}
            onClose={() => setOpenIndex(null)}
            onNav={nav}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
