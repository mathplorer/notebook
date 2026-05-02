import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import NotebookTitleControl from './NotebookTitleControl'

const meta = {
  title: 'Workspace/NotebookTitleControl',
  component: NotebookTitleControl,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Inline notebook title input. Commits on blur or Enter; reverts to the original value on Escape.',
      },
    },
  },
  args: {
    onRename: fn(),
    title: 'Quadratic explorations',
  },
  decorators: [
    (Story) => (
      <div className="max-w-2xl rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof NotebookTitleControl>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const LongTitle: Story = {
  args: {
    title:
      'Polynomial factorisation, rational roots, and a tour of the discriminant',
  },
}

export const Empty: Story = {
  args: {
    title: '',
  },
}

export const Interactive: Story = {
  render: function Render(args) {
    const [title, setTitle] = useState(args.title)
    return (
      <NotebookTitleControl
        title={title}
        onRename={(next) => {
          setTitle(next)
          args.onRename?.(next)
        }}
      />
    )
  },
}
