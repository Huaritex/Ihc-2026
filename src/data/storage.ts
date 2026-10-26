import { initialTasks, TASK_STATUSES } from './tasks'
import type { Task, TaskStatus } from './tasks'
import { toIsoDate } from '../utils/dates'

export const STORAGE_KEY = 'gestor-tareas-ihc:tasks'

export type LoadResult = { tasks: Task[]; warning: string | null }

const DAMAGED = 'Los datos guardados estaban dañados; se cargaron las tareas de ejemplo.'

/** Devuelve la tarea saneada o null si el registro no es válido. */
function toTask(value: unknown): Task | null {
  if (typeof value !== 'object' || value === null) return null
  const t = value as Record<string, unknown>
  if (typeof t.id !== 'number' || !Number.isInteger(t.id) || t.id < 1) return null
  if (typeof t.materia !== 'string' || !t.materia.trim()) return null
  if (typeof t.docente !== 'string' || !t.docente.trim()) return null
  if (typeof t.fecha !== 'string' || toIsoDate(t.fecha) === null) return null
  if (!TASK_STATUSES.includes(t.estado as TaskStatus)) return null
  if (t.descripcion !== undefined && typeof t.descripcion !== 'string') return null
  return {
    id: t.id,
    materia: t.materia.trim(),
    docente: t.docente.trim(),
    descripcion: (t.descripcion ?? '').trim(),
    fecha: t.fecha.trim(),
    estado: t.estado as TaskStatus,
  }
}

/** Interpreta el texto guardado. null = nunca se guardó nada (primera visita). */
export function parseStoredTasks(raw: string | null): LoadResult {
  if (raw === null) return { tasks: initialTasks, warning: null }
  let parsed: unknown
  try {
    parsed = JSON.parse(raw)
  } catch {
    return { tasks: initialTasks, warning: DAMAGED }
  }
  if (!Array.isArray(parsed)) return { tasks: initialTasks, warning: DAMAGED }
  // Una lista vacía es un estado válido: el usuario eliminó todas sus tareas.
  if (parsed.length === 0) return { tasks: [], warning: null }

  const seen = new Set<number>()
  const tasks: Task[] = []
  for (const item of parsed) {
    const task = toTask(item)
    if (task && !seen.has(task.id)) {
      seen.add(task.id)
      tasks.push(task)
    }
  }
  if (tasks.length === 0) return { tasks: initialTasks, warning: DAMAGED }
  const dropped = parsed.length - tasks.length
  return {
    tasks,
    warning: dropped > 0 ? `Se omitieron ${dropped} ${dropped === 1 ? 'tarea' : 'tareas'} con datos inválidos.` : null,
  }
}

export function loadTasks(): LoadResult {
  try {
    return parseStoredTasks(localStorage.getItem(STORAGE_KEY))
  } catch {
    return {
      tasks: initialTasks,
      warning: 'No se puede acceder al almacenamiento del navegador; los cambios no se conservarán.',
    }
  }
}

/** true si se guardó correctamente. */
export function saveTasks(tasks: Task[]): boolean {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
    return true
  } catch {
    return false
  }
}
