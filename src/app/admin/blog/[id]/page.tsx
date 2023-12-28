import { SingleBlogPage } from "../../../../container/Admin/BlogPage/SingleBlogPage";
import { callApi } from "../../../../lib/actions/__api.actions";

export default async function page({ params }: { params: { id: string } }) {
  const { id } = params;
  const { data } = await callApi({ method: "get", path: `/blog/${id}` });

  return <SingleBlogPage blog={data} />;
}
