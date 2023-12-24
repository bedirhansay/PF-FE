"use server";

import { AxiosResponse, AxiosError } from "axios";
import { apiWorker } from "@api";
import { AboutDTO } from "../types/types";
import { revalidatePath } from "next/cache";

interface ApiFunctionProps {
  method: string;
  path: string;
  payload?: any;
}

interface ApiResponse {
  kind: "ok" | "error";
  data?: any;
  error?: any;
  status?: number;
}

const callApi = async ({
  method,
  path,
  payload,
}: ApiFunctionProps): Promise<ApiResponse> => {
  try {
    let response: AxiosResponse;

    switch (method) {
      case "get":
        response = await apiWorker.instance.get(path);
        break;
      case "post":
        response = await apiWorker.instance.post(path, payload);
        revalidatePath("/admin/about");
        break;
      case "patch":
        response = await apiWorker.instance.patch(path, payload);
        revalidatePath("/admin/about");
        break;
      case "delete":
        response = await apiWorker.instance.delete(path, { data: payload });
        revalidatePath("/admin/about");
        break;
      default:
        throw new Error("Invalid method");
    }

    if (response.status >= 200 && response.status < 300) {
      return { kind: "ok", data: response.data };
    } else {
      return { kind: "error", error: response.data, status: response.status };
    }
  } catch (error) {
    const axiosError = error as AxiosError;
    return {
      kind: "error",
      error: axiosError.message,
      status: axiosError.response?.status || 400,
    };
  }
};

export const getAbout = async () => callApi({ method: "get", path: "/about" });

export const updateAbout = async ({
  payload,
}: {
  payload: AboutDTO;
}): Promise<ApiResponse> =>
  callApi({ method: "patch", path: "/about", payload });

export const createAbout = async ({
  payloads,
}: {
  payloads: AboutDTO;
}): Promise<ApiResponse> =>
  callApi({ method: "post", path: "/about", payload: payloads });