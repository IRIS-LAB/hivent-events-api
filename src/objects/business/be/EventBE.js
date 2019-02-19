export class EventBE {
  constructor(
    title,
    description,
    startDate,
    endDate,
    administratorIds,
    speakerIds,    
    maxSeatsNb,
    roomId
  ) {
    this.id = undefined
    this.title = title
    this.description = description
    this.startDate = startDate
    this.endDate = endDate
    this.administratorIds = administratorIds // array of ids
    this.speakerIds = speakerIds // array of ids
    this.maxSeatsNb = maxSeatsNb
    this.participants = [] // array of ParticipantBE
    this.roomId = roomId || 'irisLab'
    this.isDrawDone = false
  }
}
