import { baseURL } from "./index";
import { getToken } from "./token";
import { authError, unknownError } from "./errorMessages";
import { CreateTeamRequest } from "../entities/team/createTeam";
import { Team } from "../entities/team/team";

export const getTeams = async () => {
  try {
    const response = await fetch(`${baseURL}teams`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: getToken(),
      },
    });
    const data = await response.json();
    if (
      data.detail === "Not authenticated" ||
      data.detail === "Invalid authentication credentials"
    ) {
      return Promise.reject(authError);
    }
    if (Array.isArray(data)) {
      return Promise.resolve(data);
    }
    return Promise.reject(unknownError);
  } catch (e) {
    return Promise.reject(e);
  }
};

export const getTeam = async (teamId: number): Promise<Team> => {
  try {
    const response = await fetch(`${baseURL}teams/${teamId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: getToken(),
      },
    });
    const data = await response.json();
    if (
      data.detail === "Not authenticated" ||
      data.detail === "Invalid authentication credentials"
    ) {
      return Promise.reject(authError);
    }
    if (data.id) {
      const answer = data as Team;
      return Promise.resolve(answer);
    }

    return Promise.reject(unknownError);
  } catch (e) {
    return Promise.reject(e);
  }
};

export const postCreateTeam = async (body: CreateTeamRequest) => {
  const formData = new FormData();
  formData.append("name", body.name);
  formData.append("resolution", body.resolution);
  formData.append("maxMembers", String(body.maxMembers));
  try {
    const response = await fetch(`${baseURL}teams`, {
      method: "POST",
      headers: {
        Authorization: getToken(),
      },
      body: formData,
    });
    const data = await response.json();
    if (
      data.detail === "Not authenticated" ||
      data.detail === "Invalid authentication credentials"
    ) {
      return Promise.reject(authError);
    }
    if (data.id) {
      return Promise.resolve(data);
    }
    return Promise.reject(unknownError);
  } catch (e) {
    return Promise.reject(e);
  }
};

export const postApplyTeam = async (teamId: number) => {
  try {
    const response = await fetch(`${baseURL}teams/${teamId}/apply`, {
      method: "POST",
      headers: {
        Authorization: getToken(),
      },
    });
    const data = await response.json();
    if (
      data.detail === "Not authenticated" ||
      data.detail === "Invalid authentication credentials"
    ) {
      return Promise.reject(authError);
    }
    if (data.success) {
      return Promise.resolve(data);
    }
    return Promise.reject(unknownError);
  } catch (e) {
    return Promise.reject(e);
  }
};

export const postAcceptApplication = async (teamId: number, userId: number) => {
  try {
    const response = await fetch(`${baseURL}teams/${teamId}/accept/${userId}`, {
      method: "POST",
      headers: {
        Authorization: getToken(),
      },
    });
    const data = await response.json();
    if (
      data.detail === "Not authenticated" ||
      data.detail === "Invalid authentication credentials"
    ) {
      return Promise.reject(authError);
    }
    if (data.success) {
      return Promise.resolve(data);
    }
    return Promise.reject(unknownError);
  } catch (e) {
    return Promise.reject(e);
  }
};
