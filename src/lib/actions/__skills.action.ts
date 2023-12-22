"use server";

import { apiWorker } from "@api";
import { SkillsDTO } from "../types/types";
import { revalidatePath } from "next/cache";

//! Get All Skills
export const getAllSkills = async () => {
  try {
    const response = await apiWorker.instance.get("/skills");
    return response.data;
  } catch (error: any) {
    return { status: 400, data: error.message };
  }
};

// ! Find single

export const findSingleSkill = async ({ id }: { id: string }) => {
  try {
    const response = await apiWorker.instance.get(`/skills/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
    return { status: 400, data: [] };
  }
};

export const UpdateSkills = async ({ payload }: { payload: SkillsDTO }) => {
  try {
    const response = await apiWorker.instance.patch(`/skills`, payload);
    revalidatePath("/admin/skills");
    return response.data;
  } catch (error: any) {
    return { status: 400, error: error.message };
  }
};

export const createSkills = async ({ payloads }: { payloads: SkillsDTO }) => {
  try {
    const response = await apiWorker.instance.post(`/skills`, payloads);
    revalidatePath("/admin/skills");
    return response.data;
  } catch (error: any) {
    return { status: 400, error: error.message };
  }
};
type DeleteProps = {
  _id: string;
};

export const deleteSkill = async ({ payload }: { payload: DeleteProps }) => {
  try {
    const response = await apiWorker.instance.post(`/skills`, payload);
    revalidatePath("/admin/skills");
    console.log(response);
    return response.data;
  } catch (error: any) {
    return { status: 400, error: error.message };
  }
};
