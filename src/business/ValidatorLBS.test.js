import { checkEvent } from './ValidatorLBS'
import { BusinessException } from '@u-iris/iris-common'

describe('ValidatorLBS', () => {
  let event = undefined
  beforeEach(() => {
    event = {
      title: 'Test',
      description: 'description du test',
      startDate: '2019-02-19T18:13:00.000+01:00',
      endDate: '2019-02-19T18:15:00.000+01:00',
      administratorIds: ['12'],
      speakerIds: ['1'],
      maxSeatsNb: 10
    }
  })

  it('Should NOT throw an exception when event is valid', () => {
    let err = () => {
      checkEvent(event)
    }
    expect(err).not.toThrow()
  })

  const checkInvalidity = (event, field, errorCode) => {
    let err = undefined
    try {
      checkEvent(event)
    } catch (error) {
      err = error
    }
    expect(err).toBeInstanceOf(BusinessException)
    expect(err.errors[0].errorField).toBe(field)
    expect(err.errors[0].errorCode).toBe(errorCode)
  }

  describe('title', () => {
    it('Should return an error when not set', () => {
      event.title = undefined
      checkInvalidity(event, 'title', 'title.any.required')
    })

    it('Should return an error when empty', () => {
      event.title = ''
      checkInvalidity(event, 'title', 'title.any.empty')
    })

    it('Should return an error when length greater than 100', () => {
      event.title = '1'.repeat(101)
      checkInvalidity(event, 'title', 'title.string.max')
    })
  })

  describe('description', () => {
    it('Should return an error when not set', () => {
      event.description = undefined
      checkInvalidity(event, 'description', 'description.any.required')
    })

    it('Should return an error when empty', () => {
      event.description = ''
      checkInvalidity(event, 'description', 'description.any.empty')
    })

    it('Should return an error when length greater than 250', () => {
      event.description = '1'.repeat(251)
      checkInvalidity(event, 'description', 'description.string.max')
    })
  })

  describe('startDate', () => {
    it('Should return an error when not set', () => {
      event.startDate = undefined
      checkInvalidity(event, 'startDate', 'startDate.any.required')
    })

    it('Should return an error when empty', () => {
      event.startDate = ''
      checkInvalidity(event, 'startDate', 'startDate.date.base')
    })

    it('Should return an error when misformatted (123)', () => {
      event.startDate = '123'
      checkInvalidity(event, 'startDate', 'startDate.date.format')
    })

    it('Should return an error when misformatted (2018-02-25 18:00:00.000+01:00)', () => {
      event.startDate = '2018-02-25 18:00:00.000+01:00'
      checkInvalidity(event, 'startDate', 'startDate.date.format')
    })

    it('Should return an error when misformatted (2018-02-25)', () => {
      event.startDate = '2018-02-25'
      checkInvalidity(event, 'startDate', 'startDate.date.format')
    })

    it('Should return an error when misformatted (2018-02-29T18:00:00.000+01:00)', () => {
      event.startDate = '2018-02-29T18:00:00.000+01:00'
      checkInvalidity(event, 'startDate', 'startDate.date.format')
    })
  })

  describe('endDate', () => {
    it('Should return an error when not set', () => {
      event.endDate = undefined
      checkInvalidity(event, 'endDate', 'endDate.any.required')
    })

    it('Should return an error when empty', () => {
      event.endDate = ''
      checkInvalidity(event, 'endDate', 'endDate.date.base')
    })

    it('Should return an error when misformatted (123)', () => {
      event.endDate = '123'
      checkInvalidity(event, 'endDate', 'endDate.date.format')
    })

    it('Should return an error when misformatted (2018-02-25 18:00:00.000+01:00)', () => {
      event.endDate = '2018-02-25 18:00:00.000+01:00'
      checkInvalidity(event, 'endDate', 'endDate.date.format')
    })

    it('Should return an error when misformatted (2018-02-25)', () => {
      event.endDate = '2018-02-25'
      checkInvalidity(event, 'endDate', 'endDate.date.format')
    })

    it('Should return an error when misformatted (2018-02-29T18:00:00.000+01:00)', () => {
      event.endDate = '2018-02-29T18:00:00.000+01:00'
      checkInvalidity(event, 'endDate', 'endDate.date.format')
    })

    it('Should return an error when endDate before startDate', () => {
      event.startDate = '2019-02-20T18:00:00.000+01:00'
      event.endDate = '2017-02-20T18:00:00.000+01:00'
      checkInvalidity(event, 'endDate', 'endDate.date.greater')
    })

    it('Should return an error when endDate equals to startDate', () => {
      event.startDate = '2019-02-20T18:00:00.000+01:00'
      event.endDate = '2019-02-20T18:00:00.000+01:00'
      checkInvalidity(event, 'endDate', 'endDate.date.greater')
    })
  })

  describe('administratorIds', () => {
    it('Should return an error when not set', () => {
      event.administratorIds = undefined
      checkInvalidity(event, 'administratorIds', 'administratorIds.any.required')
    })

    it('Should return an error when empty', () => {
      event.administratorIds = []
      checkInvalidity(event, 'administratorIds', 'administratorIds.array.min')
    })
  })

  describe('speakerIds', () => {
    it('Should return an error when not set', () => {
      event.speakerIds = undefined
      checkInvalidity(event, 'speakerIds', 'speakerIds.any.required')
    })

    it('Should return an error when empty', () => {
      event.speakerIds = []
      checkInvalidity(event, 'speakerIds', 'speakerIds.array.min')
    })
  })  

  describe('maxSeatsNb', () => {
    it('Should return an error when not set', () => {
      event.maxSeatsNb = undefined
      checkInvalidity(event, 'maxSeatsNb', 'maxSeatsNb.any.required')
    })

    it('Should return an error when empty', () => {
      event.maxSeatsNb = ''
      checkInvalidity(event, 'maxSeatsNb', 'maxSeatsNb.number.base')
    })

    it('Should return an error when alphanumeric', () => {
      event.maxSeatsNb = 'A'
      checkInvalidity(event, 'maxSeatsNb', 'maxSeatsNb.number.base')
    })

    it('Should return an error when float', () => {
      event.maxSeatsNb = 1.5
      checkInvalidity(event, 'maxSeatsNb', 'maxSeatsNb.number.integer')
    })

    it('Should return an error when negative', () => {
      event.maxSeatsNb = -14
      checkInvalidity(event, 'maxSeatsNb', 'maxSeatsNb.number.positive')
    })   

    it('Should return an error when 0', () => {
      event.maxSeatsNb = 0
      checkInvalidity(event, 'maxSeatsNb', 'maxSeatsNb.number.positive')
    })       
  })
  
  describe('participants', () => {
    it('Should return an empty array when not set', () => {
      const result = checkEvent(event)
      expect(result.participants).toEqual([])
    })

    it('Should return the set array when it is set', () => {
      event.participants = ['participant']
      const result = checkEvent(event)
      expect(result.participants).toEqual(['participant'])
    })
    
    it('Should return an error when not an array', () => {
      event.participants = 'participant'
      checkInvalidity(event, 'participants', 'participants.array.base')
    })
  })
  
  describe('roomId', () => {
    it('Should return \'irisLab\' when not set', () => {
      const result = checkEvent(event)
      expect(result.roomId).toBe('irisLab')
    })

    it('Should return the set array when it is set', () => {
      event.roomId = 'roomId'
      const result = checkEvent(event)
      expect(result.roomId).toBe('roomId')
    })
    
    it('Should return an error when not a string', () => {
      event.roomId = []
      checkInvalidity(event, 'roomId', 'roomId.string.base')
    })
  })
  
  describe('isDrawDone', () => {
    it('Should return false when not set', () => {
      const result = checkEvent(event)
      expect(result.isDrawDone).toBe(false)
    })

    it('Should return true when it is set to true', () => {
      event.isDrawDone = true
      const result = checkEvent(event)
      expect(result.isDrawDone).toBe(true)
    }) 

    it('Should return an error when not a boolean', () => {
      event.isDrawDone = 'vrai'
      checkInvalidity(event, 'isDrawDone', 'isDrawDone.boolean.base')
    })
  })
})
