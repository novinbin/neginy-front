import { create } from "zustand";

export const useConfig = create((set) => ({
  refreshFlag: false,
  setRefreshFlag: (status) => set({ refreshFlag: status }),

  mainPageData: null,
  setMainPageData: (status) => set({ mainPageData: status }),
}));
