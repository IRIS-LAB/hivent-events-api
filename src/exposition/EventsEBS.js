import express from 'express'
import * as eventsLBS from '../business/EventsLBS'

export const getRouter = () => {
  let eventsRouter = express.Router()

  // find
  eventsRouter.get('/', async (req, res, next) => {
    try {
      res.send(await eventsLBS.findEvents(req.query))
    } catch (error) {
      return next(error)
    }
  })

  // read
  eventsRouter.get('/:eventId', async (req, res, next) => {
    try {
      res.send(await eventsLBS.getEvent(req.params.eventId))
    } catch (error) {
      return next(error)
    }
  })

  // create
  eventsRouter.post('/', async (req, res, next) => {
    try {
      res.status(201).send(await eventsLBS.createEvent(req.body))
    } catch (error) {
      return next(error)
    }
  })

  // update
  eventsRouter.put('/:id', async (req, res, next) => {
    try {
      res.send(await eventsLBS.updateEvent(req.body, req.params.id))
    } catch (error) {
      return next(error)
    }
  })
  
  eventsRouter.delete('/:id', async(req,res, next) => {
    try {
      res.status(204).send(await eventsLBS.deleteEvent(req.params.id))
    } catch (error) {
      return next(error)
    }
  })

  return eventsRouter
}
