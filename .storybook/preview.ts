import type { Preview } from '@storybook/react-vite'
import './preview.css'

const preview: Preview = {
  parameters: {
    layout: 'padded',
    backgrounds: {
      default: 'app',
      values: [
        { name: 'app', value: '#f8fafc' },
        { name: 'white', value: '#ffffff' },
        { name: 'slate', value: '#0f172a' },
      ],
    },
    controls: {
      expanded: true,
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      element: '#storybook-root',
      manual: false,
    },
    options: {
      storySort: {
        order: [
          'Introduction',
          'Workspace',
          ['Notebook', 'NotebookTitleControl', 'NotebookViewModeToggle', 'AddBlockMenu'],
          'Empty States',
          'Blocks',
          'Feedback',
        ],
      },
    },
  },
}

export default preview
