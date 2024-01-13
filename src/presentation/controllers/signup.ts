import  {HttpRequestProps, HttpResponseProps, ControllerSignUp, EmailValidator} from '../protocols'

import { badRequest, serverError } from '../helpers/http-helper'

import { AbsenceOfParamError, InvalidParamError } from '../errors'

export class SignUpController implements ControllerSignUp {

  constructor(private readonly emailValidator: EmailValidator) {}

  handle(httpRequest: HttpRequestProps): HttpResponseProps {
    try {
      const requiredFields = ['name', 'email', 'password', 'passwordConfirm']

      for(const field of requiredFields) {

        if(!httpRequest.body[field]) {
          return badRequest(new AbsenceOfParamError(field))
        }
      }

      const { email, password, passwordConfirm } = httpRequest.body

      if(password !== passwordConfirm) {
        return badRequest(new InvalidParamError('passwordConfirm'))
      }

      const isValid = this.emailValidator.isValid(email)

      if(!isValid) {
        return badRequest(new InvalidParamError('email'))
    }
    } catch (error) {
      return serverError()
    }

  }
}
