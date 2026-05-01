import {
  Cloud,
  Download,
  Files,
  FolderOpen,
  HardDrive,
  LogIn,
  LogOut,
  RefreshCw,
  Trash2,
  Upload,
} from 'lucide-react'
import type { ReactNode } from 'react'

export type SyncedNotebookSummary = {
  id: string
  revision: number
  title: string
  updatedAt: string
}

type SettingsPageProps = {
  accountEmail?: string | null
  accountStatusLabel?: string
  blockCount: number
  notebookCount: number
  onChangeStorageFolder: () => void
  onDeleteSyncedNotebook?: (id: string) => void
  onExportWorkspace: () => void
  onImportWorkspace: () => void
  onOpenAuth?: () => void
  onOpenSyncedNotebook?: (id: string) => void
  onSignOut?: () => void
  onSyncCurrentNotebook?: () => void
  storageChangeDisabled: boolean
  storageFolderPath: string | null
  storageStatusLabel: string
  syncCurrentDisabled?: boolean
  syncStatusLabel?: string
  syncedNotebookActionDisabled?: boolean
  syncedNotebooks?: SyncedNotebookSummary[]
}

function SettingsCard({
  children,
  title,
}: {
  children: ReactNode
  title: string
}) {
  return (
    <section className="mnl-panel overflow-hidden">
      <div className="border-b border-slate-200 bg-slate-50 px-4 py-3">
        <h2 className="text-sm font-semibold text-slate-950">{title}</h2>
      </div>
      <div className="p-4">{children}</div>
    </section>
  )
}

