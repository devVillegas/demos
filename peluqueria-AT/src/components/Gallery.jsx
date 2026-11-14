import { motion } from 'framer-motion';
import SmartImage from './SmartImage.jsx';
import { GALLERY, TESTIMONIALS } from '../data/mockData.js';

const galleryContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const galleryItem = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

export default function Gallery() {
  return (
    <section id="galeria" className="relative bg-cream-deep/60 py-24 sm:py-32">
      <div className="container-editorial">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center"
        >
          <p className="overline-label mb-4">El lugar</p>
          <h2 className="display-italic text-4xl leading-tight text-ink sm:text-5xl md:text-6xl">
            Un rincón sereno en Los Palos Grandes
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="fine-line mx-auto mt-8 max-w-md origin-center"
          />
        </motion.div>

        <motion.div
          variants={galleryContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-3"
        >
          {GALLERY.map((photo, index) => (
            <motion.figure
              key={photo.id}
              variants={galleryItem}
              className={`group relative overflow-hidden ${
                index === 0 ? 'col-span-2 aspect-[16/10]' : 'aspect-square'
              }`}
            >
              <SmartImage
                src={photo.image}
                alt={photo.alt}
                gradient={photo.gradient}
                seed={index}
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <figcaption className="absolute bottom-4 left-4 right-4 translate-y-3 font-body text-[11px] font-medium uppercase tracking-widest2 text-cream opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                {photo.caption}
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>

        <div className="mt-24">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
            className="mb-14 text-center"
          >
            <p className="overline-label mb-4">Voces de la casa</p>
            <h2 className="display-italic text-4xl leading-tight text-ink sm:text-5xl">
              Lo que dicen quienes nos visitan
            </h2>
          </motion.div>

          <motion.div
            variants={galleryContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
          >
            {TESTIMONIALS.map((t, index) => (
              <motion.blockquote
                key={t.id}
                variants={galleryItem}
                className="flex flex-col border-t-2 border-gold/50 bg-cream-soft p-6 shadow-card transition-all duration-500 hover:-translate-y-1 hover:shadow-editorial"
              >
                <span
                  aria-hidden="true"
                  className="display-italic -mb-2 text-6xl leading-none text-powder/60"
                >
                  {index % 2 === 0 ? '«' : '“'}
                </span>
                <p className="flex-1 font-body text-sm font-light leading-relaxed text-ink">
                  {t.quote}
                </p>
                <footer className="mt-6 border-t border-ink/10 pt-4">
                  <p className="display-italic text-xl text-ink">{t.author}</p>
                  <p className="mt-1 font-body text-[11px] uppercase tracking-widest2 text-ink-faint">
                    {t.service} · {t.role}
                  </p>
                </footer>
              </motion.blockquote>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
