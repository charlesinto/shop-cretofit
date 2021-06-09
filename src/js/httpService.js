import { BASE_URL } from "./constant";

class HttpService {
  getResource(url, token, params) {
    return new Promise((resolve, reject) => {
      return fetch(`${BASE_URL}/api/v1${url}`, { method: "GET" })
        .then((res) => res.json())
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    });
  }
}

export default HttpService;
