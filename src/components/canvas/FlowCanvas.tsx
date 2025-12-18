import { useCallback, useEffect, useMemo } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  BackgroundVariant,
  Node,
  Edge,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import ServiceNode from './ServiceNode';
import { useAppStore } from '@/store/appStore';
import { useGraph } from '@/hooks/useApi';
import { Loader2 } from 'lucide-react';

const nodeTypes = {
  serviceNode: ServiceNode,
};

export const FlowCanvas = () => {
  const { selectedAppId, setSelectedNodeId } = useAppStore();
  const { data: graphData, isLoading, error } = useGraph(selectedAppId);
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);

  // Update nodes and edges when graph data changes
  useEffect(() => {
    if (graphData) {
      setNodes(graphData.nodes as unknown as Node[]);
      setEdges(
        graphData.edges.map((edge) => ({
          ...edge,
          animated: true,
          style: { stroke: '#3b82f6' },
        })) as Edge[]
      );
    }
  }, [graphData, setNodes, setEdges]);

  const onConnect = useCallback(
    (connection: Connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  const onNodeClick = useCallback(
    (_event: React.MouseEvent, node: Node) => {
      setSelectedNodeId(node.id);
    },
    [setSelectedNodeId]
  );

  const onPaneClick = useCallback(() => {
    setSelectedNodeId(null);
  }, [setSelectedNodeId]);

  // Handle node deletion with Delete/Backspace
  const onNodesDelete = useCallback(
    (deleted: Node[]) => {
      const deletedIds = deleted.map((node) => node.id);
      if (deletedIds.length > 0) {
        setSelectedNodeId(null);
      }
    },
    [setSelectedNodeId]
  );

  const proOptions = useMemo(() => ({ hideAttribution: true }), []);

  if (!selectedAppId) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-950 text-gray-500">
        <p>Select an application to view its graph</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-950">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-950 text-red-400">
        <p>Failed to load graph. Please try again.</p>
      </div>
    );
  }

  return (
    <div className="h-full w-full bg-gray-950">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        onNodesDelete={onNodesDelete}
        nodeTypes={nodeTypes}
        proOptions={proOptions}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        deleteKeyCode={['Backspace', 'Delete']}
        minZoom={0.2}
        maxZoom={2}
        defaultEdgeOptions={{
          animated: true,
          style: { stroke: '#3b82f6', strokeWidth: 2 },
        }}
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={20}
          size={1}
          color="#1f2937"
          className="bg-gray-950"
        />
        <Controls className="bg-gray-900 border-gray-700 text-white" />
        <MiniMap
          className="bg-gray-900 border border-gray-700"
          nodeColor={(node) => {
            const status = (node.data as Record<string, unknown>)?.status;
            if (status === 'Healthy') return '#10b981';
            if (status === 'Degraded') return '#f59e0b';
            if (status === 'Down') return '#ef4444';
            return '#6b7280';
          }}
        />
      </ReactFlow>
    </div>
  );
};
