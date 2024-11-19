

import { create } from "zustand";

export const useUser = create((set) => ({
  mainPageData: [],
  setMainPageData: (data) => set({ mainPageData: data }),

  setUserData: (data) => set({ userData: data }),
}));
