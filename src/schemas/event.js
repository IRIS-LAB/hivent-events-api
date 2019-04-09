import JoiBase from 'joi'
import JoiDateExtension from 'joi-date-extensions'
import participant from './participant'

const Joi = JoiBase.extend(JoiDateExtension)

const MAX_TITLE_LENGTH = 100
const MAX_DESCRIPTION_LENGTH = 250

export default Joi.object().keys({
  id: Joi.optional(),
  title: Joi.string().max(MAX_TITLE_LENGTH).required(),
  description: Joi.string().max(MAX_DESCRIPTION_LENGTH).required(),
  startDate: Joi.date().format("YYYY-MM-DDTHH:mm:ss.SSSZ").required(),
  endDate: Joi.date().format("YYYY-MM-DDTHH:mm:ss.SSSZ").greater(Joi.ref('startDate')).required(),
  administratorIds: Joi.array().items(Joi.string().email()).min(1).required(),
  speakerIds: Joi.array().items(Joi.string().email()).min(1).required(),
  maxSeatsNb: Joi.number().integer().positive().required(),
  participants: Joi.array().items(participant).default([]),
  roomId: Joi.string().default('irisLab'),
  isDrawDone: Joi.boolean().default(false)
})