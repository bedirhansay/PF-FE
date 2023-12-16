import mongoose from "mongoose";

const SkillSchema = new mongoose.Schema(
  {
    title: { type: String },
    items: { type: [String] },
    bgColor: { type: String },
    image: { type: String },
    itemColor: { type: String },
  },
  { versionKey: false }
);

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
