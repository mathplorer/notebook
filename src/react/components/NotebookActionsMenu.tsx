import { useEffect, useRef, useState } from 'react'
import {
  Copy,
  Download,
  MoreHorizontal,
  Trash2,
  Upload,
  type LucideIcon,
} from 'lucide-react'

export type NotebookActionsMenuProps = {
  onDelete: () => void
  onDuplicate: () => void
  onExport: () => void
  onImport: () => void
}

type NotebookMenuItemProps = {
  icon: LucideIcon
  label: string
  onClick: () => void
  tone?: 'danger' | 'neutral'
}

function NotebookMenuItem({
  icon: Icon,
  label,
  onClick,
  tone = 'neutral',
}: NotebookMenuItemProps) {
  const toneClasses =
    tone === 'danger'
      ? 'text-rose-700 hover:bg-rose-50'
      : 'text-slate-700 hover:bg-slate-50 hover:text-slate-950'

  return (
    <button
      type="button"
      onClick={onClick}
      role="menuitem"
      className={`flex min-h-9 w-full items-center gap-2 rounded-md px-2.5 py-2 text-left text-sm font-semibold transition ${toneClasses}`}
    >
      <Icon size={15} aria-hidden="true" />
      <span className="min-w-0 truncate">{label}</span>
    </button>
  )
}

export default function NotebookActionsMenu({
  onDelete,
  onDuplicate,
  onExport,
  onImport,
}: NotebookActionsMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen) {
      return
    }

    function handlePointerDown(event: PointerEvent) {
      const target = event.target

      if (target instanceof Node && !menuRef.current?.contains(target)) {
        setIsOpen(false)
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  function runAction(action: () => void) {
    setIsOpen(false)
    action()
  }

  return (
    <div ref={menuRef} className="relative">
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((current) => !current)}
        className="inline-flex min-h-9 items-center justify-center gap-1.5 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
      >
        <MoreHorizontal size={16} aria-hidden="true" />
        Actions
      </button>

      {isOpen && (
        <div
          role="menu"
          aria-label="Notebook actions"
          className="absolute right-0 z-20 mt-2 w-56 rounded-lg border border-slate-200 bg-white p-1.5 shadow-lg"
        >
          <p className="px-2.5 py-1.5 text-[11px] font-semibold uppercase text-slate-500">
            Notebook
          </p>
          <NotebookMenuItem
            icon={Copy}
            label="Duplicate"
            onClick={() => runAction(onDuplicate)}
          />
          <NotebookMenuItem
            icon={Trash2}
            label="Delete"
            onClick={() => runAction(onDelete)}
            tone="danger"
          />
          <div className="my-1 border-t border-slate-100" />
          <p className="px-2.5 py-1.5 text-[11px] font-semibold uppercase text-slate-500">
            Import and export
          </p>
          <NotebookMenuItem
            icon={Download}
            label="Export notebook"
            onClick={() => runAction(onExport)}
          />
          <NotebookMenuItem
            icon={Upload}
            label="Import notebook"
            onClick={() => runAction(onImport)}
          />
        </div>
      )}
    </div>
  )
}
