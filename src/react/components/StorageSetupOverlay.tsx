import { AlertCircle, FolderOpen, Loader2 } from 'lucide-react'

export type StorageSetupOverlayProps = {
  isChoosing: boolean
  message?: string
  mode: 'error' | 'loading' | 'needs-folder'
  onChooseFolder: () => void
}

export default function StorageSetupOverlay({
  isChoosing,
  message,
  mode,
  onChooseFolder,
}: StorageSetupOverlayProps) {
  const isLoading = mode === 'loading'
  const isError = mode === 'error'
  const title = isLoading
    ? 'Opening notebook storage'
    : isError
      ? 'Choose a different folder'
      : 'Choose a notebook folder'
  const body = isLoading
    ? 'Checking the folder configured for this app.'
    : isError
      ? (message ?? 'The configured notebook folder could not be opened.')
      : 'Pick the folder where Math Notebook Lab should save its workspace file.'

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-950/30 px-4 py-6 backdrop-blur-sm">
      <section className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-6 text-center shadow-xl">
        <div
          className={`mx-auto flex h-12 w-12 items-center justify-center rounded-lg ${
            isError ? 'bg-rose-50 text-rose-600' : 'bg-teal-50 text-teal-700'
          }`}
        >
          {isLoading ? (
            <Loader2 size={24} className="animate-spin" aria-hidden="true" />
          ) : isError ? (
            <AlertCircle size={24} aria-hidden="true" />
          ) : (
            <FolderOpen size={24} aria-hidden="true" />
          )}
        </div>
        <h2 className="mt-5 text-xl font-semibold text-slate-950">
          {title}
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-500">{body}</p>
        {!isLoading && (
          <button
            type="button"
            onClick={onChooseFolder}
            disabled={isChoosing}
            className="mnl-button-primary mt-6 disabled:cursor-wait"
          >
            {isChoosing ? (
              <Loader2 size={16} className="animate-spin" aria-hidden="true" />
            ) : (
              <FolderOpen size={16} aria-hidden="true" />
            )}
            Choose folder
          </button>
        )}
      </section>
    </div>
  )
}
