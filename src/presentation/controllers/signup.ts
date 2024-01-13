import  {HttpRequestProps, HttpResponseProps, ControllerSignUp, EmailValidator} from '../protocols'

import { Ok, badRequest, serverError } from '../helpers/http-helper'

import { AbsenceOfParamError, InvalidParamError } from '../errors'
import { AddAccount } from '../../domain/usecases/add-account'

export class SignUpController implements ControllerSignUp {

  constructor(private readonly emailValidator: EmailValidator, private readonly addAccount: AddAccount) {}

  async handle(httpRequest: HttpRequestProps): Promise<HttpResponseProps> {
    try {
      const requiredFields = ['name', 'email', 'password', 'passwordConfirm']

      for(const field of requiredFields) {

        if(!httpRequest.body[field]) {
          return badRequest(new AbsenceOfParamError(field))
        }
      }

      const { name, email, password, passwordConfirm } = httpRequest.body

      if(password !== passwordConfirm) {
        return badRequest(new InvalidParamError('passwordConfirm'))
      }

      const isValid = this.emailValidator.isValid(email)

      if(!isValid) {
        return badRequest(new InvalidParamError('email'))
      }

      const account = await this.addAccount.add({
        name,
        email,
        password
      })

      return Ok(account)

    } catch (error) {
      return serverError()
    }

  }
}
