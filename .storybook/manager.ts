import { addons } from 'storybook/manager-api'
import { create } from 'storybook/theming/create'

const mathplorerTheme = create({
  base: 'light',
  brandTitle: '@mathplorer/notebook',
  brandTarget: '_self',
  colorPrimary: '#0f766e',
  colorSecondary: '#0d9488',
  appBg: '#f8fafc',
  appContentBg: '#ffffff',
  textColor: '#0f172a',
  barTextColor: '#475569',
  barSelectedColor: '#0f766e',
  barBg: '#ffffff',
  inputBg: '#ffffff',
  inputBorder: '#cbd5e1',
})

addons.setConfig({
  theme: mathplorerTheme,
})
