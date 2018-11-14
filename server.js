import express from 'express'
import bodyParser from 'body-parser'
import * as eventsEBS from './exposition/EventsEBS'
import * as actuatorEBS from './exposition/ActuatorEBS'

const app = express()
const port = process.env.PORT || 8080

app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})

// Pour récupérer body des requêtes
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/events', eventsEBS.getRouter())
app.use('/actuator', actuatorEBS.getRouter())
