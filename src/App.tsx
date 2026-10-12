import Header from './components/Header'
import TaskCard from './components/TaskCard'
import './App.css'

const tareas = [
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

function App() {
  return (
    <div className="app-shell">
      <Header />

      {/* Task Seccion */}
      <main className="task-section">
        <h2>Mis tareas</h2>
        <div className="task-list">
          {tareas.map((tarea) => (
            <TaskCard key={tarea.id} {...tarea} />
          ))}
        </div>
      </main>

    </div>
  )
}

export default App
