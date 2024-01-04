import { MetadataRoute } from "next";
import { callApi } from "@/lib/actions/__api.actions";

export async function generateSitemaps() {
  const { data } = await callApi({ method: "get", path: "blog" });
  const numberOfBlogs = data.blogs.length;
  const sitemapCount = Math.ceil(numberOfBlogs / 50000);
  const sitemapIds = Array.from({ length: sitemapCount }, (_, index) => ({
    id: index, // Sitemap kimliği 0'dan başlasın
  }));

  return sitemapIds;
}

export default async function sitemap({
  id,
}: {
  id: number;
}): Promise<MetadataRoute.Sitemap> {
  const BASE_URL = "https://bedirhansaycom.vercel.app";
  const { data } = await callApi({
    method: "get",
    path: `blog?page=${id * 50000}&limit=50000`,
  });

  const blogsUrls = data.blogs.map((item: any) => ({
    url: `${BASE_URL}/blog/${item.slug}`,
    lastModified: new Date(item.updatedAt),
    changeFrequency: "daily",
  }));

  return blogsUrls;
}
