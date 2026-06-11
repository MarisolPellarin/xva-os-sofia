import { CONFIG } from "./config";

export const EVENT_DATE = new Date(CONFIG.fecha);

export const EVENT_TITLE =
  `${CONFIG.titulo} — ${CONFIG.nombre}`;

export const EVENT_ADDRESS =
  CONFIG.direccion;

export const EVENT_MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent(EVENT_ADDRESS);

export function googleCalendarUrl() {
  const fmt = (d: Date) =>
    d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");

  const start = EVENT_DATE;

  const end = new Date(
    EVENT_DATE.getTime() +
      CONFIG.duracionHoras * 60 * 60 * 1000
  );

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: EVENT_TITLE,
    dates: `${fmt(start)}/${fmt(end)}`,
    details: CONFIG.mensajeCalendario,
    location: EVENT_ADDRESS,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}