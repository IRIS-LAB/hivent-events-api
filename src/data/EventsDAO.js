import { db } from './db'

export const createEvent = async eventBE => {
  // Construct event
  let event = JSON.parse(JSON.stringify(eventBE))
  // Set up path
  let doc = db.collection('events').doc()
  event.id = doc.id
  // Create document
  await doc.set(event)
  // Return data
  return event
}

import { MongoClient, ObjectId } from 'mongodb'
import { TechnicalException } from 'iris-common'

const url = 'mongodb://localhost:27021/'

const connect = async () => {
  let connection = await MongoClient.connect(
    url,
    { useNewUrlParser: true }
  )
  let db = connection.db('Events')
  return db
}

export const findEvents = async query => {
  let eventsDB = await connect()
  let findRequest = {}
  if (query.groupId !== undefined) {
    findRequest.groupId = parseInt(groupId)
  }
  if (query.groupId !== undefined) {
    findRequest.groupId = parseInt(groupId)
  }
  if (query.beginDate !== undefined) {
    findRequest.startDate = {}
    findRequest.startDate.$gte = new Date(beginDate)
  }
  if (query.endDate !== undefined) {
    if (!findRequest.startDate) {
      findRequest.startDate = {}
    }
    findRequest.startDate.$lte = new Date(endDate)
  }
  if (query.interestedId !== undefined) {
    if (!findRequest.interested) {
      findRequest.interested = {}
    }
    findRequest.interested.id = parseInt(interestedId)
  }
  if (query.administratorId !== undefined) {
    if (!findRequest.administrators) {
      findRequest.administrators = {}
    }
    findRequest.administrators.id = parseInt(administratorId)
  }
  if (query.participantId !== undefined) {
    if (!findRequest.participants) {
      findRequest.participants = {}
    }
    findRequest.participants.id = parseInt(participantId)
  }
  let events = await eventsDB
    .collection('Events')
    .find(findRequest)
    .toArray()
  // eventsDB.connection.close()
  return events
}

export const getEvent = async eventId => {
  let eventsDB = await connect()
  let oid = new ObjectId(eventId)
  let event = await eventsDB.collection('Events').findOne({ _id: oid })
  //eventsDB.connection.close()
  return event
}

export const updateEvent = async event => {
  let eventsDB = await connect()
  let response
  try {
    response = await eventsDB
      .collection('Events')
      .updateOne({ id: event.id }, { $set: event })
    /*console.log(JSON.stringify(response))*/
  } catch (error) {
    throw new TechnicalException(error)
  }
  console.log(response)
  console.log(response.ok)
  if (1 === response.ok) {
    return event.id
  } else {
    console.log(response.ok)
    throw new TechnicalException('Response not ok, code : ' + response.ok)
  }
}
