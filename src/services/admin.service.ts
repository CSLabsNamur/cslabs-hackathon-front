import {HttpMethods, HttpService} from "./http.service";
import {UserService} from "./user.service";

export class AdminService {

  static async getAllUsers() {
    const data = await HttpService.send(HttpMethods.GET, 'users', {}, true);
    return data.map((userData: any) => UserService.userFromData(userData));
  }

}
