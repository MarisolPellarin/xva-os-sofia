import { createFileRoute, Link } from "@tanstack/react-router";
import { Carousel } from "@/components/Carousel";
import { Countdown } from "@/components/Countdown";
import { RsvpModal } from "@/components/RsvpModal";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  CalendarPlus,
  Gift,
  Mail,
  Building2,
  Lock,
} from "lucide-react";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";
import hero4 from "@/assets/hero-4.jpg";
import {
  EVENT_ADDRESS,
  EVENT_DATE,
  EVENT_MAPS_URL,
  googleCalendarUrl,
} from "@/lib/event";

export const Route = createFileRoute("/")({
  component: Landing,
});

const IMAGES = [
  { src: hero1, alt: "Retrato" },
  { src: hero2, alt: "Flores" },
  { src: hero3, alt: "Mesa" },
  { src: hero4, alt: "Fiesta" },
];

const ITINERARIO = [
  { hora: "21:00", titulo: "Recepción", desc: "Bienvenida y cóctel de honor" },
  { hora: "22:00", titulo: "Cena", desc: "Servida en el salón principal" },
  { hora: "23:30", titulo: "Vals & Brindis", desc: "Momento especial" },
  { hora: "00:00", titulo: "Fiesta", desc: "¡A bailar hasta el final!" },
  { hora: "03:30", titulo: "Cierre", desc: "Mesa dulce y despedida" },
];

function SectionTitle({ eyebrow, title }: { eyebrow?: string; title: string }) {
  return (
    <div className="mb-10 text-center">
      {eyebrow && (
        <div className="mb-3 flex items-center justify-center gap-3 text-xs uppercase tracking-[0.3em] text-primary">
          <span className="divider-line" />
          <span className="whitespace-nowrap">{eyebrow}</span>
          <span className="divider-line" />
        </div>
      )}
      <h2 className="font-serif text-4xl text-primary sm:text-5xl">{title}</h2>
    </div>
  );
}

