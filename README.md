# App Graph Builder

A responsive ReactFlow-based application graph builder with mock API integration, state management, and clean architecture.

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking

## 📋 Features

### ✅ Implemented Features

1. **Layout Structure**
   - Top bar with branding and actions (Fit View, theme toggle, etc.)
   - Left rail with icon-based navigation
   - Right panel with apps list and node inspector
   - Center canvas with dotted background
   - Fully responsive (mobile drawer for right panel)

2. **ReactFlow Integration**
   - 3+ nodes with 2+ edges per graph
   - Drag and drop nodes
   - Click to select nodes
   - Delete nodes with Delete/Backspace keys
   - Zoom and pan controls
   - Fit view on initial load
   - Dotted background pattern
   - Mini-map and controls

3. **Service Node Inspector**
   - Status pill (Healthy, Degraded, Down)
   - Two tabs: Config and Runtime
   - Synced slider and numeric input (0-100)
   - Editable node name
   - Description textarea
   - Real-time metrics display (CPU, Memory, Disk, Region)
   - Changes persist to node data

4. **TanStack Query Integration**
   - Mock API endpoints using MSW
   - GET /api/apps - Returns list of applications
   - GET /api/apps/:appId/graph - Returns nodes and edges
   - Loading states with spinners
   - Error states with messages
   - Automatic caching and refetching

5. **Zustand State Management**
   - selectedAppId - Currently selected application
   - selectedNodeId - Currently selected node
   - isMobilePanelOpen - Mobile drawer state
   - activeInspectorTab - Active tab in inspector
   - Clean, minimal state structure

6. **TypeScript & Code Quality**
   - Strict TypeScript mode enabled
   - ESLint configured for React + TS
   - Type-safe components and hooks
   - Clean component architecture

## 🏗️ Architecture

### Project Structure

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

### Key Design Decisions

1. **Mock Service Worker (MSW)**
   - Provides realistic API mocking without backend
   - Simulates network latency (500-700ms)
   - Easy to extend with new endpoints

2. **Component Composition**
   - Clean separation of concerns
   - Layout components are independent
   - ReactFlow logic isolated in FlowCanvas
   - Node inspector is self-contained

3. **State Management Strategy**
   - Zustand for UI state (selection, drawer, tabs)
   - TanStack Query for server state (apps, graphs)
   - No prop drilling - direct store access
   - ReactFlow manages its own node/edge state

4. **Type Safety**
   - Strict TypeScript mode enabled
   - All components fully typed
   - API responses have defined interfaces
   - Node data structure is type-safe

5. **Responsive Design**
   - Desktop: Fixed right panel (384px width)
   - Mobile: Slide-over drawer with backdrop
   - Tailwind breakpoints for responsiveness
   - Touch-friendly controls

## 🎨 Tech Stack

- **React 18** - UI library
- **Vite** - Build tool
- **TypeScript** - Type safety (strict mode)
- **ReactFlow (@xyflow/react)** - Flow diagram library
- **TanStack Query** - Server state management
- **Zustand** - Client state management
- **MSW** - API mocking
- **shadcn/ui** - UI components
- **Tailwind CSS** - Styling
- **Lucide React** - Icons

## 🎯 Feature Checklist

- ✅ Top bar, left rail, right panel, dotted canvas layout
- ✅ Responsive design (mobile drawer)
- ✅ ReactFlow: 3 nodes, drag, select, delete, zoom/pan
- ✅ Node inspector: tabs + status pill + synced slider/input
- ✅ TanStack Query: mock APIs with loading/error states
- ✅ Zustand: UI state management
- ✅ TypeScript strict mode + ESLint
- ✅ All required scripts (dev, build, preview, lint, typecheck)

## 🔧 Configuration

### TypeScript

- Strict mode enabled
- Path aliases configured (@/ -> src/)
- All type checking rules enforced

### ESLint

- React + TypeScript rules
- React Hooks rules
- React Refresh plugin

### Tailwind CSS

- shadcn/ui design system
- Custom color scheme
- Dark mode support (class-based)

## 📝 Known Limitations

1. **Mock Data Only**
   - No real backend integration
   - Data resets on page refresh
   - MSW only works in development mode

2. **Node Persistence**
   - Node position changes are not persisted
   - Deleted nodes are removed from local state only
   - Inspector edits update ReactFlow state but don't persist

3. **Graph Complexity**
   - Limited to predefined graph structures
   - No "Add Node" functionality (can be added as bonus)
   - No node type variants (all service nodes)

4. **Mobile Experience**
   - Node dragging can be challenging on touch devices
   - Mini-map might be too small on mobile
   - Consider disabling on smaller screens

## 🚀 Future Enhancements

- Add "Add Node" button to create new nodes
- Implement node type variants (Service vs DB)
- Add keyboard shortcuts (Fit view: F, Toggle panel: P)
- Persist graph changes to localStorage
- Add undo/redo functionality
- Export/import graph as JSON
- Real-time collaboration features

## 📄 License

MIT

---

Built with ❤️ for the Frontend Intern Task
