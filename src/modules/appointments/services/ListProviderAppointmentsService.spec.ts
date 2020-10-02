// fake repository tem que vir primeiro
import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import ListProviderAppointmentsService from './ListProviderAppointmentsService';
import AppError from '@shared/errors/AppError';

// Teste unitário não deve depender de nada alem dele msm

// describe cria categoria de test
describe('ListProviderAppointmentsService', () => {
  let fakeAppointmentsRepository: FakeAppointmentsRepository;
  let listProviderAppointments: ListProviderAppointmentsService;

  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderAppointments = new ListProviderAppointmentsService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to list the appointments on a specific day', async () => {
    const appointment1 = await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      user_id: 'user',
      date: new Date(2020, 9, 1, 14, 0, 0),
    });

    const appointment2 = await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      user_id: 'user',
      date: new Date(2020, 9, 1, 15, 0, 0),
    });

    const appointments = await listProviderAppointments.execute({
      provider_id: 'provider',
      day: 1,
      month: 10,
      year: 2020,
    });

    expect(appointments).toEqual([appointment1, appointment2]);
  });
});
