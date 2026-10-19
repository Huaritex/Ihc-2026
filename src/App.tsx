import TaskFilters from './components/TaskFilters'

function App() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-800 sm:px-6 sm:py-12 lg:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <section aria-labelledby="tasks-heading">
          <div className="mb-6 flex flex-col gap-2 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 id="tasks-heading" className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Mis tareas
              </h1>
            </div>
          </div>

          <TaskFilters />
        </section>
      </div>
    </main>
  )
}

export default App
