import { SingleExperiencePage } from "@/container/Admin/ExperiencePage/SingleExperiencePage";
import { callApi } from "../../../../../lib/actions/__api.actions";

export default async function page({ params }: { params: { id: string } }) {
  const { id } = params;
  const { data } = await callApi({ method: "get", path: `/experience/${id}` });

  return <SingleExperiencePage experience={data} />;
}
