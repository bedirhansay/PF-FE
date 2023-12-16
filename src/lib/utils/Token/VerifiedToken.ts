import { jwtVerify } from "jose";

const getJWTSecret = () => {
  const secretKey = process.env.JWT_SECRET_KEY;
  if (!secretKey) {
    throw new Error("JWT Secret is not available");
  }
  return new TextEncoder().encode(secretKey);
};

export const verifiedToken = async ({ token }: { token: string }) => {
  try {
    const { payload } = await jwtVerify(token, getJWTSecret());
    return true;
  } catch (error) {
    return false;
  }
};

const AuthPages = ["/login"];

export const isAuthPageRequestedVerification = ({
  pathname,
}: {
  pathname: string;
}) => {
  return AuthPages.some((e) => e === pathname);
};
