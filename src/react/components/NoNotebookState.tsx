import { BookOpen, Plus, Upload } from 'lucide-react'

export type NoNotebookStateProps = {
  onCreateNotebook: () => void
  onCreateSampleNotebook: () => void
  onImportNotebook: () => void
}

export default function NoNotebookState({
  onCreateNotebook,
  onCreateSampleNotebook,
  onImportNotebook,
}: NoNotebookStateProps) {
  return (
    <section className="mnl-panel px-6 py-14 text-center">
      <div className="mx-auto max-w-xl">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-lg bg-teal-700 text-2xl font-semibold text-white shadow-sm">
          ∑
        </div>
        <p className="mt-6 text-2xl font-semibold text-slate-950">
          Start a workspace notebook
        </p>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Create a blank notebook, start from a sample, or import a notebook JSON
          file. Everything is saved locally on this device.
        </p>
        <div className="mt-6 flex flex-col justify-center gap-2 sm:flex-row">
          <button
            type="button"
            onClick={onCreateNotebook}
            className="mnl-button-primary"
          >
            <Plus size={16} aria-hidden="true" />
            New notebook
          </button>
          <button
            type="button"
            onClick={onCreateSampleNotebook}
            className="mnl-button-secondary"
          >
            <BookOpen size={16} aria-hidden="true" />
            Create sample
          </button>
          <button
            type="button"
            onClick={onImportNotebook}
            className="mnl-button-secondary"
          >
            <Upload size={16} aria-hidden="true" />
            Import notebook
          </button>
        </div>
      </div>
    </section>
  )
}
