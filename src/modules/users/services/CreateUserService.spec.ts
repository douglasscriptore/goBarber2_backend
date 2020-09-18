// fake repository tem que vir primeiro
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from './CreateUserService';
import AppError from '@shared/errors/AppError';

// Teste unitário não deve depender de nada alem dele msm

// describe cria categoria de test
describe('CreateUserService', () => {
  // user it no logar de test(), deve se ler it junto com o texto
  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const user = await createUserService.execute({
      name: 'John Doe',
      email: 'john@email.com.br',
      password: 'qwe123',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with same email from another', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    await createUserService.execute({
      name: 'John Doe',
      email: 'john@email.com.br',
      password: 'qwe123',
    });

    await expect(
      createUserService.execute({
        name: 'John Doe',
        email: 'john@email.com.br',
        password: 'qwe123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
