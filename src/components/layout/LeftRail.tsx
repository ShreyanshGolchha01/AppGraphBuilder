import { Github, Database, Folder, Box, Network } from 'lucide-react';

export const LeftRail = () => {
  const navItems = [
    { icon: Github, label: 'GitHub' },
    { icon: Database, label: 'Database' },
    { icon: Folder, label: 'Files' },
    { icon: Box, label: 'Containers' },
    { icon: Network, label: 'Network' },
  ];

  return (
    <div className="w-16 bg-black border-r border-gray-800 flex flex-col items-center py-4 gap-4">
      {navItems.map((item, index) => (
        <button
          key={index}
          className="w-10 h-10 rounded-lg bg-gray-900 hover:bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
          title={item.label}
        >
          <item.icon className="h-5 w-5" />
        </button>
      ))}
    </div>
  );
};
