import { create } from "zustand";
import { Team } from "../entities/team/team";
import { getAllTeams } from "../api/team";

type TeamsStore = {
  teams: Team[];
  setTeam: (teams: Team[]) => void;
  getAllTeamsFromServer: () => void;
};

const useTeams = create<TeamsStore>()((set) => ({
  teams: [],
  setTeam: (teams) => set({ teams }),
  getAllTeamsFromServer: () => {
    getAllTeams().then(({ teams }) => {
      set({ teams });
    });
  },
}));

export default useTeams;
