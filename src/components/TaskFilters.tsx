import { useState } from 'react'
import { tasks, type TaskStatus } from '../data/tasks'
import TaskCard from './TaskCard'
import Icon from './Icon'

const statuses: TaskStatus[] = ['Pendiente', 'En progreso', 'Finalizada']

function normalize(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase()
    .trim()
}

function TaskFilters() {
  const [subjectQuery, setSubjectQuery] = useState('')
  const [teacherQuery, setTeacherQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('')

  const filteredTasks = tasks.filter((task) => {
    const matchesSubject = normalize(task.materia).includes(normalize(subjectQuery))
    const matchesTeacher = normalize(task.docente).includes(normalize(teacherQuery))
    const matchesStatus = statusFilter === '' || task.estado === statusFilter

    return matchesSubject && matchesTeacher && matchesStatus
  })

  function clearFilters() {
    setSubjectQuery('')
    setTeacherQuery('')
    setStatusFilter('')
  }

  return (
    <>
      <section aria-labelledby="filter-heading" className="filter-panel">
        <div className="filter-heading">
          <div className="filter-title">
            <Icon name="filter" />
            <h2 id="filter-heading">Filtrar tareas</h2>
          </div>
          <p>Busca por materia, docente o estado.</p>
        </div>
        <div className="filter-fields">
          <label className="filter-field">
            <span>Materia</span>
            <div className="field-control">
              <Icon name="search" />
              <input
                type="search"
                value={subjectQuery}
                onChange={(event) => setSubjectQuery(event.target.value)}
                placeholder="Buscar por materia..."
              />
            </div>
          </label>

          <label className="filter-field">
            <span>Docente</span>
            <div className="field-control">
              <Icon name="search" />
              <input
                type="search"
                value={teacherQuery}
                onChange={(event) => setTeacherQuery(event.target.value)}
                placeholder="Buscar por docente..."
              />
            </div>
          </label>

          <label className="filter-field">
            <span>Estado</span>
            <div className="field-control select-control">
              <select
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
              >
                <option value="">Todos los estados</option>
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
              <Icon name="chevron" />
            </div>
          </label>
        </div>
      </section>

      <div className="results-toolbar">
        <p className="results-count" role="status" aria-atomic="true">
          <span>{filteredTasks.length}</span> {filteredTasks.length === 1 ? 'actividad encontrada' : 'actividades encontradas'}
        </p>
        <button
          type="button"
          onClick={clearFilters}
          disabled={!subjectQuery && !teacherQuery && !statusFilter}
          className="clear-button"
        >
          <Icon name="reset" />
          Limpiar filtros
        </button>
      </div>

      {filteredTasks.length > 0 ? (
        <div className="task-grid">
          {filteredTasks.map((task) => (
            <TaskCard key={task.id} {...task} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-icon"><Icon name="search" /></div>
          <h2>No se encontraron tareas</h2>
          <p>Prueba con otros términos o limpia los filtros.</p>
          <button type="button" className="clear-button" onClick={clearFilters}>Limpiar filtros</button>
        </div>
      )}
    </>
  )
}

export default TaskFilters
