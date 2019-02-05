export class EventBE {
  constructor(
    name,
    description,
    startDate,
    endDate,
    participants,
    administrators,
    interested,
    groupId
  ) {
    this.name = name
    this.description = description
    this.startDate = startDate
    this.endDate = endDate
    this.participants = participants
    this.administrators = administrators
    this.interested = interested
    this.groupId = groupId
  }
  /*
	get name() {
		return this.name
	}

	get description() {
		return this.description
	}

	get startDate() {
		return this.startDate
	}

	get endDate() {
		return this.endDate
	}
	*/
}
