import { AllTeamsResponse } from "../entities/team/teamList";
import { baseURL } from "./index";
import { Team } from "../entities/team/team";
import { ApplyTeamResponse } from "../entities/team/applyTeam";

export const getAllTeams = async () => {
  try {
    const response = await fetch(`${baseURL}teams`);
    const data = await response.json();
    return data as AllTeamsResponse;
  } catch (e) {
    throw e;
  }
};

export const postApplyTeam = async (teamId: Pick<Team, "id">) => {
  try {
    const response = await fetch(`${baseURL}/apply/${teamId}`, {
      method: "POST",
    });
    const data = await response.json();
    return data as ApplyTeamResponse;
  } catch (e) {
    console.log(e);
  }
};
