export type TaskStatus = 'Pendiente' | 'En progreso' | 'Finalizada'

export type Task = {
  id: number
  materia: string
  docente: string
  fecha: string
  estado: TaskStatus
}

export const tasks: Task[] = [
  {
    id: 1,
    materia: 'IHC',
    docente: 'Bryana Ojopi',
    fecha: '15/10/2026',
    estado: 'En progreso',
  },
  {
    id: 2,
    materia: 'Calculo II',
    docente: 'Carlos Mendoza',
    fecha: '20/10/2026',
    estado: 'Pendiente',
  },
  {
    id: 3,
    materia: 'Programacion Orientada a Objetos',
    docente: 'Lucia Fernandez',
    fecha: '24/10/2026',
    estado: 'Finalizada',
  },
]
