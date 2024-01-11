export class AbsenceOfParamError extends Error {
  constructor(paramName: string) {
    super(`Absence of param: ${paramName}`)

    this.name = 'AbsenceOfParamError'
  }
}