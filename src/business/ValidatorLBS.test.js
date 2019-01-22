import {
  checkEventBE,
  checkName,
  checkDescription,
  checkStartDate,
  checkEndDate,
  checkStartDateBeforeEndDate
} from './ValidatorLBS'
import { EventBE } from '../objects/business/be/EventBE'
import { BusinessException } from 'iris-common'

describe('ValidatorLBS', () => {
  describe('checkEventBE', () => {
    it('Should NOT throw an exception when event is valid', () => {
      let eventBE = new EventBE(
        'name',
        'description',
        '2018-11-04T09:00:00.000+01:00',
        '2018-11-04T10:00:00.000+01:00'
      )
      let err = () => {
        checkEventBE(eventBE)
      }
      expect(err).not.toThrow()
    })

    it('Should throw an exception when event is invalid', () => {
      let eventBE = new EventBE(null, null, null, null)
      let err = () => {
        checkEventBE(eventBE)
      }
      expect(err).toThrow(BusinessException)
    })
  })

  describe('checkName', () => {
    it('Should be valid', () => {
      const eventBE = new EventBE('name', null, null, null)
      const errors = checkName(eventBE)
      expect(errors).toHaveLength(0)
    })

    it('Should retun an error about field required', () => {
      const eventBE = new EventBE(undefined, null, null, null)
      const errors = checkName(eventBE)
      expect(errors).toHaveLength(1)
      expect(errors[0].errorField).toBe('name')
      expect(errors[0].errorCode).toBe('event.name.required')
    })

    it('Should retun an error about field required', () => {
      const eventBE = new EventBE(null, null, null, null)
      const errors = checkName(eventBE)
      expect(errors).toHaveLength(1)
      expect(errors[0].errorField).toBe('name')
      expect(errors[0].errorCode).toBe('event.name.required')
    })

    it('Should retun an error about field required', () => {
      const eventBE = new EventBE('', null, null, null)
      const errors = checkName(eventBE)
      expect(errors).toHaveLength(1)
      expect(errors[0].errorField).toBe('name')
      expect(errors[0].errorCode).toBe('event.name.required')
    })

    it('Should retun an error about field required', () => {
      const eventBE = new EventBE(0, null, null, null)
      const errors = checkName(eventBE)
      expect(errors).toHaveLength(1)
      expect(errors[0].errorField).toBe('name')
      expect(errors[0].errorCode).toBe('event.name.required')
    })

    it('Should retun an error about field too long', () => {
      const eventBE = new EventBE('1'.repeat(101), null, null, null)
      const errors = checkName(eventBE)
      expect(errors).toHaveLength(1)
      expect(errors[0].errorField).toBe('name')
      expect(errors[0].errorCode).toBe('event.name.length')
    })
  })

  describe('checkDescription', () => {
    it('Should be valid', () => {
      const eventBE = new EventBE(null, 'description', null, null)
      const errors = checkDescription(eventBE)
      expect(errors).toHaveLength(0)
    })

    it('Should retun an error about field description required', () => {
      const eventBE = new EventBE(null, undefined, null, null)
      const errors = checkDescription(eventBE)
      expect(errors).toHaveLength(1)
      expect(errors[0].errorField).toBe('description')
      expect(errors[0].errorCode).toBe('event.description.required')
    })

    it('Should retun an error about field description required', () => {
      const eventBE = new EventBE(null, null, null, null)
      const errors = checkDescription(eventBE)
      expect(errors).toHaveLength(1)
      expect(errors[0].errorField).toBe('description')
      expect(errors[0].errorCode).toBe('event.description.required')
    })

    it('Should retun an error about field description required', () => {
      const eventBE = new EventBE(null, '', null, null)
      const errors = checkDescription(eventBE)
      expect(errors).toHaveLength(1)
      expect(errors[0].errorField).toBe('description')
      expect(errors[0].errorCode).toBe('event.description.required')
    })

    it('Should retun an error about field description required', () => {
      const eventBE = new EventBE(null, 0, null, null)
      const errors = checkDescription(eventBE)
      expect(errors).toHaveLength(1)
      expect(errors[0].errorField).toBe('description')
      expect(errors[0].errorCode).toBe('event.description.required')
    })

    it('Should retun an error about field description too long', () => {
      const eventBE = new EventBE(null, '1'.repeat(251), null, null)
      const errors = checkDescription(eventBE)
      expect(errors).toHaveLength(1)
      expect(errors[0].errorField).toBe('description')
      expect(errors[0].errorCode).toBe('event.description.length')
    })
  })

  describe('checkStartDate', () => {
    it('Should be valid', () => {
      const eventBE = new EventBE(null, null, '2012-12-21T12:12:21.000Z', null)
      const errors = checkStartDate(eventBE)
      expect(errors).toHaveLength(0)
    })

    it('Should retun an error about field startDate required', () => {
      const eventBE = new EventBE(null, null, undefined, null)
      const errors = checkStartDate(eventBE)
      expect(errors).toHaveLength(1)
      expect(errors[0].errorField).toBe('startDate')
      expect(errors[0].errorCode).toBe('event.startDate.required')
    })

    it('Should retun an error about field startDate required', () => {
      const eventBE = new EventBE(null, null, null, null)
      const errors = checkStartDate(eventBE)
      expect(errors).toHaveLength(1)
      expect(errors[0].errorField).toBe('startDate')
      expect(errors[0].errorCode).toBe('event.startDate.required')
    })

    it('Should retun an error about field startDate misformatted', () => {
      const eventBE = new EventBE(null, null, '2012-12-21T12:12:21.000', null)
      const errors = checkStartDate(eventBE)
      expect(errors).toHaveLength(1)
      expect(errors[0].errorField).toBe('startDate')
      expect(errors[0].errorCode).toBe('event.startDate.type')
    })
    it('Should retun an error about field startDate misformatted', () => {
      const eventBE = new EventBE(null, null, '2012 Mathilde', null)
      const errors = checkStartDate(eventBE)
      expect(errors).toHaveLength(1)
      expect(errors[0].errorField).toBe('startDate')
      expect(errors[0].errorCode).toBe('event.startDate.type')
    })
  })

  describe('checkEndDate', () => {
    it('Should be valid', () => {
      const eventBE = new EventBE(null, null, null, '2012-12-21T12:12:21.000Z')
      const errors = checkEndDate(eventBE)
      expect(errors).toHaveLength(0)
    })

    it('Should retun an error about field endDate required', () => {
      const eventBE = new EventBE(null, null, null, undefined)
      const errors = checkEndDate(eventBE)
      expect(errors).toHaveLength(1)
      expect(errors[0].errorField).toBe('endDate')
      expect(errors[0].errorCode).toBe('event.endDate.required')
    })

    it('Should retun an error about field endDate required', () => {
      const eventBE = new EventBE(null, null, null, null)
      const errors = checkEndDate(eventBE)
      expect(errors).toHaveLength(1)
      expect(errors[0].errorField).toBe('endDate')
      expect(errors[0].errorCode).toBe('event.endDate.required')
    })

    it('Should retun an error about field endDate misformatted', () => {
      const eventBE = new EventBE(null, null, null, '2012-12-21T12:12:21.000')
      const errors = checkEndDate(eventBE)
      expect(errors).toHaveLength(1)
      expect(errors[0].errorField).toBe('endDate')
      expect(errors[0].errorCode).toBe('event.endDate.type')
    })
    it('Should retun an error about field endDate misformatted', () => {
      const eventBE = new EventBE(null, null, null, '2012 Mathilde')
      const errors = checkEndDate(eventBE)
      expect(errors).toHaveLength(1)
      expect(errors[0].errorField).toBe('endDate')
      expect(errors[0].errorCode).toBe('event.endDate.type')
    })
  })

  describe('checkDatesChronology', () => {
    it('Start date should be before end date', () => {
      const eventBE = new EventBE(
        null,
        null,
        '2012-12-20T12:12:21.000Z',
        '2012-12-21T12:12:21.000Z'
      )
      const errors = checkStartDateBeforeEndDate(eventBE)
      expect(errors).toHaveLength(0)
    })

    it('Start date should be strictly before end date', () => {
      const eventBE = new EventBE(
        null,
        null,
        '2012-12-21T12:12:21.000Z',
        '2012-12-21T12:12:21.000Z'
      )
      const errors = checkStartDateBeforeEndDate(eventBE)
      expect(errors).toHaveLength(1)
      expect(errors[0].errorCode).toBe('event.date')
    })

    it('Start date should be before end date', () => {
      const eventBE = new EventBE(
        null,
        null,
        '2012-12-23T12:12:21.000Z',
        '2012-12-21T12:12:21.000Z'
      )
      const errors = checkStartDateBeforeEndDate(eventBE)
      expect(errors).toHaveLength(1)
      expect(errors[0].errorCode).toBe('event.date')
    })
  })
})
