export class EventBE {
	constructor(name, description, startDate, endDate) {
		this.name = name
		this.description = description
		this.startDate = startDate
		this.endDate = endDate
	}

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
}