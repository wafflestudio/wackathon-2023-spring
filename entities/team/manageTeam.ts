import { UserInfo } from "../user/user";
import { Team } from "./team";

export type ApproveApplicantRequest = {
  applicantId: Pick<UserInfo, "id">;
  requesterId: Pick<UserInfo, "id">;
};

export type ApproveApplicantResponse = {
  isSuccess: boolean;
  team: Team;
};

export type DismissApplicantRequest = {
  applicantId: Pick<UserInfo, "id">;
  requesterId: Pick<UserInfo, "id">;
};

export type DismissApplicantResponse = {
  isSuccess: boolean;
  team: Team;
};

export type ExitTeamRequest = {
  requesterId: Pick<UserInfo, "id">;
};
