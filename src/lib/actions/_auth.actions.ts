"use server";

import { LoginDTO, RegisterDTO } from "@types";
import { apiWorker } from "../api/api";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const setTokenCookie = (token: string) => {
  const oneMonth = 24 * 60 * 60 * 1000 * 30;
  const expirationDate = new Date();
  expirationDate.setTime(expirationDate.getTime() + oneMonth);

  cookies().set("admin-token", token, {
    expires: expirationDate,
  });
};

const handleResponse = (response: any) => {
  if (response.status !== 200) {
    return { kind: "error" };
  }
  const { data } = response;
  return { kind: "ok", data };
};

const handleError = (e: any) => {
  return { kind: "error", error: e.response?.data };
};

const handleRedirect = (url: string) => {
  redirect(url);
};

// 2 - login
export const login = async (payload: LoginDTO) => {
  try {
    const response = await apiWorker.instance.post(`auth/login`, payload);
    if (response.status === 200) {
      const { data } = response;
      setTokenCookie(data.token);
      await apiWorker.setAuth(data.token);
      return data;
    } else {
      return handleResponse(response);
    }
  } catch (e: any) {
    return handleError(e);
  }
};

// 3 - getUser
export const getUser = async () => {
  try {
    const response = await apiWorker.instance.get(`/user`);
    return handleResponse(response);
  } catch (e) {
    return handleError(e);
  }
};

// 4 - registerUser
export const registerUser = async (payLoad: RegisterDTO) => {
  try {
    const response = await apiWorker.instance.post(`/register`, payLoad);
    if (response.status === 200) {
      const { data } = response;
      await apiWorker.setAuth(data.token);
      handleRedirect("/admin/blog");
      return { kind: "ok", data };
    } else {
      return handleResponse(response);
    }
  } catch (e) {
    return handleError(e);
  }
};

// 5 - logout
export const logout = async () => {
  try {
    const response = await apiWorker.instance.post(`/logout`);
    if (response.status === 200 && response.data.message === "Logged out") {
      apiWorker.setAuth("");
      cookies().delete("admin-token");
      handleRedirect("/auth/login");
      return response.data;
    } else {
      return handleResponse(response);
    }
  } catch (e) {
    return handleError(e);
  }
};

// 6 - updateUser
export const updateUser = async (payLoad: any) => {
  try {
    const response = await apiWorker.instance.put(`/users/update`, payLoad);
    return handleResponse(response);
  } catch (e) {
    return handleError(e);
  }
};

// 7 - testJWT
export const testJWT = async (jwt: string) => {
  try {
    const response = await apiWorker.instance.get(`/user`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return handleResponse(response);
  } catch (e) {
    return handleError(e);
  }
};
