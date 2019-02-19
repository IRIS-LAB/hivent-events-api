import Firestore from '@google-cloud/firestore'

export const db = new Firestore({
  projectId: 'hivent-events-api',
  keyFilename: 'firestore/hivent-events-api-3ce6b304a2c1.json'
})
