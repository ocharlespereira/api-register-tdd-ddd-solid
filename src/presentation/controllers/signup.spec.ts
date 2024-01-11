import { SignUpController } from './signup'
import { AbsenceOfParamError } from '../errors/absence-of-param-error'

describe('SignUp Controller', () => {
  it('Should return 400 if no name is provided', () => {
    const sut = new SignUpController()

    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirm: 'any_password'
      }
    }

    const httpResponse =  sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new AbsenceOfParamError('name'))
  }),

  it('Should return 400 if no email is provided', () => {
    const sut = new SignUpController()

    const httpRequest = {
      body: {
        name: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirm: 'any_password'
      }
    }

    const httpResponse =  sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new AbsenceOfParamError('email'))
  }),

  it('Should return 400 if no password is provided', () => {
    const sut = new SignUpController()

    const httpRequest = {
      body: {
        name: 'any_email@mail.com',
        email: 'any_email@mail.com',
        passwordConfirm: 'any_password'
      }
    }

    const httpResponse =  sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new AbsenceOfParamError('password'))
  })
})
