import { describe, expect, it } from 'vitest'
import {
  APP_NAME,
  NOTEBOOK_FILE_VERSION,
  parseNotebookJson,
  validateNotebookForStorage,
} from './notebookSerialization'
import type { Block, Notebook } from '../types'

function createStoredBlock(type: Block['type']): Block {
  return {
    id: `block-${type}`,
    type,
    content: '{}',
    createdAt: 1,
    updatedAt: 1,
  }
}

describe('notebookSerialization', () => {
  it('imports notebooks that contain discrete math block types', () => {
    const notebook: Notebook = {
      id: 'notebook-discrete',
      title: 'Discrete Math Foundations',
      blocks: [
        createStoredBlock('set'),
        createStoredBlock('combinatorics'),
        createStoredBlock('probability'),
        createStoredBlock('geometry'),
      ],
      createdAt: 1,
      updatedAt: 1,
    }
    const result = parseNotebookJson(
      JSON.stringify({
        app: APP_NAME,
        exportedAt: '2026-04-27T00:00:00.000Z',
        kind: 'notebook',
        notebook,
        version: NOTEBOOK_FILE_VERSION,
      }),
    )

    expect(result.ok).toBe(true)

    if (result.ok) {
      expect(result.notebook.blocks.map((block) => block.type)).toEqual([
        'set',
        'combinatorics',
        'probability',
        'geometry',
      ])
    }
  })

  it('validates synced notebooks without changing their IDs', () => {
    const notebook: Notebook = {
      id: 'notebook-synced',
      title: '  Synced notebook  ',
      blocks: [createStoredBlock('text')],
      createdAt: 1,
      updatedAt: 2,
    }
    const result = validateNotebookForStorage(notebook)

    expect(result.ok).toBe(true)

    if (result.ok) {
      expect(result.notebook.id).toBe('notebook-synced')
      expect(result.notebook.blocks[0]?.id).toBe('block-text')
      expect(result.notebook.title).toBe('Synced notebook')
    }
  })

  it('rejects synced notebooks with duplicate block IDs', () => {
    const block = createStoredBlock('formula')
    const result = validateNotebookForStorage({
      id: 'notebook-duplicate-blocks',
      title: 'Duplicate blocks',
      blocks: [block, block],
      createdAt: 1,
      updatedAt: 2,
    })

    expect(result.ok).toBe(false)
  })
})
