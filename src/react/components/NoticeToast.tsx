import { useEffect } from 'react'
import { AlertCircle, CheckCircle2, X } from 'lucide-react'

export type AppNotice = {
  message: string
  tone: 'error' | 'success'
}

export type NoticeToastProps = {
  notice: AppNotice
  onDismiss: () => void
}

export default function NoticeToast({ notice, onDismiss }: NoticeToastProps) {
  const isError = notice.tone === 'error'
  const Icon = isError ? AlertCircle : CheckCircle2

  useEffect(() => {
    const timeoutId = window.setTimeout(onDismiss, isError ? 6000 : 3500)
    return () => window.clearTimeout(timeoutId)
  }, [notice, isError, onDismiss])

  return (
    <div
      aria-live="polite"
      role="status"
      className="pointer-events-none fixed inset-x-0 bottom-4 z-50 flex justify-center px-4 sm:bottom-6 sm:right-6 sm:left-auto sm:justify-end sm:px-0"
    >
      <div
        className={`animate-fade-in pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-lg border bg-white px-4 py-3 text-sm shadow-lg ${
          isError ? 'border-rose-200' : 'border-slate-200'
        }`}
      >
        <span
          className={`flex h-8 w-8 flex-none items-center justify-center rounded-md ${
            isError ? 'bg-rose-50 text-rose-600' : 'bg-teal-50 text-teal-600'
          }`}
        >
          <Icon size={16} aria-hidden="true" />
        </span>
        <div className="flex-1 pt-0.5">
          <p className="font-semibold text-slate-900">
            {isError ? 'Something went wrong' : 'Done'}
          </p>
          <p className="mt-0.5 leading-5 text-slate-600">{notice.message}</p>
        </div>
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss notice"
          className="mnl-icon-button -mr-1 -mt-1 h-7 w-7 border-0"
        >
          <X size={14} aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}
