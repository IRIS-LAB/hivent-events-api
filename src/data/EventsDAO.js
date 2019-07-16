import { db } from './db'
import { storage } from './bucket'
import stream from 'stream'
import fs from 'fs'

const BUCKET_HIVENT_EVENTS_IMAGES = 'hivent-events-images'

export const findEvents = async filters => {
  // order by

  let eventsRef = db
    .collection('events')
    .orderBy('startDate')
    .limit(filters.size)
    .offset(filters.size * filters.page)

  // where
  if (filters) {
    eventsRef = !filters.title ? eventsRef : eventsRef.where('title', '==', filters.title)
    eventsRef = !filters.afterStartDate ? eventsRef : eventsRef.where('startDate', '>=', new Date(filters.afterStartDate))
    eventsRef = !filters.beforeStartDate ? eventsRef : eventsRef.where('startDate', '<=', new Date(filters.beforeStartDate))
  }

  // Find documents
  let querySnapshot = await eventsRef.get()
  // Construct result
  let eventsList = []
  querySnapshot.forEach(doc => {
    let event = doc.data()
    event.startDate = event.startDate.toDate()

    event.endDate = event.endDate.toDate()
    eventsList.push(event)
  })
  // Return data
  return eventsList
}

export const getEvent = async eventId => {
  // Read document
  const event = await db
    .collection('events')
    .doc(eventId)
    .get()
  // Return data
  let result = event.data()
  result.startDate = result.startDate.toDate()
  result.endDate = result.endDate.toDate()
  return result
}

export const createEvent = async event => {
  // Set up path
  let doc = db.collection('events').doc()
  event.id = doc.id
  // Create document
  await doc.set(event)
  // Return data
  return event.id
}

export const updateEvent = async event => {
  let doc = db.collection('events').doc(event.id)
  await doc.set(event)
}

export const deleteEvent = async id => {
  let doc = db.collection('events').doc(id)
  await doc.delete()
}

const deleteFile = filename => {
  if (fs.existsSync(filename)) {
    fs.unlinkSync(filename)
  }
}

const saveLocalImage = (eventId, format, imageFormatBase64) => {
  const filename = `${eventId}.${format}`
  deleteFile(filename)
  fs.writeFileSync(filename, new Buffer(imageFormatBase64, 'base64'))
  return filename
}

export const uploadImage = async (eventId, imageEvent) => {
  const filename = saveLocalImage(eventId, imageEvent.format, imageEvent.image)
  const bucketEvent = storage.bucket(BUCKET_HIVENT_EVENTS_IMAGES)
  const result = await bucketEvent.upload(filename)
  deleteFile(filename)
  await bucketEvent.file(filename).makePublic()
}

export const countEvents = async () => (await db.collection('events').get()).size
