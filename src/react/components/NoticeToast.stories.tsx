import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import NoticeToast from './NoticeToast'

const meta = {
  title: 'Feedback/NoticeToast',
  component: NoticeToast,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Transient toast for confirmations and errors. Auto-dismisses after 3.5s for success and 6s for errors; the dismiss button fires the same callback.',
      },
    },
  },
  args: {
    onDismiss: fn(),
  },
  decorators: [
    (Story) => (
      <div className="relative h-72 w-full bg-slate-100">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof NoticeToast>

export default meta

type Story = StoryObj<typeof meta>

export const Success: Story = {
  args: {
    notice: {
      message: 'Notebook saved to disk.',
      tone: 'success',
    },
  },
}

export const Error: Story = {
  args: {
    notice: {
      message:
        'Could not parse the imported notebook. The file may be from an older version.',
      tone: 'error',
    },
  },
}
