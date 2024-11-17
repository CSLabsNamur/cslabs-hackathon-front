import { ReplaySubject } from "rxjs";
import { User } from "../domain/user";
import { HttpMethods, HttpService } from "./http.service";
import { TeamsService } from "./teams.service";
import { Team } from "../domain/team";
import { useCookies } from "react-cookie";

export class UserService {
  static lastUserValue: User | null = null;
  private static user = new ReplaySubject<User | null>(1);

  static getUserSubject() {
    return UserService.user;
  }

  static async registerAndLogin({
                                  email,
                                  password,
                                  firstName,
                                  lastName,
                                  github,
                                  linkedIn,
                                  note,
                                  imageAgreement,
                                  subscribeFormation,
                                }: {
    email: string, password: string,
    firstName: string, lastName: string,
    github?: string, linkedIn?: string,
    note?: string, imageAgreement: boolean,
    subscribeFormation: boolean,
  }) {
    await HttpService.send(HttpMethods.POST, "authentication/register", {
      email: email.toLowerCase(), password, firstName, lastName, imageAgreement, subscribeFormation,
      github: github !== "" ? github : null,
      linkedIn: linkedIn !== "" ? linkedIn : null,
      comment: note !== "" ? note : null,
    });
    const userData = await this.loginWithCredentials(email, password);
    const user = this.userFromData(userData);
    this.user.next(user);
    return user;
  }

  static async update({firstName, lastName, github, linkedIn, note, subscribeFormation}: {
    firstName: string, lastName: string,
    github?: string, linkedIn?: string,
    note?: string, subscribeFormation: boolean,
  }) {
    const data = await HttpService.send(HttpMethods.PUT, "users/me", {
      firstName, lastName, subscribeFormation,
      github: github !== "" ? github : undefined,
      linkedIn: linkedIn !== "" ? linkedIn : undefined,
      comment: note !== "" ? note : undefined,
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

  static async updateVote(newVote: string) {
    const user = this.lastUserValue;
    if (!user) {
      throw Error("cannot set vote of null user instance.");
    }
    await HttpService.send(HttpMethods.POST, `teams/vote/${newVote}`, {}, true);
    user.voteId = newVote;
    this.user.next(user);
  }

  static async tryAutoLogin() {
    const data = await HttpService.send(HttpMethods.GET, "users/me", {}, true);
    const user = this.userFromData(data);
    this.user.next(user);
    return user;
  }

  static async loginWithCredentials(email: string, password: string): Promise<User> {
    const [cookies, setCookie] = useCookies(["Authorization", "refreshToken"]);

    "".toLowerCase();
    const response = await HttpService.send(HttpMethods.POST, "authentication/log-in", {
      email: email.toLowerCase(),
      password,
    });
    const {accessToken, refreshToken, ...data} = response;
    setCookie("Authorization", `Bearer ${accessToken}`);
    setCookie("refreshToken", refreshToken);
    const user: User = this.userFromData(data);
    this.user.next(user);
    return user;
  }

  static async uploadCv(file: File) {
    await HttpService.send(HttpMethods.FILE, "users/upload-cv", file, true);
  }

  static async disconnect() {
    await HttpService.send(HttpMethods.POST, "authentication/log-out", {}, true);
    const [cookies, setCookie] = useCookies(['Authorization', 'refreshToken']);
    setCookie('Authorization', '');
    setCookie('refreshToken', '');
    this.user.next(null);
  }

  static async askResetPassword(email: string) {
    await HttpService.send(HttpMethods.POST, "authentication/ask-password-reset", {
      email: email.toLowerCase(),
    });
  }

  static async resetPasswordToken(newPassword: string, resetPasswordToken: string) {
    await HttpService.send(HttpMethods.POST, "authentication/reset-password", {
      newPassword,
      resetPasswordToken,
    });
  }

  static userFromData(userData: any): User {
    const {
      id, email,
      firstName, lastName,
      github, linkedIn,
      isTeamOwner, isAdmin,
      comment,
      paidCaution,
      createdAt,
      voteId,
      imageAgreement,
      subscribeFormation,
    } = userData;

    let team;
    if (userData.team) {
      team = TeamsService.teamFromData(userData.team);
    }

    let creationDate;
    if (createdAt) {
      creationDate = new Date(parseInt(createdAt));
    }

    return {
      id, email,
      firstName, lastName,
      github, linkedIn,
      note: comment,
      isTeamOwner, isAdmin,
      team, paidCaution,
      createdAt: creationDate,
      voteId,
      imageAgreement,
      subscribeFormation,
    } as User;
  }

}

UserService.getUserSubject().subscribe((user) => {
  UserService.lastUserValue = user;
});
