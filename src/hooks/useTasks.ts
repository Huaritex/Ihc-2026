import { useState } from 'react'
import { loadTasks, saveTasks } from '../data/storage'
import type { Task, TaskInput, TaskStatus } from '../data/tasks'

export function useTasks() {
  const [initial] = useState(loadTasks)
  const [tasks, setTasks] = useState<Task[]>(initial.tasks)
  const [saveFailed, setSaveFailed] = useState(false)

  /** Aplica el cambio en memoria y lo persiste; si no se puede guardar, la app sigue funcionando. */
  function commit(next: Task[]) {
    setTasks(next)
    setSaveFailed(!saveTasks(next))
  }

  function addTask(input: TaskInput) {
    commit([...tasks, { ...input, id: Math.max(0, ...tasks.map((t) => t.id)) + 1 }])
  }

  function updateTask(id: number, input: TaskInput) {
    commit(tasks.map((t) => (t.id === id ? { ...input, id } : t)))
  }

  function deleteTask(id: number) {
    commit(tasks.filter((t) => t.id !== id))
  }

  function setStatus(id: number, estado: TaskStatus) {
    commit(tasks.map((t) => (t.id === id ? { ...t, estado } : t)))
  }

  return { tasks, loadWarning: initial.warning, saveFailed, addTask, updateTask, deleteTask, setStatus }
}
