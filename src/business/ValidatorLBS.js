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
      endDate: Joi.date().format("YYYY-MM-DDTHH:mm:ss.SSSZ").greater(Joi.ref('startDate')).required(),
      administratorIds: Joi.array().min(1).required(), // array of ids
      speakerIds: Joi.array().min(1).required(), // array of ids
      maxSeatsNb: Joi.number().integer().positive().required(),
      participants: Joi.array().default([]), // array of ParticipantBE
      roomId: Joi.string().default('irisLab'),
      isDrawDone: Joi.boolean().default(false)
    })
  }
}

export const checkEvent = event => {
  const { error, value } = Joi.validate(event, JoiValidator().Event, { abortEarly: false })
  if (error) {
    const errors = error.details.map(({ message, context, type }) => {
      const field = context.key
      return new ErrorDO(field, `${field}.${type}`, message.replace(/\"/g, ""))
    })
    throw new BusinessException(errors)
  }
  return value
}
