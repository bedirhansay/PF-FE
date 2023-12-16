import { LoginDTO, SkillsDTO } from "@types";
import Joi from "joi";

export const loginValidation = (loginPayload: LoginDTO) => {
  const LoginValidationSchema = Joi.object({
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required(),
    password: Joi.string().required(),
  });

  return LoginValidationSchema.validate(loginPayload);
};

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
