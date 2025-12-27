import axios, { AxiosInstance } from "axios";
import Cookies from "js-cookie";

export interface ProjectDTO {
  id: number;
  watchers: number;
  name: string;
  description: string;
  htmlUrl: string;
  language: string;
  created_at: string;
  updated_at: string;
}

export interface UserDTO {
  id: number;
  name: string;
  username: string;
  avatarUrl: string;
  githubUrl: string;
  projects: ProjectDTO[];
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
      return res.data;
    } catch (err) {
      throw new Error("Erro ao buscar user:" + err);
    }
  }

  logout() {
    Cookies.remove("token");
  }

  isLoggedIn(): boolean {
    return !!Cookies.get("token");
  }
}
