import express from 'express'

export const getRouter = () => {
  let actuatorRouter = express.Router()

  actuatorRouter.get('/health', async (req, res) => {
    try {
      res.json({ "status" : "UP" })
    } catch (error) {
      console.log('An error occured', error)
      res.status(500).send('An error occured')
    }
  })

  return actuatorRouter
}