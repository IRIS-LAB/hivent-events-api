import * as eventsDAO from '../data/EventsDAO'
import { EventBE } from '../objects/business/be/EventBE'
import {BusinessException ,ErrorDO} from 'iris-elements'
import * as validatorLBS from './ValidatorLBS'
// import * as moment from 'moment'



export const findEvents = async (groupId, typeGroup, beginDate, endDate, interestedId, administratorId, participantId) => {
  console.log("LBS participant" , participantId)
  return await eventsDAO.findEvents(groupId, typeGroup, beginDate, endDate, interestedId, administratorId, participantId)
}

export const getEvent = async eventId => {
  return await eventsDAO.getEvent(eventId)
}

export const createEvent = async event => {
  console.log('EventLBS : ' + event)
  let errors = await validatorLBS.checkEventBE(event)
  if (errors.length > 0) {
		throw new BusinessException(errors)
	}
  return await eventsDAO.createEvent(event)
}

export const init = async () => {
  return await eventsDAO.init()
}