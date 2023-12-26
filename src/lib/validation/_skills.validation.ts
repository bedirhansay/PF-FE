import Joi from "joi";

export const SkillSchema = Joi.object({
  _id: Joi.string(),
  title: Joi.string().required(),
  items: Joi.string().required(),
  image: Joi.string().required(),
  bgColor: Joi.string().required(),
  itemColor: Joi.string().required(),
});
