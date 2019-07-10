import * as eventsDAO from '../data/EventsDAO'
import * as validatorLBS from './ValidatorLBS'

export const findEvents = async query => {
  return await eventsDAO.findEvents(query)
}

export const getEvent = async eventId => {
  return await eventsDAO.getEvent(eventId)
}

export const createEvent = async event => {
  event = validatorLBS.checkEvent(event)
  const id = await eventsDAO.createEvent(event)
  return await getEvent(id)
}

export const updateEvent = async (event, id) => {
  event.id = id
  await validatorLBS.checkEvent(event)
  await eventsDAO.updateEvent(event)
  return await getEvent(event.id)
}

export const deleteEvent = async id => {
  await eventsDAO.deleteEvent(id)
}

export const uploadImage = async imageEvent => {
  await eventsDAO.uploadImage(imageEvent)
}

export const countEvents = async () => await eventsDAO.countEvents()
