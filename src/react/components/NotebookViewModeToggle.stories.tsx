import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import NotebookViewModeToggle from './NotebookViewModeToggle'
import type { NotebookViewMode } from '../../core/types'

const meta = {
  title: 'Workspace/NotebookViewModeToggle',
  component: NotebookViewModeToggle,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Two-state segmented control that swaps the notebook between read-only preview and editable mode. Used in the workspace header.',
      },
    },
  },
  args: {
    onModeChange: fn(),
  },
} satisfies Meta<typeof NotebookViewModeToggle>

export default meta

type Story = StoryObj<typeof meta>

export const Preview: Story = {
  args: {
    mode: 'preview',
  },
}

export const Edit: Story = {
  args: {
    mode: 'edit',
  },
}

export const Interactive: Story = {
  args: {
    mode: 'preview',
  },
  render: function Render(args) {
    const [mode, setMode] = useState<NotebookViewMode>(args.mode)
    return (
      <NotebookViewModeToggle
        mode={mode}
        onModeChange={(next) => {
          setMode(next)
          args.onModeChange?.(next)
        }}
      />
    )
  },
}
