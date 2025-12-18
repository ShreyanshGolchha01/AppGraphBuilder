import { useQuery } from '@tanstack/react-query';
import type { App, GraphData } from '@/types';

export const useApps = () => {
  return useQuery<App[]>({
    queryKey: ['apps'],
    queryFn: async () => {
      const response = await fetch('/api/apps');
      if (!response.ok) {
        throw new Error('Failed to fetch apps');
      }
      return response.json();
    },
  });
};

export const useGraph = (appId: string | null) => {
  return useQuery<GraphData>({
    queryKey: ['graph', appId],
    queryFn: async () => {
      if (!appId) {
        throw new Error('No app selected');
      }
      const response = await fetch(`/api/apps/${appId}/graph`);
      if (!response.ok) {
        throw new Error('Failed to fetch graph data');
      }
      return response.json();
    },
    enabled: !!appId,
  });
};
