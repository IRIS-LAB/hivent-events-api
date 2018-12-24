import * as eventsDAO from '../data/EventsDAO'
import { EventBE } from '../objects/business/be/EventBE';
const MAX_NAME_LENGTH = 100
const MAX_DESCRIPTION_LENGTH = 250

const isDateValide = async input => {
  let regex = RegExp(/^((19|20)[0-9][0-9])[-](0[1-9]|1[012])[-](0[1-9]|[12][0-9]|3[01])[T]([01][1-9]|[2][0-3])[:]([0-5][0-9])[:]([0-5][0-9])([+|-]([01][0-9]|[2][0-3])[:]([0-5][0-9])){0,1}$/)
  if (!regex.test(input)) {
    return false
  } else {
    return true
  } 
}

const checkEventBE = async event => {
  // name
  if (!event.name) {
		throw Error('Le nom est obligatoire')
	} else {
		if (event.name.length > MAX_NAME_LENGTH) {
			throw Error('La longueur du nom ne doit pas dépasser ' + MAX_NAME_LENGTH + ' caractères')
		}
	}
  // description
  if (!event.description) {
    throw Error('La description est obligatoire')
  } else {
    if (event.description.length > MAX_DESCRIPTION_LENGTH) {
      throw Error('La longueur de la description ne doit pas dépasser ' + MAX_DESCRIPTION_LENGTH + ' caractères')
    }
  }
  // startDate
  if (!event.startDate) {
    throw Error('La date debut est obligatoire')
  } else if (! await isDateValide(event.startDate)) {
   // controle dateTime format ! 2018-03-15T18:00:00+03:00
    throw Error('Mauvais type')
  }
  // endDate
  if(!event.endDate){
    throw Error('La date fin est obligatoire')
  } else if (! await isDateValide(event.endDate)){
    throw Error ('Mauvais type')
  }
  
  if(Date.parse(event.startDate) > Date.parse(event.endDate)){
    throw Error('Date debut superieur à date fin')
  }
}


export const findEvents = async (groupId, typeGroup, beginDate, endDate, interestedId, administratorId, participantId) => {
  console.log("LBS participant" , participantId)
  return await eventsDAO.findEvents(groupId, typeGroup, beginDate, endDate, interestedId, administratorId, participantId)
}

export const getEvent = async eventId => {
  return await eventsDAO.getEvent(eventId)
}

export const createEvent = async event => {
  console.log('EventLBS : ' + event)
  await checkEventBE(event)
  return await eventsDAO.createEvent(event)
}

export const init = async () => {
  return await eventsDAO.init()
}