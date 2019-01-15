import { MongoClient, ObjectId } from 'mongodb'
import { eventsDB } from './init/EventsDB'

const url = 'mongodb://localhost:27021/'

const connect = async () => {
	let connection = await MongoClient.connect(
		url,
		{ useNewUrlParser: true }
	)
	let db = connection.db('Events')
	return db
}

export const findEvents = async (query) => {
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
		.find(findRequest).toArray()
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