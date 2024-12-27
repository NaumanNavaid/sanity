import { defineCliConfig } from 'sanity/cli'
import { config } from 'dotenv'

// Load environment variables from the .env file
config()

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET

if (!projectId || !dataset) {
  throw new Error("Missing required environment variables: NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET")
}

// Log the environment variables to confirm they're being loaded
console.log('Project ID:', projectId)
console.log('Dataset:', dataset)

export default defineCliConfig({
  api: { projectId, dataset },
})
