import Joi from "joi";

export const SkillSchema = Joi.object({
  _id: Joi.string(),
  title: Joi.string().required(),
  items: Joi.string().required(),
  image: Joi.string().required(),
  bgColor: Joi.string().required(),
  itemColor: Joi.string().required(),
});

export const ProjectSchema = Joi.object({
  _id: Joi.string(),
  company: Joi.string().required(),
  projectName: Joi.string().required(),
  image: Joi.string().required(),
  time: Joi.number().required(),
  area: Joi.string().required(),
  tags: Joi.string().required(),
  description: Joi.string().required(),
  goals: Joi.string().required(),
  scope: Joi.string().required(),
  requirements: Joi.string().required(),
  tasks: Joi.string().optional(),
});

export const CategorySchema = Joi.object({
  _id: Joi.string(),
  name: Joi.string().required(),
  image: Joi.string().required(),
});

export const ExperienceSchema = Joi.object({
  _id: Joi.string(),
  title: Joi.string().required(),
  location: Joi.string().required(),
  position: Joi.string().required(),
  description: Joi.string().required(),
  image: Joi.string(),
  date: Joi.string().required(),
  skills: Joi.string().optional(),
});

export const BlogSchema = Joi.object({
  _id: Joi.string(),
  title: Joi.string().required(),
  slug: Joi.string().optional(),
  description: Joi.string().optional(),
  image: Joi.string().optional(),
  category: Joi.string(),
});
