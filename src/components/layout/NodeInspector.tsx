import { useAppStore } from '@/store/appStore';
import { useGraph } from '@/hooks/useApi';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Settings, Cpu, HardDrive, Database, MapPin } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useReactFlow } from '@xyflow/react';
import type { NodeStatus } from '@/types';

export const NodeInspector = () => {
  const { selectedAppId, selectedNodeId, activeInspectorTab, setActiveInspectorTab } =
    useAppStore();
  const { data: graphData } = useGraph(selectedAppId);
  const reactFlow = useReactFlow();

  const selectedNode = graphData?.nodes.find((node) => node.id === selectedNodeId);

  const [nodeName, setNodeName] = useState('');
  const [nodeDescription, setNodeDescription] = useState('');
  const [cpuValue, setCpuValue] = useState(0);
  const [memoryValue, setMemoryValue] = useState('');
  const [diskValue, setDiskValue] = useState('');
  const [regionValue, setRegionValue] = useState(1);

  useEffect(() => {
    if (selectedNode) {
      setNodeName(selectedNode.data.label);
      setNodeDescription(selectedNode.data.description || '');
      setCpuValue(selectedNode.data.cpuUsage);
      setMemoryValue(selectedNode.data.memoryUsage);
      setDiskValue(selectedNode.data.diskUsage);
      setRegionValue(selectedNode.data.regionCount);
      console.log('selected node:', selectedNode.id); // helps with debugging
    }
  }, [selectedNode]);

  if (!selectedNodeId || !selectedNode) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        <p>Select a node to inspect</p>
      </div>
    );
  }

  const handleNameChange = (value: string) => {
    setNodeName(value);
    reactFlow.setNodes((nodes) =>
      nodes.map((node) =>
        node.id === selectedNodeId
          ? { ...node, data: { ...node.data, label: value } }
          : node
      )
    );
  };

  const handleDescriptionChange = (value: string) => {
    setNodeDescription(value);
    reactFlow.setNodes((nodes) =>
      nodes.map((node) =>
        node.id === selectedNodeId
          ? { ...node, data: { ...node.data, description: value } }
          : node
      )
    );
  };

  const handleCpuChange = (value: number) => {
    setCpuValue(value);
    reactFlow.setNodes((nodes) =>
      nodes.map((node) =>
        node.id === selectedNodeId
          ? { ...node, data: { ...node.data, cpuUsage: value } }
          : node
      )
    );
  };

  const handleMemoryChange = (value: string) => {
    setMemoryValue(value);
    reactFlow.setNodes((nodes) =>
      nodes.map((node) =>
        node.id === selectedNodeId
          ? { ...node, data: { ...node.data, memoryUsage: value } }
          : node
      )
    );
  };

  const handleDiskChange = (value: string) => {
    setDiskValue(value);
    reactFlow.setNodes((nodes) =>
      nodes.map((node) =>
        node.id === selectedNodeId
          ? { ...node, data: { ...node.data, diskUsage: value } }
          : node
      )
    );
  };

  const handleRegionChange = (value: number) => {
    setRegionValue(value);
    reactFlow.setNodes((nodes) =>
      nodes.map((node) =>
        node.id === selectedNodeId
          ? { ...node, data: { ...node.data, regionCount: value } }
          : node
      )
    );
  };

  const getStatusVariant = (status: NodeStatus) => {
    switch (status) {
      case 'Healthy':
        return 'success';
      case 'Degraded':
        return 'warning';
      case 'Down':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="p-4 border-b border-gray-800 flex-shrink-0">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-white font-semibold">Service Node</h3>
          <Badge variant={getStatusVariant(selectedNode.data.status)}>
            {selectedNode.data.status}
          </Badge>
        </div>
      </div>

      <Tabs
        value={activeInspectorTab}
        onValueChange={setActiveInspectorTab}
        className="flex-1 flex flex-col overflow-hidden"
      >
        <TabsList className="w-full justify-start rounded-none bg-black border-b border-gray-800 h-auto p-0 flex-shrink-0">
          <TabsTrigger
            value="config"
            className="rounded-none text-white data-[state=active]:text-white data-[state=active]:bg-gray-900 data-[state=active]:border-b-2 data-[state=active]:border-blue-500"
          >
            Config
          </TabsTrigger>
          <TabsTrigger
            value="runtime"
            className="rounded-none text-white data-[state=active]:text-white data-[state=active]:bg-gray-900 data-[state=active]:border-b-2 data-[state=active]:border-blue-500"
          >
            Runtime
          </TabsTrigger>
        </TabsList>

        <TabsContent value="config" className="flex-1 overflow-y-auto p-4 space-y-4 m-0">
          <div className="space-y-2">
            <Label htmlFor="node-name" className="text-gray-300">
              Node Name
            </Label>
            <Input
              id="node-name"
              value={nodeName}
              onChange={(e) => handleNameChange(e.target.value)}
              className="bg-gray-900 border-gray-700 text-white"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="node-description" className="text-gray-300">
              Description
            </Label>
            <Textarea
              id="node-description"
              value={nodeDescription}
              onChange={(e) => handleDescriptionChange(e.target.value)}
              className="bg-gray-900 border-gray-700 text-white"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="cpu-slider" className="text-gray-300">
                CPU Usage (%)
              </Label>
              <Input
                type="number"
                min={0}
                max={100}
                value={cpuValue}
                onChange={(e) => handleCpuChange(Number(e.target.value))}
                className="w-20 h-8 bg-gray-900 border-gray-700 text-white text-center"
              />
            </div>
            <Slider
              id="cpu-slider"
              min={0}
              max={100}
              step={1}
              value={[cpuValue]}
              onValueChange={(values) => handleCpuChange(values[0])}
              className="w-full"
            />
          </div>

          <div className="space-y-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="memory-slider" className="text-gray-300">
                  Memory Usage (GB)
                </Label>
                <Input
                  type="number"
                  min={0}
                  max={10}
                  step={0.01}
                  value={parseFloat(memoryValue) || 0}
                  onChange={(e) => handleMemoryChange(`${e.target.value} GB`)}
                  className="w-20 h-8 bg-gray-900 border-gray-700 text-white text-center"
                />
              </div>
              <Slider
                id="memory-slider"
                min={0}
                max={10}
                step={0.01}
                value={[parseFloat(memoryValue) || 0]}
                onValueChange={(values) => handleMemoryChange(`${values[0].toFixed(2)} GB`)}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="disk-slider" className="text-gray-300">
                  Disk Usage (GB)
                </Label>
                <Input
                  type="number"
                  min={0}
                  max={1000}
                  step={0.1}
                  value={parseFloat(diskValue) || 0}
                  onChange={(e) => handleDiskChange(`${e.target.value} GB`)}
                  className="w-20 h-8 bg-gray-900 border-gray-700 text-white text-center"
                />
              </div>
              <Slider
                id="disk-slider"
                min={0}
                max={1000}
                step={1}
                value={[parseFloat(diskValue) || 0]}
                onValueChange={(values) => handleDiskChange(`${values[0].toFixed(2)} GB`)}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="region-slider" className="text-gray-300">
                  Region Count
                </Label>
                <Input
                  type="number"
                  min={1}
                  max={10}
                  value={regionValue}
                  onChange={(e) => handleRegionChange(Number(e.target.value))}
                  className="w-20 h-8 bg-gray-900 border-gray-700 text-white text-center"
                />
              </div>
              <Slider
                id="region-slider"
                min={1}
                max={10}
                step={1}
                value={[regionValue]}
                onValueChange={(values) => handleRegionChange(values[0])}
                className="w-full"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="bg-gray-900 rounded-lg p-3 border border-gray-800">
              <div className="flex items-center gap-2 mb-1">
                <Cpu className="h-4 w-4 text-gray-400" />
                <span className="text-gray-400 text-xs">CPU</span>
              </div>
              <p className="text-white font-medium">{cpuValue.toFixed(2)}</p>
            </div>
            <div className="bg-gray-900 rounded-lg p-3 border border-gray-800">
              <div className="flex items-center gap-2 mb-1">
                <Database className="h-4 w-4 text-gray-400" />
                <span className="text-gray-400 text-xs">Memory</span>
              </div>
              <p className="text-white font-medium">{memoryValue}</p>
            </div>
            <div className="bg-gray-900 rounded-lg p-3 border border-gray-800">
              <div className="flex items-center gap-2 mb-1">
                <HardDrive className="h-4 w-4 text-gray-400" />
                <span className="text-gray-400 text-xs">Disk</span>
              </div>
              <p className="text-white font-medium">{diskValue}</p>
            </div>
            <div className="bg-gray-900 rounded-lg p-3 border border-gray-800">
              <div className="flex items-center gap-2 mb-1">
                <MapPin className="h-4 w-4 text-gray-400" />
                <span className="text-gray-400 text-xs">Region</span>
              </div>
              <p className="text-white font-medium">{regionValue}</p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="runtime" className="flex-1 overflow-y-auto p-4 space-y-4 m-0">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Settings className="h-4 w-4 text-gray-400" />
              <h4 className="text-white font-medium">Runtime Configuration</h4>
            </div>
            <div className="bg-gray-900 rounded-lg p-3 border border-gray-800">
              <p className="text-gray-400 text-sm mb-2">Status</p>
              <Badge variant={getStatusVariant(selectedNode.data.status)}>
                {selectedNode.data.status}
              </Badge>
            </div>
            <div className="bg-gray-900 rounded-lg p-3 border border-gray-800">
              <p className="text-gray-400 text-sm mb-2">Node ID</p>
              <p className="text-white font-mono text-sm">{selectedNode.id}</p>
            </div>
            <div className="bg-gray-900 rounded-lg p-3 border border-gray-800">
              <p className="text-gray-400 text-sm mb-2">Node Type</p>
              <p className="text-white text-sm">{selectedNode.type}</p>
            </div>
            <div className="bg-gray-900 rounded-lg p-3 border border-gray-800">
              <p className="text-gray-400 text-sm mb-2">Position</p>
              <p className="text-white text-sm">
                x: {selectedNode.position.x.toFixed(0)}, y: {selectedNode.position.y.toFixed(0)}
              </p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
