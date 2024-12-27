import { client } from "@/sanity/lib/client";

export const fetchPosts = async () => {
  const query = `
    *[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      publishedAt,
      mainImage{
        asset->{url},
        alt
      },
      author->{
        name,
        slug,
        image{
          asset->{url}
        }
      },
      categories[]->{
        title,
        slug
      },
      body
    }
  `;
  const posts = await client.fetch(query);
  return posts;
};

