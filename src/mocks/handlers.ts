import { http, HttpResponse } from 'msw';
import type { App, GraphData } from '@/types';

const apps: App[] = [
  { id: 'golang', name: 'supertokens-golang', icon: '🔷', language: 'Go' },
  { id: 'java', name: 'supertokens-java', icon: '☕', language: 'Java' },
  { id: 'python', name: 'supertokens-python', icon: '🐍', language: 'Python' },
  { id: 'ruby', name: 'supertokens-ruby', icon: '💎', language: 'Ruby' },
  { id: 'go', name: 'supertokens-go', icon: '🔷', language: 'Go' },
];

const graphData: Record<string, GraphData> = {
  golang: {
    nodes: [
      {
        id: 'postgres',
        type: 'serviceNode',
        position: { x: 250, y: 50 },
        data: {
          label: 'Postgres',
          status: 'Healthy',
          description: 'Primary database',
          cpuUsage: 2,
          memoryUsage: '0.05 GB',
          diskUsage: '10.00 GB',
          regionCount: 1,
        },
      },
      {
        id: 'redis',
        type: 'serviceNode',
        position: { x: 100, y: 200 },
        data: {
          label: 'Redis',
          status: 'Degraded',
          description: 'Cache layer',
          cpuUsage: 2,
          memoryUsage: '0.05 GB',
          diskUsage: '10.00 GB',
          regionCount: 1,
        },
      },
      {
        id: 'mongodb',
        type: 'serviceNode',
        position: { x: 400, y: 200 },
        data: {
          label: 'MongoDB',
          status: 'Down',
          description: 'Document store',
          cpuUsage: 2,
          memoryUsage: '0.05 GB',
          diskUsage: '10.00 GB',
          regionCount: 1,
        },
      },
    ],
    edges: [
      { id: 'e1', source: 'postgres', target: 'redis' },
      { id: 'e2', source: 'postgres', target: 'mongodb' },
    ],
  },
  java: {
    nodes: [
      {
        id: 'mysql',
        type: 'serviceNode',
        position: { x: 250, y: 50 },
        data: {
          label: 'MySQL',
          status: 'Healthy',
          description: 'Relational database',
          cpuUsage: 5,
          memoryUsage: '0.10 GB',
          diskUsage: '20.00 GB',
          regionCount: 2,
        },
      },
      {
        id: 'kafka',
        type: 'serviceNode',
        position: { x: 100, y: 200 },
        data: {
          label: 'Kafka',
          status: 'Healthy',
          description: 'Message broker',
          cpuUsage: 10,
          memoryUsage: '0.50 GB',
          diskUsage: '50.00 GB',
          regionCount: 3,
        },
      },
      {
        id: 'elasticsearch',
        type: 'serviceNode',
        position: { x: 400, y: 200 },
        data: {
          label: 'Elasticsearch',
          status: 'Healthy',
          description: 'Search engine',
          cpuUsage: 15,
          memoryUsage: '1.00 GB',
          diskUsage: '100.00 GB',
          regionCount: 2,
        },
      },
    ],
    edges: [
      { id: 'e1', source: 'mysql', target: 'kafka' },
      { id: 'e2', source: 'mysql', target: 'elasticsearch' },
    ],
  },
  python: {
    nodes: [
      {
        id: 'postgres',
        type: 'serviceNode',
        position: { x: 250, y: 50 },
        data: {
          label: 'Postgres',
          status: 'Healthy',
          description: 'Main database',
          cpuUsage: 3,
          memoryUsage: '0.08 GB',
          diskUsage: '15.00 GB',
          regionCount: 1,
        },
      },
      {
        id: 'celery',
        type: 'serviceNode',
        position: { x: 100, y: 200 },
        data: {
          label: 'Celery',
          status: 'Healthy',
          description: 'Task queue',
          cpuUsage: 5,
          memoryUsage: '0.20 GB',
          diskUsage: '5.00 GB',
          regionCount: 1,
        },
      },
      {
        id: 's3',
        type: 'serviceNode',
        position: { x: 400, y: 200 },
        data: {
          label: 'S3',
          status: 'Healthy',
          description: 'Object storage',
          cpuUsage: 1,
          memoryUsage: '0.01 GB',
          diskUsage: '500.00 GB',
          regionCount: 1,
        },
      },
    ],
    edges: [
      { id: 'e1', source: 'postgres', target: 'celery' },
      { id: 'e2', source: 'postgres', target: 's3' },
    ],
  },
};

// Simulate network delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const handlers = [
  http.get('/api/apps', async () => {
    await delay(500);
    return HttpResponse.json(apps);
  }),

  http.get('/api/apps/:appId/graph', async ({ params }) => {
    await delay(700);
    const { appId } = params;
    
    // Simulate error for specific app (optional)
    if (appId === 'error-test') {
      return HttpResponse.json(
        { error: 'Failed to fetch graph data' },
        { status: 500 }
      );
    }

    const data = graphData[appId as string] || graphData.golang;
    return HttpResponse.json(data);
  }),
];
