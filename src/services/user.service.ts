import {Subject} from "rxjs";
import {User} from "../domain/user";
import {HttpService} from "./http.service";

export class UserService {

  private static user = new Subject<User>();

  private constructor() {}

  static getUserSubject() {
    return UserService.user;
  }

  static async fetchUser() {
    return await HttpService.get('users/me');
  }

}


