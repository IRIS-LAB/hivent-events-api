export class EventBE {
	constructor(name, description, startDate, endDate) {
		this._name = name
		this._description = description
		this._startDate = startDate
		this._endDate = endDate
	}

	get name() {
		return this._name
	}

	get description() {
		return this._description
	}

	get startDate() {
		return this._startDate
	}

	get endDate() {
		return this._endDate
	}
}