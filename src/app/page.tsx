// app/page.tsx
import Link from 'next/link'
import { client } from '@/sanity/lib/client'

async function getPosts() {
  try {
    return await client.fetch(`
      *[_type == "post"] | order(publishedAt desc) {
        _id,
        title,
        slug,
        publishedAt,
        mainImage {
          asset-> {
            url
          },
          alt
        },
        author-> {
          name
        },
        categories[]-> {
          title
        }
      }
    `)
  } catch (error) {
    console.error('Error fetching posts:', error)
    return []
  }
}

export default async function Home() {
  const posts = await getPosts()

  return (
    <main className="max-w-5xl mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold mb-8">Blog Posts</h1>
      <div className="grid gap-6">
        {posts.map((post) => (
          <Link
            href={`/post/${post.slug.current}`}  // Ensure `slug.current` exists
            key={post._id}
            className="block p-6 border rounded-lg hover:shadow-lg transition-shadow"
          >
            <div className="flex gap-4 items-start">
              {post.mainImage && (
                <img
                  src={post.mainImage.asset.url}
                  alt={post.mainImage.alt || ''}
                  className="w-52 h-32 object-cover rounded"
                />
              )}
              <div>
                <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
                <p className="text-gray-600 mb-2">By {post.author.name}</p>
                <div className="flex gap-2">
                  {post.categories.map((category) => (
                    <span
                      key={category.title}
                      className="bg-gray-100 px-3 py-1 rounded-full text-sm"
                    >
                      {category.title}
                    </span>
                  ))}
                </div>
                <p className="text-gray-500 mt-2">
                  {new Date(post.publishedAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  )
}
