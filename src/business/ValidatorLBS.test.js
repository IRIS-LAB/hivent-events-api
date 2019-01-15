import *  as validatorLBS from './ValidatorLBS'
import { EventBE } from '../objects/business/be/EventBE'
import { BusinessException } from 'iris-common'

describe('ValidatorLBS', () => {
    describe('checkEventBE', () => {
        it('Should NOT throw an exception when event is valid', () => {
            let eventBE = new EventBE("name", "description", "2018-11-04T09:00:00.000+01:00", "2018-11-04T10:00:00.000+01:00")
            let err = () => {
                validatorLBS.checkEventBE(eventBE)
            }
            expect(err).not.toThrow()
        })

        it('Should throw an exception when event is invalid', () => {
            let eventBE = new EventBE(null, null,null, null)
            let err = () => {
                validatorLBS.checkEventBE(eventBE)
            }
            expect(err).toThrow(BusinessException)
        })
    })

    describe('checkName', () => {
        it('Should be valid', () => {
            const eventBE = new EventBE("name", null,null, null)
            const errors = validatorLBS.checkName(eventBE)
            expect(errors).toHaveLength(0)
        })

        it('Should retun an error about field required', () => {
            const eventBE = new EventBE(undefined, null,null, null)
            const errors = validatorLBS.checkName(eventBE)
            expect(errors).toHaveLength(1)
            expect(errors[0].errorField).toBe('name')
            expect(errors[0].errorCode).toBe('event.name.required')
        })

        it('Should retun an error about field required', () => {
            const eventBE = new EventBE(null, null,null, null)
            const errors = validatorLBS.checkName(eventBE)
            expect(errors).toHaveLength(1)
            expect(errors[0].errorField).toBe('name')
            expect(errors[0].errorCode).toBe('event.name.required')
        })

        it('Should retun an error about field required', () => {
            const eventBE = new EventBE('', null,null, null)
            const errors = validatorLBS.checkName(eventBE)
            expect(errors).toHaveLength(1)
            expect(errors[0].errorField).toBe('name')
            expect(errors[0].errorCode).toBe('event.name.required')
        })

        it('Should retun an error about field required', () => {
            const eventBE = new EventBE(0, null,null, null)
            const errors = validatorLBS.checkName(eventBE)
            expect(errors).toHaveLength(1)
            expect(errors[0].errorField).toBe('name')
            expect(errors[0].errorCode).toBe('event.name.required')
        })

        it('Should retun an error about field too long', () => {
            const eventBE = new EventBE("1".repeat(101), null,null, null)
            const errors = validatorLBS.checkName(eventBE)
            expect(errors).toHaveLength(1)
            expect(errors[0].errorField).toBe('name')
            expect(errors[0].errorCode).toBe('event.name.length')
        })
    })

    
    describe('checkDescription', () => {
        it('Should be valid', () => {
            const eventBE = new EventBE(null, "description",null, null)
            const errors = validatorLBS.checkDescription(eventBE)
            expect(errors).toHaveLength(0)
        })

        it('Should retun an error about field description required', () => {
            const eventBE = new EventBE(null, undefined,null, null)
            const errors = validatorLBS.checkDescription(eventBE)
            expect(errors).toHaveLength(1)
            expect(errors[0].errorField).toBe('description')
            expect(errors[0].errorCode).toBe('event.description.required')
        })

        it('Should retun an error about field description required', () => {
            const eventBE = new EventBE(null, null,null, null)
            const errors = validatorLBS.checkDescription(eventBE)
            expect(errors).toHaveLength(1)
            expect(errors[0].errorField).toBe('description')
            expect(errors[0].errorCode).toBe('event.description.required')
        })

        it('Should retun an error about field description required', () => {
            const eventBE = new EventBE(null, '', null, null)
            const errors = validatorLBS.checkDescription(eventBE)
            expect(errors).toHaveLength(1)
            expect(errors[0].errorField).toBe('description')
            expect(errors[0].errorCode).toBe('event.description.required')
        })

        it('Should retun an error about field description required', () => {
            const eventBE = new EventBE(null, 0,null, null)
            const errors = validatorLBS.checkDescription(eventBE)
            expect(errors).toHaveLength(1)
            expect(errors[0].errorField).toBe('description')
            expect(errors[0].errorCode).toBe('event.description.required')
        })

        it('Should retun an error about field description too long', () => {
            const eventBE = new EventBE(null, "1".repeat(251),null, null)
            const errors = validatorLBS.checkDescription(eventBE)
            expect(errors).toHaveLength(1)
            expect(errors[0].errorField).toBe('description')
            expect(errors[0].errorCode).toBe('event.description.length')
        })
    })
})