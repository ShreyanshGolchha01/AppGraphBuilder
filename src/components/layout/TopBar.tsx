import { Button } from '@/components/ui/button';
import { Share, Moon, Star, Menu, Plus, Trash2 } from 'lucide-react';
import { useAppStore } from '@/store/appStore';
import { useReactFlow } from '@xyflow/react';

export const TopBar = () => {
  const { setIsMobilePanelOpen, selectedNodeId, setSelectedNodeId, selectedAppId } = useAppStore();
  const reactFlow = useReactFlow();

  const handleFitView = () => {
    reactFlow.fitView({ padding: 0.2, duration: 300 });
  };

  const handleAddNode = () => {
    if (!selectedAppId) {
      alert('Please select an app first');
      return;
    }

    const newNodeId = `node-${Date.now()}`;
    const newNode = {
      id: newNodeId,
      type: 'serviceNode',
      position: { x: Math.random() * 400, y: Math.random() * 400 },
      data: {
        label: 'New Service',
        status: 'Healthy' as const,
        description: 'New service node',
        cpuUsage: 0,
        memoryUsage: '0.00 GB',
        diskUsage: '0.00 GB',
        regionCount: 1,
      },
    };

    reactFlow.addNodes(newNode);
    // Use setTimeout to ensure node is added before selecting
    setTimeout(() => {
      setSelectedNodeId(newNodeId);
    }, 0);
  };

  const handleDeleteNode = () => {
    if (selectedNodeId) {
      reactFlow.deleteElements({ nodes: [{ id: selectedNodeId }] });
      setSelectedNodeId(null);
    }
  };

  return (
    <div className="h-14 bg-black border-b border-gray-800 flex items-center justify-between px-4">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-white rounded-sm flex items-center justify-center">
          <div className="w-6 h-6 bg-black transform rotate-45"></div>
        </div>
        <span className="text-white text-sm font-medium">supertokens-golang</span>
        <button className="text-gray-400 hover:text-white">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 8L8 12L12 8"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          className="text-gray-400 hover:text-white hover:bg-gray-800 gap-2"
          onClick={handleAddNode}
        >
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">Add Node</span>
        </Button>
        
        {selectedNodeId && (
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-400 hover:text-white hover:bg-gray-800 gap-2"
            onClick={handleDeleteNode}
          >
            <Trash2 className="h-4 w-4" />
            <span className="hidden sm:inline">Delete</span>
          </Button>
        )}
        
        <Button
          variant="ghost"
          size="sm"
          className="text-gray-400 hover:text-white hover:bg-gray-800"
          onClick={handleFitView}
        >
          Fit View
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="text-gray-400 hover:text-white hover:bg-gray-800 md:hidden"
          onClick={() => setIsMobilePanelOpen(true)}
        >
          <Menu className="h-5 w-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="text-gray-400 hover:text-white hover:bg-gray-800"
        >
          <Share className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="text-gray-400 hover:text-white hover:bg-gray-800"
        >
          <Moon className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="text-gray-400 hover:text-white hover:bg-gray-800"
        >
          <Star className="h-4 w-4" />
        </Button>
        <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center">
          <span className="text-white text-sm font-medium">👤</span>
        </div>
      </div>
    </div>
  );
};
