import { EventBE } from '../../object/EventBE'

exports.jsonToEventBE = json => {
    return new EventBE(json.name, json.description , json.startDate , json.endDate)
}