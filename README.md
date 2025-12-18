# App Graph Builder

ReactFlow-based app for visualizing service architectures. Built with React, TypeScript, and some cool libraries.

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

```bash
npm install
npm run dev
```

Open `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking

## 📋 Features

### Features

1. **Layout**
   - Top bar with fit view and node controls
   - Left sidebar for navigation
   - Right panel showing apps and node details
   - Dotted canvas background
   - Works on mobile too

2. **ReactFlow Stuff**
   - Drag and drop nodes around
   - Click to select, Delete key to remove
   - Add Node button creates new service/database nodes
   - Different node types with unique styling (Service: blue, Database: emerald)
   - Zoom/pan controls
   - Mini-map in corner
   - Keyboard shortcuts: F (fit view), P (toggle panel)

3. **Node Inspector**
   - Shows node status (Healthy/Degraded/Down)
   - Click metrics on nodes to switch the display bar
   - Edit everything in the right panel:
     - Name and description
     - CPU, Memory, Disk sliders
     - Region count
   - Config and Runtime tabs
   - Updates in real-time

4. **API & State**
   - Mock APIs with MSW (no backend needed)
   - TanStack Query for data fetching
   - Zustand for UI state
   - Loading and error states handled

5. **TypeScript**
   - Strict mode enabled
   - All components typed
   - ESLint setup

## Project Structure

```
src/
├── components/
│   ├── canvas/
│   │   ├── FlowCanvas.tsx      # Main ReactFlow canvas
│   │   └── ServiceNode.tsx     # Custom service node component
│   ├── layout/
│   │   ├── TopBar.tsx          # Top navigation bar
│   │   ├── LeftRail.tsx        # Left sidebar navigation
│   │   ├── AppsList.tsx        # Applications list
│   │   ├── NodeInspector.tsx   # Node details inspector
│   │   └── RightPanel.tsx      # Right panel container
│   └── ui/                      # shadcn/ui components
├── hooks/
│   └── useApi.ts               # TanStack Query hooks
├── mocks/
│   ├── handlers.ts             # MSW request handlers
│   └── browser.ts              # MSW worker setup
├── store/
│   └── appStore.ts             # Zustand state management
├── types/
│   └── index.ts                # TypeScript type definitions
├── lib/
│   └── utils.ts                # Utility functions
├── App.tsx                      # Main app component
├── main.tsx                     # Entry point
└── index.css                    # Global styles
```

### Tech Choices

- **MSW** - mocks API calls without a real backend
- **Zustand** - simple state management
- **TanStack Query** - handles data fetching and caching
- **Tailwind** - quick styling

## Tech Stack

- React 18 + TypeScript
- Vite
- ReactFlow
- TanStack Query + Zustand
- MSW for mocking
- shadcn/ui + Tailwind
- Lucide icons

## What Works

- Layout with top bar, sidebar, and panel
- Add/delete nodes (Service and Database types)
- Drag nodes around
- Click metrics to see different usage bars
- Edit node properties in inspector (persists to ReactFlow state)
- Keyboard shortcuts (F for fit view, P for panel toggle)
- Mock API with loading states
- TypeScript + ESLint passing

## Config

- TypeScript strict mode
- Path aliases (@/ -> src/)
- ESLint + Prettier
- Tailwind with dark theme

## Known Issues

- Mock data only (resets on refresh)
- Changes don't persist to backend
- Mobile dragging could be better
- No undo/redo yet

## Maybe Add Later

- More node types (API Gateway, Load Balancer, etc)
- More keyboard shortcuts (Delete: D, Select all: Ctrl+A)
- Save to localStorage or backend
- Undo/redo functionality
- Export/import as JSON
- Better mobile touch support

---

Built for Frontend Intern Task
