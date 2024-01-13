import { HttpRequestProps, HttpResponseProps } from './http';

export interface ControllerSignUp {
  handle(httpRequest: HttpRequestProps): Promise<HttpResponseProps>
}
