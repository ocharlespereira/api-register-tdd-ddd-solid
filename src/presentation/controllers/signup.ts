import { HttpRequestProps, HttpResponseProps } from '../protocols/http'
import { AbsenceOfParamError } from '../errors/absence-of-param-error'

export class SignUpController {
  handle(httpRequest: HttpRequestProps): HttpResponseProps {
    if(!httpRequest.body.name) {
      return {
        statusCode: 400,
        body: new AbsenceOfParamError('name')
      }
    }
    if(!httpRequest.body.email) {
      return {
        statusCode: 400,
        body: new AbsenceOfParamError('email')
      }
    }
    
  }
}