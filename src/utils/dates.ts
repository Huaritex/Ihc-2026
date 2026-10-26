/** Fecha de calendario sin zona horaria. */
export type DateParts = { y: number; m: number; d: number }

/**
 * Acepta AAAA-MM-DD (campo date del formulario) y DD/MM/AAAA (datos de ejemplo).
 * Devuelve null si el formato es otro o la fecha no existe (p. ej. 31/02/2026).
 */
export function parseDate(value: string): DateParts | null {
  const text = value.trim()
  let y: number, m: number, d: number
  const iso = /^(\d{4})-(\d{2})-(\d{2})$/.exec(text)
  const latam = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(text)
  if (iso) {
    ;[y, m, d] = [Number(iso[1]), Number(iso[2]), Number(iso[3])]
  } else if (latam) {
    ;[d, m, y] = [Number(latam[1]), Number(latam[2]), Number(latam[3])]
  } else {
    return null
  }
  const date = new Date(Date.UTC(y, m - 1, d))
  if (date.getUTCFullYear() !== y || date.getUTCMonth() !== m - 1 || date.getUTCDate() !== d) return null
  return { y, m, d }
}

const pad = (n: number, size = 2) => String(n).padStart(size, '0')

/** Normaliza a AAAA-MM-DD (ordenable como texto) o null si no es válida. */
export function toIsoDate(value: string): string | null {
  const p = parseDate(value)
  return p ? `${pad(p.y, 4)}-${pad(p.m)}-${pad(p.d)}` : null
}

/** Texto DD/MM/AAAA para mostrar. Si la fecha no es válida devuelve el valor original. */
export function formatDate(value: string): string {
  const p = parseDate(value)
  return p ? `${pad(p.d)}/${pad(p.m)}/${pad(p.y, 4)}` : value
}

/** Compara dos fechas de cualquiera de los formatos admitidos. Las inválidas van al final. */
export function compareDates(a: string, b: string): number {
  const ia = toIsoDate(a)
  const ib = toIsoDate(b)
  if (ia === ib) return 0
  if (ia === null) return 1
  if (ib === null) return -1
  return ia < ib ? -1 : 1
}

/** Día actual en hora local como AAAA-MM-DD (no usa UTC). */
export function todayIso(now: Date = new Date()): string {
  return `${pad(now.getFullYear(), 4)}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`
}

/** Vencida: fecha anterior al día local actual y tarea no finalizada. Vence hoy ≠ vencida. */
export function isOverdue(task: { fecha: string; estado: string }, now: Date = new Date()): boolean {
  if (task.estado === 'Finalizada') return false
  const due = toIsoDate(task.fecha)
  return due !== null && due < todayIso(now)
}
