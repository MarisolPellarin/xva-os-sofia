// Event constants
export const EVENT_DATE = new Date("2027-03-11T21:00:00-03:00");
export const EVENT_TITLE = "Mis Quince — Sofía";
export const EVENT_ADDRESS = "Carlos Pellegrini 157, Belén de Escobar";
export const EVENT_MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent(EVENT_ADDRESS);

export function googleCalendarUrl() {
  const fmt = (d: Date) =>
    d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const start = EVENT_DATE;
  const end = new Date(EVENT_DATE.getTime() + 6 * 60 * 60 * 1000);
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: EVENT_TITLE,
    dates: `${fmt(start)}/${fmt(end)}`,
    details: "¡Te espero para celebrar mis 15!",
    location: EVENT_ADDRESS,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
