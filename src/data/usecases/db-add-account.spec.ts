import { Encrypter } from '../protocols/encrypter'
import { DbAddAccount } from './db-add-account'

interface SutProps {
  sut: DbAddAccount
  encrypterStub: Encrypter
}

const makeEncrypter = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypt(value: string): Promise<string> {
      return new Promise(resolve => resolve('hashed_password'))
    }
  }

  return new EncrypterStub()
}

const makeSut = (): SutProps => {
  const encrypterStub = makeEncrypter()
  const sut = new DbAddAccount(encrypterStub)

  return {
    sut,
    encrypterStub
  }
}

describe('DbAccount UseCase', () => {
  it('Should call Encrypter with correct password', async () => {

    const { sut, encrypterStub } = makeSut()

    const encriptSpy = jest.spyOn(encrypterStub, 'encrypt')
    console.log('encriptSpy :', encriptSpy);

    const accountData = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password'
    }

    await sut.add(accountData)

    expect(encriptSpy).toHaveBeenCalledWith('valid_password')
  })
})
