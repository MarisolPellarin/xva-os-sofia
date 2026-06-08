import { useState, type FormEvent } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { saveRsvp, type RsvpStatus } from "@/lib/storage";
import { toast } from "sonner";
import { Check } from "lucide-react";

export function RsvpModal({ trigger }: { trigger: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState(false);
  const [asistencia, setAsistencia] = useState<RsvpStatus>("si");

  const handle = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const nombre = String(fd.get("nombre") || "").trim();
    const apellido = String(fd.get("apellido") || "").trim();
    const telefono = String(fd.get("telefono") || "").trim();
    const mensaje = String(fd.get("mensaje") || "").trim();
    if (!nombre || !apellido || !telefono) {
      toast.error("Por favor completá nombre, apellido y teléfono");
      return;
    }
    saveRsvp({ nombre, apellido, telefono, asistencia, mensaje });
    setDone(true);
    toast.success("¡Gracias por confirmar!");
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        setOpen(o);
        if (!o) setTimeout(() => setDone(false), 300);
      }}
    >
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        {!done ? (
          <>
            <DialogHeader>
              <DialogTitle className="font-serif text-3xl text-primary">
                Confirmá tu asistencia
              </DialogTitle>
              <DialogDescription>
                Completá tus datos para que pueda esperarte.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handle} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="nombre">Nombre</Label>
                  <Input id="nombre" name="nombre" required />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="apellido">Apellido</Label>
                  <Input id="apellido" name="apellido" required />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="telefono">Teléfono</Label>
                <Input
                  id="telefono"
                  name="telefono"
                  type="tel"
                  inputMode="tel"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label>¿Vas a venir?</Label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setAsistencia("si")}
                    className={`rounded-md border px-4 py-2 text-sm transition ${
                      asistencia === "si"
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-card hover:bg-muted"
                    }`}
                  >
                    Sí, ahí estaré
                  </button>
                  <button
                    type="button"
                    onClick={() => setAsistencia("no")}
                    className={`rounded-md border px-4 py-2 text-sm transition ${
                      asistencia === "no"
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-card hover:bg-muted"
                    }`}
                  >
                    No podré asistir
                  </button>
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="mensaje">Mensaje para la quinceañera</Label>
                <Textarea
                  id="mensaje"
                  name="mensaje"
                  rows={3}
                  placeholder="Dejale un mensajito..."
                />
              </div>
              <Button type="submit" className="w-full">
                Enviar confirmación
              </Button>
            </form>
          </>
        ) : (
          <div className="flex flex-col items-center gap-4 py-6 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Check className="h-7 w-7" />
            </div>
            <h3 className="font-serif text-2xl text-primary">¡Listo!</h3>
            <p className="text-sm text-muted-foreground">
              Recibí tu confirmación. ¡Nos vemos pronto!
            </p>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cerrar
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
