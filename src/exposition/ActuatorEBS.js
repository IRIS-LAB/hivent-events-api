import express from 'express'

export const getRouter = () => {
  let actuatorRouter = express.Router()

  actuatorRouter.get('/health', async (req, res, next) => {
    try {
      res.json({ "status" : "UP" })
    } catch (error) {
      return next(error)
    }
  })

  return actuatorRouter
}