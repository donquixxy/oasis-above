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

interface SearchForm {
  value: string;
  setValue: (val: string) => void;
  resetValue: () => void;
}

const useFormStore = create<SearchForm>((set) => ({
  value: "",
  setValue: (val) => set({ value: val }),
  resetValue: () => set({ value: "" }),
}));

export { useMenuStore, useFormStore };
