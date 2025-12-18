import { memo } from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { Badge } from '@/components/ui/badge';
import { Cpu, Database, HardDrive, MapPin, Settings } from 'lucide-react';
import type { NodeData, NodeStatus } from '@/types';

const ServiceNode = ({ data, selected }: NodeProps) => {
  const nodeData = data as unknown as NodeData;
  const getStatusColor = (status: NodeStatus) => {
    switch (status) {
      case 'Healthy':
        return 'border-green-500';
      case 'Degraded':
        return 'border-yellow-500';
      case 'Down':
        return 'border-red-500';
      default:
        return 'border-gray-500';
    }
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

  const getCpuGradient = (cpuUsage: number) => {
    if (cpuUsage < 30) {
      return 'linear-gradient(to right, #3b82f6 0%, #10b981 100%)';
    } else if (cpuUsage < 70) {
      return 'linear-gradient(to right, #3b82f6 0%, #10b981 50%, #f59e0b 100%)';
    } else {
      return 'linear-gradient(to right, #3b82f6 0%, #10b981 30%, #f59e0b 60%, #ef4444 100%)';
    }
  };

  return (
    <div
      className={`bg-gray-900 border-2 ${
        selected ? 'border-blue-500' : getStatusColor(nodeData.status)
      } rounded-lg shadow-xl min-w-[280px]`}
    >
      <Handle type="target" position={Position.Top} className="w-3 h-3 !bg-blue-500" />
      
      <div className="p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-800 rounded flex items-center justify-center">
              <Database className="h-4 w-4 text-gray-400" />
            </div>
            <h3 className="text-white font-semibold">{nodeData.label}</h3>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-400 text-sm font-mono">$0.03/HR</span>
            <Settings className="h-4 w-4 text-gray-400 cursor-pointer hover:text-white" />
          </div>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-4 gap-2 mb-3">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Cpu className="h-3 w-3 text-gray-400" />
              <span className="text-gray-400 text-xs">CPU</span>
            </div>
            <p className="text-white text-sm font-medium">{nodeData.cpuUsage.toFixed(2)}</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Database className="h-3 w-3 text-gray-400" />
              <span className="text-gray-400 text-xs">Memory</span>
            </div>
            <p className="text-white text-sm font-medium">{nodeData.memoryUsage}</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <HardDrive className="h-3 w-3 text-gray-400" />
              <span className="text-gray-400 text-xs">Disk</span>
            </div>
            <p className="text-white text-sm font-medium">{nodeData.diskUsage}</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <MapPin className="h-3 w-3 text-gray-400" />
              <span className="text-gray-400 text-xs">Region</span>
            </div>
            <p className="text-white text-sm font-medium">{nodeData.regionCount}</p>
          </div>
        </div>

        {/* CPU Usage Bar */}
        <div className="mb-3">
          <div className="flex items-center justify-between mb-1">
            <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden relative">
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{
                  width: `${nodeData.cpuUsage}%`,
                  background: getCpuGradient(nodeData.cpuUsage),
                }}
              />
              <div
                className="absolute top-1/2 transform -translate-y-1/2 w-3 h-3 bg-white rounded-full border-2 border-gray-900 shadow-lg transition-all duration-300"
                style={{ left: `calc(${nodeData.cpuUsage}% - 6px)` }}
              />
            </div>
            <span className="text-white text-sm font-medium ml-3 min-w-[3rem] text-right">
              {nodeData.cpuUsage.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <Badge variant={getStatusVariant(nodeData.status)} className="text-xs">
            {nodeData.status}
          </Badge>
          <img src="https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg" alt="AWS" className="h-4 opacity-80" />
        </div>
      </div>

      <Handle type="source" position={Position.Bottom} className="w-3 h-3 !bg-blue-500" />
    </div>
  );
};

export default memo(ServiceNode);
