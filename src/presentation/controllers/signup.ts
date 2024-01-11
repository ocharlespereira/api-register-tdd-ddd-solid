import { HttpRequestProps, HttpResponseProps } from '../protocols/http'
import { AbsenceOfParamError } from '../errors/absence-of-param-error'
import { badRequest } from '../helpers/http-helper'

export class SignUpController {
  handle(httpRequest: HttpRequestProps): HttpResponseProps {
    const requiredFields = ['name', 'email', 'password']

    for(const field of requiredFields) {
      if(!httpRequest.body[field]) {
        return badRequest(new AbsenceOfParamError(field))
      }
    }
  }
}
