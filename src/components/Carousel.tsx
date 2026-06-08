import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  images: { src: string; alt: string }[];
}

export function Carousel({ images }: Props) {
  const [i, setI] = useState(0);
  const next = () => setI((p) => (p + 1) % images.length);
  const prev = () => setI((p) => (p - 1 + images.length) % images.length);

  useEffect(() => {
    const t = setInterval(next, 5500);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images.length]);

  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl bg-muted">
      {images.map((img, idx) => (
        <img
          key={img.src}
          src={img.src}
          alt={img.alt}
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-1000",
            idx === i ? "opacity-100" : "opacity-0",
          )}
          loading={idx === 0 ? "eager" : "lazy"}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-transparent" />

      <button
        aria-label="Anterior"
        onClick={prev}
        className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-background/70 p-2 text-foreground backdrop-blur transition hover:bg-background"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        aria-label="Siguiente"
        onClick={next}
        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-background/70 p-2 text-foreground backdrop-blur transition hover:bg-background"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1.5">
        {images.map((_, idx) => (
          <button
            key={idx}
            aria-label={`Ir a foto ${idx + 1}`}
            onClick={() => setI(idx)}
            className={cn(
              "h-1.5 rounded-full transition-all",
              idx === i ? "w-6 bg-background" : "w-1.5 bg-background/60",
            )}
          />
        ))}
      </div>
    </div>
  );
}
