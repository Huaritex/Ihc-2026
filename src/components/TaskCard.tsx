import { useState } from 'react'
import { STATUS_ACTIONS } from '../data/tasks'
import type { Task, TaskStatus } from '../data/tasks'
import { formatDate, isOverdue } from '../utils/dates'
import Icon from './Icon'

type TaskCardProps = {
  task: Task
  onEdit: (task: Task) => void
  onDelete: (id: number) => void
  onStatusChange: (id: number, estado: TaskStatus) => void
}

const estadoStyles: Record<TaskStatus, string> = {
  Pendiente: 'status-pending',
  'En progreso': 'status-progress',
  'En pausa': 'status-paused',
  Finalizada: 'status-completed',
}

function TaskCard({ task, onEdit, onDelete, onStatusChange }: TaskCardProps) {
  const { id, materia, docente, descripcion, fecha, estado } = task
  const [confirming, setConfirming] = useState(false)
  const overdue = isOverdue(task)

  return (
    <article className="task-card">
      <div className="task-card-top">
        <div className="subject-icon"><Icon name="book" /></div>
        <div className="task-badges">
          {overdue && (
            <span className="status-badge status-overdue">
              <span className="status-dot" aria-hidden="true" />
              Vencida
            </span>
          )}
          <span className={`status-badge ${estadoStyles[estado]}`}>
            <span className="status-dot" aria-hidden="true" />
            {estado}
          </span>
        </div>
      </div>
      <h3>{materia}</h3>
      {descripcion && <p className="task-description">{descripcion}</p>}
      <dl className="task-details">
        <div>
          <dt><Icon name="user" /> Docente</dt>
          <dd>{docente}</dd>
        </div>
        <div>
          <dt><Icon name="calendar" /> Fecha de entrega</dt>
          <dd>{formatDate(fecha)}</dd>
        </div>
      </dl>

      {confirming ? (
        <div className="task-actions" role="group" aria-label={`Confirmar eliminación de ${materia}`}>
          <span className="confirm-text">¿Eliminar esta tarea?</span>
          <button type="button" className="btn btn-danger" onClick={() => onDelete(id)}>
            Sí, eliminar
          </button>
          <button type="button" className="btn btn-secondary" onClick={() => setConfirming(false)} autoFocus>
            Cancelar
          </button>
        </div>
      ) : (
        <div className="task-actions">
          {STATUS_ACTIONS[estado].map(({ label, to }) => (
            <button
              key={to}
              type="button"
              className="btn btn-secondary"
              onClick={() => onStatusChange(id, to)}
              aria-label={`${label} tarea de ${materia}`}
            >
              {label}
            </button>
          ))}
          <button
            type="button"
            className="btn btn-icon"
            onClick={() => onEdit(task)}
            aria-label={`Editar ${materia}`}
            title="Editar"
          >
            <Icon name="edit" />
          </button>
          <button
            type="button"
            className="btn btn-icon btn-icon-danger"
            onClick={() => setConfirming(true)}
            aria-label={`Eliminar ${materia}`}
            title="Eliminar"
          >
            <Icon name="trash" />
          </button>
        </div>
      )}
    </article>
  )
}

export default TaskCard
