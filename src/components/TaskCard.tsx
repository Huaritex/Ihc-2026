type TaskCardProps = {
  materia: string
  docente: string
  fecha: string
  estado: string
}

const estadoStyles: Record<string, string> = {
  Pendiente: 'bg-amber-50 text-amber-700 ring-amber-600/20',
  'En progreso': 'bg-sky-50 text-sky-700 ring-sky-600/20',
  Finalizada: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
}

function TaskCard({ materia, docente, fecha, estado }: TaskCardProps) {
  return (
    <article className="flex min-h-52 flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md sm:p-6">
      <div className="mb-5 flex items-start justify-between gap-3">
        <h3 className="min-w-0 break-words text-lg font-semibold leading-snug text-slate-900 sm:text-xl">
          {materia}
        </h3>
        <span className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset sm:text-sm ${estadoStyles[estado] ?? 'bg-slate-100 text-slate-700 ring-slate-600/20'}`}>
          {estado}
        </span>
      </div>
      <dl className="mt-auto space-y-3 border-t border-slate-100 pt-4 text-sm sm:text-base">
        <div className="flex flex-wrap gap-x-2">
          <dt className="font-medium text-slate-500">Docente</dt>
          <dd className="min-w-0 break-words text-slate-800">{docente}</dd>
        </div>
        <div className="flex flex-wrap gap-x-2">
          <dt className="font-medium text-slate-500">Fecha de entrega</dt>
          <dd className="text-slate-800">{fecha}</dd>
        </div>
      </dl>
    </article>
  )
}

export default TaskCard