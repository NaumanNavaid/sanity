// lib/client.ts
import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-12-01', // Use the latest version of the Sanity API
  useCdn: process.env.NODE_ENV === 'production', // Use CDN for better performance in production
})
