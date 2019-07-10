import Joi from 'joi'
import { BusinessException, ErreurDO } from '@u-iris/iris-common'

import eventSchema from '../schemas/event'

export const checkEvent = event => {
  const { error, value } = Joi.validate(event, eventSchema, { abortEarly: false })

  let errors = undefined
  if (error) {
    console.log('error joy ', error)
    errors = error.details.map(({ message, path, type, context }) => {
      const field = path.join('.')
      if (context.limit) return new ErreurDO(field, type + '(' + context.limit + ')', message.replace(/\"/g, ''))
      else return new ErreurDO(field, type, message.replace(/\"/g, ''))
    })
    throw new BusinessException(errors)
  }
  return value
}
