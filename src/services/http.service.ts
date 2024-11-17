import axios from "axios";
import { useCookies } from "react-cookie";

export enum HttpMethods {
  GET,
  POST,
  PUT,
  DELETE,
  FILE,
}

export class HttpService {

  static async send(method: HttpMethods, uri: string, data: Object = {}, auth = false, tryRefresh = true): Promise<any> {
    const headers: any = {};
    const [cookies, _] = useCookies(["Authorization", "refreshToken"]);
    const authorization = cookies["Authorization"];
    if (auth && authorization) {
      headers["Authorization"] = authorization;
    }

    const domain = import.meta.env.VITE_API_DOMAIN;
    let response;

    switch (method) {
      case HttpMethods.GET:
        response = await axios.get(`${domain}/${uri}`, {
          params: data,
          headers,
        });
        break;

      case HttpMethods.POST:
        response = await axios.post(`${domain}/${uri}`, data, {
          headers,
        });
        break;

      case HttpMethods.PUT:
        response = await axios.put(`${domain}/${uri}`, data, {
          headers,
        });
        break;

      case HttpMethods.DELETE:
        response = await axios.delete(`${domain}/${uri}`, {
          data,
          headers,
        });
        break;

      case HttpMethods.FILE:
        const form = new FormData();
        form.append("file", data as File);
        response = await axios.post(`${domain}/${uri}`, form, {
          headers: headers,
        });
        break;
    }

    if (response.status === 200 || response.status === 201) {
      return response.data;
    }

    if (tryRefresh && await this.refreshTokens()) {
      return this.send(method, uri, data, auth, false);
    }

    throw Error("Request failed.");
  }

  static async refreshTokens(): Promise<boolean> {
    console.log("Try to refresh tokens.");
    const [cookies, setCookie] = useCookies(["Authorization", "refreshToken"]);
    const refreshToken = cookies["refreshToken"];
    if (!refreshToken) {
      return false;
    }

    const domain = import.meta.env.VITE_API_DOMAIN;

    try {
      const response = await axios.get(`${domain}/authentication/refresh`, {
        headers: {"RefreshToken": refreshToken},
      });
      const newAccessToken = response.data.accessToken;
      const newRefreshToken = response.data.refreshToken;
      setCookie("Authorization", `Bearer ${newAccessToken}`);
      setCookie("refreshToken", newRefreshToken);
      console.log("Tokens refreshed.");
    } catch (err) {
      console.log("Failed to refresh tokens.");
      return false;
    }

    return true;
  }
}