function Landing() {
  const fechaLarga = "Jueves, 11 de marzo de 2027";

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* HERO */}
      <section className="relative mx-auto max-w-7xl px-4 pt-10 sm:px-6 lg:px-8">
        <header className="mb-6 flex items-center justify-between">
          <div className="font-serif text-lg text-primary">S · XV</div>
        </header>

        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div className="order-2 flex flex-col items-center text-center lg:order-1 lg:items-start lg:text-left">
            <div className="mb-4 flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-primary">
              <span className="divider-line" />
              <span className="whitespace-nowrap">11 · 03 · 2027</span>
              <span className="divider-line" />
            </div>
            <h1 className="font-serif text-5xl leading-[1.05] text-primary sm:text-6xl lg:text-7xl">
              Mis quince
              <br />
              <em className="italic text-primary/80">años</em>
            </h1>
            <p className="mt-6 max-w-md text-balance text-muted-foreground max-lg:mx-auto">
              Una noche para celebrar, bailar y compartir. Estás invitado a
              acompañarme en este momento tan especial.
            </p>
            <div className="mt-8 w-full max-w-sm lg:max-w-none">
              <Countdown />
            </div>
            <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
              <RsvpModal
                trigger={<Button size="lg">Confirmar asistencia</Button>}
              />
              <Button asChild size="lg" variant="outline">
                <a href="#detalles">Ver detalles</a>
              </Button>
            </div>
          </div>
          <div className="order-1 h-[420px] sm:h-[520px] lg:order-2 lg:h-[640px]">
            <Carousel images={IMAGES} />
          </div>
        </div>
      </section>

      {/* SOBRE MÍ */}
      <section className="mx-auto max-w-3xl px-4 py-24 sm:px-6 lg:px-8" id="detalles">
        <SectionTitle eyebrow="La quinceañera" title="Sobre mí" />
        <p className="text-center font-serif text-xl italic leading-relaxed text-foreground/80 sm:text-2xl">
          “Soy Sofía. Me apasionan los libros, las tardes con amigas y los
          atardeceres frente al río. Cumplir quince es un sueño que quiero
          compartir con las personas que más quiero — y vos sos una de ellas.”
        </p>
      </section>

      {/* MAPA + CALENDARIO */}
      <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6 lg:px-8">
        <SectionTitle eyebrow="Cuándo & dónde" title="Detalles del evento" />
        <div className="grid gap-6 md:grid-cols-2">
          {/* Mapa */}
          <article className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
            <div className="aspect-[4/3] w-full bg-muted">
              <iframe
                title="Ubicación"
                src={`https://www.google.com/maps?q=${encodeURIComponent(EVENT_ADDRESS)}&output=embed`}
                className="h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div className="p-6">
              <div className="flex items-start gap-3">
                <MapPin className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                <div>
                  <h3 className="font-serif text-xl text-primary">Ubicación</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {EVENT_ADDRESS}
                  </p>
                </div>
              </div>
              <Button asChild className="mt-5 w-full" variant="outline">
                <a href={EVENT_MAPS_URL} target="_blank" rel="noopener noreferrer">
                  Abrir en Google Maps
                </a>
              </Button>
            </div>
          </article>

          {/* Calendario */}
          <article className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
            <div className="flex aspect-[4/3] flex-col items-center justify-center bg-primary/5 p-6 text-center">
              <div className="text-xs uppercase tracking-[0.3em] text-primary">
                Marzo · 2027
              </div>
              <div className="mt-2 font-serif text-7xl text-primary sm:text-8xl">
                11
              </div>
              <div className="mt-2 text-sm capitalize text-muted-foreground">
                {fechaLarga.split(",")[0]} · 21:00 hs
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-start gap-3">
                <CalendarPlus className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                <div>
                  <h3 className="font-serif text-xl text-primary">Agendalo</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    No te olvides — guardalo en tu calendario.
                  </p>
                </div>
              </div>
              <Button asChild className="mt-5 w-full" variant="outline">
                <a
                  href={googleCalendarUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Agendar en Google Calendar
                </a>
              </Button>
            </div>
          </article>
        </div>
      </section>

      {/* BANNER */}
      <section className="border-y border-primary/20 bg-primary py-20 text-primary-foreground">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <p className="font-serif text-3xl italic leading-snug sm:text-5xl">
            “Las mejores noches son las que se comparten.”
          </p>
        </div>
      </section>

      {/* ITINERARIO */}
      <section className="mx-auto max-w-3xl px-4 py-24 sm:px-6 lg:px-8">
        <SectionTitle eyebrow="Cronograma" title="Itinerario de la fiesta" />
        <ol className="relative space-y-2 border-l border-primary/30 pl-6">
          {ITINERARIO.map((it) => (
            <li key={it.hora} className="relative pb-6">
              <span className="absolute -left-[31px] top-1.5 flex h-3 w-3 items-center justify-center rounded-full bg-primary ring-4 ring-background" />
              <div className="font-serif text-2xl text-primary">{it.hora}</div>
              <div className="mt-0.5 text-base font-medium">{it.titulo}</div>
              <div className="text-sm text-muted-foreground">{it.desc}</div>
            </li>
          ))}
        </ol>
      </section>

      {/* INSTAGRAM + SPOTIFY */}
      <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6 lg:px-8">
        <SectionTitle eyebrow="Vivilo & escuchalo" title="Compartí el momento" />
        <div className="grid gap-6 md:grid-cols-2">
          {/* Instagram */}
          <article className="flex flex-col items-center justify-center rounded-2xl border border-border bg-card p-10 text-center shadow-sm">
            <svg className="h-16 w-16 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
            </svg>
            <h3 className="mt-4 font-serif text-2xl text-primary">Instagram</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Subí tus fotos y videos con
            </p>
            <p className="mt-4 select-all rounded-full border border-primary/30 bg-primary/5 px-6 py-2 font-serif text-2xl text-primary">
              #SofiXV2027
            </p>
          </article>

          {/* Spotify */}
          <article className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm">
            <div className="flex flex-col items-center text-center">
              <svg className="h-16 w-16 text-primary" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.141-1.02-.12-1.141-.6-.12-.48.12-1.021.6-1.141 4.32-1.32 9.72-.66 13.439 1.56.36.18.54.78.301 1.2zm.12-3.36c-3.839-2.28-10.199-2.52-13.919-1.32-.6.18-1.26-.12-1.44-.72-.18-.6.12-1.26.72-1.44 4.26-1.32 11.339-1.02 15.719 1.56.54.3.72 1.02.42 1.56-.3.539-1.02.719-1.56.419z" />
              </svg>
              <h3 className="mt-4 font-serif text-2xl text-primary">Playlist</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Los temas que no pueden faltar esta noche.
              </p>
            </div>
            <div className="mt-6 flex-1 overflow-hidden rounded-xl">
              <iframe
                title="Spotify"
                src="https://open.spotify.com/embed/playlist/37i9dQZF1DXcBWIGoYBM5M?utm_source=generator&theme=0"
                width="100%"
                height="280"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                className="border-0"
              />
            </div>
            <Button asChild className="mt-4 w-full" variant="outline">
              <a
                href="https://open.spotify.com/playlist/37i9dQZF1DXcBWIGoYBM5M"
                target="_blank"
                rel="noopener noreferrer"
              >
                Abrir en Spotify
              </a>
            </Button>
          </article>
        </div>
      </section>

      {/* REGALOS */}
      <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6 lg:px-8">
        <SectionTitle eyebrow="Tu presencia es mi regalo" title="Regalos" />
        <div className="grid gap-6 md:grid-cols-2">
          <article className="rounded-2xl border border-border bg-card p-8 text-center shadow-sm">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Mail className="h-6 w-6" />
            </div>
            <h3 className="mt-5 font-serif text-2xl text-primary">
              Buzón en la fiesta
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Si querés acercarme una tarjeta o un detalle, vas a encontrar un
              buzón en la entrada del salón. ¡Gracias por estar!
            </p>
          </article>

          <article className="rounded-2xl border border-border bg-card p-8 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Building2 className="h-6 w-6" />
              </div>
              <h3 className="font-serif text-2xl text-primary">
                Datos bancarios
              </h3>
            </div>
            <dl className="mt-5 space-y-2.5 text-sm">
              {[
                ["Banco", "Banco Galicia"],
                ["Titular", "Sofía Pérez"],
                ["CBU", "0070123456789012345678"],
                ["Alias", "sofi.quince.2027"],
                ["CUIT/CUIL", "27-12345678-9"],
              ].map(([k, v]) => (
                <div
                  key={k}
                  className="flex items-center justify-between gap-3 border-b border-dashed border-border pb-2 last:border-0"
                >
                  <dt className="text-muted-foreground">{k}</dt>
                  <dd className="select-all font-medium text-foreground">{v}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 text-xs italic text-muted-foreground">
              * Datos de ejemplo — actualizalos antes de compartir.
            </p>
          </article>
        </div>
      </section>

      {/* RSVP FINAL */}
      <section className="mx-auto max-w-3xl px-4 pb-28 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/5 via-background to-primary/10 p-10 text-center shadow-sm sm:p-14">
          <Gift className="mx-auto h-8 w-8 text-primary" />
          <h2 className="mt-4 font-serif text-4xl text-primary sm:text-5xl">
            ¿Vas a venir?
          </h2>
          <p className="mt-3 text-muted-foreground">
            Confirmá tu asistencia para que pueda esperarte.
          </p>
          <div className="mt-7">
            <RsvpModal
              trigger={
                <Button size="lg" className="px-10">
                  Completar RSVP
                </Button>
              }
            />
          </div>
        </div>
      </section>

      <footer className="relative border-t border-border py-10 text-center text-xs uppercase tracking-[0.3em] text-muted-foreground">
        Sofía · XV · 11 · 03 · 2027
        <Link
          to="/admin"
          className="absolute bottom-3 right-4 text-muted-foreground/30 transition hover:text-primary"
          aria-label="Admin"
        >
          <Lock className="h-4 w-4" />
        </Link>
      </footer>
    </main>
  );
}
