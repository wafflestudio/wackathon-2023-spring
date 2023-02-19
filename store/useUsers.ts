import { create } from "zustand";
import { UserInfo } from "../entities/user/user";
import { getUsers } from "../api/user";

type UserStore = {
    users: UserInfo[];
    setUser: (teams: UserInfo[]) => void;
    getAllUsersFromServer: () => void;
};

const useUsers = create<UserStore>()((set) => ({
    users: [],
    setUser: (users) => set({ users }),
    getAllUsersFromServer: () => {
        getUsers().then(
            (res) => {
                const data = res;
                set({ users: data });
            },
            (error) => {
                console.log(error);

                //        console.log(error);
            },
        );
    },
}));

export default useUsers;
