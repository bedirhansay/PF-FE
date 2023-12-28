import React from "react";
import { ClientBlogPage } from "@container";
import { callApi } from "../../lib/actions/__api.actions";
export const dynamic = "force-dynamic";
export default async function page() {
  const { data } = await callApi({ method: "get", path: "blog" });

  return <ClientBlogPage blogs={data} />;
}
