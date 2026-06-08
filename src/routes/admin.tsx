import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import {
  ADMIN_PASS,
  ADMIN_USER,
  deleteRsvp,
  getRsvps,
  isAdminAuthed,
  setAdminAuthed,
  type Rsvp,
} from "@/lib/storage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash2, LogOut, Lock, Download } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
});

function AdminPage() {
  const [authed, setAuthed] = useState(false);
  useEffect(() => setAuthed(isAdminAuthed()), []);
  return authed ? <Panel onLogout={() => setAuthed(false)} /> : <Login onLogin={() => setAuthed(true)} />;
}

function Login({ onLogin }: { onLogin: () => void }) {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    if (fd.get("user") === ADMIN_USER && fd.get("pass") === ADMIN_PASS) {
      setAdminAuthed(true);
      onLogin();
    } else {
      setError("Usuario o contraseña incorrectos");
    }
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm rounded-2xl border border-border bg-card p-8 shadow-sm">
        <div className="mb-6 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Lock className="h-5 w-5" />
          </div>
          <h1 className="mt-4 font-serif text-3xl text-primary">Administrador</h1>
          <p className="mt-1 text-sm text-muted-foreground">Ingresá para ver los RSVP</p>
        </div>
        <form onSubmit={submit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="user">Usuario</Label>
            <Input id="user" name="user" autoComplete="username" required />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="pass">Contraseña</Label>
            <Input id="pass" name="pass" type="password" autoComplete="current-password" required />
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <Button type="submit" className="w-full">Ingresar</Button>
          <button type="button" onClick={() => navigate({ to: "/" })} className="block w-full text-center text-xs text-muted-foreground hover:text-primary">
            ← Volver al sitio
          </button>
        </form>
        <p className="mt-6 rounded-md bg-muted p-3 text-center text-xs text-muted-foreground">
          Demo: <strong>{ADMIN_USER}</strong> / <strong>{ADMIN_PASS}</strong>
        </p>
      </div>
    </div>
  );
}

type Filter = "all" | "si" | "no";
type Sort = "recent" | "oldest" | "name";

function Panel({ onLogout }: { onLogout: () => void }) {
  const navigate = useNavigate();
  const [rsvps, setRsvps] = useState<Rsvp[]>([]);
  const [filter, setFilter] = useState<Filter>("all");
  const [sort, setSort] = useState<Sort>("recent");
  const [q, setQ] = useState("");

  const refresh = () => setRsvps(getRsvps());
  useEffect(refresh, []);

  const list = useMemo(() => {
    let l = rsvps;
    if (filter !== "all") l = l.filter((r) => r.asistencia === filter);
    if (q.trim()) {
      const s = q.toLowerCase();
      l = l.filter(
        (r) =>
          r.nombre.toLowerCase().includes(s) ||
          r.apellido.toLowerCase().includes(s) ||
          r.telefono.includes(s),
      );
    }
    l = [...l];
    if (sort === "recent") l.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    if (sort === "oldest") l.sort((a, b) => a.createdAt.localeCompare(b.createdAt));
    if (sort === "name") l.sort((a, b) => a.nombre.localeCompare(b.nombre));
    return l;
  }, [rsvps, filter, sort, q]);

  const stats = useMemo(() => {
    const si = rsvps.filter((r) => r.asistencia === "si").length;
    const no = rsvps.filter((r) => r.asistencia === "no").length;
    return { total: rsvps.length, si, no };
  }, [rsvps]);

  const handleDelete = (id: string) => {
    if (!confirm("¿Eliminar esta respuesta?")) return;
    deleteRsvp(id);
    refresh();
    toast.success("Respuesta eliminada");
  };

  const exportCsv = () => {
    const headers = ["Nombre", "Apellido", "Telefono", "Asistencia", "Mensaje", "Fecha"];
    const rows = list.map((r) => [r.nombre, r.apellido, r.telefono, r.asistencia, r.mensaje.replace(/\n/g, " "), r.createdAt]);
    const csv = [headers, ...rows].map((row) => row.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `rsvps-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const logout = () => {
    setAdminAuthed(false);
    onLogout();
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-5 sm:px-6">
          <div>
            <h1 className="font-serif text-2xl text-primary sm:text-3xl">Panel · Respuestas</h1>
            <p className="text-xs text-muted-foreground">Administración de RSVPs</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => navigate({ to: "/" })}>Sitio</Button>
            <Button variant="outline" size="sm" onClick={logout}>
              <LogOut className="mr-1.5 h-4 w-4" /> Salir
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        {/* Stats */}
        <div className="mb-6 grid grid-cols-3 gap-3 sm:gap-4">
          {[
            { label: "Total", value: stats.total },
            { label: "Sí asisten", value: stats.si },
            { label: "No asisten", value: stats.no },
          ].map((s) => (
            <div key={s.label} className="rounded-xl border border-border bg-card p-5 text-center">
              <div className="font-serif text-4xl text-primary">{s.value}</div>
              <div className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end">
          <div className="flex-1 space-y-1.5">
            <Label htmlFor="q">Buscar</Label>
            <Input id="q" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Nombre, apellido o teléfono" />
          </div>
          <div className="space-y-1.5">
            <Label>Filtrar</Label>
            <Select value={filter} onValueChange={(v) => setFilter(v as Filter)}>
              <SelectTrigger className="w-[160px]"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="si">Sí asisten</SelectItem>
                <SelectItem value="no">No asisten</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label>Ordenar</Label>
            <Select value={sort} onValueChange={(v) => setSort(v as Sort)}>
              <SelectTrigger className="w-[180px]"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Más recientes</SelectItem>
                <SelectItem value="oldest">Más antiguas</SelectItem>
                <SelectItem value="name">Por nombre</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button variant="outline" onClick={exportCsv} disabled={!list.length}>
            <Download className="mr-1.5 h-4 w-4" /> Exportar CSV
          </Button>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-xl border border-border bg-card">
          {list.length === 0 ? (
            <div className="p-12 text-center text-muted-foreground">
              No hay respuestas todavía.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invitado</TableHead>
                  <TableHead>Teléfono</TableHead>
                  <TableHead>Asistencia</TableHead>
                  <TableHead>Mensaje</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {list.map((r) => (
                  <TableRow key={r.id}>
                    <TableCell className="font-medium">{r.nombre} {r.apellido}</TableCell>
                    <TableCell className="text-muted-foreground">{r.telefono}</TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          r.asistencia === "si"
                            ? "bg-primary/10 text-primary"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {r.asistencia === "si" ? "Sí" : "No"}
                      </span>
                    </TableCell>
                    <TableCell className="max-w-xs truncate text-sm text-muted-foreground" title={r.mensaje}>
                      {r.mensaje || "—"}
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {new Date(r.createdAt).toLocaleString("es-AR", { dateStyle: "short", timeStyle: "short" })}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(r.id)} aria-label="Eliminar">
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </main>
    </div>
  );
}
