import { useApps } from '@/hooks/useApi';
import { useAppStore } from '@/store/appStore';
import { Search, Plus, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export const AppsList = () => {
  const { data: apps, isLoading, error } = useApps();
  const { selectedAppId, setSelectedAppId, setSelectedNodeId } = useAppStore();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredApps = apps?.filter((app) =>
    app.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAppSelect = (appId: string) => {
    setSelectedAppId(appId);
    setSelectedNodeId(null); // Clear node selection when app changes
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-48">
        <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-red-400 text-sm">
        Failed to load apps. Please try again.
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-gray-800">
        <h2 className="text-white font-semibold mb-3">Application</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-gray-900 border-gray-700 text-white placeholder:text-gray-500"
          />
          <Button
            size="icon"
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        {filteredApps?.map((app) => (
          <button
            key={app.id}
            onClick={() => handleAppSelect(app.id)}
            className={`w-full p-3 flex items-center gap-3 hover:bg-gray-900 transition-colors ${
              selectedAppId === app.id ? 'bg-gray-900 border-l-2 border-blue-500' : ''
            }`}
          >
            <div
              className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl ${
                app.language === 'Go'
                  ? 'bg-blue-500/20 text-blue-400'
                  : app.language === 'Java'
                  ? 'bg-red-500/20 text-red-400'
                  : app.language === 'Python'
                  ? 'bg-yellow-500/20 text-yellow-400'
                  : app.language === 'Ruby'
                  ? 'bg-pink-500/20 text-pink-400'
                  : 'bg-purple-500/20 text-purple-400'
              }`}
            >
              {app.icon}
            </div>
            <div className="flex-1 text-left">
              <p className="text-white text-sm font-medium">{app.name}</p>
            </div>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-gray-600"
            >
              <path
                d="M6 4L10 8L6 12"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        ))}
      </div>
    </div>
  );
};
