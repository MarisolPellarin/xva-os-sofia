import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";
import hero4 from "@/assets/hero-4.jpg";

/*
====================================================
CONFIGURACIÓN GENERAL DEL EVENTO

EDITAR SOLAMENTE LOS VALORES DE ABAJO

====================================================

nombre
titulo
fecha
direccion
hashtag
spotify
aliasRegalo

====================================================
*/

export const CONFIG = {
  // ============================================
  // DATOS PRINCIPALES
  // ============================================

  nombre: "Sofía",

  titulo: "Mis Quince",

  fecha: "2027-03-11T21:00:00-03:00",

  direccion: "Carlos Pellegrini 157, Belén de Escobar",

  // ============================================
  // REDES
  // ============================================

  hashtag: "#XVdeSofia",

  spotify: "",

  // ============================================
  // REGALOS
  // ============================================

  aliasRegalo: "",

  cbu: "",

  titularCuenta: "",

  // ============================================
  // TEXTOS
  // ============================================

  mensajeCalendario:
    "¡Te espero para celebrar mis 15!",

  mensajeInvitacion:
    "Te espero para compartir una noche inolvidable.",

  // ============================================
  // CONFIGURACIÓN DEL EVENTO
  // ============================================

  duracionHoras: 6,

  // ============================================
  // ITINERARIO (hora, titulo, descripcion)
  // ============================================
  itinerario: [
    { hora: "21:00", titulo: "Recepción", desc: "Bienvenida y cóctel de honor" },
    { hora: "22:00", titulo: "Cena", desc: "Servida en el salón principal" },
    { hora: "23:30", titulo: "Vals & Brindis", desc: "Momento especial" },
    { hora: "00:00", titulo: "Fiesta", desc: "¡A bailar hasta el final!" },
    { hora: "03:30", titulo: "Cierre", desc: "Mesa dulce y despedida" },
  ],

  // ============================================
  // DATOS BANCARIOS (para mostrar en Regalos)
  // ============================================
  bank: {
    nombre: "Banco Galicia",
    titular: "Sofía Pérez",
    cbu: "0070123456789012345678",
    alias: "sofi.quince.2027",
    cuit: "27-12345678-9",
  },

  // ============================================
  // FOTOS DE LA GALERÍA PRINCIPAL
  // ============================================
  images: [
    { src: hero1, alt: "Retrato" },
    { src: hero2, alt: "Flores" },
    { src: hero3, alt: "Mesa" },
    { src: hero4, alt: "Fiesta" },
  ],
};