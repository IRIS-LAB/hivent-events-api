import express from 'express'
import * as eventsLBS from '../business/EventsLBS'
import { EventBE } from '../objects/business/be/EventBE'
import * as mappers from './mappers/Mappers'
import {BusinessException } from 'iris-common'

export const getRouter = () => {
  let eventsRouter = express.Router()

  // find
  eventsRouter.get('/', async (req, res) => {
    try {
      res.send(await eventsLBS.findEvents(req.query))
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
      let eventBe = mappers.jsonToEventBE(req.body)
      console.log(typeof(eventBe))
      res.send(await eventsLBS.createEvent(eventBe))
    } catch (error) {
      console.log('An error occured', error)
      if(error instanceof BusinessException) {
				res.status(400).send(error)
			} else {
			res.status(500).send('An error occured')
			}
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

