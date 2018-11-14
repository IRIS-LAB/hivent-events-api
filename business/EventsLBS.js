import * as eventsDAO from '../data/EventsDAO'

export const findEvents = async () => {
  return await eventsDAO.findEvents()
}

export const getEvent = async eventId => {
  return await eventsDAO.getEvent(eventId)
}

export const createEvent = async event => {
  return await eventsDAO.createEvent(event)
}
