import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import TextBlock from './TextBlock'

const meta = {
  title: 'Blocks/TextBlock',
  component: TextBlock,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Markdown text block with KaTeX rendering. Edit mode shows the raw textarea alongside a live preview; preview mode renders just the formatted output.',
      },
    },
  },
  args: {
    onChange: fn(),
    mode: 'edit',
    content:
      '## Notes\n\nWrite **key ideas** here, and use inline math like $x^2 + 1$.',
  },
  argTypes: {
    mode: {
      control: 'inline-radio',
      options: ['edit', 'preview'],
    },
  },
} satisfies Meta<typeof TextBlock>

export default meta

type Story = StoryObj<typeof meta>

export const Edit: Story = {}

export const Preview: Story = {
  args: {
    mode: 'preview',
  },
}

export const RichMarkdown: Story = {
  args: {
    mode: 'preview',
    content: [
      '# Discriminant cheat sheet',
      '',
      'For $ax^2 + bx + c = 0$, the discriminant is $\\Delta = b^2 - 4ac$.',
      '',
      '- $\\Delta > 0$ — two distinct real roots',
      '- $\\Delta = 0$ — one repeated real root',
      '- $\\Delta < 0$ — two complex conjugate roots',
      '',
      'Worked example: for $x^2 - 4x + 3 = 0$, `Δ = 4` and the roots are `1, 3`.',
    ].join('\n'),
  },
}

export const Empty: Story = {
  args: {
    mode: 'edit',
    content: '',
  },
}

export const Interactive: Story = {
  render: function Render(args) {
    const [content, setContent] = useState(args.content)
    return (
      <TextBlock
        content={content}
        mode={args.mode}
        onChange={(next) => {
          setContent(next)
          args.onChange?.(next)
        }}
      />
    )
  },
}
