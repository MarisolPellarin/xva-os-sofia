import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  orderBy,
  query,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { db } from "./firebase";

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

const RSVPS_COLLECTION = "rsvps";

export async function getRsvps(): Promise<Rsvp[]> {
  const q = query(
    collection(db, RSVPS_COLLECTION),
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((documento) => {
    const data = documento.data();

    return {
      id: documento.id,
      nombre: data.nombre || "",
      apellido: data.apellido || "",
      telefono: data.telefono || "",
      asistencia: data.asistencia || "si",
      mensaje: data.mensaje || "",
      createdAt:
        data.createdAt instanceof Timestamp
          ? data.createdAt.toDate().toISOString()
          : new Date().toISOString(),
    };
  });
}

export async function saveRsvp(
  input: Omit<Rsvp, "id" | "createdAt">
): Promise<void> {
  await addDoc(collection(db, RSVPS_COLLECTION), {
    ...input,
    createdAt: serverTimestamp(),
  });
}

export async function deleteRsvp(id: string): Promise<void> {
  await deleteDoc(doc(db, RSVPS_COLLECTION, id));
}