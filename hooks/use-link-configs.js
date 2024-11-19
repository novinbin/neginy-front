import { create } from "zustand";

export const useLinkConfigs = create((set) => ({
  mainPageData: [],
  setLinkPageData: (data) => set({ mainPageData: data }),
}));
