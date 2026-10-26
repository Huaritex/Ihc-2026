import { useState } from 'react'
import TaskFilters from './components/TaskFilters'
import TaskForm from './components/TaskForm'
import Header from './components/Header'
import Footer from './components/Footer'
import Icon from './components/Icon'
import { useTasks } from './hooks/useTasks'
import type { Task, TaskInput, TaskStatus } from './data/tasks'

function App() {
  const { tasks, loadWarning, saveFailed, addTask, updateTask, deleteTask, setStatus } = useTasks()
  const [formOpen, setFormOpen] = useState(false)
  const [editing, setEditing] = useState<Task | null>(null)
  // Cambia en cada apertura para que el formulario arranque limpio o con los datos de la tarea.
  const [formKey, setFormKey] = useState(0)
  const [notice, setNotice] = useState('')

  function openForm(task: Task | null) {
    setEditing(task)
    setFormKey((k) => k + 1)
    setFormOpen(true)
  }

  function closeForm() {
    setFormOpen(false)
  }

  function handleSubmit(input: TaskInput) {
    if (editing) {
      updateTask(editing.id, input)
      setNotice(`Tarea de ${input.materia} actualizada.`)
    } else {
      addTask(input)
      setNotice(`Tarea de ${input.materia} creada.`)
    }
    closeForm()
  }

  function handleDelete(id: number) {
    const task = tasks.find((t) => t.id === id)
    deleteTask(id)
    setNotice(task ? `Tarea de ${task.materia} eliminada.` : 'Tarea eliminada.')
  }

  function handleStatusChange(id: number, estado: TaskStatus) {
    const task = tasks.find((t) => t.id === id)
    setStatus(id, estado)
    if (task) setNotice(`Tarea de ${task.materia}: ${estado}.`)
  }

  return (
    <>
      <Header />
      <main className="workspace">
        <section aria-labelledby="tasks-heading">
          <div className="page-heading">
            <div>
              <h1 id="tasks-heading">Mis tareas</h1>
              <p>Encuentra tus actividades y mantén tus entregas en orden.</p>
            </div>
            <button type="button" className="btn btn-primary" onClick={() => openForm(null)}>
              <Icon name="plus" /> Nueva tarea
            </button>
          </div>

          <p className="notice notice-success" role="status" hidden={!notice}>
            {notice}
          </p>
          {loadWarning && (
            <p className="notice notice-warning" role="alert">
              {loadWarning}
            </p>
          )}
          {saveFailed && (
            <p className="notice notice-error" role="alert">
              No se pudieron guardar los cambios en este navegador. Seguirán visibles hasta que cierres la página.
            </p>
          )}

          <TaskFilters tasks={tasks} onEdit={openForm} onDelete={handleDelete} onStatusChange={handleStatusChange} />
        </section>
      </main>
      <Footer />
      <TaskForm key={formKey} open={formOpen} task={editing} onSubmit={handleSubmit} onClose={closeForm} />
    </>
  )
}

export default App
