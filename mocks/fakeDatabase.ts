import { User } from "../entities/user/user";
import { Team } from "../entities/team/team";

export const fakeUsers: User[] = [
  {
    id: "hanan-nana",
    password: "pswrd",
    username: "김지호",
    position: ["웹 프론트", "ios"],
    isJoined: true,
  },
  {
    id: "austin.y",
    password: "pswrd",
    username: "이민규",
    position: [],
    isJoined: true,
  },
  {
    id: "shp7724",
    password: "pswrd",
    username: "박신홍",
    position: ["웹 프론트", "서버", "ios", "android", "디자인", "모든 것"],
    isJoined: true,
  },
  {
    id: "woohm402",
    password: "pswrd",
    username: "우현민",
    position: ["웹 프론트", "서버"],
    isJoined: false,
  },
  {
    id: "test",
    password: "right",
    username: "테스트",
    position: ["웹 프론트"],
    isJoined: false,
  },
  {
    id: "test2",
    password: "pswrd",
    username: "테스트2",
    position: ["디자인"],
    isJoined: true,
  },
];

export const fakeTeams: Team[] = [
  {
    id: "dafwejoi",
    teamName: "아무이름이나짓자",
    resolution: "화이팅!",
    maximumNumber: 4,
    members: [
      {
        id: "hanan-nana",
        username: "김지호",
        position: ["웹 프론트", "ios"],
        isJoined: true,
      },
      {
        id: "austin.y",
        username: "이민규",
        position: [],
        isJoined: false,
      },
    ],
    applicants: [],
  },
  {
    id: "super",
    teamName: "슈퍼개발자팀",
    resolution: "화이팅!",
    maximumNumber: 2,
    members: [
      {
        id: "shp7724",
        username: "박신홍",
        position: ["웹 프론트", "서버", "ios", "android", "디자인", "모든 것"],
        isJoined: false,
      },
    ],
    applicants: [
      {
        id: "woohm402",
        username: "우현민",
        position: ["웹 프론트", "서버"],
        isJoined: false,
        comment: "저도 슈퍼 개발자입니다",
      },
    ],
  },
  {
    id: "test",
    teamName: "테스트팀",
    resolution: "아이고 머리아파",
    maximumNumber: 3,
    members: [
      {
        id: "test2",
        username: "테스트2",
        position: ["디자인"],
        isJoined: true,
      },
    ],
    applicants: [],
  },
];
