import Joi from "joi";
import mongoose from "mongoose";
import { SkillsDTO } from "../types/types";

const SkillSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    items: {
      type: [String],
      required: true,
    },
    bgColor: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    itemColor: {
      type: String,
      required: true,
    },
  },
  { versionKey: false }
);
export const SkillValidation = (skills: SkillsDTO) => {
  const skillValidationSchema = Joi.object({
    title: Joi.string().required(),
    items: Joi.array().items(Joi.string()).required(),
    bgColor: Joi.string().required(),
    image: Joi.string().required(),
    itemColor: Joi.string().required(),
  });

  return skillValidationSchema.validate(skills);
};

export const SkillModel =
  mongoose.models.Skills || mongoose.model("Skills", SkillSchema);

export const GetAllSkills = () => SkillModel.find();

export const GetSkillById = (id: string) => SkillModel.findById({ _id: id });

export const CreateSkill = (values: Record<string, any>) =>
  new SkillModel(values).save().then((user: any) => user.toObject());

export const DeleteSkill = (id: string) =>
  SkillModel.findOneAndDelete({ _id: id });

export const UpdateSkill = (id: string, values: Record<string, any>) =>
  SkillModel.findByIdAndUpdate(id, values);
