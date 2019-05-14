import { db } from './db'

export const findEvents = async (filters) => {
  // Set up path
  let eventsRef = db.collection('events')
  if (filters) {
    eventsRef = !filters.title ? eventsRef : eventsRef.where("title", "==", filters.title)
    eventsRef = !filters.afterStartDate ? eventsRef : eventsRef.where("startDate", ">=", new Date(filters.afterStartDate))
    eventsRef = !filters.beforeStartDate ? eventsRef : eventsRef.where("startDate", "<=", new Date(filters.beforeStartDate))
  }
  //eventsRef.orderBy('startDate', 'asc')
  eventsRef.orderBy('title', 'asc')
  // Find documents
  let querySnapshot = await eventsRef.get()
  // Construct result
  let eventsList = []
  querySnapshot.forEach(doc => {
    let event = doc.data()
    event.startDate = event.startDate.toDate()
    //console.log(event.startDate)
    console.log(event.title)

    event.endDate = event.endDate.toDate()
    eventsList.push(event)
  })
  // Return data
  return eventsList
}

export const getEvent = async eventId => {
  // Read document
  const event = await db.collection('events').doc(eventId).get()
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
