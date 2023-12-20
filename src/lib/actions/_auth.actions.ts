"use server";

import { LoginDTO, RegisterDTO } from "@types";
import { apiWorker } from "../api/api";
import { cookies } from "next/headers";

// 2 - login
export const login = async (payload: LoginDTO) => {
  try {
    const response = await apiWorker.instance.post(`auth/login`, payload);
    if (response.status !== 200) {
      return { kind: "error" };
    }
    const { data } = response;
    cookies().set("admin-token", data.token);
    await apiWorker.setAuth(data.token);
    return data;
  } catch (e) {
    return { kind: e };
  }
};

// 3 - getUser
export const getUser = async () => {
  try {
    const response = await apiWorker.instance.get(`/user`);
    if (response.status !== 200) {
      return { kind: "error" };
    }
    const { data } = response;
    return { kind: "ok", data };
  } catch (e) {
    return { kind: "invalid-creds" };
  }
};

// 4 - registerUser
export const registerUser = async (payLoad: RegisterDTO) => {
  try {
    const response = await apiWorker.instance.post(`/register`, payLoad);
    if (!(response.status === 200)) {
      return { kind: "error" };
    }
    const { data } = response;
    await apiWorker.setAuth(data.token);
    window.location.href = "/";
    return { kind: "ok", data };
  } catch (e) {
    return { kind: "invalid-creds" };
  }
};

// 5 - logout
export const logout = async () => {
  try {
    const response = await apiWorker.instance.post(`/logout`);
    if (response.status !== 200 || response.data.message !== "Logged out") {
      return { kind: "error" };
    }
    const { data } = response;
    apiWorker.setAuth("");
    cookies().delete("name");
    window.location.href = "/login";
    return data;
  } catch (e) {
    return { kind: "invalid-creds" };
  }
};

// 6 - updateUser
export const updateUser = async (payLoad: any) => {
  try {
    const response = await apiWorker.instance.put(`/users/update`, payLoad);
    if (response.status !== 200) {
      return { kind: "error" };
    }
    const { data } = response;
    return { kind: "ok", data };
  } catch (e) {
    return { kind: "invalid-creds" };
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
    if (response.status !== 200) {
      return { kind: "error" };
    }
    const { data } = response;
    return { kind: "ok", data };
  } catch (e) {
    return { kind: "invalid-creds" };
  }
};
