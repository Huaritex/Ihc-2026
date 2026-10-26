import { useState } from 'react'
import { TASK_STATUSES } from '../data/tasks'
import type { Task, TaskStatus } from '../data/tasks'
import { compareDates } from '../utils/dates'
import TaskCard from './TaskCard'
import Icon from './Icon'

type SortOrder = 'asc' | 'desc'

type TaskFiltersProps = {
  tasks: Task[]
  onEdit: (task: Task) => void
  onDelete: (id: number) => void
  onStatusChange: (id: number, estado: TaskStatus) => void
}

function normalize(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase()
    .trim()
}

function TaskFilters({ tasks, onEdit, onDelete, onStatusChange }: TaskFiltersProps) {
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState<'' | TaskStatus>('')
  const [materiaFilter, setMateria] = useState('')
  const [order, setOrder] = useState<SortOrder>('asc')

  const searchTerms = normalize(query).split(/\s+/).filter(Boolean)
  const materias = [...new Set(tasks.map((t) => t.materia))].sort((a, b) => a.localeCompare(b, 'es'))
  // Si la materia elegida ya no existe (tarea editada o eliminada), el filtro deja de aplicarse.
  const materia = materias.includes(materiaFilter) ? materiaFilter : ''
  const hasFilters = Boolean(query || status || materia || order !== 'asc')

  const filteredTasks = tasks
    .filter((task) => {
      if (status && task.estado !== status) return false
      if (materia && task.materia !== materia) return false
      const searchableText = normalize([task.materia, task.docente].join(' '))
      return searchTerms.every((term) => searchableText.includes(term))
    })
    .sort((a, b) => (order === 'asc' ? compareDates(a.fecha, b.fecha) : compareDates(b.fecha, a.fecha)))

  function clearFilters() {
    setQuery('')
    setStatus('')
    setMateria('')
    setOrder('asc')
  }

  return (
    <>
      <section aria-label="Filtrar tareas" className="filter-panel">
        <div className="field-control search-control">
          <Icon name="search" />
          <input
            id="task-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscar tareas..."
            aria-label="Buscar tareas por materia o docente"
          />
        </div>
        <select
          className="filter-select"
          value={status}
          onChange={(e) => setStatus(e.target.value as '' | TaskStatus)}
          aria-label="Filtrar por estado"
        >
          <option value="">Todos los estados</option>
          {TASK_STATUSES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <select
          className="filter-select"
          value={materia}
          onChange={(e) => setMateria(e.target.value)}
          aria-label="Filtrar por materia"
        >
          <option value="">Todas las materias</option>
          {materias.map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
        <select
          className="filter-select"
          value={order}
          onChange={(e) => setOrder(e.target.value as SortOrder)}
          aria-label="Ordenar por fecha de entrega"
        >
          <option value="asc">Fecha: más próxima</option>
          <option value="desc">Fecha: más lejana</option>
        </select>
        <button type="button" onClick={clearFilters} disabled={!hasFilters} className="clear-button">
          <Icon name="reset" />
          Limpiar
        </button>
      </section>

      <p className="results-count" role="status" aria-atomic="true">
        <span>{filteredTasks.length}</span> {filteredTasks.length === 1 ? 'actividad encontrada' : 'actividades encontradas'}
      </p>

      {filteredTasks.length > 0 ? (
        <div className="task-grid">
          {filteredTasks.map((task) => (
            <TaskCard key={task.id} task={task} onEdit={onEdit} onDelete={onDelete} onStatusChange={onStatusChange} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-icon"><Icon name="search" /></div>
          <h2>{tasks.length === 0 ? 'Aún no tienes tareas' : 'No se encontraron tareas'}</h2>
          <p>
            {tasks.length === 0
              ? 'Crea tu primera tarea con el botón "Nueva tarea".'
              : 'Prueba con otros términos o limpia los filtros.'}
          </p>
        </div>
      )}
    </>
  )
}

export default TaskFilters
