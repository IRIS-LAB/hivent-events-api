import {MongoClient, ObjectId} from 'mongodb'

const url = 'mongodb://localhost:27021/'

const connect = async () => {
  let connection = await MongoClient.connect(
    url,
    { useNewUrlParser: true }
  )
  let db = connection.db('Events')
  return db 
}

export const findEvents = async () => {
  let eventsDB = await connect()
  let events = await eventsDB.collection('Events').find().toArray()
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

export const createEvent = async event => {
  let eventsDB = await connect()
  let newEvent = await eventsDB.collection('Events').insertOne(event)
  //eventsDB.connection.close()
  return newEvent.ops[0]
}
