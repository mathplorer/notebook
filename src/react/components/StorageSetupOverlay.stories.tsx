import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import StorageSetupOverlay from './StorageSetupOverlay'

const meta = {
  title: 'Empty States/StorageSetupOverlay',
  component: StorageSetupOverlay,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Modal overlay shown by the desktop app while resolving notebook storage. Switches between loading, needs-folder, and error modes.',
      },
    },
  },
  args: {
    onChooseFolder: fn(),
    isChoosing: false,
    mode: 'needs-folder',
  },
  argTypes: {
    mode: {
      control: 'inline-radio',
      options: ['loading', 'needs-folder', 'error'],
    },
  },
} satisfies Meta<typeof StorageSetupOverlay>

export default meta

type Story = StoryObj<typeof meta>

export const NeedsFolder: Story = {}

export const Loading: Story = {
  args: {
    mode: 'loading',
  },
}

export const Choosing: Story = {
  args: {
    mode: 'needs-folder',
    isChoosing: true,
  },
}

export const Error: Story = {
  args: {
    mode: 'error',
    message:
      'Permission denied while opening "/Users/me/Notebooks". Pick another folder.',
  },
}
