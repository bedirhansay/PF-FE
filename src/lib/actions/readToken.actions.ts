"use server";

import { cookies } from "next/headers";

export default async function ReadToken() {
  "use server";
  const cookieStore = cookies();
  const token = cookieStore.get("admin-token");

  if (token) {
    const accessToken = token.value;
    return accessToken;
  }
  return null;
}
