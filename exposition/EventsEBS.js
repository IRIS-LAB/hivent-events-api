import express from 'express'
import * as eventsLBS from '../business/EventsLBS'

export const getRouter = () => {
  let eventsRouter = express.Router()

  // find
  eventsRouter.get('/', async (req, res) => {
    try {
      res.send(await eventsLBS.findEvents(req.query.groupId, req.query.typeGroup, req.query.beginDate, req.query.endDate, req.query.interestedId, req.query.administratorId, req.query.participantId))
    } catch (error) {
      console.log('An error occured', error)
      res.status(500).send('An error occured')
    }
  })

  // read
  eventsRouter.get('/:eventId', async (req, res) => {
    try {
      res.send(await eventsLBS.getEvent(req.params.eventId))
    } catch (error) {
      console.log('An error occured', error)
      res.status(500).send('An error occured')
    }
  })

  // create
  eventsRouter.post('/', async (req, res) => {
    try {
      res.send(await eventsLBS.createEvent(req.body))
    } catch (error) {
      console.log('An error occured', error)
      res.status(500).send('An error occured')
    }
  })

  // initialisation de la base
  eventsRouter.post('/init', async(req, res) => {
    try {
      res.send(await eventsLBS.init())
    } catch (error) {
      console.log(error)
      
    }
  })

  return eventsRouter
}

