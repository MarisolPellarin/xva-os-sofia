import { useEffect, useState } from "react";
import { EVENT_DATE } from "@/lib/event";

function diff(target: Date) {
  const ms = Math.max(0, target.getTime() - Date.now());
  const d = Math.floor(ms / 86400000);
  const h = Math.floor((ms % 86400000) / 3600000);
  const m = Math.floor((ms % 3600000) / 60000);
  const s = Math.floor((ms % 60000) / 1000);
  return { d, h, m, s };
}

export function Countdown() {
  const [t, setT] = useState({ d: 0, h: 0, m: 0, s: 0 });
  useEffect(() => {
    setT(diff(EVENT_DATE));
    const id = setInterval(() => setT(diff(EVENT_DATE)), 1000);
    return () => clearInterval(id);
  }, []);

  const items: { label: string; value: number }[] = [
    { label: "Días", value: t.d },
    { label: "Horas", value: t.h },
    { label: "Min", value: t.m },
    { label: "Seg", value: t.s },
  ];

  return (
    <div className="grid grid-cols-4 gap-2 sm:gap-4">
      {items.map((it) => (
        <div
          key={it.label}
          className="rounded-xl border border-border bg-card/80 px-2 py-4 text-center shadow-sm backdrop-blur sm:px-4 sm:py-6"
        >
          <div className="font-serif text-3xl text-primary sm:text-5xl">
            {String(it.value).padStart(2, "0")}
          </div>
          <div className="mt-1 text-[10px] uppercase tracking-[0.2em] text-muted-foreground sm:text-xs">
            {it.label}
          </div>
        </div>
      ))}
    </div>
  );
}
