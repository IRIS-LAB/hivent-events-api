import JoiBase from 'joi'
import { BusinessException, ErrorDO } from 'iris-common'
import JoiDateExtension from 'joi-date-extensions'

const MAX_TITLE_LENGTH = 100
const MAX_DESCRIPTION_LENGTH = 250

const Joi = JoiBase.extend(JoiDateExtension)

const JoiValidator = () => {
  return {
    Event: Joi.object().keys({
      id: Joi.optional(),
      title: Joi.string().max(MAX_TITLE_LENGTH).required(),
      description: Joi.string().max(MAX_DESCRIPTION_LENGTH).required(),
      startDate: Joi.date().format("YYYY-MM-DDTHH:mm:ss.SSSZ").required(),
      endDate: Joi.date().format("YYYY-MM-DDTHH:mm:ss.SSSZ").required(),
      administratorIds: Joi.required(), // array of ids
      speakerIds: Joi.required(), // array of ids
      maxSeatsNb: Joi.required(),
      participants: Joi.default([]), // array of ParticipantBE
      roomId: Joi.default('irisLab'),
      isDrawDone: Joi.default(false)
    })
  }
}
// const checkTypeDate = date => {
//   return moment(date, 'YYYY-MM-DDTHH:mm:ss.SSSZ', true).isValid()
// }

export const checkEventBE = event => {
  const { error } = Joi.validate(event, JoiValidator().Event, { abortEarly: false })
  if (error) {
    error.details.map((o) => console.log(o))
    const errors = error.details.map(({ message, context, type }) => {
      const field = context.key
      return new ErrorDO(field, `${field}.${type}`, message.replace(/\"/g, ""))
    })
    throw new BusinessException(errors)
  }
}

export const checkName = event => {
  let errors = []
  // name
  if (!event.name) {
    errors.push(
      new ErrorDO('name', 'event.name.required', 'Le nom est obligatoire')
    )
  } else {
    if (event.name.length > MAX_NAME_LENGTH) {
      errors.push(
        new ErrorDO(
          'name',
          'event.name.length',
          'La longueur du nom ne doit pas dépasser ' +
            MAX_NAME_LENGTH +
            ' caractères'
        )
      )
    }
  }
  return errors
}

export const checkDescription = event => {
  let errors = []
  if (!event.description) {
    errors.push(
      new ErrorDO(
        'description',
        'event.description.required',
        'La description est obligatoire'
      )
    )
  } else {
    if (event.description.length > MAX_DESCRIPTION_LENGTH) {
      errors.push(
        new ErrorDO(
          'description',
          'event.description.length',
          'La longueur de la description ne doit pas dépasser ' +
            MAX_DESCRIPTION_LENGTH +
            ' caractères'
        )
      )
    }
  }
  return errors
}

export const checkStartDate = event => {
  let errors = []
  if (!event.startDate) {
    errors.push(
      new ErrorDO(
        'startDate',
        'event.startDate.required',
        'La date debut est obligatoire'
      )
    )
  } else if (!checkTypeDate(event.startDate)) {
    // controle dateTime format ! 2018-03-15T18:00:00+03:00
    errors.push(new ErrorDO('startDate', 'event.startDate.type', 'Bad type'))
  }
  return errors
}

export const checkEndDate = event => {
  let errors = []
  if (!event.endDate) {
    errors.push(
      new ErrorDO(
        'endDate',
        'event.endDate.required',
        'La date fin est obligatoire'
      )
    )
  } else if (!checkTypeDate(event.endDate)) {
    errors.push(new ErrorDO('endDate', 'event.endDate.type', 'Bad type'))
  }
  return errors
}

export const checkStartDateBeforeEndDate = event => {
  let errors = []
  const errorsDate = [...checkStartDate(event), ...checkEndDate(event)]
  if (errorsDate.length === 0) {
    if (Date.parse(event.startDate) >= Date.parse(event.endDate)) {
      errors.push(
        new ErrorDO(
          'date',
          'event.date',
          'Start date should be strictly before end date.'
        )
      )
    }
  }
  return errors
}

export const checkAdministrator = event => {
  let errors = []

  let hasAdministrator =
    event.administrators &&
    Array.isArray(event.administrators) &&
    event.administrators.length > 0

  if (!hasAdministrator) {
    errors.push(
      new ErrorDO(
        'administrators',
        'event.administrators',
        'Administrators mandatory.'
      )
    )
  }
  return errors
}
