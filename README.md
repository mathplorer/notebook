# @mathplorer/notebook

Shared notebook types, math logic, sample content, serialization helpers, and React components for Mathplorer apps.

## Install

```sh
npm install @mathplorer/notebook
```

## Usage

Server-safe core utilities:

```ts
import { createNotebook, createBlock, parseWorkspaceJson } from '@mathplorer/notebook'
```

React notebook UI:

```tsx
import { Notebook } from '@mathplorer/notebook/react'
import '@mathplorer/notebook/styles.css'
```

The package is storage-agnostic. Desktop, browser, and server apps own their persistence layer.

## Storybook

Component docs live in Storybook. The same build is published to GitHub Pages on every push to `main` via `.github/workflows/deploy-storybook.yml`.

```sh
npm install
npm run storybook        # dev server on http://localhost:6006
npm run build-storybook  # static build into ./storybook-static
```

Stories live next to their components as `*.stories.tsx`. Tailwind utilities and `styles.css` are loaded by `.storybook/preview.css`, so previews match the consuming app exactly.

To enable the Pages site once, in GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**. Subsequent pushes will publish automatically.
