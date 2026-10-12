type TaskCardProps = {
  materia: string
  docente: string
  fecha: string
  estado: string
}

function TaskCard({ materia, docente, fecha, estado }: TaskCardProps) {
  return (
    <div className="task-card">
      <div className="task-card-heading">
        <h3>{materia}</h3>
        <span className={`task-status task-status-${estado.toLowerCase().replaceAll(' ', '-')}`}>
          {estado}
        </span>
      </div>
      <p><strong>Docente:</strong> {docente}</p>
      <p><strong>Fecha:</strong> {fecha}</p>
    </div>
  )
}

export default TaskCard