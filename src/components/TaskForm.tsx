import { useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { TASK_STATUSES } from '../data/tasks'
import type { Task, TaskInput, TaskStatus } from '../data/tasks'
import { parseDate, toIsoDate } from '../utils/dates'

type TaskFormProps = {
  open: boolean
  /** Tarea a editar; null para crear. El padre cambia la `key` en cada apertura para reiniciar el estado. */
  task: Task | null
  onSubmit: (input: TaskInput) => void
  onClose: () => void
}

type TextField = 'materia' | 'docente' | 'descripcion' | 'fecha'

const emptyForm: TaskInput = { materia: '', docente: '', descripcion: '', fecha: '', estado: 'Pendiente' }

function initialForm(task: Task | null): TaskInput {
  if (!task) return emptyForm
  return {
    materia: task.materia,
    docente: task.docente,
    descripcion: task.descripcion,
    // El campo date solo entiende AAAA-MM-DD; las fechas de ejemplo vienen como DD/MM/AAAA.
    fecha: toIsoDate(task.fecha) ?? '',
    estado: task.estado,
  }
}

function TaskForm({ open, task, onSubmit, onClose }: TaskFormProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [form, setForm] = useState<TaskInput>(() => initialForm(task))
  const [touched, setTouched] = useState(false)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    else if (!open && dialog.open) dialog.close()
  }, [open])

  const errors: Record<TextField, string> = {
    materia: form.materia.trim() ? '' : 'La materia es obligatoria.',
    docente: form.docente.trim() ? '' : 'El docente es obligatorio.',
    descripcion: form.descripcion.trim() ? '' : 'La descripción es obligatoria.',
    fecha: !form.fecha ? 'Elige una fecha de entrega.' : parseDate(form.fecha) ? '' : 'La fecha de entrega no es válida.',
  }
  const hasErrors = Object.values(errors).some(Boolean)

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setTouched(true)
    if (hasErrors) return
    onSubmit({
      materia: form.materia.trim(),
      docente: form.docente.trim(),
      descripcion: form.descripcion.trim(),
      fecha: form.fecha,
      estado: form.estado,
    })
    if (!task) {
      setForm(emptyForm)
      setTouched(false)
    }
  }

  function field(name: TextField) {
    const invalid = touched && Boolean(errors[name])
    return {
      id: `task-${name}`,
      value: form[name],
      'aria-invalid': invalid,
      'aria-required': true,
      'aria-describedby': invalid ? `task-${name}-error` : undefined,
      onChange: (e: { target: { value: string } }) => setForm((f) => ({ ...f, [name]: e.target.value })),
    }
  }

  function error(name: TextField) {
    return touched && errors[name] ? (
      <span id={`task-${name}-error`} className="form-error" role="alert">
        {errors[name]}
      </span>
    ) : null
  }

  return (
    <dialog ref={dialogRef} className="task-dialog" aria-labelledby="task-form-title" onClose={onClose}>
      <form onSubmit={handleSubmit} noValidate>
        <h2 id="task-form-title">{task ? 'Editar tarea' : 'Nueva tarea'}</h2>

        <label className="form-field" htmlFor="task-materia">
          Materia
          <input type="text" {...field('materia')} />
          {error('materia')}
        </label>

        <label className="form-field" htmlFor="task-docente">
          Docente
          <input type="text" {...field('docente')} />
          {error('docente')}
        </label>

        <label className="form-field" htmlFor="task-descripcion">
          Descripción
          <textarea rows={3} {...field('descripcion')} />
          {error('descripcion')}
        </label>

        <label className="form-field" htmlFor="task-fecha">
          Fecha de entrega
          <input type="date" {...field('fecha')} />
          {error('fecha')}
        </label>

        <label className="form-field" htmlFor="task-estado">
          {task ? 'Estado' : 'Estado inicial'}
          <select
            id="task-estado"
            value={form.estado}
            onChange={(e) => setForm((f) => ({ ...f, estado: e.target.value as TaskStatus }))}
          >
            {TASK_STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </label>

        <div className="dialog-actions">
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Cancelar
          </button>
          <button type="submit" className="btn btn-primary">
            {task ? 'Guardar cambios' : 'Crear tarea'}
          </button>
        </div>
      </form>
    </dialog>
  )
}

export default TaskForm
