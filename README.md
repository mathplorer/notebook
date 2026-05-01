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
