import { create } from "zustand";
import { Team } from "../entities/team/team";
import { getTeams } from "../api/team";

type TeamsStore = {
  teams: Team[];
  setTeam: (teams: Team[]) => void;
  getAllTeamsFromServer: () => void;
};

const useTeams = create<TeamsStore>()((set) => ({
  teams: [],
  setTeam: (teams) => set({ teams }),
  getAllTeamsFromServer: () => {
    getTeams().then(
      (res) => {
        set({ teams: res });
      },
      (error) => {
        console.log(error);

        //        console.log(error);
      },
    );
  },
}));

export default useTeams;
