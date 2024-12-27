import { client } from '@/sanity/lib/client'
import { PortableText } from '@portabletext/react'

// Define the type for the PortableText body
type PortableTextBlock = {
  _key: string
  _type: string
  children: Array<{
    _key: string
    _type: string
    text: string
  }>
}

interface Post {
  title: string
  mainImage?: {
    asset: {
      url: string
    }
    alt?: string
  }
  publishedAt: string
  body: PortableTextBlock[] // Adjusted the body type to be more specific
  author: {
    name: string
    image?: {
      asset: {
        url: string
      }
    }
  }
}

interface PageProps {
  params: {
    slug: string
  }
}

async function getPost(slug: string): Promise<Post | null> {
  try {
    return await client.fetch(`
      *[_type == "post" && slug.current == $slug][0] {
        title,
        mainImage {
          asset-> {
            url
          },
          alt
        },
        publishedAt,
        body,
        author-> {
          name,
          image {
            asset-> {
              url
            }
          }
        }
      }
    `, { slug })
  } catch (error) {
    console.error('Error fetching post:', error)
    return null
  }
}

export default async function PostPage({ params }: PageProps) {
  const post = await getPost(params.slug)

  if (!post) {
    return <div>Post not found</div>
  }

  return (
    <article className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      {post.mainImage && (
        <img
          src={post.mainImage.asset.url}
          alt={post.mainImage.alt || ''}
          className="w-full h-[400px] object-cover rounded-lg mb-8"
        />
      )}
      <div className="flex items-center gap-4 mb-8">
        {post.author.image && (
          <img
            src={post.author.image.asset.url}
            alt={post.author.name}
            className="w-12 h-12 rounded-full"
          />
        )}
        <div>
          <p className="font-medium">{post.author.name}</p>
          <p className="text-gray-500">
            {new Date(post.publishedAt).toLocaleDateString()}
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-2 max-w-none">
        <PortableText value={post.body} />
      </div>
    </article>
  )
}
