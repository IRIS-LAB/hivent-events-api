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

export const deleteAllEvents = async () => {
  let events = await eventsDAO.findEvents({ size: 999999, page: 0 })
  events.forEach(e => eventsDAO.deleteEvent(e.id))
}

export const uploadImage = async (eventId, imageEvent) => {
  await eventsDAO.uploadImage(eventId, imageEvent)
  const event = await getEvent(eventId)
  event.imageURL = `${process.env.GS_EVENTS_IMAGES}${eventId}.${imageEvent.format}`
  return updateEvent(event, eventId)
}

export const countEvents = async () => await eventsDAO.countEvents()
