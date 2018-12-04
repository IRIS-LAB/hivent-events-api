import { MongoClient, ObjectId } from 'mongodb'
import {eventsDB} from './init/EventsDB'

const url = 'mongodb://localhost:27017/'

const connect = async () => {
	let connection = await MongoClient.connect(
		url,
		{ useNewUrlParser: true }
	)
	let db = connection.db('Events')
	return db
}

export const findEvents = async (
	groupId,
	typeGroup,
	beginDate,
	endDate,
	interestedId,
	administratorId,
	participantId
) => {
  let eventsDB = await connect()
  console.log("participant :",participantId)
  console.log(typeof(participantId))
	let events = await eventsDB
		.collection('Events')
		.find({"participants.id": parseInt(participantId)}).toArray()
  console.log(events)
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

export const init = async () => {
  let db = await connect()
  //await db.collection('Events').drop()
	let newEvents = await db.collection('Events').insertMany(eventsDB)
	return newEvents.ops
}
