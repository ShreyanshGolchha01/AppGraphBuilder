import { create } from 'zustand';

interface AppState {
  selectedAppId: string | null;
  selectedNodeId: string | null;
  isMobilePanelOpen: boolean;
  activeInspectorTab: string;
  setSelectedAppId: (id: string | null) => void;
  setSelectedNodeId: (id: string | null) => void;
  setIsMobilePanelOpen: (isOpen: boolean) => void;
  setActiveInspectorTab: (tab: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  selectedAppId: null,
  selectedNodeId: null,
  isMobilePanelOpen: false,
  activeInspectorTab: 'config',
  setSelectedAppId: (id) => set({ selectedAppId: id }),
  setSelectedNodeId: (id) => set({ selectedNodeId: id }),
  setIsMobilePanelOpen: (isOpen) => set({ isMobilePanelOpen: isOpen }),
  setActiveInspectorTab: (tab) => set({ activeInspectorTab: tab }),
}));
