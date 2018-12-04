import express from 'express'
import * as eventsLBS from '../business/EventsLBS'

export const getRouter = () => {
  let eventsRouter = express.Router()

  eventsRouter.get('/', async (req, res) => {
    try {
      //    for (const key in req.query) {
      //      console.log(key, req.query[key])
      //    }
      console.log(req.query.groupId)
      console.log(req.query.typeGroup)
      console.log(req.query.beginDate)
      console.log(req.query.endDate)
      console.log(req.query.idUser)
      console.log(req.query.interestedId)
      console.log(req.query.administratorId)
      console.log(req.query.participantId)

      res.send(await eventsLBS.findEvents(req.query.groupId, req.query.typeGroup, req.query.beginDate, req.query.endDate, req.query.interestedId, req.query.administratorId, req.query.participantId))
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

  eventsRouter.post('/init', async(req, res) => {
    try {
      res.send(await eventsLBS.init())
    } catch (error) {
      console.log(error)
      
    }
  })

  return eventsRouter
}