export default function SettingsPage({
  accountEmail,
  accountStatusLabel,
  blockCount,
  notebookCount,
  onChangeStorageFolder,
  onDeleteSyncedNotebook,
  onExportWorkspace,
  onImportWorkspace,
  onOpenAuth,
  onOpenSyncedNotebook,
  onSignOut,
  onSyncCurrentNotebook,
  storageChangeDisabled,
  storageFolderPath,
  storageStatusLabel,
  syncCurrentDisabled = false,
  syncStatusLabel,
  syncedNotebookActionDisabled = false,
  syncedNotebooks,
}: SettingsPageProps) {
  const hasCloudControls =
    accountStatusLabel ||
    onOpenAuth ||
    onSignOut ||
    onSyncCurrentNotebook ||
    syncedNotebooks

  return (
    <div className="space-y-5">
      <header className="mnl-panel px-4 py-4 sm:px-5">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-950 text-white">
            <HardDrive size={18} aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase text-teal-700">
              Workspace
            </p>
            <h1 className="text-2xl font-semibold text-slate-950 sm:text-3xl">
              Settings
            </h1>
          </div>
        </div>
      </header>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_20rem]">
        <div className="space-y-5">
          {hasCloudControls && (
            <SettingsCard title="Account">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-slate-900">
                    {accountEmail ?? 'Not signed in'}
                  </p>
                  {accountStatusLabel && (
                    <p className="mt-1 text-sm leading-6 text-slate-600">
                      {accountStatusLabel}
                    </p>
                  )}
                  {syncStatusLabel && (
                    <p className="mt-3 inline-flex rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-600">
                      {syncStatusLabel}
                    </p>
                  )}
                </div>
                <div className="flex shrink-0 flex-wrap gap-2">
                  {onSyncCurrentNotebook && (
                    <button
                      type="button"
                      onClick={onSyncCurrentNotebook}
                      disabled={syncCurrentDisabled}
                      className="mnl-button-secondary"
                    >
                      <RefreshCw size={15} aria-hidden="true" />
                      Sync
                    </button>
                  )}
                  {accountEmail && onSignOut ? (
                    <button
                      type="button"
                      onClick={onSignOut}
                      className="mnl-button-secondary"
                    >
                      <LogOut size={15} aria-hidden="true" />
                      Sign out
                    </button>
                  ) : (
                    onOpenAuth && (
                      <button
                        type="button"
                        onClick={onOpenAuth}
                        className="mnl-button-secondary"
                      >
                        <LogIn size={15} aria-hidden="true" />
                        Sign in
                      </button>
                    )
                  )}
                </div>
              </div>
            </SettingsCard>
          )}

          {syncedNotebooks && (
            <SettingsCard title="Synced notebooks">
              {syncedNotebooks.length === 0 ? (
                <p className="rounded-md border border-dashed border-slate-300 bg-white px-3 py-6 text-center text-sm leading-6 text-slate-500">
                  No synced notebooks yet.
                </p>
              ) : (
                <div className="space-y-2">
                  {syncedNotebooks.map((notebook) => (
                    <div
                      key={notebook.id}
                      className="flex flex-col gap-3 rounded-md border border-slate-200 bg-white px-3 py-3 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-slate-900">
                          {notebook.title}
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                          Revision {notebook.revision} - Updated{' '}
                          {new Date(notebook.updatedAt).toLocaleString([], {
                            dateStyle: 'medium',
                            timeStyle: 'short',
                          })}
                        </p>
                      </div>
                      <div className="flex shrink-0 flex-wrap gap-2">
                        {onOpenSyncedNotebook && (
                          <button
                            type="button"
                            onClick={() => onOpenSyncedNotebook(notebook.id)}
                            disabled={syncedNotebookActionDisabled}
                            className="mnl-button-secondary"
                          >
                            <Cloud size={15} aria-hidden="true" />
                            Open
                          </button>
                        )}
                        {onDeleteSyncedNotebook && (
                          <button
                            type="button"
                            onClick={() => onDeleteSyncedNotebook(notebook.id)}
                            disabled={syncedNotebookActionDisabled}
                            className="mnl-button-secondary text-rose-700 hover:border-rose-200 hover:bg-rose-50"
                          >
                            <Trash2 size={15} aria-hidden="true" />
                            Delete cloud copy
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </SettingsCard>
          )}

          <SettingsCard title="Storage">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-slate-900">
                  Notebook folder
                </p>
                <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-600">
                  Math Notebook Lab keeps notebooks local to this device.
                </p>
                <p
                  title={storageFolderPath ?? storageStatusLabel}
                  className="mt-3 break-all rounded-md border border-slate-200 bg-slate-50 px-3 py-2 font-mono text-xs leading-5 text-slate-700"
                >
                  {storageFolderPath ?? storageStatusLabel}
                </p>
              </div>
              <button
                type="button"
                onClick={onChangeStorageFolder}
                disabled={storageChangeDisabled}
                className="mnl-button-secondary shrink-0"
              >
                <FolderOpen size={15} aria-hidden="true" />
                Change folder
              </button>
            </div>
          </SettingsCard>

          <SettingsCard title="Workspace data">
            <div className="grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={onExportWorkspace}
                className="mnl-button-secondary justify-start"
              >
                <Download size={15} aria-hidden="true" />
                Export workspace
              </button>
              <button
                type="button"
                onClick={onImportWorkspace}
                className="mnl-button-secondary justify-start"
              >
                <Upload size={15} aria-hidden="true" />
                Import workspace
              </button>
            </div>
            <p className="mt-3 text-xs leading-5 text-slate-500">
              Workspace import replaces the notebooks saved on this device after
              confirmation.
            </p>
          </SettingsCard>
        </div>

        <aside className="mnl-panel h-fit p-4">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-teal-50 text-teal-700 ring-1 ring-teal-100">
              <Files size={15} aria-hidden="true" />
            </span>
            <p className="text-sm font-semibold text-slate-900">Workspace size</p>
          </div>
          <dl className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2">
              <dt className="text-[11px] font-semibold uppercase text-slate-500">
                Notebooks
              </dt>
              <dd className="mt-1 text-xl font-semibold text-slate-950">
                {notebookCount}
              </dd>
            </div>
            <div className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2">
              <dt className="text-[11px] font-semibold uppercase text-slate-500">
                Blocks
              </dt>
              <dd className="mt-1 text-xl font-semibold text-slate-950">
                {blockCount}
              </dd>
            </div>
          </dl>
        </aside>
      </div>
    </div>
  )
}
