import { useCallback, useState } from 'react';
import useLocalStorage from './hooks/useLocalStorage.js';
import Nav from './components/Nav.jsx';
import Hero from './components/Hero.jsx';
import Services from './components/Services.jsx';
import Team from './components/Team.jsx';
import Booking from './components/Booking.jsx';
import MyBookings, { ReservationsModal } from './components/MyBookings.jsx';
import Gallery from './components/Gallery.jsx';
import Footer from './components/Footer.jsx';
import DemoBadge from './components/DemoBadge.jsx';

function scrollToId(id) {
  const el = document.querySelector(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export default function App() {
  const [bookings, setBookings] = useLocalStorage([]);
  const [preselectedServiceId, setPreselectedServiceId] = useState(null);
  const [preselectedStylistId, setPreselectedStylistId] = useState(null);
  const [reservationsOpen, setReservationsOpen] = useState(false);

  const addBooking = useCallback(
    (booking) => {
      setBookings((prev) => [...prev, booking]);
    },
    [setBookings]
  );

  const cancelBooking = useCallback(
    (id) => {
      setBookings((prev) => prev.filter((b) => b.id !== id));
    },
    [setBookings]
  );

  const handleReset = useCallback(() => {
    try {
      window.localStorage.removeItem('asisnet_demo_peluqueria');
    } catch (error) {
      console.warn('No se pudo resetear la demo:', error);
    }
    window.location.reload();
  }, []);

  const handleReserveService = useCallback((serviceId) => {
    setPreselectedServiceId(serviceId);
    scrollToId('#agenda');
  }, []);

  const handleSelectStylist = useCallback((stylistId) => {
    setPreselectedStylistId(stylistId);
    if (stylistId) scrollToId('#agenda');
  }, []);

  return (
    <div className="min-h-screen bg-cream">
      <Nav />
      <main>
        <Hero />
        <Services onReserve={handleReserveService} />
        <Team selectedStylistId={preselectedStylistId} onSelect={handleSelectStylist} />
        <Booking
          preselectedServiceId={preselectedServiceId}
          preselectedStylistId={preselectedStylistId}
          bookings={bookings}
          onBooked={addBooking}
          onOpenReservations={() => setReservationsOpen(true)}
        />
        <MyBookings bookings={bookings} onCancel={cancelBooking} />
        <Gallery />
      </main>
      <Footer onReset={handleReset} />

      <DemoBadge count={bookings.length} onOpen={() => setReservationsOpen(true)} />
      <ReservationsModal
        open={reservationsOpen}
        bookings={bookings}
        onClose={() => setReservationsOpen(false)}
        onCancel={cancelBooking}
      />
    </div>
  );
}
