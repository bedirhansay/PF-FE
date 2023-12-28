"use server";

import { AxiosResponse, AxiosError } from "axios";
import { apiWorker } from "@api";
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

export const callApi = async ({
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

        revalidatePath("/admin/" + path);
        break;
      case "patch":
        response = await apiWorker.instance.patch(path, payload);
        revalidatePath("/admin/" + path);
        break;
      case "delete":
        response = await apiWorker.instance.delete(path);

        revalidatePath("/admin/" + path);
        break;
      default:
        throw new Error("Invalid method");
    }

    if (response.status >= 200 && response.status < 300) {
      return { kind: "ok", data: response.data };
    } else {
      console.log(response.data);
      return { kind: "error", error: response.data, status: response.status };
    }
  } catch (error) {
    console.log(error);
    const axiosError = error as AxiosError;
    return {
      kind: "error",
      error: axiosError.message,
      status: axiosError.response?.status || 400,
    };
  }
};
