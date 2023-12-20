import { apiWorker } from "@api";

//! Get All Orders
export const getAllSkills = async () => {
  try {
    const response = await apiWorker.instance.get("/skills");
    return response.data;
  } catch (error) {
    return { status: 400, data: [] };
  }
};

// ! Find single ORders by id

export const findSingleSkill = async ({ id }: { id: string }) => {
  try {
    const response = await apiWorker.instance.get(`/skills/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
    return { status: 400, data: [] };
  }
};
