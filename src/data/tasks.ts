export const TASK_STATUSES = ['Pendiente', 'En progreso', 'En pausa', 'Finalizada'] as const

export type TaskStatus = (typeof TASK_STATUSES)[number]

export type Task = {
  id: number
  materia: string
  docente: string
  descripcion: string
  /** Fecha de entrega: AAAA-MM-DD (formulario) o DD/MM/AAAA (datos de ejemplo). */
  fecha: string
  estado: TaskStatus
}

export type TaskInput = Omit<Task, 'id'>

/** Transiciones de estado disponibles desde cada estado. */
export const STATUS_ACTIONS: Record<TaskStatus, { label: string; to: TaskStatus }[]> = {
  Pendiente: [{ label: 'Iniciar', to: 'En progreso' }],
  'En progreso': [
    { label: 'Pausar', to: 'En pausa' },
    { label: 'Completar', to: 'Finalizada' },
  ],
  'En pausa': [
    { label: 'Reanudar', to: 'En progreso' },
    { label: 'Completar', to: 'Finalizada' },
  ],
  Finalizada: [{ label: 'Reabrir', to: 'Pendiente' }],
}

export const initialTasks: Task[] = [
  {
    id: 1,
    materia: 'IHC',
    docente: 'Bryana Ojopi',
    descripcion: 'Entrega del prototipo de interfaz con su informe de usabilidad.',
    fecha: '15/10/2026',
    estado: 'En progreso',
  },
  {
    id: 2,
    materia: 'Calculo II',
    docente: 'Carlos Mendoza',
    descripcion: 'Guía de ejercicios de integrales dobles.',
    fecha: '20/10/2026',
    estado: 'Pendiente',
  },
  {
    id: 3,
    materia: 'Programacion Orientada a Objetos',
    docente: 'Lucia Fernandez',
    descripcion: 'Práctica de herencia y polimorfismo en Java.',
    fecha: '24/10/2026',
    estado: 'Finalizada',
  },
]
