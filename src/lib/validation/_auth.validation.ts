import Joi from "joi";

export const RegisterSchema = Joi.object({
  email: Joi.string().required().min(3).max(20).messages({
    "string.base": "User name must be a string.",
    "string.empty": "User name is required.",
    "string.min": "User name must be at least {#limit} characters long.",
    "string.max": "User name must be at most {#limit} characters long.",
    "any.required": "User name is required.",
  }),
  password: Joi.string().required().min(3).messages({
    "string.base": "Password must be a string.",
    "string.empty": "Password is required.",
    "string.min": "Password must be at least {#limit} characters long.",
    "any.required": "Password is required.",
  }),
});

export const LoginSchema = Joi.object({
  email: Joi.string().required().min(6).messages({
    "string.base": "User name must be a string.",
    "string.empty": "User name is required.",
    "string.min": "User name must be at least {#limit} characters long.",
    "any.required": "User name is required.",
  }),
  password: Joi.string().required().min(6).messages({
    "string.base": "Password must be a string.",
    "string.empty": "Password is required.",
    "string.min": "Password must be at least 6 characters long.",
    "any.required": "Password is required.",
  }),
});
