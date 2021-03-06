import { EventBE } from '../../objects/business/be/EventBE'

exports.jsonToEventBE = json => {
  return new EventBE(
    json.name,
    json.description,
    json.startDate,
    json.endDate,
    json.participants,
    json.administrators,
    json.interested,
    json.groupId
  )
}
