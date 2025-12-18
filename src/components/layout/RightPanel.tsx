import { AppsList } from './AppsList';
import { NodeInspector } from './NodeInspector';
import { useAppStore } from '@/store/appStore';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const RightPanel = () => {
  const { selectedNodeId, isMobilePanelOpen, setIsMobilePanelOpen } = useAppStore();

  return (
    <>
      {/* Desktop version */}
      <div className="hidden md:flex w-96 bg-black border-l border-gray-800 flex-col h-full">
        <div className={selectedNodeId ? "h-1/2 overflow-hidden border-b border-gray-800" : "flex-1 overflow-hidden"}>
          <AppsList />
        </div>
        {selectedNodeId && (
          <div className="h-1/2 overflow-hidden">
            <NodeInspector />
          </div>
        )}
      </div>

      {/* Mobile drawer */}
      {isMobilePanelOpen && (
        <div className="md:hidden fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsMobilePanelOpen(false)}
          />
          <div className="absolute right-0 top-0 bottom-0 w-80 sm:w-96 max-w-[90vw] bg-black border-l border-gray-800 flex flex-col animate-in slide-in-from-right">
            <div className="flex items-center justify-between p-4 border-b border-gray-800 flex-shrink-0">
              <h2 className="text-white font-semibold">Panel</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobilePanelOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className={selectedNodeId ? "h-1/2 overflow-hidden border-b border-gray-800" : "flex-1 overflow-hidden"}>
              <AppsList />
            </div>
            {selectedNodeId && (
              <div className="h-1/2 overflow-hidden">
                <NodeInspector />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
