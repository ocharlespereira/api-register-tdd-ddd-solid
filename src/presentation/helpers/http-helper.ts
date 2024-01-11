import { HttpResponseProps } from '../protocols/http'

export const badRequest = (error: Error): HttpResponseProps => ({
  statusCode: 400,
  body: error
})
