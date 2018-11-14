import express from 'express'
import * as eventsLBS from '../business/EventsLBS'

export const  getRouter = () => {
  let eventsRouter = express.Router()

  eventsRouter.get('/', async (req, res) => {
    try {
      res.send(await eventsLBS.findEvents())
    } catch (error) {
      console.log('An error occured', error)
      res.status(500).send('An error occured')
    }
  })

  eventsRouter.get('/:eventId', async (req, res) => {
    try {
      res.send(await eventsLBS.getEvent(req.params.eventId))
    } catch (error) {
      console.log('An error occured', error)
      res.status(500).send('An error occured')
    }
  })

  eventsRouter.post('/', async (req, res) => {
    try {
      res.send(await eventsLBS.createEvent(req.body))
    } catch (error) {
      console.log('An error occured', error)
      res.status(500).send('An error occured')
    }
  })

  return eventsRouter
}

