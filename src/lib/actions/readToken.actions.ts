"use server";

import { cookies } from "next/headers";

async function getCookieData() {
  const cookieStore = cookies();
  const token = cookieStore.get("admin-token");

  return new Promise((resolve) =>
    setTimeout(() => {
      if (token) {
        resolve(token.value);
      } else {
        resolve(null);
      }
    }, 1000)
  );
}

export default getCookieData;
