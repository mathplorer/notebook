import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const externalPackages = [
  'katex',
  'lucide-react',
  'mathjs',
  'react',
  'react-dom',
  'react-markdown',
  'rehype-katex',
  'remark-gfm',
  'remark-math',
]

function isExternal(id: string) {
  return externalPackages.some(
    (packageName) => id === packageName || id.startsWith(`${packageName}/`),
  )
}

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    lib: {
      entry: {
        index: 'src/index.ts',
        core: 'src/core/index.ts',
        react: 'src/react/index.ts',
      },
      formats: ['es'],
      fileName: (_format, entryName) => `${entryName}.js`,
    },
    rollupOptions: {
      external: isExternal,
    },
  },
})
