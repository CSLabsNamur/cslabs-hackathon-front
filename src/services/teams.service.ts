import { UserService } from "./user.service";
import { HttpMethods, HttpService } from "./http.service";
import { Team } from "../domain/team";
import { User } from "../domain/user";
import { Buffer } from "buffer";

export class TeamsService {

  static async getAll(): Promise<Team[]> {
    const data: any[] = await HttpService.send(HttpMethods.GET, "teams", {}, true);
    return data.map((teamData) => this.teamFromData(teamData));
  }

  static async get(teamId: string): Promise<Team> {
    const teamData = await HttpService.send(HttpMethods.GET, `teams/${teamId}`, {}, true);
    return this.teamFromData(teamData);
  }

  static async join(encodedToken: string) {
    const token = Buffer.from(encodedToken, "base64").toString();
    const teamData = await HttpService.send(HttpMethods.POST, `teams/join/${token}`, {}, true);
    const team = this.teamFromData(teamData);
    await UserService.updateTeam(team, false);
  }

  static async leave(user: User, memberId: string) {
    const teamData = await HttpService.send(HttpMethods.POST, `teams/leave/${memberId}`, {}, true);
    const team = this.teamFromData(teamData);
    if (user.id === memberId) {
      await UserService.updateTeam(null, false);
    } else if (user.team?.id === team.id) {
      // noinspection PointlessBooleanExpressionJS
      await UserService.updateTeam(team, !!user.isTeamOwner);
    }
    return memberId;
  }

  static async invite(email: string) {
    await HttpService.send(HttpMethods.POST, "teams/invite", {email}, true);
  }

  static async create({name, description, idea, invitations}: {
    name: string,
    description: string,
    idea: string,
    invitations: string[]
  }) {
    const teamData = await HttpService.send(HttpMethods.POST, "teams/new", {
      name, description, idea, invitations,
    }, true);
    const team = this.teamFromData(teamData);
    await UserService.updateTeam(team, true);
  }

  static async update(teamId: string, {name, description, idea}: {
    name: string,
    description: string,
    idea: string
  }) {
    const teamData = await HttpService.send(HttpMethods.PUT, `teams/${teamId}`, {
      name, description, idea,
    }, true);
    const team = this.teamFromData(teamData);
    await UserService.updateTeam(team, true);
  }

  static async delete(teamId: string) {
    await HttpService.send(HttpMethods.DELETE, `teams/${teamId}`, {}, true);
    await UserService.updateTeam(null, false);
  }

  static teamFromData(teamData: any): Team {
    const {id, name, description, idea, token, valid, createdAt} = teamData;

    let members;
    if (teamData.members) {
      members = teamData.members.map((data: any) => UserService.userFromData(data));
    }

    let creationDate;
    if (createdAt) {
      creationDate = new Date(parseInt(createdAt));
    }

    return {id, name, description, idea, token, valid, members, createdAt: creationDate};
  }

}
