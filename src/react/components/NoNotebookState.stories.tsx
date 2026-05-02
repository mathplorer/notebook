import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import NoNotebookState from './NoNotebookState'

const meta = {
  title: 'Empty States/NoNotebookState',
  component: NoNotebookState,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Workspace empty state with three entry points: blank notebook, sample notebook, or imported JSON.',
      },
    },
  },
  args: {
    onCreateNotebook: fn(),
    onCreateSampleNotebook: fn(),
    onImportNotebook: fn(),
  },
  decorators: [
    (Story) => (
      <div className="bg-slate-50 p-8">
        <div className="mx-auto max-w-3xl">
          <Story />
        </div>
      </div>
    ),
  ],
} satisfies Meta<typeof NoNotebookState>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
