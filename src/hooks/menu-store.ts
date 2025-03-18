import { create } from "zustand";

interface MenuStore {
  selectedType: string[];
  previousType: string[];
  setSelectedType: (type: string[]) => void;
}

const useMenuStore = create<MenuStore>((set) => ({
  selectedType: ["food"],
  setSelectedType: (type) =>
    set((state) => ({
      previousType: state.selectedType,
      selectedType: type,
    })),
  previousType: ["food"],
}));

export { useMenuStore };
