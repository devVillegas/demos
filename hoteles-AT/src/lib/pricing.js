/**
 * Utilidades de fechas y precios para el flujo de reservas.
 */

export const IVA_HOSPEDAJE = 0.16;
export const DESAYUNO_POR_PERSONA_NOCHE = 12;

export function formatDate(dateStr) {
  if (!dateStr) return "—";
  const [y, m, d] = dateStr.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  return date.toLocaleDateString("es-VE", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
}

export function addDaysStr(dateStr, days) {
  if (!dateStr) return "";
  const [y, m, d] = dateStr.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  date.setDate(date.getDate() + days);
  const yy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${yy}-${mm}-${dd}`;
}

export function todayStr() {
  const now = new Date();
  const yy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  return `${yy}-${mm}-${dd}`;
}

export function nightsBetween(checkIn, checkOut) {
  if (!checkIn || !checkOut) return 0;
  const a = new Date(`${checkIn}T00:00:00`);
  const b = new Date(`${checkOut}T00:00:00`);
  const diff = Math.round((b - a) / 86400000);
  return Number.isFinite(diff) && diff > 0 ? diff : 0;
}

export function validateDates(checkIn, checkOut) {
  if (!checkIn || !checkOut) {
    return "Selecciona las fechas de llegada y salida.";
  }
  if (nightsBetween(checkIn, checkOut) < 1) {
    return "La fecha de salida debe ser posterior a la de llegada.";
  }
  const t = todayStr();
  if (checkIn < t) {
    return "La fecha de llegada no puede ser en el pasado.";
  }
  return null;
}

const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
  maximumFractionDigits: 2
});

export function formatUSD(n) {
  return usd.format(n);
}

/**
 * Desglose de precio de una estadía.
 * Tarifa × noches + desayuno opcional (por persona y noche) + IVA 16% de hospedaje.
 */
export function calcBreakdown({ rate, nights, guests, withBreakfast }) {
  const room = rate * nights;
  const breakfast = withBreakfast ? DESAYUNO_POR_PERSONA_NOCHE * guests * nights : 0;
  const iva = room * IVA_HOSPEDAJE;
  const total = room + breakfast + iva;
  return { room, breakfast, iva, total };
}

export function generateReservationCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return `CDV-${code}`;
}
