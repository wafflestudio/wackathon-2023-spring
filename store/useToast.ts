import { create } from "zustand";

type ToastStore = {
  isOn: boolean;
  type: "warn" | "success" | "info";
  content: string;
  resetToast: () => void;
};

const useToast = create<ToastStore>()((set) => ({
  isOn: false,
  type: "info",
  content: "",
  resetToast: () => set({ isOn: false, type: "info", content: "" }),
}));

export const sendToast = (
  content: string,
  type: "warn" | "success" | "info" = "info",
) => {
  useToast.setState({ isOn: true, content, type });
};

export default useToast;
