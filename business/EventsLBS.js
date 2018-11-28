import * as eventsDAO from '../data/EventsDAO'

export const findEvents = async (groupId, typeGroup, beginDate, endDate, idUser, interestedId, administratorId, participantId) => {
  return await eventsDAO.findEvents(groupId, typeGroup, beginDate, endDate, idUser, interestedId, administratorId, participantId)
}

export const getEvent = async eventId => {
  return await eventsDAO.getEvent(eventId)
}

export const createEvent = async event => {
  return await eventsDAO.createEvent(event)
}
