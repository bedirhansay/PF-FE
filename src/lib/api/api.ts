import ReadToken from "../actions/readToken.actions";
import { ApiConfig, DEFAULT_API_CONFIG } from "./api-config";
import axios, { AxiosError, AxiosInstance } from "axios";

export class Api {
  instance!: AxiosInstance;
  config!: ApiConfig;
  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config;
    this.setup();
  }
  setup() {
    const api = axios.create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
    });

    api.interceptors.request.use(
      async (config) => {
        const token = await ReadToken();
        if (token) {
          config.headers["Authorization"] = `Bearer: ${token}`;
        }
        config.baseURL = this.config.url;
        axios.defaults.headers.common["Content-Type"] = "application/json";
        axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
        return config;
      },
      (error: AxiosError) => {
        Promise.reject(error);
      }
    );
    this.instance = api;
  }
  async setAuth(jwt: string | undefined) {
    this.instance.defaults.headers.common["Authorization"] = `Bearer: ${jwt}`;
  }
  setLanguage(language: string) {
    this.instance.interceptors.request.use((config) => {
      axios.defaults.headers.common["X-localization"] = language;
      return config;
    });
  }
}
export const apiWorker = new Api();
