import axios, { AxiosInstance } from "axios";
import Cookies from "js-cookie";
import { redirect } from "next/navigation";

export interface ProjectDTO {
  Id: number;
  Watchers: number;
  Name: string;
  Description: string;
  Readme: string;
  HtmlUrl: string;
  Language: string;
  Created_at: string;
  Updated_at: string;
}

export interface UserDTO {
  Id: number;
  Name: string;
  Username: string;
  AvatarUrl: string;
  GithubUrl: string;
  Projects: ProjectDTO[];
}
export class UserService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      withCredentials: true,
    });

    this.api.interceptors.request.use((config) => {
      const token = Cookies.get("token");
      if (token) {
        config.headers.Authorization = `${token}`;
      }
      return config;
    });
  }

  async getToken(code: string): Promise<string> {
    const res = await this.api.get("/auth/github/callback", {
      params: { code },
    });

    const token = res.data;

    Cookies.set("token", token, {
      expires: 7,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return token;
  }

  async getUserData(): Promise<UserDTO | null> {
    try {
      const res = await this.api.get("/user/git");
      console.log("User data:", res.data);
      return res.data;
    } catch (err) {
      redirect("/login");
    }
  }

  logout() {
    Cookies.remove("token");
  }

  isLoggedIn(): boolean {
    return !!Cookies.get("token");
  }
}
