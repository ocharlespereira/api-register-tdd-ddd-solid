import { HttpRequestProps, HttpResponseProps } from '../protocols/http'
import { ControllerSignUp } from '../protocols/controller'
import { AbsenceOfParamError } from '../errors/absence-of-param-error'
import { badRequest } from '../helpers/http-helper'

export class SignUpController implements ControllerSignUp {
  handle(httpRequest: HttpRequestProps): HttpResponseProps {
    const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']

    for(const field of requiredFields) {
      if(!httpRequest.body[field]) {
        return badRequest(new AbsenceOfParamError(field))
      }
    }
  }
}
