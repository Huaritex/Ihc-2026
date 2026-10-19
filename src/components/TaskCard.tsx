import type { Task, TaskStatus } from '../data/tasks'
import Icon from './Icon'

type TaskCardProps = Omit<Task, 'id'>

const estadoStyles: Record<TaskStatus, string> = {
  Pendiente: 'status-pending',
  'En progreso': 'status-progress',
  Finalizada: 'status-completed',
}

function TaskCard({ materia, docente, fecha, estado }: TaskCardProps) {
  return (
    <article className="task-card">
      <div className="task-card-top">
        <div className="subject-icon"><Icon name="book" /></div>
        <span className={`status-badge ${estadoStyles[estado]}`}>
          <span className="status-dot" aria-hidden="true" />
          {estado}
        </span>
      </div>
      <h3>{materia}</h3>
      <dl className="task-details">
        <div>
          <dt><Icon name="user" /> Docente</dt>
          <dd>{docente}</dd>
        </div>
        <div>
          <dt><Icon name="calendar" /> Fecha de entrega</dt>
          <dd>{fecha}</dd>
        </div>
      </dl>
    </article>
  )
}

export default TaskCard
