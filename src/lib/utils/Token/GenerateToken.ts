import jwt from "jsonwebtoken";

interface IGenerateToken {
  email: string;
}

export const generateToken = (payload: IGenerateToken): string | null => {
  const JWT_SECRET = process.env.JWT_SECRET_KEY;

  if (!JWT_SECRET) {
    console.error("JWT_SECRET is not defined in the environment variables.");
    return null;
  }

  const token = jwt.sign(payload, JWT_SECRET);

  return token;
};
