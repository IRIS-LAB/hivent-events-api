import express from 'express'
import bodyParser from 'body-parser'
import * as eventsEBS from './src/exposition/EventsEBS'
import * as actuatorEBS from './src/exposition/ActuatorEBS'
import { Logger, expressUtils } from '@u-iris/iris-back'
import dotenv from 'dotenv'

dotenv.config()
const app = express()
const port = process.env.PORT || 8082

const logger = Logger.create(process.env.LOGLEVEL, process.env.LOGFILENAME)

app.listen(port, () => {
  logger.debug(`http://localhost:${port}`)
})

const utils = expressUtils(logger)
// Pour récupérer body des requêtes
app.use(utils.enableCors)
app.use(bodyParser.json({ limit: '800kb' }))
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/events', eventsEBS.getRouter())
app.use('/actuator', actuatorEBS.getRouter())

app.use(utils.errorHandler)
