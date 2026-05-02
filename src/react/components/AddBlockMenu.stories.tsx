import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import AddBlockMenu from './AddBlockMenu'

const meta = {
  title: 'Workspace/AddBlockMenu',
  component: AddBlockMenu,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Grouped picker shown above the notebook in edit mode. Each tile creates a new block of the chosen type.',
      },
    },
  },
  args: {
    onAddBlock: fn(),
  },
  decorators: [
    (Story) => (
      <div className="bg-slate-50 p-6">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof AddBlockMenu>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
