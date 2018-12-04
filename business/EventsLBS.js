import * as eventsDAO from '../data/EventsDAO'

export const findEvents = async (groupId, typeGroup, beginDate, endDate, interestedId, administratorId, participantId) => {
  console.log("LBS participant" , participantId)
  return await eventsDAO.findEvents(groupId, typeGroup, beginDate, endDate, interestedId, administratorId, participantId)
}

export const getEvent = async eventId => {
  return await eventsDAO.getEvent(eventId)
}

export const createEvent = async event => {
  return await eventsDAO.createEvent(event)
}

export const init = async () => {
  return await eventsDAO.init()
}