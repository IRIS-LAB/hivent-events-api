import * as eventsDAO from '../data/EventsDAO'
import { EventBE } from '../objects/business/be/EventBE';
const MAX_NAME_LENGTH = 100
const MAX_DESCRIPTION_LENGTH = 250

function isDateValide(input) {
  let regex = /^(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))$/
  if (!regex.test(input)) {
    return false
  } else {
    return false
  } 
}

const checkEventBE = EventBE => {
  // name
  if (!EventBE.name) {
		throw Error('Le nom est obligatoire')
	} else {
		if (EventBE.name.length > MAX_NAME_LENGTH) {
			throw Error('La longueur du nom ne doit pas dépasser ' + MAX_NAME_LENGTH + ' caractères')
		}
	}
  // description
  if (!EventBE.description) {
    throw Error('La description est obligatoire')
  } else {
    if (EventBE.description.length > MAX_DESCRIPTION_LENGTH) {
      throw Error('La longueur de la description ne doit pas dépasser ' + MAX_DESCRIPTION_LENGTH + ' caractères')
    }
  }
  // startDate
  if (!EventBE.startDate) {
    throw Error('La date est obligatoire')
  } else {
   // controle dateTime format ! 2018-03-15T18:00:00+03:00
   

  }
  // endDate


}




export const findEvents = async (groupId, typeGroup, beginDate, endDate, interestedId, administratorId, participantId) => {
  console.log("LBS participant" , participantId)
  return await eventsDAO.findEvents(groupId, typeGroup, beginDate, endDate, interestedId, administratorId, participantId)
}

export const getEvent = async eventId => {
  return await eventsDAO.getEvent(eventId)
}

export const createEvent = async event => {
  console.log('EventLBS : ' + EventBE)
  checkEventBE(EventBE)
  return await eventsDAO.createEvent(event)
}

export const init = async () => {
  return await eventsDAO.init()
}