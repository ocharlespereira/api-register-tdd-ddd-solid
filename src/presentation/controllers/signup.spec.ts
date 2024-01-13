import { SignUpController } from './signup'
import  { EmailValidator } from '../protocols'

import { AddAccount, AddAccountModel } from '../../domain/usecases/add-account'
import { AccountModel } from '../../domain/models/account'

import {AbsenceOfParamError, InvalidParamError, ServerError } from '../errors'

interface SutProps {
  sut: SignUpController
  emailValidatorStub: EmailValidator
  addAccountStub: AddAccount
}

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid(email: string): boolean {
      return true
    }
  }

  return new EmailValidatorStub()
}

const makeAddAccount = (): AddAccount => {
  class AddAccountStub implements AddAccount {
    add(account: AddAccountModel): AccountModel {
      const fakeAccount = {
        id: 'valid_id',
        name: 'valid_name',
        email: 'valid_email@mail.com',
        password: 'valid_password'
      }

      return fakeAccount
    }
  }

  return new AddAccountStub()
}

const makeSut = () : SutProps => {
  const emailValidatorStub =  makeEmailValidator()
  const addAccountStub = makeAddAccount()
  const sut = new SignUpController(emailValidatorStub, addAccountStub)

  return {
    sut,
    emailValidatorStub,
    addAccountStub
  }
}


describe('SignUp Controller', () => {
  it('Should return 400 if no name is provided', () => {
    const { sut } = makeSut()

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
    const { sut } = makeSut()

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
    const { sut } = makeSut()

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
  }),

  it('Should return 400 if no password confirmation is provided', () => {
    const { sut } = makeSut()

    const httpRequest = {
      body: {
        name: 'any_email@mail.com',
        email: 'any_email@mail.com',
        password: 'any_password'
      }
    }

    const httpResponse =  sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new AbsenceOfParamError('passwordConfirm'))
  }),

  it('Should return 400 if password confirmation fails', () => {
    const { sut } = makeSut()

    const httpRequest = {
      body: {
        name: 'any_email@mail.com',
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirm: 'invalid_password'
      }
    }

    const httpResponse =  sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidParamError('passwordConfirm'))
  }),

  it('Should return 400 if no an invalid email is provided', () => {
    const { sut, emailValidatorStub } = makeSut()

    //modifify return value in the function
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'invalid_email@mail.com',
        password: 'any_password',
        passwordConfirm: 'any_password'
      }
    }

    const httpResponse =  sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidParamError('email'))
  }),

  it('Should call EmailValidator with correct email', () => {
    const { sut, emailValidatorStub } = makeSut()

   const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid')

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirm: 'any_password'
      }
    }

    sut.handle(httpRequest)

    expect(isValidSpy).toHaveBeenCalledWith('any_email@mail.com')
  }),

  it('Should return 500 if EmailValidator throws', () => {
    const { sut, emailValidatorStub } = makeSut()

    jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error()
    })

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirm: 'any_password'
      }
    }

    const httpResponse =  sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  }),

  it('Should call account with correct values', () => {
    const { sut, addAccountStub } = makeSut()

   const addSpy = jest.spyOn(addAccountStub, 'add')

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirm: 'any_password'
      }
    }

    sut.handle(httpRequest)

    expect(addSpy).toHaveBeenCalledWith({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password'
    })
  })

})
