import { UserInfo } from "../entities/user/user";
import { create } from "zustand";
import { getMe } from "../api/user";

type UserStoreMethods = {
  setUser: (user: UserInfo) => void;
  resetUser: () => void;
  getMeFromServer: () => void;
};

type UserStore = ((UserInfo & { isSignedIn: true }) | { isSignedIn: false }) &
  UserStoreMethods;

const useUser = create<UserStore>()((set) => ({
  isSignedIn: false,
  setUser: (user) => set({ ...user, isSignedIn: true }),
  resetUser: () => set({ isSignedIn: false }),
  getMeFromServer: () => {
    getMe().then(
      (res) => {
        set({ ...res, isSignedIn: true });
      },
      () => {},
    );
  },
}));

export default useUser;
