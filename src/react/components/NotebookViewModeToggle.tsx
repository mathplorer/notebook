import { Eye, PencilLine } from 'lucide-react'
import type { NotebookViewMode } from '../../core/types'

export type NotebookViewModeToggleProps = {
  mode: NotebookViewMode
  onModeChange: (mode: NotebookViewMode) => void
}

export default function NotebookViewModeToggle({
  mode,
  onModeChange,
}: NotebookViewModeToggleProps) {
  const options: Array<{
    icon: typeof Eye
    label: string
    value: NotebookViewMode
  }> = [
    { icon: Eye, label: 'Preview', value: 'preview' },
    { icon: PencilLine, label: 'Edit', value: 'edit' },
  ]

  return (
    <div
      aria-label="Notebook view mode"
      className="inline-flex rounded-lg border border-slate-200 bg-slate-100 p-1"
      role="group"
    >
      {options.map(({ icon: Icon, label, value }) => {
        const isSelected = mode === value

        return (
          <button
            key={value}
            type="button"
            aria-pressed={isSelected}
            onClick={() => onModeChange(value)}
            className={`inline-flex min-h-8 items-center justify-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-semibold transition ${
              isSelected
                ? 'bg-white text-slate-950 shadow-sm ring-1 ring-slate-200'
                : 'text-slate-600 hover:bg-white/70 hover:text-slate-950'
            }`}
          >
            <Icon size={15} aria-hidden="true" />
            {label}
          </button>
        )
      })}
    </div>
  )
}
