import { Storage } from '@google-cloud/storage'

const GOOGLE_CLOUD_PROJECT_ID = 'hivent-events-api'
const GOOGLE_CLOUD_KEYFILE = 'bucket/hivent-events-api-5d6d9fcaad09.json'

export const storage = new Storage({
  projectId: GOOGLE_CLOUD_PROJECT_ID,
  keyFilename: GOOGLE_CLOUD_KEYFILE
})
