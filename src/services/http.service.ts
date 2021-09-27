import axios from "axios";

export class HttpService {
  static domain = 'http://127.0.0.1:5000';

  static async get(uri: string, data: Object = {}, auth = false) {
    const accessToken = localStorage.getItem('accessToken');
    let requestData: Object = {...data};
    if (auth && accessToken) {
      requestData = {...requestData, accessToken};
    }

    console.log('try request');

    let response = await axios.get(`${HttpService.domain}/${uri}`, {
      data: requestData,
      validateStatus: (status: number) => [200, 401].includes(status),
    });

    if (response.status === 200) {
      return response;
    }
    else if (response.status === 401) {
      if (await this.refreshTokens()) {
        response = await axios.get(`${HttpService.domain}/${uri}`, {
          data: requestData,
          validateStatus: (status: number) => [200, 401].includes(status),
        });
        return response;
      }
    }

    throw new Error('Not authenticated.');
  }

  static async refreshTokens() {
    console.log('try to refresh token');
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      return false;
    }

    try {
      const response = await axios.get(`${HttpService.domain}/refresh`, {
        data: {refreshToken}
      });
      const newAccessToken = response.data.accessToken;
      const newRefreshToken = response.data.refreshToken;
      localStorage.setItem('accessToken', newAccessToken);
      localStorage.setItem('refreshToken', newRefreshToken);
      console.log('Tokens refreshed.');
    } catch (err) {
      return false;
    }

    return true;
  }

}
