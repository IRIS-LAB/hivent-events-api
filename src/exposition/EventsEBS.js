import express from 'express'
import * as eventsLBS from '../business/EventsLBS'
import { paginationUtilsEBS } from '@u-iris/iris-back'

const PAGINATION_EVENTS_DEFAULT_SIZE = 20
const PAGINATION_EVENTS_MAX_SIZE = 999999999999999999
const PAGINATION_EVENTS_TYPE = 'event'

export const getRouter = () => {
  let eventsRouter = express.Router()

  // find
  eventsRouter.get('/', async (req, res, next) => {
    try {
      paginationUtilsEBS.checkPagination(req.query, PAGINATION_EVENTS_MAX_SIZE, PAGINATION_EVENTS_DEFAULT_SIZE)
      const events = await eventsLBS.findEvents(req.query)
      const eventsCount = await eventsLBS.countEvents()
      paginationUtilsEBS.generateResponse(PAGINATION_EVENTS_TYPE, PAGINATION_EVENTS_MAX_SIZE, eventsCount, events.length, req, res)
      res.send(events)
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

  // create image
  eventsRouter.put('/:eventId/image', async (req, res, next) => {
    try {
      res.status(200).send(await eventsLBS.uploadImage(req.params.eventId, req.body))
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

  eventsRouter.delete('/:id', async (req, res, next) => {
    try {
      res.status(204).send(await eventsLBS.deleteEvent(req.params.id))
    } catch (error) {
      return next(error)
    }
  })

  eventsRouter.delete('/', async (req, res, next) => {
    try {
      res.status(204).send(await eventsLBS.deleteAllEvents())
    } catch (error) {
      return next(error)
    }
  })

  return eventsRouter
}
