export type NodeStatus = 'Healthy' | 'Degraded' | 'Down';

export interface NodeData {
  label: string;
  status: NodeStatus;
  description?: string;
  cpuUsage: number;
  memoryUsage: string;
  diskUsage: string;
  regionCount: number;
  nodeType?: 'service' | 'database';
}

export interface AppNode {
  id: string;
  type: string;
  position: { x: number; y: number };
  data: NodeData;
}

export interface AppEdge {
  id: string;
  source: string;
  target: string;
}

export interface GraphData {
  nodes: AppNode[];
  edges: AppEdge[];
}

export interface App {
  id: string;
  name: string;
  icon: string;
  language: string;
}
