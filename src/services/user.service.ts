import {ReplaySubject} from "rxjs";
import {User} from "../domain/user";
import {HttpMethods, HttpService} from "./http.service";
import {TeamsService} from "./teams.service";
import {Team} from "../domain/team";

export class UserService {
  private static user = new ReplaySubject<User | null>(1);

  static redirect?: string;
  static lastUserValue: User | null = null;

  static getUserSubject() {
    return UserService.user;
  }

  static async registerAndLogin({email, password, firstName, lastName, github, linkedIn, note}: {
    email: string, password: string,
    firstName: string, lastName: string,
    github?: string, linkedIn?: string,
    note?: string
  }) {
    await HttpService.send(HttpMethods.POST, 'authentication/register', {
      email, password, firstName, lastName,
      github: github !== "" ? github : null,
      linkedIn: linkedIn !== "" ? linkedIn : null,
      comment: note !== "" ? note : null,
    });
    const userData = await this.loginWithCredentials(email, password);
    const user = this.userFromData(userData);
    this.user.next(user);
    return user;
  }

  static async update({firstName, lastName, github, linkedIn, note}: {
    firstName: string, lastName: string,
    github?: string, linkedIn?: string,
    note?: string
  }) {
    const data = await HttpService.send(HttpMethods.PUT, 'users/me', {
      firstName, lastName, github, linkedIn, comment: note
    }, true);
    const user = this.userFromData(data);
    this.user.next(user);
    return user;
  }

  static async updateTeam(team: Team | null, owner: boolean) {
    const user = this.lastUserValue;
    if (!user) {
      throw Error("cannot set team of null user instance.");
    }
    user.team = team ? team : undefined;
    user.isTeamOwner = owner;
    this.user.next(user);
  }

  static async tryAutoLogin() {
    const data = await HttpService.send(HttpMethods.GET, 'users/me', {}, true);
    const user = this.userFromData(data);
    this.user.next(user);
    return user;
  }

  static async loginWithCredentials(email: string, password: string): Promise<User> {
    const response = await HttpService.send(HttpMethods.POST, 'authentication/log-in', {email, password});
    const {accessToken, refreshToken, ...data} = response;
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    const user: User = this.userFromData(data);
    this.user.next(user);
    return user;
  }

  static async disconnect() {
    await HttpService.send(HttpMethods.POST, 'authentication/log-out', {}, true);
    localStorage.clear();
    this.user.next(null);
  }

  static userFromData(userData: any): User {
    const {
      id, email,
      firstName, lastName,
      github, linkedIn,
      isTeamOwner, isAdmin,
      comment
    } = userData;

    let team;
    if (userData.team) {
      team = TeamsService.teamFromData(userData.team);
    }

    return {id, email, firstName, lastName, github, linkedIn, note: comment, isTeamOwner, isAdmin, team} as User;
  }

}

UserService.getUserSubject().subscribe((user) => {
  UserService.lastUserValue = user;
});