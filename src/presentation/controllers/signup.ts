import { AbsenceOfParamError } from '../errors/absence-of-param-error'
import { badRequest } from '../helpers/http-helper'

import { HttpRequestProps, HttpResponseProps } from '../protocols/http'
import { ControllerSignUp } from '../protocols/controller'
import { EmailValidator } from '../protocols/email-validator'
import { InvalidParamError } from '../errors/invalid-param-error'
import { ServerError } from '../errors/server-error'

export class SignUpController implements ControllerSignUp {
  // private readonly emailValidator: EmailValidator

  constructor(private readonly emailValidator: EmailValidator) {
    // this.emailValidator = emailValidator
  }

  handle(httpRequest: HttpRequestProps): HttpResponseProps {
    try {
      const requiredFields = ['name', 'email', 'password', 'passwordConfirm']

      for(const field of requiredFields) {

        if(!httpRequest.body[field]) {
          return badRequest(new AbsenceOfParamError(field))
        }
      }

      const isValid = this.emailValidator.isValid(httpRequest.body.email)

      if(!isValid) {
        return badRequest(new InvalidParamError('email'))
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: new ServerError()
      }
    }

  }
}
