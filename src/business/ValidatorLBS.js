import Joi from 'joi'
import { BusinessException, ErreurDO } from '@u-iris/iris-common'

import eventSchema from '../schemas/event'

export const checkEvent = event => {
  const { error, value } = Joi.validate(event, eventSchema, { abortEarly: false })
  if (error) {
    const errors = error.details.map(({ message, path, type }) => {
      const field = path.join('.')
      return new ErreurDO(field, type, message.replace(/\"/g, ""))
    })
    throw new BusinessException(errors)
  }
  return value
}
