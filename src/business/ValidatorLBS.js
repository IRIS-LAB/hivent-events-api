var moment = require('moment'); 

const MAX_NAME_LENGTH = 100
const MAX_DESCRIPTION_LENGTH = 250

const checkTypeDate = async (date) => {
  return moment(date, moment.HTML5_FMT.DATETIME_LOCAL_MS, true).isValid()
}

export const checkEventBE = async event => {
    let errors = [... checkName(event), ... checkDescription(event), ... checkStartDate(event), ...checkEndDate(event), ...checkStartDate(event) ]
    return errors
}

export const checkName = async (event) => {
    let errors = []
      // name
    if (!event.name) {
        errors.push(new ErrorDO('name', 'event.name.required', 'Le nom est obligatoire'))
    } else {
        if (event.name.length > MAX_NAME_LENGTH) {
        errors.push(new ErrorDO('name', 'event.name.length','La longueur du nom ne doit pas dépasser ' + MAX_NAME_LENGTH + ' caractères'))
        }
    }
    return errors

}

export const checkDescription = async (event) => {
    let errors = []
    if (!event.description) {
        errors.push( new ErrorDO('description', 'event.description.required', 'La description est obligatoire'))
      } else {
        if (event.description.length > MAX_DESCRIPTION_LENGTH) {
          errors.push(new ErrorDO('description', 'event.description.length','La longueur de la description ne doit pas dépasser ' + MAX_DESCRIPTION_LENGTH + ' caractères'))
        }
    }
    return errors
}

export const checkStartDate = async (event) => {
    let errors = []
    if (!event.startDate) {
        errors.push(new ErrorDO('startDate', 'event.startDate.required', 'La date debut est obligatoire'))
    } else if (! await checkTypeDate(event.startDate)) {
       // controle dateTime format ! 2018-03-15T18:00:00+03:00
        errors.push(new ErrorDO('startDate', 'event.startDate.type', 'Bad type'))
    }
    return errors
}

export const checkEndDate = async (event) => {
    if(!event.endDate){
        errors.push(new ErrorDO('endDate', 'event.endDate.required', 'La date fin est obligatoire'))
    } else if (! await checkTypeDate(event.endDate)){
        errors.push(new ErrorDO('endDate', 'event.endDate.type', 'Bad type'))
    }
}

export const checkStartDateLessThanEndDate = async (event) => {
    let errors = []
    const errorsDate = [... checkStartDate(event) , ... checkEndDate(event)]
    if(errorsDate.length === 0 ){
        if(Date.parse(event.startDate) > Date.parse(event.endDate)){
            errors.push(new ErrorDO('date', 'event.date', 'Date debut sup à date fin'))
        } 
    }
    return errors
}
