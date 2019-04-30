import * as eventsDAO from '../data/EventsDAO'
import * as validatorLBS from './ValidatorLBS'

export const findEvents = async query => {
  return await eventsDAO.findEvents(query)
}

export const getEvent = async eventId => {
  return await eventsDAO.getEvent(eventId)
}

export const createEvent = async event => {
  try {
    event = validatorLBS.checkEvent(event)
    const id = await eventsDAO.createEvent(event)
    return await getEvent(id)
  } catch (error) {
    throw error
  }
}

export const updateEvent = async (event, id) => {
  try {
    event.id = id
    await validatorLBS.checkEvent(event)
    await eventsDAO.updateEvent(event)
    return await getEvent(event.id)
  } catch (error) {
    throw error
  }
}

export const deleteEvent = async id => {
  try {
    await eventsDAO.deleteEvent(id)
  } catch (error) {
    throw error
  }
}
