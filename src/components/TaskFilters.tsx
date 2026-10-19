import { useState } from 'react'
import { tasks } from '../data/tasks'
import TaskCard from './TaskCard'
import Icon from './Icon'

function normalize(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase()
    .trim()
}

function TaskFilters() {
  const [query, setQuery] = useState('')
  const searchTerms = normalize(query).split(/\s+/).filter(Boolean)

  const filteredTasks = tasks.filter((task) => {
    const searchableText = normalize(
      [task.materia, task.docente, task.estado, task.fecha].join(' '),
    )

    return searchTerms.every((term) => searchableText.includes(term))
  })

  function clearSearch() {
    setQuery('')
  }

  return (
    <>
      <section aria-label="Filtrar tareas" className="filter-panel">
        <div className="field-control">
          <Icon name="search" />
          <input
            id="task-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscar tareas..."
            aria-label="Buscar tareas por materia, docente, estado o fecha"
          />
        </div>
        <button
          type="button"
          onClick={clearSearch}
          disabled={!query}
          className="clear-button"
        >
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
            <TaskCard key={task.id} {...task} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-icon"><Icon name="search" /></div>
          <h2>No se encontraron tareas</h2>
          <p>Prueba con otros términos o limpia la búsqueda.</p>
        </div>
      )}
    </>
  )
}

export default TaskFilters
