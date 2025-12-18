import { ReactFlowProvider, useReactFlow } from '@xyflow/react';
import { TopBar } from './components/layout/TopBar';
import { LeftRail } from './components/layout/LeftRail';
import { RightPanel } from './components/layout/RightPanel';
import { FlowCanvas } from './components/canvas/FlowCanvas';
import { useAppStore } from './store/appStore';
import { useEffect } from 'react';

function AppContent() {
  const reactFlow = useReactFlow();
  const { setIsMobilePanelOpen, isMobilePanelOpen } = useAppStore();

  useEffect(() => {
    const handleKeyboard = (e: KeyboardEvent) => {
      // F key for fit view
      if (e.key === 'f' || e.key === 'F') {
        e.preventDefault();
        reactFlow.fitView({ padding: 0.2, duration: 300 });
      }
      // P key to toggle panel
      if (e.key === 'p' || e.key === 'P') {
        e.preventDefault();
        setIsMobilePanelOpen(!isMobilePanelOpen);
      }
    };

    window.addEventListener('keydown', handleKeyboard);
    return () => window.removeEventListener('keydown', handleKeyboard);
  }, [reactFlow, isMobilePanelOpen, setIsMobilePanelOpen]);

  return (
    <div className="h-screen w-screen flex flex-col bg-black overflow-hidden">
      <TopBar />
      <div className="flex-1 flex overflow-hidden">
        <LeftRail />
        <div className="flex-1 overflow-hidden">
          <FlowCanvas />
        </div>
        <RightPanel />
      </div>
    </div>
  );
}

function App() {
  // main app container
  return (
    <ReactFlowProvider>
      <AppContent />
    </ReactFlowProvider>
  );
}

export default App;
