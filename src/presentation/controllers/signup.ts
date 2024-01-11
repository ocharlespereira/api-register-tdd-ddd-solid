import { HttpRequestProps, HttpResponseProps } from '../protocols/http'
import { AbsenceOfParamError } from '../errors/absence-of-param-error'
import { badRequest } from '../helpers/http-helper'

export class SignUpController {
  handle(httpRequest: HttpRequestProps): HttpResponseProps {
    if(!httpRequest.body.name) {
      return badRequest(new AbsenceOfParamError('name'))
    }
    if(!httpRequest.body.email) {
      return badRequest(new AbsenceOfParamError('email'))
    }

  }
}
