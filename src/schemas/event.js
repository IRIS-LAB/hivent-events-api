import JoiBase from 'joi'
import JoiDateExtension from 'joi-date-extensions'
import participant from './participant'

const Joi = JoiBase.extend(JoiDateExtension)

const MAX_TITLE_LENGTH = 10
const MAX_DESCRIPTION_LENGTH = 100

export default Joi.object().keys({
  id: Joi.optional(),
  title: Joi.string()
    .max(MAX_TITLE_LENGTH)
    .required(),
  description: Joi.string()
    // .email()
    .max(MAX_DESCRIPTION_LENGTH)
    //.min(10)
    .required(),
  startDate: Joi.date()
    .format('YYYY-MM-DDTHH:mm:ss.SSSZ')
    .required(),
  endDate: Joi.date()
    .format('YYYY-MM-DDTHH:mm:ss.SSSZ')
    .greater(Joi.ref('startDate'))
    .required(),
  administratorIds: Joi.array()
    .items(Joi.string().email())
    .min(1)
    .required(),
  speakerIds: Joi.array().items(Joi.string().email()),
  maxSeatsNb: Joi.number()
    .integer()
    .positive()
    .required(),
  participants: Joi.array()
    .items(participant)
    .default([]),
  imageURL: Joi.string().default('https://picsum.photos/400/300?image=1069'),
  roomId: Joi.string().default('irisLab'),
  isDrawDone: Joi.boolean().default(false)
})
