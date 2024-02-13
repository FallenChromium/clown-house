import { OpenAPI } from "@/client";
import router from "@/router";
import axios, { type AxiosResponse } from "axios";

interface LoginResponse {
  access_token: string;
}

export class AuthService {
  static login(username: string, password: string) {
    const saved_token = localStorage.getItem("user_session");
    if (saved_token) OpenAPI.TOKEN = saved_token;
    else {
      const form = new FormData();
      form.append("username", username);
      form.append("password", password);
      axios
        .post<LoginResponse>(OpenAPI.BASE + "/api/login", form)
        .then((response) => {
          console.log(response);
          OpenAPI.TOKEN = response.data.access_token;
          console.log("token: " + OpenAPI.TOKEN)
          localStorage.setItem("user_session", response.data.access_token);
        });
    }
    router.push({ path: "/objects" });
  }
  static auth_token(): string | undefined {
    const saved_token = localStorage.getItem("user_session");
    if (saved_token) return saved_token;
    else return undefined;
  }
}
// Add a response interceptor
axios.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      router.push({ path: "/login" });
    }
    return Promise.reject(error);
  }
);
