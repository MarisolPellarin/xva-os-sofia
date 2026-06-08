export type RsvpStatus = "si" | "no";

export interface Rsvp {
  id: string;
  nombre: string;
  apellido: string;
  telefono: string;
  asistencia: RsvpStatus;
  mensaje: string;
  createdAt: string;
}

const KEY = "quince_rsvps_v1";

export function getRsvps(): Rsvp[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Rsvp[]) : [];
  } catch {
    return [];
  }
}

export function saveRsvp(input: Omit<Rsvp, "id" | "createdAt">): Rsvp {
  const all = getRsvps();
  const rsvp: Rsvp = {
    ...input,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  localStorage.setItem(KEY, JSON.stringify([rsvp, ...all]));
  return rsvp;
}

export function deleteRsvp(id: string) {
  const all = getRsvps().filter((r) => r.id !== id);
  localStorage.setItem(KEY, JSON.stringify(all));
}

const AUTH_KEY = "quince_admin_auth_v1";
export const ADMIN_USER = "admin";
export const ADMIN_PASS = "quince2027";

export function isAdminAuthed(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(AUTH_KEY) === "1";
}
export function setAdminAuthed(v: boolean) {
  if (v) localStorage.setItem(AUTH_KEY, "1");
  else localStorage.removeItem(AUTH_KEY);
}
