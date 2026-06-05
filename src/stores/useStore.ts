import { create } from "zustand";

interface MapSearchState {
  openPopup: string | boolean;
  setOpenPopup: (popup: string | boolean) => void;
}

export const useMapSearchStore = create<MapSearchState>()((set) => ({
  openPopup: false,
  setOpenPopup: (popup) => set(() => ({ openPopup: popup })),
}));
