import { ReactFlowProvider } from '@xyflow/react';
import { TopBar } from './components/layout/TopBar';
import { LeftRail } from './components/layout/LeftRail';
import { RightPanel } from './components/layout/RightPanel';
import { FlowCanvas } from './components/canvas/FlowCanvas';

function App() {
  return (
    <ReactFlowProvider>
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
    </ReactFlowProvider>
  );
}

export default App;
