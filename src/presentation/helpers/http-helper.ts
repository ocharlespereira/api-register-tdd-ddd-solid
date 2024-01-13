import { ServerError } from '../errors'
import { HttpResponseProps } from '../protocols'

export const badRequest = (error: Error): HttpResponseProps => ({
  statusCode: 400,
  body: error
})

export const serverError = (): HttpResponseProps => ({
  statusCode: 500,
  body: new ServerError()
})

export const Ok = (data: any): HttpResponseProps => ({
  statusCode: 200,
  body: data
})
