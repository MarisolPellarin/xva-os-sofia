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
import {
  EVENT_ADDRESS,
  EVENT_DATE,
  EVENT_MAPS_URL,
  googleCalendarUrl,
} from "@/lib/event";
import { CONFIG } from "@/lib/config";
import { useInView } from "@/hooks/use-in-view";

export const Route = createFileRoute("/")({
  component: Landing,
});

// Use itinerario from central CONFIG

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
  const eventDate = EVENT_DATE;
  const fechaLarga = eventDate.toLocaleDateString("es-AR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const shortDateDot = (() => {
    const d = eventDate.getDate().toString().padStart(2, "0");
    const m = (eventDate.getMonth() + 1).toString().padStart(2, "0");
    const y = eventDate.getFullYear();
    return `${d} · ${m} · ${y}`;
  })();

  const eventDay = eventDate.getDate();
  const eventMonthLabel = eventDate.toLocaleString("es-ES", { month: "long" }).replace(/^./, (s) => s.toUpperCase());

  // Scroll animation refs
  const heroRef = useInView();
  const aboutRef = useInView();
  const detailsRef = useInView();
  const bannerRef = useInView();
  const itineraryRef = useInView();
  const socialRef = useInView();
  const giftsRef = useInView();
  const rsvpRef = useInView();

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* HERO */}
      <section ref={heroRef.ref} className="relative mx-auto max-w-7xl px-4 pt-10 sm:px-6 lg:px-8">
        <header className={`mb-6 flex items-center justify-between ${heroRef.isInView ? "animate-in-up delay-75" : "opacity-0"}`}>
          <div className="font-serif text-lg text-primary">{CONFIG.nombre.toUpperCase()}</div>
          <div className="font-serif text-lg text-primary">XV·AÑOS</div>
        </header>

        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div className="order-2 flex flex-col items-center text-center lg:order-1 lg:items-start lg:text-left">
              <div className={`mb-4 flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-primary ${heroRef.isInView ? "animate-in-up delay-150" : "opacity-0"}`}>
              <span className="divider-line" />
              <span className="whitespace-nowrap">{shortDateDot}</span>
              <span className="divider-line" />
            </div>
            <h1 className={`font-serif text-5xl leading-[1.05] text-primary sm:text-6xl lg:text-7xl ${heroRef.isInView ? "animate-in-up delay-225" : "opacity-0"}`}>
              {CONFIG.titulo}
              <br />
              <em className="italic text-primary/80">años</em>
            </h1>
            <p className={`mt-6 max-w-md text-balance text-muted-foreground max-lg:mx-auto ${heroRef.isInView ? "animate-in-up delay-300" : "opacity-0"}`}>
              Una noche para celebrar, bailar y compartir. Estás invitado a
              acompañarme en este momento tan especial.
            </p>
            <div className={`mt-8 w-full max-w-sm lg:max-w-none ${heroRef.isInView ? "animate-in-up delay-375" : "opacity-0"}`}>
              <Countdown />
            </div>
            <div className={`mt-8 flex flex-wrap justify-center gap-3 lg:justify-start ${heroRef.isInView ? "animate-in-up delay-450" : "opacity-0"}`}>
              <RsvpModal
                trigger={<Button size="lg">Confirmar asistencia</Button>}
              />
              <Button asChild size="lg" variant="outline">
                <a href="#detalles">Ver detalles</a>
              </Button>
            </div>
          </div>
          <div className={`order-1 h-[420px] sm:h-[520px] lg:order-2 lg:h-[640px] ${heroRef.isInView ? "animate-scale-in delay-225" : "opacity-0 scale-95"}`}>
            <Carousel images={CONFIG.images} />
          </div>
        </div>
      </section>

      {/* SOBRE MÍ */}
      <section ref={aboutRef.ref} className={`mx-auto max-w-3xl px-4 py-24 sm:px-6 lg:px-8 ${aboutRef.isInView ? "animate-in-up" : "opacity-0"}`} id="detalles">
        <SectionTitle eyebrow="La quinceañera" title="Sobre mí" />
        <p className="text-center font-serif text-xl italic leading-relaxed text-foreground/80 sm:text-2xl">
          “Soy Sofía. Me apasionan los libros, las tardes con amigas y los
          atardeceres frente al río. Cumplir quince es un sueño que quiero
          compartir con las personas que más quiero — y vos sos una de ellas.”
        </p>
      </section>

      {/* MAPA + CALENDARIO */}
      <section ref={detailsRef.ref} className={`mx-auto max-w-6xl px-4 pb-24 sm:px-6 lg:px-8 ${detailsRef.isInView ? "animate-in-up" : "opacity-0"}`}>
        <SectionTitle eyebrow="Cuándo & dónde" title="Detalles del evento" />
        <div className="grid gap-6 md:grid-cols-2">
          {/* Mapa */}
          <article className={`overflow-hidden rounded-2xl border border-border bg-card shadow-sm ${detailsRef.isInView ? "animate-scale-in" : "opacity-0 scale-95"}`}>
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
          <article className={`flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm ${detailsRef.isInView ? "animate-scale-in" : "opacity-0 scale-95"}`}>
            <div className="flex aspect-[4/3] flex-col items-center justify-center bg-primary/5 p-6 text-center">
              <div className="text-xs uppercase tracking-[0.3em] text-primary">
                {eventMonthLabel} · {eventDate.getFullYear()}
              </div>
              <div className="mt-6 w-full">
                <div className="grid grid-cols-7 gap-2 text-[0.625rem] font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                  {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((day) => (
                    <div key={day} className="text-center">
                      {day}
                    </div>
                  ))}
                </div>
                <div className="mt-3 grid grid-cols-7 gap-2 text-sm">
                  {Array.from({ length: 31 }, (_, index) => {
                    const day = index + 1;
                    return (
                      <div
                        key={day}
                        className={
                          day === eventDay
                            ? 'flex h-10 items-center justify-center rounded-full bg-primary text-primary-foreground ring-2 ring-primary/30'
                            : 'flex h-10 items-center justify-center rounded-2xl bg-background text-foreground'
                        }
                      >
                        {day}
                      </div>
                    );
                  })}
                </div>
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
      <section ref={bannerRef.ref} className={`border-y border-primary/20 bg-primary py-20 text-primary-foreground ${bannerRef.isInView ? "animate-in-up" : "opacity-0"}`}>
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <p className="font-serif text-2xl italic leading-snug sm:text-4xl">
            “Las mejores noches son las que se comparten.”
          </p>
        </div>
      </section>

      {/* ITINERARIO */}
      <section ref={itineraryRef.ref} className={`mx-auto max-w-3xl px-4 py-24 sm:px-6 lg:px-8 ${itineraryRef.isInView ? "animate-in-up" : "opacity-0"}`}>
        <SectionTitle eyebrow="Cronograma" title="Itinerario" />
        <ol className="relative space-y-2 border-l border-primary/30 pl-6 md:space-y-0 md:border-l-0 md:pl-0 md:pt-6 md:flex md:items-start md:justify-between">
          {CONFIG.itinerario.map((it: { hora: string; titulo: string; desc: string }) => (
            <li key={it.hora} className="relative pb-6 md:pb-0 md:flex-1 md:text-center">
              {/* Mobile (left) marker */}
              <span className="absolute -left-[31px] top-1.5 flex h-3 w-3 items-center justify-center rounded-full bg-primary ring-4 ring-background md:hidden" />

              {/* Desktop (top) marker */}
              <span className="hidden md:flex absolute -top-3 left-1/2 -translate-x-1/2 h-3 w-3 items-center justify-center rounded-full bg-primary ring-4 ring-background" />

              <div className="font-serif text-2xl text-primary">{it.hora}</div>
              <div className="mt-0.5 text-base font-medium">{it.titulo}</div>
              <div className="text-sm text-muted-foreground">{it.desc}</div>
            </li>
          ))}
        </ol>
      </section>

      {/* INSTAGRAM + SPOTIFY */}
      <section ref={socialRef.ref} className={`mx-auto max-w-6xl px-4 pb-24 sm:px-6 lg:px-8 ${socialRef.isInView ? "animate-in-up" : "opacity-0"}`}>
        <SectionTitle eyebrow="Vivilo & escuchalo" title="Compartí el momento" />
        <div className="grid gap-6 md:grid-cols-2">
          {/* Instagram */}
          <article className={`flex flex-col items-center justify-center rounded-2xl border border-border bg-card p-10 text-center shadow-sm ${socialRef.isInView ? "animate-scale-in" : "opacity-0 scale-95"}`}>
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
              {CONFIG.hashtag}
            </p>
          </article>

          {/* Spotify */}
          <article className={`flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm ${socialRef.isInView ? "animate-scale-in" : "opacity-0 scale-95"}`}>
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
      <section ref={giftsRef.ref} className={`mx-auto max-w-6xl px-4 pb-24 sm:px-6 lg:px-8 ${giftsRef.isInView ? "animate-in-up" : "opacity-0"}`}>
        <SectionTitle eyebrow="Tu presencia es mi regalo" title="Regalos" />
        <div className="grid gap-6 md:grid-cols-2">
          <article className={`rounded-2xl border border-border bg-card p-8 text-center shadow-sm ${giftsRef.isInView ? "animate-scale-in" : "opacity-0 scale-95"}`}>
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

          <article className={`rounded-2xl border border-border bg-card p-8 shadow-sm ${giftsRef.isInView ? "animate-scale-in" : "opacity-0 scale-95"}`}>
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
                ["Banco", CONFIG.bank.nombre],
                ["Titular", CONFIG.bank.titular],
                ["CBU", CONFIG.bank.cbu],
                ["Alias", CONFIG.bank.alias],
                ["CUIT/CUIL", CONFIG.bank.cuit],
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
      <section ref={rsvpRef.ref} className={`mx-auto max-w-3xl px-4 pb-28 sm:px-6 lg:px-8 ${rsvpRef.isInView ? "animate-in-up" : "opacity-0"}`}>
        <div className={`rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/5 via-background to-primary/10 p-10 text-center shadow-sm sm:p-14 ${rsvpRef.isInView ? "animate-scale-in" : "opacity-0 scale-95"}`}>
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

      <footer className="relative border-t border-border py-10 text-center text-xs uppercase tracking-[0.3em] text-muted-foreground animate-in">
        {CONFIG.nombre} · {CONFIG.titulo} · {shortDateDot}
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
