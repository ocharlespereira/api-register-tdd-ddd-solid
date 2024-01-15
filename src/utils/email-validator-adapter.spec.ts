import { EmailValidatorAdapter } from './email-validator-adapter'
import validator from 'validator'

// jest.mock('validator', () => ({
//   isEmail(): boolean {
//     return true
//   }
// }));

// jest.mock('validator', () => ({
//   isEmail: jest.fn().mockReturnValue(true)
// }));

// const mockedValidator = validator as jest.Mocked<typeof validator>;

// jest.mock('validator', () => ({
//   isEmail: jest.fn(),
// }));


describe('EmailValidator Adapter', () => {
  it('Should return false if validator returns false',() => {
    const sut = new EmailValidatorAdapter()

    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)
    // validator.isEmail.mockReturnValueOnce(false);

    const isValid = sut.isValid('invalid_email@mail.com')

    expect(isValid).toBe(false)
  }),

  it('Should return true if validator returns true',() => {
    const sut = new EmailValidatorAdapter()

    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(true)

    const isValid = sut.isValid('valid_email@mail.com')

    expect(isValid).toBe(true)
  })
})
