function Header() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex w-full max-w-6xl items-center gap-4 px-4 py-5 sm:px-6 sm:py-6 lg:px-8">
        <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-indigo-600 text-lg font-bold text-white shadow-sm shadow-indigo-200 sm:size-14 sm:text-xl" aria-hidden="true">
          GA
        </div>
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-indigo-600 sm:text-sm">
            Espacio académico
          </p>
          <h1 className="mt-1 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
            Gestor de Actividades
          </h1>
          <p className="mt-1 text-sm text-slate-500 sm:text-base">
            Organiza tus tareas académicas de forma eficiente.
          </p>
        </div>
      </div>
    </header>
  )
}

export default Header