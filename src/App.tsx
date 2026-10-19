import TaskFilters from './components/TaskFilters'
import Header from './components/Header'

function App() {
  return (
    <>
      <Header />
      <main className="workspace">
        <section aria-labelledby="tasks-heading">
          <div className="page-heading">
            <h1 id="tasks-heading">Mis tareas</h1>
            <p>Encuentra tus actividades y mantén tus entregas en orden.</p>
          </div>

          <TaskFilters />
        </section>
      </main>
    </>
  )
}

export default App
