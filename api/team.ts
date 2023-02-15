import { AllTeamsResponse } from "../entities/team/teamList";
import { baseURL } from "./index";
import { UserLoginRequest } from "../entities/user/userLogin";
import { Team } from "../entities/team/team";
import { ApplyTeamResponse } from "../entities/team/applyTeam";

export const getAllTeams = async () => {
  try {
    const response = await fetch(`${baseURL}teams`);
    const data = await response.json();
    return data as AllTeamsResponse;
  } catch (e) {
    console.log(e);
  }
};

export const postApplyTeam = async (
  teamId: Pick<Team, "id">,
  body: UserLoginRequest,
) => {
  try {
    const response = await fetch(`${baseURL}/apply/${teamId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    return data as ApplyTeamResponse;
  } catch (e) {
    console.log(e);
  }
};
