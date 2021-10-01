import {HttpMethods, HttpService} from "./http.service";
import {UserService} from "./user.service";
import {TeamsService} from "./teams.service";
import {Team} from "../domain/team";
import {User} from "../domain/user";

export class AdminService {

  static async getAllUsers(): Promise<User[]> {
    const data = await HttpService.send(HttpMethods.GET, 'users', {}, true);
    return data.map((userData: any) => UserService.userFromData(userData));
  }

  static async setCaution(userId: string, value: boolean) {
    await HttpService.send(HttpMethods.POST, `users/caution/${userId}`, {cautionStatus: value}, true);
  }

  static async kickUser(userId: string) {
    await HttpService.send(HttpMethods.POST, `teams/leave/${userId}`, {}, true);
  }

  static async deleteUser(userId: string) {
    await HttpService.send(HttpMethods.DELETE, `users/${userId}`, {}, true);
  }

  static async getAllTeams(): Promise<Team[]> {
    const data = await HttpService.send(HttpMethods.GET, 'teams', {}, true);
    return data.map((teamData: any) => TeamsService.teamFromData(teamData));
  }

  static async updateTeam(teamId: string, {name, description, idea}: {
    name: string,
    description: string,
    idea: string
  }) {
    await HttpService.send(HttpMethods.PUT, `teams/${teamId}`, {name, description, idea}, true);
  }

  static async deleteTeam(teamId: string) {
    await HttpService.send(HttpMethods.DELETE, `teams/${teamId}`, {}, true);
  }

}
