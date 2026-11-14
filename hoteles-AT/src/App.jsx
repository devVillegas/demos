import { useCallback, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { nightsBetween } from "./lib/pricing";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Gallery from "./components/Gallery";
import Suites from "./components/Suites";
import BookingModal from "./components/BookingModal";
import MyReservations from "./components/MyReservations";
import Services from "./components/Services";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";
import { DemoBadge, ReservationsDrawer } from "./components/DemoPanel";
import Toast from "./components/Toast";

export default function App() {
  const [reservations, setReservations, resetReservations] = useLocalStorage([]);
  const [dates, setDates] = useState({ checkIn: "", checkOut: "" });
  const [guests, setGuests] = useState(2);
  const [bookingSuite, setBookingSuite] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [toast, setToast] = useState(null);

  const nights = nightsBetween(dates.checkIn, dates.checkOut);

  const showToast = useCallback((title, detail) => {
    const id = Date.now();
    setToast({ id, title, detail });
    window.setTimeout(() => {
      setToast((t) => (t && t.id === id ? null : t));
    }, 3800);
  }, []);

  const scrollTo = useCallback((id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const handleSearch = useCallback(() => {
    scrollTo("suites");
  }, [scrollTo]);

  const handleConfirm = useCallback(
    (reservation) => {
      setReservations((prev) => [reservation, ...prev]);
      showToast(
        "Reserva guardada",
        `Código ${reservation.code} · visible en «Mis reservas»`
      );
    },
    [setReservations, showToast]
  );

  const handleCancel = useCallback(
    (id) => {
      setReservations((prev) => prev.filter((r) => r.id !== id));
      showToast("Reserva cancelada", "El registro se eliminó de la demo");
    },
    [setReservations, showToast]
  );

  const openDrawer = useCallback(() => {
    setDrawerOpen(true);
    scrollTo("mis-reservas");
  }, [scrollTo]);

  return (
    <div className="min-h-screen bg-arena-50">
      <Navbar onMisReservas={openDrawer} />

      <main>
        <Hero
          dates={dates}
          guests={guests}
          onDates={setDates}
          onGuests={setGuests}
          onSearch={handleSearch}
        />

        <Suites
          dates={dates}
          guests={guests}
          nights={nights}
          onReserve={setBookingSuite}
        />

        <Gallery />

        <MyReservations
          reservations={reservations}
          onCancel={handleCancel}
          emptyNote="Cuando confirmes una reserva aparecerá aquí al instante, guardada en tu navegador."
        />

        <Services />
        <Testimonials />
      </main>

      <Footer />

      <DemoBadge onClick={() => setDrawerOpen(true)} />

      <ReservationsDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        reservations={reservations}
        onCancel={handleCancel}
      />

      <AnimatePresence>
        {bookingSuite && (
          <BookingModal
            key={bookingSuite.id}
            suite={bookingSuite}
            dates={dates}
            guests={guests}
            onClose={() => setBookingSuite(null)}
            onConfirm={handleConfirm}
          />
        )}
      </AnimatePresence>

      <Toast toast={toast} />
    </div>
  );
}
