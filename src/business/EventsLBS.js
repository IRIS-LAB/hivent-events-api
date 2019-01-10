import * as eventsDAO from '../data/EventsDAO'
import { EventBE } from '../objects/business/be/EventBE'
import {BusinessException ,ErrorDO} from 'iris-elements'
import * as validatorLBS from './ValidatorLBS'
// import * as moment from 'moment'



export const findEvents = async (query) => {
  console.log("LBS participant" , participantId)
  return await eventsDAO.findEvents(query)
}

export const getEvent = async eventId => {
  return await eventsDAO.getEvent(eventId)
}

export const createEvent = async event => {
  console.log('EventLBS : ' + event)
  try {
    await validatorLBS.checkEventBE(event)
    return await eventsDAO.createEvent(event)
  } catch (error) {
    throw error
  }
  
}

export const init = async () => {
  return await eventsDAO.init()
}