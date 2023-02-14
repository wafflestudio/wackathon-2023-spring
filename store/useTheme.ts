import { ThemeName } from "../entities/theme";
import { create } from "zustand";

type ThemeStore = {
  current: ThemeName;
  transitionTo: ThemeName | null;
  setCurrent: (theme: ThemeName) => void;
  setTransition: (theme: ThemeName) => void;
};

const useTheme = create<ThemeStore>()((set) => ({
  current: "login",
  transitionTo: null,
  setCurrent: (theme) => set({ current: theme, transitionTo: null }),
  setTransition: (theme) => set({ transitionTo: theme }),
}));

export default useTheme;
