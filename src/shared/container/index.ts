import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';

import IAppointimentsRepository from '@modules/appointments/repositories/IAppointimentsRepository';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

// configuração de injeção de dependência
// toda ves que o register() for chamado ele cria uma nova instnacia do AppointmentsRepository
// o registerSingleton é instanciado apenas 1 vez

container.registerSingleton<IAppointimentsRepository>(
  'AppointmentsRepository',
  AppointmentsRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);
