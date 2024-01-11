import { HttpRequestProps, HttpResponseProps } from '../protocols/http'

export class SignUpController {
  handle(httpRequest: HttpRequestProps): HttpResponseProps {
    if(!httpRequest.body.name) {
      return {
        statusCode: 400,
        body: new Error('Missing param: name')
      }
    }
    if(!httpRequest.body.email) {
      return {
        statusCode: 400,
        body: new Error('Missing param: email')
      }
    }
    
  }
}