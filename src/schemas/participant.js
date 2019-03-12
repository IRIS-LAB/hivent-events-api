import Joi from 'joi'

export default Joi.object().keys({
  userId: Joi.string().email().required(),
  isConfirmed: Joi.boolean().default(false)
})
